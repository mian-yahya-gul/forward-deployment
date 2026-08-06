import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { problems, problemsIntro } from "@/lib/data/problems";

export function ProblemSection() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          eyebrow={problemsIntro.eyebrow}
          title={problemsIntro.headline}
          description={problemsIntro.description}
        />

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <ScrollReveal as="li" key={problem.title} delay={(index % 3) * 80}>
              <Card className="h-full">
                <problem.icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {problem.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {problem.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  {problem.impact}
                </p>
              </Card>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal delay={240}>
          <p className="mt-14 max-w-2xl border-l-2 border-primary pl-6 text-lg font-medium text-foreground">
            {problemsIntro.transitionStatement}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
