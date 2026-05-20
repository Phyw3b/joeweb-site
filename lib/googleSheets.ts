import { google } from "googleapis";

const SHEET_RANGE_COLUMNS = "A:AD";

type ColumnMap = {
  id: number;
  familiaId: number;
  idGenero: number;
  nomeIndividual: number;
  nomeConvite: number;
  nomesBusca: number;
  qtdConvites: number;
  statusIndividual: number;
  statusFamilia: number;
  confirmado: number;
  restricaoAlimentar: number;
  tamanhoChinelo: number;
  observacao: number;
  token: number;
  dataConfirmacao: number;
  ultimaAlteracao: number;
  updatedAt: number;
};

export type SheetGuest = {
  id: string;
  familiaId: string;
  idGenero: string;
  nomeIndividual: string;
  nomeConvite: string;
  nomesBusca: string;
  qtdConvites: number;
  statusIndividual: string;
  statusFamilia: string;
  confirmado: string;
  restricaoAlimentar: string;
  tamanhoChinelo: string;
  observacao: string;
  token: string;
  dataConfirmacao: string;
  ultimaAlteracao: string;
  rowNumber: number;
  values: string[];
  columns: ColumnMap;
  columnCount: number;
  headers: string[];
};

export type UpdateGuestInput = {
  id: string;
  confirmed: boolean;
  tamanhoChinelo?: string;
};

function getSheetConfig() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const sheetTab = process.env.GOOGLE_SHEET_TAB ?? "RSVP_SITE";

  if (!clientEmail || !privateKey || !sheetId) {
    throw new Error("Google Sheets credentials are not configured.");
  }

  return { clientEmail, privateKey, sheetId, sheetTab };
}

