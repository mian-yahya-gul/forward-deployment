import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WorkflowCatalog } from "@/components/shared/WorkflowCatalog";
import { cn, glowCardClass } from "@/lib/utils";
import { getIndustryWorkflowSummaries, getPublicWorkflows, workflowsIntro } from "@/lib/data/workflows";

export const metadata: Metadata = buildMetadata({
  title: "Deployable Workflow Catalog — DeosAI Labs",
  description: workflowsIntro.description,
  path: "/workflows",
});

export default function WorkflowsPage() {
  const publicWorkflows = getPublicWorkflows();
  const industrySummaries = getIndustryWorkflowSummaries();
  const activeIndustries = industrySummaries.filter((industry) => industry.workflowCount > 0);
  const industryNames = activeIndustries.map((industry) => industry.name);

  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Workflows" }]} />}
        eyebrow="Deployable Workflow Catalog"
        title={workflowsIntro.title}
        description={workflowsIntro.description}
        primaryCta={{ label: "Discuss Your Workflow", href: "/contact" }}
        secondaryCta={{ label: "Explore Industries", href: "/industries" }}
      />

      <section className="border-t border-border py-20 sm:py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
            We do not sell isolated AI tools.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We deploy AI-powered capabilities into the business workflows you already run — embedded in your
            existing systems, with human review built in, not a chatbot bolted on the side.
          </p>
        </div>
      </section>

      <section id="industries" className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Browse by Industry"
            title="Where the catalog is live today"
            description="We publish workflows industry by industry as each one is mapped and reviewed. Every industry below is part of the Forward Deployment Playbook — the ones with published workflows are open for exploration now."
          />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industrySummaries.map((industry, index) => {
              const isActive = industry.workflowCount > 0;
              const Icon = industry.icon;
              return (
                <ScrollReveal as="li" key={industry.slug} delay={(index % 3) * 80}>
                  {isActive ? (
                    <Link href={`/industries/${industry.slug}#workflows`} className="block h-full">
                      <Card className={cn("h-full", glowCardClass)}>
                        <Icon className="size-6 text-primary" aria-hidden />
                        <h3 className="mt-4 text-base font-semibold text-foreground">{industry.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{industry.challenge}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <Badge variant="primary">
                            {industry.workflowCount} workflow{industry.workflowCount === 1 ? "" : "s"}
                          </Badge>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100">
                            Explore
                            <ArrowRight className="size-3.5" aria-hidden />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ) : (
                    <Card className="h-full opacity-70">
                      <Icon className="size-6 text-muted" aria-hidden />
                      <h3 className="mt-4 text-base font-semibold text-foreground">{industry.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{industry.challenge}</p>
                      <div className="mt-4">
                        <Badge variant="outline">Coming soon</Badge>
                      </div>
                    </Card>
                  )}
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Full Catalog"
            title="Browse deployable workflows"
            description="Filter by industry, category, and deployment complexity, or search directly."
          />
          <div className="mt-10">
            <WorkflowCatalog workflows={publicWorkflows} industryNames={industryNames} />
          </div>
        </div>
      </section>

      <CTASection
        title="Don't see your workflow yet?"
        description="The catalog is still expanding industry by industry. Tell us how the work actually happens today and we'll map it against what a first engagement would look like."
        primaryCta={{ label: "Discuss Your Workflow", href: "/contact" }}
        secondaryCta={{ label: "Read the Playbook", href: "/playbook" }}
      />
    </>
  );
}
