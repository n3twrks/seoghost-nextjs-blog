// src/templates/saas/(seoghost)/[collection]/page.tsx — the hub of a collection: /chanson-personnalisee. Link it from your footer.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMessages } from '../_i18n';
import HubView from '../_views/HubView';
import { getLocale, homePath, hubPath, installPath, type RouteParams } from '../_lib/locale';
import { getCollection, getPages } from '../_lib/pages';
import { getSite } from '../_lib/site';

type Props = { params: Promise<RouteParams & { collection: string }> };

// A failing API at build time must not fail the build: hubs are then rendered on first request.
export async function generateStaticParams({ params }: { params: RouteParams }) {
  try {
    return (await getPages(getLocale(params))).collections.map((c) => ({ collection: c.route_prefix }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const locale = getLocale(p);
  const [result, site] = await Promise.all([getCollection(p.collection, locale), getSite()]);
  if (!result) return { title: getMessages(locale).notFoundTitle };

  const { collection } = result;
  return {
    title: collection.hub_title || collection.name,
    description: collection.hub_intro || getMessages(locale ?? collection.language).hubDescription,
    alternates: { canonical: hubPath(installPath(locale, site), collection.route_prefix) },
  };
}

export default async function CollectionHub({ params }: Props) {
  const p = await params;
  const locale = getLocale(p);
  const result = await getCollection(p.collection, locale);
  if (!result) notFound();

  const site = await getSite();
  return (
    <HubView
      collection={result.collection}
      pages={result.pages}
      install={installPath(locale, site)}
      home={homePath(locale)}
      t={getMessages(locale ?? result.collection.language)}
    />
  );
}
