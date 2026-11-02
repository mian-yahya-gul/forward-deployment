import Link from "next/link";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StoryCard } from "@/components/shared/StoryCard";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { categoryOrder, getVisibleStories, storiesIntro } from "@/lib/data/stories";
import { cn } from "@/lib/utils";

export function PortfolioPreview() {
  const visible = getVisibleStories();
  // One representative entry per category, real implementations first.
  const picks = categoryOrder
    .map((category) => visible.find((story) => story.category === category))
    .filter((story): story is NonNullable<typeof story> => Boolean(story));
  const hasReal = picks.some((story) => story.category === "real-implementation");

  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={storiesIntro.eyebrow}
            title={storiesIntro.headline}
            description={storiesIntro.description}
          />
          <Link href={storiesIntro.cta.href} className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}>
            {storiesIntro.cta.label}
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!hasReal && (
            <ScrollReveal as="li" className="h-full">
              <Card className="h-full border-dashed">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">Real implementation</p>
                <h3 className="mt-4 text-base font-semibold text-foreground">First case study in preparation</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  We are preparing our first published case study. It will appear here once it has been reviewed and approved for publication.
                  Ask about it on a discovery call.
                </p>
              </Card>
            </ScrollReveal>
          )}
          {picks.map((story, index) => (
            <ScrollReveal as="li" key={story.slug} delay={(index + 1) * 80} className="h-full">
              <StoryCard story={story} />
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
