import { NextResponse } from "next/server";
import {
  getGiftAdminRows,
  updateUnlockedMemoryGuestName,
} from "../../../../lib/giftsDb";
import { isAdminAuthenticated } from "../shared";

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
