import { Blocks, Handshake, Zap, type LucideIcon } from "lucide-react";

/**
 * Commercial engagement packages. Single source of truth for the homepage offers,
 * the /services#packages section and the chat assistant's knowledge base, so a price
 * can never differ between them.
 *
 * Prices are INDICATIVE commercial starting ranges in USD, not quotations. Timelines are
 * owner-approved estimates and are always presented to visitors as indicative, not guaranteed delivery dates.
 */
export interface Offer {
  id: string;
  icon: LucideIcon;
  title: string;
  /** Short line for the homepage cards. */
  tagline: string;
  /** Displayed price, always framed as an indicative starting figure. */
  price: string;
  priceNote: string;
  idealFor: string[];
  problems: string[];
  included: string[];
  /** Scope boundaries: what a package at this price does and does not stretch to. */
  boundaries: string[];
  excluded: string[];
  /** Non-binding estimate, shown in full on the services page. */
  timeline: string;
  /** Short form of the estimate for cards. */
  timelineShort: string;
  nextSteps: string[];
  cta: { label: string; href: string };
}

export const packagesIntro = {
  eyebrow: "Engagement Packages",
  title: "Three clear ways to start working with DeosAI Labs.",
  description:
    "Each package is a defined starting point for a specific kind of work. Prices are indicative starting ranges in USD, not quotations: the final price depends on scope, which we confirm on a discovery call before any work begins.",
};

export const packagesDisclaimer = {
  title: "What the indicative prices do not include",
  points: [
    "Hosting and infrastructure costs are separate and scoped with you.",
    "Third-party service charges (for example AI model, messaging or other API usage) are billed at cost by the provider and are not part of the package price.",
    "Ongoing maintenance, monitoring and support are scoped separately from the initial build.",
    "Prices are initial indicative ranges, not guaranteed quotations. They do not imply unlimited work, and timelines are estimates that we confirm only after project discovery.",
  ],
};

