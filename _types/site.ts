// src/templates/saas/(seoghost)/_types/site.ts
// Mirrors GET /api/v1/site: everything this folder needs to know about the
// site. There is no config file in the folder: settings live in SEOGhost.

export type Appearance = {
  /** #rrggbb, null = the folder's default. Your CSS can override it with --seoghost-accent. */
  accent: string | null;
  /** Block at the end of the blog and of every article. */
  footer_block: 'newsletter' | 'cta' | 'none';
  /** Articles per blog index page (the first one of page 1 is featured). */
  articles_per_page: number;
  /** Table of contents depth: 2 = h2 only, 3 = h2 and h3. */
  toc_max_level: 2 | 3;
};

export type Site = {
  /** True on freemium: the blog shows the SEOGhost badge. Absent on older API versions = no badge. */
  show_badge?: boolean;
  /** Design of the newsletter block. Null = the default card. Absent on older API versions. */
  newsletter_cta?: NewsletterCtaDesign | null;
  /** CTA block shown before the first h2 of every article. Null, absent or enabled: false = no block. */
  article_cta?: ArticleCta | null;
  name: string;
  domain: string | null;
  language: string;
  cta_text: string | null;
  cta_url: string | null;
  author_name: string | null;
  author_avatar_url: string | null;
  /** Install case 3: the fixed segment (seoghost)/ is copied under, e.g. "/guides". */
  pages_install_path?: string | null;
  /** Appearance settings chosen in SEOGhost (Settings › Appearance). Absent on older API versions = defaults. */
  appearance?: Appearance;
};

/** Design of the newsletter block, chosen in SEOGhost. Empty text = the default of the language. */
export type NewsletterCtaDesign = {
  /** 'card' is retired: old rows render as a banner. */
  variant: 'card' | 'split' | 'minimal' | 'banner';
  title: string | null;
  description: string | null;
  button_label: string | null;
  image_url: string | null;
  image_position: 'left' | 'right';
  /** Text alignment of the banner variant. */
  text_align: 'left' | 'center' | 'right';
  /** Banner: 'light' = light text on a dark fade, 'dark' = dark text on a light fade. */
  text_tone: 'light' | 'dark';
  /** Banner: strength of the fade over the image, 0-100. */
  overlay_opacity: number;
  /** false = the block is hidden on the blog. Missing (older API) = shown. */
  enabled?: boolean;
};

/** CTA block inside the articles, chosen in SEOGhost (Blog › CTA). Rendered at display time, never stored in the article. */
export type ArticleCta = {
  /** false = the block is hidden on every article (the settings are kept). */
  enabled: boolean;
  /** Brand Kit image. */
  image_url: string | null;
  image_alt: string | null;
  /** Review score out of 5, typed by the user (never invented). */
  rating: number | null;
  /** Text next to the score, typed by the user, e.g. "+500 verified reviews". */
  rating_label: string | null;
  title: string;
  subtitle: string | null;
  button_label: string;
  /** The tracking parameters are added when the block is displayed (see _lib/article-cta.ts). */
  button_url: string;
  subtext: string | null;
  /** #rrggbb each. Missing = derived from the site accent. */
  colors?: Partial<ArticleCtaColors>;
  border_enabled: boolean;
  /** Corners of the button. Missing = 'rounded'. */
  button_radius?: ArticleCtaButtonRadius;
};

export type ArticleCtaButtonRadius = 'square' | 'rounded' | 'pill';

export type ArticleCtaColors = {
  background: string;
  text: string;
  button_background: string;
  button_text: string;
  border: string;
};
