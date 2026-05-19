import { NextResponse } from "next/server";

const COOKIE_NAME = "wedding_access";

export async function POST() {
  const response = NextResponse.json({ authenticated: false });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
