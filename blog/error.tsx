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
      <h1 className="sg-h2">{t.errorTitle}</h1>
      <p className="sg-text mt-3">{t.errorDescription}</p>
      <button
        type="button"
        onClick={reset}
        className="sg-btn sg-btn-primary mt-8"
      >
        {t.retry}
      </button>
    </main>
  );
}