export const offers: Offer[] = [
  {
    id: "workflow-automation-sprint",
    icon: Zap,
    title: "AI Workflow Automation Sprint",
    tagline: "Take one repetitive, manual workflow and turn it into a working automated process.",
    price: "$450–$650",
    priceNote: "Indicative starting range for one well-defined workflow.",
    idealFor: [
      "Small and mid-sized businesses with a clearly repetitive process, such as reporting, document preparation, data entry or follow-ups.",
      "Teams that already use spreadsheets, email or business software and want them to work together.",
    ],
    problems: [
      "Staff time lost to copying data between tools or rebuilding the same report or document by hand.",
      "Manual steps that cause delays, mistakes or dependence on one person.",
    ],
    included: [
      "A short discovery session to map the current workflow and agree the target outcome.",
      "Design and build of one automated workflow, with AI used only where it is the right tool.",
      "Connection to the existing tools involved, where an API or export is available.",
      "Testing with your real examples, a short handover walkthrough and basic written documentation.",
    ],
    boundaries: [
      "One workflow, one primary process owner and a limited number of integrations, agreed up front.",
      "Anything beyond the agreed workflow is quoted separately rather than absorbed.",
    ],
    excluded: [
      "Multiple workflows or department-wide rollouts.",
      "Custom user interfaces or full applications (see Custom Business Applications).",
      "Hosting, third-party API usage and ongoing maintenance, scoped separately.",
      "Data cleaning or migration of large legacy datasets.",
    ],
    timeline: "Approximately 1–2 weeks once scope is agreed. This is an indicative estimate, not a guaranteed delivery date; it is confirmed after project discovery.",
    timelineShort: "About 1–2 weeks",
    nextSteps: [
      "Book a discovery call and describe the workflow.",
      "Receive a written scope and fixed price for the sprint.",
      "Approve the scope, then we build, test and hand over.",
    ],
    cta: { label: "Discuss an Automation Sprint", href: "/contact?type=automation#message" },
  },
  {
    id: "custom-business-applications",
    icon: Blocks,
    title: "Custom Business Applications",
    tagline: "Internal tools, dashboards and operational applications built around how your business actually works.",
    price: "$750–$1,200",
    priceNote: "Indicative starting range for a focused, well-scoped application.",
    idealFor: [
      "Businesses running critical processes on spreadsheets, messaging apps or disconnected tools.",
      "Operations teams that need a purpose-built internal tool, dashboard or reporting workflow rather than another generic platform.",
    ],
    problems: [
      "Operational processes that depend on manual spreadsheets and cannot scale or be audited.",
      "No single place to see stock, orders, requests or status across the team.",
    ],
    included: [
      "Discovery and workflow mapping, then a short written scope.",
      "A working web application covering the agreed workflow, with sign-in and role basics where needed.",
      "Dashboards or reports for the agreed data, and generated documents or exports where in scope.",
      "Integration with the existing systems named in the scope, testing and deployment support.",
    ],
    boundaries: [
      "A focused application with a defined set of screens and workflows. Larger systems are scoped in phases.",
      "Changes requested after scope sign-off are quoted separately.",
    ],
    excluded: [
      "Large multi-department platforms or ERP replacement.",
      "Mobile app store releases, unless scoped.",
      "Hosting, third-party API usage and ongoing maintenance, scoped separately.",
      "Migration of large legacy datasets.",
    ],
    timeline: "Approximately 2–4 weeks once scope is agreed. This is an indicative estimate, not a guaranteed delivery date; it is confirmed after project discovery.",
    timelineShort: "About 2–4 weeks",
    nextSteps: [
      "Book a discovery call and walk us through the current process.",
      "Receive a written scope, price range and phased plan.",
      "Approve, then we build in short iterations with you reviewing along the way.",
    ],
    cta: { label: "Scope a Business Application", href: "/contact?type=application#message" },
  },
  {
    id: "white-label-ai-engineering",
    icon: Handshake,
    title: "White-label AI Engineering",
    tagline: "Engineering capacity for agencies and consultancies that need to deliver AI and software work for their own clients.",
    price: "From $600",
    priceNote: "Indicative starting price. Final pricing is based on project scope.",
    idealFor: [
      "Software agencies, AI agencies and digital transformation consultancies.",
      "ERP implementers and technology service providers whose clients are asking for AI, integrations or custom features.",
    ],
    problems: [
      "A client request that needs AI or integration skills your team does not have in-house.",
      "Delivery capacity gaps when you would rather not hire for a single project.",
    ],
    included: [
      "AI agents and assistants, and RAG and enterprise knowledge systems.",
      "MCP and API integrations, backend and full-stack development.",
      "Workflow automation, testing, deployment and technical implementation.",
      "Delivery under your brand, with a written scope and agreed hand-off.",
    ],
    boundaries: [
      "Priced per project from a written scope. $600 is a starting point for small, well-defined pieces of work, not a fixed day rate or a retainer.",
      "Larger or open-ended engagements are scoped and priced separately.",
    ],
    excluded: [
      "Unlimited or open-ended development at the starting price.",
      "Direct client management or account ownership, which stays with your agency.",
      "Hosting, third-party API usage and ongoing maintenance, scoped separately.",
    ],
    timeline: "Approximately 1–3 weeks for small, scoped pieces of work; larger projects depend on scope. This is an indicative estimate, not a guaranteed delivery date; it is confirmed after project discovery.",
    timelineShort: "About 1–3 weeks for small scoped pieces",
    nextSteps: [
      "Send a partnership enquiry with a short brief of the client work.",
      "We review the brief and agree a written scope and price.",
      "Delivery starts after scope approval, with updates routed through you.",
    ],
    cta: { label: "Make a Partnership Enquiry", href: "/partners#partner-enquiry" },
  },
];

export function getOffer(id: string) {
  return offers.find((offer) => offer.id === id);
}
