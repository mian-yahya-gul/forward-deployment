import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { services, servicesIntro } from "@/lib/data/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={servicesIntro.eyebrow}
            title={servicesIntro.headline}
            description={servicesIntro.description}
          />
          <Link
            href={servicesIntro.cta.href}
            className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}
          >
            {servicesIntro.cta.label}
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal as="li" key={service.slug} delay={(index % 3) * 80}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <Card className="h-full">
                  <service.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.purpose}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {service.outcomes.slice(0, 3).map((outcome) => (
                      <li key={outcome} className="text-xs text-foreground/70">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="size-3.5" aria-hidden />
                  </span>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
