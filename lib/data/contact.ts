import { Briefcase, CalendarCheck, Handshake, Mail, type LucideIcon } from "lucide-react";

export const contactHero = {
  eyebrow: "Contact",
  title: "Tell us about the workflow you want to fix.",
  description:
    "Book a discovery call, send a project enquiry or tell us about an agency partnership. We will look at how the work happens today and discuss a sensible next step.",
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
    title: "Project Enquiry",
    description: "Not ready to schedule? Describe your project and we will reply by email.",
    actionLabel: "Send a Project Enquiry",
    href: "#message",
    analyticsEvent: "general_inquiry_click",
  },
  {
    icon: Handshake,
    title: "Agency Partnership",
    description: "Agencies and consultancies: ask about white-label AI and software engineering for your clients.",
    actionLabel: "Partnership Enquiry",
    href: "/partners#partner-enquiry",
    analyticsEvent: "partner_pathway_click",
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

/** The single public business address. Import this everywhere instead of retyping it. */
export const contactEmail = "info@deosailabs.com";

/** Enquiry types offered on the contact and partnership forms. The API validates against these values. */
export const enquiryTypes = [
  { value: "automation", label: "AI workflow automation" },
  { value: "application", label: "Custom business application" },
  { value: "partnership", label: "Agency / white-label partnership" },
  { value: "other", label: "Something else / not sure yet" },
] as const;

export const budgetOptions = [
  { value: "under-450", label: "Under $450" },
  { value: "450-650", label: "$450–$650" },
  { value: "750-1200", label: "$750–$1,200" },
  { value: "1200-plus", label: "$1,200 or more" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "exploring", label: "Just exploring" },
] as const;
