"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const RADIUS = 320;
const ADVANCE_MS = 1800;
const TRANSITION_MS = 700;

export interface RingCarouselProps<T> {
  items: T[];
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  /** Card content; the wrapper handles position, depth scale/opacity, and pointer-events. */
  renderCard: (item: T, isFront: boolean) => ReactNode;
  cardWidthClassName?: string;
}

/**
 * A 3D ring of cards, one item facing the viewer at a time, auto-advancing
 * on a loop and pausable on hover/focus. Caller owns the data (so it can
 * import icon components client-side, which can't cross the server/client
 * boundary as props) and the card markup; this owns the ring math, timer,
 * and dot navigation.
 */
export function RingCarousel<T>({
  items,
  getKey,
  getLabel,
  renderCard,
  cardWidthClassName = "w-[300px]",
}: RingCarouselProps<T>) {
  const count = items.length;
  const step = 360 / count;
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % count);
    }, ADVANCE_MS);
  }, [count]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  function goTo(index: number) {
    setActive(index);
    startTimer(); // restart the cadence so it doesn't immediately jump again
  }

  function pause() {
    pausedRef.current = true;
  }
  function resume() {
    pausedRef.current = false;
  }

  return (
    <div>
      {/*
        Fixed 1000x320 3D stage, designed for desktop. Rather than hiding it
        below lg (the old behavior), scale the whole stage down to fit
        narrower viewports via a CSS custom property — `--scale` stays 1
        (a no-op) at 1000px+ and shrinks proportionally below that, with the
        wrapper's own height following it so the page doesn't reserve empty
        space. The dot nav below is intentionally outside this wrapper so
        it never shrinks below a tappable size.
      */}
      <div
        className="relative mx-auto w-full max-w-[1000px] origin-top"
        style={{
          "--scale": "min(1, calc((100vw - 48px) / 1000))",
          transform: "scale(var(--scale))",
          height: "calc(320px * var(--scale))",
          perspective: "1600px",
        } as CSSProperties}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${RADIUS}px) rotateY(${-active * step}deg)`,
            transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
        >
          {items.map((item, i) => {
            const diff = Math.abs(i - active);
            const dist = Math.min(diff, count - diff);
            const isFront = dist === 0;
            const scale = dist === 0 ? 1 : dist === 1 ? 0.82 : dist === 2 ? 0.72 : 0.68;
            const opacity = dist === 0 ? 1 : dist === 1 ? 0.45 : dist === 2 ? 0.15 : 0.08;

            return (
              <div
                key={getKey(item)}
                className={cn("absolute top-1/2 left-1/2", cardWidthClassName)}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${RADIUS}px) scale(${scale})`,
                  opacity,
                  transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${TRANSITION_MS}ms ease`,
                  pointerEvents: isFront ? "auto" : "none",
                }}
                aria-hidden={!isFront}
              >
                {renderCard(item, isFront)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={getKey(item)}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show "${getLabel(item)}"`}
            aria-current={i === active}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              i === active ? "bg-primary" : "bg-border hover:bg-primary/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
