/**
 * Read/write helpers for the owner-only dashboard, using the same Upstash-compatible REST store as the webhook
 * (EVENT_STORE_URL, EVENT_STORE_TOKEN). Keys:
 *   admin:snapshot   JSON summary pushed by the Mac (`crm.py push-dashboard`): minimal fields, no email addresses, no contact names.
 *   resend:events:log  most recent verified delivery events (capped), written by the webhook.
 *   admin:kill       set by the dashboard's STOP button; the Mac honours it before any send. Only the Mac (owner, in a terminal) can clear it.
 */

export type SnapshotLead = {
  id: number; company: string; country: string; category: string; status: string; assessment: string; reason: string;
  sentAt: string | null; delivery: string | null; providerId: string | null; followUpDue: string | null; kind: string | null;
};
export type SnapshotReply = { ts: string; company: string; kind: string; note: string };
export type AdminSnapshot = {
  generatedAt: string;
  state: { originalLia: string; ukLia: string; ukAuth: string; usLia: string; usAuth: string; ukDirectLia?: string; ukDirectAuth?: string; killLocal: boolean };
  counts: Record<string, number>;
  usage: { ukToday: string; ukMonth: string; usToday: string; usMonth: string; ukDirectToday?: string; ukDirectMonth?: string };
  leads: SnapshotLead[];
  replies: SnapshotReply[];
  scopes?: SnapshotScope[];
  leaddb?: { release: string | null; lastOk: string | null; failed: boolean; error: string | null } | null;
  halting?: number;
};
export type SnapshotScope = {
  key: string; label: string; lia: { ok: boolean; text: string };
  auth: { active: boolean; text: string; dailyLimit: number | null; monthlyLimit: number | null; usedToday: number; usedMonth: number; expires: string | null; autoFirst: boolean; followUps: number | null };
};
export type DeliveryEvent = { id: string; type: string; email_id: string; created_at?: string; bounce_type?: string | null };

export function adminStoreConfigured(): boolean {
  return Boolean(process.env.EVENT_STORE_URL && process.env.EVENT_STORE_TOKEN);
}

async function call(command: (string | number)[]): Promise<unknown> {
  const url = process.env.EVENT_STORE_URL;
  const token = process.env.EVENT_STORE_TOKEN;
  if (!url || !token) throw new Error("store not configured");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`store responded ${response.status}`);
  return ((await response.json()) as { result?: unknown }).result;
}

export async function getSnapshot(): Promise<AdminSnapshot | null> {
  const raw = await call(["GET", "admin:snapshot"]);
  if (typeof raw !== "string") return null;
  try { return JSON.parse(raw) as AdminSnapshot; } catch { return null; }
}

export async function getRecentEvents(limit = 60): Promise<DeliveryEvent[]> {
  const raw = (await call(["LRANGE", "resend:events:log", 0, limit - 1])) as unknown;
  if (!Array.isArray(raw)) return [];
  const out: DeliveryEvent[] = [];
  for (const item of raw) {
    try { out.push(JSON.parse(String(item)) as DeliveryEvent); } catch { /* skip malformed */ }
  }
  return out;
}

export async function getKill(): Promise<string | null> {
  const raw = await call(["GET", "admin:kill"]);
  return typeof raw === "string" ? raw : null;
}

export async function setKill(): Promise<void> {
  await call(["SET", "admin:kill", new Date().toISOString()]);
}

/** Failed-login counter per client for a 15-minute window. Returns the count after this failure. */
export async function recordFailure(key: string): Promise<number> {
  const n = Number(await call(["INCR", `admin:fail:${key}`]));
  if (n === 1) await call(["EXPIRE", `admin:fail:${key}`, 900]);
  return n;
}
export async function failureCount(key: string): Promise<number> {
  const raw = await call(["GET", `admin:fail:${key}`]);
  return Number(raw ?? 0) || 0;
}
export async function clearFailures(key: string): Promise<void> {
  await call(["DEL", `admin:fail:${key}`]);
}
