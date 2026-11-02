import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialFan } from "@/components/shared/TestimonialFan";
import { testimonialsIntro } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          eyebrow={testimonialsIntro.eyebrow}
          title={testimonialsIntro.headline}
          description={testimonialsIntro.description}
        />

        <div className="mt-12">
          <TestimonialFan />
        </div>
      </div>
    </section>
  );
}
