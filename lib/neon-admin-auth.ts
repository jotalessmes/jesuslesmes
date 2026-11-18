import { createNeonAuth } from "@neon/auth/next/server";

export function neonAdminEnabled() {
  return Boolean(process.env.NEON_ADMIN_USER_ID);
}

export function neonAuth() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const secret = process.env.NEON_AUTH_COOKIE_SECRET;
  if (!baseUrl || !secret || secret.length < 32) throw new Error("Configura Neon Auth.");
  return createNeonAuth({ baseUrl, cookies: { secret } });
}

export function isNeonAdmin(user: { id: string } | null | undefined) {
  return Boolean(neonAdminEnabled() && user?.id === process.env.NEON_ADMIN_USER_ID);
}
