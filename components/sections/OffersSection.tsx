import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { offers } from "@/lib/data/offers";
import { cn, glowCardClass } from "@/lib/utils";

export function OffersSection() {
  return (
    <section id="offers" className="scroll-mt-[var(--header-height)] border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What We Do"
            title="Three ways to put AI engineering to work."
            description="Defined engagements with clear scope, so you know what you are getting before work starts. Prices are indicative starting ranges in USD, not quotations."
          />
          <Link href="/services#packages" className={cn(buttonVariants({ variant: "secondary" }), "shrink-0")}>
            See scope &amp; exclusions
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <ScrollReveal as="li" key={offer.id} delay={index * 80} className="h-full">
              <Card className={cn("flex h-full flex-col bg-background", glowCardClass)}>
                <offer.icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{offer.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{offer.tagline}</p>
                <p className="mt-5 text-2xl font-semibold text-foreground">{offer.price}</p>
                <p className="mt-1 text-xs text-muted">Indicative starting range. Hosting, third-party API usage and support are scoped separately.</p>
                <p className="mt-3 text-sm text-foreground/90">
                  <span className="font-medium">Indicative timeline:</span> {offer.timelineShort}.{" "}
                  <span className="text-muted">An estimate, not a guaranteed delivery date.</span>
                </p>
                <Link
                  href={`/services#${offer.id}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  View scope and deliverables
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </Card>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
