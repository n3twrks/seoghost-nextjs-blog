// src/templates/saas/(seoghost)/_lib/appearance.ts
//
// Appearance settings with their defaults. Pure: safe in client components.
// The settings are chosen in SEOGhost (Settings › Appearance); your own CSS
// wins over them:
//   :root { --seoghost-accent: #e11d48; --seoghost-font: var(--font-sans); }
import type { CSSProperties } from 'react';

import type { Appearance, Site } from '../_types/site';

export const DEFAULT_ACCENT = '#2563eb';

export const DEFAULT_APPEARANCE: Appearance = {
  accent: null,
  footer_block: 'newsletter',
  articles_per_page: 12,
  toc_max_level: 2,
};

export function appearanceOf(site: Pick<Site, 'appearance'> | null | undefined): Appearance {
  return { ...DEFAULT_APPEARANCE, ...site?.appearance };
}

/**
 * Inline style of the blog and pages wrappers: the accent only (it is data).
 * Components read --sg-accent; --seoghost-accent, defined in your CSS or theme,
 * takes precedence over the SEOGhost setting. The font is set by the .sg-blog
 * and .sg-pages recipes of seoghost.base.css.
 */
export function shellStyle(accent: string | null | undefined): CSSProperties {
  return { '--sg-accent': `var(--seoghost-accent, ${accent || DEFAULT_ACCENT})` } as CSSProperties;
}
