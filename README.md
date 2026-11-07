# SEOGhost — blog and programmatic pages for Next.js (App Router)

One folder that serves everything SEOGhost writes for your site, on your own
domain and inside your own layout:

- **the blog** on `/blog`: articles, tags, table of contents, related articles,
  newsletter sign-up or call to action, and an optional CTA block inside the articles;
- **the programmatic pages** of every collection, each under its own prefix
  (`/custom-song/for-a-birthday`), with a hub page per collection;
- **one sitemap** for all of it, and structured data on every page.

Everything renders on the server: search engines and AI crawlers get plain HTML.
Copy the folder **once and never edit it**: every setting lives in SEOGhost, and
new collections or articles show up without a new copy or a redeploy.

The **Settings › Integration** page of SEOGhost walks you through these steps
with your own values (paths, URLs, snippets) already filled in.

## Install

1. **Environment variables**, in `.env.local` and in your hosting provider
   (Vercel, Netlify, Cloudflare, Railway, Render…). Keep these exact names:

   ```env
   NEXT_PUBLIC_SEOGHOST_SITE_SLUG=your-site-slug
   NEXT_PUBLIC_SEOGHOST_SITE_URL=https://yoursite.com
   SEOGHOST_API_KEY=your_api_key
   ```

   The API key must stay server-side: never prefix it with `NEXT_PUBLIC_`.

2. **Copy the `(seoghost)` folder.** The parentheses keep it out of your URLs.

   | Your site has… | Copy `(seoghost)/` into… | URLs |
   |---|---|---|
   | no `[locale]` folder | `app/` | `/blog`, `/custom-song/for-a-birthday` |
   | an `app/[locale]/` folder (whatever its name: `[lang]`, `[lng]`…) | `app/[locale]/` | `/fr/blog`, `/fr/chanson-personnalisee/pour-anniversaire` |
   | a build error about a dynamic segment conflict (`app/[slug]/`, `app/[...slug]/` of a CMS) | a fixed segment, e.g. `app/guides/`, and enter `/guides` as **Pages install path** in SEOGhost (Settings › Integration) | `/guides/blog`, `/guides/custom-song/…` |

   Use `src/app/` instead of `app/` if your project has a `src/` folder.

3. **Next.js configuration**, once:

   ```ts
   // next.config.ts — article covers and author photos
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: 'images.unsplash.com' },
       { protocol: 'https', hostname: '**.supabase.co' },
     ],
   },
   ```

   ```ts
   // app/layout.tsx — absolute canonical URLs
   export const metadata: Metadata = { metadataBase: new URL('https://yoursite.com') };
   ```

   Tailwind CSS v4 detects the folder by itself; on v3, make sure `content`
   includes `./app/**/*.{ts,tsx}`.

4. **Links**: add `/blog` and the hub of each collection (`/custom-song`) to your
   **footer**. The pages stay out of your header menu, but they must be
   reachable: each hub lists its pages and each page links to its siblings.

5. **Sitemap**: submit `https://yoursite.com/seoghost/sitemap.xml` to Google
   Search Console (one per locale on a multilingual site:
   `/fr/seoghost/sitemap.xml`…). It lists the blog, its tags and the
   programmatic pages. Or merge it into your root sitemap instead:

   ```ts
   import { getSeoghostSitemapEntries } from '@/app/(seoghost)/_lib/sitemap-entries';
   // ...(await getSeoghostSitemapEntries('https://yoursite.com'))        // no locale
   // ...(await getSeoghostSitemapEntries('https://yoursite.com', 'fr'))  // once per locale
   ```

   Submit it **after deploying**: Search Console keeps a "Couldn't fetch" status
   for a sitemap that did not exist yet, and retries slowly (remove it and add it
   again). If you replaced an old blog folder, remove its old sitemap from
   Search Console too. Also list the sitemap in your `robots.txt` so crawlers
   find it without a manual submission:

   ```ts
   // app/robots.ts
   export default function robots() {
     return {
       rules: { userAgent: '*', allow: '/' },
       sitemap: ['https://yoursite.com/sitemap.xml', 'https://yoursite.com/seoghost/sitemap.xml'],
     };
   }
   ```

