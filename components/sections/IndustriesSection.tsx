import Link from "next/link";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { IndustryScatterField } from "@/components/shared/IndustryScatterField";
import { buttonVariants } from "@/components/ui/button";
import { industriesIntro } from "@/lib/data/industries";
import { cn } from "@/lib/utils";

export function IndustriesSection() {
  return (
    <section className="border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={industriesIntro.eyebrow}
            title={industriesIntro.headline}
            description={industriesIntro.description}
          />
          <Link
            href={industriesIntro.cta.href}
            className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}
          >
            {industriesIntro.cta.label}
          </Link>
        </div>

        <div className="mt-12">
          <IndustryScatterField />
        </div>
      </div>
    </section>
  );
}
