import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * Pure crypto helpers for the owner-only dashboard (no Next.js imports so they can be tested on their own).
 * Password: scrypt hash in the form "scrypt$<N>$<saltHex>$<hashHex>" (made locally by scripts/make-admin-hash.mjs, never by the app).
 * Session: "<expiryMs>.<nonce>.<hmac>" signed with ADMIN_SESSION_SECRET.
 */

const KEYLEN = 32;

export function hashPassword(password: string, saltHex = randomBytes(16).toString("hex"), n = 16384): string {
  const hash = scryptSync(password, Buffer.from(saltHex, "hex"), KEYLEN, { N: n }).toString("hex");
  return `scrypt$${n}$${saltHex}$${hash}`;
}

export function verifyPassword(password: string, stored: string | undefined): boolean {
  if (!stored) return false;
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "scrypt") return false;
  const n = Number(parts[1]);
  if (!Number.isInteger(n) || n < 16384 || n > 1_048_576) return false;
  try {
    const expected = Buffer.from(parts[3], "hex");
    if (expected.length !== KEYLEN) return false;
    const actual = scryptSync(password, Buffer.from(parts[2], "hex"), KEYLEN, { N: n });
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

const sign = (secret: string, payload: string) => createHmac("sha256", secret).update(payload).digest("hex");

export function signSession(secret: string, ttlSeconds: number, now = Date.now()): string {
  const payload = `${now + ttlSeconds * 1000}.${randomBytes(12).toString("hex")}`;
  return `${payload}.${sign(secret, payload)}`;
}

export function verifySession(secret: string | undefined, token: string | undefined, now = Date.now()): boolean {
  if (!secret || secret.length < 32 || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expiry, nonce, mac] = parts;
  const exp = Number(expiry);
  if (!Number.isFinite(exp) || exp < now) return false;
  const expected = Buffer.from(sign(secret, `${expiry}.${nonce}`), "hex");
  const given = Buffer.from(mac, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}
