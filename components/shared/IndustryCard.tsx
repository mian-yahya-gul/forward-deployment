import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn, glowCardClass } from "@/lib/utils";
import type { Industry } from "@/lib/data/industries";

interface IndustryCardProps {
  industry: Industry;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  return (
    <Link href={`/industries/${industry.slug}`} className="block h-full">
      <Card className={cn("h-full bg-background", glowCardClass)}>
        <industry.icon className="size-6 text-primary" aria-hidden />
        <h3 className="mt-4 text-base font-semibold text-foreground">{industry.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{industry.challenge}</p>
        <p className="mt-3 text-sm font-medium text-primary">{industry.outcome}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100">
          Explore Industry
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </Card>
    </Link>
  );
}
