import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { InsightCard } from "@/components/shared/InsightCard";
import { buttonVariants } from "@/components/ui/button";
import { articles, insightsIntro } from "@/lib/data/insights";
import { cn, glowCardClass } from "@/lib/utils";

export function InsightsSection() {
  const featuredInsight = articles.find((article) => article.featured) ?? articles[0];
  const insightCards = articles.filter((article) => article.slug !== featuredInsight.slug).slice(0, 3);

  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={insightsIntro.eyebrow}
            title={insightsIntro.headline}
            description={insightsIntro.description}
          />
          <Link
            href={insightsIntro.cta.href}
            className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}
          >
            {insightsIntro.cta.label}
          </Link>
        </div>

        <ScrollReveal>
          <Link href={featuredInsight.href} className="mt-12 block">
            <Card className={cn("bg-surface p-8 lg:p-10", glowCardClass)}>
              <Badge variant="primary">{featuredInsight.category}</Badge>
              <h3 className="mt-4 max-w-2xl text-2xl font-semibold text-foreground">
                {featuredInsight.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {featuredInsight.summary}
              </p>
              <p className="mt-4 text-xs font-medium text-muted">{featuredInsight.readingTime}</p>
            </Card>
          </Link>
        </ScrollReveal>

        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insightCards.map((insight, index) => (
            <ScrollReveal as="li" key={insight.slug} delay={(index % 3) * 80}>
              <InsightCard insight={insight} />
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
