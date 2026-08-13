import type { Metadata } from "next";

import { CTASection } from "@/components/shared/CTASection";
import { PlaybookHeroSection } from "@/components/sections/PlaybookHeroSection";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { playbookIntro, playbookParts } from "@/lib/data/playbook";

export const metadata: Metadata = {
  title: `${playbookIntro.title} — DeosAI Labs`,
  description: playbookIntro.description,
};

export default function PlaybookPage() {
  return (
    <>
      <PlaybookHeroSection />

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Table of Contents"
            title="What's inside"
            description="Every industry chapter follows the same structure: where time leaks today, where forward deployment fits, what stays human, and the signals that a workflow is ready."
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {playbookParts.map((part, index) => (
              <ScrollReveal key={part.part} delay={index * 80}>
                <div className="rounded-[var(--radius-lg)] border border-border bg-background p-6">
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                    {part.part}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {part.chapters.map((chapter) => (
                      <li key={chapter} className="text-sm leading-relaxed text-foreground/90">
                        {chapter}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want help applying this to your operation?"
        description="The playbook shows the pattern. A discovery call maps it to your actual workflows."
        primaryCta={playbookIntro.secondaryCta}
        secondaryCta={{ label: "Explore Industries", href: "/industries" }}
      />
    </>
  );
}
