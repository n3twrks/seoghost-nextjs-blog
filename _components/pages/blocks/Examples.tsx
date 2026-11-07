import type { ExamplesBlock } from '../../../_types/pages';

/** The page's unique data: ideas that only make sense for this variable. */
export default function Examples({ block }: { block: ExamplesBlock }) {
  return (
    <section className="flex flex-col gap-5">
      {block.heading && <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{block.heading}</h2>}
      <ul className="grid gap-3 sm:grid-cols-2">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3 rounded-xl bg-current/[0.04] px-4 py-3 text-sm leading-6">
            <span aria-hidden style={{ color: 'var(--sg-accent)' }}>✦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
