import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CoverArt } from "@/components/shared/CoverArt";
import type { Article } from "@/lib/data/insights";

interface InsightCardProps {
  insight: Article;
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Link href={insight.href} className="block h-full">
      <Card className="h-full overflow-hidden p-0">
        <CoverArt seed={insight.slug} className="aspect-[16/9] border-b border-border" />
        <div className="p-6">
          <Badge>{insight.category}</Badge>
          <h3 className="mt-4 text-base font-semibold text-foreground underline-offset-4 group-hover:underline">
            {insight.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{insight.summary}</p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs font-medium text-muted">{insight.readingTime}</p>
            <ArrowRight
              className="size-3.5 text-primary opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100"
              aria-hidden
            />
          </div>
        </div>
      </Card>
    </Link>
  );
}
