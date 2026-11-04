import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin-auth";
import { leaddbConfigured, leaddbFetch, pathAllowed } from "@/lib/leaddb";

export const dynamic = "force-dynamic";

/** Owner-only proxy to the local Lead Database API. The API token stays on the server; only whitelisted paths pass. */
async function handle(request: Request, ctx: { params: Promise<{ path: string[] }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  if (!leaddbConfigured()) return NextResponse.json({ error: "The Lead Database is not connected on this deployment." }, { status: 503 });
  const { path } = await ctx.params;
  const joined = path.join("/");
  if (!pathAllowed(request.method, joined)) return NextResponse.json({ error: "not found" }, { status: 404 });
  const url = new URL(request.url);
  let body: unknown;
  if (request.method === "POST") {
    const text = await request.text();
    if (text.length > 2_000_000) return NextResponse.json({ error: "too large" }, { status: 413 });
    try { body = text ? JSON.parse(text) : {}; } catch { return NextResponse.json({ error: "bad request" }, { status: 400 }); }
  }
  try {
    const r = await leaddbFetch(joined, { method: request.method, body, search: url.search });
    const data = await r.text();
    return new NextResponse(data, { status: r.status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "The Lead Database service is not running on this computer." }, { status: 503 });
  }
}

export const GET = handle;
export const POST = handle;
