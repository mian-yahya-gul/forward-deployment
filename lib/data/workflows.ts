/**
 * FDE Workflow Intelligence Library — canonical source of truth for
 * deployable workflows (see lib/data/catalogue.md for the full spec).
 *
 * This file IS the internal library: `sourceConfidence` and `internalNotes`
 * exist for internal review and must never be read by public-facing code.
 * `getPublicWorkflows()` / `toPublicWorkflow()` are the only sanctioned way
 * public pages should touch this data — they strip internal-only fields.
 *
 * Seeded for one pilot industry (Airline & Ticketing) per catalogue.md §62,
 * grounded in that industry's actual Playbook chapter
 * (public/book/industries/airline-ticketing) rather than invented to hit a
 * workflow count. Extend industry-by-industry the same way — do not
 * fabricate workflows to fill out the other 18 industries.
 */
import { industries } from "@/lib/data/industries";

export type WorkflowCategory =
  | "Customer & Sales"
  | "Operations"
  | "Back Office"
  | "Finance & Payments"
  | "Documents & Compliance"
  | "Knowledge & Support"
  | "Scheduling & Coordination"
  | "Decision Support"
  | "Monitoring & Exceptions"
  | "Workforce & Internal Operations"
  | "Reporting & Intelligence";

export type DeploymentComplexity = "Low" | "Low–Medium" | "Medium" | "Medium–High" | "High";

/** Illustrative → Mapped → Validated → Measured. Internal-only: how much real-world evidence exists. */
export type EvidenceLevel = "Illustrative" | "Mapped" | "Validated" | "Measured";

/** Internal-only: where DeosAI Labs is in the deployment lifecycle for this workflow. */
export type DeploymentStatus =
  | "Opportunity"
  | "Assessment Ready"
  | "Deployment Ready"
  | "In Deployment"
  | "Deployed"
  | "Measured";

export type IntegrationPattern =
  | "API"
  | "Database"
  | "Webhook"
  | "Document / File"
  | "Email"
  | "Messaging"
  | "Browser-based workflow"
  | "RPA"
  | "Human-in-the-loop interface"
  | "Multiple / Hybrid";

export interface PlaybookReference {
  part: string;
  chapter: string;
  url: string;
}

export interface WorkflowRecord {
  id: string;
  industrySlug: string;
  category: WorkflowCategory;
  workflowName: string;
  shortDescription: string;
  painPoint: string;
  failurePoint: string;
  /** The mechanism — what AI concretely does inside the workflow. Prose, for the detail page. */
  aiRole: string;
  /** Concrete AI responsibilities as bullets, for the card and "What AI does" section. */
  aiHandles: string[];
  /** Where the human stays in control. Prose, for the detail page. */
  humanRole: string;
  /** Concrete human responsibilities as bullets, for the card and "What stays human" section. */
  humanHandles: string[];
  flowSteps: string[];
  systems: string[];
  data: string[];
  integrationPattern: IntegrationPattern[];
  potentialImpact: string[];
  measurementSignals: string[];
  deploymentComplexity: DeploymentComplexity;
  playbookReference: PlaybookReference;
  relatedWorkflowIds: string[];
  relatedServiceSlugs: string[];
  tags: string[];
  publicVisible: boolean;
  deploymentReady: boolean;

  // --- Internal-only. Never read these from a public page. ---
  evidenceLevel: EvidenceLevel;
  deploymentStatus: DeploymentStatus;
  sourceConfidence: "grounded" | "inferred";
  internalNotes?: string;
}

const airlineTicketingPlaybookRef: PlaybookReference = {
  part: "Part Two — Industries",
  chapter: "Airline & Ticketing",
  url: "/book/industries/airline-ticketing",
};

