import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { HeroChat } from "@/components/shared/HeroChat";
import { PlaybookCover } from "@/components/shared/PlaybookCover";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import { cn, gradientHeadingClass } from "@/lib/utils";

/**
 * Above-the-fold content is rendered without ScrollReveal on purpose: that wrapper holds content at
 * opacity 0 until JavaScript hydrates, which delays the Largest Contentful Paint.
 */
export function Hero() {
  const { hero } = site;

  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-height)+64px)] pb-20 sm:pb-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            <BadgeCheck className="size-3.5 text-primary" aria-hidden />
            {hero.trustBadge}
          </span>

          <h1
            className={cn(
              "mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl",
              gradientHeadingClass,
            )}
          >
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-muted">{hero.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={hero.primaryCta.href} className={buttonVariants({ size: "lg" })}>
              {hero.primaryCta.label}
            </Link>
            <Link href={hero.secondaryCta.href} className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
              {hero.secondaryCta.label}
            </Link>
          </div>

          <HeroChat />
        </div>

        <div className="lg:col-span-6">
          <PlaybookCover />
        </div>
      </div>
    </section>
  );
}
