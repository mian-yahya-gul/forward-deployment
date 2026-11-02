import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { homeFaqs } from "@/lib/data/faq";

export function HomeFaqSection() {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="FAQ" title="Common questions, answered plainly." />
        <div className="mt-10">
          <FAQAccordion items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
