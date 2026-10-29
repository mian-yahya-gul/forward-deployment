"use client";

import { useState } from "react";
import Link from "next/link";

import { EmailCopyForm } from "@/components/tools/EmailCopyForm";
import { Button, buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { isComplete, questions, recommend, type Answers } from "@/lib/assessment";
import { cn } from "@/lib/utils";

/**
 * Six questions, one at a time, with a result that explains itself. The same scoring runs on the server
 * for emailed results (lib/assessment.ts), so what the visitor sees is what they'd be sent.
 */
export function AssessmentTool() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const question = questions[step];
  const value = answers[question.id];
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const answered = selected.length > 0;
  const isLast = step === questions.length - 1;

  function choose(optionId: string) {
    setAnswers((current) => {
      if (question.multiple) {
        const existing = Array.isArray(current[question.id]) ? (current[question.id] as string[]) : [];
        const next = existing.includes(optionId) ? existing.filter((id) => id !== optionId) : [...existing, optionId];
        return { ...current, [question.id]: next };
      }
      return { ...current, [question.id]: optionId };
    });
  }

  function next() {
    if (!isLast) {
      setStep(step + 1);
      return;
    }
    if (isComplete(answers)) {
      setDone(true);
      trackEvent("assessment_completed");
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  if (done) {
    const result = recommend(answers);
    const bookingHref = `/contact?q=${encodeURIComponent(`Assessment: ${result.recommendations.map((r) => r.title).join(", ")}`)}#book`;

    return (
      <div className="space-y-8" aria-live="polite">
        <div>
          <p className="text-sm font-medium tracking-wide text-primary uppercase">Your starting point</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Three services worth looking at first
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{result.nextStep}</p>
        </div>

        <ol className="space-y-4">
          {result.recommendations.map((recommendation, index) => (
            <li key={recommendation.slug} className="rounded-[var(--radius-md)] border border-border p-5">
              <p className="text-xs font-medium tracking-wide text-muted uppercase">Suggestion {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{recommendation.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{recommendation.purpose}</p>
              <Link
                href={recommendation.href}
                className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Read about {recommendation.title}
              </Link>
            </li>
          ))}
        </ol>

        {result.industry && (
          <p className="text-sm text-muted">
            See how this applies in your industry:{" "}
            <Link href={result.industry.href} className="font-medium text-primary underline-offset-4 hover:underline">
              {result.industry.name}
            </Link>
            .
          </p>
        )}

        <p className="text-sm text-muted">
          This is a starting point based on your answers. It is not a technical audit, and it doesn&apos;t predict
          results.
        </p>

        <div className="flex flex-col gap-4 border-t border-border pt-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={bookingHref} className={buttonVariants({ size: "lg" })}>
              Book a Discovery Call
            </Link>
            <Button variant="secondary" size="lg" onClick={restart}>
              Start again
            </Button>
          </div>
          <EmailCopyForm id="assessment" noun="results" payload={{ kind: "assessment", answers }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted" aria-live="polite">
        Question {step + 1} of {questions.length}
      </p>
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={step + 1}
        aria-label="Assessment progress"
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
      </div>

      <fieldset className="mt-8">
        <legend className="text-xl font-semibold tracking-tight text-foreground">{question.prompt}</legend>
        {question.help && <p className="mt-1 text-sm text-muted">{question.help}</p>}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {question.options.map((option) => {
            const checked = selected.includes(option.id);
            return (
              <label
                key={option.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3 text-sm transition-colors duration-[var(--duration-fast)] focus-within:border-primary",
                  checked ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted hover:border-primary/40",
                )}
              >
                <input
                  type={question.multiple ? "checkbox" : "radio"}
                  name={question.id}
                  checked={checked}
                  onChange={() => choose(option.id)}
                  className="size-4 accent-[var(--primary)]"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex gap-3">
        <Button variant="secondary" onClick={() => setStep(step - 1)} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={next} disabled={!answered}>
          {isLast ? "See my results" : "Next"}
        </Button>
      </div>
    </div>
  );
}
