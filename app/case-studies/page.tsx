import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoryCard } from "@/components/shared/StoryCard";
import { Card } from "@/components/ui/card";
import { site } from "@/lib/data/site";
import { categoryMeta, categoryOrder, getVisibleStories, storiesLandingHero } from "@/lib/data/stories";

export const metadata: Metadata = buildMetadata({
  title: "Our Work: Implementations & Demonstrations — DeosAI Labs",
  description: storiesLandingHero.description,
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const visible = getVisibleStories();

  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Work" }]} />}
        eyebrow={storiesLandingHero.eyebrow}
        title={storiesLandingHero.title}
        description={storiesLandingHero.description}
        primaryCta={storiesLandingHero.primaryCta}
        secondaryCta={storiesLandingHero.secondaryCta}
      />

      {categoryOrder.map((category, sectionIndex) => {
        const meta = categoryMeta[category];
        const items = visible.filter((story) => story.category === category);
        return (
          <section
            key={category}
            id={category}
            className={`scroll-mt-[var(--header-height)] border-t border-border py-16 sm:py-20 ${sectionIndex % 2 === 1 ? "bg-surface" : ""}`}
          >
            <div className="mx-auto max-w-[1280px] px-6">
              <SectionHeading eyebrow="Portfolio" title={meta.label} description={meta.description} />
              {items.length > 0 ? (
                <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((story, index) => (
                    <ScrollReveal as="li" key={story.slug} delay={(index % 3) * 80}>
                      <StoryCard story={story} />
                    </ScrollReveal>
                  ))}
                </ul>
              ) : (
                <Card className="mt-10 border-dashed">
                  <p className="text-base font-semibold text-foreground">Our first case study is being prepared</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    We have a real retail implementation and are preparing it for publication, including confirming what
                    the business is happy for us to share. Ask us about it on a discovery call and we will describe what we
                    are able to.
                  </p>
                </Card>
              )}
            </div>
          </section>
        );
      })}

      <CTASection
        title={site.finalCta.headline}
        description={site.finalCta.description}
        primaryCta={site.finalCta.primaryCta}
        secondaryCta={site.finalCta.secondaryCta}
      />
    </>
  );
}
