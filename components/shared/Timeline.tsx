import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  number: string;
  title: string;
  content: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  /** Chase-pulses the step circles left to right on a loop when true. */
  animated?: boolean;
}

/**
 * Horizontal stage timeline on desktop, vertical on tablet/mobile.
 * Backs both the Methodology (5 phases) and Process (5 stages) sections.
 */
export function Timeline({ items, className, animated = false }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Connector line spanning circle centers — desktop only. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[22px] right-[10%] left-[10%] hidden h-px bg-border lg:block"
      />
      <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-6">
        {items.map((item, index) => (
          <ScrollReveal
            as="li"
            key={item.number}
            delay={index * 80}
            className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
          >
            <div className="flex flex-col items-center lg:w-full">
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background text-sm font-semibold text-primary",
                  animated && "timeline-pulse",
                )}
                style={animated ? { animationDelay: `${index * 0.5}s` } : undefined}
              >
                {item.number}
              </div>
              {index < items.length - 1 && (
                <span
                  aria-hidden
                  className="mt-2 w-px flex-1 bg-border lg:hidden"
                />
              )}
            </div>
            <div className="pb-2 lg:pt-5">
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <div className="mt-2">{item.content}</div>
            </div>
          </ScrollReveal>
        ))}
      </ol>
    </div>
  );
}
