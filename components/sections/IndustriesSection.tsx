import Link from "next/link";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IndustryCard } from "@/components/shared/IndustryCard";
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
              <IndustryCard industry={industry} />
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
