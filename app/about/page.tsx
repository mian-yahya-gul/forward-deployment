import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import {
  aboutHero,
  careersPreview,
  companyStory,
  culture,
  leadership,
  missionVision,
  operatingPrinciples,
  values,
} from "@/lib/data/about";
import { site } from "@/lib/data/site";
import { cn, glowCardClass } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About — DeosAI Labs",
  description: aboutHero.description,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />}
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        description={aboutHero.description}
        primaryCta={aboutHero.primaryCta}
        secondaryCta={aboutHero.secondaryCta}
      />

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow={companyStory.eyebrow} title={companyStory.title} />
          <div className="mt-6 max-w-2xl space-y-4">
            {companyStory.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow={leadership.eyebrow} title={leadership.title} />
          <ScrollReveal className="mt-10">
            <Card className={cn("max-w-3xl", glowCardClass)}>
              <p className="text-lg font-semibold text-foreground">{leadership.person.name}</p>
              <p className="mt-1 text-sm font-medium text-primary">{leadership.person.title}</p>
              <div className="mt-4 space-y-4">
                {leadership.person.bio.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollReveal>
              <p className="text-sm font-medium tracking-wide text-primary uppercase">
                {missionVision.mission.title}
              </p>
              <p className="mt-3 text-xl leading-relaxed text-balance text-foreground">
                {missionVision.mission.description}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-sm font-medium tracking-wide text-primary uppercase">
                {missionVision.vision.title}
              </p>
              <p className="mt-3 text-xl leading-relaxed text-balance text-foreground">
                {missionVision.vision.description}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Values" title="What guides our decisions" />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <ScrollReveal as="li" key={value.title} delay={(index % 3) * 80}>
                <Card className={cn("h-full", glowCardClass)}>
                  <value.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Operating Principles" title="How we run every engagement" />
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
            {operatingPrinciples.map((principle) => (
              <li key={principle.title} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-foreground">{principle.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{principle.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow={culture.eyebrow} title={culture.title} description={culture.description} />
          <ul className="mt-8 flex flex-wrap gap-2">
            {culture.traits.map((trait) => (
              <li key={trait}>
                <Badge>{trait}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl px-6 text-center">
            <p className="text-sm font-medium tracking-wide text-primary uppercase">
              {careersPreview.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-balance text-foreground sm:text-3xl">
              {careersPreview.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{careersPreview.description}</p>
            <Link href={careersPreview.cta.href} className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
              {careersPreview.cta.label}
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <CTASection
        title={site.finalCta.headline}
        description={site.finalCta.description}
        primaryCta={site.finalCta.primaryCta}
        secondaryCta={site.finalCta.secondaryCta}
      />
    </>
  );
}
