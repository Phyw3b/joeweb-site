import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "../../shared";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });

  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
