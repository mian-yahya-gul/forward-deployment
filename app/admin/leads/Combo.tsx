"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { num } from "@/app/admin/leads/leadTypes";

export type Opt = { value: string; label: string; count?: number };

/** Searchable dropdown with a count beside every option. */
export function Combo({ label, value, options, onChange, placeholder, disabled, allLabel }: {
  label: string; value: string; options: Opt[]; onChange: (v: string) => void; placeholder?: string; disabled?: boolean; allLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return (t ? options.filter((o) => o.label.toLowerCase().includes(t)) : options).slice(0, 200);
  }, [options, q]);
  const current = options.find((o) => o.value === value);
  return (
    <div ref={ref} className="relative min-w-[11rem] flex-1">
      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">{label}</div>
      <button type="button" disabled={disabled} onClick={() => setOpen((v) => !v)} aria-haspopup="listbox" aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm disabled:opacity-50">
        <span className="truncate">{current ? current.label : value ? value : placeholder ?? "Select"}</span>
        <span className="shrink-0 text-xs text-muted">{current?.count !== undefined ? num(current.count) : "▾"}</span>
      </button>
      {open ? (
        <div className="absolute z-40 mt-1 w-full min-w-[16rem] rounded-xl border border-border bg-background shadow-xl">
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="w-full rounded-t-xl border-b border-border bg-transparent px-3 py-2 text-sm outline-none" />
          <ul role="listbox" className="max-h-72 overflow-y-auto py-1 text-sm">
            {allLabel ? <li><button type="button" onClick={() => { onChange(""); setOpen(false); setQ(""); }} className="flex w-full justify-between px-3 py-1.5 text-left hover:bg-foreground/5"><span>{allLabel}</span></button></li> : null}
            {shown.map((o) => (
              <li key={o.value}><button type="button" role="option" aria-selected={o.value === value} onClick={() => { onChange(o.value); setOpen(false); setQ(""); }}
                className={`flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left hover:bg-foreground/5 ${o.value === value ? "bg-primary/10" : ""}`}>
                <span className="truncate">{o.label}</span>{o.count !== undefined ? <span className="shrink-0 text-xs tabular-nums text-muted">{num(o.count)}</span> : null}</button></li>
            ))}
            {!shown.length ? <li className="px-3 py-2 text-muted">No match</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
