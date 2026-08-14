"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

import { useCarouselMode } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const ADVANCE_MS = 2200;
const TRANSITION_MS = 700;
const STEP_X = 190;
const MAX_VISIBLE = 2; // cards shown on each side of the centered one

// Fixed set of gradient origins so each card's abstract background reads as
// distinct without pulling in a randomness dependency — cycles by index.
const GRADIENT_ORIGINS = [
  { x1: "20%", y1: "15%", x2: "85%", y2: "80%" },
  { x1: "80%", y1: "10%", x2: "15%", y2: "85%" },
  { x1: "50%", y1: "0%", x2: "50%", y2: "100%" },
  { x1: "10%", y1: "80%", x2: "90%", y2: "20%" },
  { x1: "90%", y1: "70%", x2: "10%", y2: "10%" },
];

/**
 * A fanned deck of tall "story card" testimonials: the centered quote sits
 * largest and upright, the rest scale down and splay outward, auto-advancing
 * on a loop (pause on hover/focus, click-to-jump dots) — the motion
 * counterpart to `TestimonialCard`'s flat grid, which remains the mobile and
 * reduced-motion fallback.
 */
export function TestimonialFan() {
  const showFan = useCarouselMode();
  const count = testimonials.length;
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
    if (!showFan) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showFan, startTimer]);

  function goTo(index: number) {
    setActive(index);
    startTimer();
  }

  function pause() {
    pausedRef.current = true;
  }
  function resume() {
    pausedRef.current = false;
  }

  return (
    <>
      {showFan && (
        <div className="hidden lg:block">
          <div
            className="relative mx-auto h-[440px] w-full max-w-[1100px]"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
          >
            {testimonials.map((testimonial, i) => {
              let offset = i - active;
              if (offset > count / 2) offset -= count;
              if (offset < -count / 2) offset += count;
              const dist = Math.abs(offset);
              const isFront = offset === 0;
              const hidden = dist > MAX_VISIBLE;

              const scale = isFront ? 1 : dist === 1 ? 0.86 : 0.72;
              const opacity = hidden ? 0 : isFront ? 1 : dist === 1 ? 0.8 : 0.45;
              const rotate = offset * 6;
              const translateY = dist * 22;

              return (
                <div
                  key={testimonial.role + testimonial.industry}
                  className="absolute top-1/2 left-1/2 w-[240px]"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${offset * STEP_X}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                    zIndex: 10 - dist,
                    opacity,
                    transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${TRANSITION_MS}ms ease`,
                    pointerEvents: isFront ? "auto" : "none",
                  }}
                  aria-hidden={!isFront}
                >
                  <StoryCard testimonial={testimonial} originIndex={i % GRADIENT_ORIGINS.length} />
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.role + testimonial.industry}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial from ${testimonial.role}`}
                aria-current={i === active}
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  i === active ? "bg-primary" : "bg-border hover:bg-primary/40",
                )}
              />
            ))}
          </div>
        </div>
      )}

      <ul
        className={cn(
          "columns-1 gap-6 sm:columns-2 lg:columns-3",
          showFan && "lg:hidden",
        )}
      >
        {testimonials.map((testimonial, index) => (
          <ScrollReveal
            as="li"
            key={testimonial.role + testimonial.industry}
            delay={(index % 3) * 80}
            className="mb-6 break-inside-avoid"
          >
            <TestimonialCard testimonial={testimonial} />
          </ScrollReveal>
        ))}
      </ul>
    </>
  );
}

function StoryCard({
  testimonial,
  originIndex,
}: {
  testimonial: Testimonial;
  originIndex: number;
}) {
  const { x1, y1, x2, y2 } = GRADIENT_ORIGINS[originIndex];

  return (
    <div
      className="relative flex h-[400px] w-[240px] flex-col overflow-hidden rounded-[28px] border border-white/10 p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]"
      style={{
        background: `radial-gradient(130% 110% at ${x1} ${y1}, color-mix(in srgb, var(--primary) 85%, white 15%) 0%, transparent 55%), radial-gradient(120% 100% at ${x2} ${y2}, color-mix(in srgb, var(--primary) 70%, black 15%) 0%, transparent 60%), linear-gradient(160deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 55%, black 30%) 100%)`,
      }}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15">
        <Quote className="size-4 text-white" aria-hidden />
      </span>

      <p className="mt-6 line-clamp-6 text-base leading-snug font-semibold text-white">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-auto border-t border-white/20 pt-4">
        <p className="text-sm font-semibold text-white">{testimonial.role}</p>
        <p className="text-sm text-white/70">{testimonial.industry}</p>
      </div>
    </div>
  );
}
