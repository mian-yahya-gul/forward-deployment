import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { featuredInsight, insightCards, insightsIntro } from "@/lib/data/insights";
import { cn } from "@/lib/utils";

export function InsightsSection() {
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
            <Card className="bg-surface p-8 lg:p-10">
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
            <ScrollReveal as="li" key={insight.title} delay={(index % 3) * 80}>
              <Link href={insight.href} className="block h-full">
                <Card className="h-full">
                  <Badge>{insight.category}</Badge>
                  <h3 className="mt-4 text-base font-semibold text-foreground underline-offset-4 group-hover:underline">
                    {insight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{insight.summary}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs font-medium text-muted">{insight.readingTime}</p>
                    <ArrowRight
                      className="size-3.5 text-primary opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
