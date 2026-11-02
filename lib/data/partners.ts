import {
  Bot,
  Building2,
  Code2,
  Database,
  Layers,
  Network,
  Plug,
  TestTube2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { contactEmail } from "@/lib/data/contact";

/**
 * White-label partnership content. No active partnerships exist yet, so this page
 * deliberately shows no partner logos, names or testimonials.
 */
export const agencyHero = {
  eyebrow: "Agency Partnerships",
  title: "Your Clients Need AI Engineering. We Help You Deliver It.",
  description:
    "DeosAI Labs works behind the scenes as the AI and software engineering partner for agencies and consultancies. You keep the client relationship; we help you build and ship the AI, integration and application work they are asking for.",
  primaryCta: { label: "Make a Partnership Enquiry", href: "#partner-enquiry" },
  secondaryCta: { label: "View White-label Scope", href: "/services#white-label-ai-engineering" },
};

export interface AgencyAudience {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const agencyAudiences: AgencyAudience[] = [
  {
    icon: Code2,
    title: "Software development agencies",
    description: "Add AI agents, integrations and automation to your delivery capability without hiring for each project.",
  },
  {
    icon: Network,
    title: "ERP implementation partners",
    description: "Extend ERP rollouts with custom integrations, reporting tools and workflow automation around the core system.",
  },
  {
    icon: Layers,
    title: "Digital transformation consultancies",
    description: "Turn AI recommendations into working systems, with an engineering team to build what you design.",
  },
  {
    icon: Building2,
    title: "IT service providers and technology consultancies",
    description: "Take on AI and integration requests from your clients with delivery capacity behind you.",
  },
];

export interface AgencyCapability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const agencyCapabilities: AgencyCapability[] = [
  { icon: Bot, title: "AI agent and assistant development", description: "Task-focused agents and assistants wired into your client's tools and data." },
  { icon: Database, title: "RAG and enterprise knowledge systems", description: "Retrieval-based systems that answer from your client's own documents and records." },
  { icon: Plug, title: "MCP and API integrations", description: "Connect AI systems to the software your client already runs, through MCP servers and APIs." },
  { icon: Code2, title: "Custom software and API development", description: "Backend and full-stack development for internal tools, portals and services." },
  { icon: Workflow, title: "Workflow automation", description: "Automations that remove repetitive manual steps across your client's systems." },
  { icon: TestTube2, title: "Testing, deployment and implementation", description: "Testing, deployment support and technical hand-off so the work runs in production." },
];

export const agencyProcess = [
  {
    title: "Share the brief",
    description: "Send a short description of the client need through the enquiry form. Keep client details anonymous until we agree how to work together.",
  },
  {
    title: "Agree scope and price",
    description: "We review the brief and propose a written scope, deliverables and price. Small pieces of work start from $600; final pricing depends on scope.",
  },
  {
    title: "Build behind your brand",
    description: "We deliver as your engineering team: you control client communication, and we route updates and questions through you.",
  },
  {
    title: "Test, deploy and hand over",
    description: "We test the work, support deployment and hand over documentation so you can support your client.",
  },
];

export const agencyTerms = {
  title: "How we keep expectations clear",
  points: [
    "Pricing is project-based and scoped in writing. The $600 starting figure is an indicative minimum for small, well-defined work, not a day rate or a retainer.",
    "Hosting, third-party API usage and ongoing maintenance are scoped separately.",
    "We do not claim existing agency partnerships. We are building this programme deliberately and starting with a small number of good fits.",
    "Confidentiality and white-label terms are agreed in writing for each engagement.",
  ],
};

export const partnerEnquiryIntro = {
  eyebrow: "Partnership Enquiry",
  title: "Tell us about the work your clients need.",
  description:
    "Share a few details and we will review them and reply by email. You do not need to name the end client.",
};

export const partnersEmptyState = {
  cta: {
    label: "Email us",
    href: `mailto:${contactEmail}?subject=Partnership%20Inquiry`,
  },
};

export const partnersHero = agencyHero;
