"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { RingCarousel } from "@/components/shared/RingCarousel";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useCarouselMode } from "@/lib/motion";
import { cn, glowCardClass } from "@/lib/utils";
import { services, type Service } from "@/lib/data/services";

/**
 * `services` (including each icon component) is imported directly here
 * rather than passed down as a prop — icon components can't cross the
 * server/client boundary as serialized props, so this whole module needs to
 * own the import.
 */
export function ServicesDisplay() {
  const showCarousel = useCarouselMode();

  return (
    <>
      {showCarousel && (
        <RingCarousel
          items={services}
          getKey={(service) => service.slug}
          getLabel={(service) => service.title}
          renderCard={(service, isFront) => <ServiceFace service={service} isFront={isFront} />}
        />
      )}
      <ul
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          showCarousel && "hidden",
        )}
      >
        {services.map((service, index) => (
          <ScrollReveal as="li" key={service.slug} delay={(index % 3) * 80}>
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
          </ScrollReveal>
        ))}
      </ul>
    </>
  );
}

function ServiceFace({ service, isFront }: { service: Service; isFront: boolean }) {
  return (
    <Link href={`/services/${service.slug}`} className="block">
      <Card
        className={cn(
          "h-[300px]",
          glowCardClass,
          isFront &&
            "border-primary/60 shadow-[0_0_0_2px_color-mix(in_srgb,var(--primary)_28%,transparent),0_0_32px_-2px_color-mix(in_srgb,var(--primary)_65%,transparent),0_20px_45px_-20px_rgba(0,0,0,0.35)]",
        )}
      >
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
        {isFront && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Learn more
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        )}
      </Card>
    </Link>
  );
}
