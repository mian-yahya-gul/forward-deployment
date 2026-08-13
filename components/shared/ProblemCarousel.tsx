"use client";

import { Card } from "@/components/ui/card";
import { RingCarousel } from "@/components/shared/RingCarousel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useCarouselMode } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { problems, type ProblemCard as ProblemCardData } from "@/lib/data/problems";

/**
 * `problems` (including each icon component) is imported directly here rather
 * than passed down as a prop — icon components can't cross the server/client
 * boundary as serialized props, so this whole module needs to own the import.
 */
export function ProblemsDisplay() {
  const showCarousel = useCarouselMode();

  return (
    <>
      {showCarousel && (
        <RingCarousel
          items={problems}
          getKey={(problem) => problem.title}
          getLabel={(problem) => problem.title}
          renderCard={(problem, isFront) => <ProblemFace problem={problem} isFront={isFront} />}
        />
      )}
      <ul
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          showCarousel && "lg:hidden",
        )}
      >
        {problems.map((problem, index) => (
          <ScrollReveal as="li" key={problem.title} delay={(index % 3) * 80}>
            <Card className="h-full">
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

function ProblemFace({ problem, isFront }: { problem: ProblemCardData; isFront: boolean }) {
  return (
    <Card className={cn("h-[280px]", isFront && "border-primary/40 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.35)]")}>
      <problem.icon className="size-6 text-primary" aria-hidden />
      <h3 className="mt-4 text-base font-semibold text-foreground">{problem.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{problem.description}</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{problem.impact}</p>
    </Card>
  );
}
