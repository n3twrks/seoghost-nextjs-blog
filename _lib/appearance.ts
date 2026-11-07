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
 * Style of the blog and pages wrappers. Components read --sg-accent;
 * --seoghost-accent and --seoghost-font, defined in your CSS, take precedence
 * over the SEOGhost settings. Without --seoghost-font, the pages inherit your
 * font and the blog uses `fallbackFont`.
 */
export function shellStyle(accent: string | null | undefined, fallbackFont?: string): CSSProperties {
  return {
    '--sg-accent': `var(--seoghost-accent, ${accent || DEFAULT_ACCENT})`,
    // An undefined variable with no fallback makes font-family inherit.
    fontFamily: fallbackFont ? `var(--seoghost-font, ${fallbackFont})` : 'var(--seoghost-font)',
  } as CSSProperties;
}
