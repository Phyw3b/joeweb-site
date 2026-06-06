import { NextResponse } from "next/server";
import {
  isPaymentSimulatorEnabled,
  resetPaymentSimulator,
} from "../../../../../lib/paymentSimulator";

export const runtime = "nodejs";

export async function POST() {
  if (!isPaymentSimulatorEnabled()) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  resetPaymentSimulator();

  return NextResponse.json({ success: true });
}
