import type { Metadata } from "next";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Card } from "@/components/ui/card";
import { pricingModel, services, servicesLandingHero } from "@/lib/data/services";
import { site } from "@/lib/data/site";
import { glowCardClass } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services — DeosAI Labs",
  description: servicesLandingHero.description,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />}
        eyebrow={servicesLandingHero.eyebrow}
        title={servicesLandingHero.title}
        description={servicesLandingHero.description}
        primaryCta={servicesLandingHero.primaryCta}
        secondaryCta={servicesLandingHero.secondaryCta}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ScrollReveal as="li" key={service.slug} delay={(index % 3) * 80}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow={pricingModel.eyebrow}
            title={pricingModel.headline}
            description={pricingModel.description}
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pricingModel.items.map((item, index) => (
              <ScrollReveal key={item.label} delay={index * 80}>
                <Card className={glowCardClass}>
                  <p className="text-sm font-medium tracking-wide text-primary uppercase">{item.label}</p>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted">{pricingModel.disclaimer}</p>

          <Link
            href={pricingModel.cta.href}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            {pricingModel.cta.label}
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
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
