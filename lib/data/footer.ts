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

/**
 * Pinned to the original industry lineup rather than mapping every entry in
 * `industries`, so the footer's column length — and its layout — stays fixed
 * as more industries are added to the /industries page. Not intended to grow.
 */
const footerIndustrySlugs = [
  "healthcare",
  "education",
  "retail-ecommerce",
  "manufacturing",
  "logistics-supply-chain",
  "financial-services",
  "government",
  "agriculture",
  "aviation",
];

export const footerIndustriesColumn: FooterLink[] = footerIndustrySlugs
  .map((slug) => industries.find((industry) => industry.slug === slug))
  .filter((industry): industry is (typeof industries)[number] => industry !== undefined)
  .map((industry) => ({
    label: industry.name,
    href: `/industries/${industry.slug}`,
  }));

export const footerKnowledgeColumn: FooterLink[] = [
  { label: "Insights", href: "/insights" },
  { label: "Research", href: "/insights" },
  { label: "Implementation Guides", href: "/insights" },
  { label: "Playbooks", href: "/playbook" },
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

export const footerSocial: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/deosai-lab/" },
  { label: "YouTube", href: "https://www.youtube.com/@deosailabs" },
];

export const footerContact = {
  email: "kakakhel176@gmail.com",
};
