import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card } from "@/components/ui/card";
import { markets, marketsIntro } from "@/lib/data/markets";
import { site } from "@/lib/data/site";
import { buildMetadata, itemListSchema } from "@/lib/seo";
import { glowCardClass } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Markets We Serve: UAE, Saudi Arabia, UK, USA, Pakistan — DeosAI Labs",
  description: marketsIntro.description,
  path: "/markets",
});

export default function MarketsPage() {
  return (
    <>
      <JsonLd data={itemListSchema(markets.map((market) => ({ name: market.h1, path: `/markets/${market.slug}` })))} />
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Markets" }]} />}
        eyebrow={marketsIntro.eyebrow}
        title={marketsIntro.title}
        description={marketsIntro.description}
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "View Packages", href: "/services#packages" }}
      />

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market, index) => (
              <ScrollReveal as="li" key={market.slug} delay={(index % 3) * 80} className="h-full">
                <Link href={`/markets/${market.slug}`} className="block h-full">
                  <Card className={`flex h-full flex-col ${glowCardClass}`}>
                    <Globe2 className="size-6 text-primary" aria-hidden />
                    <h2 className="mt-4 text-lg font-semibold text-foreground">{market.label}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{market.timeZone.versusPakistan}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      AI engineering for {market.nameWithArticle}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                  </Card>
                </Link>
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