Routes: `/blog`, `/blog/<article>`, `/blog/tag/<tag>`, `/<prefix>` (collection
hub), `/<prefix>/<page>`, `/seoghost/sitemap.xml` and `/seoghost/revalidate`
(called by SEOGhost only), each under your locale or install path when you have
one. Your own routes always win over a collection prefix, and SEOGhost refuses the
common ones (`blog`, `pricing`, `about`…).

## Settings

Nothing to configure in the folder. In SEOGhost:

- **Settings › Appearance**: accent color, block at the end of the blog and of
  the articles (newsletter, call to action or none), articles per page, table of
  contents depth;
- **Newsletter › CTA**: design of the newsletter block;
- **Pages**: collections (type, language, URL prefix, hub title and intro, CTA);
- **Brand Kit**: the reviews, plans, photos, videos and benefits shown on the
  landing pages. Add or change one and every page updates, no regeneration.

Changes show up right away: SEOGhost refreshes your site after saving and after
each publication.

## Make it look like your site

The blog and the pages render inside your layouts (header, footer, fonts) and
inherit your text color. To use your own design tokens, define in `globals.css`:

```css
:root {
  --seoghost-accent: var(--primary);   /* buttons, links, highlights */
  --seoghost-font: var(--font-sans);   /* the blog uses Inter otherwise */
}
```

They take precedence over the accent set in SEOGhost. To restyle the components
themselves with your own (buttons, cards…), ask your coding agent:

> Read `app/(seoghost)/SEOGHOST.md` and restyle the blog and the programmatic pages to match my site.

## Multilingual sites

- The **blog** answers under the locale of its articles' language (your site
  language): `/fr/blog`. Under another locale, `/en/blog` is a 404.
- Each **collection** has one language: create one collection per language, each with
  its own prefix (`/fr/chanson-personnalisee/…`, `/en/custom-song/…`). A page only
  shows under its own locale.
- Everything renders inside your `[locale]` layout (header, language switcher,
  translations). Pages are pre-rendered at build time when your `[locale]` layout
  exports `generateStaticParams`; otherwise they are rendered on first visit.

## Update

When SEOGhost ships a new version of the folder:

1. delete `app/(seoghost)/`;
2. copy the new `(seoghost)` folder at the same place, and deploy;
3. if you restyled the components, run the `SEOGHOST.md` prompt again.

**Update before publishing new pages.** Landing pages (hero, cards, Brand Kit
sections) need the latest folder: an older copy skips blocks it does not know,
so a new page would render empty. Copy the new folder first, then generate.

**CTA block in articles** (SEOGhost › Blog › CTA): an ad block shown before the
first heading of every article, with the tracking added to its link
(`utm_source=seoghost`, `utm_medium=blog`,
`utm_content=<article slug>`). It needs the latest folder: an older copy does
not show it. Copy the new folder, then switch the block on in SEOGhost.

No setting to report: they all live in SEOGhost.

## Freshness

Content is cached for 1 hour in production (1 second in development). SEOGhost
also refreshes your site **on demand**: right after an article or a page is
published, edited or unpublished, it calls `POST /seoghost/revalidate`
(authenticated with your `SEOGHOST_API_KEY`). This needs the **Domain** of your
SEOGhost site to be your public domain; if the call fails (site not deployed
yet, wrong domain), the 1-hour cache still applies.

## Notes

- Requests run on the server only: the API key never reaches the browser.
- Article HTML is sanitized by SEOGhost before it reaches your site; programmatic
  pages are plain-text blocks, never rendered as HTML.
- Structured data: `Article` on articles, `BreadcrumbList` + `FAQPage` on
  programmatic pages.
- Unknown paths of your site go through `[collection]`: they are answered with your
  own 404 page, without calling the SEOGhost API (the list of collection prefixes is
  cached).
- There is no `loading.tsx` in the folder on purpose: a streamed response is sent
  with a 200 status before a missing article becomes a 404.
- Cover photos from Unsplash show the required photographer credit.
- Opacity utilities on `currentColor` (`border-current/10`) need Tailwind CSS v4;
  on v3 they are simply ignored.
