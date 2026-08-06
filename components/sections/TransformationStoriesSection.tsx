import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { featuredStory, storiesIntro, storyCards } from "@/lib/data/stories";
import { cn } from "@/lib/utils";

export function TransformationStoriesSection() {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={storiesIntro.eyebrow}
            title={storiesIntro.headline}
            description={storiesIntro.description}
          />
          <Link
            href={storiesIntro.cta.href}
            className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}
          >
            {storiesIntro.cta.label}
          </Link>
        </div>

        <ScrollReveal>
          <Card className="mt-12 grid grid-cols-1 gap-8 bg-background p-8 lg:grid-cols-2 lg:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="primary">{featuredStory.industry}</Badge>
                {featuredStory.illustrative && (
                  <Badge variant="outline">Illustrative Scenario</Badge>
                )}
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-foreground">
                {featuredStory.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{featuredStory.context}</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  Challenge
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                  {featuredStory.challenge}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  Outcome
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                  {featuredStory.outcome}
                </p>
              </div>
              <Link
                href={featuredStory.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                Read the full story
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </Card>
        </ScrollReveal>

        <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {storyCards.map((story, index) => (
            <ScrollReveal as="li" key={story.title} delay={(index % 3) * 80}>
              <Link href={story.href} className="block h-full">
                <Card className="h-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{story.industry}</Badge>
                    {story.illustrative && <Badge variant="outline">Illustrative</Badge>}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{story.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {story.challengeSummary}
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary">{story.outcome}</p>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
