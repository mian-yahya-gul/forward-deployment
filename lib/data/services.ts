import {
  Compass,
  Library,
  Plug,
  ShieldCheck,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  icon: LucideIcon;
  title: string;
  slug: string;
  purpose: string;
  outcomes: string[];
  businessChallenge: string;
  whyTraditionalFails: string;
  howWeHelp: string;
  deliverables: string[];
  relatedIndustrySlugs: string[];
  faqs: ServiceFaq[];
}

export const servicesIntro = {
  eyebrow: "Services",
  headline: "Capabilities, not isolated tools.",
  description:
    "Every organization is different. Our services are designed as capabilities that can be combined to solve operational challenges across departments, teams, and industries. We do not sell isolated AI tools — we build integrated business capabilities.",
  cta: { label: "Explore Services", href: "/services" },
};

export const servicesLandingHero = {
  eyebrow: "Services",
  title: "Business capabilities, built to work together.",
  description:
    "Each service solves a distinct operational problem, and each is designed to complement the others. Start with one capability and expand as it proves out — nothing here requires a full platform commitment on day one.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta: { label: "View Industry Solutions", href: "/industries" },
};

/**
 * The engagement shape, not a rate card — we scope every fee on a
 * discovery call rather than publishing numbers that don't hold up across
 * wildly different workflows and industries. Kept here rather than in
 * methodology.ts since it's a pricing message, not a phase description.
 */
export const pricingModel = {
  eyebrow: "How We Price",
  headline: "A fixed fee to build, a fraction of a hire to run.",
  description:
    "Every engagement follows the same shape. A fixed fee covers Discover through Deploy for one workflow, so you know the cost before we start. Once your Digital FTE is live, Optimize runs on an ongoing monthly cost — priced like a fraction of what a full-time hire would cost, not an open-ended retainer.",
  items: [
    {
      label: "Build",
      title: "Discover → Prioritize → Design → Deploy",
      description:
        "A fixed project fee, scoped to one workflow after a discovery call. You get a number before committing to the build — not an hourly estimate that grows as we go.",
    },
    {
      label: "Run",
      title: "Optimize",
      description:
        "An ongoing monthly cost once your Digital FTE is live — priced as a fraction of what the equivalent full-time role would cost, not a fixed-scope retainer.",
    },
  ],
  disclaimer: "Every figure is scoped to your workflow on a call — we don't quote off a rate card.",
  cta: { label: "Book a Discovery Call for a Scoped Quote", href: "/contact" },
};

