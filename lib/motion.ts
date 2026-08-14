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

/**
 * Whether a 3D ring carousel should render (vs. its static grid fallback):
 * desktop width only, and never when the OS asks for reduced motion. Starts
 * `false` so server/client markup matches on first paint — no flash of
 * absolutely-positioned ring items before JS decides.
 */
export function useCarouselMode(breakpoint = 1024) {
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    // Deliberate: this is the SSR-safe upgrade-after-mount read described
    // above, not a state derived from props/state that belongs in render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowCarousel(mq.matches);
    const handler = (e: MediaQueryListEvent) => setShowCarousel(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return showCarousel;
}
