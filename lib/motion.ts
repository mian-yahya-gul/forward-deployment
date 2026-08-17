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

const IN_VIEW_FAILSAFE_MS = 1200;

/**
 * Fires once when the element first enters the viewport, then disconnects.
 * Backs the .reveal/.reveal-visible CSS pair in globals.css so scroll
 * reveals stay CSS-driven rather than JS-animated.
 *
 * Content wrapped in this stays invisible (.reveal's opacity: 0) until
 * `inView` flips true, so a failsafe timer also forces it true after
 * IN_VIEW_FAILSAFE_MS regardless of whether the observer ever fires —
 * otherwise any edge case that prevents the observer from firing (an
 * element already in the viewport before it attaches, an engine quirk,
 * etc.) leaves content permanently hidden rather than just losing the
 * fade-in. The failsafe is cleared as soon as the observer does its job
 * normally, so it never visibly fires on a working browser.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  // Always false on first render (client and server) to avoid a hydration
  // mismatch; browsers without IntersectionObserver fall back below.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const failsafe = setTimeout(() => setInView(true), IN_VIEW_FAILSAFE_MS);

    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(failsafe);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
          clearTimeout(failsafe);
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [threshold]);

  return { ref, inView };
}

/**
 * Whether an animated display (3D ring carousel, scatter field, timeline
 * chase, etc.) should render, vs. its static grid fallback: any viewport
 * width, but never when the OS asks for reduced motion. Starts `false` so
 * server/client markup matches on first paint — no flash of
 * absolutely-positioned items before JS decides. Fixed-size desktop layouts
 * that use this hook are expected to scale themselves down to fit narrow
 * viewports (see the `--scale` custom-property pattern in RingCarousel,
 * IndustryScatterField, and TestimonialFan) rather than being gated out.
 */
export function useCarouselMode() {
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Deliberate: this is the SSR-safe upgrade-after-mount read described
    // above, not a state derived from props/state that belongs in render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowCarousel(!reduced);
  }, []);

  return showCarousel;
}
