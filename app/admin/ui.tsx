import type { ReactNode } from "react";

/** Small presentational helpers for the owner dashboard. Server-safe, token-based colours so light and dark both work. */

export const SECTORS: Record<string, string> = {
  software_agency: "Software agency", ai_agency: "AI agency", erp_partner: "ERP partner", digital_transformation: "Digital transformation",
  direct: "Direct", wholesale_distribution: "Wholesale and distribution", logistics_freight: "Freight and logistics", accountancy_bookkeeping: "Accountancy",
};
export const sectorLabel = (c: string) => SECTORS[c] ?? c.replace(/_/g, " ");

export function ago(iso: string | undefined | null): string {
  if (!iso) return "never";
  const t = new Date(iso.includes("T") ? iso : iso.replace(" ", "T")).getTime();
  if (Number.isNaN(t)) return iso;
  const m = Math.max(0, Math.round((Date.now() - t) / 60000));
  if (m < 2) return "just now";
  if (m < 90) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 36) return `${h} h ago`;
  return `${Math.round(h / 24)} days ago`;
}

export function hoursSince(iso: string): number {
  const t = new Date(iso.includes("T") ? iso : iso.replace(" ", "T")).getTime();
  return Number.isNaN(t) ? 0 : Math.round((Date.now() - t) / 3_600_000);
}

type Tone = "good" | "warn" | "bad" | "info" | "neutral";
const TONES: Record<Tone, string> = {
  good: "bg-success/12 text-success ring-success/25", warn: "bg-warning/12 text-warning ring-warning/25", bad: "bg-danger/12 text-danger ring-danger/25",
  info: "bg-info/12 text-info ring-info/25", neutral: "bg-foreground/6 text-muted ring-foreground/10",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${TONES[tone]}`}>{children}</span>;
}

export const assessTone = (a: string): Tone => (a === "PASS" ? "good" : a === "REVIEW" ? "warn" : a === "BLOCK" ? "bad" : "neutral");
export const deliveryTone = (d: string | null): Tone => (d === "delivered" ? "good" : d === "bounced" || d === "complained" || d === "failed" ? "bad" : d === "accepted" || d === "delayed" ? "warn" : "neutral");
export const statusTone = (s: string): Tone =>
  ["replied", "interested", "call_booked", "call_done", "proposal", "won"].includes(s) ? "good" : ["bounced", "do_not_contact", "declined", "unsuitable", "lost"].includes(s) ? "bad" : s === "contacted" ? "info" : "neutral";

export function Card({ title, hint, children, className = "" }: { title?: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-border bg-surface/60 p-5 ${className}`}>
      {title ? (
        <header className="mb-3 flex items-baseline justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
          {hint ? <span className="text-xs text-muted">{hint}</span> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function Stat({ label, value, sub, tone }: { label: string; value: ReactNode; sub?: string; tone?: Tone }) {
  const color = tone === "bad" ? "text-danger" : tone === "warn" ? "text-warning" : tone === "good" ? "text-success" : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-muted">{label}</div>
      <div className={`mt-1 text-2xl font-semibold tabular-nums ${color}`}>{value}</div>
      {sub ? <div className="mt-0.5 text-xs text-muted">{sub}</div> : null}
    </div>
  );
}

export function Bar({ value, max, tone = "info" }: { value: number; max: number | null; tone?: Tone }) {
  const pct = max ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const fill = tone === "bad" ? "bg-danger" : tone === "warn" ? "bg-warning" : tone === "good" ? "bg-success" : "bg-primary";
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max ?? 0}>
      <div className={`h-full rounded-full ${fill}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted">{children}</p>;
}

export function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <th className={`whitespace-nowrap border-b border-border px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-muted ${className}`}>{children}</th>;
}
export function Td({ children, className = "", title }: { children?: ReactNode; className?: string; title?: string }) {
  return <td title={title} className={`border-b border-border/70 px-3 py-2.5 align-top ${className}`}>{children}</td>;
}
export function TableWrap({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <div className="overflow-x-auto rounded-xl border border-border"><table className={`w-full border-collapse text-sm ${compact ? "" : "min-w-[680px]"}`}>{children}</table></div>;
}
