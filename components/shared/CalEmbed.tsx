"use client";

import { useEffect, useSyncExternalStore } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CalendarClock } from "lucide-react";

import { trackEvent, trackLead } from "@/lib/analytics";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** "username/event-slug" (optionally with a team prefix). Validated so the env value can't inject a URL. */
const CAL_LINK_PATTERN = /^[A-Za-z0-9_.-]+(\/[A-Za-z0-9_.-]+){1,2}$/;

const NAMESPACE = "discovery";

/**
 * Cal.com colour variables mapped to this site's tokens (app/globals.css), so the calendar blends into
 * the page's `bg-surface` section and uses the brand blue for the selected date and time buttons.
 * Keep in sync with --surface, --foreground, --muted, --border and --primary in globals.css.
 */
const cssVarsPerTheme = {
  dark: {
    "cal-bg": "#111d33",
    "cal-bg-muted": "#16243d",
    "cal-bg-subtle": "#16243d",
    "cal-bg-emphasis": "#1d2e4d",
    "cal-bg-inverted": "#5b7fdb",
    "cal-border": "#223049",
    "cal-border-booker": "#111d33",
    "cal-border-emphasis": "#2d4063",
    "cal-border-subtle": "#223049",
    "cal-text": "#f2f4f8",
    "cal-text-emphasis": "#f2f4f8",
    "cal-text-subtle": "#9aa5b8",
    "cal-text-muted": "#9aa5b8",
    "cal-text-inverted": "#0b1424",
    "cal-brand": "#5b7fdb",
    "cal-brand-emphasis": "#7a99e4",
    "cal-brand-text": "#0b1424",
    "cal-bg-success": "#5b7fdb",
    "cal-bg-semantic-success-emphasis": "#5b7fdb",
    "cal-bg-semantic-success-subtle": "#5b7fdb",
    "cal-text-success": "#5b7fdb",
    "cal-text-semantic-success": "#5b7fdb",
    "cal-text-semantic-success-emphasis": "#5b7fdb",
  },
  light: {
    "cal-bg": "#eef2fb",
    "cal-bg-muted": "#e3eaf8",
    "cal-bg-subtle": "#e3eaf8",
    "cal-bg-emphasis": "#d6e0f4",
    "cal-bg-inverted": "#1b2a4c",
    "cal-border": "#d5dcec",
    "cal-border-booker": "#eef2fb",
    "cal-border-emphasis": "#c3cde4",
    "cal-border-subtle": "#d5dcec",
    "cal-text": "#0a0a0b",
    "cal-text-emphasis": "#0a0a0b",
    "cal-text-subtle": "#6b7280",
    "cal-text-muted": "#6b7280",
    "cal-text-inverted": "#ffffff",
    "cal-brand": "#1b2a4c",
    "cal-brand-emphasis": "#142038",
    "cal-brand-text": "#ffffff",
    "cal-bg-success": "#1b2a4c",
    "cal-bg-semantic-success-emphasis": "#1b2a4c",
    "cal-bg-semantic-success-subtle": "#1b2a4c",
    "cal-text-success": "#1b2a4c",
    "cal-text-semantic-success": "#1b2a4c",
    "cal-text-semantic-success-emphasis": "#1b2a4c",
  },
} as const;

interface CalEmbedProps {
  /** Cal.com booking link, e.g. "deosailabs/discovery-call". Unset until the account exists. */
  calLink?: string;
}

/**
 * Inline Cal.com booking calendar. Availability, time zones, double-booking prevention, the
 * confirmation screen, reschedule/cancel links and the video link all come from Cal.com — nothing
 * here invents slots. Without a configured link it says so plainly instead of faking a calendar.
 */
export function CalEmbed({ calLink }: CalEmbedProps) {
  // The calendar is always rendered in its dark, navy styling — in light mode it reads as a deliberate
  // navy panel. Cal.com's light theme leaves an unstyleable black strip around its "powered by" footer.
  const theme = "dark";

  // false during server render and hydration, true afterwards.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // A visitor arriving from the assistant, assessment or calculator can carry their question into the booking notes.
  const notes =
    mounted && typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("q") ?? "").slice(0, 500)
      : "";

  const link = calLink?.trim().replace(/^\/+|\/+$/g, "") ?? "";
  const valid = CAL_LINK_PATTERN.test(link);

  useEffect(() => {
    if (!valid || !mounted) return;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      // Fires only once Cal.com reports the booking as confirmed.
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          trackEvent("discovery_call_booked");
          trackLead("discovery_call_booking");
        },
      });
      cal("ui", {
        theme,
        layout: "month_view",
        hideEventTypeDetails: false,
        colorScheme: theme,
        cssVarsPerTheme,
        styles: {
          // Page background behind the booker (including Cal.com's footer strip) = this site's surface colour.
          body: { background: "#111d33" },
          branding: { brandColor: "#5b7fdb" },
        },
      });
    })();
  }, [valid, mounted]);

  if (!link || !valid) {
    return (
      <div className="rounded-[var(--radius-md)] border border-dashed border-border p-8 text-center" role="status">
        <CalendarClock className="mx-auto size-8 text-muted" aria-hidden />
        <p className="mt-4 text-base font-semibold text-foreground">Online booking isn&apos;t available yet</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Our scheduling calendar isn&apos;t connected right now. Send us a message instead and we&apos;ll arrange a time
          with you directly.
        </p>
        <a href="#message" className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}>
          Send a Message
        </a>
      </div>
    );
  }

  // Wait for the client theme before rendering so the calendar doesn't flash the wrong colors.
  if (!mounted) {
    return <div className="h-[480px]" aria-hidden />;
  }

  return (
    <div className="w-full">
      <Cal
        namespace={NAMESPACE}
        calLink={link}
        style={{ width: "100%", overflow: "visible" }}
        config={{ layout: "month_view", theme, ...(notes ? { notes } : {}) }}
      />
    </div>
  );
}
