import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Resend webhook helpers. Resend signs webhooks with Svix: headers svix-id, svix-timestamp and
 * svix-signature ("v1,<base64 HMAC-SHA256>", space-separated when several), computed over
 * "<id>.<timestamp>.<raw body>" with the base64 key that follows "whsec_" in the signing secret.
 * Verification must use the RAW request body.
 */

export const TRACKED_EVENTS = new Set([
  "email.sent",
  "email.delivered",
  "email.delivery_delayed",
  "email.bounced",
  "email.complained",
  "email.failed",
  "email.suppressed",
]);

export type SvixHeaders = { id: string | null; timestamp: string | null; signature: string | null };
export type VerifyResult = { ok: true } | { ok: false; reason: string };

export function verifySvixSignature(
  secret: string,
  headers: SvixHeaders,
  rawBody: string,
  nowSeconds: number = Math.floor(Date.now() / 1000),
  toleranceSeconds = 300,
): VerifyResult {
  if (!headers.id || !headers.timestamp || !headers.signature) return { ok: false, reason: "missing signature headers" };
  const timestamp = Number(headers.timestamp);
  if (!Number.isFinite(timestamp)) return { ok: false, reason: "bad timestamp" };
  if (Math.abs(nowSeconds - timestamp) > toleranceSeconds) return { ok: false, reason: "timestamp outside tolerance" };

  const key = Buffer.from(secret.startsWith("whsec_") ? secret.slice(6) : secret, "base64");
  if (key.length === 0) return { ok: false, reason: "signing secret is not valid base64" };
  const expected = createHmac("sha256", key).update(`${headers.id}.${headers.timestamp}.${rawBody}`).digest();

  for (const part of headers.signature.split(" ")) {
    const [version, signature] = part.split(",");
    if (version !== "v1" || !signature) continue;
    const given = Buffer.from(signature, "base64");
    if (given.length === expected.length && timingSafeEqual(given, expected)) return { ok: true };
  }
  return { ok: false, reason: "invalid signature" };
}

/** The only data we keep: no recipient address, no subject, no body. */
export type StoredEvent = { id: string; type: string; created_at: string; email_id: string; bounce_type?: string };

export function toStoredEvent(eventId: string, rawBody: string): StoredEvent | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null) return null;
  const body = parsed as { type?: unknown; created_at?: unknown; data?: unknown };
  const type = typeof body.type === "string" ? body.type : "";
  if (!TRACKED_EVENTS.has(type)) return null;
  const data = typeof body.data === "object" && body.data !== null ? (body.data as { email_id?: unknown; bounce?: unknown }) : {};
  const emailId = typeof data.email_id === "string" ? data.email_id.slice(0, 64) : "";
  if (!emailId) return null;
  const bounce = typeof data.bounce === "object" && data.bounce !== null ? (data.bounce as { type?: unknown }) : null;
  const event: StoredEvent = {
    id: eventId.slice(0, 128),
    type,
    created_at: typeof body.created_at === "string" ? body.created_at.slice(0, 40) : "",
    email_id: emailId,
  };
  if (bounce && typeof bounce.type === "string") event.bounce_type = bounce.type.slice(0, 32);
  return event;
}
