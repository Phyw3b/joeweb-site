import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "gift_admin_access";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8;

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === "granted";
}
