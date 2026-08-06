export interface FeaturedStory {
  industry: string;
  title: string;
  context: string;
  challenge: string;
  approach: string;
  outcome: string;
  lessons: string;
  href: string;
  illustrative: boolean;
}

export interface StoryCard {
  industry: string;
  title: string;
  challengeSummary: string;
  outcome: string;
  href: string;
  illustrative: boolean;
}

export const storiesIntro = {
  eyebrow: "Client Success",
  headline: "Evidence, not marketing claims.",
  description:
    "We measure success in operational outcomes, not demos. Here's how organizations put AI to work inside real operations.",
  cta: { label: "Explore All Stories", href: "/case-studies" },
};

/**
 * No real client engagements are published yet, so these are clearly
 * labeled illustrative scenarios (generalized business context, no
 * fabricated metrics) rather than real named case studies — replace
 * with verified client stories as they become available for publication.
 */
export const featuredStory: FeaturedStory = {
  industry: "Healthcare",
  title: "Reducing administrative load so clinical teams can focus on patients",
  context: "A regional healthcare provider with multiple clinical and administrative teams.",
  challenge:
    "Staff spent significant time manually searching scattered documentation and systems to answer routine clinical and administrative questions.",
  approach:
    "Discovery workshops with clinical and operations staff, workflow mapping across departments, and a phased knowledge-assistant rollout starting with a single high-friction workflow.",
  outcome:
    "Faster access to information, reduced administrative burden on clinical staff, and more consistent answers across teams.",
  lessons: "Starting with one well-scoped workflow built trust before expanding further.",
  href: "/case-studies",
  illustrative: true,
};

export const storyCards: StoryCard[] = [
  {
    industry: "Retail & E-commerce",
    title: "Bringing inventory and customer data into one place",
    challengeSummary: "Fragmented systems made it hard to give customers consistent answers.",
    outcome: "Faster, more consistent customer service across channels.",
    href: "/case-studies",
    illustrative: true,
  },
  {
    industry: "Manufacturing",
    title: "Giving operations teams real-time visibility",
    challengeSummary: "Production issues surfaced late, after they'd already caused delays.",
    outcome: "Fewer production disruptions and faster issue response.",
    href: "/case-studies",
    illustrative: true,
  },
  {
    industry: "Financial Services",
    title: "Streamlining compliance-heavy document review",
    challengeSummary: "Manual document review created a bottleneck ahead of every approval.",
    outcome: "Faster turnaround without sacrificing accuracy.",
    href: "/case-studies",
    illustrative: true,
  },
];
