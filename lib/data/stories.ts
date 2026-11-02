/**
 * Portfolio content. Every entry carries an explicit category so visitors can tell a real
 * implementation from a technical demonstration or a conceptual prototype, and nothing
 * here may be presented as a paying client deployment unless its category says so.
 *
 * The original, unverified story data (including client metrics, a named quote and generic
 * scenarios written as client engagements) is preserved in /archive/stories-unverified-archive.ts (outside the app source) and
 * is NOT imported anywhere. Do not move claims from that file back into this one without the
 * owner's explicit confirmation of authenticity, evidence and publication permission.
 */

export type StoryCategory = "real-implementation" | "technical-demonstration" | "conceptual-prototype";

/** "draft" entries are shown only when NODE_ENV is not "production" (local dev) and are never indexed. */
export type StoryStatus = "published" | "draft";

export interface StoryQuote {
  text: string;
  name: string;
  title: string;
}

export interface Story {
  slug: string;
  category: StoryCategory;
  status: StoryStatus;
  industry: string;
  industrySlug: string;
  title: string;
  /** Optional shorter <title> (about 50 characters) so search results do not truncate it. */
  metaTitle?: string;
  /** One-sentence summary used on cards. */
  summary: string;
  context: string;
  challenge: string;
  approach: string;
  outcome: string;
  /** Short before/after comparison, only where the owner has reported one. */
  beforeAfter?: { before: string; after: string; source: string };
  /** Plain-language list of what the build covers. */
  capabilities?: string[];
  lessons?: string;
  /** Always shown near the top of the detail page, e.g. "This is a conceptual prototype, not a client engagement." */
  disclosure: string;
  href: string;
  featured: boolean;
  relatedIndustrySlugs: string[];
  relatedServiceSlugs: string[];
  /** Internal review checklist, rendered only on draft pages. */
  reviewNotes?: string[];
  /**
   * The fields below are for real, verified engagements only. Leave them unset otherwise;
   * every consumer renders nothing without them.
   */
  clientName?: string;
  headlineMetric?: string;
  quote?: StoryQuote;
  whatStaysHuman?: string;
}

export interface CategoryMeta {
  label: string;
  shortLabel: string;
  description: string;
  /** Section headings for the detail page. */
  headings: { challenge: string; approach: string; outcome: string; lessons: string };
}

export const categoryOrder: StoryCategory[] = ["real-implementation", "technical-demonstration", "conceptual-prototype"];

export const categoryMeta: Record<StoryCategory, CategoryMeta> = {
  "real-implementation": {
    label: "Real Implementations",
    shortLabel: "Real implementation",
    description: "Software we have built and that is in real use by a business.",
    headings: {
      challenge: "The original process",
      approach: "What we built",
      outcome: "What changed",
      lessons: "What we took from it",
    },
  },
  "technical-demonstration": {
    label: "Technical Demonstrations",
    shortLabel: "Technical demonstration",
    description:
      "Working or design-level builds that show how we approach a problem. They are not client deployments and carry no performance claims.",
    headings: {
      challenge: "The problem explored",
      approach: "How the demonstration is designed",
      outcome: "What it demonstrates",
      lessons: "Design principle",
    },
  },
  "conceptual-prototype": {
    label: "Conceptual Prototypes",
    shortLabel: "Conceptual prototype",
    description:
      "Illustrative scenarios showing how we would approach a type of problem. They are not client engagements and describe no results.",
    headings: {
      challenge: "The scenario",
      approach: "How we would approach it",
      outcome: "What the approach aims for",
      lessons: "What we would check first",
    },
  },
};

export const storiesIntro = {
  eyebrow: "Our Work",
  headline: "Real builds, clearly labelled.",
  description:
    "A selection of our work, organised by what it actually is: real implementations, technical demonstrations and conceptual prototypes. We label each one so you always know what you are looking at.",
  cta: { label: "Explore Our Work", href: "/case-studies" },
};

export const storiesLandingHero = {
  eyebrow: "Portfolio",
  title: "Our work, clearly labelled.",
  description:
    "Real implementations, technical demonstrations and conceptual prototypes, each marked for what it is. We do not present demonstrations as client deployments, and we publish no result we cannot stand behind.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta: { label: "View Packages", href: "/services#packages" },
};

