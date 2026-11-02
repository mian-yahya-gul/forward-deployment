import { contactEmail } from "@/lib/data/contact";
import { markets } from "@/lib/data/markets";
import { industries } from "@/lib/data/industries";
import { services } from "@/lib/data/services";

export interface FooterLink {
  label: string;
  href: string;
}

export const footerCompany = {
  description:
    "DeosAI Labs is an AI engineering and forward deployment company. We help businesses automate operations, build custom software and integrate AI into the systems they already use.",
  contactCta: { label: "Book a Discovery Call", href: "/contact" },
};

export const footerServicesColumn: FooterLink[] = [
  { label: "Packages & Pricing", href: "/services#packages" },
  ...services.map((service) => ({
    label: service.title,
    href: `/services/${service.slug}`,
  })),
];

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
  { label: "What is AI Forward Deployment?", href: "/what-is-ai-forward-deployment" },
  { label: "Playbooks", href: "/playbook" },
  { label: "Workflow Catalog", href: "/workflows" },
  { label: "Free Tools", href: "/tools" },
  { label: "Checklists & Templates", href: "/resources" },
  { label: "Industry Reports", href: "/insights" },
  { label: "Technical Notes", href: "/insights" },
];

export const footerCompanyColumn: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Methodology", href: "/#methodology" },
  { label: "Our Work", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
  { label: "Agency Partnerships", href: "/partners" },
  { label: "Markets We Serve", href: "/markets" },
  ...markets.map((market) => ({ label: `AI Engineering in ${market.label}`, href: `/markets/${market.slug}` })),
  { label: "Contact", href: "/contact" },
];

export const footerSocial: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/deosai-lab/" },
  { label: "YouTube", href: "https://www.youtube.com/@deosailabs" },
];

export const footerContact = {
  email: contactEmail,
};
