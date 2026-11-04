import "server-only";

/**
 * Server-side access to the Lead Database API. Stage A: the API runs on the owner's Mac (127.0.0.1) and is reached only when the
 * dashboard itself runs on that Mac (see leaddb/open_leaddb.sh). Configured by LEADDB_API_URL and LEADDB_API_TOKEN (never sent to the browser).
 * On the public site these are unset and the Lead Database pages show an explanation instead.
 */
export function leaddbConfigured(): boolean {
  return Boolean(process.env.LEADDB_API_URL && process.env.LEADDB_API_TOKEN);
}

export const LEADDB_GET_PATHS = new Set(["health", "coverage", "imports", "regions", "cities", "categories", "segments", "place", "imports/status"]);
export const LEADDB_POST_PATHS = new Set(["count", "search", "segments", "exclude", "tag", "export", "promote", "imports/run"]);

export function pathAllowed(method: string, path: string): boolean {
  const clean = path.replace(/^\/+|\/+$/g, "");
  if (method === "GET") return LEADDB_GET_PATHS.has(clean);
  if (method === "POST") return LEADDB_POST_PATHS.has(clean) || /^segments\/\d+\/(refresh|delete)$/.test(clean);
  return false;
}

export async function leaddbFetch(path: string, init?: { method?: string; body?: unknown; search?: string }): Promise<Response> {
  const base = (process.env.LEADDB_API_URL ?? "").replace(/\/$/, "");
  return fetch(`${base}/api/${path.replace(/^\/+/, "")}${init?.search ?? ""}`, {
    method: init?.method ?? "GET",
    headers: { "X-Leaddb-Token": process.env.LEADDB_API_TOKEN ?? "", "Content-Type": "application/json" },
    body: init?.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
}

export async function leaddbJson<T>(path: string, init?: { method?: string; body?: unknown; search?: string }): Promise<T | null> {
  try {
    const r = await leaddbFetch(path, init);
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
}
