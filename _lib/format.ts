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