export const services: Service[] = [
  {
    icon: Compass,
    title: "AI Strategy & Opportunity Discovery",
    slug: "ai-strategy-discovery",
    purpose: "Help organizations identify where AI creates measurable value.",
    outcomes: ["AI roadmap", "Opportunity assessment", "Executive workshops", "Business case development"],
    businessChallenge:
      "Most organizations know AI could help somewhere in the business, but not exactly where. Initiatives get pursued based on internal enthusiasm or vendor pitches rather than a clear view of where AI would create the most business value, so effort gets spent on the wrong problems.",
    whyTraditionalFails:
      "Generic AI workshops and off-the-shelf maturity assessments produce broad recommendations that don't reflect how your organization actually operates. Without a discovery process grounded in your real workflows, the resulting roadmap ends up being a wish list rather than a plan anyone can act on.",
    howWeHelp:
      "We run structured discovery with the people who do the work — not just the leaders who sponsor it — to map current workflows, score opportunities by feasibility and business value, and produce a prioritized roadmap your team can act on immediately.",
    deliverables: [
      "Opportunity assessment",
      "Prioritized AI roadmap",
      "Executive workshop sessions",
      "Business case documentation",
      "Data readiness review",
    ],
    relatedIndustrySlugs: [
      "healthcare",
      "education",
      "retail-ecommerce",
      "manufacturing",
      "logistics-supply-chain",
      "financial-services",
      "government",
      "agriculture",
      "aviation",
      "insurance",
      "legal-services",
      "real-estate",
      "energy-utilities",
      "hospitality-travel",
      "life-sciences-pharmaceuticals",
      "construction-engineering",
      "oil-gas",
    ],
    faqs: [
      {
        question: "Do we need existing AI systems before starting?",
        answer:
          "No. Discovery is often the first step for organizations with no AI in production yet — it's designed to identify where to start, not to build on something that already exists.",
      },
      {
        question: "How long does a typical discovery engagement take?",
        answer:
          "It varies with organizational size and complexity, but most discovery engagements move from kickoff to a prioritized roadmap within a few weeks, not months.",
      },
      {
        question: "What if we already have an AI strategy?",
        answer:
          "We can validate and stress-test an existing strategy against real operational data rather than starting from a blank page.",
      },
      {
        question: "Who from our team needs to be involved?",
        answer:
          "A mix of operational leaders and the frontline staff who do the work being examined — the people closest to a process usually surface the clearest opportunities.",
      },
    ],
  },
  {
    icon: Workflow,
    title: "Intelligent Business Workflows",
    slug: "intelligent-business-workflows",
    purpose: "Improve operational efficiency through workflow automation and decision support.",
    outcomes: ["Reduced manual work", "Faster approvals", "Process automation", "Operational visibility"],
    businessChallenge:
      "Repetitive, rules-based work — approvals, data entry, status updates, handoffs between teams — still runs through spreadsheets, email, and manual steps. Skilled employees spend meaningful time on tasks that don't require their judgment, and processes slow down whenever someone is unavailable.",
    whyTraditionalFails:
      "Traditional automation tools handle rigid, rules-based steps well but struggle the moment a workflow requires judgment, unstructured information, or an exception case — which describes most real business processes. The result is automation that only covers the easy part and leaves the hard part manual.",
    howWeHelp:
      "We design workflow automation that combines rules-based automation with AI-powered decision support, so the system can handle structured steps automatically and flag the judgment calls for a person — rather than forcing an all-or-nothing choice.",
    deliverables: [
      "Workflow analysis and mapping",
      "Automation architecture",
      "Decision-support design",
      "Pilot workflow deployment",
      "Operational dashboards",
    ],
    relatedIndustrySlugs: [
      "manufacturing",
      "logistics-supply-chain",
      "retail-ecommerce",
      "financial-services",
      "government",
      "agriculture",
      "aviation",
      "insurance",
      "real-estate",
      "hospitality-travel",
      "construction-engineering",
      "energy-utilities",
      "oil-gas",
    ],
    faqs: [
      {
        question: "Will this replace our existing tools?",
        answer:
          "Usually not entirely — we typically integrate with the systems you already use rather than replacing them outright.",
      },
      {
        question: "What happens when the automation encounters something it can't handle?",
        answer:
          "Exceptions are routed to a person with the relevant context attached, rather than failing silently or blocking the whole process.",
      },
      {
        question: "Can this scale to multiple departments?",
        answer:
          "Yes — we typically start with one high-friction workflow, prove the approach, then extend the same architecture to adjacent processes.",
      },
      {
        question: "How is success measured?",
        answer:
          "Through operational metrics specific to the workflow — processing time, error rates, and manual touch points reduced.",
      },
    ],
  },
  {
    icon: Library,
    title: "Enterprise Knowledge Systems",
    slug: "enterprise-knowledge-systems",
    purpose:
      "Transform organizational knowledge into accessible, searchable, and actionable intelligence.",
    outcomes: ["Knowledge discovery", "Internal search", "Document intelligence", "Organizational memory"],
    businessChallenge:
      "Institutional knowledge is scattered across documents, wikis, inboxes, and the heads of a handful of experienced employees. Finding an authoritative answer often means asking around rather than searching a system, which slows everyone down and creates risk when someone leaves.",
    whyTraditionalFails:
      "Traditional search tools index documents but not meaning — they return files that contain a keyword rather than an answer to the question being asked. Employees learn to route around search entirely and just ask a colleague instead, which doesn't scale.",
    howWeHelp:
      "We build knowledge systems that connect your existing content — documents, wikis, support tickets, internal databases — into a searchable, conversational layer that surfaces accurate answers with sources, so institutional knowledge stops depending on any one person being available.",
    deliverables: [
      "Knowledge audit and content mapping",
      "Search and retrieval architecture",
      "Access and governance controls",
      "Pilot deployment with a defined team",
      "Usage and adoption reporting",
    ],
    relatedIndustrySlugs: [
      "healthcare",
      "education",
      "financial-services",
      "government",
      "aviation",
      "legal-services",
      "life-sciences-pharmaceuticals",
      "insurance",
      "construction-engineering",
    ],
    faqs: [
      {
        question: "How do you handle sensitive or confidential content?",
        answer:
          "Access controls and governance are designed in from the start — the system respects your existing permission structure rather than exposing everything to everyone.",
      },
      {
        question: "Does this require restructuring our documents first?",
        answer: "No — we work with your content as it exists today and build the retrieval layer around it.",
      },
      {
        question: "How do you keep answers accurate as content changes?",
        answer:
          "The system stays connected to your source content, so updates propagate rather than requiring manual re-indexing.",
      },
      {
        question: "Can it cite where an answer came from?",
        answer:
          "Yes — answers are grounded in your source documents with references, so people can verify rather than just trust.",
      },
    ],
  },
  {
    icon: Users,
    title: "AI Assistants & Operational Copilots",
    slug: "ai-assistants-copilots",
    purpose:
      "Equip employees with AI-powered assistants that improve productivity while maintaining human oversight.",
    outcomes: ["Employee productivity", "Faster decision support", "Operational guidance", "Standardized processes"],
    businessChallenge:
      "Employees juggle multiple systems, standard operating procedures, and judgment calls throughout their day, often without consistent guidance. Onboarding takes longer than it should, and quality varies depending on who is doing the work.",
    whyTraditionalFails:
      "Static training materials and SOP documents go stale quickly and don't meet employees at the moment they actually need guidance — mid-task, inside the tools they're already using.",
    howWeHelp:
      "We build AI assistants embedded into the tools your team already uses, giving employees contextual guidance, faster answers, and standardized next steps — with human oversight built in rather than full automation replacing judgment.",
    deliverables: [
      "Use-case scoping and prioritization",
      "Assistant design and prompt architecture",
      "Integration with existing tools",
      "Pilot rollout with a defined user group",
      "Adoption and feedback reporting",
    ],
    relatedIndustrySlugs: [
      "healthcare",
      "retail-ecommerce",
      "financial-services",
      "legal-services",
      "hospitality-travel",
      "real-estate",
      "life-sciences-pharmaceuticals",
    ],
    faqs: [
      {
        question: "Is this meant to replace employees?",
        answer:
          "No — it's designed to support employees with faster access to information and guidance, with a person remaining in control of decisions.",
      },
      {
        question: "Which tools can this integrate with?",
        answer:
          "Most commonly used enterprise tools — CRMs, internal portals, ticketing systems, and messaging platforms — depending on where the workflow actually happens.",
      },
      {
        question: "How do you prevent incorrect guidance?",
        answer:
          "Assistants are grounded in your verified internal content and scoped to specific use cases rather than open-ended, and human review remains part of the workflow.",
      },
      {
        question: "How long before employees start using it?",
        answer:
          "Adoption depends on the use case, but pilots are typically scoped narrowly enough that a defined team can start using the assistant during the initial rollout phase.",
      },
    ],
  },
  {
    icon: Plug,
    title: "AI Platform Integration",
    slug: "ai-platform-integration",
    purpose: "Integrate AI capabilities into existing enterprise systems.",
    outcomes: ["ERP integration", "CRM enhancement", "Internal applications", "API connectivity"],
    businessChallenge:
      "Most enterprise AI has to work alongside legacy systems, not instead of them. ERPs, CRMs, and internal applications weren't built with AI in mind, and connecting new capabilities to them safely is often the hardest part of a deployment.",
    whyTraditionalFails:
      "Point solutions and standalone AI tools create another system employees have to check separately, rather than fitting into how work already happens — so adoption stalls even when the underlying technology works.",
    howWeHelp:
      "We integrate AI capabilities directly into the systems your teams already rely on — ERP, CRM, internal applications — through well-defined APIs and connectors, so new capabilities show up inside existing workflows instead of alongside them.",
    deliverables: [
      "Systems and integration audit",
      "Integration architecture design",
      "API and connector development",
      "Security and access review",
      "Deployment and monitoring setup",
    ],
    relatedIndustrySlugs: [
      "manufacturing",
      "logistics-supply-chain",
      "financial-services",
      "agriculture",
      "aviation",
      "energy-utilities",
      "oil-gas",
      "insurance",
      "real-estate",
      "construction-engineering",
    ],
    faqs: [
      {
        question: "Do you work with legacy or on-premise systems?",
        answer:
          "Yes — integration work is scoped around your actual system landscape, including systems that aren't cloud-native.",
      },
      {
        question: "Who owns the integration long-term?",
        answer:
          "We document the architecture and can hand off to your internal team, or continue supporting it, depending on your preference.",
      },
      {
        question: "How do you handle security review?",
        answer:
          "Integration work includes a security and access review as a standard deliverable, aligned with your existing policies.",
      },
      {
        question: "What if our systems change after integration?",
        answer:
          "Integrations are built to be maintainable, and we can support updates as your underlying systems evolve.",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "AI Governance & Evaluation",
    slug: "ai-governance-evaluation",
    purpose: "Give every AI system a named owner, a documented escalation path, and a way to prove it's still working as intended.",
    outcomes: ["Evaluation scorecards", "Human escalation design", "Audit trails", "Production monitoring"],
    businessChallenge:
      "Once an AI system reaches production, most organizations have no structured way to know whether it's still making good decisions, who's accountable when it isn't, or what happens when it hits a case it shouldn't handle alone. Governance gets treated as a compliance checkbox added after launch, rather than a decision made when the system is designed.",
    whyTraditionalFails:
      "Bolting oversight onto a system that's already live usually means retrofitting audit logging and escalation paths onto an architecture that was never built to support them — and \"the AI decided\" becomes an answer nobody can actually stand behind when something goes wrong.",
    howWeHelp:
      "We design evaluation scorecards and escalation paths as part of the system itself, not an afterthought — a named owner on your team, a documented path for edge cases, and an audit trail that shows why a decision was made, so oversight is something you can point to rather than something you hope is happening.",
    deliverables: [
      "Evaluation scorecards",
      "Escalation and audit-trail design",
      "Governance framework documentation",
      "Production monitoring dashboards",
      "Named-owner accountability model",
    ],
    relatedIndustrySlugs: [
      "healthcare",
      "financial-services",
      "government",
      "insurance",
      "legal-services",
      "life-sciences-pharmaceuticals",
      "aviation",
      "energy-utilities",
      "manufacturing",
      "logistics-supply-chain",
    ],
    faqs: [
      {
        question: "Is this the same as a compliance sign-off?",
        answer:
          "No. Compliance confirms a system meets a specific regulatory requirement at a point in time. Governance is the ongoing structure — who owns a decision, how edge cases get escalated, how you can show why a system did what it did — that makes compliance sign-off possible in the first place, not a substitute for it.",
      },
      {
        question: "Does adding governance slow down deployment?",
        answer:
          "Designing it in from the start is faster than retrofitting it later. Most delays come from bolting escalation paths and audit logging onto a system that was already built without them, not from designing them alongside the system itself.",
      },
      {
        question: "What does human escalation actually look like day to day?",
        answer:
          "A defined threshold for when the system hands a decision to a person, a named owner who receives it, and a record of what was escalated and why — not a vague promise that a human is in the loop somewhere.",
      },
      {
        question: "Can this be added to a system that's already in production?",
        answer:
          "Yes, though it takes more work than designing it in from day one. We start by mapping the system's current decision points and gaps, then add scorecards, escalation paths, and audit trails around what's already running.",
      },
    ],
  },
  {
    icon: TrendingUp,
    title: "Continuous Optimization",
    slug: "continuous-optimization",
    purpose: "Ensure AI systems continue delivering measurable value after deployment.",
    outcomes: ["Monitoring", "Analytics", "User adoption", "Performance improvement"],
    businessChallenge:
      "AI systems that work well at launch can quietly lose value over time as usage patterns, data, and business needs shift — and without ongoing attention, that decline often goes unnoticed until adoption has already dropped.",
    whyTraditionalFails:
      "Many AI projects treat deployment as the finish line rather than the starting point, leaving no plan for monitoring, feedback, or improvement — so early wins fade and the system gets quietly abandoned.",
    howWeHelp:
      "We put monitoring, feedback loops, and a regular improvement cadence in place after deployment, so the system keeps adapting to how your organization actually uses it rather than degrading in place.",
    deliverables: [
      "Performance monitoring setup",
      "Usage and adoption analytics",
      "Quarterly optimization review",
      "Feedback collection process",
      "Improvement roadmap",
    ],
    relatedIndustrySlugs: [
      "healthcare",
      "education",
      "manufacturing",
      "retail-ecommerce",
      "agriculture",
      "energy-utilities",
      "oil-gas",
    ],
    faqs: [
      {
        question: "Is this a separate engagement or part of every deployment?",
        answer:
          "It can be either — some clients build it in from the start, others bring us in after an existing deployment has plateaued.",
      },
      {
        question: "What does \"optimization\" actually involve?",
        answer:
          "Reviewing usage data and feedback, identifying where the system underperforms or goes unused, and making targeted improvements rather than a full rebuild.",
      },
      {
        question: "How often do reviews happen?",
        answer:
          "Typically on a quarterly cadence, though it can be adjusted based on how quickly your operations or data are changing.",
      },
      {
        question: "Can this apply to systems DeosAI Labs didn't originally build?",
        answer: "Yes, provided we can get access to the system and its usage data to establish a baseline.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
