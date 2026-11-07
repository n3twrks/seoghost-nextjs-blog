// src/templates/saas/(seoghost)/_components/blog/ArticleToc.tsx
import type { Messages } from '../../_i18n/messages';
import type { TocItem } from '../../_lib/toc';

/** `maxLevel`: 2 lists the main sections (h2) only, 3 also their subsections (Settings › Appearance). */
export default function ArticleToc({ items, maxLevel, t }: { items: TocItem[]; maxLevel: 2 | 3; t: Messages }) {
  const visible = items.filter((item) => item.level <= maxLevel);
  if (visible.length === 0) return null;

  return (
    <nav aria-label={t.onThisPage}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {t.onThisPage}
      </p>
      <ul className="flex flex-col gap-2 border-l border-slate-200">
        {visible.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l-2 border-transparent py-0.5 text-sm leading-5 text-slate-600 hover:border-[color:var(--sg-accent)] hover:text-slate-900 ${
                item.level === 3 ? 'pl-7' : 'pl-4'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
