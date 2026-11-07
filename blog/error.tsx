// src/templates/saas/(seoghost)/blog/error.tsx
'use client';

import { usePathname } from 'next/navigation';

import { getMessages } from '../_i18n';
import { localeFromBlogPath } from '../_lib/locale';

// A client error boundary cannot fetch the site: texts follow the URL locale, else English.
export default function BlogError({ reset }: { error: Error; reset: () => void }) {
  const t = getMessages(localeFromBlogPath(usePathname() ?? ''));

  return (
    <main className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{t.errorTitle}</h1>
      <p className="mt-3 text-slate-600">{t.errorDescription}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex rounded-lg bg-[color:var(--sg-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        {t.retry}
      </button>
    </main>
  );
}
