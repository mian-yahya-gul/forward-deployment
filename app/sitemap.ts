import type { MetadataRoute } from "next";

import { industries } from "@/lib/data/industries";
import { articles } from "@/lib/data/insights";
import { services } from "@/lib/data/services";
import { siteUrl } from "@/lib/data/site";
import { stories } from "@/lib/data/stories";

const staticRoutes = [
  "",
  "/services",
  "/industries",
  "/case-studies",
  "/insights",
  "/about",
  "/careers",
  "/contact",
  "/partners",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const industryEntries: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${siteUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
  }));

  const storyEntries: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${siteUrl}/case-studies/${story.slug}`,
    lastModified: new Date(),
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/insights/${article.slug}`,
    lastModified: new Date(article.publishedDate),
  }));

  return [...staticEntries, ...serviceEntries, ...industryEntries, ...storyEntries, ...articleEntries];
}
