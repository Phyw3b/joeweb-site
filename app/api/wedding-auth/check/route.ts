import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "wedding_access";

export async function GET() {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get(COOKIE_NAME)?.value === "granted";

  return NextResponse.json({ authenticated });
}
