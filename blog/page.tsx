// src/templates/saas/(seoghost)/blog/page.tsx — the blog index: /blog, /fr/blog (?page=2).
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMessages } from '../_i18n';
import BlogIndexView from '../_views/BlogIndexView';
import { appearanceOf } from '../_lib/appearance';
import { getArticles } from '../_lib/blog';
import { getPageParam } from '../_lib/format';
import { blogPath, getLocale, installPath, matchesLocale, type RouteParams } from '../_lib/locale';
import { getSite } from '../_lib/site';

type Props = {
  params: Promise<RouteParams>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = getLocale(await params);
  const site = await getSite();
  const t = getMessages(locale ?? site?.language);

  return {
    title: t.metaTitle,
    description: t.description,
    alternates: { canonical: blogPath(installPath(locale, site)) },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const locale = getLocale(await params);
  const currentPage = getPageParam((await searchParams).page);
  const site = await getSite();

  const { articles, pagination } = await getArticles({
    page: currentPage,
    limit: appearanceOf(site).articles_per_page,
    locale,
  });

  // No article in this locale: the empty state under the site language, a 404 under any other.
  if (articles.length === 0 && locale && site && !matchesLocale(site.language, locale)) notFound();

  return (
    <BlogIndexView
      articles={articles}
      pagination={pagination}
      site={site}
      currentPage={currentPage}
      basePath={blogPath(installPath(locale, site))}
      t={getMessages(locale ?? site?.language)}
    />
  );
}
