"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { ProblemCard as ProblemCardData } from "@/lib/data/problems";

const ADVANCE_MS = 2000;

/**
 * Vertical accordion: each problem collapses to a narrow strip with a
 * rotated label, and expands to full width on hover/focus. `flex-grow` is
 * animated (basis stays 0%, per the `flex-[n]` shorthand) rather than width,
 * since flex-grow interpolates smoothly across browsers for this pattern.
 *
 * Auto-advances left to right on a timer (paused, not reset, on hover/focus —
 * see RingCarousel for the same pausedRef pattern) so it keeps cycling from
 * wherever it was left when the pointer moves away.
 */
export function ProblemAccordion({ problems }: { problems: ProblemCardData[] }) {
  const count = problems.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) setActiveIndex((i) => (i + 1) % count);
    }, ADVANCE_MS);
  }, [count]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  function pause() {
    pausedRef.current = true;
  }
  function resume() {
    pausedRef.current = false;
  }

  return (
    <div className="flex h-[220px] gap-3" onMouseLeave={resume} onBlur={resume}>
      {problems.map((problem, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={problem.title}
            type="button"
            onMouseEnter={() => {
              pause();
              setActiveIndex(index);
            }}
            onFocus={() => {
              pause();
              setActiveIndex(index);
            }}
            aria-expanded={isActive}
            className={cn(
              "group relative min-w-0 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface text-left transition-[flex-grow] duration-[var(--duration-slow)] ease-[var(--ease-out)]",
              isActive ? "flex-[3]" : "flex-[1]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
          >
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-slow)]",
                isActive && "opacity-100",
              )}
              style={{
                background:
                  "radial-gradient(120% 100% at 20% 100%, color-mix(in srgb, var(--primary) 16%, transparent) 0%, transparent 65%)",
              }}
            />

            <problem.icon className="absolute top-4 left-4 size-5 text-primary" aria-hidden />

            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-[var(--duration-fast)]",
                isActive ? "opacity-0" : "opacity-100",
              )}
            >
              <span
                className="whitespace-nowrap text-sm font-medium text-foreground/80"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {problem.title}
              </span>
            </div>

            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-[var(--duration-normal)]",
                isActive ? "opacity-100" : "opacity-0",
              )}
            >
              <h3 className="max-w-sm text-base font-semibold text-foreground">{problem.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{problem.description}</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/80">{problem.impact}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
