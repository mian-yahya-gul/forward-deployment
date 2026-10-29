import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ListChecks } from "lucide-react";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PageHero } from "@/components/shared/PageHero";
import { Card } from "@/components/ui/card";
import { resources } from "@/lib/data/resources";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Deployment Resources — DeosAI Labs",
  description:
    "Free checklists and templates for planning an AI deployment: a readiness checklist and a workflow mapping template. Read them online or get a copy by email.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />}
        eyebrow="Resources"
        title="Checklists and templates you can use today."
        description="Practical material for planning an AI deployment. Every resource is readable in full on this site, and you can have a copy emailed to you if you want one."
      />

      <section className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-6 sm:grid-cols-2">
          {resources.map((resource) => (
            <Link key={resource.slug} href={`/resources/${resource.slug}`} className="block">
              <Card className="flex h-full flex-col">
                <ListChecks className="size-6 text-primary" aria-hidden />
                <p className="mt-4 text-xs font-medium tracking-wide text-muted uppercase">
                  {resource.eyebrow} · {resource.readingTime}
                </p>
                <h2 className="mt-1 text-lg font-semibold text-foreground">{resource.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{resource.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read it <ArrowRight className="size-4" aria-hidden />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
