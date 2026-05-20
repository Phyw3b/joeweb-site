import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "wedding_access";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export async function POST(request: NextRequest) {
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };

  if (!process.env.WEDDING_PASSWORD) {
    return NextResponse.json(
      { message: "Senha do casamento não configurada." },
      { status: 500 }
    );
  }

  if (password?.trim() !== process.env.WEDDING_PASSWORD.trim()) {
    return NextResponse.json(
      { message: "Senha incorreta. Confira no convite e tente novamente." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ authenticated: true });

  response.cookies.set(COOKIE_NAME, "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return response;
}
