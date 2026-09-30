import { NextResponse } from "next/server";
import {
  getGiftAdminRows,
  grantMemoryWithoutPayment,
  updateUnlockedMemoryGuestName,
} from "../../../../lib/giftsDb";
import { isAdminAuthenticated } from "../shared";
import { memories } from "../../../../lib/memories";

export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json(
    { success: false, message: "Acesso administrativo necessario." },
    { status: 401 }
  );
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const gifts = await getGiftAdminRows();

  return NextResponse.json({
    success: true,
    memories: memories.map(({ id, subtitle }) => ({ id, subtitle })),
    gifts: gifts.map((gift) => ({
      unlockId: gift.unlock_id,
      memoryId: gift.memory_id,
      publicGuestName: gift.public_guest_name,
      unlockedAt: gift.unlocked_at,
      paymentGuestName: gift.payment_guest_name,
      guestEmail: gift.guest_email,
      guestId: gift.guest_id,
      guestGroupId: gift.guest_group_id,
      amount: gift.amount,
      status: gift.status,
      approvedAt: gift.approved_at,
      paymentCreatedAt: gift.payment_created_at,
    })),
  });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const body = await request.json().catch(() => null);
  const memoryId = body?.memoryId;
  const publicGuestName =
    typeof body?.publicGuestName === "string" ? body.publicGuestName.trim() : "";

  if (!Number.isInteger(memoryId) || !memories.some(({ id }) => id === memoryId)) {
    return NextResponse.json(
      { success: false, message: "Selecione uma memória válida." },
      { status: 400 }
    );
  }

  if (!publicGuestName || publicGuestName.length > 80) {
    return NextResponse.json(
      { success: false, message: "Informe um nome público de até 80 caracteres." },
      { status: 400 }
    );
  }

  try {
    const created = await grantMemoryWithoutPayment(memoryId, publicGuestName);

    if (!created) {
      return NextResponse.json(
        { success: false, message: "Esta memória já está liberada. Use a lista para editar o nome." },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Manual memory grant error", error);
    return NextResponse.json(
      { success: false, message: "Não foi possível liberar a memória. Atualize a lista antes de tentar novamente." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return unauthorized();
  }

  const body = (await request.json().catch(() => ({}))) as {
    unlockId?: string;
    publicGuestName?: string;
  };
  const unlockId = body.unlockId?.trim() ?? "";
  const publicGuestName = body.publicGuestName?.trim() ?? "";

  if (!unlockId || !publicGuestName) {
    return NextResponse.json(
      { success: false, message: "Informe a memoria e o nome publico." },
      { status: 400 }
    );
  }

  if (publicGuestName.length > 80) {
    return NextResponse.json(
      { success: false, message: "O nome publico deve ter ate 80 caracteres." },
      { status: 400 }
    );
  }

  const updated = await updateUnlockedMemoryGuestName(
    unlockId,
    publicGuestName
  );

  if (!updated) {
    return NextResponse.json(
      { success: false, message: "Memoria nao encontrada." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
