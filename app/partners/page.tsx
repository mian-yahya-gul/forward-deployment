import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { partnerCategories, partnersEmptyState, partnersHero } from "@/lib/data/partners";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Partners — DeosAI Labs",
  description: partnersHero.description,
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Partners" }]} />}
        eyebrow={partnersHero.eyebrow}
        title={partnersHero.title}
        description={partnersHero.description}
      />

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Who We're Open To" title="Kinds of partnerships we're building toward" />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partnerCategories.map((category, index) => (
              <ScrollReveal as="li" key={category.title} delay={(index % 4) * 80}>
                <Card className="h-full">
                  <category.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{category.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{category.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center rounded-[var(--radius-lg)] border border-dashed border-border px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-foreground">{partnersEmptyState.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                {partnersEmptyState.description}
              </p>
              <Link
                href={partnersEmptyState.cta.href}
                className={cn(buttonVariants({ size: "lg" }), "mt-6")}
              >
                {partnersEmptyState.cta.label}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
