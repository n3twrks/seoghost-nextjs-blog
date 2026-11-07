import type { ProblemBlock } from '../../../_types/pages';

export default function Problem({ block }: { block: ProblemBlock }) {
  return (
    <section className="flex flex-col gap-4">
      {block.heading && <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{block.heading}</h2>}
      {block.paragraphs.map((p, i) => (
        <p key={i} className="max-w-3xl text-base leading-7 opacity-85">{p}</p>
      ))}
    </section>
  );
}
