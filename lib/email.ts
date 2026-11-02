import { Resend } from "resend";

/**
 * Transactional email via Resend. Credentials stay server-side.
 *
 * Three environment variables are REQUIRED and there are deliberately no fallbacks:
 *   RESEND_API_KEY        Resend API key (secret).
 *   EMAIL_FROM            Sender on a domain verified in Resend, e.g. "DeosAI Labs <notifications@deosailabs.com>".
 *   CONTACT_NOTIFY_EMAIL  Inbox that receives enquiry, booking and lead notifications.
 * If any is missing or invalid, getEmailConfig() reports ok:false and every route fails safely (it
 * never sends from a shared sandbox sender and never routes to a hard-coded personal address).
 * Only the NAMES of missing variables are logged, never their values.
 *
 * A visitor-supplied address is only ever used as reply-to or as an acknowledgment recipient,
 * never as the sender.
 */

const ADDRESS_PATTERN = /^[^\s@<>]+@([^\s@<>]+\.[^\s@<>]+)$/;

/** Sender domains that can never be a verified business sender. */
const DISALLOWED_SENDER_DOMAINS = new Set([
  "resend.dev",
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
]);

/** Extracts the address from "Name <user@domain>" or a bare "user@domain". */
function parseAddress(value: string): { address: string; domain: string } | null {
  const bracketed = value.match(/<([^<>]+)>\s*$/);
  const address = (bracketed ? bracketed[1] : value).trim();
  const match = address.match(ADDRESS_PATTERN);
  return match ? { address, domain: match[1].toLowerCase() } : null;
}

export type EmailConfig =
  | { ok: true; from: string; notifyTo: string }
  | { ok: false; problems: string[] };

export function getEmailConfig(): EmailConfig {
  const problems: string[] = [];

  if (!process.env.RESEND_API_KEY?.trim()) problems.push("RESEND_API_KEY is missing");

  const from = process.env.EMAIL_FROM?.trim() || "";
  if (!from) {
    problems.push("EMAIL_FROM is missing");
  } else {
    const parsed = parseAddress(from);
    if (!parsed) problems.push("EMAIL_FROM is not a valid address");
    else if (DISALLOWED_SENDER_DOMAINS.has(parsed.domain)) {
      problems.push("EMAIL_FROM must use a verified business domain, not a shared or free-mail domain");
    }
  }

  const notifyTo = process.env.CONTACT_NOTIFY_EMAIL?.trim() || "";
  if (!notifyTo) problems.push("CONTACT_NOTIFY_EMAIL is missing");
  else if (!parseAddress(notifyTo)) problems.push("CONTACT_NOTIFY_EMAIL is not a valid address");

  if (problems.length > 0) return { ok: false, problems };
  return { ok: true, from, notifyTo };
}

/** Returns true (after logging variable NAMES only, never values) when email is NOT usable. */
export function logEmailConfigProblems(config: EmailConfig, logTag: string): config is Extract<EmailConfig, { ok: false }> {
  if (config.ok) return false;
  console.error(`[email:${logTag}] Email is not configured: ${config.problems.join("; ")}.`);
  return true;
}

interface SendArgs {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  /** Same key within 24h = Resend delivers once, which makes webhook retries safe. */
  idempotencyKey?: string;
  /** Short label for diagnostics; never put personal data here. */
  logTag: string;
}

export async function sendEmail({ to, subject, text, html, replyTo, idempotencyKey, logTag }: SendArgs): Promise<boolean> {
  const config = getEmailConfig();
  if (logEmailConfigProblems(config, logTag)) return false;

  try {
    const { error } = await new Resend(process.env.RESEND_API_KEY!.trim()).emails.send(
      { from: config.from, to, subject, text, ...(html ? { html } : {}), ...(replyTo ? { replyTo } : {}) },
      idempotencyKey ? { idempotencyKey } : undefined,
    );

    if (error) {
      // Log the provider's error name/message only — not the payload, which holds personal data.
      console.error(`[email:${logTag}] Resend rejected the message: ${error.name}: ${error.message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[email:${logTag}] Send failed: ${error instanceof Error ? error.message : "unknown error"}`);
    return false;
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface EmailLayoutArgs {
  heading: string;
  intro?: string;
  rows?: Array<[label: string, value: string]>;
  paragraphs?: string[];
  button?: { label: string; url: string };
}

/** Plain, single-column, inline-styled HTML that reads cleanly on desktop and mobile mail clients. */
export function renderEmailHtml({ heading, intro, rows = [], paragraphs = [], button }: EmailLayoutArgs): string {
  const rowHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;line-height:1.5;">
            <div style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.04em;">${escapeHtml(label)}</div>
            <div style="color:#111827;white-space:pre-wrap;word-break:break-word;">${escapeHtml(value)}</div>
          </td>
        </tr>`,
    )
    .join("");

  const buttonHtml =
    button && /^https:\/\//i.test(button.url)
      ? `<p style="margin:24px 0 0;"><a href="${escapeHtml(button.url)}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-size:14px;font-weight:600;">${escapeHtml(button.label)}</a></p>`
      : "";

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f3f4f6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;padding:28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <tr><td>
          <h1 style="margin:0 0 8px;font-size:20px;line-height:1.3;color:#111827;">${escapeHtml(heading)}</h1>
          ${intro ? `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">${escapeHtml(intro)}</p>` : ""}
          ${rows.length ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowHtml}</table>` : ""}
          ${paragraphs.map((p) => `<p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#374151;white-space:pre-wrap;">${escapeHtml(p)}</p>`).join("")}
          ${buttonHtml}
          <p style="margin:28px 0 0;font-size:12px;color:#9ca3af;">DeosAI Labs &middot; https://www.deosailabs.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export function rowsToText(rows: Array<[string, string]>): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join("\n");
}
