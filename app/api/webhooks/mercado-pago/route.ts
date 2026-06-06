import crypto from "crypto";
import { NextResponse } from "next/server";
import {
  approveGiftPayment,
  syncGiftPaymentStatus,
} from "../../../../lib/giftsDb";

export const runtime = "nodejs";

const minimumGiftAmount = 100;

function getPaymentId(requestUrl: string, body: unknown) {
  const url = new URL(requestUrl);
  const fromQuery = url.searchParams.get("data.id") ?? url.searchParams.get("id");

  if (fromQuery) {
    return fromQuery;
  }

  if (body && typeof body === "object") {
    const payload = body as {
      data?: { id?: string | number };
      id?: string | number;
    };
    return String(payload.data?.id ?? payload.id ?? "");
  }

  return "";
}

function isValidMercadoPagoSignature(request: Request, paymentId: string) {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  const signature = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");

  if (!signature || !requestId || !paymentId) {
    return false;
  }

  const parts = Object.fromEntries(
    signature.split(",").map((part) => {
      const [key, value] = part.split("=");
      return [key?.trim(), value?.trim()];
    })
  );
  const timestamp = parts.ts;
  const receivedHash = parts.v1;

  if (!timestamp || !receivedHash) {
    return false;
  }

  const manifest = `id:${paymentId};request-id:${requestId};ts:${timestamp};`;
  const expectedHash = crypto
    .createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");

  const expected = Buffer.from(expectedHash);
  const received = Buffer.from(receivedHash);

  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

export async function POST(request: Request) {
  try {
    const mercadoPagoToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    const body = await request.json().catch(() => null);
    const paymentId = getPaymentId(request.url, body);

    if (!paymentId) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (!isValidMercadoPagoSignature(request, paymentId)) {
      return NextResponse.json(
        { success: false, message: "Invalid webhook signature." },
        { status: 401 }
      );
    }

    if (!mercadoPagoToken) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not configured.");
    }

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${mercadoPagoToken}`,
        },
        cache: "no-store",
      }
    );
    const payment = (await paymentResponse.json()) as {
      id?: number;
      status?: string;
      external_reference?: string;
      transaction_amount?: number;
    };

    if (!paymentResponse.ok) {
      console.error("Mercado Pago payment lookup error", payment);
      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (payment.status !== "approved") {
      if (payment.external_reference && payment.status) {
        await syncGiftPaymentStatus(
          payment.external_reference,
          payment.status,
          String(payment.id ?? paymentId)
        );
      }

      return NextResponse.json({ received: true }, { status: 200 });
    }

    if (
      !payment.external_reference ||
      !payment.transaction_amount ||
      payment.transaction_amount < minimumGiftAmount
    ) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    await approveGiftPayment({
      externalReference: payment.external_reference,
      mercadoPagoPaymentId: String(payment.id ?? paymentId),
      amount: payment.transaction_amount,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Mercado Pago webhook error", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
