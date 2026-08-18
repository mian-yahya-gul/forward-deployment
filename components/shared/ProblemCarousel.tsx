"use client";

import { Card } from "@/components/ui/card";
import { ProblemAccordion } from "@/components/shared/ProblemAccordion";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useCarouselMode } from "@/lib/motion";
import { cn, glowCardClass } from "@/lib/utils";
import { problems } from "@/lib/data/problems";

/**
 * `problems` (including each icon component) is imported directly here rather
 * than passed down as a prop — icon components can't cross the server/client
 * boundary as serialized props, so this whole module needs to own the import.
 */
export function ProblemsDisplay() {
  const showAccordion = useCarouselMode();

  return (
    <>
      {showAccordion && (
        // Desktop only (lg+): the hover-to-expand accordion is a fixed
        // 220px-tall, all-6-panels-in-one-row layout. Below lg it renders
        // in the plain grid instead — 6 panels sharing under ~400px of
        // width leaves each collapsed strip too thin to read, and scaling
        // the whole thing down (as tried previously via RingCarousel) made
        // the card text illegibly small instead.
        <div className="hidden lg:block">
          <ProblemAccordion problems={problems} />
        </div>
      )}
      <ul
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          showAccordion && "lg:hidden",
        )}
      >
        {problems.map((problem, index) => (
          <ScrollReveal as="li" key={problem.title} delay={(index % 3) * 80}>
            <Card className={cn("h-full", glowCardClass)}>
              <problem.icon className="size-6 text-primary" aria-hidden />
              <h3 className="mt-4 text-base font-semibold text-foreground">{problem.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{problem.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{problem.impact}</p>
            </Card>
          </ScrollReveal>
        ))}
      </ul>
    </>
  );
}
