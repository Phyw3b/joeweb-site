import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../shared";

export async function GET() {
  return NextResponse.json({
    authenticated: await isAdminAuthenticated(),
  });
}
