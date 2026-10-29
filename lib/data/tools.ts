export interface Tool {
  slug: string;
  href: string;
  title: string;
  eyebrow: string;
  time: string;
  description: string;
}

export const tools: Tool[] = [
  {
    slug: "ai-opportunity-assessment",
    href: "/tools/ai-opportunity-assessment",
    title: "AI Opportunity Assessment",
    eyebrow: "Assessment · 2 minutes",
    time: "2 min",
    description:
      "Answer six questions about your industry, your problem and your systems. Get a short, tailored view of which services to look at first.",
  },
  {
    slug: "workflow-roi-calculator",
    href: "/tools/workflow-roi-calculator",
    title: "Workflow Savings Calculator",
    eyebrow: "Calculator · 1 minute",
    time: "1 min",
    description:
      "Estimate the hours and cost a repetitive workflow takes today, and what automating part of it could save. The formula is on the page.",
  },
];
