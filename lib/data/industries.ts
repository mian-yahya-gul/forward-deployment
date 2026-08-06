import {
  Activity,
  Factory,
  GraduationCap,
  Landmark,
  LayoutGrid,
  Route,
  type LucideIcon,
} from "lucide-react";

export interface Industry {
  icon: LucideIcon;
  name: string;
  slug: string;
  challenge: string;
  outcome: string;
}

export const industriesIntro = {
  eyebrow: "Industries",
  headline: "We start by understanding how your industry actually works.",
  description:
    "Every industry has unique workflows, regulations, terminology, risks, and success metrics. Our approach begins by understanding your business before recommending AI solutions.",
  cta: { label: "Explore Industries", href: "/industries" },
};

export const industries: Industry[] = [
  {
    icon: Activity,
    name: "Healthcare",
    slug: "healthcare",
    challenge: "Improve access to clinical knowledge and streamline administrative workflows.",
    outcome: "More time for patient care.",
  },
  {
    icon: GraduationCap,
    name: "Education",
    slug: "education",
    challenge: "Reduce administrative overhead so staff and faculty can focus on students.",
    outcome: "More time for teaching and student support.",
  },
  {
    icon: LayoutGrid,
    name: "Retail & E-commerce",
    slug: "retail-ecommerce",
    challenge: "Unify fragmented customer, inventory, and operations data.",
    outcome: "Faster, more consistent customer experience.",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    slug: "manufacturing",
    challenge: "Improve visibility across production, quality, and supply workflows.",
    outcome: "Fewer disruptions and more predictable output.",
  },
  {
    icon: Route,
    name: "Logistics & Supply Chain",
    slug: "logistics-supply-chain",
    challenge: "Coordinate fragmented planning, routing, and inventory systems.",
    outcome: "Faster, more reliable delivery performance.",
  },
  {
    icon: Landmark,
    name: "Financial Services",
    slug: "financial-services",
    challenge: "Streamline compliance-heavy processes without sacrificing accuracy.",
    outcome: "Faster turnaround with stronger controls.",
  },
];
