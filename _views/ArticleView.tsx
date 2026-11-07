// src/templates/saas/(seoghost)/_views/ArticleView.tsx
import Image from 'next/image';
import Link from 'next/link';

import type { Messages } from '../_i18n/messages';
import ArticleCtaBlock from '../_components/blog/ArticleCtaBlock';
import ArticleToc from '../_components/blog/ArticleToc';
import CategoryLink from '../_components/blog/CategoryLink';
import CoverCredit from '../_components/blog/CoverCredit';
import CoverImage from '../_components/blog/CoverImage';
import FooterBlock from '../_components/blog/FooterBlock';
import PoweredByBadge from '../_components/blog/PoweredByBadge';
import RelatedArticles from '../_components/blog/RelatedArticles';
import styles from '../_components/blog/ArticleContent.module.css';
import { appearanceOf } from '../_lib/appearance';
import { isArticleCtaVisible, splitAtFirstH2 } from '../_lib/article-cta';
import { formatDate } from '../_lib/format';
import { articleFaqJsonLd } from '../_lib/json-ld';
import { ensureHeadingIds } from '../_lib/toc';
import type { Article, ArticleSummary, Site } from '../_types/blog';

type Props = {
  article: Article;
  related: ArticleSummary[];
  site: Site | null;
  basePath: string;
  t: Messages;
  /** In-app preview: interactive elements such as the newsletter form are inert. */
  preview?: boolean;
};

export default function ArticleView({ article, related, site, basePath, t, preview }: Props) {
  const authorName = article.author_name;
  const authorAvatarUrl = article.author_avatar_url;
  const authorBio = article.author_bio ?? null;
  const authorProfileUrl = article.author_profile_url ?? null;

  const { html, items } = ensureHeadingIds(article.content_html);
  // The CTA block goes before the first h2. It is never part of the stored article.
  const cta = isArticleCtaVisible(site?.article_cta) ? site?.article_cta : null;
  const parts = cta ? splitAtFirstH2(html) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description || article.excerpt || undefined,
    image: article.cover_image_url ? [article.cover_image_url] : undefined,
    datePublished: article.published_at,
    dateModified: article.updated_at ?? article.published_at,
    author: authorName
      ? {
          '@type': 'Person',
          name: authorName,
          description: authorBio ?? undefined,
          sameAs: authorProfileUrl ? [authorProfileUrl] : undefined,
        }
      : undefined,
  };

  const faqJsonLd = articleFaqJsonLd(article.content_html);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
        />
      )}

      <Link
        href={basePath}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <span aria-hidden="true">←</span> {t.backToBlog}
      </Link>

      <article className="mt-8">
        <header className="mx-auto max-w-5xl text-center">
          <CategoryLink tag={article.tags[0]} basePath={basePath} fallbackLabel={t.defaultCategory} />
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-5 text-lg leading-8 text-slate-600">{article.excerpt}</p>
          ) : null}

          <div className="mt-8 flex flex-col items-center gap-3">
            {authorName ? (
              <div className="flex items-center gap-3">
                {authorAvatarUrl ? (
                  <Image src={authorAvatarUrl} alt="" width={48} height={48} className="h-12 w-12 flex-none rounded-full object-cover" />
                ) : null}
                <div className="flex flex-col items-start text-left">
                  {authorProfileUrl ? (
                    <a
                      href={authorProfileUrl}
                      target="_blank"
                      rel="author noopener"
                      className="text-lg font-semibold leading-tight text-slate-900 hover:underline"
                    >
                      {authorName}
                    </a>
                  ) : (
                    <span className="text-lg font-semibold leading-tight text-slate-900">{authorName}</span>
                  )}
                  {authorBio ? <p className="max-w-md text-sm text-slate-500">{authorBio}</p> : null}
                </div>
              </div>
            ) : null}
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <time dateTime={article.published_at}>{formatDate(article.published_at, t.dateLocale)}</time>
              <span aria-hidden="true">·</span>
              <span>
                {article.reading_time_minutes} {t.minRead}
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto mt-10 max-w-5xl">
          <CoverImage
            src={article.cover_image_url}
            alt={article.cover_alt ?? article.title}
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
            className="aspect-[16/9] rounded-2xl"
          />
          <CoverCredit credit={article.cover_credit} t={t} />
        </div>

        <div className="mx-auto mt-12 max-w-5xl xl:grid xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-12">
          <aside className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <ArticleToc items={items} maxLevel={appearanceOf(site).toc_max_level} t={t} />
            </div>
          </aside>
          <div className="mx-auto w-full max-w-3xl xl:mx-0">
            {cta && parts ? (
              <>
                <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: parts.before }} />
                <ArticleCtaBlock
                  cta={cta}
                  accent={appearanceOf(site).accent}
                  articleSlug={article.slug}
                  locale={site?.language ?? 'en'}
                />
                {parts.after ? <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: parts.after }} /> : null}
              </>
            ) : (
              <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: html }} />
            )}
          </div>
        </div>
      </article>

      <FooterBlock site={site} t={t} source={article.slug} preview={preview} />
      <RelatedArticles
        articles={related}
        basePath={basePath}
        t={t}
      />
      <PoweredByBadge site={site} t={t} />
    </main>
  );
}