export const workflows: WorkflowRecord[] = [
  {
    id: "airline-ticketing-booking-fare-enquiry-resolution",
    industrySlug: "airline-ticketing",
    category: "Customer & Sales",
    workflowName: "Booking & Fare Enquiry Resolution",
    shortDescription:
      "Resolve routine booking changes, seat requests, and fare questions directly, so agents are free for what actually needs one.",
    painPoint:
      "A large share of contact center volume is routine booking changes, seat requests, and fare questions.",
    failurePoint:
      "Agents resolve these by working the same reservation system a passenger could largely self-serve if the interface for it were better — routine volume consumes capacity that should go to genuinely novel requests.",
    aiRole:
      "Resolves the large share of routine booking, seat, and fare-question volume directly against the reservation system, escalating only cases that need a human judgment call.",
    aiHandles: [
      "Handles routine booking changes and seat requests",
      "Answers fare questions against live reservation data",
      "Detects fare exceptions and ambiguous policy questions",
      "Escalates sensitive travel situations to an agent",
    ],
    humanRole:
      "Agents handle fare exceptions, sensitive travel situations, and genuinely ambiguous policy questions that the system escalates.",
    humanHandles: ["Fare exceptions", "Sensitive travel situations", "Ambiguous policy questions", "Final booking changes"],
    flowSteps: [
      "Passenger booking or fare enquiry",
      "AI resolves against reservation system",
      "Exception or sensitive-case check",
      "Agent handles escalated cases",
      "Booking confirmed",
    ],
    systems: ["Passenger Service Systems (PSS)", "Reservation systems", "Global Distribution Systems (GDS)", "Contact-center platforms"],
    data: ["Booking records", "Fare rules", "Passenger profiles", "Contact-center case history"],
    integrationPattern: ["API", "Human-in-the-loop interface"],
    potentialImpact: [
      "Free agent capacity for cases that need judgment",
      "Faster resolution of routine booking and fare questions",
      "More consistent answers across contact-center channels",
    ],
    measurementSignals: ["First-response time", "Percentage resolved without agent handoff", "Escalation rate", "Agent capacity freed"],
    deploymentComplexity: "Medium",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-group-corporate-booking-management", "airline-ticketing-loyalty-dispute-resolution"],
    relatedServiceSlugs: ["ai-assistants-copilots", "intelligent-business-workflows"],
    tags: ["booking", "reservations", "contact center", "fares"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Mapped",
    deploymentStatus: "Assessment Ready",
    sourceConfidence: "grounded",
  },
  {
    id: "airline-ticketing-irops-rebooking",
    industrySlug: "airline-ticketing",
    category: "Operations",
    workflowName: "Irregular Operations Rebooking",
    shortDescription:
      "Automatically rebook disrupted passengers by policy and notify them proactively during weather or mechanical disruptions.",
    painPoint:
      "When weather or a mechanical issue disrupts a schedule, the volume of passengers needing rebooking spikes exactly when staff capacity is most constrained.",
    failurePoint:
      "Manual rebooking prioritizes whoever calls first rather than who has the most time-sensitive itinerary.",
    aiRole:
      "Rebooks the affected passenger population automatically according to the airline's prioritization policy — connection risk, fare class, status tier — and proactively notifies passengers of their new itinerary instead of waiting for them to call in.",
    aiHandles: [
      "Rebooks affected passengers by prioritization policy",
      "Applies connection-risk, fare-class, and status-tier rules consistently",
      "Sends proactive rebooking notifications",
      "Queues disputed or sensitive cases for a person",
    ],
    humanRole:
      "A passenger who disputes their new itinerary, has a documented medical need, or is affected by a denied-boarding situation talks to a person.",
    humanHandles: ["Disputed itinerary changes", "Documented medical needs", "Denied-boarding situations", "Final policy exceptions"],
    flowSteps: [
      "Disruption event detected",
      "AI applies prioritization policy",
      "Passengers rebooked and notified",
      "Disputed or sensitive cases flagged",
      "Agent resolves flagged cases",
    ],
    systems: ["Passenger Service Systems (PSS)", "Departure Control Systems (DCS)", "Global Distribution Systems (GDS)", "CRM"],
    data: ["Passenger itineraries", "Flight schedules", "Fare class and status tier data", "Connection risk data"],
    integrationPattern: ["API", "Messaging", "Human-in-the-loop interface"],
    potentialImpact: [
      "Faster rebooking during disruptions",
      "More consistent prioritization than call-order rebooking",
      "Proactive passenger communication instead of inbound call volume",
    ],
    measurementSignals: ["Rebooking speed during disruption", "Passenger complaint rate during IROPS", "Proactive-notification reach"],
    deploymentComplexity: "Medium–High",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-overbooking-volunteer-management", "airline-ticketing-regulatory-compensation-calculation"],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration"],
    tags: ["IROPS", "disruption", "rebooking", "operations"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Mapped",
    deploymentStatus: "Assessment Ready",
    sourceConfidence: "grounded",
  },
  {
    id: "airline-ticketing-fare-rule-audit",
    industrySlug: "airline-ticketing",
    category: "Decision Support",
    workflowName: "Fare Rule Audit",
    shortDescription:
      "Continuously audit fare rules across markets and partner agreements for inconsistencies before they reach revenue management.",
    painPoint:
      "Building and auditing fare rules across markets, seasons, and partner airlines is a detailed, rules-heavy task that revenue analysts do largely by hand.",
    failurePoint:
      "Pricing systems don't flag inconsistencies on their own, so analysts sample-check a ruleset too large to review manually, for lack of time.",
    aiRole:
      "Continuously audits fare rules across markets and partner agreements for inconsistencies, flagging what a person should look at rather than requiring analysts to sample-check exhaustively.",
    aiHandles: [
      "Audits fare rules across markets and seasons continuously",
      "Cross-checks partner-agreement pricing for inconsistencies",
      "Flags anomalies for analyst review",
    ],
    humanRole:
      "Revenue management recommendations are reviewed by an analyst before they change live pricing — nothing changes fares or policy without a human decision behind it.",
    humanHandles: ["Reviews flagged inconsistencies", "Approves any live pricing change", "Owns final revenue management policy"],
    flowSteps: [
      "Fare rules ingested across markets",
      "AI audits for inconsistencies",
      "Anomalies flagged for review",
      "Analyst reviews and approves",
      "Pricing updated",
    ],
    systems: ["Revenue management systems", "Global Distribution Systems (GDS)", "Partner / interline settlement systems"],
    data: ["Fare rules", "Market and seasonal pricing data", "Partner agreements"],
    integrationPattern: ["API", "Database", "Human-in-the-loop interface"],
    potentialImpact: [
      "Broader fare-rule coverage than manual sample-checking",
      "Inconsistencies caught before they reach live pricing",
    ],
    measurementSignals: ["Fare-rule coverage audited", "Inconsistencies caught pre-publish", "Analyst review time per cycle"],
    deploymentComplexity: "Medium–High",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-interline-codeshare-reconciliation"],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration"],
    tags: ["revenue management", "fares", "pricing", "audit"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Mapped",
    deploymentStatus: "Assessment Ready",
    sourceConfidence: "grounded",
  },
  {
    id: "airline-ticketing-baggage-claim-resolution",
    industrySlug: "airline-ticketing",
    category: "Back Office",
    workflowName: "Baggage Claim Resolution",
    shortDescription:
      "Cross-reference tracking data, flight records, and passenger documentation to resolve straightforward baggage claims automatically.",
    painPoint:
      "Delayed, lost, or damaged baggage claims require cross-referencing flight records, baggage tracking data, and passenger documentation.",
    failurePoint: "The process is manual enough that resolution time is a recurring source of complaints.",
    aiRole:
      "Cross-references tracking data, flight records, and passenger documentation automatically and resolves straightforward claims without a person touching the file.",
    aiHandles: [
      "Cross-references baggage tracking, flight, and passenger data",
      "Resolves straightforward claims end-to-end",
      "Flags disputed or high-value claims for review",
    ],
    humanRole: "Claims that are disputed or high-value are reserved for human attention.",
    humanHandles: ["Disputed claims", "High-value claims", "Final compensation decisions on flagged files"],
    flowSteps: [
      "Baggage claim filed",
      "AI cross-references tracking, flight, and passenger records",
      "Straightforward claims resolved",
      "Disputed or high-value claims flagged",
      "Agent reviews flagged claims",
    ],
    systems: ["Baggage tracking systems", "Departure Control Systems (DCS)", "CRM", "Payment and fraud systems"],
    data: ["Baggage tracking records", "Flight records", "Passenger documentation", "Claim history"],
    integrationPattern: ["API", "Document / File", "Human-in-the-loop interface"],
    potentialImpact: ["Faster baggage claim resolution", "Fewer complaints tied to resolution time"],
    measurementSignals: ["Average claim resolution time", "Percentage resolved without agent handling", "Claim-related complaint rate"],
    deploymentComplexity: "Medium",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-payment-fraud-chargeback-review"],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration"],
    tags: ["baggage", "claims", "compensation"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Mapped",
    deploymentStatus: "Assessment Ready",
    sourceConfidence: "grounded",
  },
  {
    id: "airline-ticketing-loyalty-dispute-resolution",
    industrySlug: "airline-ticketing",
    category: "Customer & Sales",
    workflowName: "Loyalty Dispute Resolution",
    shortDescription:
      "Reconcile mileage and status discrepancies automatically against booking and partner-airline data, closing routine cases.",
    painPoint: "Mileage disputes, tier status questions, and redemption issues consume significant service capacity.",
    failurePoint:
      "A booking or partner-airline data discrepancy requires manual reconciliation, particularly for mileage and status issues.",
    aiRole:
      "Reconciles mileage and status discrepancies against booking and partner-airline data automatically, closing routine cases and surfacing only genuine disputes.",
    aiHandles: [
      "Reconciles mileage discrepancies against booking data",
      "Resolves tier-status questions automatically",
      "Cross-checks partner-airline redemption data",
      "Surfaces genuine disputes for review",
    ],
    humanRole: "Genuine disputes that can't be resolved by reconciliation are handled by service staff.",
    humanHandles: ["Genuine mileage disputes", "Escalated redemption issues", "Partner-airline discrepancy resolution"],
    flowSteps: [
      "Mileage or status question raised",
      "AI reconciles against booking & partner data",
      "Routine cases closed automatically",
      "Genuine disputes flagged",
      "Service staff resolves dispute",
    ],
    systems: ["Loyalty platforms", "CRM", "Partner / interline settlement systems", "Contact-center platforms"],
    data: ["Frequent-flyer account records", "Booking records", "Partner-airline data", "Redemption activity"],
    integrationPattern: ["API", "Human-in-the-loop interface"],
    potentialImpact: ["Faster resolution of routine mileage and status discrepancies", "Service capacity freed for genuine disputes"],
    measurementSignals: ["Resolution time for loyalty cases", "Percentage closed without agent handling", "Escalated dispute volume"],
    deploymentComplexity: "Medium",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-booking-fare-enquiry-resolution", "airline-ticketing-interline-codeshare-reconciliation"],
    relatedServiceSlugs: ["ai-assistants-copilots", "intelligent-business-workflows"],
    tags: ["loyalty", "frequent flyer", "disputes"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Mapped",
    deploymentStatus: "Assessment Ready",
    sourceConfidence: "grounded",
  },
  {
    id: "airline-ticketing-group-corporate-booking-management",
    industrySlug: "airline-ticketing",
    category: "Operations",
    workflowName: "Group & Corporate Booking Management",
    shortDescription:
      "Track group and corporate booking requirements and payments with the same consistency as individual bookings.",
    painPoint:
      "Group reservations, corporate travel accounts, and their associated payment and documentation requirements are tracked with heavier manual involvement than individual bookings.",
    failurePoint: "Errors are costly given the size of each transaction.",
    aiRole:
      "Structures group and corporate booking requirements, tracks associated payment and documentation status, and flags exceptions before they become costly errors.",
    aiHandles: [
      "Structures group and corporate booking requirements",
      "Tracks payment and documentation status",
      "Flags exceptions before confirmation",
    ],
    humanRole: "Account managers approve final group terms, pricing, and any exception the system flags.",
    humanHandles: ["Final group terms and pricing", "Exception approval", "Corporate account relationship"],
    flowSteps: [
      "Group or corporate booking request",
      "AI structures requirements & tracks status",
      "Exceptions flagged",
      "Account manager approves terms",
      "Booking confirmed",
    ],
    systems: ["Passenger Service Systems (PSS)", "CRM", "Payment and fraud systems"],
    data: ["Group booking requirements", "Corporate account records", "Payment and documentation status"],
    integrationPattern: ["API", "Human-in-the-loop interface"],
    potentialImpact: ["Fewer costly errors in high-value group and corporate bookings", "More consistent tracking across accounts"],
    measurementSignals: ["Booking error rate", "Time to confirm group bookings", "Documentation completeness at confirmation"],
    deploymentComplexity: "Medium",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-booking-fare-enquiry-resolution"],
    relatedServiceSlugs: ["intelligent-business-workflows"],
    tags: ["group booking", "corporate travel", "operations"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Illustrative",
    deploymentStatus: "Opportunity",
    sourceConfidence: "inferred",
    internalNotes:
      "AI mechanism inferred by analogy to the other rules-based booking workflows in this chapter — the book's 'where forward deployment fits' section names this pain point but doesn't describe its mechanism explicitly. Verify with a real group/corporate booking process before upgrading evidence level.",
  },
  {
    id: "airline-ticketing-interline-codeshare-reconciliation",
    industrySlug: "airline-ticketing",
    category: "Finance & Payments",
    workflowName: "Interline & Codeshare Reconciliation",
    shortDescription:
      "Flag passenger and revenue data mismatches between partner airlines at the point they occur, not at expensive settlement.",
    painPoint:
      "Passenger and revenue data for itineraries spanning partner airlines requires reconciliation across systems that don't share a single source of truth.",
    failurePoint:
      "Discrepancies are typically caught during settlement rather than at booking, when they're far more expensive and slower to unwind.",
    aiRole: "Flags data mismatches between partner airlines at the point they occur rather than at settlement.",
    aiHandles: [
      "Cross-checks passenger and revenue data across partner systems",
      "Flags mismatches at the point they occur",
      "Assembles supporting data for settlement review",
    ],
    humanRole: "Settlement staff review and resolve flagged mismatches and handle disputed reconciliations.",
    humanHandles: ["Reviews flagged mismatches", "Resolves disputed reconciliations", "Owns partner-airline relationship"],
    flowSteps: [
      "Interline/codeshare itinerary booked",
      "AI cross-checks partner data continuously",
      "Mismatch flagged at point of occurrence",
      "Settlement staff reviews",
      "Reconciliation resolved",
    ],
    systems: ["Partner / interline settlement systems", "Passenger Service Systems (PSS)", "Global Distribution Systems (GDS)"],
    data: ["Passenger itinerary data", "Revenue and settlement records", "Partner-airline booking data"],
    integrationPattern: ["API", "Database", "Human-in-the-loop interface"],
    potentialImpact: ["Discrepancies caught earlier, when they're cheaper to resolve", "Fewer settlement-stage surprises"],
    measurementSignals: ["Time-to-detection for mismatches", "Settlement discrepancy volume", "Resolution cost per discrepancy"],
    deploymentComplexity: "High",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-fare-rule-audit", "airline-ticketing-loyalty-dispute-resolution"],
    relatedServiceSlugs: ["ai-platform-integration", "intelligent-business-workflows"],
    tags: ["interline", "codeshare", "settlement", "reconciliation"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Mapped",
    deploymentStatus: "Assessment Ready",
    sourceConfidence: "grounded",
  },
  {
    id: "airline-ticketing-regulatory-compensation-calculation",
    industrySlug: "airline-ticketing",
    category: "Documents & Compliance",
    workflowName: "Regulatory Compensation Calculation",
    shortDescription:
      "Calculate the correct delay, cancellation, or denied-boarding compensation per passenger, per jurisdiction, automatically.",
    painPoint: "Compensation obligations for delays, cancellations, and denied boarding vary by jurisdiction and route.",
    failurePoint:
      "Calculating the correct obligation for each affected passenger is a detailed, rules-based task usually done under time pressure during a disruption.",
    aiRole:
      "Calculates the correct compensation obligation per passenger per jurisdiction automatically during a disruption, ensuring consistent, auditable compliance.",
    aiHandles: [
      "Calculates jurisdiction- and route-specific compensation obligations",
      "Applies rules consistently across every affected passenger",
      "Logs every calculation for audit",
    ],
    humanRole: "Any compensation dispute a passenger contests remains with trained service staff.",
    humanHandles: ["Contested compensation cases", "Sensitive passenger situations", "Final sign-off on disputed payouts"],
    flowSteps: [
      "Disruption triggers compensation obligation",
      "AI calculates per-passenger, per-jurisdiction amount",
      "Calculation logged for audit",
      "Contested cases flagged",
      "Service staff resolves dispute",
    ],
    systems: ["Passenger Service Systems (PSS)", "Departure Control Systems (DCS)", "CRM", "Payment and fraud systems"],
    data: ["Passenger and flight records", "Jurisdiction and route compensation rules", "Disruption records"],
    integrationPattern: ["API", "Human-in-the-loop interface"],
    potentialImpact: ["Consistent, auditable regulatory compensation", "Less ad hoc, case-by-case calculation under time pressure"],
    measurementSignals: ["Compensation calculation accuracy", "Time to issue compensation", "Contested-case rate"],
    deploymentComplexity: "Medium–High",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-irops-rebooking", "airline-ticketing-overbooking-volunteer-management"],
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-platform-integration"],
    tags: ["compensation", "regulatory", "compliance", "denied boarding"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Mapped",
    deploymentStatus: "Assessment Ready",
    sourceConfidence: "grounded",
  },
  {
    id: "airline-ticketing-overbooking-volunteer-management",
    industrySlug: "airline-ticketing",
    category: "Operations",
    workflowName: "Overbooking & Volunteer Management",
    shortDescription:
      "Run gate-side volunteer solicitation and escalating compensation offers against policy, in real time.",
    painPoint:
      "When a flight is oversold, soliciting volunteers, calculating escalating compensation offers, and documenting who accepted happens live at the gate under time pressure.",
    failurePoint:
      "This is handled largely ad hoc by whichever agent is working the flight, so compensation offers vary noticeably by which agent is working the gate.",
    aiRole:
      "Runs the volunteer solicitation and compensation-offer process against policy in real time, tracking who's been offered what and at which price point.",
    aiHandles: [
      "Runs volunteer solicitation against policy",
      "Calculates escalating compensation offers",
      "Tracks offers and acceptances per passenger",
    ],
    humanRole: "Gate agents manage the passenger conversation instead of doing the math.",
    humanHandles: ["Passenger conversations at the gate", "Final boarding decisions", "Exception handling"],
    flowSteps: [
      "Flight identified as oversold",
      "AI runs volunteer solicitation by policy",
      "Compensation offers escalate per policy",
      "Gate agent manages conversation & decision",
      "Outcome logged",
    ],
    systems: ["Departure Control Systems (DCS)", "Passenger Service Systems (PSS)", "Payment and fraud systems"],
    data: ["Passenger manifest", "Compensation policy", "Volunteer responses"],
    integrationPattern: ["API", "Human-in-the-loop interface"],
    potentialImpact: ["More consistent compensation offers at the gate", "Less reliance on which agent is working the flight"],
    measurementSignals: ["Compensation-offer consistency", "Time to resolve oversold flight", "Volunteer acceptance rate"],
    deploymentComplexity: "Medium",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-irops-rebooking", "airline-ticketing-regulatory-compensation-calculation"],
    relatedServiceSlugs: ["intelligent-business-workflows"],
    tags: ["overbooking", "gate operations", "compensation"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Mapped",
    deploymentStatus: "Assessment Ready",
    sourceConfidence: "grounded",
  },
  {
    id: "airline-ticketing-payment-fraud-chargeback-review",
    industrySlug: "airline-ticketing",
    category: "Finance & Payments",
    workflowName: "Payment Fraud & Chargeback Review",
    shortDescription:
      "Screen ticket purchases for fraud and assemble chargeback evidence packets automatically, within response windows.",
    painPoint:
      "Card-not-present fraud screening on ticket purchases and chargeback response for disputed bookings both require assembling booking history, passenger verification, and travel-usage data against a tight response window.",
    failurePoint: "This process scales with ticket volume, not analyst headcount.",
    aiRole:
      "Screens bookings against known fraud patterns at the point of sale and assembles the evidence packet for a disputed chargeback automatically.",
    aiHandles: [
      "Screens bookings for fraud patterns at point of sale",
      "Assembles booking, verification, and usage evidence for chargebacks",
      "Flags cases needing analyst judgment",
    ],
    humanRole: "Analysts make the judgment call on flagged cases rather than assembling evidence packets by hand.",
    humanHandles: ["Judgment calls on flagged fraud cases", "Final chargeback response decisions"],
    flowSteps: [
      "Booking transaction or chargeback initiated",
      "AI screens for fraud / assembles evidence",
      "Case flagged for analyst judgment",
      "Analyst reviews and decides",
      "Response filed within window",
    ],
    systems: ["Payment and fraud systems", "Passenger Service Systems (PSS)", "CRM"],
    data: ["Transaction records", "Booking history", "Passenger verification data", "Travel-usage data"],
    integrationPattern: ["API", "Human-in-the-loop interface"],
    potentialImpact: ["Chargeback evidence assembled within response windows regardless of ticket-volume growth", "More consistent fraud screening"],
    measurementSignals: ["Chargeback response rate within window", "Fraud catch rate", "Analyst time per case"],
    deploymentComplexity: "Medium–High",
    playbookReference: airlineTicketingPlaybookRef,
    relatedWorkflowIds: ["airline-ticketing-baggage-claim-resolution"],
    relatedServiceSlugs: ["ai-platform-integration", "intelligent-business-workflows"],
    tags: ["fraud", "chargebacks", "payments"],
    publicVisible: true,
    deploymentReady: true,
    evidenceLevel: "Mapped",
    deploymentStatus: "Assessment Ready",
    sourceConfidence: "grounded",
  },
];

/** Public-facing view of a workflow — internal-only fields stripped. */
export type PublicWorkflow = Omit<WorkflowRecord, "evidenceLevel" | "deploymentStatus" | "sourceConfidence" | "internalNotes"> & {
  industryName: string;
};

function toPublicWorkflow(workflow: WorkflowRecord): PublicWorkflow {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- deliberately stripping internal-only fields
  const { evidenceLevel: _evidenceLevel, deploymentStatus: _deploymentStatus, sourceConfidence: _sourceConfidence, internalNotes: _internalNotes, ...rest } = workflow;
  const industryName = industries.find((industry) => industry.slug === workflow.industrySlug)?.name ?? workflow.industrySlug;
  return { ...rest, industryName };
}

export function getPublicWorkflows(): PublicWorkflow[] {
  return workflows.filter((workflow) => workflow.publicVisible).map(toPublicWorkflow);
}

export function getPublicWorkflowById(id: string): PublicWorkflow | undefined {
  return getPublicWorkflows().find((workflow) => workflow.id === id);
}

export function getPublicWorkflowsByIndustry(industrySlug: string): PublicWorkflow[] {
  return getPublicWorkflows().filter((workflow) => workflow.industrySlug === industrySlug);
}

export function getRelatedPublicWorkflows(workflow: PublicWorkflow): PublicWorkflow[] {
  const publicWorkflows = getPublicWorkflows();
  return workflow.relatedWorkflowIds
    .map((id) => publicWorkflows.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is PublicWorkflow => Boolean(candidate));
}

export interface IndustryWorkflowSummary {
  slug: string;
  name: string;
  icon: (typeof industries)[number]["icon"];
  challenge: string;
  workflowCount: number;
}

/** Every industry in the taxonomy, with a live workflow count derived from the canonical data — never hardcoded. */
export function getIndustryWorkflowSummaries(): IndustryWorkflowSummary[] {
  const publicWorkflows = getPublicWorkflows();
  return industries.map((industry) => ({
    slug: industry.slug,
    name: industry.name,
    icon: industry.icon,
    challenge: industry.challenge,
    workflowCount: publicWorkflows.filter((workflow) => workflow.industrySlug === industry.slug).length,
  }));
}

export const workflowCategories: WorkflowCategory[] = [
  "Customer & Sales",
  "Operations",
  "Back Office",
  "Finance & Payments",
  "Documents & Compliance",
  "Knowledge & Support",
  "Scheduling & Coordination",
  "Decision Support",
  "Monitoring & Exceptions",
  "Workforce & Internal Operations",
  "Reporting & Intelligence",
];

export const deploymentComplexityLevels: DeploymentComplexity[] = ["Low", "Low–Medium", "Medium", "Medium–High", "High"];

export const workflowsIntro = {
  eyebrow: "Deployable AI Workflows",
  title: "Explore operational workflows where AI can be embedded into the systems your business already runs.",
  description:
    "DeosAI Labs maps AI to real business processes — not isolated tools. Explore workflows by industry and discover where an AI-powered operational capability could fit inside your organization.",
  primaryCta: { label: "Explore Workflows", href: "/workflows" },
  secondaryCta: { label: "Discuss Your Workflow", href: "/contact" },
};
