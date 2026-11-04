"use client";

import { useMemo, useState } from "react";

import { CatNode, nice, num } from "@/app/admin/leads/leadTypes";

type Sel = [string, string];

/** Business type tree (parent, child, grandchild) with multi-select and counts. */
export function CategoryTree({ nodes, selected, onChange }: { nodes: CatNode[]; selected: Sel[]; onChange: (s: Sel[]) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState("");
  const isSel = (n: CatNode) => selected.some(([l, v]) => l === n.level && v === n.value);
  const toggle = (n: CatNode) => {
    if (n.value === null) return;
    onChange(isSel(n) ? selected.filter(([l, v]) => !(l === n.level && v === n.value)) : [...selected, [n.level, n.value]]);
  };
  const t = q.trim().toLowerCase();
  const match = (n: CatNode): boolean => nice(n.label).toLowerCase().includes(t) || n.children.some(match);
  const view = useMemo(() => (t ? nodes.filter(match) : nodes), [nodes, t]); // eslint-disable-line react-hooks/exhaustive-deps
  const render = (list: CatNode[], depth: number, path: string) => (
    <ul className={depth ? "ml-4 border-l border-border pl-2" : ""}>
      {list.filter((n) => !t || match(n)).slice(0, 80).map((n) => {
        const id = `${path}/${n.label}`;
        const expanded = open[id] || Boolean(t);
        return (
          <li key={id}>
            <div className="flex items-center gap-1.5 py-0.5">
              {n.children.length ? <button type="button" aria-label={expanded ? "Collapse" : "Expand"} onClick={() => setOpen({ ...open, [id]: !open[id] })} className="w-4 text-xs text-muted">{expanded ? "▾" : "▸"}</button> : <span className="w-4" />}
              <label className="flex flex-1 cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={isSel(n)} disabled={n.value === null} onChange={() => toggle(n)} />
                <span className="truncate">{nice(n.label)}</span><span className="ml-auto text-xs tabular-nums text-muted">{num(n.count)}</span>
              </label>
            </div>
            {expanded && n.children.length ? render(n.children, depth + 1, id) : null}
          </li>
        );
      })}
    </ul>
  );
  return (
    <div>
      <div className="mb-1 flex items-center justify-between"><div className="text-xs font-medium uppercase tracking-wide text-muted">Business type</div>{selected.length ? <button type="button" onClick={() => onChange([])} className="text-xs text-primary">Clear ({selected.length})</button> : null}</div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search types…" className="mb-2 w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm" />
      <div className="max-h-72 overflow-y-auto rounded-lg border border-border p-2">{view.length ? render(view, 0, "") : <p className="px-1 py-2 text-sm text-muted">No types</p>}</div>
    </div>
  );
}
