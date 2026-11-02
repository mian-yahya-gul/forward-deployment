import { NextResponse } from "next/server";

import { budgetOptions, enquiryTypes, timelineOptions } from "@/lib/data/contact";
import { getEmailConfig, logEmailConfigProblems, renderEmailHtml, rowsToText, sendEmail } from "@/lib/email";
import { forbidden, getClientIp, isRateLimited, isSameOrigin, readJson, singleLine, str, tooManyRequests } from "@/lib/security";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_BODY_BYTES = 10_000;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_COMPANY = 150;
const MAX_WEBSITE = 200;
const MAX_COUNTRY = 80;
const MAX_MESSAGE = 5_000;
const RATE_LIMIT_WINDOW_MS = 60 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const labelFor = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label;

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
  const country = singleLine(str(data.country));
  const enquiryType = singleLine(str(data.enquiryType));
  const budget = singleLine(str(data.budget));
  const timeline = singleLine(str(data.timeline));
  const websiteInput = singleLine(str(data.website));
  const message = str(data.message);

  if (!name || !email || !company || !country || !message) {
    return NextResponse.json(
      { error: "Name, business email, company, country and project description are required." },
      { status: 400 },
    );
  }

  const enquiryLabel = labelFor(enquiryTypes, enquiryType);
  if (!enquiryLabel) {
    return NextResponse.json({ error: "Please choose an enquiry type." }, { status: 400 });
  }

  // Optional selects: blank is fine, anything else must be one of the offered values.
  const budgetLabel = budget ? labelFor(budgetOptions, budget) : "";
  const timelineLabel = timeline ? labelFor(timelineOptions, timeline) : "";
  if (budgetLabel === undefined || timelineLabel === undefined) {
    return NextResponse.json({ error: "Please choose a budget and timeline from the list, or leave them blank." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (
    name.length > MAX_NAME ||
    company.length > MAX_COMPANY ||
    country.length > MAX_COUNTRY ||
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
  if (logEmailConfigProblems(config, "contact")) {
    return NextResponse.json(
      { error: "Your enquiry couldn't be sent right now. Please email us directly." },
      { status: 503 },
    );
  }

  const rows: Array<[string, string]> = [
    ["Enquiry type", enquiryLabel],
    ["Name", name],
    ["Email", email],
    ["Company", company],
    ["Country", country],
    ...(website ? ([["Website", website]] as Array<[string, string]>) : []),
    ...(budgetLabel ? ([["Budget", budgetLabel]] as Array<[string, string]>) : []),
    ...(timelineLabel ? ([["Timeline", timelineLabel]] as Array<[string, string]>) : []),
    ["Project description", message],
  ];

  const delivered = await sendEmail({
    to: config.notifyTo,
    replyTo: email,
    subject: `[${enquiryLabel}] New enquiry from ${name} (${company})`,
    text: rowsToText(rows),
    html: renderEmailHtml({ heading: `New website enquiry: ${enquiryLabel}`, rows }),
    logTag: "contact",
  });

  if (!delivered) {
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email us directly." },
      { status: 502 },
    );
  }

  // Acknowledgment is best-effort: the inquiry is already safely delivered, so a failure here
  // must not turn a successful submission into an error.
  await sendEmail({
    to: email,
    subject: "We received your enquiry — DeosAI Labs",
    text: [
      `Hi ${name},`,
      "",
      "Thanks for reaching out to DeosAI Labs. We've received your enquiry and will review it and reply by email.",
      "",
      "If you'd rather talk it through, you can book a discovery call any time: https://www.deosailabs.com/contact#book",
      "",
      "— The DeosAI Labs team",
    ].join("\n"),
    html: renderEmailHtml({
      heading: "We received your enquiry",
      intro: `Hi ${name}, thanks for reaching out to DeosAI Labs.`,
      paragraphs: [
        "We will review it and reply to you by email.",
        "If you'd rather talk it through, you can book a discovery call at any time.",
      ],
      button: { label: "Book a Discovery Call", url: "https://www.deosailabs.com/contact#book" },
    }),
    logTag: "contact-ack",
  });

  return NextResponse.json({ ok: true });
}
