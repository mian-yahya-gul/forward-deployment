import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { EmailCopyForm } from "@/components/tools/EmailCopyForm";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { buttonVariants } from "@/components/ui/button";
import { getResourceBySlug, resources } from "@/lib/data/resources";
import { ORGANIZATION_ID, absoluteUrl, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return buildMetadata({
    title: `${resource.title} — DeosAI Labs`,
    description: resource.description,
    path: `/resources/${resource.slug}`,
  });
}

export default async function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: resource.title,
          description: resource.description,
          url: absoluteUrl(`/resources/${resource.slug}`),
          author: { "@id": ORGANIZATION_ID },
          publisher: { "@id": ORGANIZATION_ID },
        }}
      />
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: resource.shortTitle },
            ]}
          />
        }
        eyebrow={`${resource.eyebrow} · ${resource.readingTime}`}
        title={resource.title}
        description={resource.description}
      />

      <article className="border-t border-border py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-base leading-relaxed text-muted">{resource.intro}</p>

          <div className="mt-12 space-y-12">
            {resource.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">{section.title}</h2>
                {section.intro && <p className="mt-2 text-sm text-muted">{section.intro}</p>}
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed text-muted">
                      <span aria-hidden className="mt-1.5 size-4 shrink-0 rounded-[3px] border border-border" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
            <EmailCopyForm id={`resource-${resource.slug}`} noun={resource.shortTitle.toLowerCase()} payload={{ kind: "resource", slug: resource.slug }} />
          </div>

          <div className="mt-16">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Common questions</h2>
            <div className="mt-6">
              <FAQAccordion items={resource.faqs} />
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">Want a second pair of eyes on your own workflow?</p>
            <Link href="/contact#book" className={buttonVariants({ size: "lg" })}>
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
