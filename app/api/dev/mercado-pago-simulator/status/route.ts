import { NextResponse } from "next/server";
import {
  isPaymentSimulatorEnabled,
  SimulatedPaymentStatus,
  updateSimulatedPaymentStatus,
} from "../../../../../lib/paymentSimulator";

export const runtime = "nodejs";

const allowedStatuses = new Set<SimulatedPaymentStatus>([
  "approved",
  "pending",
  "rejected",
]);

export async function POST(request: Request) {
  if (!isPaymentSimulatorEnabled()) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  const formData = await request.formData();
  const externalReference = String(formData.get("externalReference") ?? "");
  const status = String(formData.get("status") ?? "") as SimulatedPaymentStatus;

  if (!externalReference || !allowedStatuses.has(status)) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const payment = updateSimulatedPaymentStatus(externalReference, status);

  if (!payment) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  const redirectStatus = status === "approved" ? "approved" : status;

  return NextResponse.redirect(
    new URL(`/presentes?status=${redirectStatus}`, request.url),
    303
  );
}
