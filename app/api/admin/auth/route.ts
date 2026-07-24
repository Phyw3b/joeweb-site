import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_NAME,
  getAdminPassword,
} from "../shared";

export async function POST(request: Request) {
  const { password } = (await request.json().catch(() => ({}))) as {
    password?: string;
  };
  const adminPassword = getAdminPassword();

  if (!adminPassword) {
    return NextResponse.json(
      { message: "Senha administrativa nao configurada." },
      { status: 500 }
    );
  }

  if (password?.trim() !== adminPassword) {
    return NextResponse.json(
      { message: "Senha administrativa incorreta." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ authenticated: true });

  response.cookies.set(ADMIN_COOKIE_NAME, "granted", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });

  return response;
}
