import {
  Activity,
  Factory,
  GraduationCap,
  Landmark,
  LayoutGrid,
  Route,
  type LucideIcon,
} from "lucide-react";

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface Industry {
  icon: LucideIcon;
  name: string;
  slug: string;
  challenge: string;
  outcome: string;
  overview: string;
  operationalEnvironment: string;
  challenges: IndustryChallenge[];
  aiOpportunities: string[];
  businessOutcomes: string[];
  systems: string[];
  relatedServiceSlugs: string[];
  faqs: IndustryFaq[];
}

export const industriesIntro = {
  eyebrow: "Industries",
  headline: "We start by understanding how your industry actually works.",
  description:
    "Every industry has unique workflows, regulations, terminology, risks, and success metrics. Our approach begins by understanding your business before recommending AI solutions.",
  cta: { label: "Explore Industries", href: "/industries" },
};

export const industriesLandingHero = {
  eyebrow: "Industries",
  title: "AI that adapts to your industry, not the other way around.",
  description:
    "Every industry has unique workflows, regulatory pressure, and definitions of success. We start each engagement by understanding those specifics before recommending a solution.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
};

export const industries: Industry[] = [
  {
    icon: Activity,
    name: "Healthcare",
    slug: "healthcare",
    challenge: "Improve access to clinical knowledge and streamline administrative workflows.",
    outcome: "More time for patient care.",
    overview:
      "Healthcare organizations operate under constant pressure to deliver high-quality care while managing administrative complexity, regulatory requirements, and constrained staff time. Clinical and administrative teams often work with disconnected systems, and the people closest to patients are frequently the ones most burdened by paperwork.",
    operationalEnvironment:
      "Clinical staff split time between direct patient care and documentation, referrals, and coordination across departments. Administrative teams manage scheduling, billing, and compliance reporting, often across multiple systems that don't share data cleanly. Decisions frequently depend on information that exists somewhere in the organization but isn't easy to find in the moment it's needed.",
    challenges: [
      {
        title: "Administrative burden on clinical staff",
        description:
          "Clinicians spend significant time on documentation and administrative tasks that pull focus away from patient care.",
      },
      {
        title: "Fragmented patient and operational data",
        description:
          "Clinical, scheduling, and billing systems often don't communicate, making a full picture of a patient or process hard to assemble.",
      },
      {
        title: "Knowledge access under time pressure",
        description:
          "Staff need accurate answers quickly, but institutional and clinical knowledge is scattered across systems and people.",
      },
      {
        title: "Compliance and reporting overhead",
        description:
          "Regulatory requirements demand consistent, auditable processes that are difficult to maintain manually at scale.",
      },
    ],
    aiOpportunities: [
      "Clinical and administrative knowledge assistants",
      "Documentation and workflow support",
      "Referral and scheduling coordination",
      "Operational reporting and dashboards",
      "Patient communication support",
    ],
    businessOutcomes: [
      "More time for patient care",
      "Faster access to accurate information",
      "Reduced administrative burden",
      "Improved consistency across departments",
      "Stronger compliance reporting",
    ],
    systems: [
      "Electronic Medical Records (EMR)",
      "Practice management systems",
      "Scheduling platforms",
      "Billing and claims systems",
      "Document management systems",
    ],
    relatedServiceSlugs: [
      "enterprise-knowledge-systems",
      "ai-assistants-copilots",
      "intelligent-business-workflows",
      "ai-strategy-discovery",
    ],
    faqs: [
      {
        question: "How is patient data protected in an AI deployment?",
        answer:
          "Access controls and governance are designed around your existing compliance requirements from the start — AI systems respect the same permission boundaries as your other clinical systems.",
      },
      {
        question: "Does this require replacing our EMR?",
        answer: "No — we typically integrate with your existing EMR and related systems rather than replacing them.",
      },
      {
        question: "How long does a healthcare deployment typically take?",
        answer:
          "It depends on scope, but most engagements start with a single well-defined workflow to prove value before expanding further.",
      },
      {
        question: "Is clinical judgment ever automated?",
        answer:
          "No — AI systems are designed to support staff with information and administrative efficiency, with clinical decisions remaining with clinicians.",
      },
    ],
  },
  {
    icon: GraduationCap,
    name: "Education",
    slug: "education",
    challenge: "Reduce administrative overhead so staff and faculty can focus on students.",
    outcome: "More time for teaching and student support.",
    overview:
      "Educational institutions balance teaching and student support with a growing administrative load — admissions, scheduling, compliance, and reporting all compete for the same limited staff time. Faculty and administrative teams often rely on manual processes that were never designed for the current scale of the institution.",
    operationalEnvironment:
      "Faculty manage teaching alongside advising, grading, and administrative reporting. Administrative staff handle admissions, scheduling, and compliance across systems that frequently don't share data. Institutional knowledge — policies, procedures, past decisions — often exists in individual staff members' heads rather than a searchable system.",
    challenges: [
      {
        title: "Administrative overhead for faculty and staff",
        description:
          "Time spent on scheduling, reporting, and paperwork reduces time available for teaching and student support.",
      },
      {
        title: "Fragmented student and institutional data",
        description: "Student records, course systems, and administrative data frequently live in separate systems.",
      },
      {
        title: "Inconsistent access to policy and process knowledge",
        description:
          "Staff and faculty often rely on informal knowledge rather than a documented, searchable source of truth.",
      },
      {
        title: "Growing compliance and reporting requirements",
        description:
          "Accreditation and regulatory reporting demand consistent processes that are hard to maintain manually.",
      },
    ],
    aiOpportunities: [
      "Staff and faculty knowledge assistants",
      "Administrative workflow automation",
      "Student support and advising assistance",
      "Institutional reporting and dashboards",
    ],
    businessOutcomes: [
      "More time for teaching and student support",
      "Faster access to policy and process information",
      "Reduced administrative overhead",
      "Improved reporting consistency",
    ],
    systems: [
      "Student Information Systems (SIS)",
      "Learning Management Systems (LMS)",
      "Admissions platforms",
      "Scheduling systems",
      "Document management systems",
    ],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "intelligent-business-workflows", "ai-strategy-discovery"],
    faqs: [
      {
        question: "Can this support both faculty and administrative staff?",
        answer:
          "Yes — engagements are scoped around specific workflows, whether that's faculty-facing, administrative, or both.",
      },
      {
        question: "How does this handle student data privacy?",
        answer: "Access and governance controls are built around your institution's existing data privacy requirements.",
      },
      {
        question: "Do we need a dedicated IT team to maintain this?",
        answer:
          "We design for maintainability and can support your team directly or hand off documentation, depending on your capacity.",
      },
      {
        question: "Can this integrate with our existing LMS or SIS?",
        answer: "Yes — integration is scoped around your specific systems as part of the engagement.",
      },
    ],
  },
  {
    icon: LayoutGrid,
    name: "Retail & E-commerce",
    slug: "retail-ecommerce",
    challenge: "Unify fragmented customer, inventory, and operations data.",
    outcome: "Faster, more consistent customer experience.",
    overview:
      "Retail and e-commerce organizations operate across multiple channels — in-store, online, marketplace — with customer, inventory, and operational data that often lives in separate systems. Meeting rising customer expectations for speed and consistency requires those systems to work together, which is harder than it sounds.",
    operationalEnvironment:
      "Customer service, merchandising, and operations teams work from different systems that don't always agree on the same numbers. Inventory visibility often lags reality, and customer inquiries get answered inconsistently depending on which channel or representative handles them.",
    challenges: [
      {
        title: "Fragmented customer and inventory data",
        description:
          "Systems across channels often disagree, making a single accurate view of inventory or customer history hard to maintain.",
      },
      {
        title: "Inconsistent customer service",
        description: "Answers to customer questions vary depending on the channel and the representative handling the inquiry.",
      },
      {
        title: "Manual merchandising and operations workflows",
        description:
          "Pricing, promotions, and inventory decisions often rely on manual processes that don't scale with growth.",
      },
      {
        title: "Limited real-time operational visibility",
        description: "Leaders often lack a current view of what's happening across channels, slowing decisions.",
      },
    ],
    aiOpportunities: [
      "Unified customer knowledge assistants",
      "Inventory and operations visibility",
      "Customer self-service support",
      "Workflow automation for merchandising operations",
    ],
    businessOutcomes: [
      "Faster, more consistent customer experience",
      "Improved inventory accuracy",
      "Reduced manual operational work",
      "Better cross-channel visibility",
    ],
    systems: [
      "E-commerce platforms",
      "Point-of-sale systems",
      "Inventory management systems",
      "CRM platforms",
      "Order management systems",
    ],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-assistants-copilots", "ai-platform-integration"],
    faqs: [
      {
        question: "Can this work across both online and in-store operations?",
        answer: "Yes — the approach is designed to unify data and workflows across channels rather than treating them separately.",
      },
      {
        question: "Do we need to consolidate our systems first?",
        answer: "No — we typically integrate with your existing systems rather than requiring consolidation beforehand.",
      },
      {
        question: "How quickly can we see results?",
        answer: "We usually start with one high-impact workflow or channel to demonstrate value before expanding scope.",
      },
      {
        question: "Can this support seasonal or peak-demand periods?",
        answer: "Yes — systems are designed to handle variable demand, and we plan capacity around known peak periods.",
      },
    ],
  },
  {
    icon: Factory,
    name: "Manufacturing",
    slug: "manufacturing",
    challenge: "Improve visibility across production, quality, and supply workflows.",
    outcome: "Fewer disruptions and more predictable output.",
    overview:
      "Manufacturing organizations run complex operations spanning production, quality, supply chain, and maintenance — each generating data that's rarely connected to the others. Disruptions often surface late, after they've already affected output or delivery.",
    operationalEnvironment:
      "Production, quality, and maintenance teams typically work from separate systems and reporting cadences. Issues on the floor may not be visible to planning or leadership until a scheduled report surfaces them, by which point the disruption has already had an impact.",
    challenges: [
      {
        title: "Delayed visibility into production issues",
        description: "Problems on the production floor often aren't visible to planning and leadership until after they've caused delays.",
      },
      {
        title: "Disconnected quality, maintenance, and production data",
        description: "Systems tracking different parts of the operation rarely share data, making root-cause analysis slow.",
      },
      {
        title: "Manual reporting and documentation",
        description: "Quality and compliance documentation often relies on manual data entry that's time-consuming and error-prone.",
      },
      {
        title: "Reactive rather than predictive maintenance",
        description: "Maintenance is frequently scheduled on fixed intervals rather than actual equipment condition.",
      },
    ],
    aiOpportunities: [
      "Real-time operational dashboards",
      "Predictive maintenance support",
      "Quality and compliance documentation automation",
      "Knowledge assistants for standard operating procedures",
    ],
    businessOutcomes: [
      "Fewer production disruptions",
      "Faster issue response",
      "Reduced manual documentation effort",
      "More predictable output",
    ],
    systems: [
      "Manufacturing Execution Systems (MES)",
      "ERP systems",
      "Quality management systems",
      "Maintenance management systems",
      "Supply chain platforms",
    ],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration", "continuous-optimization"],
    faqs: [
      {
        question: "Can this integrate with our existing MES or ERP?",
        answer: "Yes — integration with existing production and planning systems is a core part of the engagement.",
      },
      {
        question: "Does this require new hardware or sensors?",
        answer:
          "Not necessarily — we start by working with the data your existing systems already generate before recommending new instrumentation.",
      },
      {
        question: "How is this different from a traditional BI dashboard?",
        answer: "It combines operational visibility with AI-assisted analysis and workflow automation, rather than just presenting historical charts.",
      },
      {
        question: "Can this scale across multiple facilities?",
        answer: "Yes — we typically start with a single facility or line and extend the same architecture once it's proven.",
      },
    ],
  },
  {
    icon: Route,
    name: "Logistics & Supply Chain",
    slug: "logistics-supply-chain",
    challenge: "Coordinate fragmented planning, routing, and inventory systems.",
    outcome: "Faster, more reliable delivery performance.",
    overview:
      "Logistics and supply chain organizations coordinate planning, routing, and inventory across a network of partners, systems, and constantly shifting conditions. Fragmented visibility across that network makes it hard to plan reliably or respond quickly when conditions change.",
    operationalEnvironment:
      "Planning, dispatch, and warehouse teams work across systems that often don't share a common real-time view. Exceptions — delays, capacity constraints, demand shifts — require manual coordination between teams and partners to resolve.",
    challenges: [
      {
        title: "Fragmented planning and routing systems",
        description: "Planning, dispatch, and warehouse systems frequently operate independently, complicating coordination.",
      },
      {
        title: "Limited real-time visibility",
        description: "Teams often lack a current view of shipments, capacity, and inventory across the network.",
      },
      {
        title: "Manual exception handling",
        description: "Delays and disruptions require manual coordination across teams and partners to resolve.",
      },
      {
        title: "Inventory and demand forecasting gaps",
        description: "Forecasting is often based on limited data, leading to over- or under-stocking.",
      },
    ],
    aiOpportunities: [
      "Operational visibility dashboards",
      "Exception detection and coordination support",
      "Demand and inventory forecasting support",
      "Knowledge assistants for planning and dispatch teams",
    ],
    businessOutcomes: [
      "Faster, more reliable delivery performance",
      "Improved network visibility",
      "Reduced manual coordination effort",
      "Better inventory alignment with demand",
    ],
    systems: [
      "Warehouse Management Systems (WMS)",
      "Transportation Management Systems (TMS)",
      "ERP systems",
      "Inventory management systems",
    ],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration", "ai-strategy-discovery"],
    faqs: [
      {
        question: "Can this work across multiple logistics partners and carriers?",
        answer: "Yes — integration is scoped to your actual partner and carrier network as part of the engagement.",
      },
      {
        question: "Do we need real-time tracking hardware first?",
        answer: "Not necessarily — we start with the data your existing systems already capture and identify gaps from there.",
      },
      {
        question: "How does this handle disruptions or delays?",
        answer: "The system is designed to surface exceptions early and support faster coordination, rather than automating decisions that need human judgment.",
      },
      {
        question: "Can this scale as our network grows?",
        answer: "Yes — the architecture is designed to extend to additional facilities, routes, or partners over time.",
      },
    ],
  },
  {
    icon: Landmark,
    name: "Financial Services",
    slug: "financial-services",
    challenge: "Streamline compliance-heavy processes without sacrificing accuracy.",
    outcome: "Faster turnaround with stronger controls.",
    overview:
      "Financial services organizations operate under significant regulatory and compliance obligations while managing document-heavy, approval-driven processes. Balancing speed and accuracy is a constant tension, especially as customer expectations for fast service increase.",
    operationalEnvironment:
      "Operations and compliance teams manage document review, approvals, and reporting across systems that often require manual cross-referencing. Customer-facing teams need accurate answers quickly, while compliance teams need auditable, consistent processes.",
    challenges: [
      {
        title: "Manual, document-heavy review processes",
        description: "Compliance-heavy processes often rely on manual document review that creates bottlenecks ahead of approvals.",
      },
      {
        title: "Regulatory and compliance complexity",
        description: "Requirements demand consistent, auditable processes that are difficult to maintain manually at scale.",
      },
      {
        title: "Fragmented customer and account data",
        description: "Customer information often lives across multiple systems, slowing service and decision-making.",
      },
      {
        title: "Slow approval and decision cycles",
        description: "Multi-step approval processes create delays that affect both customers and internal teams.",
      },
    ],
    aiOpportunities: [
      "Document review and intelligence support",
      "Compliance-aware workflow automation",
      "Customer and account knowledge assistants",
      "Operational reporting and audit trails",
    ],
    businessOutcomes: [
      "Faster turnaround with stronger controls",
      "Improved compliance consistency",
      "Reduced manual review effort",
      "Faster customer response times",
    ],
    systems: [
      "Core banking or policy administration systems",
      "Document management systems",
      "CRM platforms",
      "Compliance and risk management systems",
    ],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "intelligent-business-workflows", "ai-platform-integration"],
    faqs: [
      {
        question: "How does this handle regulatory compliance requirements?",
        answer:
          "Workflows are designed around your existing compliance requirements, with auditability and human review built in rather than treated as an afterthought.",
      },
      {
        question: "Can this integrate with our core banking or policy systems?",
        answer: "Yes — integration with existing core systems is scoped as part of the engagement.",
      },
      {
        question: "Does this replace human review in approvals?",
        answer: "No — it's designed to accelerate document review and flag what needs attention, with final decisions remaining with your team.",
      },
      {
        question: "How is data security handled?",
        answer: "Access controls and security review are standard parts of any integration involving sensitive financial or customer data.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
