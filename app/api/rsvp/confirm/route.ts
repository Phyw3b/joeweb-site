import { NextResponse } from "next/server";
import { updateGuestRows, UpdateGuestInput } from "../../../../lib/googleSheets";

const errorMessage = "Não foi possível confirmar seu RSVP. Tente novamente.";

type ConfirmBody = {
  familyId?: string;
  guests?: GuestPayload[];
};

type GuestPayload = {
  id?: string;
  confirmed?: boolean;
  tamanhoChinelo?: string;
};

function isValidGuest(value: GuestPayload): value is UpdateGuestInput {
  return Boolean(value?.id && typeof value.confirmed === "boolean");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as ConfirmBody | null;
    const familyId = body?.familyId?.trim();
    const guests = (body?.guests ?? []).filter(isValidGuest);

    if (!familyId || guests.length === 0) {
      return NextResponse.json(
        { success: false, message: "Selecione ao menos um convidado." },
        { status: 400 }
      );
    }

    await updateGuestRows(familyId, guests);

    return NextResponse.json({
      success: true,
      message: "RSVP confirmado com sucesso.",
    });
  } catch (error) {
    console.error("RSVP confirm error", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : errorMessage,
      },
      { status: 500 }
    );
  }
}
