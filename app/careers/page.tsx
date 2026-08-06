import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Timeline } from "@/components/shared/Timeline";
import { buttonVariants } from "@/components/ui/button";
import {
  careersCta,
  careersFaqs,
  careersHero,
  engineeringCulture,
  hiringPhilosophy,
  hiringProcess,
  openPositionsEmptyState,
  whyDeosai,
} from "@/lib/data/careers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Careers — DeosAI Labs",
  description: careersHero.description,
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />}
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        description={careersHero.description}
        primaryCta={careersHero.primaryCta}
        secondaryCta={careersHero.secondaryCta}
      />

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow={whyDeosai.eyebrow} title={whyDeosai.title} description={whyDeosai.description} />
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Hiring Philosophy" title="What we look for" />
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
            {hiringPhilosophy.map((item) => (
              <li key={item.title} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Engineering Culture" title="How we build" />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringCulture.map((principle, index) => (
              <ScrollReveal as="li" key={principle.title} delay={(index % 4) * 80}>
                <Card className="h-full">
                  <principle.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{principle.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Hiring Process" title="What to expect" />
          <div className="mt-16">
            <Timeline
              items={hiringProcess.map((stage) => ({
                number: stage.number,
                title: stage.title,
                content: (
                  <p className="text-sm leading-relaxed text-muted lg:mx-auto lg:max-w-[200px]">
                    {stage.description}
                  </p>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      <section id="open-positions" className="scroll-mt-[var(--header-height)] border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Open Positions" title="Current openings" />
          <ScrollReveal>
            <div className="mt-10 flex flex-col items-center rounded-[var(--radius-lg)] border border-dashed border-border px-6 py-16 text-center">
              <openPositionsEmptyState.icon className="size-8 text-muted" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {openPositionsEmptyState.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                {openPositionsEmptyState.description}
              </p>
              <Link
                href={openPositionsEmptyState.cta.href}
                className={cn(buttonVariants({ size: "lg" }), "mt-6")}
              >
                {openPositionsEmptyState.cta.label}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-10 max-w-3xl">
            <FAQAccordion items={careersFaqs} />
          </div>
        </div>
      </section>

      <CTASection
        title={careersCta.title}
        description={careersCta.description}
        primaryCta={careersCta.primaryCta}
        secondaryCta={{ label: "Learn About DeosAI Labs", href: "/about" }}
      />
    </>
  );
}
