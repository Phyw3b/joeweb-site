import { NextResponse } from "next/server";
import {
  findMockInvitation,
  getSupabaseConfig,
  normalizeName,
  supabaseHeaders,
  toInvitation,
} from "../shared";

type GuestRow = {
  invitation_id: string;
  titular: string;
  nome: string;
  permite_criancas: boolean;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { name?: string }
    | null;
  const name = body?.name?.trim();

  if (!name) {
    return NextResponse.json(
      { error: "Informe um nome para localizar o convite." },
      { status: 400 }
    );
  }

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({
      convite: findMockInvitation(name),
      source: "mock",
    });
  }

  const search = normalizeName(name);
  const matchUrl = new URL(
    `${config.url}/rest/v1/${config.guestTable}`
  );
  matchUrl.searchParams.set(
    "select",
    "invitation_id,titular,nome,permite_criancas"
  );
  matchUrl.searchParams.set("normalized_name", `eq.${search}`);
  matchUrl.searchParams.set("limit", "1");

  const matchResponse = await fetch(matchUrl, {
    headers: supabaseHeaders(config.key),
    cache: "no-store",
  });

  if (!matchResponse.ok) {
    return NextResponse.json(
      { error: "Não foi possível consultar a lista de convidados." },
      { status: 500 }
    );
  }

  const matches = (await matchResponse.json()) as GuestRow[];
  const match = matches[0];

  if (!match) {
    return NextResponse.json({ convite: null, source: "database" });
  }

  const guestsUrl = new URL(
    `${config.url}/rest/v1/${config.guestTable}`
  );
  guestsUrl.searchParams.set(
    "select",
    "invitation_id,titular,nome,permite_criancas"
  );
  guestsUrl.searchParams.set("invitation_id", `eq.${match.invitation_id}`);
  guestsUrl.searchParams.set("order", "nome.asc");

  const guestsResponse = await fetch(guestsUrl, {
    headers: supabaseHeaders(config.key),
    cache: "no-store",
  });

  if (!guestsResponse.ok) {
    return NextResponse.json(
      { error: "Não foi possível carregar os nomes do convite." },
      { status: 500 }
    );
  }

  const guests = (await guestsResponse.json()) as GuestRow[];

  return NextResponse.json({
    convite: toInvitation(guests),
    source: "database",
  });
}
