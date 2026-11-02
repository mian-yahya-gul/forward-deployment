import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ShieldCheck } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { industries } from "@/lib/data/industries";
import { getMarketBySlug, markets } from "@/lib/data/markets";
import { offers } from "@/lib/data/offers";
import { ORGANIZATION_ID, absoluteUrl, buildMetadata } from "@/lib/seo";
import { glowCardClass } from "@/lib/utils";

interface MarketPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return markets.map((market) => ({ slug: market.slug }));
}

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  if (!market) return {};
  return buildMetadata({ title: market.title, description: market.description, path: `/markets/${market.slug}` });
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  if (!market) notFound();

  const relatedIndustries = industries.filter((industry) => market.industrySlugs.includes(industry.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: market.h1,
          url: absoluteUrl(`/markets/${market.slug}`),
          description: market.description,
          about: { "@id": ORGANIZATION_ID },
          inLanguage: "en",
          audience: { "@type": "Audience", geographicArea: { "@type": "Country", name: market.countryName } },
        }}
      />
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Markets", href: "/markets" }, { label: market.label }]}
          />
        }
        eyebrow={`AI engineering for ${market.label}`}
        title={market.h1}
        description={market.intro}
        primaryCta={{ label: "Book a Discovery Call", href: "/contact#book" }}
        secondaryCta={{ label: "View Packages", href: "/services#packages" }}
      />

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-6 lg:grid-cols-2">
          <ScrollReveal className="h-full">
            <Card className={`h-full ${glowCardClass}`}>
              <Clock className="size-6 text-primary" aria-hidden />
              <h2 className="mt-4 text-lg font-semibold text-foreground">Working across the time difference</h2>
              <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="font-medium text-foreground">Time zone</dt>
                  <dd className="text-muted">
                    {market.timeZone.zone} ({market.timeZone.utc})
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Compared with our team in Islamabad</dt>
                  <dd className="text-muted">{market.timeZone.versusPakistan}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Working week</dt>
                  <dd className="text-muted">{market.timeZone.workingWeek}</dd>
                </div>
              </dl>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={80} className="h-full">
            <Card className={`h-full ${glowCardClass}`}>
              <ShieldCheck className="size-6 text-primary" aria-hidden />
              <h2 className="mt-4 text-lg font-semibold text-foreground">Data and compliance</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{market.dataNote}</p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Packages"
            title={`Three ways to work with us from ${market.nameWithArticle}`}
            description="The same packages and indicative starting prices apply in every market. Prices are in USD and are not quotations."
          />
          <ul className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {offers.map((offer, index) => (
              <ScrollReveal as="li" key={offer.id} delay={index * 80} className="h-full">
                <Link href={`/services#${offer.id}`} className="block h-full">
                  <Card className={`h-full bg-background ${glowCardClass}`}>
                    <offer.icon className="size-6 text-primary" aria-hidden />
                    <h3 className="mt-4 text-base font-semibold text-foreground">{offer.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{offer.tagline}</p>
                    <p className="mt-4 text-xl font-semibold text-foreground">{offer.price}</p>
                    <p className="mt-1 text-xs text-muted">Indicative. Timeline: {offer.timelineShort.toLowerCase()}, an estimate only.</p>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {relatedIndustries.length > 0 && (
        <section className="border-t border-border py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-6">
            <SectionHeading
              eyebrow="Industries"
              title="Industry pages worth reading next"
              description="Workflow areas we map and scope. These describe proposed capabilities, not completed client deployments."
            />
            <ul className="mt-8 flex flex-wrap gap-3">
              {relatedIndustries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="FAQ" title={`Working with DeosAI Labs from ${market.nameWithArticle}`} />
          <div className="mt-10">
            <FAQAccordion items={market.faqs} />
          </div>
        </div>
      </section>

      <CTASection
        title="Talk through your workflow"
        description="Book a 30-minute discovery call in your own time zone, or send a project enquiry. No pressure and no obligation."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact#book" }}
        secondaryCta={{ label: "Agency Partnerships", href: "/partners" }}
      />
    </>
  );
}
