import type { StoredEvent } from "@/lib/resend-webhook";

/**
 * Minimal durable queue for verified Resend events, using an Upstash-compatible Redis REST endpoint:
 *   EVENT_STORE_URL    base URL of the REST endpoint
 *   EVENT_STORE_TOKEN  bearer token (secret)
 * Events are appended to the list "resend:events". The local CRM drains the list. Duplicates are harmless: the CRM
 * ignores an event id it has already applied.
 */

export const EVENT_LIST = "resend:events";

export function storeConfigured(): boolean {
  return Boolean(process.env.EVENT_STORE_URL && process.env.EVENT_STORE_TOKEN);
}

export async function pushEvent(event: StoredEvent): Promise<void> {
  const url = process.env.EVENT_STORE_URL;
  const token = process.env.EVENT_STORE_TOKEN;
  if (!url || !token) throw new Error("event store not configured");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(["RPUSH", EVENT_LIST, JSON.stringify(event)]),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`event store responded ${response.status}`);
}
