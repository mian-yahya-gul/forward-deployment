export interface ProcessStage {
  number: string;
  title: string;
  purpose: string;
  outcome: string;
}

export const processIntro = {
  eyebrow: "How We Work",
  headline: "A transparent path from first conversation to measurable results.",
  description:
    "Every engagement follows a transparent journey with clear objectives, regular communication, measurable milestones, and continuous feedback.",
  summary:
    "You'll always know what phase you're in, what happens next, and what outcome to expect.",
  cta: { label: "Book a Discovery Call", href: "/contact" },
};

export const processStages: ProcessStage[] = [
  {
    number: "01",
    title: "Initial Conversation",
    purpose: "Understand the organization, goals, and current challenges.",
    outcome: "Shared understanding of the problem.",
  },
  {
    number: "02",
    title: "Discovery & Assessment",
    purpose: "Review workflows, systems, stakeholders, and opportunities.",
    outcome: "Prioritized opportunities with expected business value.",
  },
  {
    number: "03",
    title: "Solution Design",
    purpose: "Design an implementation approach aligned with business objectives.",
    outcome: "Approved roadmap and architecture.",
  },
  {
    number: "04",
    title: "Implementation",
    purpose: "Deploy AI capabilities into existing operational workflows.",
    outcome: "Working production solution.",
  },
  {
    number: "05",
    title: "Adoption & Optimization",
    purpose: "Measure outcomes, gather feedback, and improve continuously.",
    outcome: "Sustained business value.",
  },
];
