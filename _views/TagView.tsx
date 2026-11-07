// src/templates/saas/(seoghost)/_views/TagView.tsx
import Link from 'next/link';

import type { Messages } from '../_i18n/messages';
import ArticleGrid from '../_components/blog/ArticleGrid';
import PageHeader from '../_components/blog/PageHeader';
import Pagination from '../_components/blog/Pagination';
import type { ArticleSummary, Site, Pagination as PaginationData } from '../_types/blog';

type Props = {
  tag: { name: string; slug: string };
  articles: ArticleSummary[];
  pagination: PaginationData;
  site: Site | null;
  currentPage: number;
  basePath: string;
  t: Messages;
};

export default function TagView({ tag, articles, pagination, currentPage, basePath, t }: Props) {
  return (
    <main>
      <Link
        href={basePath}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <span aria-hidden="true">←</span> {t.backToBlog}
      </Link>

      <div className="mt-8">
        <PageHeader badge={t.badge} title={t.tagPageTitle(tag.name)} description={t.tagPageDescription(tag.name)} />
      </div>

      <div className="mt-16">
        <ArticleGrid
          articles={articles}
          basePath={basePath}
          t={t}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={pagination.total_pages}
        basePath={`${basePath}/tag/${tag.slug}`}
        t={t}
      />
    </main>
  );
}
