import { Briefcase, CalendarCheck, Mail, type LucideIcon } from "lucide-react";

export const contactHero = {
  eyebrow: "Contact",
  title: "Let's talk about your AI transformation.",
  description:
    "Whether you're exploring your first AI initiative or expanding existing capabilities, the first step is a conversation. Reach out and we'll get back to you.",
};

export interface ContactPathway {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  analyticsEvent: string;
}

export const contactPathways: ContactPathway[] = [
  {
    icon: CalendarCheck,
    title: "Discovery Call",
    description: "Talk through your operational challenges and see if we're a fit — no pressure, no obligation.",
    actionLabel: "Book a Discovery Call",
    href: "mailto:kakakhel176@gmail.com?subject=Discovery%20Call%20Request",
    analyticsEvent: "discovery_call_click",
  },
  {
    icon: Mail,
    title: "General Inquiry",
    description: "Have a question that doesn't need a call yet? Send us a note directly.",
    actionLabel: "Email Us",
    href: "mailto:kakakhel176@gmail.com?subject=General%20Inquiry",
    analyticsEvent: "general_inquiry_click",
  },
  {
    icon: Briefcase,
    title: "Careers",
    description: "Interested in joining the team? See what roles are currently open.",
    actionLabel: "View Open Roles",
    href: "/careers",
    analyticsEvent: "careers_pathway_click",
  },
];

export const contactEmail = "kakakhel176@gmail.com";
