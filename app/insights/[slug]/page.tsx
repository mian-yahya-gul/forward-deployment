import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CoverArt } from "@/components/shared/CoverArt";
import { CTASection } from "@/components/shared/CTASection";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { InsightCard } from "@/components/shared/InsightCard";
import { PageHero } from "@/components/shared/PageHero";
import { PrevNextNav } from "@/components/shared/PrevNextNav";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { industries } from "@/lib/data/industries";
import { articles, getArticleBySlug } from "@/lib/data/insights";
import { services } from "@/lib/data/services";
import { getRelatedInsights } from "@/lib/relatedContent";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — DeosAI Labs`,
    description: article.summary,
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedServices = services.filter((service) =>
    article.relatedServiceSlugs.includes(service.slug),
  );
  const relatedIndustries = industries.filter((industry) =>
    article.relatedIndustrySlugs.includes(industry.slug),
  );
  const relatedInsights = getRelatedInsights(
    { industrySlugs: article.relatedIndustrySlugs, serviceSlugs: article.relatedServiceSlugs },
    3,
    article.slug,
  );

  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
              { label: article.title },
            ]}
          />
        }
        eyebrow={article.category}
        title={article.title}
        description={article.summary}
      />

      <div className="mx-auto max-w-[1280px] px-6">
        <CoverArt seed={article.slug} className="aspect-[21/8] rounded-[var(--radius-lg)] border border-border" />
      </div>

      <section className="mt-16 border-b border-border bg-surface py-6">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-3 px-6 text-sm text-muted">
          <Badge variant="primary">{article.category}</Badge>
          <span>{article.author}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.publishedDate}>{formatDate(article.publishedDate)}</time>
          <span aria-hidden>·</span>
          <span>{article.readingTime}</span>
        </div>
      </section>

      <article className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6">
          {article.body.map((block, index) =>
            block.type === "heading" ? (
              <ScrollReveal key={index}>
                <h2 className="mt-10 text-xl font-semibold text-foreground first:mt-0">
                  {block.text}
                </h2>
              </ScrollReveal>
            ) : (
              <p key={index} className="mt-4 text-base leading-relaxed text-muted">
                {block.text}
              </p>
            ),
          )}
        </div>
      </article>

      {relatedServices.length > 0 && (
        <section className="border-t border-border bg-surface py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-6">
            <SectionHeading eyebrow="Services" title="Related capabilities" />
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((service, index) => (
                <ScrollReveal as="li" key={service.slug} delay={(index % 3) * 80}>
                  <ServiceCard service={service} />
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {relatedIndustries.length > 0 && (
        <section className="border-t border-border py-20 sm:py-28">
          <div className="mx-auto max-w-[1280px] px-6">
            <SectionHeading eyebrow="Industries" title="Related industries" />
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedIndustries.map((industry, index) => (
                <ScrollReveal as="li" key={industry.slug} delay={(index % 3) * 80}>
                  <IndustryCard industry={industry} />
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Insights" title="More from the Knowledge Center" />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedInsights.map((insight, index) => (
              <ScrollReveal as="li" key={insight.slug} delay={(index % 3) * 80}>
                <InsightCard insight={insight} />
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Every AI transformation starts with a conversation."
        description="If this raised a question specific to your organization, let's talk it through."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Explore Knowledge Center", href: "/insights" }}
      />

      <PrevNextNav
        items={articles.map((item) => ({ slug: item.slug, title: item.title }))}
        currentSlug={article.slug}
        basePath="/insights"
      />
    </>
  );
}
