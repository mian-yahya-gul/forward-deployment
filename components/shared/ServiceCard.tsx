import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn, glowCardClass } from "@/lib/utils";
import type { Service } from "@/lib/data/services";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <Card className={cn("h-full", glowCardClass)}>
        <service.icon className="size-6 text-primary" aria-hidden />
        <h3 className="mt-4 text-base font-semibold text-foreground">{service.title}</h3>
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
  );
}
