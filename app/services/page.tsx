import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services, servicesLandingHero } from "@/lib/data/services";
import { site } from "@/lib/data/site";

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

      <CTASection
        title={site.finalCta.headline}
        description={site.finalCta.description}
        primaryCta={site.finalCta.primaryCta}
        secondaryCta={site.finalCta.secondaryCta}
      />
    </>
  );
}
