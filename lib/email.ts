import { Resend } from "resend";

/**
 * Transactional email via Resend. Credentials stay server-side (RESEND_API_KEY).
 *
 * Sender identity: EMAIL_FROM must be an address on a domain verified in Resend (e.g.
 * "DeosAI Labs <notifications@deosailabs.com>"). Until it is set we fall back to Resend's shared
 * sandbox sender, which can only deliver to the Resend account owner — so in that mode the business
 * notification goes to the account owner's address and acknowledgments to visitors are skipped.
 * A visitor-supplied address is only ever used as reply-to or as an acknowledgment recipient,
 * never as the sender.
 */

const SANDBOX_FROM = "DeosAI Labs Website <onboarding@resend.dev>";
// Resend account owner: the only inbox the sandbox sender can reach. Remove once EMAIL_FROM is set.
const SANDBOX_RECIPIENT = "kakakhel176@gmail.com";
const DEFAULT_NOTIFY_EMAIL = "info@deosailabs.com";

export function getEmailConfig() {
  const verifiedFrom = process.env.EMAIL_FROM?.trim() || "";
  const notifyOverride = process.env.CONTACT_NOTIFY_EMAIL?.trim() || "";

  return {
    configured: Boolean(process.env.RESEND_API_KEY),
    /** True once a verified sender domain is configured, so third-party recipients are reachable. */
    canEmailVisitors: Boolean(verifiedFrom),
    from: verifiedFrom || SANDBOX_FROM,
    notifyTo: notifyOverride || (verifiedFrom ? DEFAULT_NOTIFY_EMAIL : SANDBOX_RECIPIENT),
  };
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(`[email:${logTag}] RESEND_API_KEY is not configured.`);
    return false;
  }

  const { from } = getEmailConfig();

  try {
    const { error } = await new Resend(apiKey).emails.send(
      { from, to, subject, text, ...(html ? { html } : {}), ...(replyTo ? { replyTo } : {}) },
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
