// src/templates/saas/(seoghost)/_views/HubView.tsx — the hub of one collection: /{route_prefix}. Link it from your footer.
import Link from 'next/link';
import type { Messages } from '../_i18n/messages';
import type { Collection, PageSummary } from '../_types/pages';
import Breadcrumbs from '../_components/pages/Breadcrumbs';
import { pagePath } from '../_lib/locale';

type Props = { collection: Collection; pages: PageSummary[]; install: string; home: string; t: Messages };

export default function HubView({ collection, pages, install, home, t }: Props) {
  const title = collection.hub_title || collection.name;

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <Breadcrumbs items={[{ label: t.home, href: home }, { label: title }]} />
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <p className="max-w-2xl text-lg opacity-80">{collection.hub_intro || t.hubDescription}</p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((p) => (
          <li key={p.slug}>
            <Link href={pagePath(install, p.route_prefix, p.slug)} className="flex h-full flex-col gap-1 rounded-2xl border border-current/10 p-5 transition hover:border-current/30">
              <span className="font-semibold">{p.title}</span>
              {p.meta_description && <span className="line-clamp-2 text-sm opacity-70">{p.meta_description}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
