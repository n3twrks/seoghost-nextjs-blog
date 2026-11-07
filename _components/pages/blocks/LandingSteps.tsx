// src/templates/saas/(seoghost)/_components/pages/blocks/LandingSteps.tsx
import type { StepsBlock } from '../../../_types/pages';
import { accentGradient, sectionTitle } from '../../../_lib/landing-style';

/** "How it works" of the landing pages: numbered steps in a row. Target of the hero's secondary button. */
export default function LandingSteps({ block }: { block: StepsBlock }) {
  return (
    <section id="how-it-works" className="flex scroll-mt-24 flex-col gap-10">
      {block.heading && <h2 className={`max-w-3xl ${sectionTitle}`}>{block.heading}</h2>}
      <ol className="grid gap-8 md:grid-cols-3">
        {block.items.map((item, i) => (
          <li key={i} className="relative flex flex-col gap-3">
            {i < block.items.length - 1 && (
              <span aria-hidden className="absolute left-14 right-0 top-6 hidden h-px bg-current/15 md:block" />
            )}
            <span className="flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold text-white shadow-lg shadow-black/10" style={accentGradient}>
              {i + 1}
            </span>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {item.text && <p className="text-sm leading-6 opacity-75">{item.text}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}
