import { track } from "@vercel/analytics";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a custom event to Vercel Analytics and, when its tag is present, Google Analytics. */
export function trackEvent(name: string, params?: EventParams) {
  track(name, params);

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

/** GA4's recommended `generate_lead` event, marked as a key event in Google Analytics. */
export function trackLead(source: "contact_form" | "discovery_call_booking") {
  trackEvent("generate_lead", { lead_source: source });
}
