// src/templates/saas/(seoghost)/_components/blog/FeaturedArticle.tsx
import Link from 'next/link';

import type { Messages } from '../../_i18n/messages';
import type { ArticleSummary } from '../../_types/blog';
import AuthorLine from './AuthorLine';
import CategoryLink from './CategoryLink';
import CoverImage from './CoverImage';

type Props = {
  article: ArticleSummary;
  basePath: string;
  t: Messages;
};

export default function FeaturedArticle({ article, basePath, t }: Props) {
  return (
    <article className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <Link href={`${basePath}/${article.slug}`} aria-label={article.title} tabIndex={-1}>
        <CoverImage
          src={article.cover_image_url}
          alt={article.cover_alt ?? article.title}
          sizes="(min-width: 1024px) 560px, 100vw"
          priority
          className="aspect-[4/3] rounded-2xl"
        />
      </Link>

      <div className="flex flex-col gap-4">
        <CategoryLink tag={article.tags[0]} basePath={basePath} fallbackLabel={t.defaultCategory} />
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 lg:text-4xl">
          <Link href={`${basePath}/${article.slug}`} className="hover:text-[color:var(--sg-accent)]">
            {article.title}
          </Link>
        </h2>
        {article.excerpt ? (
          <p className="line-clamp-4 text-base leading-7 text-slate-600">{article.excerpt}</p>
        ) : null}
        <AuthorLine authorName={article.author_name} authorAvatarUrl={article.author_avatar_url} date={article.published_at} t={t} />
        <Link
          href={`${basePath}/${article.slug}`}
          className="mt-1 text-sm font-semibold text-[color:var(--sg-accent)] hover:underline"
        >
          {t.readMoreLabel} →
        </Link>
      </div>
    </article>
  );
}
