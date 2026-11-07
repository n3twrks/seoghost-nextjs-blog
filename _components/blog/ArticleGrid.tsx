// src/templates/saas/(seoghost)/_components/blog/ArticleGrid.tsx
import type { Messages } from '../../_i18n/messages';
import type { ArticleSummary } from '../../_types/blog';
import ArticleCard from './ArticleCard';

type Props = {
  articles: ArticleSummary[];
  basePath: string;
  t: Messages;
};

export default function ArticleGrid({ articles, basePath, t }: Props) {
  if (articles.length === 0) return null;

  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          basePath={basePath}
          t={t}
        />
      ))}
    </div>
  );
}
