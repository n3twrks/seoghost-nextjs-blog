import Link from 'next/link';

import { pagePath } from '../../_lib/locale';

type Related = { slug: string; route_prefix: string; title: string };

/** Links to sibling pages: the internal linking that keeps these pages discoverable. */
export default function RelatedPages({ pages, install, title }: { pages: Related[]; install: string; title: string }) {
  if (!pages.length) return null;
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link href={pagePath(install, p.route_prefix, p.slug)} className="block rounded-xl border border-current/10 px-4 py-3 text-sm font-medium transition hover:border-current/30">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
