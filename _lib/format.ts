// src/templates/saas/(seoghost)/_lib/format.ts

export function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Parses ?page=, falling back to 1 for anything that is not a positive integer. */
export function getPageParam(value: string | undefined): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

/**
 * Which articles the blog index asks for. The featured article (first page) sits on top of the grid and does not take one of its
 * places: the grid always holds `perPage` articles, so its last row is full (12 = 4 rows of 3 or 6 rows of 2). The pages after the
 * first one start after it. Capped so that featured + grid fit in the API's page size (50).
 */
export function blogIndexWindow(currentPage: number, perPage: number): { limit: number; offset: number; perPage: number } {
  const size = Math.min(Math.max(1, perPage), 49);
  return currentPage === 1
    ? { limit: size + 1, offset: 0, perPage: size }
    : { limit: size, offset: 1 + (currentPage - 1) * size, perPage: size };
}

/** Number of pages of the blog index: the featured article is not part of the grid pages. */
export function blogIndexTotalPages(total: number, perPage: number): number {
  return Math.max(1, Math.ceil((total - 1) / perPage));
}
