// src/templates/saas/(seoghost)/_lib/locale.ts
//
// Where the blog and the pages live, from the route params. Next.js passes the
// params of the parent folders, so the same folder works in app/,
// app/[locale]/ (whatever the segment is named) and app/guides/.
import type { Site } from '../_types/site';

/** Route params: the page's own ones, plus your locale segment when (seoghost)/ sits under one. */
export type RouteParams = { [param: string]: string | string[] | undefined };

/** Params of this folder's own routes: never a locale. */
const OWN_PARAMS = new Set(['slug', 'collection']);

const LOCALE_PATTERN = /^[a-z]{2,3}([-_][a-z0-9]{2,8})?$/i;

/**
 * The locale of the URL (app/[locale]/(seoghost)/…, app/[lang]/…), or
 * undefined without a locale segment. A parent param that does not look like a
 * locale (app/[tenant]/…) is ignored.
 */
export function getLocale(params: RouteParams | null | undefined): string | undefined {
  // A route handler with no dynamic segment above it (install case 1) gets no params at all.
  for (const [key, value] of Object.entries(params ?? {})) {
    if (!OWN_PARAMS.has(key) && typeof value === 'string' && LOCALE_PATTERN.test(value)) return value;
  }
  return undefined;
}

/**
 * The locale of a blog URL, for the components that receive no params
 * (not-found.tsx, error.tsx): a locale-shaped segment before "blog" —
 * /fr/blog/x → "fr", /fr/guides/blog → "fr", /blog/x or /guides/blog → undefined.
 */
export function localeFromBlogPath(pathname: string): string | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const blogIndex = segments.indexOf('blog');
  return (blogIndex >= 0 ? segments.slice(0, blogIndex) : []).find((segment) => LOCALE_PATTERN.test(segment));
}

/** "fr" matches "fr-FR" (and the reverse); "fr-FR" does not match "fr-CA". */
export function matchesLocale(language: string, locale: string | undefined): boolean {
  if (!locale) return true;
  const [lang, region] = language.toLowerCase().replace('_', '-').split('-');
  const [want, wantRegion] = locale.toLowerCase().replace('_', '-').split('-');
  return lang === want && (!region || !wantRegion || region === wantRegion);
}

/** 'guides/' → '/guides', '' → ''. */
const trim = (path: string) => path.replace(/^\/*/, '/').replace(/\/+$/, '');

/** {install}: '' (app/), '/fr' (app/[locale]/), '/guides' or '/fr/guides' (case 3, "Pages install path" in SEOGhost). */
export function installPath(locale: string | undefined, site: Pick<Site, 'pages_install_path'> | null | undefined): string {
  return `${locale ? `/${locale}` : ''}${trim(site?.pages_install_path ?? '')}`;
}

export function homePath(locale?: string): string {
  return locale ? `/${locale}` : '/';
}

/** The blog root: {install}/blog. */
export function blogPath(install: string): string {
  return `${install}/blog`;
}

export function hubPath(install: string, routePrefix: string): string {
  return `${install}/${routePrefix}`;
}

export function pagePath(install: string, routePrefix: string, slug: string): string {
  return `${install}/${routePrefix}/${slug}`;
}
