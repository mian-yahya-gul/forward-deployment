"use client";

import { useRef, useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { calculateRoi, roiDefaults, type RoiInputs } from "@/lib/roi";

const currencies = [
  { code: "USD", label: "US dollar ($)" },
  { code: "GBP", label: "Pound (£)" },
  { code: "EUR", label: "Euro (€)" },
  { code: "AED", label: "UAE dirham (AED)" },
  { code: "PKR", label: "Pakistani rupee (PKR)" },
];

type Field = keyof RoiInputs;

const fields: { id: Field; label: string; help: string; step?: number; max: number }[] = [
  { id: "tasksPerMonth", label: "How many times does this task run each month?", help: "For example, tickets, invoices or requests.", max: 1_000_000 },
  { id: "minutesPerTask", label: "How many minutes does one run take?", help: "Include time spent waiting or chasing.", max: 1_440 },
  { id: "hourlyCost", label: "What does an hour of that work cost you?", help: "A rough fully loaded figure is fine.", max: 10_000 },
  { id: "automationPercent", label: "What share could AI handle? (%)", help: "Be cautious: start lower than you think.", max: 100 },
  { id: "reviewPercent", label: "Review time as a share of the automated work (%)", help: "A person checks the AI's output.", max: 100 },
];

export function RoiCalculator() {
  const [values, setValues] = useState<Record<Field, string>>({
    tasksPerMonth: String(roiDefaults.tasksPerMonth),
    minutesPerTask: String(roiDefaults.minutesPerTask),
    hourlyCost: String(roiDefaults.hourlyCost),
    automationPercent: String(roiDefaults.automationPercent),
    reviewPercent: String(roiDefaults.reviewPercent),
  });
  const [currency, setCurrency] = useState("USD");
  const tracked = useRef(false);

  const inputs: RoiInputs = {
    tasksPerMonth: Number(values.tasksPerMonth),
    minutesPerTask: Number(values.minutesPerTask),
    hourlyCost: Number(values.hourlyCost),
    automationPercent: Number(values.automationPercent),
    reviewPercent: Number(values.reviewPercent),
  };
  const result = calculateRoi(inputs);

  const money = new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 });
  const hours = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (!tracked.current) {
      tracked.current = true;
      trackEvent("roi_calculator_used");
    }
  }

  const bookingHref = `/contact?q=${encodeURIComponent(
    `ROI estimate: about ${hours.format(result.netHoursSaved)} hours saved per month`,
  )}#book`;

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form className="space-y-5" onSubmit={(event) => event.preventDefault()} aria-label="Savings inputs">
        {fields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={`roi-${field.id}`}>{field.label}</Label>
            <Input
              id={`roi-${field.id}`}
              type="number"
              inputMode="decimal"
              min={0}
              max={field.max}
              value={values[field.id]}
              onChange={(event) => update(field.id, event.target.value)}
              className="mt-2"
            />
            <p className="mt-1 text-xs text-muted">{field.help}</p>
          </div>
        ))}
        <div>
          <Label htmlFor="roi-currency">Currency</Label>
          <select
            id="roi-currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="mt-2 flex h-11 w-full rounded-[var(--radius-sm)] border border-border bg-background px-3.5 text-sm text-foreground focus-visible:border-primary focus-visible:outline-none"
          >
            {currencies.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-6 lg:self-start" aria-live="polite">
        <p className="text-sm font-medium tracking-wide text-primary uppercase">Your estimate</p>

        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-sm text-muted">Hours saved per month</dt>
            <dd className="text-3xl font-semibold tracking-tight text-foreground">{hours.format(result.netHoursSaved)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Estimated saving per month</dt>
            <dd className="text-3xl font-semibold tracking-tight text-foreground">{money.format(result.monthlySavings)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Estimated saving per year</dt>
            <dd className="text-3xl font-semibold tracking-tight text-foreground">{money.format(result.annualSavings)}</dd>
          </div>
        </dl>

        <p className="mt-5 text-sm leading-relaxed text-muted">
          Today this work takes about {hours.format(result.hoursBefore)} hours a month. Of that, roughly{" "}
          {hours.format(result.hoursAutomated)} hours could be handled by AI, and about {hours.format(result.reviewHours)}{" "}
          hours would go on review.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          This is an estimate from the numbers you entered. It leaves out the cost of building and running the system,
          and it isn&apos;t a prediction or a guarantee of results.
        </p>

        <Link href={bookingHref} className={`${buttonVariants({ size: "lg" })} mt-6`}>
          Talk through your numbers
        </Link>
      </div>
    </div>
  );
}
