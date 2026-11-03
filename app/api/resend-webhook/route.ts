import { NextResponse } from "next/server";

import { toStoredEvent, verifySvixSignature } from "@/lib/resend-webhook";
import { pushEvent, storeConfigured } from "@/lib/webhook-store";

/**
 * Resend webhook receiver (email.sent, delivered, delivery_delayed, bounced, complained, failed, suppressed).
 *
 * Fails closed: without RESEND_WEBHOOK_SECRET and the event-store variables it answers 503 and stores nothing.
 * Every request must carry a valid Svix signature made over the raw body; anything else gets 401. Only a minimal
 * event record (id, type, time, Resend email id, bounce type) is stored: never the recipient, subject or body.
 * A 500 is returned if storing fails so that Resend retries; duplicate deliveries are handled by the CRM.
 *
 * Inert until the three environment variables are set in Vercel.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 64_000;

export async function POST(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret || !storeConfigured()) {
    console.error("[resend-webhook] receiver is not configured");
    return NextResponse.json({ error: "Webhook receiver is not configured." }, { status: 503 });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) return NextResponse.json({ error: "Payload too large." }, { status: 413 });

  const id = request.headers.get("svix-id");
  const verification = verifySvixSignature(
    secret,
    { id, timestamp: request.headers.get("svix-timestamp"), signature: request.headers.get("svix-signature") },
    rawBody,
  );
  if (!verification.ok) return NextResponse.json({ error: "Invalid signature." }, { status: 401 });

  const event = toStoredEvent(id ?? "", rawBody);
  if (!event) return NextResponse.json({ ok: true, ignored: true });

  try {
    await pushEvent(event);
  } catch (error) {
    console.error("[resend-webhook] could not store event", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Could not store event." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
