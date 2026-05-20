import crypto from "crypto";
import { NextResponse } from "next/server";
import { createGiftPayment } from "../../../lib/giftsDb";
import { getMemory } from "../../../lib/memories";

const minimumGiftAmount = 100;
const minimumMessage = "O valor mínimo para desbloquear uma memória é R$100 ❤️";

type CreatePaymentBody = {
  memoryId?: number;
  guestName?: string;
  guestEmail?: string;
  amount?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as
      | CreatePaymentBody
      | null;
    const memoryId = Number(body?.memoryId);
    const guestName = body?.guestName?.trim() ?? "";
    const guestEmail = body?.guestEmail?.trim() ?? "";
    const amount = Number(body?.amount);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const mercadoPagoToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!getMemory(memoryId)) {
      return NextResponse.json(
        { success: false, message: "Memória não encontrada." },
        { status: 404 }
      );
    }

    if (!guestName || !guestEmail) {
      return NextResponse.json(
        { success: false, message: "Informe nome e e-mail para presentear." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amount) || amount < minimumGiftAmount) {
      return NextResponse.json(
        { success: false, message: minimumMessage },
        { status: 400 }
      );
    }

    if (!siteUrl || !mercadoPagoToken) {
      return NextResponse.json(
        { success: false, message: "Pagamento ainda não configurado." },
        { status: 500 }
      );
    }

    const externalReference = `memory_${memoryId}_${crypto.randomUUID()}`;
    const preferenceResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mercadoPagoToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              id: String(memoryId),
              title: `Memória Joe & Web ${String(memoryId).padStart(2, "0")}`,
              quantity: 1,
              unit_price: amount,
              currency_id: "BRL",
            },
          ],
          payer: {
            name: guestName,
            email: guestEmail,
          },
          external_reference: externalReference,
          notification_url: `${siteUrl}/api/webhooks/mercado-pago`,
          back_urls: {
            success: `${siteUrl}/presentes`,
            pending: `${siteUrl}/presentes`,
            failure: `${siteUrl}/presentes`,
          },
          auto_return: "approved",
        }),
      }
    );
    const preference = (await preferenceResponse.json()) as {
      id?: string;
      init_point?: string;
      sandbox_init_point?: string;
      message?: string;
    };

    if (!preferenceResponse.ok || !preference.id) {
      console.error("Mercado Pago preference error", preference);
      return NextResponse.json(
        { success: false, message: "Não foi possível iniciar o pagamento." },
        { status: 502 }
      );
    }

    await createGiftPayment({
      memoryId,
      guestName,
      guestEmail,
      amount,
      externalReference,
      preferenceId: preference.id,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: preference.init_point ?? preference.sandbox_init_point,
    });
  } catch (error) {
    console.error("Create payment error", error);

    return NextResponse.json(
      { success: false, message: "Não foi possível iniciar o pagamento." },
      { status: 500 }
    );
  }
}
