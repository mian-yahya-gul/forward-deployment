import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn, glowCardClass } from "@/lib/utils";
import { categoryMeta, type Story } from "@/lib/data/stories";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const meta = categoryMeta[story.category];
  return (
    <Link href={story.href} className="block h-full">
      <Card className={cn("h-full", glowCardClass)}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={story.category === "real-implementation" ? "primary" : "outline"}>{meta.shortLabel}</Badge>
          <Badge>{story.industry}</Badge>
          {story.status === "draft" && <Badge variant="outline">Draft, not public</Badge>}
        </div>
        <h3 className="mt-4 text-base font-semibold text-foreground">{story.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{story.summary}</p>
        {story.beforeAfter && (
          <p className="mt-3 text-sm font-medium text-primary">
            {story.beforeAfter.before} → {story.beforeAfter.after}
          </p>
        )}
      </Card>
    </Link>
  );
}
