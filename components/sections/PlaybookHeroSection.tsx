"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";

import { PlaybookCover } from "@/components/shared/PlaybookCover";
import { isPlaybookUnlocked, PlaybookGateModal } from "@/components/shared/PlaybookGateModal";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buttonVariants } from "@/components/ui/button";
import { playbookIntro, playbookParts } from "@/lib/data/playbook";
import { cn, gradientHeadingClass } from "@/lib/utils";

export function PlaybookHeroSection() {
  const chapterCount = playbookParts.reduce((sum, part) => sum + part.chapters.length, 0);
  const [gateOpen, setGateOpen] = useState(false);

  const handleStartReading = (e: React.MouseEvent) => {
    if (isPlaybookUnlocked()) return;
    e.preventDefault();
    setGateOpen(true);
  };

  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-height)+64px)] pb-20 sm:pb-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ScrollReveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <BookOpen className="size-3.5 text-primary" aria-hidden />
              {playbookIntro.eyebrow}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              className={cn(
                "mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl",
                gradientHeadingClass,
              )}
            >
              {playbookIntro.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-muted">
              {playbookIntro.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <blockquote className="mt-6 max-w-[560px] border-l-2 border-primary pl-4 text-base leading-relaxed text-foreground/90 italic">
              &ldquo;{playbookIntro.pullQuote}&rdquo;
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <p className="mt-4 max-w-[560px] text-sm leading-relaxed text-muted">
              {playbookIntro.supporting}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={320}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* prefetch=false: /book/* is a static export served via next.config.ts
                  rewrites, not a real Next.js route — Next's default Link prefetch
                  issues an RSC segment-tree request that 404s against a rewritten
                  static file, since there's no app-router page to prefetch from.
                  onClick intercepts first-time visitors into the email gate below;
                  once unlocked, the Link navigates through as normal. */}
              <Link
                href={playbookIntro.primaryCta.href}
                prefetch={false}
                onClick={handleStartReading}
                className={buttonVariants({ size: "lg" })}
              >
                {playbookIntro.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href={playbookIntro.secondaryCta.href}
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                {playbookIntro.secondaryCta.label}
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={360}>
            <p className="mt-6 text-xs font-medium tracking-wide text-muted uppercase">
              {chapterCount} chapters &middot; {playbookParts.length} parts &middot; free to read
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200} className="lg:col-span-6" as="div">
          <PlaybookCover />
        </ScrollReveal>
      </div>

      {gateOpen && (
        <PlaybookGateModal destination={playbookIntro.primaryCta.href} onClose={() => setGateOpen(false)} />
      )}
    </section>
  );
}
