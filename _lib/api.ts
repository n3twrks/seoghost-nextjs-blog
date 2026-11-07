// src/templates/saas/(seoghost)/_lib/api.ts
//
// Server-side client for the SEOGhost API, shared by the blog and the pages.
// Never import this from a client component: it reads the API key from the
// environment.

const API_URL = process.env.SEOGHOST_API_URL ?? 'https://seoghost.dev';

/** Cached for an hour in production; SEOGhost also refreshes it on demand (seoghost/revalidate). */
const REVALIDATE_SECONDS = process.env.NODE_ENV === 'development' ? 1 : 3600;

/** Every request of this folder carries it: seoghost/revalidate/route.ts expires it. */
export const CACHE_TAG = 'seoghost';

function getCredentials() {
  const site = process.env.NEXT_PUBLIC_SEOGHOST_SITE_SLUG;
  const apiKey = process.env.SEOGHOST_API_KEY;
  if (!site || !apiKey) throw new Error('NEXT_PUBLIC_SEOGHOST_SITE_SLUG and SEOGHOST_API_KEY must be set.');
  return { site, apiKey };
}

/** GET /api/v1/{path}. Null on 404. `locale` restricts the content to that language. */
export async function request<T>(
  path: string,
  options: { locale?: string; params?: Record<string, string | number> } = {}
): Promise<T | null> {
  const { site, apiKey } = getCredentials();
  const query = new URLSearchParams({ site, api_key: apiKey });
  if (options.locale) query.set('locale', options.locale);
  for (const [key, value] of Object.entries(options.params ?? {})) query.set(key, String(value));

  const res = await fetch(`${API_URL}/api/v1/${path}?${query}`, {
    next: { revalidate: REVALIDATE_SECONDS, tags: [CACHE_TAG] },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`SEOGhost API returned ${res.status} for ${path}`);
  return (await res.json()) as T;
}
