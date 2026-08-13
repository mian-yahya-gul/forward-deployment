import Link from "next/link";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Timeline } from "@/components/shared/Timeline";
import { buttonVariants } from "@/components/ui/button";
import { processIntro, processStages } from "@/lib/data/process";

export function ProcessSection() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          eyebrow={processIntro.eyebrow}
          title={processIntro.headline}
          description={processIntro.description}
        />

        <div className="mt-16">
          <Timeline
            animated
            items={processStages.map((stage) => ({
              number: stage.number,
              title: stage.title,
              content: (
                <div className="lg:mx-auto lg:max-w-[220px]">
                  <p className="text-sm leading-relaxed text-muted">{stage.purpose}</p>
                  <p className="mt-3 text-sm font-medium text-primary">{stage.outcome}</p>
                </div>
              ),
            }))}
          />
        </div>

        <ScrollReveal>
          <div className="mt-16 flex flex-col items-start gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-base text-muted">{processIntro.summary}</p>
            <Link href={processIntro.cta.href} className={buttonVariants({ size: "lg" })}>
              {processIntro.cta.label}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
