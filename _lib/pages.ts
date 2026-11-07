// src/templates/saas/(seoghost)/_lib/pages.ts
//
// Programmatic pages data from the SEOGhost API. Server-side only (see api.ts).
import type { Collection, PageSummary, ProgrammaticPage } from '../_types/pages';
import { request } from './api';

const PREFIX_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Published pages and their collections, of `locale` only when given. */
export async function getPages(locale?: string): Promise<{ pages: PageSummary[]; collections: Collection[] }> {
  return (await request<{ pages: PageSummary[]; collections: Collection[] }>('pages', { locale })) ?? { pages: [], collections: [] };
}

/**
 * [collection] catches every first-level path your own routes do not match
 * (typos, bots…). Only the prefixes of the cached collection list reach the API.
 */
async function isKnownPrefix(prefix: string, locale?: string): Promise<boolean> {
  if (!PREFIX_PATTERN.test(prefix)) return false;
  try {
    return (await getPages(locale)).collections.some((c) => c.route_prefix === prefix);
  } catch {
    return false;
  }
}

export async function getCollection(prefix: string, locale?: string): Promise<{ collection: Collection; pages: PageSummary[] } | null> {
  if (!(await isKnownPrefix(prefix, locale))) return null;
  return request<{ collection: Collection; pages: PageSummary[] }>(`collections/${encodeURIComponent(prefix)}`, { locale });
}

export async function getPage(prefix: string, slug: string, locale?: string): Promise<ProgrammaticPage | null> {
  if (!(await isKnownPrefix(prefix, locale))) return null;
  const path = `pages/${encodeURIComponent(prefix)}/${encodeURIComponent(slug)}`;
  return (await request<{ page: ProgrammaticPage }>(path, { locale }))?.page ?? null;
}
