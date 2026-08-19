"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { methodologyPhases } from "@/lib/data/methodology";
import { cn, glowCardClass } from "@/lib/utils";

/**
 * The first four phases read as a short, fixed outcome tag rather than
 * the full objective sentence — a terminal log entry, not a paraphrase of
 * the Timeline's own copy below it.
 */
const PHASE_TAGS: Record<string, string> = {
  Discover: "workflows mapped",
  Prioritize: "opportunities scored",
  Design: "architecture & governance set",
  Deploy: "integrated & tested",
};

const CHAR_DELAY_MS = 20;
const LINE_PAUSE_MS = 180;
const RESTART_DELAY_MS = 2400;

interface LogLine {
  key: string;
  prefix: React.ReactNode;
  text: string;
  textClass: string;
}

/**
 * A faux deployment-log illustration of the same five methodology phases
 * the Timeline below it lists in full — concrete stand-in for "production,
 * not a demo" rather than another icon-and-copy summary. Built entirely
 * from theme tokens (bg-background, text-foreground/muted/primary) rather
 * than fixed dark-terminal colors, so it's a light terminal in light mode
 * and a dark one in dark mode, like the rest of the site.
 *
 * Each line's icon/glyph appears immediately, then its text types in
 * character by character (like token streaming) before the next line
 * starts — then the whole log holds and loops. Skipped entirely for
 * prefers-reduced-motion, which just shows the finished log.
 */
export function DeploymentLogCard() {
  const [discover, prioritize, design, deploy, optimize] = methodologyPhases;
  const completedPhases = [discover, prioritize, design, deploy];

  const lines: LogLine[] = [
    ...completedPhases.map((phase) => ({
      key: phase.number,
      prefix: <Check className="size-3.5 shrink-0 text-primary" aria-hidden />,
      text: `${phase.title} — ${PHASE_TAGS[phase.title]}`,
      textClass: "text-foreground/80",
    })),
    {
      key: "optimize",
      prefix: <ArrowRight className="size-3.5 shrink-0 text-muted" aria-hidden />,
      text: `${optimize.title} — monitoring in production…`,
      textClass: "text-foreground/80",
    },
    {
      key: "live",
      prefix: <span className="status-blink size-1.5 shrink-0 rounded-full bg-primary" />,
      text: "Live in production",
      textClass: "text-foreground",
    },
  ];

  const [lineIndex, setLineIndex] = useState(lines.length);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeLine = (line: number, char: number) => {
      if (cancelled) return;
      setLineIndex(line);
      setCharCount(char);

      const currentLength = lines[line]?.text.length ?? 0;

      if (line >= lines.length) {
        timeoutId = setTimeout(() => typeLine(0, 0), RESTART_DELAY_MS);
      } else if (char < currentLength) {
        timeoutId = setTimeout(() => typeLine(line, char + 1), CHAR_DELAY_MS);
      } else {
        timeoutId = setTimeout(() => typeLine(line + 1, 0), LINE_PAUSE_MS);
      }
    };

    timeoutId = setTimeout(() => typeLine(0, 0), CHAR_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn("overflow-hidden rounded-[var(--radius-lg)] border bg-background", glowCardClass)}
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <span className="status-blink size-2 rounded-full bg-primary" />
        <span className="font-mono text-xs text-muted">DeosAi Labs &middot; deployment process</span>
      </div>

      <div className="space-y-2.5 px-5 py-5 font-mono text-sm">
        {lines.map((line, i) => {
          const isDone = i < lineIndex;
          const isActive = i === lineIndex;
          const shown = isDone ? line.text.length : isActive ? charCount : 0;

          return (
            <p key={line.key} className={`flex items-center gap-2 ${line.textClass}`}>
              {(isDone || (isActive && shown > 0)) && line.prefix}
              <span>
                {line.text.slice(0, shown)}
                {isActive && shown < line.text.length && (
                  <span className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] bg-foreground/70 status-blink" />
                )}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
}
