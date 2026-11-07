// src/templates/saas/(seoghost)/_views/BlogIndexView.tsx
//
// Body of the blog index. Pure rendering: the page (or a preview) fetches the
// data and passes it in, so the same markup serves both.
import type { Messages } from '../_i18n/messages';
import ArticleGrid from '../_components/blog/ArticleGrid';
import EmptyState from '../_components/blog/EmptyState';
import FeaturedArticle from '../_components/blog/FeaturedArticle';
import FooterBlock from '../_components/blog/FooterBlock';
import PoweredByBadge from '../_components/blog/PoweredByBadge';
import PageHeader from '../_components/blog/PageHeader';
import Pagination from '../_components/blog/Pagination';
import type { ArticleSummary, Site, Pagination as PaginationData } from '../_types/blog';

type Props = {
  articles: ArticleSummary[];
  pagination: PaginationData;
  site: Site | null;
  currentPage: number;
  basePath: string;
  t: Messages;
  /** In-app preview: interactive elements such as the newsletter form are inert. */
  preview?: boolean;
};

export default function BlogIndexView({ articles, pagination, site, currentPage, basePath, t, preview }: Props) {
  // The most recent article is featured on the first page only.
  const featured = currentPage === 1 ? articles[0] : undefined;
  const gridArticles = featured ? articles.slice(1) : articles;

  return (
    <main>
      <PageHeader badge={t.badge} title={t.title} description={t.description} />

      {articles.length === 0 ? (
        <div className="mt-16">
          <EmptyState t={t} />
        </div>
      ) : (
        <>
          {featured ? (
            <div className="mt-16 md:mt-20">
              <h2 className="mb-8 text-2xl font-semibold tracking-tight text-slate-900">{t.featuredTitle}</h2>
              <FeaturedArticle
                article={featured}
                basePath={basePath}
                t={t}
              />
            </div>
          ) : null}

          {gridArticles.length > 0 ? (
            <div className={featured ? 'mt-20 border-t border-slate-200 pt-16' : 'mt-16'}>
              <h2 className="mb-8 text-2xl font-semibold tracking-tight text-slate-900">{t.latestTitle}</h2>
              <ArticleGrid
                articles={gridArticles}
                basePath={basePath}
                t={t}
              />
            </div>
          ) : null}

          <Pagination currentPage={currentPage} totalPages={pagination.total_pages} basePath={basePath} t={t} />
        </>
      )}

      <FooterBlock site={site} t={t} source="blog" preview={preview} />
      <PoweredByBadge site={site} t={t} />
    </main>
  );
}
