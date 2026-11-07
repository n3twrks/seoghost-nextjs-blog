// src/templates/saas/(seoghost)/_components/blog/RelatedArticles.tsx
import type { Messages } from '../../_i18n/messages';
import type { ArticleSummary } from '../../_types/blog';
import ArticleGrid from './ArticleGrid';

type Props = {
  articles: ArticleSummary[];
  basePath: string;
  t: Messages;
};

export default function RelatedArticles({ articles, basePath, t }: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-24">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight text-slate-900">{t.keepReading}</h2>
      <ArticleGrid
        articles={articles}
        basePath={basePath}
        t={t}
      />
    </section>
  );
}
