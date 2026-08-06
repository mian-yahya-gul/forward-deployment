export interface FeaturedInsight {
  category: string;
  title: string;
  summary: string;
  readingTime: string;
  href: string;
}

export interface InsightCard {
  category: string;
  title: string;
  summary: string;
  readingTime: string;
  href: string;
}

export const insightsIntro = {
  eyebrow: "Insights",
  headline: "Insights from the field, not the hype cycle.",
  description:
    "We write about what we're actually seeing while deploying AI inside real organizations — practical, technical, and honest.",
  cta: { label: "Explore Knowledge Center", href: "/insights" },
};

export const featuredInsight: FeaturedInsight = {
  category: "AI Strategy",
  title: "Why most AI pilots never reach production",
  summary:
    "The gap between a promising demo and a production system is bigger than most teams expect. Here's what actually closes it.",
  readingTime: "6 min read",
  href: "/insights",
};

export const insightCards: InsightCard[] = [
  {
    category: "Workflow Automation",
    title: "Where workflow automation actually pays off",
    summary: "Not every manual process is worth automating. Here's how to prioritize.",
    readingTime: "5 min read",
    href: "/insights",
  },
  {
    category: "AI Governance",
    title: "Building human oversight into AI systems from day one",
    summary: "Governance isn't a phase-two concern — it shapes how a system should be designed.",
    readingTime: "7 min read",
    href: "/insights",
  },
  {
    category: "Enterprise Architecture",
    title: "Integrating AI into systems you can't rip and replace",
    summary: "Most enterprise AI has to work alongside legacy systems, not instead of them.",
    readingTime: "6 min read",
    href: "/insights",
  },
];
