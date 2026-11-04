export type Coverage = { country: string; name: string; places: number; with_phone: number; with_email: number; with_site: number; release: string; pct_phone: number; pct_email: number; pct_site: number };
export type Place = {
  gers_id: string; name: string; taxonomy_primary: string | null; basic_category: string | null; tax_l0: string | null; tax_l1: string | null; tax_l2: string | null; country: string; region: string; city: string;
  postcode: string | null; lat: number; lon: number; confidence: number | null; operating_status: string | null; brand_name: string | null; is_chain: boolean; is_business: boolean;
  has_phone: boolean; has_email: boolean; website_domain: string | null; website_status: "none" | "social_only" | "has_site"; has_social: boolean; first_seen: string | null; last_seen: string | null;
  source_release: string; tags: string[];
};
export type PlaceDetail = Place & { contact: { address: string | null; phones: string[]; emails: string[]; websites: string[]; socials: string[] } | null; excluded: boolean };
export type CatNode = { label: string; value: string | null; level: "l0" | "l1" | "l2"; count: number; children: CatNode[] };
export type Filters = {
  country: string; region?: string; city?: string; categories?: [string, string][]; has_phone?: boolean; has_email?: boolean; website_status?: string[]; min_confidence?: number;
  independent?: boolean; not_prospect?: boolean; not_suppressed?: boolean; q?: string;
};
export type Segment = { id: number; name: string; filters: Filters; created: string; history: { ts: string; release: string; places: number }[] };

export const COLUMNS: { key: string; label: string; default: boolean; sort?: string }[] = [
  { key: "name", label: "Business", default: true, sort: "name" }, { key: "category", label: "Type", default: true, sort: "category" }, { key: "city", label: "City", default: true, sort: "city" },
  { key: "phone", label: "Phone", default: true, sort: "phone" }, { key: "email", label: "Email", default: true, sort: "email" }, { key: "website", label: "Website", default: true, sort: "website" },
  { key: "confidence", label: "Confidence", default: true, sort: "confidence" }, { key: "chain", label: "Chain", default: false }, { key: "postcode", label: "Postcode", default: false },
  { key: "first_seen", label: "First seen", default: false, sort: "first_seen" }, { key: "tags", label: "Tags", default: true },
];

export async function api<T>(path: string, body?: unknown, search = "", signal?: AbortSignal): Promise<{ ok: boolean; status: number; data: T & { error?: string } }> {
  try {
    const r = await fetch(`/admin/leads/api/${path}${search}`, { method: body === undefined ? "GET" : "POST", headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body), cache: "no-store", signal });
    let data = {} as T & { error?: string };
    try { data = await r.json(); } catch { /* empty */ }
    return { ok: r.ok, status: r.status, data };
  } catch {
    return { ok: false, status: 0, data: { error: "cancelled" } as never };
  }
}
export const nice = (s: string | null | undefined) => (s ? s.replace(/_/g, " ") : "Uncategorised");
export const num = (n: number) => n.toLocaleString("en-GB");

export type PromoResult = { gers_id: string; name: string; city: string; allowed: boolean; reasons: string[]; category: string | null; scope: string | null; lead_id: number | null };
export type PromoResponse = { preview: boolean; results: PromoResult[]; allowed: number; blocked: number };
export type Rule = { country: string; name: string; allow_promote: number; note: string; updated: string };
