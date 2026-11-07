// src/templates/saas/(seoghost)/_components/blog/BlogNotFoundView.tsx
'use client';

import { usePathname } from 'next/navigation';

import { getMessages } from '../../_i18n';
import { localeFromBlogPath } from '../../_lib/locale';
import BlogRootLink from './BlogRootLink';

/**
 * Body of the blog 404. Client side: not-found.tsx receives no params, so the
 * language comes from the URL (/en/blog/…), else from the site.
 */
export default function BlogNotFoundView({ siteLanguage }: { siteLanguage: string | undefined }) {
  const t = getMessages(localeFromBlogPath(usePathname() ?? '') ?? siteLanguage);

  return (
    <main className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{t.notFoundTitle}</h1>
      <p className="mt-3 text-slate-600">{t.notFoundDescription}</p>
      <BlogRootLink className="mt-8 inline-flex rounded-lg bg-[color:var(--sg-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
        {t.backToBlog}
      </BlogRootLink>
    </main>
  );
}
