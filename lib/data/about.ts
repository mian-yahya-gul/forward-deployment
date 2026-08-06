import {
  BookOpen,
  Compass,
  HandHeart,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

/**
 * No real leadership bios, partnerships, or community contributions exist
 * yet, so those sections from 09-about-contact.md are intentionally left
 * out of the built page rather than filled with invented people or
 * affiliations — add them once there's real content to publish.
 */
export const aboutHero = {
  eyebrow: "About",
  title: "Built to make AI adoption practical, not just possible.",
  description:
    "DeosAI Labs exists because most organizations don't struggle with access to AI — they struggle with putting it to work inside how they actually operate. We started this company to close that gap.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
};

export const companyStory = {
  eyebrow: "Our Story",
  title: "Why DeosAI Labs exists",
  paragraphs: [
    "Powerful AI models are now widely available, but access alone rarely changes how an organization operates. The hard part — understanding real workflows, earning trust with the people who do the work, and integrating new capability without disrupting what already works — gets skipped in most AI initiatives.",
    "DeosAI Labs was founded to focus specifically on that hard part. We call ourselves an AI Forward Deployment company because our work happens inside our clients' operations, not in a lab removed from them. Every engagement starts with understanding the business first.",
  ],
};

export const missionVision = {
  mission: {
    title: "Mission",
    description:
      "To help organizations achieve measurable business outcomes by deploying AI responsibly into the systems and workflows they already rely on.",
  },
  vision: {
    title: "Vision",
    description:
      "A future where AI adoption is judged by operational impact, not by how impressive a demo looks — and where every deployment strengthens, rather than replaces, the people doing the work.",
  },
};

export interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    icon: Target,
    title: "Business First",
    description: "Every recommendation starts with an operational problem, not a technology capability.",
  },
  {
    icon: Compass,
    title: "Curiosity",
    description: "We ask questions before we propose solutions, and keep asking as an engagement evolves.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We say when AI isn't the right answer, even when it would be an easier sale.",
  },
  {
    icon: Sparkles,
    title: "Practical Innovation",
    description: "New techniques earn a place in our work by solving real problems, not by being new.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description: "The field moves quickly, and staying credible means treating every engagement as a chance to learn.",
  },
  {
    icon: HandHeart,
    title: "Collaboration",
    description: "We work alongside client teams, not around them — the people closest to a workflow usually understand it best.",
  },
];

export const operatingPrinciples = [
  {
    title: "Understand before building",
    description: "We map how work actually happens before proposing how AI should change it.",
  },
  {
    title: "Measure outcomes",
    description: "Success is defined in business terms, agreed on before an engagement begins.",
  },
  {
    title: "Work transparently",
    description: "Clients see the same roadmap, risks, and trade-offs we do.",
  },
  {
    title: "Collaborate closely",
    description: "We embed with client teams rather than working in isolation.",
  },
  {
    title: "Design for long-term sustainability",
    description: "Systems are built to be maintained and improved, not just launched.",
  },
  {
    title: "Use AI responsibly",
    description: "Human oversight and governance are part of the design, not an afterthought.",
  },
];

export const culture = {
  eyebrow: "Culture",
  title: "How we try to work",
  description:
    "Internally, we try to hold ourselves to the same standard we bring to client work — evidence over opinion, and continuous learning over assumed expertise.",
  traits: ["Continuous learning", "Knowledge sharing", "Evidence-based decision making", "Cross-functional collaboration"],
};

export const careersPreview = {
  eyebrow: "Careers",
  title: "We're building a team that cares about AI actually working",
  description:
    "Not just demoing well. If you'd rather solve real operational problems than chase the newest model release, we'd like to hear from you.",
  cta: { label: "View Open Roles", href: "/careers" },
};
