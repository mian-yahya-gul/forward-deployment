"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { adminConfigured, endSession, isAdmin, startSession } from "@/lib/admin-auth";
import { verifyPassword } from "@/lib/admin-crypto";
import { adminStoreConfigured, clearFailures, failureCount, recordFailure, setKill } from "@/lib/admin-store";

const MAX_FAILURES = 5;
const memory = new Map<string, { n: number; until: number }>();

async function clientKey(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-for") ?? "unknown").split(",")[0].trim().slice(0, 64).replace(/[^0-9a-fA-F.:]/g, "_") || "unknown";
}

export async function loginAction(_prev: { error?: string } | undefined, formData: FormData): Promise<{ error?: string }> {
  if (!adminConfigured()) return { error: "The dashboard is not configured yet." };
  const key = await clientKey();
  const shared = adminStoreConfigured();
  try {
    const blocked = shared ? (await failureCount(key)) >= MAX_FAILURES : (memory.get(key)?.n ?? 0) >= MAX_FAILURES && (memory.get(key)?.until ?? 0) > Date.now();
    if (blocked) return { error: "Too many attempts. Try again in 15 minutes." };
  } catch { return { error: "Temporarily unavailable." }; }
  const password = String(formData.get("password") ?? "").slice(0, 200);
  if (verifyPassword(password, process.env.ADMIN_PASSWORD_HASH)) {
    if (shared) { try { await clearFailures(key); } catch { /* ignore */ } } else memory.delete(key);
    await startSession();
    redirect("/admin");
  }
  await new Promise((r) => setTimeout(r, 800));
  if (shared) { try { await recordFailure(key); } catch { /* ignore */ } }
  else { const cur = memory.get(key); memory.set(key, { n: (cur?.n ?? 0) + 1, until: Date.now() + 15 * 60_000 }); }
  return { error: "Incorrect password." };
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect("/admin");
}

/** Emergency stop. It can only STOP sending: the Mac checks this flag before every send and only the owner (in a terminal) can clear it. */
export async function stopSendingAction(): Promise<void> {
  if (!(await isAdmin()) || !adminStoreConfigured()) return;
  await setKill();
  redirect("/admin?stopped=1");
}
