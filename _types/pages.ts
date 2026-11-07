// src/templates/saas/(seoghost)/_types/pages.ts
// Mirrors the shapes of the SEOGhost API (/api/v1/pages, /api/v1/collections).
// Pages are blocks of plain text: they are rendered as text, never as HTML.
import type { Messages } from '../_i18n/messages';
import type { Brand } from './brand';

/** Page types with their own template in _templates/. Others fall back to the use_case one. */
export type PageType = 'use_case';

/** Landing schema. Empty button_url = no button. */
export type LandingHeroBlock = { type: 'landing_hero'; h1: string; subtitle: string; button_label: string; button_url: string };
export type CardsBlock = { type: 'cards'; heading: string; items: { title: string; text: string }[] };
/** Legacy schema (blog-like pages generated before the landing template). */
export type HeroAnswerBlock = { type: 'hero_answer'; h1: string; answer: string };
export type ProblemBlock = { type: 'problem'; heading: string; paragraphs: string[] };
export type StepsBlock = { type: 'steps'; heading: string; items: { title: string; text: string }[] };
export type ExamplesBlock = { type: 'examples'; heading: string; items: string[] };
export type FaqBlock = { type: 'faq'; heading: string; items: { q: string; a: string }[] };
export type CtaBlock = { type: 'cta'; heading: string; text: string; button_label: string; button_url: string };

export type PageBlock = LandingHeroBlock | CardsBlock | HeroAnswerBlock | ProblemBlock | StepsBlock | ExamplesBlock | FaqBlock | CtaBlock;

export type Collection = {
  id: string;
  name: string;
  hub_title: string | null;
  hub_intro: string | null;
  route_prefix: string;
  /** Kept as string: a type added later in SEOGhost must not break an older copy of this folder. */
  page_type: string;
  language: string;
};

export type PageSummary = {
  slug: string;
  route_prefix: string;
  title: string;
  meta_description: string | null;
  variable: string;
  collection_id: string;
  published_at: string;
  updated_at: string | null;
};

export type ProgrammaticPage = PageSummary & {
  meta_title: string | null;
  page_type: string;
  language: string;
  blocks: PageBlock[];
  related: { slug: string; route_prefix: string; title: string }[];
  collection: Collection;
};

/** Props every template of _templates/ receives. */
export type ViewProps = {
  page: ProgrammaticPage;
  /** Where (seoghost)/ is mounted: '', '/fr', '/guides'… Links are {install}/{route_prefix}/{slug}. */
  install: string;
  /** Your home page: '/' or '/fr'. */
  home: string;
  t: Messages;
  /** Date locale, e.g. "fr". */
  locale?: string;
  jsonLd?: object;
  preview?: boolean;
  /** Brand Kit (reviews, plans, media). Null/absent = the kit sections are not rendered. */
  brand?: Brand | null;
};
