export interface StoryQuote {
  text: string;
  name: string;
  title: string;
}

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
  featured: boolean;
  relatedIndustrySlugs: string[];
  relatedServiceSlugs: string[];
  /**
   * Fields below are for real, verified engagements only — see the case
   * study intake template. Leave them unset on illustrative scenarios;
   * every consumer treats them as optional and renders nothing without one.
   */
  /** Real client name, once they've confirmed they can be named. Omit to stay anonymized. */
  clientName?: string;
  /** The single standout number or result — "Cut prior-auth turnaround from 3 days to 4 hours." */
  headlineMetric?: string;
  /** A signed-off, attributed quote — not the anonymized entries in testimonials.ts. */
  quote?: StoryQuote;
  /** What stayed a human decision — DeosAI's governance differentiator, not a generic caveat. */
  whatStaysHuman?: string;
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
 * The first entry below is a real, verified client engagement (see its
 * clientName/headlineMetric/quote/whatStaysHuman fields) — the rest are
 * clearly labeled illustrative scenarios (generalized business context,
 * no fabricated metrics), kept until replaced with more verified stories.
 */
export const stories: Story[] = [
  {
    slug: "reducing-manual-review-healthcare-revenue-cycle",
    industry: "Healthcare",
    industrySlug: "healthcare",
    title: "Reducing manual review by 60% across a healthcare revenue-cycle operation",
    context: "Indus Health, an organization managing revenue-cycle and medical billing operations in healthcare.",
    challenge:
      "A high volume of billing and claims cases required manual review before they could move forward, consuming reviewer time and creating a bottleneck between incoming case volume and available review capacity.",
    approach:
      "We designed a multi-agent AI revenue-cycle platform modeled on how a real RCM team works: eight specialized agents handle documentation, coding, validation, payer-policy research, compliance, and denial analysis and appeals, coordinated by LangGraph with explicit feedback loops, quality gates, and human-escalation paths built into the workflow from the start.",
    outcome:
      "The system reduced the volume of cases requiring manual review by 60%, while maintaining 95% accuracy across 250 evaluated cases — with every case still passing through human-review gates rather than being resolved without oversight.",
    lessons:
      "Designing the human-review gates and escalation paths as part of the system from day one, rather than adding oversight after the fact, was what made the approach credible inside a real revenue-cycle team, not just technically functional.",
    href: "/case-studies/reducing-manual-review-healthcare-revenue-cycle",
    featured: true,
    relatedIndustrySlugs: ["healthcare"],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-governance-evaluation"],
    clientName: "Indus Health",
    headlineMetric:
      "Reduced the volume of cases requiring manual review by 60%, while maintaining 95% accuracy across 250 evaluated cases.",
    quote: {
      text: "The most impressive part was how the AI was designed around the existing revenue-cycle workflow rather than trying to automate everything in one step. The human-review gates and policy-grounded decisions made the approach feel much more realistic for healthcare.",
      name: "Rizwan Ahmad",
      title: "Revenue Cycle Stakeholder",
    },
    whatStaysHuman:
      "Every case still moves through explicit quality gates and human-escalation paths built into the workflow — specialized agents support documentation, coding, payer-policy research, and denial analysis, but the cases that need human judgment are routed to a person by design. The system was built around the existing revenue-cycle process rather than replacing it in one step, so accountability for a claim decision never moves off a person's desk.",
  },
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
    featured: false,
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
    featured: false,
    relatedIndustrySlugs: ["financial-services"],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "intelligent-business-workflows"],
  },
];

export function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug);
}
