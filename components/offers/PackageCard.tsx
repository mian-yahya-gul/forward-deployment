import Link from "next/link";
import { Check, X } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import type { Offer } from "@/lib/data/offers";
import { cn, glowCardClass } from "@/lib/utils";

function Group({ label, items, icon }: { label: string; items: string[]; icon?: "check" | "x" }) {
  return (
    <div>
      <h4 className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
            {icon === "check" && <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />}
            {icon === "x" && <X className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Full detail card for one engagement package (used on /services#packages). */
export function PackageCard({ offer, index }: { offer: Offer; index: number }) {
  return (
    <ScrollReveal as="li" delay={index * 80} className="h-full">
      <Card id={offer.id} className={cn("flex h-full scroll-mt-[var(--header-height)] flex-col", glowCardClass)}>
        <offer.icon className="size-6 text-primary" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-foreground">{offer.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{offer.tagline}</p>

        <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">{offer.price}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">{offer.priceNote} Indicative, not a quotation.</p>

        <div className="mt-6 flex-1 space-y-6">
          <Group label="Ideal for" items={offer.idealFor} />
          <Group label="Problems addressed" items={offer.problems} />
          <Group label="What is included" items={offer.included} icon="check" />
          <Group label="Scope boundaries" items={offer.boundaries} />
          <Group label="Not included" items={offer.excluded} icon="x" />
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-muted uppercase">Indicative timeline</h4>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">{offer.timeline}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-muted uppercase">Next steps</h4>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
              {offer.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <Link href={offer.cta.href} className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full justify-center")}>
          {offer.cta.label}
        </Link>
      </Card>
    </ScrollReveal>
  );
}
