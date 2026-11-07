// src/templates/saas/(seoghost)/_components/blog/Pagination.tsx
import Link from 'next/link';

import type { Messages } from '../../_i18n/messages';

type Props = {
  currentPage: number;
  totalPages: number;
  /** Path of the listing, e.g. /blog or /blog/tag/guides. */
  basePath: string;
  t: Messages;
};

const hrefFor = (basePath: string, page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);

/** First, last and the neighbors of the current page, with gaps marked as null. */
function visiblePages(current: number, total: number): (number | null)[] {
  const wanted = [...new Set([1, current - 1, current, current + 1, total])]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const result: (number | null)[] = [];
  wanted.forEach((page, index) => {
    if (index > 0 && page - wanted[index - 1] > 1) result.push(null);
    result.push(page);
  });
  return result;
}

const linkClass =
  'inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors';

// Real links (not a "load more" button) so search engines can follow them.
export default function Pagination({ currentPage, totalPages, basePath, t }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={hrefFor(basePath, currentPage - 1)}
          rel="prev"
          className={`${linkClass} border-slate-200 text-slate-700 hover:bg-slate-50`}
        >
          {t.previous}
        </Link>
      ) : null}

      {visiblePages(currentPage, totalPages).map((page, index) =>
        page === null ? (
          <span key={`gap-${index}`} className="px-1 text-slate-400" aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={hrefFor(basePath, page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={
              page === currentPage
                ? `${linkClass} border-transparent bg-[color:var(--sg-accent)] text-white`
                : `${linkClass} border-slate-200 text-slate-700 hover:bg-slate-50`
            }
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={hrefFor(basePath, currentPage + 1)}
          rel="next"
          className={`${linkClass} border-slate-200 text-slate-700 hover:bg-slate-50`}
        >
          {t.next}
        </Link>
      ) : null}
    </nav>
  );
}
