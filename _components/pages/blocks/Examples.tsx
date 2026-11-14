import type { ExamplesBlock } from '../../../_types/pages';

/** The page's unique data: ideas that only make sense for this variable. */
export default function Examples({ block }: { block: ExamplesBlock }) {
  return (
    <section className="flex flex-col gap-5">
      {block.heading && <h2 className="sg-h3">{block.heading}</h2>}
      <ul className="grid gap-3 sm:grid-cols-2">
        {block.items.map((item, i) => (
          <li key={i} className="sg-item flex gap-3 px-4 py-3">
            <span aria-hidden className="sg-accent-text">✦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
