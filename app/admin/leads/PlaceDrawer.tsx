"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/app/admin/ui";
import { PlaceDetail, api, nice } from "@/app/admin/leads/leadTypes";

/** Detail drawer. This is the only screen that shows a business's phone numbers and emails (loaded on open). */
export function PlaceDrawer({ country, id, onClose, onChanged }: { country: string; id: string; onClose: () => void; onChanged: () => void }) {
  const [d, setD] = useState<PlaceDetail | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let live = true;
    api<PlaceDetail>("place", undefined, `?country=${encodeURIComponent(country)}&id=${encodeURIComponent(id)}`).then((r) => {
      if (!live) return;
      if (r.ok) setD(r.data); else setErr(r.data.error ?? "Could not load");
    });
    return () => { live = false; };
  }, [country, id]);
  const act = async (path: string, body: object) => { setBusy(true); await api(path, body); setBusy(false); onChanged(); onClose(); };
  const bbox = d ? `${d.lon - 0.004},${d.lat - 0.003},${d.lon + 0.004},${d.lat + 0.003}` : "";
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose} role="presentation">
      <aside className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-background p-5 shadow-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Business details">
        <button onClick={onClose} className="float-right rounded-lg border border-border px-2 py-1 text-sm">Close</button>
        {err ? <p className="text-sm text-danger">{err}</p> : null}
        {!d && !err ? <p className="text-sm text-muted">Loading…</p> : null}
        {d ? (
          <div className="space-y-4 text-sm">
            <div><h2 className="text-lg font-semibold">{d.name}</h2><p className="text-muted">{nice(d.taxonomy_primary)} · {d.city}, {d.region}</p></div>
            <div className="flex flex-wrap gap-1.5">
              <Badge tone={d.website_status === "has_site" ? "good" : d.website_status === "social_only" ? "warn" : "neutral"}>{d.website_status === "has_site" ? "Has website" : d.website_status === "social_only" ? "Social only" : "No website"}</Badge>
              {d.is_chain ? <Badge tone="info">Chain: {d.brand_name}</Badge> : <Badge>Independent</Badge>}
              {d.operating_status ? <Badge tone={d.operating_status === "open" ? "good" : "warn"}>{nice(d.operating_status)}</Badge> : null}
              {d.excluded ? <Badge tone="bad">Excluded</Badge> : null}
              {d.tags.map((t) => <Badge key={t} tone="info">{t}</Badge>)}
            </div>
            <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-2">
              <dt className="text-muted">Address</dt><dd>{d.contact?.address ?? "–"}{d.postcode ? `, ${d.postcode}` : ""}</dd>
              <dt className="text-muted">Phone</dt><dd>{d.contact?.phones.length ? d.contact.phones.map((p) => <div key={p} className="font-mono">{p}</div>) : "–"}</dd>
              <dt className="text-muted">Email</dt><dd>{d.contact?.emails.length ? d.contact.emails.map((p) => <div key={p} className="break-all">{p}</div>) : "–"}</dd>
              <dt className="text-muted">Websites</dt><dd>{d.contact?.websites.length ? d.contact.websites.map((p) => <div key={p} className="break-all">{p}</div>) : "–"}</dd>
              <dt className="text-muted">Social</dt><dd>{d.contact?.socials.length ? d.contact.socials.map((p) => <div key={p} className="break-all">{p}</div>) : "–"}</dd>
              <dt className="text-muted">Confidence</dt><dd>{d.confidence !== null ? d.confidence.toFixed(2) : "–"}</dd>
              <dt className="text-muted">Source</dt><dd>Overture Maps {d.source_release}<br /><span className="text-muted">first seen {d.first_seen}, last seen {d.last_seen}</span></dd>
              <dt className="text-muted">Legal status</dt><dd className="text-muted">Companies House check arrives with the compliance phase</dd>
            </dl>
            <iframe title="Map" loading="lazy" className="h-48 w-full rounded-lg border border-border" src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${d.lat},${d.lon}`} />
            <p className="text-xs text-muted">These contact details come from public Overture Maps data and are research hints only. Emailing from them is not enabled.</p>
            <div className="flex flex-wrap gap-2">
              <button disabled={busy} onClick={() => act("exclude", { country, ids: [d.gers_id], reason: "excluded from detail view" })} className="rounded-lg border border-danger/40 px-3 py-1.5 text-danger hover:bg-danger/10">Exclude permanently</button>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
