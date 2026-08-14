import { Quote } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Testimonial } from "@/lib/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="hover:-translate-y-0 hover:shadow-none">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Quote className="size-4 text-primary-hover" aria-hidden />
        </span>
        <Badge variant="outline" className="shrink-0">
        </Badge>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-foreground/90">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-6 border-t border-border pt-4">
        <p className="text-sm font-semibold text-foreground">{testimonial.role}</p>
        <p className="text-sm text-muted">{testimonial.industry}</p>
      </div>
    </Card>
  );
}
