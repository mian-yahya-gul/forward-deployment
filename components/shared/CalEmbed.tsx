"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { CalendarClock } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** "username/event-slug" (optionally with a team prefix). Validated so the env value can't inject a URL. */
const CAL_LINK_PATTERN = /^[A-Za-z0-9_.-]+(\/[A-Za-z0-9_.-]+){1,2}$/;

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
  const { resolvedTheme } = useTheme();
  // false during server render and hydration, true afterwards.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const link = calLink?.trim().replace(/^\/+|\/+$/g, "") ?? "";

  if (!link || !CAL_LINK_PATTERN.test(link)) {
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
    return <div className="h-[720px] rounded-[var(--radius-md)] border border-border bg-surface" aria-hidden />;
  }

  const params = new URLSearchParams({
    embed: "true",
    layout: "month_view",
    theme: resolvedTheme === "light" ? "light" : "dark",
  });

  return (
    <iframe
      title="Schedule a discovery call with DeosAI Labs"
      src={`https://cal.com/${link}?${params.toString()}`}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      className="h-[720px] w-full rounded-[var(--radius-md)] border border-border bg-surface"
    />
  );
}
