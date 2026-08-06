import { Building2, GraduationCap, Landmark, Server, type LucideIcon } from "lucide-react";

/** No active partnerships exist yet — an honest empty state rather than invented affiliations. */
export const partnersHero = {
  eyebrow: "Partners",
  title: "Building a partner network, deliberately.",
  description:
    "We'd rather have a small number of genuinely valuable partnerships than a long list of logos. Here's the kind of organizations we're open to working with.",
};

export interface PartnerCategory {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const partnerCategories: PartnerCategory[] = [
  {
    icon: Server,
    title: "Technology & Cloud Providers",
    description: "Platforms our deployments run on or integrate with.",
  },
  {
    icon: GraduationCap,
    title: "Research Institutions",
    description: "Academic partners advancing practical, responsible AI.",
  },
  {
    icon: Building2,
    title: "Industry Associations",
    description: "Organizations connecting us with the industries we serve.",
  },
  {
    icon: Landmark,
    title: "Complementary Consultancies",
    description: "Firms whose expertise extends what we can offer clients.",
  },
];

export const partnersEmptyState = {
  title: "No active partnerships to list yet",
  description:
    "We're a young company and are still building this network deliberately. If you think there's a fit, we'd like to hear from you.",
  cta: {
    label: "Get in Touch",
    href: "mailto:hello@deosailabs.com?subject=Partnership%20Inquiry",
  },
};
