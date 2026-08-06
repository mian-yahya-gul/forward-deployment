import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { InsightCard } from "@/components/shared/InsightCard";
import { PageHero } from "@/components/shared/PageHero";
import { PrevNextNav } from "@/components/shared/PrevNextNav";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoryCard } from "@/components/shared/StoryCard";
import { buttonVariants } from "@/components/ui/button";
import { industries } from "@/lib/data/industries";
import { getServiceBySlug, services } from "@/lib/data/services";
import { getRelatedInsights, getRelatedStories } from "@/lib/relatedContent";
import { cn } from "@/lib/utils";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} — DeosAI Labs`,
    description: service.purpose,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const industriesServed = industries.filter((industry) =>
    service.relatedIndustrySlugs.includes(industry.slug),
  );
  const relatedStories = getRelatedStories({ serviceSlugs: [service.slug] });
  const relatedInsights = getRelatedInsights({ serviceSlugs: [service.slug] });

  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        }
        eyebrow="Service"
        title={service.title}
        description={service.purpose}
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore All Services", href: "/services" }}
      />

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="The Challenge"
            title="The problem it solves"
            description={service.businessChallenge}
          />
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Why It's Hard"
            title="Why traditional approaches fall short"
            description={service.whyTraditionalFails}
          />
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Our Approach"
            title="How DeosAI Labs helps"
            description={service.howWeHelp}
          />
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Outcomes"
            title="What you can expect"
            description="Measured in operational improvement, not feature lists."
          />
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Methodology"
            title="Part of a structured delivery process"
            description="Every engagement follows the same five-phase framework — Discover, Prioritize, Design, Deploy, Optimize — so you always know what phase you're in and what happens next."
          />
          <ScrollReveal>
            <Link
              href="/#methodology"
              className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}
            >
              See the full methodology
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Deliverables" title="What you'll walk away with" />
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.map((deliverable) => (
              <li key={deliverable} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {deliverable}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {industriesServed.length > 0 && (
        <section className="border-t border-border py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-6">
            <SectionHeading eyebrow="Industries" title="Where this capability applies" />
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industriesServed.map((industry, index) => (
                <ScrollReveal as="li" key={industry.slug} delay={(index % 3) * 80}>
                  <IndustryCard industry={industry} />
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Client Success" title="Related transformation stories" />
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
          <SectionHeading eyebrow="Insights" title="Related insights" />
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
            <FAQAccordion items={service.faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="See how this could work for your organization."
        description="Book a discovery call to talk through your specific challenges — no pressure, no obligation."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore All Services", href: "/services" }}
      />

      <PrevNextNav items={services} currentSlug={service.slug} basePath="/services" />
    </>
  );
}
