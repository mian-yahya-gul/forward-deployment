"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

interface TrackedLinkProps extends LinkProps {
  event: string;
  className?: string;
  children: ReactNode;
}

/** A next/link that also fires a Vercel Analytics custom event on click — for CTAs
 *  (like the mailto: contact pathways) that need conversion tracking from a Server
 *  Component page, where an inline onClick handler isn't otherwise available. */
export function TrackedLink({ event, children, ...props }: TrackedLinkProps) {
  return (
    <Link {...props} onClick={() => track(event)}>
      {children}
    </Link>
  );
}
