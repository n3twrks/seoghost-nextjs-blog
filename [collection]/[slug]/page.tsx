// src/templates/saas/(seoghost)/[collection]/[slug]/page.tsx — one programmatic page: /chanson-personnalisee/pour-anniversaire.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMessages } from '../../_i18n';
import { pageJsonLd } from '../../_lib/json-ld';
import { getLocale, homePath, hubPath, installPath, pagePath, type RouteParams } from '../../_lib/locale';
import { getBrand } from '../../_lib/brand';
import { getPage, getPages } from '../../_lib/pages';
import { getSite } from '../../_lib/site';
import { PageTemplate } from '../../_templates';

type Props = { params: Promise<RouteParams & { collection: string; slug: string }> };

// Under app/[locale]/, Next.js passes the parent locale: only its collections are listed.
// A failing API at build time must not fail the build: pages are then rendered on first request.
export async function generateStaticParams({ params }: { params: RouteParams }) {
  try {
    return (await getPages(getLocale(params))).pages.map((p) => ({ collection: p.route_prefix, slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const locale = getLocale(p);
  const [page, site] = await Promise.all([getPage(p.collection, p.slug, locale), getSite()]);
  if (!page) return { title: getMessages(locale).notFoundTitle };

  const title = page.meta_title || page.title;
  const description = page.meta_description ?? undefined;
  return {
    title,
    description,
    alternates: { canonical: pagePath(installPath(locale, site), page.route_prefix, page.slug) },
    openGraph: { type: 'website', title, description },
  };
}

export default async function ProgrammaticPageRoute({ params }: Props) {
  const p = await params;
  const locale = getLocale(p);
  const page = await getPage(p.collection, p.slug, locale);
  if (!page) notFound();

  const [site, brand] = await Promise.all([getSite(), getBrand()]);
  const t = getMessages(locale ?? page.language);
  const install = installPath(locale, site);
  const home = homePath(locale);
  const origin = (process.env.NEXT_PUBLIC_SEOGHOST_SITE_URL ?? '').replace(/\/$/, '');
  const jsonLd = pageJsonLd(
    page,
    {
      home: `${origin}${home}`,
      hub: `${origin}${hubPath(install, page.route_prefix)}`,
      page: `${origin}${pagePath(install, page.route_prefix, page.slug)}`,
    },
    { home: t.home, hub: page.collection.hub_title || page.collection.name }
  );

  return <PageTemplate page={page} install={install} home={home} t={t} locale={locale ?? page.language} jsonLd={jsonLd} brand={brand} />;
}
