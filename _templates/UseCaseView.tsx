// src/templates/saas/(seoghost)/_templates/UseCaseView.tsx — "{subject} for {occasion}" pages, and the fallback of every unknown type.
import type { ViewProps } from '../_types/pages';
import BlockRenderer from '../_components/pages/BlockRenderer';
import RelatedPages from '../_components/pages/RelatedPages';

export default function UseCaseView({ page, install, t, jsonLd, preview, brand }: ViewProps) {
  return (
    <article className="flex flex-col gap-12">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      )}
      {preview && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800">Preview — this page may not be published yet.</p>
      )}
      <BlockRenderer blocks={page.blocks} t={t} brand={brand} />
      <RelatedPages pages={page.related} install={install} title={t.keepReading} />
    </article>
  );
}
