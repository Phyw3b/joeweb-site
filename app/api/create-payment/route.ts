import crypto from "crypto";
import { NextResponse } from "next/server";
import {
  createGiftPayment,
  GiftGroupLimitError,
  markGiftPaymentRejected,
  setGiftPaymentPreference,
} from "../../../lib/giftsDb";
import { findGiftGuestGroup } from "../../../lib/googleSheets";
import { getMemory } from "../../../lib/memories";
import {
  createSimulatedGiftPayment,
  isPaymentSimulatorEnabled,
  SimulatedGiftGroupLimitError,
} from "../../../lib/paymentSimulator";

export const runtime = "nodejs";

const minimumGiftAmount = 100;
const guestNotFoundMessage =
  "Não encontramos esse nome na lista de convidados. Confira o nome usado no RSVP ou fale com os noivos.";
const minimumMessage = "O valor mínimo para desbloquear uma memória é R$100 ❤️";

type CreatePaymentBody = {
  memoryId?: number;
  guestName?: string;
  guestEmail?: string;
  amount?: number;
};

type MercadoPagoPreference = {
  id?: string;
  init_point?: string;
  sandbox_init_point?: string;
  message?: string;
  error?: string;
  cause?: Array<{ code?: string; description?: string }>;
};

function safePreferenceDetail(preference: MercadoPagoPreference) {
  return (
    preference.message ??
    preference.error ??
    preference.cause
      ?.map((cause) => cause.description ?? cause.code)
      .filter(Boolean)
      .join("; ") ??
    "Mercado Pago não retornou detalhe."
  );
}

function errorResponse(error: string, detail: string, status: number) {
  return NextResponse.json({ success: false, error, detail }, { status });
}

function publicPaymentError(detail: string, status = 502) {
  return errorResponse("Não foi possível iniciar o pagamento.", detail, status);
}

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
    const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

    console.info("create-payment: received checkout request", {
      hasMercadoPagoAccessToken: Boolean(mercadoPagoToken),
      hasDatabaseUrl,
      hasSiteUrl: Boolean(siteUrl),
      payload: {
        hasMemoryId: Number.isFinite(memoryId),
        memoryId: Number.isFinite(memoryId) ? memoryId : null,
        hasGuestName: Boolean(guestName),
        hasGuestEmail: Boolean(guestEmail),
        hasAmount: Number.isFinite(amount),
        amount: Number.isFinite(amount) ? amount : null,
      },
    });

    if (!getMemory(memoryId)) {
      return errorResponse(
        "Memória não encontrada.",
        "memory_id_invalid",
        404
      );
    }

    if (!guestName || !guestEmail) {
      return errorResponse(
        "Informe nome e e-mail para presentear.",
        "missing_guest_data",
        400
      );
    }

    if (!Number.isFinite(amount) || amount < minimumGiftAmount) {
      return errorResponse(minimumMessage, "amount_below_minimum", 400);
    }

    const externalReference = `memory_${memoryId}_${crypto.randomUUID()}`;

    if (isPaymentSimulatorEnabled()) {
      try {
        const guestGroup = await findGiftGuestGroup(guestName).catch(() => null);
        const simulatedPayment = createSimulatedGiftPayment({
          memoryId,
          guestId: guestGroup?.guestId,
          guestGroupId: guestGroup?.guestGroupId,
          guestName: guestGroup?.guestName ?? guestName,
          guestEmail,
          amount,
          externalReference,
        });

        if (!simulatedPayment.ok) {
          return errorResponse(guestNotFoundMessage, "", 404);
        }

        return NextResponse.json({
          success: true,
          init_point: `/api/dev/mercado-pago-simulator?externalReference=${externalReference}`,
          preference_id: simulatedPayment.preferenceId,
        });
      } catch (error) {
        if (error instanceof SimulatedGiftGroupLimitError) {
          return errorResponse(error.message, "", 409);
        }

        throw error;
      }
    }

    if (!siteUrl || !mercadoPagoToken || !hasDatabaseUrl) {
      console.error("create-payment: missing required payment configuration", {
        missing: [
          !siteUrl ? "NEXT_PUBLIC_SITE_URL" : "",
          !mercadoPagoToken ? "MERCADO_PAGO_ACCESS_TOKEN" : "",
          !hasDatabaseUrl ? "DATABASE_URL" : "",
        ]
          .filter(Boolean)
          .join(","),
      });

      return errorResponse(
        "Pagamento ainda não configurado.",
        "payment_not_configured",
        500
      );
    }

    const guestGroup = await findGiftGuestGroup(guestName);

    if (!guestGroup) {
      return errorResponse(guestNotFoundMessage, "", 404);
    }

    try {
      await createGiftPayment({
        memoryId,
        guestId: guestGroup.guestId,
        guestGroupId: guestGroup.guestGroupId,
        guestName: guestGroup.guestName,
        guestEmail,
        amount,
        externalReference,
      });
    } catch (error) {
      if (error instanceof GiftGroupLimitError) {
        return errorResponse(error.message, "", 409);
      }

      throw error;
    }

    const notificationUrl = `${siteUrl}/api/webhooks/mercado-pago`;
    const preferencePayload = {
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
        name: guestGroup.guestName,
        email: guestEmail,
      },
      external_reference: externalReference,
      notification_url: notificationUrl,
      back_urls: {
        success: `${siteUrl}/presentes?status=approved`,
        pending: `${siteUrl}/presentes?status=pending`,
        failure: `${siteUrl}/presentes?status=failure`,
      },
      auto_return: "approved",
    };

    console.info("create-payment: creating Mercado Pago preference", {
      externalReference,
      memoryId,
      amount,
      hasPayerEmail: Boolean(guestEmail),
      notificationUrl,
      siteUrl,
    });

    const preferenceResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mercadoPagoToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencePayload),
      }
    );
    const preference =
      (await preferenceResponse
        .json()
        .catch(() => ({}))) as MercadoPagoPreference;

    if (!preferenceResponse.ok || !preference.id) {
      const detail = safePreferenceDetail(preference);

      console.error("create-payment: Mercado Pago preference error", {
        status: preferenceResponse.status,
        detail,
        hasPreferenceId: Boolean(preference.id),
      });

      await markGiftPaymentRejected(externalReference);
      return publicPaymentError("payment_provider_unavailable");
    }

    await setGiftPaymentPreference(externalReference, preference.id);

    const initPoint = preference.init_point ?? preference.sandbox_init_point;

    if (!initPoint) {
      await markGiftPaymentRejected(externalReference);
      return publicPaymentError("payment_provider_unavailable");
    }

    return NextResponse.json({
      success: true,
      init_point: initPoint,
      preference_id: preference.id,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown_error";
    console.error("create-payment: unexpected error", { detail });

    return publicPaymentError("payment_unavailable", 500);
  }
}
