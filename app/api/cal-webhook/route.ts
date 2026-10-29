import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

import { getEmailConfig, renderEmailHtml, rowsToText, sendEmail } from "@/lib/email";
import { singleLine } from "@/lib/security";

/**
 * Cal.com webhook → business notification email.
 *
 * Cal.com itself sends the attendee's confirmation, reschedule and cancellation emails, so this
 * route only notifies DeosAI Labs. Requests must carry a valid HMAC-SHA256 signature
 * (x-cal-signature-256) made with CAL_WEBHOOK_SECRET; anything else is rejected.
 * Duplicate deliveries are collapsed with a Resend idempotency key derived from the event,
 * booking uid and start time, so retries never produce a second notification.
 */

const MAX_BODY_BYTES = 256_000;
const CAL_BASE_URL = "https://app.cal.com";

type Json = Record<string, unknown>;

const EVENT_LABELS: Record<string, string> = {
  BOOKING_CREATED: "New Discovery Call Booked",
  BOOKING_REQUESTED: "Discovery Call Requested (awaiting confirmation)",
  BOOKING_RESCHEDULED: "Discovery Call Rescheduled",
  BOOKING_CANCELLED: "Discovery Call Cancelled",
};

function isObject(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, max = 1_000): string {
  if (value === null || value === undefined) return "";
  const raw = typeof value === "string" ? value : typeof value === "number" || typeof value === "boolean" ? String(value) : JSON.stringify(value);
  return raw.trim().slice(0, max);
}

function validSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const given = Buffer.from(header.trim().toLowerCase(), "utf8");
  const wanted = Buffer.from(expected, "utf8");
  return given.length === wanted.length && timingSafeEqual(given, wanted);
}

function toIso(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

function formatWhen(iso: string, timeZone: string, style: "full" | "short"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  try {
    return new Intl.DateTimeFormat("en-US", {
      ...(style === "full" ? { dateStyle: "full", timeStyle: "short" } : { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
      timeZone,
      ...(style === "full" ? { timeZoneName: "short" } : {}),
    } as Intl.DateTimeFormatOptions).format(date);
  } catch {
    return date.toISOString();
  }
}

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    // Never accept unsigned webhooks just because the secret is missing.
    console.error("[cal-webhook] CAL_WEBHOOK_SECRET is not configured.");
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  const rawBody = await request.text().catch(() => "");
  if (!rawBody || rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!validSignature(rawBody, request.headers.get("x-cal-signature-256"), secret)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  if (!isObject(body)) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const trigger = text(body.triggerEvent, 64);

  // Cal.com's "Test webhook" button sends PING; acknowledge without emailing.
  if (trigger === "PING") return NextResponse.json({ ok: true, ignored: "ping" });

  const label = EVENT_LABELS[trigger];
  if (!label) return NextResponse.json({ ok: true, ignored: trigger || "unknown" });

  const payload = isObject(body.payload) ? body.payload : null;
  const uid = text(payload?.uid, 128);
  const startTime = text(payload?.startTime, 64);
  if (!payload || !uid || !startTime) {
    return NextResponse.json({ error: "Missing booking details." }, { status: 400 });
  }

  const attendee = Array.isArray(payload.attendees) && isObject(payload.attendees[0]) ? payload.attendees[0] : {};
  const organizer = isObject(payload.organizer) ? payload.organizer : {};
  const responses = isObject(payload.responses) ? payload.responses : {};

  const name = singleLine(text(attendee.name, 100)) || "Unknown attendee";
  const email = text(attendee.email, 254);
  const attendeeZone = text(attendee.timeZone, 64) || "UTC";
  const organizerZone = text(organizer.timeZone, 64) || attendeeZone;
  const endTime = text(payload.endTime, 64);
  const duration = Number(payload.length);
  const location = text(payload.location, 500);
  const meetingLink =
    text(isObject(payload.metadata) ? payload.metadata.videoCallUrl : "", 500) ||
    text(isObject(payload.videoCallData) ? payload.videoCallData.url : "", 500) ||
    (/^https:\/\//i.test(location) ? location : "");

  // Booking questions come through `responses` as { slug: { label, value } }; list every answer
  // generically so changes to the Cal.com event's questions need no code change.
  const answers: Array<[string, string]> = [];
  for (const [slug, entry] of Object.entries(responses)) {
    if (slug === "name" || slug === "email") continue;
    const rawValue = isObject(entry) ? entry.value : entry;
    const value = Array.isArray(rawValue) ? rawValue.map((v) => text(v, 200)).join(", ") : text(rawValue);
    if (!value) continue;
    answers.push([text(isObject(entry) ? entry.label : slug, 120) || slug, value]);
  }

  const rows: Array<[string, string]> = [
    ["Status", label],
    ["Name", name],
    ["Email", email],
    ...answers,
    ["Meeting time", formatWhen(startTime, organizerZone, "full")],
    ["Attendee's time", `${formatWhen(startTime, attendeeZone, "full")} (${attendeeZone})`],
    ["Start (UTC)", toIso(startTime)],
    ...(endTime ? ([["End (UTC)", toIso(endTime)]] as Array<[string, string]>) : []),
    ...(Number.isFinite(duration) && duration > 0 ? ([["Duration", `${duration} minutes`]] as Array<[string, string]>) : []),
    ...(meetingLink ? ([["Meeting link", meetingLink]] as Array<[string, string]>) : location ? ([["Location", location]] as Array<[string, string]>) : []),
    ...(trigger === "BOOKING_CANCELLED" && text(payload.cancellationReason)
      ? ([["Cancellation reason", text(payload.cancellationReason)]] as Array<[string, string]>)
      : []),
    ["Booking reference", uid],
  ];

  const manageUrl = `${CAL_BASE_URL}/booking/${encodeURIComponent(uid)}`;
  const dateLabel = formatWhen(startTime, organizerZone, "short");
  const config = getEmailConfig();

  if (!config.configured) {
    console.error(`[cal-webhook] RESEND_API_KEY is not configured; booking ${uid} was not notified.`);
    return NextResponse.json({ error: "Email delivery not configured." }, { status: 500 });
  }

  const delivered = await sendEmail({
    to: config.notifyTo,
    ...(email ? { replyTo: email } : {}),
    subject: `${label.replace(" (awaiting confirmation)", "")} — ${name} — ${dateLabel}`,
    text: `${rowsToText(rows)}\n\nBooking page (reschedule or cancel): ${manageUrl}`,
    html: renderEmailHtml({
      heading: label,
      rows,
      button: { label: "Open booking page", url: manageUrl },
      paragraphs: ["Use the booking page to reschedule or cancel. Cal.com has already emailed the attendee their own confirmation."],
    }),
    idempotencyKey: createHash("sha256").update(`${trigger}:${uid}:${startTime}`).digest("hex"),
    logTag: "cal-webhook",
  });

  if (!delivered) {
    // The booking itself lives safely in Cal.com and the connected calendar; a non-2xx lets Cal.com
    // retry, and the uid below is enough to find the booking in Cal.com if it never goes through.
    console.error(`[cal-webhook] Notification failed for booking ${uid} (${trigger}).`);
    return NextResponse.json({ error: "Notification failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
