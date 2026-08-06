import Link from "next/link";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function FinalCTASection() {
  const { finalCta } = site;

  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <ScrollReveal>
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {finalCta.headline}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {finalCta.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="mt-6 text-sm text-muted">{finalCta.trustStatement}</p>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={finalCta.primaryCta.href} className={buttonVariants({ size: "lg" })}>
              {finalCta.primaryCta.label}
            </Link>
            <Link
              href={finalCta.secondaryCta.href}
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              {finalCta.secondaryCta.label}
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <div className="mt-8 flex items-center justify-center gap-6">
            {finalCta.supportingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-primary hover:decoration-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
