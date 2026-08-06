import { articles, type Article } from "@/lib/data/insights";
import { stories, type Story } from "@/lib/data/stories";

function matchesAny(itemSlugs: string[], targetSlugs: string[]) {
  return itemSlugs.some((slug) => targetSlugs.includes(slug));
}

/** Filters by industry/service slug match, falling back to the first N items so the section is never empty. */
export function getRelatedStories(
  { industrySlugs = [], serviceSlugs = [] }: { industrySlugs?: string[]; serviceSlugs?: string[] },
  limit = 3,
): Story[] {
  const matched = stories.filter(
    (story) =>
      matchesAny(story.relatedIndustrySlugs, industrySlugs) ||
      matchesAny(story.relatedServiceSlugs, serviceSlugs),
  );
  const result = matched.length > 0 ? matched : stories;
  return result.slice(0, limit);
}

export function getRelatedInsights(
  { industrySlugs = [], serviceSlugs = [] }: { industrySlugs?: string[]; serviceSlugs?: string[] },
  limit = 3,
  excludeSlug?: string,
): Article[] {
  const pool = excludeSlug ? articles.filter((article) => article.slug !== excludeSlug) : articles;
  const matched = pool.filter(
    (article) =>
      matchesAny(article.relatedIndustrySlugs, industrySlugs) ||
      matchesAny(article.relatedServiceSlugs, serviceSlugs),
  );
  const result = matched.length > 0 ? matched : pool;
  return result.slice(0, limit);
}
