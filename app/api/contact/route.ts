import { NextResponse } from "next/server";
import { Resend } from "resend";

import { forbidden, getClientIp, isRateLimited, isSameOrigin, readJson, singleLine, str, tooManyRequests } from "@/lib/security";

const CONTACT_EMAIL = "kakakhel176@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_BODY_BYTES = 10_000;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_COMPANY = 150;
const MAX_MESSAGE = 5_000;
const RATE_LIMIT_WINDOW_MS = 60 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return forbidden();

  if (isRateLimited(`contact:${getClientIp(request)}`, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS)) {
    return tooManyRequests();
  }

  const data = (await readJson(request, MAX_BODY_BYTES)) as Record<string, unknown> | null;
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = singleLine(str(data.name));
  const email = str(data.email);
  const company = singleLine(str(data.company));
  const message = str(data.message);

  // Honeypot field — hidden from real visitors via CSS; bots tend to fill every field.
  if (data.website) {
    // Honeypot tripped — pretend success so bots don't learn to skip this field.
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (name.length > MAX_NAME || company.length > MAX_COMPANY || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email delivery isn't configured yet. Please email us directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "DeosAI Labs Website <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, company && `Company: ${company}`, "", message]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend returned an error:", error);
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please email us directly." },
      { status: 500 },
    );
  }
}
