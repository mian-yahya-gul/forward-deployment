import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Story } from "@/lib/data/stories";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={story.href} className="block h-full">
      <Card className="h-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{story.industry}</Badge>
          {story.illustrative && <Badge variant="outline">Illustrative</Badge>}
        </div>
        <h3 className="mt-4 text-base font-semibold text-foreground">{story.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{story.challenge}</p>
        <p className="mt-3 text-sm font-medium text-primary">{story.outcome}</p>
      </Card>
    </Link>
  );
}
