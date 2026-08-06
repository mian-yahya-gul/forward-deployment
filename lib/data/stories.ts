export interface Story {
  slug: string;
  industry: string;
  industrySlug: string;
  title: string;
  context: string;
  challenge: string;
  approach: string;
  outcome: string;
  lessons: string;
  href: string;
  illustrative: boolean;
  featured: boolean;
  relatedIndustrySlugs: string[];
  relatedServiceSlugs: string[];
}

export const storiesIntro = {
  eyebrow: "Client Success",
  headline: "Evidence, not marketing claims.",
  description:
    "We measure success in operational outcomes, not demos. Here's how organizations put AI to work inside real operations.",
  cta: { label: "Explore All Stories", href: "/case-studies" },
};

export const storiesLandingHero = {
  eyebrow: "Client Success",
  title: "Operational outcomes, not marketing claims.",
  description:
    "Every engagement is measured against a real operational problem. Here's how organizations have put AI to work inside their actual operations.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
};

/**
 * No real client engagements are published yet, so these are clearly
 * labeled illustrative scenarios (generalized business context, no
 * fabricated metrics) rather than real named case studies — replace
 * with verified client stories as they become available for publication.
 */
export const stories: Story[] = [
  {
    slug: "reducing-administrative-load-healthcare",
    industry: "Healthcare",
    industrySlug: "healthcare",
    title: "Reducing administrative load so clinical teams can focus on patients",
    context: "A regional healthcare provider with multiple clinical and administrative teams.",
    challenge:
      "Staff spent significant time manually searching scattered documentation and systems to answer routine clinical and administrative questions.",
    approach:
      "Discovery workshops with clinical and operations staff, workflow mapping across departments, and a phased knowledge-assistant rollout starting with a single high-friction workflow.",
    outcome:
      "Faster access to information, reduced administrative burden on clinical staff, and more consistent answers across teams.",
    lessons: "Starting with one well-scoped workflow built trust before expanding further.",
    href: "/case-studies/reducing-administrative-load-healthcare",
    illustrative: true,
    featured: true,
    relatedIndustrySlugs: ["healthcare"],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "ai-assistants-copilots"],
  },
  {
    slug: "unifying-inventory-customer-data-retail",
    industry: "Retail & E-commerce",
    industrySlug: "retail-ecommerce",
    title: "Bringing inventory and customer data into one place",
    context: "A multi-channel retail organization selling through e-commerce, marketplace, and physical stores.",
    challenge:
      "Inventory and customer data lived in separate systems across channels, so customer service representatives couldn't get a consistent answer to a simple question depending on which system they checked.",
    approach:
      "Discovery sessions with customer service and operations teams, a data and systems audit across channels, and a phased rollout of a unified knowledge and inventory assistant starting with the highest-volume support queue.",
    outcome:
      "Faster, more consistent customer service across channels and a single reliable view of inventory for the team.",
    lessons:
      "Aligning on which system was the source of truth for each data type mattered more than the technology used to connect them.",
    href: "/case-studies/unifying-inventory-customer-data-retail",
    illustrative: true,
    featured: false,
    relatedIndustrySlugs: ["retail-ecommerce"],
    relatedServiceSlugs: ["ai-platform-integration", "intelligent-business-workflows"],
  },
  {
    slug: "real-time-visibility-manufacturing",
    industry: "Manufacturing",
    industrySlug: "manufacturing",
    title: "Giving operations teams real-time visibility",
    context: "A mid-size manufacturer running multiple production lines across one facility.",
    challenge:
      "Production issues were often discovered through a scheduled end-of-shift report, by which point the disruption had already affected output.",
    approach:
      "Workflow mapping across production, quality, and maintenance teams, followed by a phased rollout of a real-time operational dashboard connected to existing production and quality systems.",
    outcome:
      "Fewer production disruptions and faster issue response, since problems surfaced to the right team as they happened rather than after the fact.",
    lessons: "The biggest gains came from connecting data that already existed, not from adding new sensors or systems.",
    href: "/case-studies/real-time-visibility-manufacturing",
    illustrative: true,
    featured: false,
    relatedIndustrySlugs: ["manufacturing"],
    relatedServiceSlugs: ["intelligent-business-workflows", "continuous-optimization"],
  },
  {
    slug: "streamlining-compliance-review-financial-services",
    industry: "Financial Services",
    industrySlug: "financial-services",
    title: "Streamlining compliance-heavy document review",
    context: "A financial services firm with a document-heavy approval process spanning multiple compliance checkpoints.",
    challenge:
      "Manual document review created a bottleneck ahead of every approval, and reviewers spent most of their time on document types that rarely had issues.",
    approach:
      "A workflow and risk review with compliance and operations teams, followed by a phased rollout of document intelligence support that flagged higher-risk documents for closer review while keeping an auditable record of every decision.",
    outcome: "Faster turnaround without sacrificing accuracy, and a documented, auditable review trail across the process.",
    lessons:
      "Keeping a human reviewer in the loop for every decision was essential to both compliance requirements and internal trust in the system.",
    href: "/case-studies/streamlining-compliance-review-financial-services",
    illustrative: true,
    featured: false,
    relatedIndustrySlugs: ["financial-services"],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "intelligent-business-workflows"],
  },
];

export function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug);
}
