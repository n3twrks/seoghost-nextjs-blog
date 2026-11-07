// src/templates/saas/(seoghost)/_components/pages/blocks/Cards.tsx
import type { CardsBlock } from '../../../_types/pages';
import { accentGradient, accentTint, sectionTitle } from '../../../_lib/landing-style';

/** Why it fits this variable: 3 to 4 short, standalone cards. */
export default function Cards({ block }: { block: CardsBlock }) {
  return (
    <section className="flex flex-col gap-8">
      {block.heading && <h2 className={`max-w-3xl ${sectionTitle}`}>{block.heading}</h2>}
      <ul className={`grid gap-5 sm:grid-cols-2 ${block.items.length === 3 ? 'lg:grid-cols-3' : ''}`}>
        {block.items.map((item, i) => (
          <li key={i} className="flex flex-col gap-3 rounded-3xl p-7" style={accentTint}>
            <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold text-white" style={accentGradient}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
            <p className="text-sm leading-6 opacity-75">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
