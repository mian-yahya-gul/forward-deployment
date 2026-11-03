import Link from "next/link";
import { notFound } from "next/navigation";

import { logoutAction, stopSendingAction } from "@/app/admin/actions";
import { LoginForm } from "@/app/admin/LoginForm";
import { Badge, Bar, Card, Empty, Stat, TableWrap, Td, Th, ago, assessTone, deliveryTone, hoursSince, sectorLabel, statusTone } from "@/app/admin/ui";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { adminStoreConfigured, getKill, getRecentEvents, getSnapshot, type AdminSnapshot, type DeliveryEvent, type SnapshotLead } from "@/lib/admin-store";

export const dynamic = "force-dynamic";

const TABS = [
  ["overview", "Overview"], ["sent", "Sent emails"], ["prospects", "Prospects"], ["replies", "Replies"], ["events", "Delivery log"],
] as const;
type Tab = (typeof TABS)[number][0];
type Params = { tab?: string; f?: string; s?: string; stopped?: string };

const href = (tab: string, extra: Record<string, string> = {}) => `/admin?${new URLSearchParams({ tab, ...extra }).toString()}`;

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Params> }) {
  // Not configured: look like any other missing page so nothing about the setup is revealed.
  if (!adminConfigured()) notFound();
  if (!(await isAdmin())) return <Shell><LoginForm /></Shell>;

  const sp = await searchParams;
  const tab: Tab = (TABS.find(([k]) => k === sp.tab)?.[0] ?? "overview") as Tab;
  let snapshot: AdminSnapshot | null = null; let events: DeliveryEvent[] = []; let kill: string | null = null; let problem = "";
  if (adminStoreConfigured()) {
    try { [snapshot, events, kill] = await Promise.all([getSnapshot(), getRecentEvents(80), getKill()]); }
    catch { problem = "The data store could not be reached."; }
  } else problem = "The data store is not configured.";

  const stopped = Boolean(kill) || Boolean(snapshot?.state.killLocal);
  const leads = snapshot?.leads ?? [];
  const byProvider = new Map(leads.filter((l) => l.providerId).map((l) => [l.providerId as string, l.company]));
  const staleH = snapshot ? hoursSince(snapshot.generatedAt) : null;

  return (
    <Shell>
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="text-base font-semibold tracking-tight">DeosAI Labs <span className="text-muted">/ Outreach</span></div>
            {snapshot ? <Badge tone={stopped ? "bad" : "good"}>{stopped ? "Sending stopped" : "Sending enabled"}</Badge> : null}
            {snapshot ? <span className="hidden text-xs text-muted sm:inline">Updated {ago(snapshot.generatedAt)}{staleH !== null && staleH > 36 ? " (stale)" : ""}</span> : null}
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
          {TABS.map(([k, label]) => (
            <Link key={k} href={href(k)} aria-current={tab === k ? "page" : undefined}
              className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm ${tab === k ? "border-primary font-medium text-foreground" : "border-transparent text-muted hover:text-foreground"}`}>{label}</Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-5 py-6">
        {sp.stopped ? <Banner tone="bad">Stop requested. The Mac honours it before the next send, and only you can switch sending back on.</Banner> : null}
        {kill ? <Banner tone="bad">Remote stop is on (since {kill}). Sending stays stopped until you resume on your Mac.</Banner> : null}
        {problem ? <Banner tone="warn">{problem}</Banner> : null}
        {!snapshot && !problem ? <Banner tone="warn">No data yet. On your Mac run <code className="font-mono">python3 crm.py push-dashboard</code>.</Banner> : null}
        {snapshot && tab === "overview" ? <Overview s={snapshot} events={events} stopped={stopped} staleH={staleH} /> : null}
        {snapshot && tab === "sent" ? <Sent leads={leads} /> : null}
        {snapshot && tab === "prospects" ? <Prospects leads={leads} f={sp.f} s={sp.s} /> : null}
        {snapshot && tab === "replies" ? <Replies s={snapshot} /> : null}
        {tab === "events" ? <Events events={events} byProvider={byProvider} /> : null}
      </main>
    </Shell>
  );
}

function Banner({ tone, children }: { tone: "bad" | "warn"; children: React.ReactNode }) {
  return <div role={tone === "bad" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm ${tone === "bad" ? "border-danger/30 bg-danger/10 text-danger" : "border-warning/30 bg-warning/10 text-warning"}`}>{children}</div>;
}

function Overview({ s, events, stopped, staleH }: { s: AdminSnapshot; events: DeliveryEvent[]; stopped: boolean; staleH: number | null }) {
  const c = s.counts;
  const due = s.leads.filter((l) => l.followUpDue);
  const attention: { tone: "bad" | "warn" | "info"; text: string; to: string }[] = [];
  if (c["complaints"] > 0) attention.push({ tone: "bad", text: `${c["complaints"]} spam complaint(s): sending is halted until you review`, to: href("sent") });
  if (c["bounced"] > 0) attention.push({ tone: "warn", text: `${c["bounced"]} bounced email(s)`, to: href("sent") });
  if (c["replies and objections"] > 0) attention.push({ tone: "info", text: `${c["replies and objections"]} reply or objection recorded: read them`, to: href("replies") });
  if (due.length) attention.push({ tone: "info", text: `${due.length} follow-up(s) due (${due.slice(0, 3).map((d) => d.company).join(", ")}${due.length > 3 ? "…" : ""})`, to: href("sent") });
  if ((s.halting ?? 0) > 0) attention.push({ tone: "bad", text: `${s.halting} change(s) need your decision before sending can continue`, to: href("overview") });
  if (c["REVIEW"] > 0) attention.push({ tone: "warn", text: `${c["REVIEW"]} prospect(s) waiting for your review`, to: href("prospects", { f: "REVIEW" }) });
  if (stopped) attention.push({ tone: "bad", text: "Sending is stopped", to: href("overview") });
  if (staleH !== null && staleH > 36) attention.push({ tone: "warn", text: `Data is ${staleH} h old: your Mac has not pushed recently`, to: href("overview") });

  const sent = c["emails sent"]; const delivered = c["delivered"];
  const funnel = [["Researched", c["prospects"]], ["Pass the checks", c["PASS"]], ["Emailed", sent], ["Delivered", delivered], ["Replied", c["replies and objections"]]] as const;

  const sectors = new Map<string, { total: number; sent: number; delivered: number; replied: number }>();
  for (const l of s.leads) {
    const e = sectors.get(l.category) ?? { total: 0, sent: 0, delivered: 0, replied: 0 };
    e.total++; if (l.sentAt) e.sent++; if (l.delivery === "delivered") e.delivered++;
    if (["replied", "interested", "call_booked", "call_done", "proposal", "won"].includes(l.status)) e.replied++;
    sectors.set(l.category, e);
  }
  const sectorRows = [...sectors.entries()].filter(([, v]) => v.total > 0).sort((a, b) => b[1].sent - a[1].sent || b[1].total - a[1].total);

  return (
    <>
      <Card title="Needs your attention" hint={attention.length ? `${attention.length} item(s)` : "all clear"}>
        {attention.length ? (
          <ul className="space-y-2">{attention.map((a, i) => (
            <li key={i}><Link href={a.to} className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-foreground/5"><Badge tone={a.tone === "info" ? "info" : a.tone === "bad" ? "bad" : "warn"}>{a.tone === "bad" ? "Urgent" : a.tone === "warn" ? "Check" : "Info"}</Badge><span>{a.text}</span></Link></li>
          ))}</ul>
        ) : <p className="text-sm text-muted">Nothing needs you right now.</p>}
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Emails sent" value={sent} sub={`${c["drafts waiting"]} drafts waiting`} />
        <Stat label="Delivered" value={delivered} sub={sent ? `${Math.round((delivered / sent) * 100)}% confirmed` : undefined} tone="good" />
        <Stat label="Replies" value={c["replies and objections"]} sub={sent ? `${((c["replies and objections"] / sent) * 100).toFixed(0)}% of sent` : undefined} tone={c["replies and objections"] ? "good" : undefined} />
        <Stat label="Bounces / complaints" value={`${c["bounced"]} / ${c["complaints"]}`} tone={c["bounced"] + c["complaints"] > 0 ? "bad" : "good"} sub={`${c["suppressions"]} suppressed`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {(s.scopes ?? []).map((sc) => {
          const a = sc.auth; const ok = sc.lia.ok && a.active;
          return (
            <Card key={sc.key} title={sc.label} hint={ok ? "active" : sc.lia.ok ? "approved, not authorised" : "not approved"}>
              <div className="mb-3 flex flex-wrap gap-1.5">
                <Badge tone={sc.lia.ok ? "good" : "neutral"}>{sc.lia.ok ? "Legal framework approved" : "Not approved"}</Badge>
                <Badge tone={a.active ? "good" : "neutral"}>{a.active ? "Sending authorised" : "Not authorised"}</Badge>
                {a.active ? <Badge tone="info">{a.autoFirst ? "Automatic first emails" : "First emails manual"}</Badge> : null}
              </div>
              {a.active ? (
                <div className="space-y-3 text-sm">
                  <div><div className="mb-1 flex justify-between text-xs text-muted"><span>Today</span><span className="tabular-nums">{a.usedToday} / {a.dailyLimit}</span></div><Bar value={a.usedToday} max={a.dailyLimit} /></div>
                  <div><div className="mb-1 flex justify-between text-xs text-muted"><span>This month</span><span className="tabular-nums">{a.usedMonth} / {a.monthlyLimit}</span></div><Bar value={a.usedMonth} max={a.monthlyLimit} /></div>
                  <div className="text-xs text-muted">{a.followUps} follow-up(s) per company. Authorisation expires {a.expires}.</div>
                </div>
              ) : <p className="text-sm text-muted">{sc.lia.ok ? "Run authorize-standing-campaign on your Mac to start." : "Approve the legal framework on your Mac first."}</p>}
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Pipeline" hint="all scopes">
          <ul className="space-y-3">{funnel.map(([label, n]) => (
            <li key={label} className="text-sm"><div className="mb-1 flex justify-between"><span>{label}</span><span className="tabular-nums text-muted">{n}</span></div><Bar value={n} max={funnel[0][1]} /></li>
          ))}</ul>
        </Card>
        <Card title="By sector" hint="the two-week test">
          {sectorRows.length ? (
            <TableWrap compact><thead><tr><Th>Sector</Th><Th className="text-right">Prospects</Th><Th className="text-right">Sent</Th><Th className="text-right">Delivered</Th><Th className="text-right">Replied</Th></tr></thead>
              <tbody>{sectorRows.map(([k, v]) => <tr key={k}><Td>{sectorLabel(k)}</Td><Td className="text-right tabular-nums">{v.total}</Td><Td className="text-right tabular-nums">{v.sent}</Td><Td className="text-right tabular-nums">{v.delivered}</Td><Td className="text-right tabular-nums">{v.replied}</Td></tr>)}</tbody></TableWrap>
          ) : <Empty>No data yet.</Empty>}
        </Card>
      </div>

      <Card title="Latest delivery events" hint="live from Resend">
        {events.length ? <EventsTable events={events.slice(0, 6)} byProvider={new Map(s.leads.filter((l) => l.providerId).map((l) => [l.providerId as string, l.company]))} /> : <Empty>No events yet. They appear once the Resend webhook is connected.</Empty>}
      </Card>
    </>
  );
}

function Sent({ leads }: { leads: SnapshotLead[] }) {
  const sent = leads.filter((l) => l.sentAt).sort((a, b) => (b.sentAt ?? "").localeCompare(a.sentAt ?? ""));
  if (!sent.length) return <Empty>No emails sent yet.</Empty>;
  return (
    <TableWrap><thead><tr><Th>Company</Th><Th>Sector</Th><Th>Sent</Th><Th>Delivery</Th><Th>Stage</Th><Th>Next follow-up</Th></tr></thead>
      <tbody>{sent.map((l) => (
        <tr key={l.id}><Td className="font-medium">{l.company}</Td><Td>{sectorLabel(l.category)}</Td><Td className="whitespace-nowrap text-muted">{(l.sentAt ?? "").slice(0, 16)}</Td>
          <Td><Badge tone={deliveryTone(l.delivery)}>{l.delivery ?? "unknown"}</Badge></Td><Td><Badge tone={statusTone(l.status)}>{l.status.replace(/_/g, " ")}</Badge></Td>
          <Td className="text-muted">{l.followUpDue ? `due ${l.followUpDue}` : "–"}</Td></tr>
      ))}</tbody></TableWrap>
  );
}

function Prospects({ leads, f, s }: { leads: SnapshotLead[]; f?: string; s?: string }) {
  const filters = ["ALL", "PASS", "REVIEW", "BLOCK"];
  const cur = filters.includes(f ?? "") ? (f as string) : "ALL";
  const scopes: [string, string][] = [["", "All countries"], ["UK", "United Kingdom"], ["US", "United States"], ["OTHER", "Other"]];
  const curS = scopes.some(([k]) => k === s) ? (s as string) : "";
  const inScope = (l: SnapshotLead) => curS === "" || (curS === "UK" ? /united kingdom/i.test(l.country) : curS === "US" ? /^united states$/i.test(l.country) : !/united kingdom|united states/i.test(l.country));
  const rows = leads.filter((l) => (cur === "ALL" || l.assessment === cur) && inScope(l));
  const count = (k: string) => leads.filter((l) => (k === "ALL" || l.assessment === k) && inScope(l)).length;
  const pill = (on: boolean) => `rounded-full border px-3 py-1 text-sm ${on ? "border-primary bg-primary/10 font-medium" : "border-border text-muted hover:text-foreground"}`;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((k) => <Link key={k} href={href("prospects", { f: k, ...(curS ? { s: curS } : {}) })} className={pill(cur === k)}>{k === "ALL" ? "All" : k} <span className="text-muted">{count(k)}</span></Link>)}
        <span className="mx-2 h-5 w-px bg-border" />
        {scopes.map(([k, label]) => <Link key={k || "all"} href={href("prospects", { f: cur, ...(k ? { s: k } : {}) })} className={pill(curS === k)}>{label}</Link>)}
      </div>
      {rows.length ? (
        <TableWrap><thead><tr><Th>Company</Th><Th>Country</Th><Th>Sector</Th><Th>Assessment</Th><Th>Why</Th><Th>Stage</Th></tr></thead>
          <tbody>{rows.map((l) => (
            <tr key={l.id}><Td className="font-medium">{l.company}</Td><Td className="text-muted">{l.country}</Td><Td>{sectorLabel(l.category)}</Td><Td><Badge tone={assessTone(l.assessment)}>{l.assessment}</Badge></Td>
              <Td className="max-w-[28rem] text-muted" title={l.reason}>{l.reason.length > 110 ? `${l.reason.slice(0, 110)}…` : l.reason}</Td><Td><Badge tone={statusTone(l.status)}>{l.status.replace(/_/g, " ")}</Badge></Td></tr>
          ))}</tbody></TableWrap>
      ) : <Empty>No prospects match this filter.</Empty>}
    </div>
  );
}

function Replies({ s }: { s: AdminSnapshot }) {
  if (!s.replies.length) return <Empty>No replies or objections recorded. Replies arrive in info@deosailabs.com: log each with <code className="font-mono">crm.py respond</code>, then <code className="font-mono">push-dashboard</code>.</Empty>;
  return (
    <ul className="space-y-3">{s.replies.map((r, i) => (
      <li key={i} className="rounded-xl border border-border bg-surface/60 p-4">
        <div className="flex flex-wrap items-center gap-2"><span className="font-medium">{r.company}</span><Badge tone={r.kind === "optout" || r.kind === "negative" || r.kind === "decline" ? "bad" : "good"}>{r.kind}</Badge><span className="text-xs text-muted">{ago(r.ts)}</span></div>
        {r.note ? <p className="mt-2 text-sm text-muted">{r.note}</p> : null}
      </li>
    ))}</ul>
  );
}

function EventsTable({ events, byProvider }: { events: DeliveryEvent[]; byProvider: Map<string, string> }) {
  return (
    <TableWrap><thead><tr><Th>Time</Th><Th>Event</Th><Th>Company</Th><Th>Detail</Th></tr></thead>
      <tbody>{events.map((e, i) => (
        <tr key={e.id + i}><Td className="whitespace-nowrap text-muted">{(e.created_at ?? "").replace("T", " ").slice(0, 16)}</Td>
          <Td><Badge tone={deliveryTone(e.type.replace("email.", ""))}>{e.type.replace("email.", "")}</Badge></Td><Td>{byProvider.get(e.email_id) ?? <span className="text-muted">not in snapshot</span>}</Td><Td className="text-muted">{e.bounce_type ?? ""}</Td></tr>
      ))}</tbody></TableWrap>
  );
}

function Events({ events, byProvider }: { events: DeliveryEvent[]; byProvider: Map<string, string> }) {
  if (!events.length) return <Empty>No events yet. They appear here once the Resend webhook is connected.</Empty>;
  return <EventsTable events={events} byProvider={byProvider} />;
}
