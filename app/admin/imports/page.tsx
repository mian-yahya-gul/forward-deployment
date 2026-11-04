import { notFound } from "next/navigation";

import { AdminChrome } from "@/app/admin/AdminChrome";
import { LoginForm } from "@/app/admin/LoginForm";
import { RunNow } from "@/app/admin/imports/RunNow";
import { Badge, Card, Empty, TableWrap, Td, Th } from "@/app/admin/ui";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { leaddbConfigured, leaddbJson } from "@/lib/leaddb";

export const dynamic = "force-dynamic";

type Imp = { id: number; release: string; country: string; started: string; finished: string | null; seconds: number | null; rows_total: number | null; added: number | null; updated: number | null; removed: number | null; status: string; error: string | null };
const n = (v: number | null) => (v === null ? "–" : v.toLocaleString("en-GB"));

export default async function ImportsPage() {
  if (!adminConfigured()) notFound();
  if (!(await isAdmin())) return <div className="min-h-screen bg-background text-foreground"><LoginForm /></div>;
  const configured = leaddbConfigured();
  const imports = configured ? await leaddbJson<Imp[]>("imports") : null;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminChrome active="imports" />
      <main className="mx-auto max-w-7xl space-y-5 px-5 py-6">
        <div><h1 className="text-xl font-semibold tracking-tight">Imports</h1><p className="text-sm text-muted">The Lead Database updates itself on your Mac every month, a few days after each Overture release (a nightly check at 03:30; it only imports when a new release is at least 3 days old).</p></div>
        {!configured ? <Card title="The Lead Database runs on your Mac"><p className="text-sm">Open this page from your Mac with <code className="font-mono">leaddb/open_leaddb.sh</code> to see the import history and run an import.</p></Card> : (
          <>
            <Card title="Run an import now" hint="uses your internet connection for about 45 minutes"><RunNow /></Card>
            {imports?.length ? (
              <TableWrap><thead><tr><Th>When</Th><Th>Release</Th><Th>Country</Th><Th className="text-right">Rows</Th><Th className="text-right">Added</Th><Th className="text-right">Updated</Th><Th className="text-right">Removed</Th><Th className="text-right">Seconds</Th><Th>Status</Th></tr></thead>
                <tbody>{imports.map((i) => (
                  <tr key={i.id}><Td className="whitespace-nowrap text-muted">{(i.started ?? "").replace("T", " ").slice(0, 16)}</Td><Td>{i.release}</Td><Td>{i.country}</Td><Td className="text-right tabular-nums">{n(i.rows_total)}</Td><Td className="text-right tabular-nums">{n(i.added)}</Td>
                    <Td className="text-right tabular-nums">{n(i.updated)}</Td><Td className="text-right tabular-nums">{n(i.removed)}</Td><Td className="text-right tabular-nums">{n(i.seconds)}</Td>
                    <Td title={i.error ?? undefined}><Badge tone={i.status === "ok" ? "good" : i.status === "running" ? "info" : "bad"}>{i.status}</Badge></Td></tr>
                ))}</tbody></TableWrap>
            ) : <Empty>No imports recorded.</Empty>}
          </>
        )}
      </main>
    </div>
  );
}
