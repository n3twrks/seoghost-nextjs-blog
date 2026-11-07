// src/templates/saas/(seoghost)/_i18n/index.ts
import { en } from './en';
import { fr } from './fr';
import type { Language, Messages } from './messages';

export type { Language, Messages } from './messages';

const DICTIONARIES: Record<Language, Messages> = { en, fr };

const isSupported = (value: string): value is Language => value in DICTIONARIES;

/**
 * Interface texts of the blog and the pages for a language (`fr`, `fr-FR`,
 * `en`…): the URL locale if any, otherwise the site or collection language.
 * Unsupported languages fall back to English.
 */
export function getMessages(language: string | null | undefined): Messages {
  const code = (language ?? 'en').slice(0, 2).toLowerCase();
  return DICTIONARIES[isSupported(code) ? code : 'en'];
}
