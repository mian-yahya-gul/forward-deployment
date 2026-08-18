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
  "/playbook",
];

/**
 * The Forward Deployment Playbook (public/book/) is a static Docusaurus
 * export, not a Next.js route — its pages don't exist as files under app/,
 * so they can't be discovered by generateStaticParams the way every other
 * sitemap section here is. Kept as an explicit slug list mirroring the
 * directories in public/book/{foundations,industries,next-steps}/.
 */
const bookFoundationSlugs = ["workflows-not-tools", "forward-deployment-model", "how-to-use-this-book"];
const bookIndustrySlugs = [
  "healthcare",
  "education",
  "retail-ecommerce",
  "manufacturing",
  "logistics-supply-chain",
  "financial-services",
  "government",
  "agriculture",
  "aviation",
  "airline-ticketing",
  "oil-gas",
  "professional-services",
  "insurance",
  "legal-services",
  "real-estate",
  "energy-utilities",
  "hospitality-travel",
  "life-sciences-pharmaceuticals",
  "construction-engineering",
];
const bookNextStepsSlugs = ["choosing-your-starting-workflow", "working-with-deosai-labs"];

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

  const bookEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/book/preface`, lastModified: new Date() },
    ...bookFoundationSlugs.map((slug) => ({ url: `${siteUrl}/book/foundations/${slug}`, lastModified: new Date() })),
    ...bookIndustrySlugs.map((slug) => ({ url: `${siteUrl}/book/industries/${slug}`, lastModified: new Date() })),
    ...bookNextStepsSlugs.map((slug) => ({ url: `${siteUrl}/book/next-steps/${slug}`, lastModified: new Date() })),
  ];

  return [
    ...staticEntries,
    ...serviceEntries,
    ...industryEntries,
    ...storyEntries,
    ...articleEntries,
    ...bookEntries,
  ];
}
