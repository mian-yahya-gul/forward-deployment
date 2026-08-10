import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "kakakhel176@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  /** Honeypot field — hidden from real visitors via CSS; bots tend to fill every field. */
  website?: string;
}

export async function POST(request: Request) {
  const data = (await request.json().catch(() => null)) as ContactPayload | null;
  if (!data) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const company = data.company?.trim() ?? "";
  const message = data.message?.trim() ?? "";

  if (data.website) {
    // Honeypot tripped — pretend success so bots don't learn to skip this field.
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
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
