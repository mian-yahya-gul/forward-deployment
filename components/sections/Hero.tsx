import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 400"
      className="h-auto w-full max-w-md text-primary"
      role="img"
      aria-label="Abstract diagram of connected workflow nodes"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35">
        <path d="M60 300 L180 180" />
        <path d="M180 180 L340 120" />
        <path d="M180 180 L220 300" />
        <path d="M340 120 L420 220" />
        <path d="M220 300 L340 340" />
        <path d="M340 120 L220 300" />
      </g>
      <g stroke="var(--border)" strokeWidth="1" opacity="0.6">
        <rect x="20" y="270" width="80" height="60" rx="10" fill="var(--surface)" />
        <rect x="140" y="140" width="80" height="60" rx="10" fill="var(--surface)" />
        <rect x="300" y="80" width="80" height="60" rx="10" fill="var(--surface)" />
        <rect x="380" y="190" width="80" height="60" rx="10" fill="var(--surface)" />
        <rect x="180" y="270" width="80" height="60" rx="10" fill="var(--surface)" />
        <rect x="300" y="310" width="80" height="60" rx="10" fill="var(--surface)" />
      </g>
      <g fill="currentColor">
        <circle cx="60" cy="300" r="4" />
        <circle cx="180" cy="180" r="4" />
        <circle cx="340" cy="120" r="4" />
        <circle cx="420" cy="220" r="4" />
        <circle cx="220" cy="300" r="4" />
        <circle cx="340" cy="340" r="4" />
      </g>
    </svg>
  );
}

export function Hero() {
  const { hero } = site;

  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-height)+64px)] pb-20 sm:pb-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ScrollReveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <BadgeCheck className="size-3.5 text-primary" aria-hidden />
              {hero.trustBadge}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              {hero.headline}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-muted">
              {hero.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={hero.primaryCta.href} className={buttonVariants({ size: "lg" })}>
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={320} className="lg:col-span-6" as="div">
          <HeroIllustration />
        </ScrollReveal>
      </div>
    </section>
  );
}
