"use client";

import type { ReactNode } from "react";

import { useInView } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}

/** Wraps children in the CSS-driven .reveal / .reveal-visible pair from globals.css. */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Comp = as;

  return (
    <Comp
      ref={ref as never}
      className={cn("reveal", inView && "reveal-visible", className)}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Comp>
  );
}
