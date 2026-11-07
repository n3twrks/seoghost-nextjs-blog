// src/templates/saas/(seoghost)/_lib/related.ts
import type { Article, ArticleSummary } from '../_types/blog';

export const RELATED_LIMIT = 3;

const byPublishedDesc = (a: ArticleSummary, b: ArticleSummary) =>
  new Date(b.published_at).getTime() - new Date(a.published_at).getTime();

/** Articles sharing the most tags with the current one, completed with the most recent. */
export function rankRelatedArticles(
  current: Pick<Article, 'slug' | 'tags'>,
  all: ArticleSummary[],
  limit = RELATED_LIMIT
): ArticleSummary[] {
  const candidates = all.filter((article) => article.slug !== current.slug);
  const currentTags = new Set(current.tags.map((tag) => tag.slug));

  const ranked = candidates
    .map((article) => ({
      article,
      overlap: article.tags.filter((tag) => currentTags.has(tag.slug)).length,
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || byPublishedDesc(a.article, b.article))
    .map(({ article }) => article)
    .slice(0, limit);

  if (ranked.length < limit) {
    const taken = new Set(ranked.map((article) => article.slug));
    ranked.push(
      ...candidates
        .filter((article) => !taken.has(article.slug))
        .sort(byPublishedDesc)
        .slice(0, limit - ranked.length)
    );
  }
  return ranked;
}
