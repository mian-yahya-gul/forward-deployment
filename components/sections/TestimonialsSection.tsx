import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { testimonials, testimonialsIntro } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          eyebrow={testimonialsIntro.eyebrow}
          title={testimonialsIntro.headline}
          description={testimonialsIntro.description}
        />

        <ul className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              as="li"
              key={testimonial.role + testimonial.industry}
              delay={(index % 3) * 80}
              className="mb-6 break-inside-avoid"
            >
              <TestimonialCard testimonial={testimonial} />
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
