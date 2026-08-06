/**
 * Site-wide copy. Hero headline, tagline, and CTA labels below are first-draft
 * copy written to satisfy the brand voice guidelines in 01-brand-strategy.md
 * (the spec leaves these as literal <PLACEHOLDER> slots) — swap freely.
 */
/** Placeholder production domain — swap once a real domain is registered. */
export const siteUrl = "https://www.deosailabs.com";

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
