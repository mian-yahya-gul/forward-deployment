import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn, glowCardClass } from "@/lib/utils";
import type { PublicWorkflow } from "@/lib/data/workflows";

interface WorkflowCardProps {
  workflow: PublicWorkflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Link href={`/workflows/${workflow.id}`} className="block h-full">
      <Card className={cn("h-full bg-background", glowCardClass)}>
        <p className="text-xs font-medium tracking-wide text-primary uppercase">
          {workflow.industryName} · {workflow.category}
        </p>
        <h3 className="mt-2 text-base font-semibold text-foreground">{workflow.workflowName}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{workflow.shortDescription}</p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-foreground/60 uppercase">AI handles</p>
            <ul className="mt-1.5 space-y-1">
              {workflow.aiHandles.slice(0, 3).map((item) => (
                <li key={item} className="text-xs leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-foreground/60 uppercase">Human handles</p>
            <ul className="mt-1.5 space-y-1">
              {workflow.humanHandles.slice(0, 3).map((item) => (
                <li key={item} className="text-xs leading-relaxed text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Badge variant="outline">{workflow.deploymentComplexity} complexity</Badge>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover:opacity-100">
            Explore workflow
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </div>
      </Card>
    </Link>
  );
}
