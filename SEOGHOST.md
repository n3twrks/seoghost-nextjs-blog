# Instructions for your coding agent (Claude Code, Cursor…)

This folder renders the SEOGhost **blog** (`blog/`) and **programmatic pages**
(`[collection]/`) of this site, from the SEOGhost API. Articles arrive as sanitized
HTML, programmatic pages as JSON **blocks** of plain text (see `_types/`); this
folder only decides how they look. Your job: make them look like the rest of
this site.

## Do

1. Study the site's design system first: the root layout, the landing page, the
   button / card / section components, the Tailwind theme or CSS variables.
2. Prefer design tokens: define `--seoghost-accent` (primary color) and, if the
   blog should not use Inter, `--seoghost-font` in the site's `globals.css`.
   Every component reads `var(--sg-accent)`, which resolves to them.
3. Then restyle the presentational components so they reuse the site's own
   components and classes:
   - blog: `_components/blog/` (cards, featured article, pagination, table of
     contents, newsletter and CTA blocks) and `_views/` (index, article, tag);
     `_components/blog/ArticleContent.module.css` styles the article body;
   - programmatic pages: `_components/pages/` (blocks, breadcrumbs, related
     pages), the page templates in `_templates/` (one per page type) and the
     collection hub in `_views/HubView.tsx`;
   - `HeroAnswer.tsx` should feel like the site's landing hero, `CtaBlock.tsx`
     (both) should use the site's primary button, cards should use the site's
     card style.
4. Keep it responsive and accessible (one `h1` per page, `h2` per section).

## Do not

- Do not change `_lib/`, `_types/`, `_i18n/`, `_templates/index.ts`, `seoghost/`,
  the data loading of the route files (`page.tsx`, `layout.tsx`, `not-found.tsx`
  in `blog/` and `[collection]/`), `generateMetadata` or the JSON-LD scripts.
- Do not add a config file: every setting (accent, end-of-article block, articles
  per page…) comes from SEOGhost through the API.
- Do not rename or move the folder.
- Do not add a `not-found.tsx` at the root of the folder or under `[collection]/`:
  `[collection]` catches the site's unknown paths, which must keep the site's own
  404 page.
- Do not add a `loading.tsx`: streaming answers 200 before a missing article or
  page becomes a 404.
- Build every link with the helpers of `_lib/locale.ts` (`blogPath`, `hubPath`,
  `pagePath`): never hard-code `/blog`, a locale or a collection prefix.
- Do not render any programmatic block string as HTML (`dangerouslySetInnerHTML`):
  it is plain text. Article HTML is already sanitized by SEOGhost.
- Do not remove a block type from `BlockRenderer.tsx` (new pages may use it), and
  do not hide the FAQ (it is part of the structured data).
- Do not move these pages into the header menu; link `/blog` and the collection hubs
  from the footer.

## Updates

SEOGhost ships new versions of this folder as a whole: the site owner deletes it
and copies the new one. Your restyle is then lost and this prompt runs again, so
keep the changes inside the presentational files listed above.

The CTA block of the articles (`ArticleCtaBlock.tsx`) is configured in SEOGhost (Blog › CTA) and added to the link with its tracking parameters by `_lib/article-cta.ts`: restyle its markup if you must, but keep `withTracking` on the button link.
