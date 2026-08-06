import {
  Compass,
  Library,
  Plug,
  TrendingUp,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  slug: string;
  purpose: string;
  outcomes: string[];
}

export const servicesIntro = {
  eyebrow: "Services",
  headline: "Capabilities, not isolated tools.",
  description:
    "Every organization is different. Our services are designed as capabilities that can be combined to solve operational challenges across departments, teams, and industries. We do not sell isolated AI tools — we build integrated business capabilities.",
  cta: { label: "Explore Services", href: "/services" },
};

export const services: Service[] = [
  {
    icon: Compass,
    title: "AI Strategy & Opportunity Discovery",
    slug: "ai-strategy-discovery",
    purpose: "Help organizations identify where AI creates measurable value.",
    outcomes: ["AI roadmap", "Opportunity assessment", "Executive workshops", "Business case development"],
  },
  {
    icon: Workflow,
    title: "Intelligent Business Workflows",
    slug: "intelligent-business-workflows",
    purpose: "Improve operational efficiency through workflow automation and decision support.",
    outcomes: ["Reduced manual work", "Faster approvals", "Process automation", "Operational visibility"],
  },
  {
    icon: Library,
    title: "Enterprise Knowledge Systems",
    slug: "enterprise-knowledge-systems",
    purpose:
      "Transform organizational knowledge into accessible, searchable, and actionable intelligence.",
    outcomes: ["Knowledge discovery", "Internal search", "Document intelligence", "Organizational memory"],
  },
  {
    icon: Users,
    title: "AI Assistants & Operational Copilots",
    slug: "ai-assistants-copilots",
    purpose:
      "Equip employees with AI-powered assistants that improve productivity while maintaining human oversight.",
    outcomes: ["Employee productivity", "Faster decision support", "Operational guidance", "Standardized processes"],
  },
  {
    icon: Plug,
    title: "AI Platform Integration",
    slug: "ai-platform-integration",
    purpose: "Integrate AI capabilities into existing enterprise systems.",
    outcomes: ["ERP integration", "CRM enhancement", "Internal applications", "API connectivity"],
  },
  {
    icon: TrendingUp,
    title: "Continuous Optimization",
    slug: "continuous-optimization",
    purpose: "Ensure AI systems continue delivering measurable value after deployment.",
    outcomes: ["Monitoring", "Analytics", "User adoption", "Performance improvement"],
  },
];
