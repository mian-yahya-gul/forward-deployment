import Link from "next/link";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn, gradientHeadingClass } from "@/lib/utils";

interface CtaLink {
  label: string;
  href: string;
}

interface PageHeroProps {
  breadcrumbs?: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
}

export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="border-b border-border pt-[calc(var(--header-height)+48px)] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1280px] px-6">
        {breadcrumbs && <div className="mb-8">{breadcrumbs}</div>}

        <p className="text-sm font-medium tracking-wide text-primary uppercase">{eyebrow}</p>
        <h1
          className={cn(
            "mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl",
            gradientHeadingClass,
          )}
        >
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryCta && (
              <Link href={primaryCta.href} className={buttonVariants({ size: "lg" })}>
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
