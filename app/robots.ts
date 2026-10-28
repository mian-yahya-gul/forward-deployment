import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/data/site";

/**
 * Everything public is crawlable, including AI search crawlers (OAI-SearchBot, PerplexityBot,
 * Claude-SearchBot, Googlebot) so the site can be cited in AI answers. API routes and the
 * local-only preview pages are excluded.
 *
 * To opt out of model *training* only, add separate rules disallowing GPTBot, ClaudeBot,
 * Google-Extended and CCBot — leave the search crawlers above allowed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/preview/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
