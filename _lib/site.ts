// src/templates/saas/(seoghost)/_lib/site.ts
import type { Site } from '../_types/site';
import { request } from './api';

/** Language, CTA, newsletter block, badge, install path and appearance of the site. */
export async function getSite(): Promise<Site | null> {
  return (await request<{ site: Site }>('site'))?.site ?? null;
}
