export type GuestStatus = "confirmado" | "nao-vai";

export type Invitation = {
  id: string;
  titular: string;
  convidados: string[];
  permiteCriancas: boolean;
};

type GuestRow = {
  invitation_id: string;
  titular: string;
  nome: string;
  permite_criancas: boolean;
};

export const mockInvitations: Invitation[] = [
  {
    id: "convite-001",
    titular: "João Silva",
    convidados: ["João Silva", "Maria Silva"],
    permiteCriancas: false,
  },
  {
    id: "convite-002",
    titular: "Ana Souza",
    convidados: ["Ana Souza"],
    permiteCriancas: false,
  },
  {
    id: "convite-003",
    titular: "Carlos Andrade",
    convidados: ["Carlos Andrade", "Bianca Andrade"],
    permiteCriancas: false,
  },
];

export const normalizeName = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const findMockInvitation = (name: string) => {
  const search = normalizeName(name);

  return (
    mockInvitations.find((item) => normalizeName(item.titular) === search) ??
    mockInvitations.find((item) =>
      item.convidados.some((guest) => normalizeName(guest) === search)
    ) ??
    null
  );
};

export const getSupabaseConfig = () => {
  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return {
    key,
    responseTable: process.env.RSVP_RESPONSES_TABLE ?? "rsvp_responses",
    url: url.replace(/\/$/, ""),
    guestTable: process.env.RSVP_GUESTS_TABLE ?? "rsvp_guests",
  };
};

export const supabaseHeaders = (key: string) => ({
  apikey: key,
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
});

export const toInvitation = (rows: GuestRow[]): Invitation | null => {
  const first = rows[0];

  if (!first) {
    return null;
  }

  return {
    id: first.invitation_id,
    titular: first.titular,
    convidados: rows.map((row) => row.nome),
    permiteCriancas: rows.some((row) => row.permite_criancas),
  };
};
