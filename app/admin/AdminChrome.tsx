import Link from "next/link";

import { logoutAction, stopSendingAction } from "@/app/admin/actions";
import { Badge, ago } from "@/app/admin/ui";

export const ADMIN_TABS = [
  ["overview", "Overview", "/admin?tab=overview"], ["sent", "Sent emails", "/admin?tab=sent"], ["prospects", "Prospects", "/admin?tab=prospects"],
  ["replies", "Replies", "/admin?tab=replies"], ["events", "Delivery log", "/admin?tab=events"], ["leads", "Lead Database", "/admin/leads"], ["imports", "Imports", "/admin/imports"],
] as const;

/** Shared header and navigation for every owner-only page. */
export function AdminChrome({ active, stopped, updated, stale }: { active: string; stopped?: boolean; updated?: string; stale?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="text-base font-semibold tracking-tight">DeosAI Labs <span className="text-muted">/ Outreach</span></div>
          {stopped !== undefined ? <Badge tone={stopped ? "bad" : "good"}>{stopped ? "Sending stopped" : "Sending enabled"}</Badge> : null}
          {updated ? <span className="hidden text-xs text-muted sm:inline">Updated {ago(updated)}{stale ? " (stale)" : ""}</span> : null}
        </div>
        <div className="flex items-center gap-2">
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-lg border border-danger/40 px-3 py-1.5 text-sm font-medium text-danger hover:bg-danger/10">Emergency stop</summary>
            <form action={stopSendingAction} className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-background p-4 shadow-xl">
              <p className="text-sm">Stops every email at the next send. Only you can switch it back on, from your Mac.</p>
              <button className="mt-3 w-full rounded-lg bg-danger px-3 py-2 text-sm font-semibold text-white">Stop all sending now</button>
            </form>
          </details>
          <form action={logoutAction}><button className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-foreground/5">Sign out</button></form>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5" aria-label="Dashboard sections">
        {ADMIN_TABS.map(([k, label, to]) => (
          <Link key={k} href={to} aria-current={active === k ? "page" : undefined}
            className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm ${active === k ? "border-primary font-medium text-foreground" : "border-transparent text-muted hover:text-foreground"}`}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
