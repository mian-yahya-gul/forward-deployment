import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PlaybookCover } from "@/components/shared/PlaybookCover";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { playbookIntro, playbookParts } from "@/lib/data/playbook";
import { cn } from "@/lib/utils";

export function PlaybookSection() {
  const chapterCount = playbookParts.reduce((sum, part) => sum + part.chapters.length, 0);

  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <ScrollReveal>
            <SectionHeading
              eyebrow={playbookIntro.eyebrow}
              title={playbookIntro.title}
              description={playbookIntro.description}
            />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="mt-6 max-w-[520px] text-sm font-medium tracking-wide text-muted uppercase">
              {chapterCount} chapters &middot; {playbookParts.length} parts &middot; free to read
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={playbookIntro.primaryCta.href} className={buttonVariants({ size: "lg" })}>
                {playbookIntro.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/playbook" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
                Explore the Playbook
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={120} className="lg:col-span-6" as="div">
          <PlaybookCover />
        </ScrollReveal>
      </div>
    </section>
  );
}