function getSheetsClient() {
  const { clientEmail, privateKey } = getSheetConfig();
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

const valueAt = (values: string[], index: number) =>
  index >= 0 ? values[index]?.trim() ?? "" : "";

const toNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeHeader = (value: string) =>
  normalizeSearchText(value).replace(/\s+/g, "_");

function findColumn(headers: string[], aliases: string[]) {
  const normalizedHeaders = headers.map(normalizeHeader);
  const normalizedAliases = aliases.map(normalizeHeader);

  return normalizedAliases.reduce((found, alias) => {
    if (found >= 0) {
      return found;
    }

    return normalizedHeaders.indexOf(alias);
  }, -1);
}

function getColumnMap(headers: string[]): ColumnMap {
  return {
    id: findColumn(headers, ["id"]),
    familiaId: findColumn(headers, ["familia_id"]),
    idGenero: findColumn(headers, ["id_genero", "genero"]),
    nomeIndividual: findColumn(headers, ["nome_individual", "nome_convite"]),
    nomeConvite: findColumn(headers, ["nome_convite", "nome_individual"]),
    nomesBusca: findColumn(headers, ["nomes_busca"]),
    qtdConvites: findColumn(headers, ["qtd_convites"]),
    statusIndividual: findColumn(headers, ["status_individual", "status"]),
    statusFamilia: findColumn(headers, ["status_familia", "status"]),
    confirmado: findColumn(headers, ["confirmado", "confirmados"]),
    restricaoAlimentar: findColumn(headers, ["restricao_alimentar"]),
    tamanhoChinelo: findColumn(headers, ["tamanho_chinelo"]),
    observacao: findColumn(headers, ["observacao"]),
    token: findColumn(headers, ["token"]),
    dataConfirmacao: findColumn(headers, ["data_confirmacao"]),
    ultimaAlteracao: findColumn(headers, ["ultima_alteracao"]),
    updatedAt: findColumn(headers, ["updated_at"]),
  };
}

function deriveConfirmed(values: string[], columns: ColumnMap) {
  const explicit = valueAt(values, columns.confirmado);
  const status = normalizeSearchText(valueAt(values, columns.statusIndividual));

  if (explicit) {
    if (explicit === "1") {
      return "Sim";
    }

    if (explicit === "0") {
      return "Não";
    }

    return explicit;
  }

  if (status === "confirmado") {
    return "Sim";
  }

  if (status === "nao ira" || status === "não irá") {
    return "Não";
  }

  return "Não";
}

function normalizeRow(
  values: string[],
  rowNumber: number,
  columns: ColumnMap,
  headers: string[]
): SheetGuest {
  return {
    id: valueAt(values, columns.id),
    familiaId: valueAt(values, columns.familiaId),
    idGenero: valueAt(values, columns.idGenero),
    nomeIndividual: valueAt(values, columns.nomeIndividual),
    nomeConvite: valueAt(values, columns.nomeConvite),
    nomesBusca: valueAt(values, columns.nomesBusca),
    qtdConvites: toNumber(valueAt(values, columns.qtdConvites)),
    statusIndividual: valueAt(values, columns.statusIndividual),
    statusFamilia: valueAt(values, columns.statusFamilia),
    confirmado: deriveConfirmed(values, columns),
    restricaoAlimentar: valueAt(values, columns.restricaoAlimentar),
    tamanhoChinelo: valueAt(values, columns.tamanhoChinelo),
    observacao: valueAt(values, columns.observacao),
    token: valueAt(values, columns.token),
    dataConfirmacao: valueAt(values, columns.dataConfirmacao),
    ultimaAlteracao: valueAt(values, columns.ultimaAlteracao),
    rowNumber,
    values,
    columns,
    columnCount: headers.length,
    headers,
  };
}

export function normalizeSearchText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function getColumnLabel(index: number) {
  let label = "";
  let current = index + 1;

  while (current > 0) {
    const remainder = (current - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    current = Math.floor((current - 1) / 26);
  }

  return label;
}

function setIfColumnExists(values: string[], index: number, value: string) {
  if (index >= 0) {
    values[index] = value;
  }
}

function hasRegisteredResponse(row: SheetGuest) {
  const status = normalizeSearchText(row.statusIndividual);
  return status === "confirmado" || status === "nao ira";
}

function isPastRsvpDeadline() {
  const deadline = process.env.NEXT_PUBLIC_RSVP_DEADLINE;

  if (!deadline) {
    return false;
  }

  const deadlineDate = new Date(`${deadline}T23:59:59`);

  if (Number.isNaN(deadlineDate.getTime())) {
    return false;
  }

  return new Date() > deadlineDate;
}

function withAuditColumns(headers: string[], columns: ColumnMap) {
  const nextHeaders = [...headers];
  const nextColumns = { ...columns };

  if (nextColumns.dataConfirmacao < 0) {
    nextColumns.dataConfirmacao = nextHeaders.length;
    nextHeaders.push("data_confirmacao");
  }

  if (nextColumns.ultimaAlteracao < 0) {
    nextColumns.ultimaAlteracao = nextHeaders.length;
    nextHeaders.push("ultima_alteracao");
  }

  return { headers: nextHeaders, columns: nextColumns };
}

export async function getRows() {
  const { sheetId, sheetTab } = getSheetConfig();
  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheetTab}!${SHEET_RANGE_COLUMNS}`,
  });
  const rows = (response.data.values ?? []) as string[][];
  const headers = rows[0] ?? [];
  const columns = getColumnMap(headers);

  return rows
    .slice(1)
    .map((row, index) => normalizeRow(row, index + 2, columns, headers))
    .filter((row) => row.id && row.familiaId);
}

export async function updateGuestRows(
  familyId: string,
  guests: UpdateGuestInput[]
) {
  const { sheetId, sheetTab } = getSheetConfig();
  const sheets = getSheetsClient();
  const rows = await getRows();
  const familyRows = rows.filter((row) => row.familiaId === familyId);

  if (familyRows.length === 0) {
    throw new Error("Family not found.");
  }

  if (isPastRsvpDeadline() && familyRows.some(hasRegisteredResponse)) {
    throw new Error(
      "Sua confirmação já foi registrada. Para alterações, fale com os noivos."
    );
  }

  const guestsById = new Map(guests.map((guest) => [guest.id, guest]));
  const anyConfirmed = guests.some((guest) => guest.confirmed);
  const statusFamilia = anyConfirmed ? "Confirmado" : "Não irá";
  const updatedAt = new Date().toISOString();
  const headerConfig = withAuditColumns(familyRows[0].headers, familyRows[0].columns);
  const shouldUpdateHeaders =
    headerConfig.headers.length !== familyRows[0].headers.length;

  if (shouldUpdateHeaders) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${sheetTab}!A1:${getColumnLabel(
        headerConfig.headers.length - 1
      )}1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [headerConfig.headers],
      },
    });
  }

  const data = familyRows.map((row) => {
    const guest = guestsById.get(row.id);
    const values = [...row.values];
    const columns = headerConfig.columns;
    const lastColumn = Math.max(headerConfig.headers.length, values.length);

    while (values.length < lastColumn) {
      values.push("");
    }

    setIfColumnExists(values, columns.statusFamilia, statusFamilia);
    setIfColumnExists(values, columns.updatedAt, updatedAt);
    setIfColumnExists(values, columns.ultimaAlteracao, updatedAt);

    if (guest) {
      const confirmedValue = guest.confirmed ? "Sim" : "Não";
      const confirmedCountValue = guest.confirmed ? "1" : "0";
      const confirmedHeader = normalizeHeader(
        headerConfig.headers[columns.confirmado] ?? ""
      );

      setIfColumnExists(
        values,
        columns.statusIndividual,
        guest.confirmed ? "Confirmado" : "Não irá"
      );
      setIfColumnExists(
        values,
        columns.confirmado,
        confirmedHeader === "confirmados" ? confirmedCountValue : confirmedValue
      );
      setIfColumnExists(
        values,
        columns.tamanhoChinelo,
        guest.tamanhoChinelo ?? valueAt(values, columns.tamanhoChinelo)
      );

      if (!valueAt(values, columns.dataConfirmacao)) {
        setIfColumnExists(values, columns.dataConfirmacao, updatedAt);
      }
    }

    return {
      range: `${sheetTab}!A${row.rowNumber}:${getColumnLabel(
        lastColumn - 1
      )}${row.rowNumber}`,
      values: [values.slice(0, lastColumn)],
    };
  });

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      valueInputOption: "USER_ENTERED",
      data,
    },
  });
}
