import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { HeroChat } from "@/components/shared/HeroChat";
import { PlaybookCover } from "@/components/shared/PlaybookCover";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

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

          <ScrollReveal delay={300}>
            <HeroChat />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={320} className="lg:col-span-6" as="div">
          <PlaybookCover />
        </ScrollReveal>
      </div>
    </section>
  );
}
