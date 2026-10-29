import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { PageHero } from "@/components/shared/PageHero";
import { PrevNextNav } from "@/components/shared/PrevNextNav";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Timeline } from "@/components/shared/Timeline";
import { WorkflowCard } from "@/components/shared/WorkflowCard";
import { WorkflowWalkthrough } from "@/components/shared/WorkflowWalkthrough";
import { methodologyPhases } from "@/lib/data/methodology";
import {
  getPublicWorkflowById,
  getPublicWorkflows,
  getPublicWorkflowsByIndustry,
  getRelatedPublicWorkflows,
} from "@/lib/data/workflows";

interface WorkflowPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublicWorkflows().map((workflow) => ({ slug: workflow.id }));
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getPublicWorkflowById(slug);
  if (!workflow) return {};

  return buildMetadata({
    title: `${workflow.workflowName} Workflow — DeosAI Labs`,
    description: workflow.shortDescription,
    path: `/workflows/${workflow.id}`,
  });
}

export default async function WorkflowDetailPage({ params }: WorkflowPageProps) {
  const { slug } = await params;
  const workflow = getPublicWorkflowById(slug);
  if (!workflow) notFound();

  const relatedWorkflows = getRelatedPublicWorkflows(workflow);
  const industryWorkflows = getPublicWorkflowsByIndustry(workflow.industrySlug);

  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Workflows", href: "/workflows" },
              { label: workflow.industryName, href: `/industries/${workflow.industrySlug}` },
              { label: workflow.workflowName },
            ]}
          />
        }
        eyebrow={`${workflow.industryName} · ${workflow.category}`}
        title={workflow.workflowName}
        description={workflow.shortDescription}
        primaryCta={{ label: "Discuss This Workflow", href: "/contact" }}
        secondaryCta={{ label: "Explore More Workflows", href: "/workflows" }}
      />

      <section className="border-t border-border py-10">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-2 px-6">
          <Badge variant="primary">{workflow.industryName}</Badge>
          <Badge>{workflow.category}</Badge>
          <Badge variant="outline">{workflow.deploymentComplexity} complexity</Badge>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="The Problem"
            title="The workflow problem"
            description={`${workflow.painPoint} ${workflow.failurePoint}`}
          />
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="How It Works" title="Workflow visualization" />
          <div className="mt-12">
            <Timeline items={workflow.flowSteps.map((step, index) => ({ number: String(index + 1).padStart(2, "0"), title: step, content: null }))} />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="See it work"
            title="Walk through this workflow"
            description="Step through the workflow and see, at each point, whether AI does the work or a person does."
          />
          <div className="mt-10">
            <WorkflowWalkthrough
              workflowId={workflow.id}
              steps={workflow.flowSteps}
              actors={workflow.flowActors}
              aiHandles={workflow.aiHandles}
              humanHandles={workflow.humanHandles}
              systems={workflow.systems}
              data={workflow.data}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="AI Role" title="What AI does" description={workflow.aiRole} />
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {workflow.aiHandles.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Human Role" title="What stays human" description={workflow.humanRole} />
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {workflow.humanHandles.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Systems & Integration"
            title="What it connects to"
            description="Exact integrations are determined during workflow discovery — this reflects the systems typically involved."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {workflow.systems.map((system) => (
              <li key={system}>
                <Badge>{system}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Data" title="What it works with" />
          <ul className="mt-8 flex flex-wrap gap-2">
            {workflow.data.map((item) => (
              <li key={item}>
                <Badge variant="outline">{item}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Potential Impact" title="What can improve" />
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {workflow.potentialImpact.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Measurement" title="How we measure it" />
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {workflow.measurementSignals.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="size-4 shrink-0 text-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="Deployment"
            title="How DeosAI Labs deploys it"
            description="The same five-phase methodology behind every engagement, applied to this workflow."
          />
          <div className="mt-12">
            <Timeline
              items={methodologyPhases.map((phase) => ({
                number: phase.number,
                title: phase.title,
                content: <p className="text-sm leading-relaxed text-muted">{phase.objective}</p>,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-10">
        <div className="mx-auto max-w-[1280px] px-6">
          <p className="text-sm text-muted">
            Sourced from{" "}
            <Link href={workflow.playbookReference.url} className="font-medium text-primary hover:underline">
              {workflow.playbookReference.chapter} — The Forward Deployment Playbook
            </Link>
          </p>
        </div>
      </section>

      {relatedWorkflows.length > 0 && (
        <section className="border-t border-border py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-6">
            <SectionHeading eyebrow="Related Workflows" title="Often deployed alongside" />
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedWorkflows.map((related, index) => (
                <ScrollReveal as="li" key={related.id} delay={(index % 3) * 80}>
                  <WorkflowCard workflow={related} />
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection
        title="See this workflow in your operation"
        description="We'll map how this workflow currently works in your organization, identify the systems involved, and determine whether it's worth deploying."
        primaryCta={{ label: "Discuss This Workflow", href: "/contact" }}
        secondaryCta={{ label: "Explore More Workflows", href: "/workflows" }}
      />

      {industryWorkflows.length > 1 && (
        <PrevNextNav
          items={industryWorkflows.map((item) => ({ slug: item.id, title: item.workflowName }))}
          currentSlug={workflow.id}
          basePath="/workflows"
        />
      )}
    </>
  );
}
