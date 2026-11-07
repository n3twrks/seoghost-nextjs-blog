// src/templates/saas/(seoghost)/_components/blog/CoverCredit.tsx
import type { Messages } from '../../_i18n/messages';
import type { CoverCredit as CoverCreditData } from '../../_types/blog';

const UNSPLASH_URL = 'https://unsplash.com/?utm_source=txtbook&utm_medium=referral';

/** Photographer credit, required by Unsplash's terms wherever their photos are shown. */
export default function CoverCredit({ credit, t }: { credit: CoverCreditData | null; t: Messages }) {
  if (!credit) return null;

  return (
    <p className="mt-2 text-xs text-slate-400">
      {t.photoBy}{' '}
      <a href={credit.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
        {credit.name}
      </a>{' '}
      {t.on}{' '}
      <a href={UNSPLASH_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
        Unsplash
      </a>
    </p>
  );
}
