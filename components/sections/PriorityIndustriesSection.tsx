import Link from "next/link";
import { ArrowRight, Factory, Plane, ShoppingCart, type LucideIcon } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { industries } from "@/lib/data/industries";
import { cn, glowCardClass } from "@/lib/utils";

interface PriorityIndustry {
  icon: LucideIcon;
  title: string;
  description: string;
  typical: string[];
  links: { label: string; href: string }[];
}

// "Typical work" lists the kinds of workflow we scope in these sectors. They are capabilities, not claims of completed deployments.
const priorityIndustries: PriorityIndustry[] = [
  {
    icon: ShoppingCart,
    title: "Retail & Distribution",
    description: "Stock, replenishment and order workflows that still run on spreadsheets and manual paperwork.",
    typical: ["Stock reporting and replenishment", "Order and document generation", "Inventory visibility across channels"],
    links: [
      { label: "Retail & E-commerce", href: "/industries/retail-ecommerce" },
      { label: "Logistics & Supply Chain", href: "/industries/logistics-supply-chain" },
    ],
  },
  {
    icon: Plane,
    title: "Travel & Ticketing",
    description: "High-volume, rules-based booking and service work where agents should focus on the exceptions.",
    typical: ["Booking and fare-query handling", "Disruption and rebooking support", "Group and corporate booking coordination"],
    links: [
      { label: "Airline & Ticketing", href: "/industries/airline-ticketing" },
      { label: "Hospitality & Travel", href: "/industries/hospitality-travel" },
    ],
  },
  {
    icon: Factory,
    title: "Manufacturing & Operations",
    description: "Production, quality and maintenance data that exists but is not connected or visible in time.",
    typical: ["Production visibility and reporting", "Quality and exception tracking", "Maintenance and operations coordination"],
    links: [{ label: "Manufacturing", href: "/industries/manufacturing" }],
  },
];

export function PriorityIndustriesSection() {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Where We Focus"
            title="Operations-heavy industries where workflows can be automated."
            description="We start where manual, repetitive work is most expensive. Typical work below describes what we scope in each sector, not completed client deployments."
          />
          <Link href="/industries" className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}>
            All {industries.length} industries
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {priorityIndustries.map((item, index) => (
            <ScrollReveal as="li" key={item.title} delay={index * 80} className="h-full">
              <Card className={cn("flex h-full flex-col bg-background", glowCardClass)}>
                <item.icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                <p className="mt-4 text-xs font-semibold tracking-wide text-muted uppercase">Typical work</p>
                <ul className="mt-2 flex-1 list-disc space-y-1 pl-5 text-sm text-foreground/90">
                  {item.typical.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary"
                    >
                      {link.label}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
