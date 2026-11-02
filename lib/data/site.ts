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
export const contentLastUpdated = "2026-11-02";

export const site = {
  name: "DeosAI Labs",
  tagline: "AI Engineering, Business Automation & Forward Deployment",
  positioning:
    "DeosAI Labs — AI Engineering, Business Automation & Forward Deployment. We help businesses discover and improve operational workflows, build production-ready AI systems, automate business processes, develop custom business applications, integrate AI into existing software and infrastructure, and provide white-label AI and software engineering to agencies.",

  hero: {
    trustBadge: "AI Engineering, Business Automation & Forward Deployment",
    headline: "We Turn Business Workflows Into Production-Ready AI Systems.",
    description:
      "DeosAI Labs helps businesses automate operations, build custom software and integrate AI into the systems they already use.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" },
    secondaryCta: { label: "Explore Our Work", href: "/case-studies" },
  },

  finalCta: {
    headline: "Have a workflow worth fixing? Start with a conversation.",
    description:
      "Tell us how the work happens today. We will talk through where automation, a custom application or an AI integration could help, and whether DeosAI Labs is the right team to build it.",
    trustStatement:
      "No pressure and no obligation. If a simpler tool or a different approach fits better, we will say so.",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" },
    secondaryCta: { label: "View Packages & Pricing", href: "/services#packages" },
    supportingLinks: [
      { label: "Agency Partnerships", href: "/partners" },
      { label: "Read Our Insights", href: "/insights" },
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
  marketCodes: ["US", "GB", "AE", "SA", "PK", "QA", "KW", "BH", "OM", "JO", "EG", "MA"],
  summary: "the United States, the United Kingdom, the Middle East & North Africa (MENA) and Pakistan",
} as const;
