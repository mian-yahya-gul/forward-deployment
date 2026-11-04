import { notFound } from "next/navigation";

import { AdminChrome } from "@/app/admin/AdminChrome";
import { LoginForm } from "@/app/admin/LoginForm";
import { LeadExplorer } from "@/app/admin/leads/LeadExplorer";
import { Card } from "@/app/admin/ui";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { leaddbConfigured } from "@/lib/leaddb";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  if (!adminConfigured()) notFound();
  if (!(await isAdmin())) return <div className="min-h-screen bg-background text-foreground"><LoginForm /></div>;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminChrome active="leads" />
      <main className="mx-auto max-w-7xl space-y-5 px-5 py-6">
        <div><h1 className="text-xl font-semibold tracking-tight">Lead Database</h1><p className="text-sm text-muted">Every business in the countries you have imported. Browse, filter, save segments. Nothing here is contacted or added to your prospects automatically.</p></div>
        {leaddbConfigured() ? <LeadExplorer /> : (
          <Card title="The Lead Database runs on your Mac">
            <p className="text-sm">The data (about 3 GB) and its search service live on your Mac, so this page works when the dashboard is opened from there. On your Mac, run <code className="font-mono">~/Documents/deosai-growth/leaddb/open_leaddb.sh</code>; it starts the service and opens this page at <code className="font-mono">http://localhost:3200/admin/leads</code>.</p>
          </Card>
        )}
      </main>
    </div>
  );
}
