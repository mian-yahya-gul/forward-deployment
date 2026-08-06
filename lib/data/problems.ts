import {
  Archive,
  Gauge,
  ListChecks,
  RotateCcw,
  Shuffle,
  Unplug,
  type LucideIcon,
} from "lucide-react";

export interface ProblemCard {
  icon: LucideIcon;
  title: string;
  description: string;
  impact: string;
}

export const problemsIntro = {
  eyebrow: "The Challenge",
  headline: "AI isn't the hard part. Integration is.",
  description:
    "Most organizations don't lack access to powerful AI models. They lack a clear path to putting those models to work inside the systems, workflows, and teams that already run the business. The result is a familiar pattern: promising pilots that never reach production, and tools employees quietly stop using.",
  transitionStatement:
    "Successful AI adoption begins by improving the way work flows through an organization.",
};

export const problems: ProblemCard[] = [
  {
    icon: Unplug,
    title: "Disconnected Systems",
    description:
      "Data and workflows live in separate tools that don't talk to each other.",
    impact:
      "Teams re-enter the same information across systems, and decisions get made on partial information.",
  },
  {
    icon: Archive,
    title: "Knowledge Silos",
    description:
      "Institutional knowledge is scattered across documents, inboxes, and individual employees' heads.",
    impact: "New hires ramp slowly, and answers depend on who happens to be available.",
  },
  {
    icon: ListChecks,
    title: "Manual Workflows",
    description:
      "Repetitive, rules-based work still runs through spreadsheets and manual handoffs.",
    impact: "Skilled employees spend their time on tasks that don't require judgment.",
  },
  {
    icon: Gauge,
    title: "Slow Decision Making",
    description: "Leaders lack real-time visibility into what's actually happening in operations.",
    impact: "Decisions wait on reports instead of being made when they matter.",
  },
  {
    icon: Shuffle,
    title: "Inconsistent Processes",
    description: "The same task is handled differently depending on the team or individual.",
    impact: "Quality and speed vary, and it's difficult to scale what works.",
  },
  {
    icon: RotateCcw,
    title: "AI Pilot Fatigue",
    description:
      "Previous AI experiments generated excitement but never made it into daily operations.",
    impact: "Teams are skeptical that the next initiative will be any different.",
  },
];
