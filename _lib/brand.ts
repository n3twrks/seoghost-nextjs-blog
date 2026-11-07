// src/templates/saas/(seoghost)/_lib/brand.ts
//
// The Brand Kit of the site (reviews, plans, media, benefits). Server-side only (see api.ts).
// A failing or older API must not break a page: the kit sections are then simply absent.
import type { Brand } from '../_types/brand';
import { request } from './api';

export async function getBrand(): Promise<Brand | null> {
  try {
    return (await request<{ brand: Brand }>('brand'))?.brand ?? null;
  } catch {
    return null;
  }
}
