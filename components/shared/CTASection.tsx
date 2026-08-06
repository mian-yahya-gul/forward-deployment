import Link from "next/link";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaLink {
  label: string;
  href: string;
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

/** Generic consultative CTA block for sub-pages. The homepage uses its own FinalCTASection copy. */
export function CTASection({ title, description, primaryCta, secondaryCta }: CTASectionProps) {
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={primaryCta.href} className={buttonVariants({ size: "lg" })}>
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
