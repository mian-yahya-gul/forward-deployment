import { cookies } from "next/headers";

import { signSession, verifySession } from "@/lib/admin-crypto";

/** Owner-only session handling. Fails closed: with the two environment variables unset nothing can log in. */
const COOKIE = process.env.NODE_ENV === "production" ? "__Host-deosai-admin" : "deosai-admin";
export const SESSION_SECONDS = 60 * 60 * 8;

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && (process.env.ADMIN_SESSION_SECRET ?? "").length >= 32);
}

export async function isAdmin(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const jar = await cookies();
  return verifySession(process.env.ADMIN_SESSION_SECRET, jar.get(COOKIE)?.value);
}

export async function startSession(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, signSession(process.env.ADMIN_SESSION_SECRET as string, SESSION_SECONDS), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: SESSION_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
