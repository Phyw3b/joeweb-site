import { NextResponse } from "next/server";
import {
  GuestStatus,
  getSupabaseConfig,
  supabaseHeaders,
} from "../shared";

type ConfirmBody = {
  invitationId?: string;
  responses?: Record<string, GuestStatus>;
};

const isValidStatus = (value: unknown): value is GuestStatus =>
  value === "confirmado" || value === "nao-vai";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ConfirmBody | null;
  const invitationId = body?.invitationId?.trim();
  const responses = body?.responses ?? {};
  const entries = Object.entries(responses).filter(([, status]) =>
    isValidStatus(status)
  );

  if (!invitationId || entries.length === 0) {
    return NextResponse.json(
      { error: "Selecione uma resposta para cada nome do convite." },
      { status: 400 }
    );
  }

  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({ ok: true, source: "mock" });
  }

  const rows = entries.map(([guestName, status]) => ({
    invitation_id: invitationId,
    guest_name: guestName,
    status,
    responded_at: new Date().toISOString(),
  }));

  const response = await fetch(
    `${config.url}/rest/v1/${config.responseTable}?on_conflict=invitation_id,guest_name`,
    {
      method: "POST",
      headers: {
        ...supabaseHeaders(config.key),
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(rows),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Não foi possível registrar sua resposta." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, source: "database" });
}
