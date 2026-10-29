import { NextResponse } from "next/server";

import { isComplete, recommend, sanitizeAnswers } from "@/lib/assessment";
import { getResourceBySlug, resourceToText } from "@/lib/data/resources";
import { getEmailConfig, renderEmailHtml, rowsToText, sendEmail } from "@/lib/email";
import { forbidden, getClientIp, isRateLimited, isSameOrigin, readJson, str, tooManyRequests } from "@/lib/security";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 4_000;
const MAX_EMAIL = 254;
const RATE_LIMIT_WINDOW_MS = 60 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const SITE = "https://www.deosailabs.com";

/**
 * Emails a visitor a copy of a resource or their assessment result, and notifies DeosAI Labs.
 * Content is built on the server from validated ids — never from text the browser sends.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return forbidden();

  if (isRateLimited(`tool-email:${getClientIp(request)}`, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS)) {
    return tooManyRequests();
  }

  const data = (await readJson(request, MAX_BODY_BYTES)) as Record<string, unknown> | null;
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't learn to skip the field.
  if (data.nickname) return NextResponse.json({ ok: true });

  const email = str(data.email);
  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const kind = str(data.kind);
  let subject: string;
  let text: string;
  let html: string;
  let leadLabel: string;
  let leadDetail: string;

  if (kind === "resource") {
    const resource = getResourceBySlug(str(data.slug));
    if (!resource) return NextResponse.json({ error: "Unknown resource." }, { status: 400 });

    subject = `Your copy: ${resource.title}`;
    text = `${resourceToText(resource)}\n\nOnline version: ${SITE}/resources/${resource.slug}`;
    html = renderEmailHtml({
      heading: resource.title,
      intro: resource.intro,
      paragraphs: resource.sections.map(
        (section) => `${section.title}\n${section.items.map((item) => `• ${item}`).join("\n")}`,
      ),
      button: { label: "Open the online version", url: `${SITE}/resources/${resource.slug}` },
    });
    leadLabel = "Resource requested";
    leadDetail = resource.title;
  } else if (kind === "assessment") {
    const answers = sanitizeAnswers(data.answers);
    if (!isComplete(answers)) return NextResponse.json({ error: "Please answer every question." }, { status: 400 });

    const result = recommend(answers);
    subject = "Your AI Opportunity Assessment — DeosAI Labs";
    text = [
      "Your AI Opportunity Assessment",
      "",
      result.summary,
      "",
      result.nextStep,
      "",
      "This is a starting point based on your answers, not a technical audit or a guarantee of results.",
      "",
      `Talk it through: ${SITE}/contact#book`,
    ].join("\n");
    html = renderEmailHtml({
      heading: "Your AI Opportunity Assessment",
      rows: result.summary.split("\n").map((line) => {
        const index = line.indexOf(": ");
        return [line.slice(0, index), line.slice(index + 2)] as [string, string];
      }),
      paragraphs: [
        result.nextStep,
        "This is a starting point based on your answers, not a technical audit or a guarantee of results.",
      ],
      button: { label: "Book a discovery call", url: `${SITE}/contact#book` },
    });
    leadLabel = "Assessment completed";
    leadDetail = result.summary;
  } else {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const config = getEmailConfig();
  if (!config.configured || !config.canEmailVisitors) {
    console.error("[tool-email] Email delivery to visitors isn't configured.");
    return NextResponse.json({ error: "We can't email this right now. The full content is on this page." }, { status: 503 });
  }

  const delivered = await sendEmail({ to: email, subject, text, html, logTag: "tool-email" });
  if (!delivered) {
    return NextResponse.json({ error: "We couldn't send that email. The full content is on this page." }, { status: 502 });
  }

  // Best effort: the visitor already has their email, so a failed notification must not error the request.
  const rows: Array<[string, string]> = [
    ["Type", leadLabel],
    ["Email", email],
    ["Details", leadDetail],
  ];
  await sendEmail({
    to: config.notifyTo,
    replyTo: email,
    subject: `${leadLabel}: ${email}`,
    text: rowsToText(rows),
    html: renderEmailHtml({ heading: leadLabel, rows }),
    logTag: "tool-email-notify",
  });

  return NextResponse.json({ ok: true });
}
