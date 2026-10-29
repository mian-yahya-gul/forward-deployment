import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, ClipboardCheck, ListChecks, Workflow } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { Card } from "@/components/ui/card";
import { resources } from "@/lib/data/resources";
import { tools } from "@/lib/data/tools";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Tools and Resources — DeosAI Labs",
  description:
    "Free tools to help you decide where AI fits: an opportunity assessment, a workflow savings calculator, a readiness checklist and a workflow mapping template.",
  path: "/tools",
});

const toolIcons = { "ai-opportunity-assessment": ClipboardCheck, "workflow-roi-calculator": Calculator } as const;

export default function ToolsPage() {
  const items = [
    ...tools.map((tool) => ({ href: tool.href, title: tool.title, eyebrow: tool.eyebrow, description: tool.description, icon: toolIcons[tool.slug as keyof typeof toolIcons] })),
    ...resources.map((resource) => ({
      href: `/resources/${resource.slug}`,
      title: resource.title,
      eyebrow: `${resource.eyebrow} · ${resource.readingTime}`,
      description: resource.description,
      icon: ListChecks,
    })),
    {
      href: "/workflows",
      title: "Deployable Workflow Catalog",
      eyebrow: "Library",
      description: "Browse real business workflows by industry, with what each one involves and where AI fits.",
      icon: Workflow,
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free AI tools and resources",
          url: absoluteUrl("/tools"),
          hasPart: items.map((item) => ({ "@type": "WebPage", name: item.title, url: absoluteUrl(item.href) })),
        }}
      />
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tools" }]} />}
        eyebrow="Tools & resources"
        title="Try it before you talk to us."
        description="Practical tools for working out where AI fits: assess your opportunity, estimate what a workflow costs, and use the same checklists and templates we use. Free, and no sign-up is needed."
      />

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="block">
              <Card className="flex h-full flex-col">
                <item.icon className="size-6 text-primary" aria-hidden />
                <p className="mt-4 text-xs font-medium tracking-wide text-muted uppercase">{item.eyebrow}</p>
                <h2 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open <ArrowRight className="size-4" aria-hidden />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
