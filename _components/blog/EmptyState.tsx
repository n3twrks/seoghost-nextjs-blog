// src/templates/saas/(seoghost)/_components/blog/EmptyState.tsx
import type { Messages } from '../../_i18n/messages';

export default function EmptyState({ t }: { t: Messages }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-slate-900">{t.emptyTitle}</h2>
      <p className="mt-2 text-sm text-slate-600">{t.emptyDescription}</p>
    </div>
  );
}
