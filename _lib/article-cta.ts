// src/templates/saas/(seoghost)/_lib/article-cta.ts
//
// CTA block inside the articles: colors, tracking link and insertion point.
// Pure: no import outside this folder (it is copied to every client).
import { DEFAULT_ACCENT } from './appearance';
import type { ArticleCta, ArticleCtaButtonRadius, ArticleCtaColors } from '../_types/site';

export const BUTTON_RADIUS: Record<ArticleCtaButtonRadius, string> = {
  square: '0px',
  rounded: '12px',
  pill: '9999px',
};

const HEX = /^#[0-9a-f]{6}$/i;

export function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && HEX.test(value);
}

function toRgb(hex: string): [number, number, number] {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
}

/** Mix of `hex` over white: `share` is the part of `hex` (0-1). */
function overWhite(hex: string, share: number): string {
  return `#${toRgb(hex)
    .map((c) => Math.round(c * share + 255 * (1 - share)).toString(16).padStart(2, '0'))
    .join('')}`;
}

/** Colors derived from the site accent, used until the user picks their own. */
export function defaultColors(accent: string | null | undefined): ArticleCtaColors {
  const base = isHexColor(accent) ? accent : DEFAULT_ACCENT;
  return {
    background: overWhite(base, 0.08),
    text: '#1f2937',
    button_background: base,
    button_text: '#ffffff',
    border: overWhite(base, 0.25),
  };
}

export function resolveColors(cta: Pick<ArticleCta, 'colors'>, accent: string | null | undefined): ArticleCtaColors {
  const fallback = defaultColors(accent);
  const picked = cta.colors ?? {};
  return {
    background: isHexColor(picked.background) ? picked.background : fallback.background,
    text: isHexColor(picked.text) ? picked.text : fallback.text,
    button_background: isHexColor(picked.button_background) ? picked.button_background : fallback.button_background,
    button_text: isHexColor(picked.button_text) ? picked.button_text : fallback.button_text,
    border: isHexColor(picked.border) ? picked.border : fallback.border,
  };
}

function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two #rrggbb colors (1 to 21). */
export function contrastRatio(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/** WCAG AA for normal text. */
export const MIN_CONTRAST = 4.5;

/**
 * Tracking added to the button link, automatically: the user types nothing.
 * `utm_content` is the article slug, so the client's analytics shows which
 * article converts. A utm_* already present in the saved URL is kept.
 */
export function withTracking(url: string, articleSlug: string): string {
  try {
    const target = new URL(url);
    const params: [string, string][] = [
      ['utm_source', 'seoghost'],
      ['utm_medium', 'blog'],
      ['utm_content', articleSlug],
    ];
    for (const [key, value] of params) {
      if (!target.searchParams.has(key)) target.searchParams.set(key, value);
    }
    return target.toString();
  } catch {
    return url;
  }
}

/** The block is shown only when switched on and complete enough to be a working ad. */
export function isArticleCtaVisible(cta: ArticleCta | null | undefined): cta is ArticleCta {
  return Boolean(cta && cta.enabled === true && cta.title && cta.button_label && cta.button_url);
}

/**
 * Splits the article HTML before its first h2 (the end of the introduction).
 * Without any h2, everything is "before" and the block goes at the end.
 */
export function splitAtFirstH2(html: string): { before: string; after: string } {
  const index = html.search(/<h2[\s>]/i);
  return index === -1 ? { before: html, after: '' } : { before: html.slice(0, index), after: html.slice(index) };
}
