import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { industries, industriesLandingHero } from "@/lib/data/industries";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Industries — DeosAI Labs",
  description: industriesLandingHero.description,
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />}
        eyebrow={industriesLandingHero.eyebrow}
        title={industriesLandingHero.title}
        description={industriesLandingHero.description}
        primaryCta={industriesLandingHero.primaryCta}
        secondaryCta={industriesLandingHero.secondaryCta}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <ScrollReveal as="li" key={industry.slug} delay={(index % 3) * 80}>
                <IndustryCard industry={industry} />
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
