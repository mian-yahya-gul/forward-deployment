"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { useCarouselMode } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { industries, type Industry } from "@/lib/data/industries";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

// These industries still have their own /industries page and listing entry
// — they're just left out of this homepage teaser. Life Sciences &
// Pharmaceuticals was the original exclusion; Airline & Ticketing and
// Professional Services are excluded because PLACEMENTS below is a
// hand-tuned, fixed-length (16) layout — every entry needs its own
// PLACEMENTS[i], so growing this list means adding a matching placement,
// not just removing a filter slug.
const EXCLUDED_FROM_HOMEPAGE = new Set([
  "life-sciences-pharmaceuticals",
  "airline-ticketing",
  "professional-services",
]);
const homepageIndustries = industries.filter((industry) => !EXCLUDED_FROM_HOMEPAGE.has(industry.slug));

type Tier = "near" | "mid" | "far";

interface Placement {
  top: string;
  left: string;
  tier: Tier;
  duration: string;
  delay: string;
}

// Hand-placed scatter positions (not randomized, so there's no
// hydration/reflow surprise): a staggered 6/5/5 layout across three rows so
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
  // Row 3 (5 cards)
  { top: ROW_TOP.row3, left: "5%", tier: "far", duration: "5s", delay: "0.7s" },
  { top: ROW_TOP.row3, left: "24%", tier: "mid", duration: "4.7s", delay: "1s" },
  { top: ROW_TOP.row3, left: "43%", tier: "mid", duration: "5.5s", delay: "0.3s" },
  { top: ROW_TOP.row3, left: "62%", tier: "far", duration: "4.9s", delay: "0.6s" },
  { top: ROW_TOP.row3, left: "81%", tier: "far", duration: "5.2s", delay: "0.9s" },
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
        <>
          {/* Desktop only (lg+): fixed 1200x620 absolute scatter canvas. */}
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
              {homepageIndustries.map((industry, i) => (
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

          {/*
            Below lg: the same glowing pill design, but laid out with normal
            flex-wrap flow instead of absolute scatter positions — flow
            layout can't overlap by construction, unlike hand-placed percent
            coordinates that were tuned for a 1200px canvas. No bob animation
            or backdrop-blur here (unlike the desktop pills) — 16 elements
            continuously animating plus backdrop-filter is a well-known
            mobile scroll-jank combo, and neither was worth the cost once
            the pills aren't floating on top of anything busy.
          */}
          <div className="flex flex-wrap justify-center gap-3 lg:hidden">
            {homepageIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="block rounded-2xl border border-primary/40 bg-background/95 px-4 py-3"
                style={{
                  boxShadow:
                    "0 16px 40px -20px rgba(0,0,0,0.35), 0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent), 0 0 16px -2px color-mix(in srgb, var(--primary) 45%, transparent), 0 0 32px -6px color-mix(in srgb, var(--primary) 30%, transparent)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <industry.icon className="size-4 text-primary" aria-hidden />
                  </span>
                  <span className="text-sm leading-tight font-semibold text-foreground">{industry.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Reduced motion only: the plain static grid, at any width. */}
      <ul
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          showField && "hidden",
        )}
      >
        {homepageIndustries.map((industry, index) => (
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
          className={cn(
            "block w-44 rounded-2xl border bg-background/90 px-4 py-3 backdrop-blur-sm transition-[transform,opacity,box-shadow,border-color] duration-300 ease-[var(--ease-out)]",
            isFocused ? "border-primary" : "border-primary/40",
          )}
          style={{
            transform: `scale(${scale})`,
            opacity,
            boxShadow: isFocused
              ? "0 16px 40px -20px rgba(0,0,0,0.35), 0 0 0 3px color-mix(in srgb, var(--primary) 25%, transparent), 0 0 28px -4px color-mix(in srgb, var(--primary) 65%, transparent)"
              : "0 16px 40px -20px rgba(0,0,0,0.35), 0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent), 0 0 16px -2px color-mix(in srgb, var(--primary) 45%, transparent), 0 0 32px -6px color-mix(in srgb, var(--primary) 30%, transparent)",
          }}
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
