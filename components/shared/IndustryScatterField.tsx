"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { useCarouselMode } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { industries, type Industry } from "@/lib/data/industries";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

type Tier = "near" | "mid" | "far";

interface Placement {
  top: string;
  left: string;
  tier: Tier;
  duration: string;
  delay: string;
}

// Hand-placed scatter positions (not randomized, so there's no
// hydration/reflow surprise): a staggered 6/5/6 layout across three rows so
// every industry gets its own spot with no overlap. Each row shares one top
// offset so cards read as a clean row (the near card is the sole deliberate
// exception, lifted slightly as the focal point) — per-card vertical jitter
// looked like misalignment instead of a natural scatter. Depth still varies
// via scale/opacity, and each card floats on its own bob cycle.
const ROW_TOP = { row1: "4%", row2: "37%", row3: "71%" } as const;

const PLACEMENTS: Placement[] = [
  // Row 1 (6 cards)
  { top: ROW_TOP.row1, left: "0%", tier: "far", duration: "4.8s", delay: "0s" },
  { top: ROW_TOP.row1, left: "17%", tier: "far", duration: "5.2s", delay: "0.3s" },
  { top: ROW_TOP.row1, left: "34%", tier: "mid", duration: "5s", delay: "0.6s" },
  { top: ROW_TOP.row1, left: "51%", tier: "mid", duration: "4.6s", delay: "0.9s" },
  { top: ROW_TOP.row1, left: "68%", tier: "far", duration: "5.4s", delay: "1.2s" },
  { top: ROW_TOP.row1, left: "85%", tier: "far", duration: "5s", delay: "0.2s" },
  // Row 2 (5 cards, staggered between row 1 and row 3 columns)
  { top: ROW_TOP.row2, left: "5%", tier: "far", duration: "4.6s", delay: "0.5s" },
  { top: ROW_TOP.row2, left: "24%", tier: "mid", duration: "5.3s", delay: "0.8s" },
  { top: "34%", left: "43%", tier: "near", duration: "6s", delay: "0s" },
  { top: ROW_TOP.row2, left: "62%", tier: "mid", duration: "4.9s", delay: "1.1s" },
  { top: ROW_TOP.row2, left: "81%", tier: "far", duration: "5.1s", delay: "0.4s" },
  // Row 3 (6 cards)
  { top: ROW_TOP.row3, left: "0%", tier: "far", duration: "5s", delay: "0.7s" },
  { top: ROW_TOP.row3, left: "17%", tier: "mid", duration: "4.7s", delay: "1s" },
  { top: ROW_TOP.row3, left: "34%", tier: "mid", duration: "5.5s", delay: "0.3s" },
  { top: ROW_TOP.row3, left: "51%", tier: "far", duration: "4.9s", delay: "0.6s" },
  { top: ROW_TOP.row3, left: "68%", tier: "far", duration: "5.2s", delay: "0.9s" },
  { top: ROW_TOP.row3, left: "85%", tier: "far", duration: "4.6s", delay: "1.3s" },
];

const TIER_STYLE: Record<Tier, { scale: number; opacity: number }> = {
  near: { scale: 1.05, opacity: 1 },
  mid: { scale: 0.94, opacity: 0.97 },
  far: { scale: 0.86, opacity: 0.94 },
};

/**
 * A loosely scattered field of floating industry cards at varying depth
 * (scale/opacity only — no blur, so every card stays legible), each gently
 * bobbing on its own cycle. Hovering a card pulls it into full focus
 * (scaled up, elevated) while every other card dims slightly — a rack-focus
 * effect driven entirely by the visitor's cursor, no timer.
 */
export function IndustryScatterField() {
  const showField = useCarouselMode();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {showField && (
        <div className="relative hidden lg:block">
          <div
            className="pointer-events-none absolute inset-x-0 -z-10 flex justify-center"
            aria-hidden
          >
            <div
              className="h-[340px] w-[900px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--primary) 14%, transparent) 0%, transparent 70%)",
              }}
            />
          </div>
          <div className="relative mx-auto h-[620px] w-full max-w-[1200px]">
            {industries.map((industry, i) => (
              <ScatterCard
                key={industry.slug}
                industry={industry}
                placement={PLACEMENTS[i]}
                hovered={hovered}
                onHover={setHovered}
              />
            ))}
          </div>
        </div>
      )}

      <ul
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          showField && "lg:hidden",
        )}
      >
        {industries.map((industry, index) => (
          <ScrollReveal as="li" key={industry.slug} delay={(index % 3) * 80}>
            <IndustryCard industry={industry} />
          </ScrollReveal>
        ))}
      </ul>
    </>
  );
}

function ScatterCard({
  industry,
  placement,
  hovered,
  onHover,
}: {
  industry: Industry;
  placement: Placement;
  hovered: string | null;
  onHover: (slug: string | null) => void;
}) {
  const isFocused = hovered === industry.slug;
  const isDimmed = hovered !== null && !isFocused;
  const base = TIER_STYLE[placement.tier];

  const scale = isFocused ? 1.12 : isDimmed ? base.scale * 0.95 : base.scale;
  const opacity = isFocused ? 1 : isDimmed ? base.opacity * 0.7 : base.opacity;

  return (
    <div
      className="absolute"
      style={{
        top: placement.top,
        left: placement.left,
        zIndex: isFocused ? 30 : placement.tier === "near" ? 20 : placement.tier === "mid" ? 10 : 5,
      }}
    >
      <div
        className={cn("card-float", isFocused && "[animation-play-state:paused]")}
        style={{ animationDuration: placement.duration, animationDelay: placement.delay }}
      >
        <Link
          href={`/industries/${industry.slug}`}
          onMouseEnter={() => onHover(industry.slug)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(industry.slug)}
          onBlur={() => onHover(null)}
          className="block w-44 rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-[transform,opacity] duration-300 ease-[var(--ease-out)]"
          style={{ transform: `scale(${scale})`, opacity }}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <industry.icon className="size-4 text-primary" aria-hidden />
            </span>
            <span className="text-sm leading-tight font-semibold text-foreground">{industry.name}</span>
          </div>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
            style={{ gridTemplateRows: isFocused ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <p className="mt-3 text-xs leading-relaxed text-muted">{industry.challenge}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Explore Industry
                <ArrowRight className="size-3" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
