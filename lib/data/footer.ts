import { industries } from "@/lib/data/industries";
import { services } from "@/lib/data/services";

export interface FooterLink {
  label: string;
  href: string;
}

export const footerCompany = {
  description:
    "DeosAI Labs is a long-term AI transformation partner committed to practical, responsible, and measurable business outcomes.",
  contactCta: { label: "Book a Discovery Call", href: "/contact" },
};

export const footerServicesColumn: FooterLink[] = services.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
}));

export const footerIndustriesColumn: FooterLink[] = industries.map((industry) => ({
  label: industry.name,
  href: `/industries/${industry.slug}`,
}));

export const footerKnowledgeColumn: FooterLink[] = [
  { label: "Insights", href: "/insights" },
  { label: "Research", href: "/insights" },
  { label: "Implementation Guides", href: "/insights" },
  { label: "Playbooks", href: "/insights" },
  { label: "Industry Reports", href: "/insights" },
  { label: "Technical Notes", href: "/insights" },
];

export const footerCompanyColumn: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/about#methodology" },
  { label: "Transformation Stories", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalColumn: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Accessibility Statement", href: "/accessibility" },
];

export const footerSocial: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/deosai-lab/" },
  { label: "YouTube", href: "https://www.youtube.com/@deosailabs" },
];

export const footerContact = {
  email: "hello@deosailabs.com",
};
