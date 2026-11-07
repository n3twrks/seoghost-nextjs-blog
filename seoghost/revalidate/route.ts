// src/templates/saas/(seoghost)/seoghost/revalidate/route.ts
//
// Served at {install}/seoghost/revalidate. SEOGhost calls it right after an
// article or a page is published, edited or unpublished, so it shows on the
// next visit instead of waiting for the 1-hour cache. Authenticated with
// SEOGHOST_API_KEY: nothing to configure. Every API call of this folder carries
// the tag, so expiring it refreshes the blog, the hubs, the pages and the
// sitemap at once.
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

import { CACHE_TAG } from '../../_lib/api';

// Next.js 16 takes a cache profile as second argument; Next.js 15 ignores it.
const expireTag = revalidateTag as unknown as (tag: string, profile?: { expire: number }) => void;

export async function POST(req: NextRequest) {
  const apiKey = process.env.SEOGHOST_API_KEY;
  if (!apiKey || req.headers.get('authorization') !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  expireTag(CACHE_TAG, { expire: 0 });
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
