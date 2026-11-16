import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";

const cookie = "lesmes_admin";
const ttl = 60 * 60 * 8;
const digest = (value: string) => createHash("sha256").update(value).digest();

function signature(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? createHmac("sha256", secret).update(value).digest("hex") : "";
}

export function passwordMatches(input: string) {
  const password = process.env.ADMIN_PASSWORD;
  return Boolean(password && password.length >= 16 && signature("configured") &&
    timingSafeEqual(digest(input), digest(password)));
}

export async function startSession() {
  const expiry = String(Math.floor(Date.now() / 1000) + ttl);
  (await cookies()).set(cookie, expiry + "." + signature("session:" + expiry + ":" + process.env.ADMIN_PASSWORD), {
    httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production",
    maxAge: ttl, path: "/",
  });
}

export async function adminAuthenticated() {
  const token = (await cookies()).get(cookie)?.value;
  if (!token || !process.env.ADMIN_PASSWORD) return false;
  const [expiry, mac] = token.split(".");
  const expected = signature("session:" + expiry + ":" + process.env.ADMIN_PASSWORD);
  return Boolean(mac && expected && /^\d+$/.test(expiry) &&
    Number(expiry) > Date.now() / 1000 && timingSafeEqual(digest(mac), digest(expected)));
}

export async function endSession() {
  (await cookies()).delete(cookie);
}

export async function requestKey() {
  const request = await headers();
  const address = request.get("x-vercel-forwarded-for") ?? request.get("x-forwarded-for") ?? "local";
  return signature(address.split(",").at(-1)?.trim() || "local") || digest(address).toString("hex");
}
