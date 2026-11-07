// src/templates/saas/(seoghost)/seoghost/sitemap.xml/route.ts
//
// Served at {install}/seoghost/sitemap.xml: the blog (index, articles, tags)
// and the programmatic pages (hubs, pages) of the URL locale, or of every
// language without a locale segment. The only sitemap to submit to Google
// Search Console, or merge _lib/sitemap-entries.ts into your root sitemap.
// A route handler, not a sitemap.ts: it receives the locale of the parent folder.
import { getSeoghostSitemapEntries } from '../../_lib/sitemap-entries';
import { getLocale, type RouteParams } from '../../_lib/locale';

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET(_req: Request, { params }: { params: Promise<RouteParams> }) {
  const url = process.env.NEXT_PUBLIC_SEOGHOST_SITE_URL;
  if (!url) throw new Error('NEXT_PUBLIC_SEOGHOST_SITE_URL is not set. Add it to your .env.local.');

  const entries = await getSeoghostSitemapEntries(url, getLocale(await params));
  const body = entries
    .map((e) => {
      const lastmod = e.lastModified ? `<lastmod>${new Date(e.lastModified).toISOString()}</lastmod>` : '';
      return `<url><loc>${escapeXml(e.url)}</loc>${lastmod}</url>`;
    })
    .join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
