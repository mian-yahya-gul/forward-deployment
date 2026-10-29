import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { methodologyPhases } from "@/lib/data/methodology";
import { pricingModel } from "@/lib/data/services";
import { siteRegions } from "@/lib/data/site";
import { ORGANIZATION_ID, absoluteUrl, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const path = "/what-is-ai-forward-deployment";

const definition =
  "AI forward deployment is a way of putting AI into production by working inside your real workflows. Instead of delivering a strategy deck or handing over a standalone tool, a forward-deployment partner maps how the work is done today, builds AI into those workflows with your existing systems, deploys it with people reviewing the work, and keeps improving it after launch.";

export const metadata: Metadata = buildMetadata({
  title: "What Is AI Forward Deployment? — DeosAI Labs",
  description:
    "AI forward deployment puts AI into production inside your real workflows, with human review and ongoing improvement. How it works, and how it differs from consulting.",
  path,
});

const faqs = [
  {
    question: "What is AI forward deployment?",
    answer: definition,
  },
  {
    question: "How is AI forward deployment different from AI consulting?",
    answer:
      "AI consulting often ends with a strategy, a roadmap or a report. AI forward deployment continues past the plan: the partner builds the AI into your actual workflows, deploys it alongside your team, and keeps improving it, so the result is a working system and not a document.",
  },
  {
    question: "How long does an AI forward deployment take?",
    answer:
      "It depends on the workflow. For one workflow, DeosAI Labs plans in phases: Discover (1–2 weeks), Prioritize (about 1 week), then Design and Deploy, with Optimize continuing after launch. These are typical ranges, not fixed promises, because scope varies by engagement.",
  },
  {
    question: "Does AI forward deployment replace people?",
    answer:
      "The approach is built around keeping people in charge of decisions. Each workflow defines which steps AI handles and which steps stay with a person, and the AI hands off to a person for exceptions, sensitive cases and judgment calls.",
  },
  {
    question: "How is AI forward deployment priced?",
    answer: `${pricingModel.items[0].description} ${pricingModel.items[1].description} ${pricingModel.disclaimer}`,
  },
  {
    question: "Which regions does DeosAI Labs serve?",
    answer: `DeosAI Labs is based in ${siteRegions.base.locality}, ${siteRegions.base.country}, and works with organizations across ${siteRegions.summary}. Work is run in English, and discovery calls can be booked across US and MENA time zones.`,
  },
];

const comparison = [
  {
    approach: "Strategy-only consulting",
    youGet: "A report, roadmap or recommendations",
    where: "Mostly outside your day-to-day systems",
  },
  {
    approach: "Off-the-shelf AI tool",
    youGet: "A product you configure and connect yourself",
    where: "Wherever you set it up, with your own integration effort",
  },
  {
    approach: "AI forward deployment",
    youGet: "A working system inside your workflow, with human review and ongoing improvement",
    where: "Inside your existing systems and processes",
  },
];

export default function WhatIsAiForwardDeploymentPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "What is AI forward deployment?",
            url: absoluteUrl(path),
            inLanguage: "en-US",
            about: { "@type": "DefinedTerm", name: "AI forward deployment", description: definition },
            publisher: { "@id": ORGANIZATION_ID },
          },
        ]}
      />
      <PageHero
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "What is AI forward deployment?" }]} />
        }
        eyebrow="Explained"
        title="What is AI forward deployment?"
        description={definition}
      />

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="In plain terms"
            title="AI that works inside how you already operate"
            description="Most AI projects stall between the idea and daily use. Forward deployment closes that gap by starting from the workflow, not the technology: where the work comes from, which systems it touches, who decides, and what 'better' means in numbers."
          />
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Five phases, from understanding to improvement"
            description="This is the approach DeosAI Labs follows for each workflow. Durations are typical ranges for one workflow, not fixed promises."
          />
          <ol className="mt-10 space-y-6">
            {methodologyPhases.map((phase) => (
              <li key={phase.number} className="rounded-[var(--radius-md)] border border-border bg-background p-5">
                <p className="text-xs font-medium tracking-wide text-muted uppercase">
                  Phase {phase.number} · {phase.duration}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {phase.objective} {phase.outcome}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="Compared"
            title="How it differs from the usual options"
            description="General descriptions of three common approaches, not a comparison of specific companies."
          />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <caption className="sr-only">Comparison of strategy-only consulting, off-the-shelf AI tools and AI forward deployment</caption>
              <thead>
                <tr className="border-b border-border text-foreground">
                  <th scope="col" className="py-3 pr-4 font-semibold">Approach</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">What you get</th>
                  <th scope="col" className="py-3 font-semibold">Where the work happens</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, index) => (
                  <tr key={row.approach} className={cn("border-b border-border align-top", index === 2 && "bg-surface")}>
                    <th scope="row" className="py-4 pr-4 font-medium text-foreground">{row.approach}</th>
                    <td className="py-4 pr-4 text-muted">{row.youGet}</td>
                    <td className="py-4 text-muted">{row.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 sm:py-24">
        <div className="mx-auto grid max-w-3xl gap-10 px-6 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">A good fit when</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>A specific workflow is slow, manual or error-prone, and you can describe it.</li>
              <li>The work touches several systems that don&apos;t talk to each other.</li>
              <li>You want AI used in daily operations, not another pilot.</li>
              <li>Someone on your side can own the workflow and review the AI&apos;s output.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Probably not the right fit when</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>You only want a one-off report or opinion.</li>
              <li>A standard off-the-shelf tool already does the job without integration.</li>
              <li>There is no clear workflow or owner yet. A readiness checklist is a better first step.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="Common questions" title="AI forward deployment, answered" />
          <div className="mt-10">
            <FAQAccordion items={faqs} />
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/tools/ai-opportunity-assessment" className={buttonVariants({ size: "lg" })}>
              Try the AI Opportunity Assessment
            </Link>
            <Link href="/contact#book" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Book a Discovery Call
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted">
            Want the long version? Read the free{" "}
            <Link href="/playbook" className="font-medium text-primary underline-offset-4 hover:underline">
              Forward Deployment Playbook
            </Link>
            , or browse{" "}
            <Link href="/workflows" className="font-medium text-primary underline-offset-4 hover:underline">
              real workflows by industry
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
