import type { Metadata } from "next";

import { siteRegions, siteUrl } from "@/lib/data/site";

export const SITE_NAME = "DeosAI Labs";

/** `@id` of the Organization node; other schema nodes reference it instead of repeating it. */
export const ORGANIZATION_ID = `${siteUrl}/#organization`;

/** Absolute URL for a site path ("/services" -> "https://www.deosailabs.com/services"). */
export function absoluteUrl(path: string) {
  return path === "/" || path === "" ? siteUrl : `${siteUrl}${path}`;
}

const BRAND_SUFFIX = " — DeosAI Labs";
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "DeosAI Labs — AI Forward Deployment Partner",
};

/** Search results cut titles at roughly 60 characters; drop the brand suffix when it would push past that. */
export function fitTitle(title: string, max = 60) {
  return title.length > max && title.endsWith(BRAND_SUFFIX) ? title.slice(0, -BRAND_SUFFIX.length) : title;
}

/** Trim a description to ~160 characters, preferring a sentence boundary, else a word boundary with an ellipsis. */
export function clampDescription(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const window = clean.slice(0, max);
  const sentenceEnd = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "), window.lastIndexOf("! "));
  if (sentenceEnd >= 70) return window.slice(0, sentenceEnd + 1);
  return window.slice(0, window.lastIndexOf(" ")).replace(/[,;:—-]+$/, "") + "…";
}

interface PageMetadataInput {
  /** Full <title>, brand suffix included — the root layout template is "%s". */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/ai-strategy". Becomes the canonical URL. */
  path: string;
  type?: "website" | "article";
  /** ISO date; only used when type is "article". */
  publishedTime?: string;
  authors?: string[];
}

/**
 * One place that produces title, description, canonical, Open Graph and Twitter
 * metadata so every page is consistent. Note: a page-level `openGraph` replaces the
 * layout's wholesale, which is why siteName/type are repeated here.
 */
export function buildMetadata({
  title: rawTitle,
  description: rawDescription,
  path,
  type = "website",
  publishedTime,
  authors,
}: PageMetadataInput): Metadata {
  const title = fitTitle(rawTitle);
  const description = clampDescription(rawDescription);
  const images = [OG_IMAGE];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph:
      type === "article"
        ? { type: "article", siteName: SITE_NAME, title, description, url: path, images, publishedTime, authors }
        : { type: "website", siteName: SITE_NAME, title, description, url: path, images },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

/** BreadcrumbList. The final (current) item intentionally has no `item` URL, which schema.org/Google allow. */
export function breadcrumbSchema(items: BreadcrumbCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

/** FAQPage. Only pass questions that are visibly rendered on the same page. */
export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** schema.org Country nodes for every market named in `siteRegions`. */
export function areaServedSchema() {
  return siteRegions.marketCodes.map((code) => ({ "@type": "Country", name: code }));
}

export function serviceSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: areaServedSchema(),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  section?: string;
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    inLanguage: "en-US",
    ...(input.section ? { articleSection: input.section } : {}),
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    // Articles are authored by the team collectively; there are no individual bylines.
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function itemListSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
