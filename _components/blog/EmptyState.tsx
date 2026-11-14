// src/templates/saas/(seoghost)/_components/blog/EmptyState.tsx
import type { Messages } from '../../_i18n/messages';

export default function EmptyState({ t }: { t: Messages }) {
  return (
    <div className="sg-empty mx-auto max-w-md px-6 py-16 text-center">
      <h2 className="sg-h4">{t.emptyTitle}</h2>
      <p className="sg-small mt-2">{t.emptyDescription}</p>
    </div>
  );
}
