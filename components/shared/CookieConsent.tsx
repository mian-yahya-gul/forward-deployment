"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Analytics consent. Google Analytics' consent mode is initialised in app/layout.tsx: analytics storage
 * is denied by default in the UK/EEA and granted elsewhere, and a stored choice overrides both. This
 * banner records the visitor's choice (Accept / Decline) and tells gtag about it. Vercel Web Analytics
 * is cookie-free and not gated by this choice.
 */
export const CONSENT_STORAGE_KEY = "deosai-analytics-consent";

type Choice = "granted" | "denied";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return "denied"; // storage unavailable: don't nag, and don't track
  }
}

// "unknown" keeps the banner out of the server-rendered HTML and the first client render.
function getServerSnapshot(): string | null {
  return "unknown";
}

function notify() {
  listeners.forEach((listener) => listener());
}

function choose(choice: Choice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // ignore: the choice still applies to this page view via gtag below
  }
  window.gtag?.("consent", "update", { analytics_storage: choice });
  notify();
}

/** Clears the stored choice so the banner shows again (used by the privacy page). */
export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // ignore
  }
  notify();
}

export function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (stored !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Analytics cookies"
      className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-[var(--radius-md)] border border-border bg-surface p-5 shadow-lg sm:inset-x-auto sm:right-6 sm:bottom-6 sm:mx-0"
    >
      <p className="text-sm leading-relaxed text-foreground">
        We use Google Analytics cookies to understand how visitors use this site. Nothing is used for advertising.{" "}
        <Link href="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="sm" onClick={() => choose("granted")}>
          Accept
        </Button>
        <Button size="sm" variant="secondary" onClick={() => choose("denied")}>
          Decline
        </Button>
      </div>
    </div>
  );
}

/** Small control for the privacy page so visitors can change their mind. */
export function CookieSettingsButton() {
  return (
    <Button variant="secondary" size="sm" onClick={resetConsent}>
      Change my analytics choice
    </Button>
  );
}
