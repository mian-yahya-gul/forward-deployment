import Link from "next/link";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
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
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
