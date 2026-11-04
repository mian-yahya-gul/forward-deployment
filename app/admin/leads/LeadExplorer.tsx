"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Badge, Card, Empty, TableWrap, Td, Th } from "@/app/admin/ui";
import { CategoryTree } from "@/app/admin/leads/CategoryTree";
import { Combo } from "@/app/admin/leads/Combo";
import { PlaceDrawer } from "@/app/admin/leads/PlaceDrawer";
import { CatNode, COLUMNS, Coverage, Filters, Place, PromoResponse, Rule, Segment, api, nice, num } from "@/app/admin/leads/leadTypes";

type Sub = "browse" | "segments" | "coverage" | "rules";
const PAGE = 50;

export function LeadExplorer() {
  const [sub, setSub] = useState<Sub>("browse");
  const [coverage, setCoverage] = useState<Coverage[]>([]);
  const [regions, setRegions] = useState<{ region: string; places: number }[]>([]);
  const [cities, setCities] = useState<{ city: string; places: number }[]>([]);
  const [tree, setTree] = useState<CatNode[]>([]);
  const [f, setF] = useState<Filters>({ country: "" });
  const [total, setTotal] = useState<number | null>(null);
  const [rows, setRows] = useState<Place[]>([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("confidence");
  const [desc, setDesc] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [allResults, setAllResults] = useState(false);
  const [confirmAll, setConfirmAll] = useState<"" | "exclude" | "tag">("");
  const [drawer, setDrawer] = useState<string | null>(null);
  const [cols, setCols] = useState<string[]>(COLUMNS.filter((c) => c.default).map((c) => c.key));
  const [tag, setTag] = useState("");
  const [segName, setSegName] = useState("");
  const [segments, setSegments] = useState<Segment[]>([]);
  const [msg, setMsg] = useState("");
  const [exportOpen, setExportOpen] = useState(false);
  const [withContacts, setWithContacts] = useState(false);
  const [promo, setPromo] = useState<PromoResponse | null>(null);
  const [promoBusy, setPromoBusy] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const seq = useRef(0);

  useEffect(() => { const t = setTimeout(() => { try { const c = localStorage.getItem("leadCols"); if (c) setCols(JSON.parse(c)); } catch { /* ignore */ } }, 0); return () => clearTimeout(t); }, []);
  useEffect(() => { try { localStorage.setItem("leadCols", JSON.stringify(cols)); } catch { /* ignore */ } }, [cols]);

  useEffect(() => { api<Coverage[]>("coverage").then((r) => { if (r.ok) { setCoverage(r.data as unknown as Coverage[]); } else setError(r.data.error ?? "The Lead Database is not reachable."); }); }, []);
  const loadRules = useCallback(() => { api<Rule[]>("rules").then((r) => { if (r.ok) setRules(r.data as unknown as Rule[]); }); }, []);
  useEffect(loadRules, [loadRules]);
  const loadSegments = useCallback(() => { api<Segment[]>("segments").then((r) => { if (r.ok) setSegments(r.data as unknown as Segment[]); }); }, []);
  useEffect(loadSegments, [loadSegments]);

  // cascading dropdown data
  useEffect(() => {
    if (!f.country) return;
    api<{ region: string; places: number }[]>("regions", undefined, `?country=${f.country}`).then((r) => r.ok && setRegions(r.data as never));
  }, [f.country]);
  useEffect(() => {
    if (!f.country) return;
    api<{ city: string; places: number }[]>("cities", undefined, `?country=${f.country}${f.region ? `&region=${encodeURIComponent(f.region)}` : ""}`).then((r) => {
      if (!r.ok) return;
      const merged = new Map<string, number>();
      for (const c of r.data as unknown as { city: string; places: number }[]) merged.set(c.city, (merged.get(c.city) ?? 0) + c.places);
      setCities([...merged.entries()].map(([city, places]) => ({ city, places })).sort((a, b) => b.places - a.places));
    });
  }, [f.country, f.region]);
  useEffect(() => {
    if (!f.country) return;
    api<CatNode[]>("categories", undefined, `?country=${f.country}${f.region ? `&region=${encodeURIComponent(f.region)}` : ""}${f.city ? `&city=${encodeURIComponent(f.city)}` : ""}`).then((r) => r.ok && setTree(r.data as never));
  }, [f.country, f.region, f.city]);

  const filterKey = JSON.stringify(f);
  // live count (debounced) and results
  useEffect(() => {
    if (!f.country) return;
    const mine = ++seq.current;
    const ctl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true); setError("");
      const r = await api<{ total: number; rows: Place[] }>("search", { filters: f, sort, desc, page, size: PAGE }, "", ctl.signal);
      if (mine !== seq.current || ctl.signal.aborted) return;
      setLoading(false);
      if (r.ok) { setTotal(r.data.total); setRows(r.data.rows); } else { setError(r.data.error ?? "Search failed"); }
    }, 400);
    return () => { clearTimeout(t); ctl.abort(); };
  }, [filterKey, sort, desc, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const patch = (p: Partial<Filters>) => { setF((cur) => ({ ...cur, ...p })); setPage(1); setSel(new Set()); setAllResults(false); };
  const setCountry = (c: string) => { setF({ country: c }); setPage(1); setSel(new Set()); setAllResults(false); };
  const chip = (on: boolean) => `rounded-full border px-3 py-1 text-xs ${on ? "border-primary bg-primary/10 font-medium" : "border-border text-muted hover:text-foreground"}`;
  const tri = (v: boolean | undefined, k: "has_phone" | "has_email") => (
    <div className="flex gap-1">{([["Any", undefined], ["Yes", true], ["No", false]] as const).map(([l, val]) => <button key={l} type="button" onClick={() => patch({ [k]: val })} className={chip(v === val)}>{l}</button>)}</div>
  );
  const ws = f.website_status ?? [];
  const toggleWs = (s: string) => patch({ website_status: ws.includes(s) ? ws.filter((x) => x !== s) : [...ws, s] });

  const target = (extra: object = {}) => allResults ? { country: f.country, all_results: true, confirm: true, filters: f, ...extra } : { country: f.country, ids: [...sel], ...extra };
  const refresh = () => { setPage((p) => p); setF((c) => ({ ...c })); setSel(new Set()); setAllResults(false); };
  const runBulk = async (path: "tag" | "exclude") => {
    setMsg("");
    const r = await api<Record<string, number>>(path, target(path === "tag" ? { tag } : { reason: "excluded in bulk" }));
    setConfirmAll(""); setMsg(r.ok ? `${path === "tag" ? "Tagged" : "Excluded"} ${num(Object.values(r.data)[0] as number)} businesses.` : r.data.error ?? "Failed");
    if (r.ok) refresh();
  };
  const doExport = async () => {
    setMsg("");
    const r = await api<{ csv: string; rows: number }>("export", { filters: f, with_contacts: withContacts, columns: ["gers_id", "name", "taxonomy_primary", "city", "region", "postcode", "website_status", "website_domain", "confidence"] });
    if (!r.ok) { setMsg(r.data.error ?? "Export failed"); return; }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([r.data.csv], { type: "text/csv" })); a.download = `leads-${f.country}-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    setMsg(`Exported ${num(r.data.rows)} rows${withContacts ? " with contact details (logged)" : " (logged)"}.`); setExportOpen(false);
  };
  const previewPromote = async () => {
    setMsg(""); setPromoBusy(true);
    const r = await api<PromoResponse>("promote", { ...target(), preview: true });
    setPromoBusy(false);
    if (r.ok) setPromo(r.data as PromoResponse); else setMsg(r.data.error ?? "Could not check these businesses");
  };
  const confirmPromote = async () => {
    setPromoBusy(true);
    const r = await api<PromoResponse>("promote", target());
    setPromoBusy(false);
    if (r.ok) { setPromo(null); setMsg(`Added ${r.data.allowed} prospect(s) to the CRM at “new” (no email, nothing sent). ${r.data.blocked} blocked.`); refresh(); } else setMsg(r.data.error ?? "Failed");
  };
  const toggleRule = async (rule: Rule) => { await api("rules", { country: rule.country, allow_promote: !rule.allow_promote }); loadRules(); };
  const saveSegment = async () => {
    if (!segName.trim()) return;
    const r = await api<{ total: number }>("segments", { name: segName, filters: f });
    setMsg(r.ok ? `Saved “${segName}” (${num(r.data.total)} businesses).` : r.data.error ?? "Could not save"); if (r.ok) { setSegName(""); loadSegments(); }
  };

  const hasCountry = Boolean(f.country);
  const regionList = hasCountry ? regions : [];
  const cityList = hasCountry ? cities : [];
  const treeList = hasCountry ? tree : [];
  const shownRows = hasCountry ? rows : [];
  const shownTotal = hasCountry ? total : null;
  const countryOpts = useMemo(() => coverage.map((c) => ({ value: c.country, label: c.name, count: c.places })), [coverage]);
  const pages = shownTotal ? Math.ceil(shownTotal / PAGE) : 0;
  const anySel = sel.size > 0 || allResults;
  const sortBy = (k?: string) => { if (!k) return; if (sort === k) setDesc(!desc); else { setSort(k); setDesc(k === "confidence"); } setPage(1); };

  if (error && !coverage.length) return <Card><p className="text-sm text-danger">{error}</p><p className="mt-2 text-sm text-muted">Start it on your Mac with <code className="font-mono">leaddb/open_leaddb.sh</code>.</p></Card>;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">{(["browse", "segments", "coverage", "rules"] as Sub[]).map((s) => <button key={s} onClick={() => setSub(s)} className={chip(sub === s)}>{s === "browse" ? "Browse" : s === "segments" ? `Saved segments (${segments.length})` : s === "coverage" ? "Coverage" : "Country rules"}</button>)}</div>
      {msg ? <p role="status" className="rounded-lg border border-border bg-surface/60 px-4 py-2 text-sm">{msg}</p> : null}

      {sub === "coverage" ? (
        <TableWrap><thead><tr><Th>Country</Th><Th className="text-right">Businesses</Th><Th className="text-right">With phone</Th><Th className="text-right">With email</Th><Th className="text-right">With own website</Th><Th>Release</Th></tr></thead>
          <tbody>{coverage.map((c) => <tr key={c.country}><Td className="font-medium">{c.name}</Td><Td className="text-right tabular-nums">{num(c.places)}</Td><Td className="text-right tabular-nums">{c.pct_phone}%</Td><Td className="text-right tabular-nums">{c.pct_email}%</Td><Td className="text-right tabular-nums">{c.pct_site}%</Td><Td className="text-muted">{c.release}</Td></tr>)}</tbody></TableWrap>
      ) : null}

      {sub === "rules" ? (
        <Card title="Country rules for adding prospects" hint="can only switch a country off; the CRM approvals always apply">
          <TableWrap compact><thead><tr><Th>Country</Th><Th>Adding prospects</Th><Th>Note</Th><Th /></tr></thead>
            <tbody>{rules.map((r) => <tr key={r.country}><Td className="font-medium">{r.name}</Td><Td><Badge tone={r.allow_promote ? "good" : "neutral"}>{r.allow_promote ? "allowed by rule" : "switched off"}</Badge></Td><Td className="text-muted">{r.note}</Td><Td><button onClick={() => toggleRule(r)} className="rounded-lg border border-border px-3 py-1 text-sm">{r.allow_promote ? "Switch off" : "Switch on"}</button></Td></tr>)}</tbody></TableWrap>
          <p className="mt-3 text-sm text-muted">Even when a country is on, a business is added only if its country has an approved legal framework and authorised sending in the CRM, its type maps to an approved category, it has its own website, it is not already a prospect or suppressed and (UK) it matches an active limited company on Companies House. Everything added starts as “new” with no email and no message, and goes through the normal research, assessment and approval steps.</p>
        </Card>
      ) : null}

      {sub === "segments" ? (
        segments.length ? <div className="grid gap-3 md:grid-cols-2">{segments.map((s) => (
          <Card key={s.id} title={s.name} hint={s.filters.country}>
            <p className="text-sm text-muted">{[s.filters.region, s.filters.city, s.filters.q && `“${s.filters.q}”`, s.filters.categories?.length && `${s.filters.categories.length} type(s)`].filter(Boolean).join(" · ") || "whole country"}</p>
            <p className="mt-2 text-sm">Count history: {s.history.map((h) => `${num(h.places)} (${h.release})`).join(" → ")}</p>
            <div className="mt-3 flex gap-2">
              <button className="rounded-lg border border-border px-3 py-1.5 text-sm" onClick={() => { setSub("browse"); setF(s.filters); setPage(1); }}>Open</button>
              <button className="rounded-lg border border-border px-3 py-1.5 text-sm" onClick={async () => { await api(`segments/${s.id}/refresh`, {}); loadSegments(); }}>Recount</button>
              <button className="rounded-lg border border-danger/40 px-3 py-1.5 text-sm text-danger" onClick={async () => { await api(`segments/${s.id}/delete`, {}); loadSegments(); }}>Delete</button>
            </div>
          </Card>))}</div> : <Empty>No saved segments yet. Set filters in Browse and press “Save segment”.</Empty>
      ) : null}

      {sub === "browse" ? (
        <>
          <Card>
            <div className="flex flex-wrap items-end gap-3">
              <Combo label="Country" value={f.country} options={countryOpts} onChange={setCountry} placeholder="Choose a country" />
              <Combo label="Region / state" value={f.region ?? ""} options={regionList.map((r) => ({ value: r.region, label: r.region, count: r.places }))} onChange={(v) => patch({ region: v || undefined, city: undefined })} disabled={!f.country} allLabel="All regions" placeholder="All regions" />
              <Combo label="City" value={f.city ?? ""} options={cityList.map((c) => ({ value: c.city, label: c.city, count: c.places }))} onChange={(v) => patch({ city: v || undefined })} disabled={!f.country} allLabel="All cities" placeholder="All cities" />
              <div className="min-w-[12rem] flex-1"><div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">Search by name</div><input value={f.q ?? ""} onChange={(e) => patch({ q: e.target.value || undefined })} disabled={!f.country} placeholder="e.g. plumbing" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm disabled:opacity-50" /></div>
            </div>
            {f.country ? (
              <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
                <CategoryTree nodes={treeList} selected={f.categories ?? []} onChange={(s) => patch({ categories: s.length ? s : undefined })} />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-3"><span className="text-muted">Has phone</span>{tri(f.has_phone, "has_phone")}</div>
                  <div className="flex items-center justify-between gap-3"><span className="text-muted">Has email</span>{tri(f.has_email, "has_email")}</div>
                  <div className="flex items-center justify-between gap-3"><span className="text-muted">Website</span><div className="flex flex-wrap gap-1">{([["none", "None"], ["social_only", "Social only"], ["has_site", "Has site"]] as const).map(([k, l]) => <button key={k} type="button" onClick={() => toggleWs(k)} className={chip(ws.includes(k))}>{l}</button>)}</div></div>
                  <div className="flex items-center justify-between gap-3"><span className="text-muted">Type</span><div className="flex gap-1">{([["Any", undefined], ["Independent", true], ["Chain", false]] as const).map(([l, v]) => <button key={l} type="button" onClick={() => patch({ independent: v })} className={chip(f.independent === v)}>{l}</button>)}</div></div>
                  <label className="flex items-center justify-between gap-3"><span className="text-muted">Min. confidence <strong className="text-foreground">{(f.min_confidence ?? 0).toFixed(1)}</strong></span><input type="range" min={0} max={1} step={0.1} value={f.min_confidence ?? 0} onChange={(e) => patch({ min_confidence: Number(e.target.value) || undefined })} className="w-40" /></label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(f.not_prospect)} onChange={(e) => patch({ not_prospect: e.target.checked || undefined })} />Not already a prospect</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(f.not_suppressed)} onChange={(e) => patch({ not_suppressed: e.target.checked || undefined })} />Not suppressed</label>
                  <p className="text-xs text-muted">Website score and legal-entity status filters arrive with the scoring and compliance phases.</p>
                </div>
              </div>
            ) : <p className="mt-4 text-sm text-muted">Choose a country to start. Counts beside each option are live.</p>}
          </Card>

          {f.country ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm"><strong className="text-lg tabular-nums">{shownTotal === null ? "…" : num(shownTotal)}</strong> businesses match{loading ? <span className="ml-2 text-muted">updating…</span> : null}{!f.region && (coverage.find((c) => c.country === f.country)?.places ?? 0) > 5_000_000 ? <span className="ml-3 text-xs text-muted">Tip: choose a state or region and results appear almost instantly.</span> : null}</div>
                <div className="flex flex-wrap items-center gap-2">
                  <input value={segName} onChange={(e) => setSegName(e.target.value)} placeholder="Segment name" className="w-40 rounded-lg border border-border bg-background px-3 py-1.5 text-sm" />
                  <button onClick={saveSegment} disabled={!segName.trim()} className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-50">Save segment</button>
                  <button onClick={() => setExportOpen((v) => !v)} className="rounded-lg border border-border px-3 py-1.5 text-sm">Export CSV</button>
                  <details className="relative"><summary className="cursor-pointer list-none rounded-lg border border-border px-3 py-1.5 text-sm">Columns</summary>
                    <div className="absolute right-0 z-30 mt-1 w-44 rounded-xl border border-border bg-background p-3 shadow-xl">{COLUMNS.map((c) => <label key={c.key} className="flex items-center gap-2 py-0.5 text-sm"><input type="checkbox" checked={cols.includes(c.key)} onChange={(e) => setCols(e.target.checked ? [...cols, c.key] : cols.filter((x) => x !== c.key))} />{c.label}</label>)}</div></details>
                </div>
              </div>
              {exportOpen ? (
                <Card><div className="space-y-2 text-sm"><p>Exports up to 5,000 businesses (500 with contact details). Every export is logged.</p>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={withContacts} onChange={(e) => setWithContacts(e.target.checked)} />Include phone numbers and emails (personal data for some sole traders; use only for research)</label>
                  <button onClick={doExport} className="rounded-lg bg-primary px-3 py-1.5 text-primary-foreground">Download CSV</button></div></Card>
              ) : null}

              {anySel ? (
                <div className="sticky top-28 z-20 flex flex-wrap items-center gap-2 rounded-xl border border-primary/40 bg-background/95 px-4 py-2.5 text-sm shadow-lg backdrop-blur">
                  <strong>{allResults ? `All ${num(total ?? 0)} results` : `${sel.size} selected`}</strong>
                  <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="tag" className="w-28 rounded-lg border border-border bg-background px-2 py-1" />
                  <button disabled={!tag.trim()} onClick={() => (allResults ? setConfirmAll("tag") : runBulk("tag"))} className="rounded-lg border border-border px-3 py-1 disabled:opacity-50">Tag</button>
                  <button onClick={() => (allResults ? setConfirmAll("exclude") : runBulk("exclude"))} className="rounded-lg border border-danger/40 px-3 py-1 text-danger">Exclude</button>
                  <button onClick={previewPromote} disabled={promoBusy} className="rounded-lg bg-primary px-3 py-1 text-primary-foreground disabled:opacity-60">{promoBusy ? "Checking…" : "Add to prospects…"}</button>
                  {confirmAll ? <span className="flex items-center gap-2 rounded-lg bg-warning/10 px-2 py-1 text-warning">Apply to ALL {num(total ?? 0)} results?<button onClick={() => runBulk(confirmAll)} className="rounded bg-warning px-2 py-0.5 text-black">Yes, apply</button><button onClick={() => setConfirmAll("")} className="underline">Cancel</button></span> : null}
                  <button onClick={() => { setSel(new Set()); setAllResults(false); setConfirmAll(""); }} className="ml-auto text-muted underline">Clear</button>
                </div>
              ) : null}

              {error ? <p className="text-sm text-danger">{error}</p> : null}
              {shownRows.length ? (
                <TableWrap>
                  <thead><tr>
                    <Th className="w-8"><input type="checkbox" aria-label="Select page" checked={shownRows.length > 0 && shownRows.every((r) => sel.has(r.gers_id))} onChange={(e) => setSel(e.target.checked ? new Set(shownRows.map((r) => r.gers_id)) : new Set())} /></Th>
                    {COLUMNS.filter((c) => cols.includes(c.key)).map((c) => <Th key={c.key}><button type="button" disabled={!c.sort} onClick={() => sortBy(c.sort)} className="uppercase">{c.label}{c.sort && sort === c.sort ? (desc ? " ▾" : " ▴") : ""}</button></Th>)}
                  </tr></thead>
                  <tbody>{shownRows.map((r) => (
                    <tr key={r.gers_id} className="cursor-pointer hover:bg-foreground/5" onClick={() => setDrawer(r.gers_id)}>
                      <Td className="w-8"><input type="checkbox" aria-label={`Select ${r.name}`} checked={sel.has(r.gers_id)} onClick={(e) => e.stopPropagation()} onChange={(e) => { const n = new Set(sel); if (e.target.checked) n.add(r.gers_id); else n.delete(r.gers_id); setSel(n); setAllResults(false); }} /></Td>
                      {cols.includes("name") ? <Td className="font-medium">{r.name}</Td> : null}
                      {cols.includes("category") ? <Td>{nice(r.taxonomy_primary)}</Td> : null}
                      {cols.includes("city") ? <Td className="text-muted">{r.city}</Td> : null}
                      {cols.includes("phone") ? <Td>{r.has_phone ? <Badge tone="good">yes</Badge> : <span className="text-muted">–</span>}</Td> : null}
                      {cols.includes("email") ? <Td>{r.has_email ? <Badge tone="good">yes</Badge> : <span className="text-muted">–</span>}</Td> : null}
                      {cols.includes("website") ? <Td>{r.website_status === "has_site" ? <span className="text-muted">{r.website_domain}</span> : <Badge tone={r.website_status === "social_only" ? "warn" : "neutral"}>{r.website_status === "social_only" ? "social only" : "none"}</Badge>}</Td> : null}
                      {cols.includes("confidence") ? <Td className="tabular-nums text-muted">{r.confidence !== null ? r.confidence.toFixed(2) : "–"}</Td> : null}
                      {cols.includes("chain") ? <Td>{r.is_chain ? <Badge tone="info">{r.brand_name}</Badge> : "–"}</Td> : null}
                      {cols.includes("postcode") ? <Td className="text-muted">{r.postcode ?? "–"}</Td> : null}
                      {cols.includes("first_seen") ? <Td className="text-muted">{r.first_seen}</Td> : null}
                      {cols.includes("tags") ? <Td>{r.tags.map((t) => <Badge key={t} tone="info">{t}</Badge>)}</Td> : null}
                    </tr>))}</tbody>
                </TableWrap>
              ) : loading ? null : <Empty>No businesses match these filters.</Empty>}
              {shownRows.length && sel.size === shownRows.length && (shownTotal ?? 0) > shownRows.length && !allResults ? <p className="text-sm">All {shownRows.length} on this page are selected. <button className="text-primary underline" onClick={() => setAllResults(true)}>Select all {num(shownTotal ?? 0)} results</button></p> : null}
              {pages > 1 ? <div className="flex items-center justify-between text-sm"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-lg border border-border px-3 py-1.5 disabled:opacity-40">← Previous</button><span className="text-muted">Page {num(page)} of {num(pages)}</span><button disabled={page >= pages} onClick={() => setPage(page + 1)} className="rounded-lg border border-border px-3 py-1.5 disabled:opacity-40">Next →</button></div> : null}
            </>
          ) : null}
        </>
      ) : null}
      {promo ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setPromo(null)} role="presentation">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-background p-5 shadow-2xl" onClick={(ev) => ev.stopPropagation()} role="dialog" aria-label="Add to prospects">
            <h2 className="text-lg font-semibold">Compliance check</h2>
            <p className="mt-1 text-sm text-muted"><strong className="text-success">{promo.allowed} can be added</strong> · <strong className="text-danger">{promo.blocked} blocked</strong>. Nothing has been added yet. Added businesses start as “new” with no email address and no message.</p>
            <TableWrap compact><thead><tr><Th>Business</Th><Th>Result</Th><Th>Why</Th></tr></thead>
              <tbody>{promo.results.map((r) => <tr key={r.gers_id}><Td className="font-medium">{r.name}<div className="text-xs font-normal text-muted">{r.city}</div></Td><Td><Badge tone={r.allowed ? "good" : "bad"}>{r.allowed ? "can add" : "blocked"}</Badge></Td>
                <Td className="text-sm text-muted">{r.allowed ? `${nice(r.category)} · ${r.scope}` : <ul className="list-disc pl-4">{r.reasons.map((x, i) => <li key={i}>{x}</li>)}</ul>}</Td></tr>)}</tbody></TableWrap>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setPromo(null)} className="rounded-lg border border-border px-3 py-1.5 text-sm">Cancel</button>
              <button onClick={confirmPromote} disabled={!promo.allowed || promoBusy} className="rounded-lg bg-primary px-3 py-1.5 text-sm text-primary-foreground disabled:opacity-50">Add {promo.allowed} allowed to the CRM</button>
            </div>
          </div>
        </div>
      ) : null}
      {drawer ? <PlaceDrawer key={drawer} country={f.country} id={drawer} onClose={() => setDrawer(null)} onChanged={refresh} /> : null}
      <p className="pt-4 text-center text-xs text-muted">Data © Overture Maps Foundation (CDLA-Permissive-2.0)</p>
    </div>
  );
}
