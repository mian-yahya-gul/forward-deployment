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
// hydration/reflow surprise): one near card as the natural focal point,
// two mid-depth, three far, each floating on its own bob cycle.
const PLACEMENTS: Placement[] = [
  { top: "38%", left: "36%", tier: "near", duration: "6s", delay: "0s" },
  { top: "8%", left: "12%", tier: "mid", duration: "5s", delay: "0.4s" },
  { top: "14%", left: "68%", tier: "mid", duration: "5.5s", delay: "0.8s" },
  { top: "66%", left: "8%", tier: "far", duration: "4.5s", delay: "1.2s" },
  { top: "70%", left: "60%", tier: "far", duration: "5s", delay: "0.2s" },
  { top: "4%", left: "44%", tier: "far", duration: "4.8s", delay: "0.6s" },
];

const TIER_STYLE: Record<Tier, { scale: number; blur: string; opacity: number }> = {
  near: { scale: 1.05, blur: "0px", opacity: 1 },
  mid: { scale: 0.88, blur: "1px", opacity: 0.85 },
  far: { scale: 0.72, blur: "2px", opacity: 0.65 },
};

/**
 * A loosely scattered field of floating industry cards at varying depth
 * (scale/blur/opacity), each gently bobbing on its own cycle. Hovering a
 * card pulls it into full focus (sharp, scaled up, elevated) while every
 * other card blurs and dims further — a rack-focus effect driven entirely
 * by the visitor's cursor, no timer.
 */
export function IndustryScatterField() {
  const showField = useCarouselMode();
  const featured = industries.filter((industry) => industry.featured);
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
              className="h-[300px] w-[700px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--primary) 14%, transparent) 0%, transparent 70%)",
              }}
            />
          </div>
          <div className="relative mx-auto h-[460px] w-full max-w-[1000px]">
            {featured.map((industry, i) => (
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
        {featured.map((industry, index) => (
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

  const scale = isFocused ? 1.15 : isDimmed ? base.scale * 0.92 : base.scale;
  const blur = isFocused ? "0px" : isDimmed ? "3px" : base.blur;
  const opacity = isFocused ? 1 : isDimmed ? base.opacity * 0.55 : base.opacity;

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
          className="block rounded-2xl border border-border bg-background/90 px-5 py-4 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-[transform,filter,opacity] duration-300 ease-[var(--ease-out)]"
          style={{ transform: `scale(${scale})`, filter: `blur(${blur})`, opacity }}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <industry.icon className="size-4 text-primary" aria-hidden />
            </span>
            <span className="text-sm font-semibold whitespace-nowrap text-foreground">{industry.name}</span>
          </div>

          <div
            className="grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]"
            style={{ gridTemplateRows: isFocused ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <p className="mt-3 max-w-[220px] text-xs leading-relaxed text-muted">{industry.challenge}</p>
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
