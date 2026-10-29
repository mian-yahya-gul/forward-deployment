import type { Metadata } from "next";

import { RoiCalculator } from "@/components/tools/RoiCalculator";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Workflow Savings Calculator — DeosAI Labs",
  description:
    "Estimate the hours and cost a repetitive workflow takes today and what automating part of it could save. The formula is published on the page.",
  path: "/tools/workflow-roi-calculator",
});

const faqs = [
  {
    question: "How is the saving calculated?",
    answer:
      "Hours before = tasks per month × minutes per task ÷ 60. Hours automated = hours before × the share AI could handle. Review hours = hours automated × review time. Net hours saved = hours automated − review hours. Monthly saving = net hours saved × cost per hour, and the annual saving is that × 12.",
  },
  {
    question: "What does the calculator leave out?",
    answer:
      "It leaves out the cost of building and running the system, any change in error rates, and the time it takes to roll out. It only uses the numbers you enter, so treat the result as a rough estimate, not a prediction.",
  },
  {
    question: "What share of a workflow can AI usually handle?",
    answer:
      "It depends entirely on the workflow. Repetitive, well-defined steps are more suitable than rare or high-stakes ones. The calculator starts at 50% as a placeholder. It's wise to try a lower figure as well.",
  },
  {
    question: "Why is there a review time?",
    answer:
      "In most deployments a person checks at least some of the AI's work, especially at the start. Review time accounts for that, so the estimate doesn't assume the work becomes free.",
  },
];

export default function RoiCalculatorPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Workflow Savings Calculator" },
            ]}
          />
        }
        eyebrow="Free tool"
        title="What does a repetitive workflow really cost you?"
        description="The Workflow Savings Calculator estimates how many hours a workflow takes each month, and how much time and money automating part of it could save. Enter your own numbers: the formula is shown below, and the result is an estimate, not a promise."
      />

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RoiCalculator />
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="The formula"
            title="How the estimate is worked out"
            description="Hours before = tasks per month × minutes per task ÷ 60. Net hours saved = hours before × share automated × (1 − review time). Monthly saving = net hours saved × cost per hour. Annual saving = monthly saving × 12."
          />
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
