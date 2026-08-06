"use client";

import { useEffect, useRef, useState } from "react";

export const duration = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

export const easing = {
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

/**
 * Fires once when the element first enters the viewport, then disconnects.
 * Backs the .reveal/.reveal-visible CSS pair in globals.css so scroll
 * reveals stay CSS-driven rather than JS-animated.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  // Always false on first render (client and server) to avoid a hydration
  // mismatch; browsers without IntersectionObserver fall back below.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
