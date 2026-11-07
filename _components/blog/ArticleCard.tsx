// src/templates/saas/(seoghost)/_components/blog/ArticleCard.tsx
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

export default function ArticleCard({ article, basePath, t }: Props) {
  return (
    <article className="group flex flex-col gap-4">
      <Link href={`${basePath}/${article.slug}`} aria-label={article.title} tabIndex={-1}>
        <CoverImage
          src={article.cover_image_url}
          alt={article.cover_alt ?? article.title}
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/10] rounded-xl"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <CategoryLink tag={article.tags[0]} basePath={basePath} fallbackLabel={t.defaultCategory} />
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-slate-900">
          <Link href={`${basePath}/${article.slug}`} className="hover:text-[color:var(--sg-accent)]">
            {article.title}
          </Link>
        </h3>
        {article.excerpt ? (
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">{article.excerpt}</p>
        ) : null}
      </div>

      <AuthorLine authorName={article.author_name} authorAvatarUrl={article.author_avatar_url} date={article.published_at} t={t} />
    </article>
  );
}
