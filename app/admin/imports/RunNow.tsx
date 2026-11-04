"use client";

import { useEffect, useState } from "react";

import { api } from "@/app/admin/leads/leadTypes";

type Status = { running: boolean; started?: string; log?: string };

/** Starts an import on the Mac (through the local Lead Database service) and shows its progress. */
export function RunNow() {
  const [st, setSt] = useState<Status | null>(null);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    let live = true;
    const tick = () => api<Status>("imports/status").then((r) => { if (live && r.ok) setSt(r.data); });
    tick();
    const t = setInterval(tick, 5000);
    return () => { live = false; clearInterval(t); };
  }, []);
  const run = async () => {
    setMsg("");
    const r = await api<{ message?: string }>("imports/run", {});
    setMsg(r.ok ? (r.data.message ?? "Started.") : (r.data.error ?? "Could not start"));
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button onClick={run} disabled={st?.running} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">{st?.running ? "Import running…" : "Run import now"}</button>
        {msg ? <span className="text-sm text-muted">{msg}</span> : null}
      </div>
      {st?.log ? <pre className="max-h-48 overflow-auto rounded-lg border border-border bg-surface/60 p-3 text-xs">{st.log}</pre> : null}
    </div>
  );
}
