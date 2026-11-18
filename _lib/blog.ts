// src/templates/saas/(seoghost)/_lib/blog.ts
//
// Blog data from the SEOGhost API. `locale` (the URL locale, if any) keeps
// the articles of that language only. Server-side only (see api.ts).
import type { Article, ArticleSummary, ArticlesResponse } from '../_types/blog';
import { request } from './api';
import { rankRelatedArticles } from './related';

const MAX_PAGE_SIZE = 50;

export async function getArticles(
  params: { page?: number; limit?: number; tag?: string; locale?: string } = {}
): Promise<ArticlesResponse> {
  const { page = 1, limit = 12, tag, locale } = params;
  const data = await request<ArticlesResponse>('articles', { locale, params: { page, limit, ...(tag ? { tag } : {}) } });
  return data ?? { articles: [], pagination: { page, limit, total: 0, total_pages: 0 } };
}

export async function getArticle(slug: string, locale?: string): Promise<Article | null> {
  return (await request<{ article: Article }>(`articles/${encodeURIComponent(slug)}`, { locale }))?.article ?? null;
}

/** The article was taken down by the client: its address redirects to the blog instead of a 404. */
export async function isArticleGone(slug: string, locale?: string): Promise<boolean> {
  return Boolean((await request<{ article: Article | null; gone?: boolean }>(`articles/${encodeURIComponent(slug)}`, { locale }))?.gone);
}

/** Every published article, for the sitemap, static params and related articles. */
export async function getAllArticles(locale?: string): Promise<ArticleSummary[]> {
  const all: ArticleSummary[] = [];

  for (let page = 1; ; page++) {
    const { articles, pagination } = await getArticles({ page, limit: MAX_PAGE_SIZE, locale });
    all.push(...articles);
    if (page >= pagination.total_pages) break;
  }
  return all;
}

/** Ranked by SEOGhost: same cluster first, then closest in meaning, then newest. The tag ranking is the fallback of an older API. */
export async function getRelatedArticles(current: Article, locale?: string, limit?: number): Promise<ArticleSummary[]> {
  const res = await request<{ articles: ArticleSummary[] }>(`articles/${encodeURIComponent(current.slug)}/related`, {
    locale,
    params: limit ? { limit } : {},
  });
  return res?.articles ?? rankRelatedArticles(current, await getAllArticles(locale), limit);
}
