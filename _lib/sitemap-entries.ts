// src/templates/saas/(seoghost)/_lib/sitemap-entries.ts
//
// Every URL of this folder: blog index, articles, tags, collection hubs and
// pages. Served at {install}/seoghost/sitemap.xml; you can also merge it into
// your root sitemap.ts instead:
//   ...(await getSeoghostSitemapEntries('https://yoursite.com'))
// Multilingual site (app/[locale]/): call it once per locale:
//   ...(await getSeoghostSitemapEntries('https://yoursite.com', 'fr'))
import type { MetadataRoute } from 'next';

import { getAllArticles, getTags } from './blog';
import { blogPath, hubPath, installPath, pagePath } from './locale';
import { getPages } from './pages';
import { getSite } from './site';

export async function getSeoghostSitemapEntries(baseUrl: string, locale?: string): Promise<MetadataRoute.Sitemap> {
  const [site, articles, tags, { pages, collections }] = await Promise.all([
    getSite(),
    getAllArticles(locale),
    getTags(locale),
    getPages(locale),
  ]);
  const base = baseUrl.replace(/\/$/, '');
  const install = installPath(locale, site);
  const blog = blogPath(install);

  return [
    ...(articles.length
      ? [{ url: `${base}${blog}`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 }]
      : []),
    ...articles.map((article) => ({
      url: `${base}${blog}/${article.slug}`,
      lastModified: new Date(article.updated_at ?? article.published_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...tags.map((tag) => ({
      url: `${base}${blog}/tag/${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    })),
    ...collections.map((c) => ({
      url: `${base}${hubPath(install, c.route_prefix)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...pages.map((page) => ({
      url: `${base}${pagePath(install, page.route_prefix, page.slug)}`,
      lastModified: new Date(page.updated_at ?? page.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
