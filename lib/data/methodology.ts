export interface MethodologyPhase {
  number: string;
  title: string;
  /** Typical duration for one workflow — a range, not a fixed promise, since scope varies by engagement. */
  duration: string;
  objective: string;
  activities: string[];
  deliverables: string[];
  outcome: string;
}

export const methodologyIntro = {
  eyebrow: "Our Approach",
  headline: "A structured path from opportunity to production.",
  description:
    "Technology alone never transforms an organization. Transformation happens when AI becomes part of everyday work. Our methodology focuses on delivering measurable operational improvement, not simply deploying software.",
  cta: { label: "Explore Our Services", href: "/services" },
};

export const methodologyPhases: MethodologyPhase[] = [
  {
    number: "01",
    title: "Discover",
    duration: "1–2 weeks",
    objective: "Understand the business.",
    activities: ["Stakeholder workshops", "Workflow mapping", "Process observation", "Existing systems review"],
    deliverables: ["Current-state assessment", "Opportunity map", "Risk assessment"],
    outcome: "A shared understanding of how work is performed today.",
  },
  {
    number: "02",
    title: "Prioritize",
    duration: "1 week",
    objective: "Identify where AI creates measurable business value.",
    activities: ["Opportunity scoring", "ROI estimation", "Feasibility analysis", "Data readiness assessment"],
    deliverables: ["Prioritized roadmap", "Business case", "Implementation plan"],
    outcome: "Clear priorities instead of scattered AI experiments.",
  },
  {
    number: "03",
    title: "Design",
    duration: "2–3 weeks",
    objective: "Design an enterprise-ready AI solution.",
    activities: ["Solution architecture", "Security review", "Human workflow design", "Governance planning"],
    deliverables: ["Technical architecture", "UX concepts", "Deployment plan"],
    outcome: "A solution designed for production.",
  },
  {
    number: "04",
    title: "Deploy",
    duration: "3–6 weeks",
    objective: "Integrate AI into existing business operations.",
    activities: ["System integration", "AI implementation", "Testing", "User onboarding"],
    deliverables: ["Production deployment", "Training", "Documentation"],
    outcome: "AI becomes part of everyday work.",
  },
  {
    number: "05",
    title: "Optimize",
    duration: "Ongoing",
    objective: "Continuously improve business outcomes.",
    activities: ["Monitoring", "Analytics", "Feedback collection", "Model refinement", "Workflow improvement"],
    deliverables: ["Performance reports", "Optimization roadmap", "Continuous improvement backlog"],
    outcome: "AI delivers increasing value over time.",
  },
];

export const methodologyPrinciples = [
  "Business before technology",
  "People before automation",
  "Governance from day one",
  "Human oversight",
  "Iterative improvement",
  "Measurable outcomes",
] as const;
