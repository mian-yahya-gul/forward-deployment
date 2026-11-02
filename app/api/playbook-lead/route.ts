import { NextResponse } from "next/server";

import { getEmailConfig, logEmailConfigProblems, sendEmail } from "@/lib/email";
import { forbidden, getClientIp, isRateLimited, isSameOrigin, readJson, str, tooManyRequests } from "@/lib/security";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_BODY_BYTES = 2_000;
const MAX_EMAIL = 254;
const RATE_LIMIT_WINDOW_MS = 60 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

/**
 * Captures an email before a visitor reads the Playbook. Only ever notifies the configured
 * CONTACT_NOTIFY_EMAIL inbox (never the lead): this route is lead capture only, not a confirmation
 * email. Access to the book is never blocked on this succeeding (see the modal), so an email
 * outage never costs a reader.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return forbidden();

  if (isRateLimited(`playbook:${getClientIp(request)}`, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS)) {
    return tooManyRequests();
  }

  const data = (await readJson(request, MAX_BODY_BYTES)) as Record<string, unknown> | null;
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = str(data.email);

  // Honeypot field: hidden from real visitors via CSS; bots tend to fill every field.
  if (data.website) {
    // Honeypot tripped: pretend success so bots don't learn to skip this field.
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const config = getEmailConfig();
  if (logEmailConfigProblems(config, "playbook-lead")) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const delivered = await sendEmail({
    to: config.notifyTo,
    subject: `New Playbook lead: ${email}`,
    text: `${email} unlocked The Forward Deployment Playbook.`,
    logTag: "playbook-lead",
  });

  if (!delivered) return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
