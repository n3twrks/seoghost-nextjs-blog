// src/templates/saas/(seoghost)/blog/tag/[slug]/page.tsx — the articles of a tag: /blog/tag/wedding.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMessages } from '../../../_i18n';
import TagView from '../../../_views/TagView';
import { appearanceOf } from '../../../_lib/appearance';
import { getArticles, getTags } from '../../../_lib/blog';
import { getPageParam } from '../../../_lib/format';
import { blogPath, getLocale, installPath, type RouteParams } from '../../../_lib/locale';
import { getSite } from '../../../_lib/site';

type Props = {
  params: Promise<RouteParams & { slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

async function findTagName(slug: string, locale?: string): Promise<string | null> {
  const tags = await getTags(locale);
  return tags.find((tag) => tag.slug === slug)?.name ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const locale = getLocale(p);
  const [name, site] = await Promise.all([findTagName(p.slug, locale), getSite()]);
  const t = getMessages(locale ?? site?.language);
  if (!name) return { title: t.notFoundTitle };

  return {
    title: t.tagPageTitle(name),
    description: t.tagPageDescription(name),
    alternates: { canonical: `${blogPath(installPath(locale, site))}/tag/${p.slug}` },
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const p = await params;
  const locale = getLocale(p);
  const currentPage = getPageParam((await searchParams).page);
  const site = await getSite();

  const [name, { articles, pagination }] = await Promise.all([
    findTagName(p.slug, locale),
    getArticles({ tag: p.slug, page: currentPage, limit: appearanceOf(site).articles_per_page, locale }),
  ]);

  if (!name || articles.length === 0) notFound();

  return (
    <TagView
      tag={{ name, slug: p.slug }}
      articles={articles}
      pagination={pagination}
      site={site}
      currentPage={currentPage}
      basePath={blogPath(installPath(locale, site))}
      t={getMessages(locale ?? site?.language)}
    />
  );
}
