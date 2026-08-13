import Link from "next/link";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServicesDisplay } from "@/components/shared/ServiceCarousel";
import { buttonVariants } from "@/components/ui/button";
import { servicesIntro } from "@/lib/data/services";
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

        <div className="mt-12">
          <ServicesDisplay />
        </div>
      </div>
    </section>
  );
}
