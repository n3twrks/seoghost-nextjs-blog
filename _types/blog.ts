// src/templates/saas/(seoghost)/_types/blog.ts
// Mirrors the shapes of the SEOGhost articles API (/api/v1/articles, /api/v1/tags).

export type { ArticleCta, ArticleCtaButtonRadius, ArticleCtaColors, NewsletterCtaDesign, Site } from './site';

export type ArticleTag = {
  name: string;
  slug: string;
};

export type CoverCredit = {
  name: string;
  url: string;
};

export type ArticleSummary = {
  id: string;
  title: string;
  slug: string;
  /** Absent on older API versions. */
  language?: string;
  excerpt: string | null;
  cover_image_url: string | null;
  cover_alt: string | null;
  cover_credit: CoverCredit | null;
  seo_title: string | null;
  meta_description: string | null;
  tags: ArticleTag[];
  published_at: string;
  updated_at: string | null;
  word_count: number | null;
  reading_time_minutes: number;
  author_name: string | null;
  author_avatar_url: string | null;
  /** Absent on older API versions. */
  author_bio?: string | null;
  author_profile_url?: string | null;
};

export type Article = ArticleSummary & {
  content_html: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
};

export type ArticlesResponse = {
  articles: ArticleSummary[];
  pagination: Pagination;
};

export type TagWithCount = ArticleTag & {
  count: number;
};
