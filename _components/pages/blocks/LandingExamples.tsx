// src/templates/saas/(seoghost)/_components/pages/blocks/LandingExamples.tsx
import type { ExamplesBlock } from '../../../_types/pages';
import { accentText, accentTint, sectionTitle } from '../../../_lib/landing-style';

/** The page's unique data: ideas that only make sense for this variable. */
export default function LandingExamples({ block }: { block: ExamplesBlock }) {
  return (
    <section className={`sg-panel ${accentTint} flex flex-col gap-8 px-6 py-10 md:px-10`}>
      {block.heading && <h2 className={`max-w-3xl ${sectionTitle}`}>{block.heading}</h2>}
      <ul className="grid gap-3 sm:grid-cols-2">
        {block.items.map((item, i) => (
          <li key={i} className="sg-item sg-item-raised flex gap-3 px-5 py-4">
            <span aria-hidden className={accentText}>✦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
