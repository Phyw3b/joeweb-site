import { NextResponse } from "next/server";
import { getRows, normalizeSearchText } from "../../../../lib/googleSheets";

const notFoundMessage =
  "Não encontramos seu convite. Confira o nome ou fale com os noivos.";

function matchesSearch(value: string, search: string) {
  const normalized = normalizeSearchText(value);
  const tokens = normalized
    .split(";")
    .map((token) => token.trim())
    .filter(Boolean);

  return (
    normalized === search ||
    normalized.includes(search) ||
    tokens.some((token) => token === search || token.includes(search))
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as
      | { query?: string; name?: string }
      | null;
    const query = (body?.query ?? body?.name ?? "").trim();

    if (!query) {
      return NextResponse.json(
        { success: false, message: "Digite um nome para buscar o convite." },
        { status: 400 }
      );
    }

    const search = normalizeSearchText(query);
    const rows = await getRows();
    const match = rows.find(
      (row) =>
        matchesSearch(row.nomeIndividual, search) ||
        matchesSearch(row.nomeConvite, search) ||
        matchesSearch(row.nomesBusca, search) ||
        matchesSearch(row.token, search)
    );

    if (!match) {
      return NextResponse.json(
        { success: false, message: notFoundMessage },
        { status: 404 }
      );
    }

    const familyRows = rows.filter((row) => row.familiaId === match.familiaId);
    const first = familyRows[0] ?? match;

    return NextResponse.json({
      success: true,
      familyId: match.familiaId,
      nomeConvite: first.nomeConvite,
      qtdConvites: first.qtdConvites || familyRows.length,
      guests: familyRows.map((row) => ({
        id: row.id,
        idGenero: row.idGenero,
        nomeIndividual: row.nomeIndividual,
        confirmado: row.confirmado || "Não",
        statusIndividual: row.statusIndividual || "Pendente",
        tamanhoChinelo: row.tamanhoChinelo,
      })),
    });
  } catch (error) {
    console.error("RSVP search error", error);

    return NextResponse.json(
      { success: false, message: notFoundMessage },
      { status: 500 }
    );
  }
}
