import Link from "next/link";
import { Check } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Timeline } from "@/components/shared/Timeline";
import { buttonVariants } from "@/components/ui/button";
import { methodologyIntro, methodologyPhases, methodologyPrinciples } from "@/lib/data/methodology";

export function MethodologySection() {
  return (
    <section
      id="methodology"
      className="scroll-mt-[var(--header-height)] border-t border-border bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          eyebrow={methodologyIntro.eyebrow}
          title={methodologyIntro.headline}
          description={methodologyIntro.description}
        />

        <div className="mt-16">
          <Timeline
            animated
            items={methodologyPhases.map((phase) => ({
              number: phase.number,
              title: phase.title,
              content: (
                <div className="lg:mx-auto lg:max-w-[220px]">
                  <p className="text-xs font-medium tracking-wide text-primary uppercase">{phase.duration}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{phase.objective}</p>
                  <p className="mt-3 text-sm font-medium text-primary dark:text-foreground">{phase.outcome}</p>
                </div>
              ),
            }))}
          />
        </div>

        <ScrollReveal>
          <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {methodologyPrinciples.map((principle) => (
              <li key={principle} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {principle}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href={methodologyIntro.cta.href} className={buttonVariants({ size: "lg" })}>
              {methodologyIntro.cta.label}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
