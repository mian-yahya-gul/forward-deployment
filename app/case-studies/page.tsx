import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { StoryCard } from "@/components/shared/StoryCard";
import { site } from "@/lib/data/site";
import { stories, storiesLandingHero } from "@/lib/data/stories";

export const metadata: Metadata = buildMetadata({
  title: "AI Deployment Case Studies — DeosAI Labs",
  description: storiesLandingHero.description,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Client Success" }]} />
        }
        eyebrow={storiesLandingHero.eyebrow}
        title={storiesLandingHero.title}
        description={storiesLandingHero.description}
        primaryCta={storiesLandingHero.primaryCta}
        secondaryCta={storiesLandingHero.secondaryCta}
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, index) => (
              <ScrollReveal as="li" key={story.slug} delay={(index % 3) * 80}>
                <StoryCard story={story} />
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
