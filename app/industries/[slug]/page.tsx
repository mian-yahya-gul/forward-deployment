import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { InsightCard } from "@/components/shared/InsightCard";
import { PageHero } from "@/components/shared/PageHero";
import { PrevNextNav } from "@/components/shared/PrevNextNav";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { StoryCard } from "@/components/shared/StoryCard";
import { getIndustryBySlug, industries } from "@/lib/data/industries";
import { services } from "@/lib/data/services";
import { getRelatedInsights, getRelatedStories } from "@/lib/relatedContent";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return {
    title: `${industry.name} — DeosAI Labs`,
    description: industry.challenge,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relevantServices = services.filter((service) =>
    industry.relatedServiceSlugs.includes(service.slug),
  );
  const relatedStories = getRelatedStories({ industrySlugs: [industry.slug] });
  const relatedInsights = getRelatedInsights({ industrySlugs: [industry.slug] });

  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Industries", href: "/industries" },
              { label: industry.name },
            ]}
          />
        }
        eyebrow="Industry"
        title={industry.name}
        description={industry.challenge}
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore All Industries", href: "/industries" }}
      />

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Overview" title="How this industry operates" description={industry.overview} />
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Operational Environment"
            title="The operational reality"
            description={industry.operationalEnvironment}
          />
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Challenges" title="Common operational challenges" />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {industry.challenges.map((challenge, index) => (
              <ScrollReveal as="li" key={challenge.title} delay={(index % 2) * 80}>
                <Card className="h-full">
                  <h3 className="text-base font-semibold text-foreground">{challenge.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{challenge.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="AI Opportunities" title="Where AI creates value here" />
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {industry.aiOpportunities.map((opportunity) => (
              <li key={opportunity} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {opportunity}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Outcomes" title="Expected business outcomes" />
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {industry.businessOutcomes.map((outcome) => (
              <li key={outcome} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Systems & Integrations"
            title="Systems we typically work with"
            description="This section demonstrates implementation awareness — it isn't an exhaustive list, and every engagement is scoped to your actual system landscape."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {industry.systems.map((system) => (
              <li key={system}>
                <Badge>{system}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relevantServices.length > 0 && (
        <section className="border-t border-border py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-6">
            <SectionHeading eyebrow="Services" title="Relevant capabilities" />
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relevantServices.map((service, index) => (
                <ScrollReveal as="li" key={service.slug} delay={(index % 3) * 80}>
                  <ServiceCard service={service} />
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Client Success" title="Transformation stories" />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedStories.map((story, index) => (
              <ScrollReveal as="li" key={story.title} delay={(index % 3) * 80}>
                <StoryCard story={story} />
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Insights" title="Insights & resources" />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedInsights.map((insight, index) => (
              <ScrollReveal as="li" key={insight.title} delay={(index % 3) * 80}>
                <InsightCard insight={insight} />
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-10 max-w-3xl">
            <FAQAccordion items={industry.faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="See how this applies to your organization."
        description="Every industry is different — book a discovery call to talk through your specific operational context."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore All Industries", href: "/industries" }}
      />

      <PrevNextNav
        items={industries.map((item) => ({ slug: item.slug, title: item.name }))}
        currentSlug={industry.slug}
        basePath="/industries"
      />
    </>
  );
}
