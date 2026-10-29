import { NextResponse } from "next/server";

import { getEmailConfig, renderEmailHtml, rowsToText, sendEmail } from "@/lib/email";
import { forbidden, getClientIp, isRateLimited, isSameOrigin, readJson, singleLine, str, tooManyRequests } from "@/lib/security";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_BODY_BYTES = 10_000;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_COMPANY = 150;
const MAX_WEBSITE = 200;
const MAX_MESSAGE = 5_000;
const RATE_LIMIT_WINDOW_MS = 60 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

/** Accepts "example.com" or a full http(s) URL; returns a normalized URL, "" when blank, or null when invalid. */
function normalizeWebsite(value: string): string | null {
  if (!value) return "";
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return forbidden();

  if (isRateLimited(`contact:${getClientIp(request)}`, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS)) {
    return tooManyRequests();
  }

  const data = (await readJson(request, MAX_BODY_BYTES)) as Record<string, unknown> | null;
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field — hidden from real visitors via CSS; bots tend to fill every field.
  if (data.nickname) {
    // Pretend success so bots don't learn to skip this field.
    return NextResponse.json({ ok: true });
  }

  const name = singleLine(str(data.name));
  const email = str(data.email);
  const company = singleLine(str(data.company));
  const websiteInput = singleLine(str(data.website));
  const message = str(data.message);

  if (!name || !email || !company || !message) {
    return NextResponse.json({ error: "Name, work email, company, and message are required." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (
    name.length > MAX_NAME ||
    company.length > MAX_COMPANY ||
    websiteInput.length > MAX_WEBSITE ||
    message.length > MAX_MESSAGE
  ) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  const website = normalizeWebsite(websiteInput);
  if (website === null) {
    return NextResponse.json({ error: "Please enter a valid website address, or leave it blank." }, { status: 400 });
  }

  const config = getEmailConfig();
  if (!config.configured) {
    console.error("[contact] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email delivery isn't configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ...(website ? ([["Website", website]] as Array<[string, string]>) : []),
    ["Message", message],
  ];

  const delivered = await sendEmail({
    to: config.notifyTo,
    replyTo: email,
    subject: `New inquiry from ${name} (${company})`,
    text: rowsToText(rows),
    html: renderEmailHtml({ heading: "New website inquiry", rows }),
    logTag: "contact",
  });

  if (!delivered) {
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email us directly." },
      { status: 502 },
    );
  }

  // Acknowledgment is best-effort: the inquiry is already safely delivered, so a failure here
  // must not turn a successful submission into an error. Only possible from a verified sender.
  if (config.canEmailVisitors) {
    await sendEmail({
      to: email,
      subject: "We received your message — DeosAI Labs",
      text: [
        `Hi ${name},`,
        "",
        "Thanks for reaching out to DeosAI Labs. We've received your message and will reply by email.",
        "",
        "If you'd rather talk it through, you can book a discovery call any time: https://www.deosailabs.com/contact#book",
        "",
        "— The DeosAI Labs team",
      ].join("\n"),
      html: renderEmailHtml({
        heading: "We received your message",
        intro: `Hi ${name}, thanks for reaching out to DeosAI Labs.`,
        paragraphs: [
          "We'll reply to you by email.",
          "If you'd rather talk it through, you can book a discovery call at any time.",
        ],
        button: { label: "Book a Discovery Call", url: "https://www.deosailabs.com/contact#book" },
      }),
      logTag: "contact-ack",
    });
  }

  return NextResponse.json({ ok: true });
}