export const stories: Story[] = [
  {
    slug: "manual-retail-replenishment-to-two-minute-digital-workflow",
    category: "real-implementation",
    status: "draft",
    industry: "Retail & Distribution",
    industrySlug: "retail-ecommerce",
    title: "From Manual Retail Replenishment to a Two-Minute Digital Workflow",
    summary:
      "A replenishment application that replaced an evening-long manual stock and paperwork process for a retail business.",
    context:
      "A real implementation for a retail business that restocks its sales locations from a central supplier. Business details are withheld.",
    challenge:
      "Restocking had been a manual job. Stock shortages reported by sales staff had to be gathered, checked and worked into the paperwork needed to request stock, and the whole routine took an evening each time. That effort was repeated for every replenishment cycle, and it depended on one person doing it carefully by hand.",
    approach:
      "We built a replenishment application around the way the business already decides what to restock. Shortages and stock requests are recorded in one place, the owner remains the person who decides quantities, and the application produces the documents the process needs. It also tracks each order through its stages so everyone can see where it stands.",
    outcome:
      "The business reports that a process that used to take an evening now takes approximately two minutes using the application.",
    beforeAfter: {
      before: "An evening-long manual process",
      after: "Approximately two minutes using the application",
      source: "Reported by the business",
    },
    capabilities: [
      "Stock reporting and a view of items that need replenishing",
      "Replenishment workflow, with the owner deciding quantities",
      "Generation of the documents the replenishment process requires",
      "Order tracking from request through to delivery and receipt",
    ],
    lessons:
      "The largest gain came from capturing the existing process faithfully and removing the repetitive paperwork, not from changing who makes the decisions.",
    disclosure:
      "A real implementation. The two-minute figure is the time reported by the business; we publish no other financial or performance metrics. Business details are withheld.",
    href: "/case-studies/manual-retail-replenishment-to-two-minute-digital-workflow",
    featured: true,
    relatedIndustrySlugs: ["retail-ecommerce", "logistics-supply-chain"],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration"],
    reviewNotes: [
      "DRAFT pending owner approval. Hidden in production until status is set to \"published\".",
      "Business name, store or location names, screenshots, logos and prices are deliberately not published. Authorize each separately.",
      "Process details (shortage reporting, owner-decided quantities, generated documents, order tracking) are described generically from the application's own tool description; please confirm they are accurate and fine to publish.",
      "The technology stack is not stated because it has not been confirmed. Supply it if you want it listed.",
      "No claim is made that AI performs the calculations or document generation. Confirm whether, and where, AI is actually used before adding any such claim.",
      "The only metric is the reported evening-to-two-minutes improvement. Confirm the wording and that the business is happy for it to be published.",
    ],
  },
  {
    slug: "technical-demonstration-manual-review",
    category: "technical-demonstration",
    status: "published",
    industry: "Healthcare",
    industrySlug: "healthcare",
    title: "A multi-agent workflow design for healthcare revenue-cycle review",
    metaTitle: "Healthcare Revenue-Cycle AI Workflow Demo",
    summary:
      "A technical demonstration of how specialised AI agents, quality gates and human escalation can be combined in a billing-review workflow.",
    context:
      "A technical demonstration of how an AI-assisted revenue-cycle review workflow could be structured. It is not presented as a client deployment.",
    challenge:
      "Billing and claims work often needs manual review before a case can move forward, which ties up reviewer time and creates a bottleneck between incoming volume and review capacity.",
    approach:
      "The demonstration models how a revenue-cycle team works. Specialised agents support documentation, coding, validation, payer-policy research, compliance and denial analysis, coordinated by an orchestration layer with explicit feedback loops, quality gates and human-escalation paths designed in from the start.",
    outcome:
      "It shows an architecture in which AI supports the reviewer while the cases that need judgment are routed to a person by design. No performance or accuracy figures are published for this demonstration.",
    lessons:
      "Designing human-review gates and escalation paths as part of the system, rather than adding oversight afterwards, is what makes this kind of workflow credible in a regulated environment.",
    disclosure:
      "A technical demonstration. It is not a verified client engagement, and no performance, accuracy or volume figures are published for it.",
    href: "/case-studies/technical-demonstration-manual-review",
    featured: false,
    relatedIndustrySlugs: ["healthcare"],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-governance-evaluation"],
    whatStaysHuman:
      "Decisions that need judgment are routed to a person through explicit quality gates and escalation paths. Accountability for a claim decision stays with a person.",
    reviewNotes: [
      "Formerly presented as a verified client engagement with specific metrics, a named quote and a client logo. All of that is withheld pending owner confirmation.",
      "Confirm whether this is a demonstration or a real engagement, and supply evidence and publication permission before any metric, client name, quote or logo is restored.",
      "The old URL (/case-studies/reducing-manual-review-healthcare-revenue-cycle) now permanently redirects to the neutral slug /case-studies/technical-demonstration-manual-review.",
    ],
  },
  {
    slug: "reducing-administrative-load-healthcare",
    category: "conceptual-prototype",
    status: "published",
    industry: "Healthcare",
    industrySlug: "healthcare",
    title: "Scenario: a knowledge assistant for clinical and administrative teams",
    metaTitle: "Healthcare Knowledge Assistant Scenario",
    summary: "An illustrative scenario for reducing time spent searching scattered documentation.",
    context: "An illustrative scenario for a healthcare provider with several clinical and administrative teams.",
    challenge:
      "Staff spend time searching scattered documentation and systems to answer routine clinical and administrative questions.",
    approach:
      "We would start with discovery sessions with clinical and operations staff, map the workflows across departments, and begin with a knowledge assistant for a single high-friction workflow before widening it.",
    outcome: "The approach aims at faster access to information and more consistent answers across teams.",
    lessons: "Starting with one well-scoped workflow builds trust before the scope widens.",
    disclosure: "A conceptual prototype. It is an illustrative scenario, not a client engagement, and describes no results.",
    href: "/case-studies/reducing-administrative-load-healthcare",
    featured: false,
    relatedIndustrySlugs: ["healthcare"],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "ai-assistants-copilots"],
  },
  {
    slug: "unifying-inventory-customer-data-retail",
    category: "conceptual-prototype",
    status: "published",
    industry: "Retail & Distribution",
    industrySlug: "retail-ecommerce",
    title: "Scenario: bringing inventory and customer data into one place",
    metaTitle: "Retail Inventory & Customer Data Scenario",
    summary: "An illustrative scenario for a multi-channel retailer whose systems disagree.",
    context: "An illustrative scenario for a multi-channel retailer selling online, through marketplaces and in stores.",
    challenge:
      "Inventory and customer data sit in separate systems across channels, so a simple question gets a different answer depending on which system is checked.",
    approach:
      "We would run discovery sessions with customer service and operations, audit the data and systems across channels, and begin with a unified knowledge and inventory assistant for the highest-volume support queue.",
    outcome: "The approach aims at consistent answers across channels and a single reliable view of inventory.",
    lessons:
      "Agreeing which system is the source of truth for each type of data matters more than the technology used to connect them.",
    disclosure: "A conceptual prototype. It is an illustrative scenario, not a client engagement, and describes no results.",
    href: "/case-studies/unifying-inventory-customer-data-retail",
    featured: false,
    relatedIndustrySlugs: ["retail-ecommerce"],
    relatedServiceSlugs: ["ai-platform-integration", "intelligent-business-workflows"],
  },
  {
    slug: "real-time-visibility-manufacturing",
    category: "conceptual-prototype",
    status: "published",
    industry: "Manufacturing & Operations",
    industrySlug: "manufacturing",
    title: "Scenario: real-time visibility for production teams",
    summary: "An illustrative scenario for surfacing production issues as they happen.",
    context: "An illustrative scenario for a manufacturer running several production lines.",
    challenge:
      "Production issues are often found only in a scheduled end-of-shift report, by which point output has already been affected.",
    approach:
      "We would map workflows across production, quality and maintenance, then connect existing production and quality systems to a real-time operational dashboard in phases.",
    outcome: "The approach aims at problems reaching the right team as they happen rather than after the fact.",
    lessons: "Connecting data that already exists usually matters more than adding new sensors or systems.",
    disclosure: "A conceptual prototype. It is an illustrative scenario, not a client engagement, and describes no results.",
    href: "/case-studies/real-time-visibility-manufacturing",
    featured: false,
    relatedIndustrySlugs: ["manufacturing"],
    relatedServiceSlugs: ["intelligent-business-workflows", "continuous-optimization"],
  },
  {
    slug: "streamlining-compliance-review-financial-services",
    category: "conceptual-prototype",
    status: "published",
    industry: "Financial Services",
    industrySlug: "financial-services",
    title: "Scenario: streamlining compliance-heavy document review",
    summary: "An illustrative scenario for flagging higher-risk documents while keeping an auditable trail.",
    context: "An illustrative scenario for a firm with a document-heavy approval process.",
    challenge:
      "Manual document review creates a bottleneck ahead of every approval, and reviewers spend much of their time on document types that rarely have issues.",
    approach:
      "We would review the workflow and risk with compliance and operations, then phase in document intelligence that flags higher-risk documents for closer review and keeps an auditable record of every decision.",
    outcome: "The approach aims at faster turnaround without losing accuracy, and a documented review trail.",
    lessons: "A human reviewer stays in the loop for every decision, which compliance and internal trust both require.",
    disclosure: "A conceptual prototype. It is an illustrative scenario, not a client engagement, and describes no results.",
    href: "/case-studies/streamlining-compliance-review-financial-services",
    featured: false,
    relatedIndustrySlugs: ["financial-services"],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "intelligent-business-workflows"],
  },
];

/**
 * Draft entries are visible only in local development. There is deliberately no environment-variable
 * override, so a misconfigured production or preview deployment cannot expose a draft.
 */
export function draftsVisible() {
  return process.env.NODE_ENV !== "production";
}

export function getVisibleStories(): Story[] {
  return stories.filter((story) => story.status === "published" || draftsVisible());
}

export function getStoryBySlug(slug: string) {
  return getVisibleStories().find((story) => story.slug === slug);
}
