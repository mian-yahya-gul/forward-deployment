import { notFound } from "next/navigation";

import { logoutAction, stopSendingAction } from "@/app/admin/actions";
import { LoginForm } from "@/app/admin/LoginForm";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { adminStoreConfigured, getKill, getRecentEvents, getSnapshot, type AdminSnapshot, type DeliveryEvent } from "@/lib/admin-store";

export const dynamic = "force-dynamic";

const cell = "border-b border-black/10 px-2 py-1.5 text-left align-top dark:border-white/10";
const tone = (s: string) => (s === "PASS" || s === "delivered" ? "text-green-700 dark:text-green-400" : s === "BLOCK" || s === "bounced" || s === "complained" ? "text-red-700 dark:text-red-400" : "text-amber-700 dark:text-amber-400");
const ageHours = (iso: string) => Math.round((Date.now() - new Date(iso).getTime()) / 3_600_000);

function Table({ head, rows }: { head: string[]; rows: (string | number | null | React.ReactElement)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead><tr>{head.map((h) => <th key={h} className={`${cell} font-medium`}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={cell}>{c ?? "–"}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ stopped?: string }> }) {
  // Not configured: look like any other missing page, so nothing about the setup is revealed to visitors.
  if (!adminConfigured()) notFound();
  if (!(await isAdmin())) return <main><LoginForm /></main>;

  const sp = await searchParams;
  let snapshot: AdminSnapshot | null = null; let events: DeliveryEvent[] = []; let kill: string | null = null; let problem = "";
  if (adminStoreConfigured()) {
    try { [snapshot, events, kill] = await Promise.all([getSnapshot(), getRecentEvents(60), getKill()]); }
    catch { problem = "The data store could not be reached."; }
  } else problem = "The data store is not configured (EVENT_STORE_URL / EVENT_STORE_TOKEN).";

  const byProvider = new Map((snapshot?.leads ?? []).filter((l) => l.providerId).map((l) => [l.providerId as string, l.company]));
  const stale = snapshot ? ageHours(snapshot.generatedAt) : null;
  const sent = (snapshot?.leads ?? []).filter((l) => l.sentAt);
  const due = (snapshot?.leads ?? []).filter((l) => l.followUpDue);

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10 text-sm">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">DeosAI Labs: outreach dashboard</h1>
        <div className="flex gap-2">
          <form action={stopSendingAction}><button className="rounded bg-red-700 px-3 py-1.5 text-white">STOP all sending</button></form>
          <form action={logoutAction}><button className="rounded border border-black/20 px-3 py-1.5 dark:border-white/25">Sign out</button></form>
        </div>
      </header>

      {sp.stopped ? <p role="status" className="rounded bg-red-100 p-3 text-red-900">Stop requested. The Mac honours this before its next send. Only you, in a terminal, can switch sending back on.</p> : null}
      {kill ? <p role="alert" className="rounded bg-red-100 p-3 text-red-900">Remote stop is ON since {kill}. Sending stays stopped until you resume on the Mac.</p> : null}
      {problem ? <p role="alert" className="rounded bg-amber-100 p-3 text-amber-900">{problem}</p> : null}
      {!snapshot && !problem ? <p className="rounded bg-amber-100 p-3 text-amber-900">No snapshot yet. On the Mac run <code>python3 crm.py push-dashboard</code>.</p> : null}

      {snapshot ? (
        <>
          <p className="text-black/60 dark:text-white/60">Snapshot from the Mac: {snapshot.generatedAt}{stale !== null && stale > 36 ? <strong className="text-red-700"> ({stale} h old: the Mac has not pushed recently)</strong> : ` (${stale} h ago)`}. Delivery events below are live.</p>

          <section aria-labelledby="state"><h2 id="state" className="mb-2 font-medium">State</h2>
            <ul className="grid gap-1 sm:grid-cols-2">
              <li>Original signed LIA: {snapshot.state.originalLia}</li>
              <li>Local kill switch: {snapshot.state.killLocal ? <strong className="text-red-700">ON</strong> : "off"}</li>
              <li>UK standing LIA: {snapshot.state.ukLia}</li><li>UK authorization: {snapshot.state.ukAuth}</li>
              <li>UK direct-sector LIA: {snapshot.state.ukDirectLia ?? "n/a"}</li><li>UK direct-sector authorization: {snapshot.state.ukDirectAuth ?? "n/a"}</li>
              <li>US standing LIA: {snapshot.state.usLia}</li><li>US authorization: {snapshot.state.usAuth}</li>
              <li>UK usage: today {snapshot.usage.ukToday}, month {snapshot.usage.ukMonth}</li><li>US usage: today {snapshot.usage.usToday}, month {snapshot.usage.usMonth}</li><li>UK direct usage: today {snapshot.usage.ukDirectToday ?? "-"}, month {snapshot.usage.ukDirectMonth ?? "-"}</li>
            </ul>
          </section>

          <section aria-labelledby="counts"><h2 id="counts" className="mb-2 font-medium">Totals</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">{Object.entries(snapshot.counts).map(([k, v]) => <li key={k}><span className="text-black/60 dark:text-white/60">{k}:</span> <strong>{v}</strong></li>)}</ul>
          </section>

          <section aria-labelledby="replies"><h2 id="replies" className="mb-2 font-medium">Replies and objections ({snapshot.replies.length})</h2>
            {snapshot.replies.length ? <Table head={["When", "Company", "Type", "Note"]} rows={snapshot.replies.map((r) => [r.ts, r.company, r.kind, r.note])} /> : <p>None recorded. Replies arrive in info@deosailabs.com; record each with <code>crm.py respond</code>, then <code>push-dashboard</code>.</p>}
          </section>

          <section aria-labelledby="due"><h2 id="due" className="mb-2 font-medium">Follow-ups due ({due.length})</h2>
            {due.length ? <Table head={["Company", "Due", "Status"]} rows={due.map((l) => [l.company, l.followUpDue, l.status])} /> : <p>None.</p>}
          </section>

          <section aria-labelledby="sent"><h2 id="sent" className="mb-2 font-medium">Sent emails ({sent.length})</h2>
            <Table head={["Company", "Country", "Sent", "Delivery", "Status"]} rows={sent.map((l) => [l.company, l.country, l.sentAt, <span key="d" className={tone(l.delivery ?? "")}>{l.delivery ?? "unknown"}</span>, l.status])} />
          </section>

          <section aria-labelledby="pros"><h2 id="pros" className="mb-2 font-medium">All prospects ({snapshot.leads.length})</h2>
            <Table head={["Company", "Country", "Category", "Assessment", "Reason", "Status"]} rows={snapshot.leads.map((l) => [l.company, l.country, l.category, <span key="a" className={tone(l.assessment)}>{l.assessment}</span>, l.reason, l.status])} />
          </section>
        </>
      ) : null}

      <section aria-labelledby="events"><h2 id="events" className="mb-2 font-medium">Live delivery events (latest {events.length})</h2>
        {events.length ? <Table head={["Time", "Event", "Company", "Detail"]} rows={events.map((e) => [e.created_at ?? "", <span key="e" className={tone(e.type.replace("email.", ""))}>{e.type}</span>, byProvider.get(e.email_id) ?? "(not in snapshot)", e.bounce_type ?? ""])} /> : <p>No events yet. They appear once the Resend webhook is configured.</p>}
      </section>
    </main>
  );
}
