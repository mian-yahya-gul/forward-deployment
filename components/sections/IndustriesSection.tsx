import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { industries, industriesIntro } from "@/lib/data/industries";
import { cn } from "@/lib/utils";

export function IndustriesSection() {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={industriesIntro.eyebrow}
            title={industriesIntro.headline}
            description={industriesIntro.description}
          />
          <Link
            href={industriesIntro.cta.href}
            className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}
          >
            {industriesIntro.cta.label}
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <ScrollReveal as="li" key={industry.slug} delay={(index % 3) * 80}>
              <Link href={`/industries/${industry.slug}`} className="block h-full">
                <Card className="h-full bg-background">
                  <industry.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{industry.challenge}</p>
                  <p className="mt-3 text-sm font-medium text-primary">{industry.outcome}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100">
                    Explore Industry
                    <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
