import {
  Blocks,
  BookOpenCheck,
  Gauge,
  Handshake,
  ShieldCheck,
  Sparkles,
  Target,
  Telescope,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * No open roles or internship program exist yet, so this page is built
 * around hiring philosophy, culture, and process — with an honest empty
 * state for Open Positions rather than fabricated job listings.
 */
export const careersHero = {
  eyebrow: "Careers",
  title: "Work on AI that has to actually work.",
  description:
    "We're building a team of people who care more about whether an AI system holds up in production than whether it impresses in a demo. If that sounds like you, we'd like to talk.",
  primaryCta: { label: "View Open Positions", href: "#open-positions" },
  secondaryCta: { label: "Learn About DeosAI Labs", href: "/about" },
};

export const whyDeosai = {
  eyebrow: "Why DeosAI Labs",
  title: "Meaningful problems, not busywork",
  description:
    "Every engagement here starts with a real operational problem inside a real organization — not a hypothetical use case. You'll work close to the outcome, see whether what you built actually gets used, and adjust when it doesn't.",
};

export interface HiringPhilosophyItem {
  title: string;
  description: string;
}

export const hiringPhilosophy: HiringPhilosophyItem[] = [
  { title: "Curiosity", description: "People who ask why a system works the way it does, not just how to use it." },
  { title: "Integrity", description: "People who tell clients and teammates the truth, especially when it's inconvenient." },
  { title: "Ownership", description: "People who see a problem through, not just the part that's technically theirs." },
  { title: "Learning", description: "People who treat being wrong as information, not a threat." },
  { title: "Collaboration", description: "People who make the people around them better, not just themselves." },
  { title: "Technical Excellence", description: "People who care about the quality of their work, even when no one would notice otherwise." },
  { title: "Business Impact", description: "People who can connect technical decisions back to the operational problem being solved." },
];

export interface EngineeringPrinciple {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const engineeringCulture: EngineeringPrinciple[] = [
  {
    icon: Gauge,
    title: "Quality over speed",
    description: "We'd rather ship something correct a week later than something broken on time.",
  },
  {
    icon: Workflow,
    title: "Automation first",
    description: "If a task is repeated more than a few times, we look for ways to automate it.",
  },
  {
    icon: BookOpenCheck,
    title: "Documentation first",
    description: "Decisions and systems are documented as they're built, not reconstructed afterward.",
  },
  {
    icon: Users,
    title: "Accessibility by default",
    description: "Accessible interfaces aren't a separate pass — they're part of how we build from the start.",
  },
  {
    icon: ShieldCheck,
    title: "Security by design",
    description: "Security considerations are part of the design conversation, not a review gate at the end.",
  },
  {
    icon: Sparkles,
    title: "Performance as a feature",
    description: "Speed and responsiveness are treated as product requirements, not nice-to-haves.",
  },
  {
    icon: Telescope,
    title: "Continuous improvement",
    description: "We review what worked and what didn't after every engagement, and change how we work accordingly.",
  },
  {
    icon: Blocks,
    title: "Systems thinking",
    description: "We look at how a change affects the whole system, not just the immediate task.",
  },
];

export interface HiringStage {
  number: string;
  title: string;
  description: string;
}

export const hiringProcess: HiringStage[] = [
  { number: "01", title: "Application", description: "Submit your application for a role, or reach out with a general application." },
  { number: "02", title: "Resume Review", description: "A team member reviews your background against the role and gets back to you either way." },
  { number: "03", title: "Introductory Conversation", description: "A conversational chat about your experience, interests, and what you're looking for next." },
  { number: "04", title: "Technical Assessment", description: "A practical exercise relevant to the role — not a trivia round." },
  { number: "05", title: "Team Interviews", description: "Conversations with the team you'd actually work with." },
  { number: "06", title: "Final Discussion", description: "A closing conversation to answer any remaining questions on both sides." },
  { number: "07", title: "Offer", description: "If it's a match, we move quickly to make an offer." },
];

export const openPositionsEmptyState = {
  icon: Target,
  title: "No open positions right now",
  description:
    "We don't have any roles open at the moment, but we're always glad to hear from people who care about this work. Send a general application and we'll reach out when something fits.",
  cta: {
    label: "Send a General Application",
    href: "mailto:hello@deosailabs.com?subject=General%20Application&body=Tell%20us%20a%20bit%20about%20yourself%2C%20what%20you're%20interested%20in%2C%20and%20attach%20your%20resume%20or%20portfolio%20before%20sending.",
  },
};

export const careersFaqs = [
  {
    question: "Do you support remote work?",
    answer: "Yes — our team collaborates across locations, and we design our ways of working around that.",
  },
  {
    question: "Do you sponsor visas?",
    answer: "It depends on the role and location — ask during the introductory conversation and we'll give you a straight answer.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "It varies by engagement since we integrate with each client's existing systems, but our own tooling favors modern, well-supported technologies over novelty for its own sake.",
  },
  {
    question: "How long does hiring take?",
    answer:
      "It depends on the role, but we aim to keep candidates informed at every stage rather than leaving you waiting without an update.",
  },
  {
    question: "Can I submit a general application?",
    answer:
      "Yes — even if there's no open role that fits right now, we welcome general applications and keep them on file for future openings.",
  },
  {
    question: "Do you offer internships?",
    answer:
      "We don't have a formalized internship program yet, but we're open to hearing from students and early-career candidates — reach out and let us know what you're looking for.",
  },
];

export const careersCta = {
  icon: Handshake,
  title: "Don't see an open role that fits?",
  description:
    "Send us a general application and tell us what you're looking for. We keep every application on file and reach out when something matches.",
  primaryCta: openPositionsEmptyState.cta,
};
