import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProblemsDisplay } from "@/components/shared/ProblemCarousel";
import { problemsIntro } from "@/lib/data/problems";

export function ProblemSection() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          eyebrow={problemsIntro.eyebrow}
          title={problemsIntro.headline}
          description={problemsIntro.description}
        />

        <div className="mt-12">
          <ProblemsDisplay />
        </div>

        <ScrollReveal delay={240}>
          <p className="mt-14 max-w-2xl border-l-2 border-primary pl-6 text-lg font-medium text-foreground">
            {problemsIntro.transitionStatement}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
