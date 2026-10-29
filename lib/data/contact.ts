import { Briefcase, CalendarCheck, Mail, type LucideIcon } from "lucide-react";

export const contactHero = {
  eyebrow: "Contact",
  title: "Let's talk about your AI transformation.",
  description:
    "Tell us what your business is trying to improve. We'll explore your current workflows, identify potential opportunities, and discuss a sensible next step.",
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
    href: "#book",
    analyticsEvent: "discovery_call_click",
  },
  {
    icon: Mail,
    title: "Send a Message",
    description: "Have a question that doesn't need a call yet? Send us a note directly.",
    actionLabel: "Send a Message",
    href: "#message",
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

export const contactEmail = "info@deosailabs.com";
