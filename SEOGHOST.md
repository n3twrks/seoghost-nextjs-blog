# Instructions for your coding agent (Claude Code, Cursor…)

This folder renders the SEOGhost **blog** (`blog/`) and **programmatic pages**
(`[collection]/`) of this site, from the SEOGhost API. **Do not modify any file of
this folder**: it is replaced as a whole on every update. All the styling lives in
ONE file of the site: `src/styles/seoghost.theme.css` (`styles/seoghost.theme.css`
without a `src/` folder).

Goal: make the blog and the pages look like the rest of the site, by editing only
that file.

## Do

1. Study the site's design system: root layout, landing page, buttons, cards,
   sections, Tailwind theme or CSS variables, container width.
2. If `src/styles/seoghost.theme.css` does not exist, copy
   `(seoghost)/seoghost.theme.example.css` there and import it in `globals.css`
   right after `@import "tailwindcss";`.
3. Read `(seoghost)/_components/seoghost.base.css`: the tokens (`--sg-*`) and
   recipes (`.sg-*`) with their defaults. The components use these recipes for
   everything visual.
4. In the theme:
   - start with tokens: `--seoghost-accent` (accent color: NOT `--sg-accent`),
     `--seoghost-font`, `--sg-container-max` and `--sg-container-max-pages` to match
     the site's container, radius, title sizes, button padding…;
   - redefine a recipe only when a token is not enough (e.g. outlined uppercase
     buttons, cards with a border instead of a shadow);
   - the color tokens apply to the blog; the pages inherit the site's text color.
     To change colors on the pages, set the tokens on `.sg-pages`;
   - write only the values that change; no `@layer`, no `!important`; no margins
     or grids (the layout is the folder's; only the container is set, through its
     tokens).
5. If a global rule of the site outside any layer (e.g. `h1 { … }`,
   `button { … }`) overrides the folder's defaults, move it into `@layer base` or
   counter it in the theme.
6. Check `npm run build`, then `/blog`, an article, a tag page, a collection hub
   and a programmatic page, on mobile and desktop.
7. If something cannot be set in the theme (structure, block order, markup), do
   not edit the folder: note it and report it so it is added to the kit.

## Never touch

- Any file of the `(seoghost)` folder: `_lib/`, `_types/`, `_i18n/`, `_components/`,
  `_views/`, `_templates/`, `seoghost/`, the route files, the metadata and the JSON-LD.
- Do not add a `not-found.tsx` or a `loading.tsx` in the folder.
- Colors chosen in SEOGhost (accent in Settings › Appearance, article CTA block,
  newsletter design) are data: they are changed in SEOGhost, not in the theme
  (except the accent, through `--seoghost-accent`).

## Updates

SEOGhost ships new versions of this folder as a whole: the site owner deletes it
and copies the new one. The theme file is outside the folder, so it is kept and
nothing has to be redone. Check the "Theme changes" section of the README for any
renamed token or recipe.
