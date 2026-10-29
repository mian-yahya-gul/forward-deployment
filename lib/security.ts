import { NextResponse } from "next/server";

/**
 * Shared request hardening for the public API routes: client IP resolution,
 * a per-instance rate limiter, same-origin enforcement, and bounded JSON
 * parsing. The limiter is in-memory (resets on cold start, not shared across
 * serverless instances) — a soft brake against abuse, not a hard guarantee.
 * Swap for a durable store (e.g. Upstash) if traffic warrants it.
 */

const MAX_TRACKED_CLIENTS = 5_000;

const buckets = new Map<string, { count: number; windowStart: number }>();

export function getClientIp(request: Request): string {
  // Vercel sets x-real-ip / x-vercel-forwarded-for itself; x-forwarded-for's first hop is
  // only a fallback because it can be client-supplied behind other proxies.
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** Returns true when `key` has exceeded `max` hits inside the current `windowMs`. */
export function isRateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();

  if (buckets.size > MAX_TRACKED_CLIENTS) {
    for (const [k, entry] of buckets) {
      if (now - entry.windowStart > windowMs) buckets.delete(k);
    }
    // Still full of live entries: drop the oldest so memory stays bounded.
    if (buckets.size > MAX_TRACKED_CLIENTS) {
      const oldest = buckets.keys().next().value;
      if (oldest !== undefined) buckets.delete(oldest);
    }
  }

  const entry = buckets.get(key);
  if (!entry || now - entry.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > max;
}

/**
 * Browsers always send Origin on cross-origin and same-origin POSTs, so a missing or
 * mismatched Origin means the request didn't come from this site's own pages.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Reads a JSON body no larger than `maxBytes`; returns null when missing, oversized, or malformed. */
export async function readJson(request: Request, maxBytes: number): Promise<unknown | null> {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) return null;

  const text = await request.text().catch(() => null);
  if (text === null || text.length > maxBytes) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Trimmed string field, or "" for anything that isn't a string. */
export function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Collapses CR/LF and control characters so a value can't inject extra header lines. */
export function singleLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
}

export function forbidden() {
  return NextResponse.json({ error: "Forbidden." }, { status: 403 });
}

export function tooManyRequests(message = "Too many requests — please try again later.") {
  return NextResponse.json({ error: message }, { status: 429, headers: { "Retry-After": "60" } });
}
