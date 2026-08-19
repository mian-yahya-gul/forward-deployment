import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "kakakhel176@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface PlaybookLeadPayload {
  email?: string;
  /** Honeypot field — hidden from real visitors via CSS; bots tend to fill every field. */
  website?: string;
}

/**
 * Captures an email before a visitor reads the Playbook. Only ever notifies
 * CONTACT_EMAIL (never the lead) — the "from" address below is Resend's
 * shared sandbox domain, which can't reliably send to arbitrary third-party
 * recipients, so this route is lead capture only, not a confirmation email.
 * Access to the book is never blocked on this succeeding (see the modal),
 * so a Resend outage never costs a reader.
 */
export async function POST(request: Request) {
  const data = (await request.json().catch(() => null)) as PlaybookLeadPayload | null;
  if (!data) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = data.email?.trim() ?? "";

  if (data.website) {
    // Honeypot tripped — pretend success so bots don't learn to skip this field.
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "DeosAI Labs Website <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      subject: `New Playbook lead: ${email}`,
      text: `${email} unlocked The Forward Deployment Playbook.`,
    });

    if (error) {
      console.error("Resend returned an error:", error);
      return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send playbook lead notification:", error);
    return NextResponse.json({ error: "Delivery failed." }, { status: 500 });
  }
}
