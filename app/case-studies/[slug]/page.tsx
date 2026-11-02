import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
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
import { categoryMeta, getStoryBySlug, getVisibleStories } from "@/lib/data/stories";
import { services } from "@/lib/data/services";
import { Card } from "@/components/ui/card";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getVisibleStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  return {
    ...buildMetadata({
      title: `${story.metaTitle ?? story.title} — DeosAI Labs`,
      description: story.summary,
      path: `/case-studies/${story.slug}`,
    }),
    ...(story.status === "draft" ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const meta = categoryMeta[story.category];
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
              { label: "Our Work", href: "/case-studies" },
              { label: story.title },
            ]}
          />
        }
        eyebrow={meta.shortLabel}
        title={story.title}
        description={story.context}
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "View All Work", href: "/case-studies" }}
      />

      {story.status === "draft" && (
        <section className="border-b border-border bg-surface py-8">
          <div className="mx-auto max-w-[1280px] px-6">
            <Card className="border-dashed">
              <p className="text-sm font-semibold text-foreground">Draft for owner review. Not visible in production.</p>
              {story.reviewNotes && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                  {story.reviewNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </section>
      )}

      <section className="border-b border-border bg-surface py-6">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3 px-6">
          <Link href={`/industries/${story.industrySlug}`}>
            <Badge variant="primary">{story.industry}</Badge>
          </Link>
          {story.clientName && <Badge>{story.clientName}</Badge>}
          <p className="w-full text-sm leading-relaxed text-muted sm:ml-2 sm:w-auto">{story.disclosure}</p>
        </div>
      </section>

      {story.headlineMetric && (
        <section className="border-b border-border py-14">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className="max-w-3xl text-2xl font-semibold text-balance text-primary sm:text-3xl">
              {story.headlineMetric}
            </p>
          </div>
        </section>
      )}

      <section className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Context" title={meta.headings.challenge} description={story.challenge} />
        </div>
      </section>

      <section className="border-b border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Approach" title={meta.headings.approach} description={story.approach} />
        </div>
      </section>

      <section className="border-b border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Outcome" title={meta.headings.outcome} description={story.outcome} />
        </div>
      </section>

      {(story.beforeAfter || story.capabilities) && (
        <section className="border-b border-border py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 lg:grid-cols-2">
            {story.beforeAfter && (
              <div>
                <p className="text-sm font-medium tracking-wide text-primary uppercase">Before and after</p>
                <dl className="mt-4 space-y-4">
                  <Card>
                    <dt className="text-xs font-semibold tracking-wide text-muted uppercase">Before</dt>
                    <dd className="mt-1 text-lg font-semibold text-foreground">{story.beforeAfter.before}</dd>
                  </Card>
                  <Card>
                    <dt className="text-xs font-semibold tracking-wide text-muted uppercase">After</dt>
                    <dd className="mt-1 text-lg font-semibold text-foreground">{story.beforeAfter.after}</dd>
                  </Card>
                </dl>
                <p className="mt-3 text-xs text-muted">{story.beforeAfter.source}</p>
              </div>
            )}
            {story.capabilities && (
              <div>
                <p className="text-sm font-medium tracking-wide text-primary uppercase">What the application covers</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/90">
                  {story.capabilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {story.quote && (
        <section className="border-b border-border bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-6">
            <blockquote className="max-w-3xl border-l-2 border-primary pl-6 text-xl leading-relaxed text-balance text-foreground sm:text-2xl">
              “{story.quote.text}”
            </blockquote>
            <p className="mt-4 pl-6 text-sm font-medium text-muted">
              {story.quote.name}, {story.quote.title}
            </p>
          </div>
        </section>
      )}

      {story.whatStaysHuman && (
        <section className="border-b border-border py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-6">
            <SectionHeading eyebrow="Governance" title="What stayed human" description={story.whatStaysHuman} />
          </div>
        </section>
      )}

      {story.lessons && (
      <section className="border-b border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Takeaway" title={meta.headings.lessons} description={story.lessons} />
        </div>
      </section>
      )}

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
        title="Have a similar workflow to fix?"
        description="Book a discovery call to talk through your specific operational context — no pressure, no obligation."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "View All Work", href: "/case-studies" }}
      />

      <PrevNextNav items={getVisibleStories()} currentSlug={story.slug} basePath="/case-studies" />
    </>
  );
}
