import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { InsightCard } from "@/components/shared/InsightCard";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { articles, insightsLandingHero } from "@/lib/data/insights";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Insights — DeosAI Labs",
  description: insightsLandingHero.description,
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />}
        eyebrow={insightsLandingHero.eyebrow}
        title={insightsLandingHero.title}
        description={insightsLandingHero.description}
        primaryCta={insightsLandingHero.primaryCta}
        secondaryCta={insightsLandingHero.secondaryCta}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ScrollReveal as="li" key={article.slug} delay={(index % 3) * 80}>
                <InsightCard insight={article} />
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
