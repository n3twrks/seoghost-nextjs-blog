// src/templates/saas/(seoghost)/blog/[slug]/page.tsx — one article: /blog/my-article, /fr/blog/mon-article.
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { getMessages } from '../../_i18n';
import ArticleView from '../../_views/ArticleView';
import { getAllArticles, getArticle, getRelatedArticles, isArticleGone } from '../../_lib/blog';
import { blogPath, getLocale, installPath, type RouteParams } from '../../_lib/locale';
import { getSite } from '../../_lib/site';

type Props = {
  params: Promise<RouteParams & { slug: string }>;
};

// Under app/[locale]/, Next.js passes the parent locale: only its articles are listed.
// A failing API at build time must not fail the build: pages are then generated on first request.
export async function generateStaticParams({ params }: { params: RouteParams }) {
  try {
    return (await getAllArticles(getLocale(params))).map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const locale = getLocale(p);
  const [article, site] = await Promise.all([getArticle(p.slug, locale), getSite()]);
  if (!article) return { title: getMessages(locale ?? site?.language).notFoundTitle };

  const title = article.seo_title || article.title;
  const description = article.meta_description || article.excerpt || undefined;

  return {
    title,
    description,
    alternates: { canonical: `${blogPath(installPath(locale, site))}/${article.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: article.published_at,
      modifiedTime: article.updated_at ?? undefined,
      images: article.cover_image_url ? [{ url: article.cover_image_url }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const p = await params;
  const locale = getLocale(p);
  const article = await getArticle(p.slug, locale);
  if (!article) {
    // Taken down by the client: send visitors (and Google) to the blog.
    if (await isArticleGone(p.slug, locale)) redirect(blogPath(installPath(locale, await getSite())));
    notFound();
  }

  const [site, related] = await Promise.all([getSite(), getRelatedArticles(article, locale)]);

  return (
    <ArticleView
      article={article}
      related={related}
      site={site}
      basePath={blogPath(installPath(locale, site))}
      t={getMessages(locale ?? article.language ?? site?.language)}
    />
  );
}
