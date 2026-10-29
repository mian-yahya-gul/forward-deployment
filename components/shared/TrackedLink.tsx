"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps extends LinkProps {
  event: string;
  className?: string;
  children: ReactNode;
}

/** A next/link that also fires a custom analytics event (Vercel + Google Analytics) on click — for CTAs
 *  (like the mailto: contact pathways) that need conversion tracking from a Server
 *  Component page, where an inline onClick handler isn't otherwise available. */
export function TrackedLink({ event, children, ...props }: TrackedLinkProps) {
  return (
    <Link {...props} onClick={() => trackEvent(event)}>
      {children}
    </Link>
  );
}
