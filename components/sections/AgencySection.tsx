import Link from "next/link";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { agencyHero, agencyCapabilities } from "@/lib/data/partners";
import { cn } from "@/lib/utils";

export function AgencySection() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        <ScrollReveal className="lg:col-span-6">
          <SectionHeading
            eyebrow="For Agencies & Consultancies"
            title={agencyHero.title}
            description="DeosAI Labs works behind the scenes as the engineering and implementation partner for software agencies, ERP implementers, digital transformation consultancies and IT service providers. White-label work from $600, scoped per project."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/partners" className={buttonVariants({ size: "lg" })}>
              Explore White-label Partnerships
            </Link>
            <Link href="/partners#partner-enquiry" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
              Make a Partnership Enquiry
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} className="lg:col-span-6">
          <Card className="bg-surface">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">What we can deliver for your clients</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {agencyCapabilities.map((capability) => (
                <li key={capability.title} className="flex items-start gap-2 text-sm text-foreground/90">
                  <capability.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  {capability.title}
                </li>
              ))}
            </ul>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
