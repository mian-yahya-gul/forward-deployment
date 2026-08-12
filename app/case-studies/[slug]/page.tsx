import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { PrevNextNav } from "@/components/shared/PrevNextNav";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { getStoryBySlug, stories } from "@/lib/data/stories";
import { services } from "@/lib/data/services";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  return {
    title: `${story.title} — DeosAI Labs`,
    description: story.outcome,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const relatedServices = services.filter((service) =>
    story.relatedServiceSlugs.includes(service.slug),
  );

  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Client Success", href: "/case-studies" },
              { label: story.title },
            ]}
          />
        }
        eyebrow="Client Success"
        title={story.title}
        description={story.context}
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore All Stories", href: "/case-studies" }}
      />

      <section className="border-b border-border bg-surface py-6">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3 px-6">
          <Link href={`/industries/${story.industrySlug}`}>
            <Badge variant="primary">{story.industry}</Badge>
          </Link>
          {story.illustrative && <Badge variant="outline">Illustrative Scenario</Badge>}
        </div>
      </section>

      <section className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Challenge" title="The operational challenge" description={story.challenge} />
        </div>
      </section>

      <section className="border-b border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Approach" title="How we approached it" description={story.approach} />
        </div>
      </section>

      <section className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Outcome" title="What changed" description={story.outcome} />
        </div>
      </section>

      <section className="border-b border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Lessons" title="What we learned" description={story.lessons} />
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-6">
            <SectionHeading eyebrow="Services" title="Capabilities used in this engagement" />
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service, index) => (
                <ScrollReveal as="li" key={service.slug} delay={(index % 3) * 80}>
                  <ServiceCard service={service} />
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection
        title="Have a similar challenge?"
        description="Book a discovery call to talk through your specific operational context — no pressure, no obligation."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore All Stories", href: "/case-studies" }}
      />

      <PrevNextNav items={stories} currentSlug={story.slug} basePath="/case-studies" />
    </>
  );
}
