/**
 * Site-wide copy. Hero headline, tagline, and CTA labels below are first-draft
 * copy written to satisfy the brand voice guidelines in 01-brand-strategy.md
 * (the spec leaves these as literal <PLACEHOLDER> slots) — swap freely.
 */
export const siteUrl = "https://www.deosailabs.com";

/**
 * Date the site's content last meaningfully changed (YYYY-MM-DD), used as <lastmod> in the
 * sitemap. Bump it when you publish content changes. Using the build time instead would mark
 * every page as "modified today" on every deploy, which makes search engines ignore lastmod.
 */
export const contentLastUpdated = "2026-10-29";

export const site = {
  name: "DeosAI Labs",
  positioning:
    "DeosAI Labs is an AI Forward Deployment Company. We partner with organizations to design, deploy, and continuously improve production-grade AI systems that integrate into existing business operations.",

  hero: {
    trustBadge: "AI Forward Deployment Partner",
    headline: "Production-grade AI, deployed inside how your business already runs.",
    description:
      "We partner with enterprise teams to identify high-value opportunities, design solutions that fit existing workflows, and deploy AI systems that hold up in production, not just in a demo.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" },
    secondaryCta: { label: "Explore Our Services", href: "/services" },
  },

  finalCta: {
    headline: "Every AI transformation starts with a conversation.",
    description:
      "Every successful AI transformation begins with understanding the business. Whether you are exploring your first AI initiative or expanding existing capabilities, the first step is a conversation.",
    trustStatement:
      "No sales pitch, no pressure — just a candid conversation about where AI can create real value in your operations, and whether we're the right partner to help you get there.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" },
    secondaryCta: { label: "Explore Our Services", href: "/services" },
    supportingLinks: [
      { label: "Read Our Insights", href: "/insights" },
      { label: "View Industry Solutions", href: "/industries" },
    ],
  },
} as const;

/**
 * Where DeosAI Labs is based and which markets it serves. Used in structured data, the footer, and the
 * About and Contact pages so the same facts appear everywhere.
 */
export const siteRegions = {
  base: { locality: "Islamabad", countryCode: "PK", country: "Pakistan" },
  /** ISO 3166-1 alpha-2 codes of the countries named as served markets. */
  marketCodes: ["US", "AE", "SA", "QA", "KW", "BH", "OM", "JO", "EG", "MA"],
  summary: "the United States and the Middle East & North Africa (MENA)",
} as const;
