import {
  Activity,
  Building2,
  Factory,
  Fuel,
  Gavel,
  GraduationCap,
  HardHat,
  Hotel,
  Landmark,
  LayoutGrid,
  FlaskConical,
  Plane,
  Route,
  Scale,
  Sprout,
  Umbrella,
  Zap,
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
  {
    icon: Scale,
    name: "Government",
    slug: "government",
    challenge: "Deliver consistent public services while managing complex regulatory and procedural requirements.",
    outcome: "Faster case resolution and more consistent citizen service.",
    overview:
      "Government agencies balance public accountability with operational complexity — multiple departments, layered approval processes, and strict procedural requirements all shape how work gets done. Meeting rising public expectations for speed and transparency requires those processes to work better together, not just more technology.",
    operationalEnvironment:
      "Caseworkers and administrative staff manage requests through multi-step approval chains that often span several departments and systems. Records and case history frequently live in a mix of legacy systems and paper-based processes, making a complete picture of a case or request hard to assemble quickly.",
    challenges: [
      {
        title: "Fragmented case and records systems",
        description: "Case information is often split across legacy systems and departments, making a complete record hard to assemble.",
      },
      {
        title: "Multi-step approval and procedural requirements",
        description: "Requests move through layered approval chains that can be slow to trace and coordinate.",
      },
      {
        title: "Inconsistent service delivery",
        description: "The same type of request can be handled differently depending on the office or caseworker.",
      },
      {
        title: "Public transparency and accountability pressure",
        description: "Agencies must document and justify decisions in ways that are auditable and defensible.",
      },
    ],
    aiOpportunities: [
      "Knowledge assistants for policy and procedure",
      "Case status and workflow visibility",
      "Document intake and processing support",
      "Citizen-facing self-service support",
    ],
    businessOutcomes: [
      "Faster case resolution",
      "More consistent service delivery",
      "Reduced administrative backlog",
      "Improved auditability of decisions",
    ],
    systems: [
      "Case management systems",
      "Records management systems",
      "Document management systems",
      "Citizen service portals",
    ],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "intelligent-business-workflows", "ai-strategy-discovery"],
    faqs: [
      {
        question: "How does this handle public records and transparency requirements?",
        answer:
          "Workflows are designed around your existing records and disclosure requirements, with auditability built in rather than treated as an afterthought.",
      },
      {
        question: "Can this work across multiple departments or agencies?",
        answer: "Yes — we scope integration to the specific systems and departments involved, and can expand from there.",
      },
      {
        question: "Does this replace caseworker decision-making?",
        answer:
          "No — it's designed to support caseworkers with faster access to information and process visibility, with decisions remaining with your staff.",
      },
      {
        question: "How do you handle sensitive citizen data?",
        answer: "Access controls and governance are designed around your existing data handling and privacy requirements from the start.",
      },
    ],
  },
  {
    icon: Sprout,
    name: "Agriculture",
    slug: "agriculture",
    challenge: "Improve visibility across field operations, equipment, and supply chains that span a growing season.",
    outcome: "More predictable yields and fewer operational surprises.",
    overview:
      "Agricultural operations run on tight seasonal windows where timing, weather, and logistics all have to align. Farms and agribusinesses coordinate field operations, equipment, labor, and supply chains across a season, often with limited visibility into what's happening until a report arrives after the fact.",
    operationalEnvironment:
      "Field teams, equipment operators, and logistics coordinators work across a mix of on-the-ground observation, equipment data, and manual reporting. Decisions about planting, harvesting, and resource allocation often depend on information that's collected in the field but takes time to reach the people planning around it.",
    challenges: [
      {
        title: "Limited real-time visibility into field operations",
        description: "Decisions often rely on information that's delayed by the time it's reported and reviewed.",
      },
      {
        title: "Disconnected equipment and operational data",
        description: "Equipment, weather, and yield data frequently live in separate systems that don't inform each other.",
      },
      {
        title: "Seasonal workforce coordination",
        description: "Coordinating seasonal labor and equipment scheduling is largely manual and time-sensitive.",
      },
      {
        title: "Supply chain and logistics unpredictability",
        description: "Weather and yield variability make planning transportation and storage difficult in advance.",
      },
    ],
    aiOpportunities: [
      "Operational dashboards for field and equipment data",
      "Yield and resource forecasting support",
      "Logistics and supply chain coordination",
      "Knowledge assistants for agronomic and operational procedures",
    ],
    businessOutcomes: [
      "More predictable yields",
      "Reduced equipment downtime",
      "Better resource allocation across a season",
      "Improved supply chain coordination",
    ],
    systems: [
      "Farm management systems",
      "Equipment telematics platforms",
      "Inventory and storage systems",
      "Supply chain and logistics platforms",
    ],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration", "continuous-optimization"],
    faqs: [
      {
        question: "Do we need new sensors or equipment first?",
        answer: "Not necessarily — we start with the data your existing equipment and systems already generate before recommending new instrumentation.",
      },
      {
        question: "Can this account for weather and seasonal variability?",
        answer: "Yes — forecasting and planning support are designed around the seasonal, variable nature of agricultural operations.",
      },
      {
        question: "Does this work for operations across multiple sites or fields?",
        answer: "Yes — the architecture is designed to extend across multiple locations as it's proven on one.",
      },
      {
        question: "How is success measured?",
        answer: "Through operational metrics relevant to your operation — yield predictability, equipment uptime, and resource efficiency.",
      },
    ],
  },
  {
    icon: Plane,
    name: "Aviation",
    slug: "aviation",
    challenge: "Coordinate maintenance, scheduling, and compliance documentation without disrupting safety-critical operations.",
    outcome: "Faster turnaround with stronger compliance records.",
    overview:
      "Aviation operations run under strict safety and regulatory requirements while coordinating maintenance, crew, and scheduling across tight operational windows. Every process has to hold up to rigorous documentation standards, which makes manual coordination both essential and difficult to scale.",
    operationalEnvironment:
      "Maintenance, scheduling, and operations teams coordinate across systems that track aircraft status, crew availability, and compliance documentation. Safety and regulatory requirements mean every step needs to be recorded and auditable, often adding administrative work on top of already time-sensitive operations.",
    challenges: [
      {
        title: "Manual compliance and maintenance documentation",
        description: "Safety-critical documentation is often recorded manually, creating administrative load and room for error.",
      },
      {
        title: "Fragmented scheduling and crew coordination",
        description: "Aircraft, crew, and maintenance schedules often live in separate systems that are hard to coordinate.",
      },
      {
        title: "Delayed visibility into maintenance status",
        description: "Maintenance status isn't always visible to scheduling and operations teams in real time.",
      },
      {
        title: "High cost of operational disruption",
        description: "Any delay in coordination can cascade into significant schedule and cost impact.",
      },
    ],
    aiOpportunities: [
      "Maintenance and compliance documentation support",
      "Scheduling and crew coordination visibility",
      "Knowledge assistants for regulatory and operational procedures",
      "Operational reporting and audit trails",
    ],
    businessOutcomes: [
      "Faster turnaround times",
      "Stronger compliance and audit readiness",
      "Reduced administrative burden",
      "Improved scheduling coordination",
    ],
    systems: [
      "Maintenance tracking systems",
      "Crew scheduling platforms",
      "Compliance and safety management systems",
      "Flight operations systems",
    ],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "intelligent-business-workflows", "ai-platform-integration"],
    faqs: [
      {
        question: "How does this handle safety-critical compliance requirements?",
        answer:
          "Workflows are designed around your existing regulatory and safety requirements, with auditability and human review built in from the start.",
      },
      {
        question: "Can this integrate with existing maintenance and scheduling systems?",
        answer: "Yes — integration with existing operational systems is scoped as part of the engagement.",
      },
      {
        question: "Does this replace maintenance or safety sign-off?",
        answer: "No — it's designed to support documentation and coordination, with safety-critical decisions remaining with qualified personnel.",
      },
      {
        question: "How long does implementation typically take?",
        answer: "It depends on scope, but most engagements start with a single well-defined workflow to prove value before expanding further.",
      },
    ],
  },
  {
    icon: Umbrella,
    name: "Insurance",
    slug: "insurance",
    challenge: "Speed up claims and underwriting without sacrificing accuracy or compliance.",
    outcome: "Faster claims resolution with stronger audit trails.",
    overview:
      "Insurance carriers and brokers manage high volumes of claims, underwriting, and policy documentation under strict regulatory scrutiny. Balancing fast, competitive service with rigorous accuracy and compliance is a constant operational tension.",
    operationalEnvironment:
      "Claims adjusters, underwriters, and compliance teams review large volumes of documents and case files across policy administration, claims, and document management systems that don't always share data cleanly. Decisions often require cross-referencing policy terms, historical claims, and regulatory guidance under time pressure.",
    challenges: [
      {
        title: "Manual, document-heavy claims review",
        description: "Claims processing often relies on manual document review, creating bottlenecks and inconsistent turnaround times.",
      },
      {
        title: "Underwriting decisions across fragmented data",
        description: "Underwriters piece together risk profiles from systems that don't always share a common view of the policyholder.",
      },
      {
        title: "Regulatory and compliance complexity",
        description: "Requirements demand consistent, auditable decisions that are difficult to maintain manually at scale.",
      },
      {
        title: "Fraud detection under volume pressure",
        description: "Reviewing every claim for anomalies manually doesn't scale with claim volume.",
      },
    ],
    aiOpportunities: [
      "Claims document review and intelligence",
      "Underwriting decision support",
      "Fraud pattern detection support",
      "Policyholder knowledge assistants",
      "Compliance-aware workflow automation",
    ],
    businessOutcomes: [
      "Faster claims resolution",
      "More consistent underwriting decisions",
      "Reduced manual review effort",
      "Stronger audit trails",
    ],
    systems: [
      "Policy administration systems",
      "Claims management systems",
      "Document management systems",
      "CRM platforms",
    ],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "intelligent-business-workflows", "ai-platform-integration"],
    faqs: [
      {
        question: "Does this replace adjuster or underwriter judgment?",
        answer: "No — it's designed to accelerate document review and flag what needs attention, with final decisions remaining with your team.",
      },
      {
        question: "How does this handle regulatory requirements?",
        answer: "Workflows are designed around your existing compliance requirements, with auditability and human review built in from the start.",
      },
      {
        question: "Can this integrate with our policy administration system?",
        answer: "Yes — integration with existing core systems is scoped as part of the engagement.",
      },
      {
        question: "How is claims fraud handled?",
        answer: "The system flags anomalies for review rather than making autonomous fraud determinations, keeping a person in the loop.",
      },
    ],
  },
  {
    icon: Gavel,
    name: "Legal Services",
    slug: "legal-services",
    challenge: "Reduce time spent searching precedent and documents so legal teams can focus on judgment-intensive work.",
    outcome: "Faster research and review with a documented trail.",
    overview:
      "Legal teams — in-house counsel, law firms, and compliance departments — spend significant time reviewing contracts, researching precedent, and tracking obligations across matters. That work is essential, but the manual search and review process doesn't scale with caseload.",
    operationalEnvironment:
      "Attorneys, paralegals, and compliance staff work across contract repositories, case management systems, and research databases that often require manual cross-referencing. Finding a relevant clause, precedent, or obligation frequently means searching multiple systems or relying on institutional memory.",
    challenges: [
      {
        title: "Manual contract and document review",
        description: "Reviewing contracts and legal documents for relevant clauses and risk is time-consuming and hard to scale.",
      },
      {
        title: "Fragmented matter and document history",
        description: "Case files, correspondence, and precedent often live in separate systems, making a complete picture hard to assemble.",
      },
      {
        title: "Inconsistent obligation tracking",
        description: "Deadlines and contractual obligations tracked manually create risk of missed dates or terms.",
      },
      {
        title: "Rising caseload without proportional headcount",
        description: "Legal teams are expected to handle more matters without a corresponding increase in staff.",
      },
    ],
    aiOpportunities: [
      "Contract review and clause intelligence",
      "Legal research assistants",
      "Obligation and deadline tracking",
      "Matter knowledge management",
      "Document intake automation",
    ],
    businessOutcomes: [
      "Faster research and review",
      "Reduced risk of missed obligations",
      "More consistent contract review",
      "A documented, auditable trail",
    ],
    systems: [
      "Contract lifecycle management systems",
      "Case/matter management systems",
      "Document management systems",
      "Legal research platforms",
    ],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "ai-assistants-copilots", "intelligent-business-workflows"],
    faqs: [
      {
        question: "Does this provide legal advice?",
        answer: "No — it surfaces relevant information and flags items for review; legal judgment and advice remain with qualified attorneys.",
      },
      {
        question: "How is confidentiality and privilege protected?",
        answer: "Access controls and governance are designed around your existing confidentiality and privilege requirements from the start.",
      },
      {
        question: "Can this integrate with our contract or matter management system?",
        answer: "Yes — integration is scoped around your existing systems as part of the engagement.",
      },
      {
        question: "How accurate is contract clause extraction?",
        answer: "Extraction is grounded in your source documents with references, and flagged for attorney review rather than treated as final.",
      },
    ],
  },
  {
    icon: Building2,
    name: "Real Estate & Property Management",
    slug: "real-estate",
    challenge: "Bring leasing, maintenance, and portfolio data into one place.",
    outcome: "Faster response times and clearer portfolio visibility.",
    overview:
      "Real estate and property management organizations coordinate leasing, maintenance, and tenant communication across a portfolio of properties, often through a mix of spreadsheets, email, and disconnected systems. Getting a clear, current view of the portfolio is harder than it should be.",
    operationalEnvironment:
      "Leasing agents, property managers, and maintenance teams handle inquiries, work orders, and reporting across property management software, email, and manual logs that don't always stay in sync. Portfolio-level decisions often rely on reports that are already out of date by the time they're reviewed.",
    challenges: [
      {
        title: "Fragmented leasing and maintenance data",
        description: "Leasing, maintenance, and tenant data often live in separate systems or spreadsheets, complicating a full portfolio view.",
      },
      {
        title: "Slow tenant and prospect response times",
        description: "Inquiries and maintenance requests can sit unanswered while staff work through manual processes.",
      },
      {
        title: "Inconsistent maintenance tracking",
        description: "Work orders tracked manually make it hard to see status or prioritize across properties.",
      },
      {
        title: "Limited real-time portfolio visibility",
        description: "Owners and managers often rely on periodic reports rather than a current view of occupancy and operations.",
      },
    ],
    aiOpportunities: [
      "Tenant and prospect communication assistants",
      "Maintenance request triage and tracking",
      "Portfolio operations dashboards",
      "Lease document intelligence",
    ],
    businessOutcomes: [
      "Faster response times",
      "Clearer portfolio visibility",
      "Reduced manual coordination",
      "More consistent tenant experience",
    ],
    systems: [
      "Property management systems",
      "Lease management platforms",
      "Maintenance/work order systems",
      "CRM platforms",
    ],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-assistants-copilots", "ai-platform-integration"],
    faqs: [
      {
        question: "Can this work across a portfolio with multiple properties?",
        answer: "Yes — the architecture is designed to extend across properties once proven on one.",
      },
      {
        question: "Does this replace our property management software?",
        answer: "Usually not — we typically integrate with the systems you already use rather than replacing them outright.",
      },
      {
        question: "How are maintenance requests routed?",
        answer: "Requests are triaged and routed with relevant context attached, with a person handling exceptions and final decisions.",
      },
      {
        question: "How quickly can we see results?",
        answer: "We usually start with one property or workflow to demonstrate value before expanding scope.",
      },
    ],
  },
  {
    icon: Zap,
    name: "Energy & Utilities",
    slug: "energy-utilities",
    challenge: "Improve visibility across grid, asset, and field operations while managing compliance reporting.",
    outcome: "Fewer disruptions and more predictable asset performance.",
    overview:
      "Energy and utility providers manage critical infrastructure — generation, distribution, and field operations — under close regulatory oversight. Asset and operational data often lives across legacy systems, making it hard to get a current, unified view of grid or asset health.",
    operationalEnvironment:
      "Field crews, operations centers, and compliance teams work with SCADA systems, asset management platforms, and manual reporting that don't always connect. Issues in the field may not reach planning or leadership until a scheduled report surfaces them.",
    challenges: [
      {
        title: "Disconnected grid and asset data",
        description: "SCADA, asset management, and field reporting systems often don't share data, complicating a full operational view.",
      },
      {
        title: "Delayed visibility into field conditions",
        description: "Field issues can take time to reach operations and planning teams, delaying response.",
      },
      {
        title: "Manual compliance and reporting overhead",
        description: "Regulatory reporting often relies on manual data collection that's time-consuming and error-prone.",
      },
      {
        title: "Reactive rather than predictive maintenance",
        description: "Asset maintenance is frequently scheduled on fixed intervals rather than actual condition data.",
      },
    ],
    aiOpportunities: [
      "Real-time operational dashboards",
      "Predictive maintenance support",
      "Compliance reporting automation",
      "Knowledge assistants for field and operations teams",
    ],
    businessOutcomes: [
      "Fewer operational disruptions",
      "More predictable asset performance",
      "Reduced manual reporting effort",
      "Faster field issue response",
    ],
    systems: [
      "SCADA systems",
      "Asset management platforms",
      "Field service management systems",
      "Compliance and reporting systems",
    ],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration", "continuous-optimization"],
    faqs: [
      {
        question: "Does this require new sensors or SCADA upgrades?",
        answer: "Not necessarily — we start with the data your existing systems already generate before recommending new instrumentation.",
      },
      {
        question: "Can this integrate with legacy grid or asset systems?",
        answer: "Yes — integration work is scoped around your actual system landscape, including systems that aren't cloud-native.",
      },
      {
        question: "How does this handle regulatory reporting requirements?",
        answer: "Reporting workflows are designed around your existing compliance requirements, with auditability built in.",
      },
      {
        question: "Can this scale across multiple facilities or service territories?",
        answer: "Yes — we typically start with one facility or territory and extend the same architecture once it's proven.",
      },
    ],
  },
  {
    icon: Hotel,
    name: "Hospitality & Travel",
    slug: "hospitality-travel",
    challenge: "Deliver consistent guest service across properties and channels.",
    outcome: "Faster guest response with more consistent service.",
    overview:
      "Hospitality and travel organizations manage reservations, guest service, and operations across properties and channels, often through a mix of booking platforms, property systems, and manual coordination. Guest expectations for fast, consistent service keep rising, while staff juggle multiple systems to meet them.",
    operationalEnvironment:
      "Front-desk, reservations, and operations staff work across property management systems, booking channels, and guest communication tools that don't always share a common view. Guest requests and operational issues often require manual coordination across departments or properties.",
    challenges: [
      {
        title: "Fragmented guest and reservation data",
        description: "Guest history and reservations often live across separate booking channels and property systems.",
      },
      {
        title: "Inconsistent guest service across channels",
        description: "Response quality and speed vary depending on the channel and staff member handling a request.",
      },
      {
        title: "Manual operational coordination",
        description: "Housekeeping, maintenance, and front-desk coordination frequently relies on manual handoffs.",
      },
      {
        title: "Limited visibility across multiple properties",
        description: "Multi-property operators often lack a current, unified view of occupancy and operations.",
      },
    ],
    aiOpportunities: [
      "Guest service and concierge assistants",
      "Reservation and booking support",
      "Operational coordination across departments",
      "Multi-property operations dashboards",
    ],
    businessOutcomes: [
      "Faster guest response times",
      "More consistent service across channels and properties",
      "Reduced manual coordination",
      "Better operational visibility",
    ],
    systems: [
      "Property management systems",
      "Booking and reservation platforms",
      "Guest messaging systems",
      "CRM platforms",
    ],
    relatedServiceSlugs: ["ai-assistants-copilots", "intelligent-business-workflows", "ai-platform-integration"],
    faqs: [
      {
        question: "Can this work across multiple properties or brands?",
        answer: "Yes — the architecture is designed to extend across properties once proven on one.",
      },
      {
        question: "Does this replace front-desk or guest service staff?",
        answer: "No — it's designed to support staff with faster access to information and coordination, with guest relationships remaining with your team.",
      },
      {
        question: "Can this integrate with our booking channels?",
        answer: "Yes — integration is scoped around the specific channels and systems you use.",
      },
      {
        question: "How quickly can we see results?",
        answer: "We usually start with one property or workflow to demonstrate value before expanding scope.",
      },
    ],
  },
  {
    icon: FlaskConical,
    name: "Life Sciences & Pharmaceuticals",
    slug: "life-sciences-pharmaceuticals",
    challenge: "Manage research, trial, and regulatory documentation without slowing down critical timelines.",
    outcome: "Faster access to trial and regulatory information with stronger compliance.",
    overview:
      "Life sciences and pharmaceutical organizations manage research, clinical trial, and regulatory documentation under strict compliance requirements and tight timelines. Institutional knowledge is often scattered across research teams, systems, and years of trial history.",
    operationalEnvironment:
      "Research, clinical operations, and regulatory affairs teams work across trial management systems, document repositories, and quality systems that often don't share data cleanly. Finding accurate answers about trial protocols, regulatory submissions, or historical research frequently depends on who happens to be available.",
    challenges: [
      {
        title: "Fragmented research and trial data",
        description: "Research findings, trial data, and regulatory documentation often live in separate systems.",
      },
      {
        title: "Manual regulatory documentation review",
        description: "Preparing and reviewing regulatory submissions relies on time-consuming manual document review.",
      },
      {
        title: "Institutional knowledge concentrated in specialists",
        description: "Deep research and regulatory knowledge often depends on a small number of experienced staff being available.",
      },
      {
        title: "Compliance and audit-readiness pressure",
        description: "Requirements demand consistent, auditable documentation that's difficult to maintain manually at scale.",
      },
    ],
    aiOpportunities: [
      "Research and trial knowledge assistants",
      "Regulatory document intelligence",
      "Compliance and audit-trail support",
      "Cross-team research search and retrieval",
    ],
    businessOutcomes: [
      "Faster access to trial and regulatory information",
      "Reduced manual documentation effort",
      "Stronger compliance and audit readiness",
      "Less dependency on individual specialists",
    ],
    systems: [
      "Clinical trial management systems",
      "Regulatory information management systems",
      "Document management systems",
      "Quality management systems",
    ],
    relatedServiceSlugs: ["enterprise-knowledge-systems", "ai-assistants-copilots", "intelligent-business-workflows"],
    faqs: [
      {
        question: "How does this handle regulated data and documentation?",
        answer: "Access controls and governance are designed around your existing regulatory requirements from the start, with auditability built in.",
      },
      {
        question: "Does this replace scientific or regulatory judgment?",
        answer: "No — it's designed to surface relevant information and accelerate documentation, with scientific and regulatory decisions remaining with your team.",
      },
      {
        question: "Can this integrate with our trial management or QMS systems?",
        answer: "Yes — integration is scoped around your existing systems as part of the engagement.",
      },
      {
        question: "How do you keep answers grounded in verified research?",
        answer: "Answers are grounded in your source documents with references, so your team can verify rather than just trust.",
      },
    ],
  },
  {
    icon: HardHat,
    name: "Construction & Engineering",
    slug: "construction-engineering",
    challenge: "Coordinate project, safety, and subcontractor information across sites.",
    outcome: "Fewer delays and clearer visibility across projects.",
    overview:
      "Construction and engineering firms coordinate project schedules, safety compliance, and subcontractor work across multiple sites, often through a mix of spreadsheets, paper forms, and disconnected project management tools. Getting a current, accurate view of a project is harder than it should be.",
    operationalEnvironment:
      "Project managers, site supervisors, and safety officers coordinate schedules, inspections, and subcontractor work across systems and paper-based processes that don't always stay in sync. Issues on site often surface late, after they've already affected timelines or budgets.",
    challenges: [
      {
        title: "Fragmented project and site data",
        description: "Schedules, budgets, and site reports often live across separate tools and paper records.",
      },
      {
        title: "Manual safety and compliance documentation",
        description: "Safety inspections and compliance records are frequently tracked manually, creating administrative load and audit risk.",
      },
      {
        title: "Delayed visibility into site issues",
        description: "Problems on site can take time to reach project managers and leadership, delaying response.",
      },
      {
        title: "Subcontractor coordination overhead",
        description: "Coordinating schedules and requirements across multiple subcontractors is largely manual.",
      },
    ],
    aiOpportunities: [
      "Project and site knowledge assistants",
      "Safety and compliance documentation support",
      "Site issue tracking and visibility",
      "Subcontractor coordination workflows",
    ],
    businessOutcomes: [
      "Fewer project delays",
      "Clearer visibility across projects and sites",
      "Reduced administrative burden",
      "Stronger safety and compliance documentation",
    ],
    systems: [
      "Project management platforms",
      "Safety and compliance management systems",
      "Document management systems",
      "Scheduling systems",
    ],
    relatedServiceSlugs: ["intelligent-business-workflows", "enterprise-knowledge-systems", "ai-platform-integration"],
    faqs: [
      {
        question: "Can this work across multiple active job sites?",
        answer: "Yes — the architecture is designed to extend across sites once proven on one.",
      },
      {
        question: "Does this replace site safety inspections?",
        answer: "No — it's designed to support documentation and visibility, with safety decisions remaining with qualified personnel.",
      },
      {
        question: "Can this integrate with our existing project management tools?",
        answer: "Yes — integration is scoped around your existing systems as part of the engagement.",
      },
      {
        question: "How is subcontractor data handled?",
        answer: "Access and governance controls are designed around your existing subcontractor agreements and data-sharing requirements.",
      },
    ],
  },
  {
    icon: Fuel,
    name: "Oil & Gas",
    slug: "oil-gas",
    challenge: "Improve visibility across field operations, assets, and compliance in remote, high-risk environments.",
    outcome: "Fewer operational surprises and stronger safety and compliance records.",
    overview:
      "Oil and gas operators run complex field, refining, and logistics operations, often across remote sites, under strict safety and regulatory oversight. Operational and asset data frequently lives across legacy systems and manual field reporting, making a current, unified view hard to assemble.",
    operationalEnvironment:
      "Field crews, operations centers, and HSE (health, safety, environment) teams coordinate across SCADA systems, asset management platforms, and manual field logs that don't always share data. Safety and regulatory requirements mean every step needs to be recorded and auditable, often in remote or high-risk conditions.",
    challenges: [
      {
        title: "Disconnected field and asset data",
        description: "Field reporting, SCADA, and asset management systems often don't share data, complicating a full operational view.",
      },
      {
        title: "Manual safety and compliance documentation",
        description: "Safety-critical documentation is often recorded manually in the field, creating administrative load and room for error.",
      },
      {
        title: "Delayed visibility into operational issues",
        description: "Problems at remote sites can take time to reach operations centers and leadership.",
      },
      {
        title: "Reactive rather than predictive maintenance",
        description: "Asset maintenance is frequently scheduled on fixed intervals rather than actual condition data.",
      },
    ],
    aiOpportunities: [
      "Real-time field and asset dashboards",
      "Predictive maintenance support",
      "Safety and compliance documentation automation",
      "Knowledge assistants for field and HSE procedures",
    ],
    businessOutcomes: [
      "Fewer operational disruptions",
      "Stronger safety and compliance records",
      "Reduced manual documentation effort",
      "More predictable asset performance",
    ],
    systems: [
      "SCADA systems",
      "Asset management platforms",
      "HSE and compliance management systems",
      "Field reporting systems",
    ],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration", "continuous-optimization"],
    faqs: [
      {
        question: "Does this require new field sensors or hardware?",
        answer: "Not necessarily — we start with the data your existing systems already generate before recommending new instrumentation.",
      },
      {
        question: "How does this handle safety-critical compliance requirements?",
        answer: "Workflows are designed around your existing regulatory and safety requirements, with auditability and human review built in from the start.",
      },
      {
        question: "Can this integrate with legacy SCADA or asset systems?",
        answer: "Yes — integration work is scoped around your actual system landscape, including systems that aren't cloud-native.",
      },
      {
        question: "Can this scale across multiple sites or facilities?",
        answer: "Yes — we typically start with a single site and extend the same architecture once it's proven.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
