"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, Hand, Play, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { FlowActor } from "@/lib/data/workflows";
import { cn } from "@/lib/utils";

interface WorkflowWalkthroughProps {
  workflowId: string;
  steps: string[];
  actors: FlowActor[];
  aiHandles: string[];
  humanHandles: string[];
  systems: string[];
  data: string[];
}

const actorMeta: Record<FlowActor, { label: string; icon: typeof Bot; blurb: string }> = {
  trigger: { label: "What starts it", icon: Play, blurb: "This is the event that sets the workflow in motion." },
  ai: { label: "AI does this", icon: Bot, blurb: "This part is handled by AI, working with the systems below." },
  handoff: { label: "Hand-off to a person", icon: Hand, blurb: "The AI stops here and passes the case to a person, with the context it gathered." },
  human: { label: "A person takes over", icon: User, blurb: "A person makes the decision. This is where human judgment stays in charge." },
  outcome: { label: "Result", icon: CheckCircle2, blurb: "The work is completed and recorded." },
};

/**
 * Click-through of a workflow's published steps, showing who acts at each one. Built entirely from the
 * workflow's own fields (steps, what AI handles, what stays human, systems, data) — it is a guided
 * view of the page's content, not a live system or customer data.
 */
export function WorkflowWalkthrough({
  workflowId,
  steps,
  actors,
  aiHandles,
  humanHandles,
  systems,
  data,
}: WorkflowWalkthroughProps) {
  const [index, setIndex] = useState(0);
  const [used, setUsed] = useState(false);

  const actor = actors[index] ?? "ai";
  const meta = actorMeta[actor];
  const Icon = meta.icon;
  const aiCount = actors.filter((item) => item === "ai").length;
  const humanCount = actors.filter((item) => item === "human").length;

  function go(next: number) {
    setIndex(Math.min(Math.max(next, 0), steps.length - 1));
    if (!used) {
      setUsed(true);
      trackEvent("workflow_walkthrough_used", { workflow: workflowId });
    }
  }

  const details =
    actor === "ai" ? aiHandles : actor === "human" ? humanHandles : actor === "trigger" ? data : [];
  const detailsTitle =
    actor === "ai" ? "What the AI handles in this workflow" : actor === "human" ? "What stays with people" : "Information involved";

  return (
    <div>
      <ol className="flex flex-wrap items-center gap-2" aria-label="Workflow steps">
        {steps.map((step, i) => (
          <li key={step}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-current={i === index ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${step}`}
              className={cn(
                "flex size-9 items-center justify-center rounded-full border text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                i === index
                  ? "border-primary bg-primary text-primary-foreground"
                  : i < index
                    ? "border-primary/50 text-primary"
                    : "border-border text-muted hover:border-primary/40",
              )}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ol>

      <div
        className="mt-6 rounded-[var(--radius-lg)] border border-border bg-background p-6"
        aria-live="polite"
        data-testid="walkthrough-panel"
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-full",
              actor === "ai" ? "bg-primary/15 text-primary" : "bg-surface text-foreground",
            )}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              Step {index + 1} of {steps.length} · {meta.label}
            </p>
            <h3 className="text-lg font-semibold text-foreground">{steps[index]}</h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">{meta.blurb}</p>

        {details.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-foreground">{detailsTitle}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {details.map((item) => (
                <li key={item}>
                  <Badge variant={actor === "ai" ? "primary" : "outline"}>{item}</Badge>
                </li>
              ))}
            </ul>
          </div>
        )}

        {(actor === "ai" || actor === "outcome") && systems.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-foreground">Systems typically involved</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {systems.map((system) => (
                <li key={system}>
                  <Badge>{system}</Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => go(index - 1)} disabled={index === 0}>
            <ArrowLeft aria-hidden /> Back
          </Button>
          {index < steps.length - 1 ? (
            <Button onClick={() => go(index + 1)}>
              Next step <ArrowRight aria-hidden />
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => go(0)}>
              Start again
            </Button>
          )}
        </div>
        <p className="text-sm text-muted">
          {aiCount} of {steps.length} steps are AI work and {humanCount} {humanCount === 1 ? "is" : "are"} a
          person&apos;s. The rest are triggers, hand-offs or results.
        </p>
      </div>

      <p className="mt-4 text-xs text-muted">
        An illustrative walkthrough of this workflow&apos;s published steps. It isn&apos;t a live system or real customer
        data, and the actual design depends on your own processes and systems.
      </p>
    </div>
  );
}
