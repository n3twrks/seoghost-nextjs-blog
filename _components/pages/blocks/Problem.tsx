import type { ProblemBlock } from '../../../_types/pages';

export default function Problem({ block }: { block: ProblemBlock }) {
  return (
    <section className="flex flex-col gap-4">
      {block.heading && <h2 className="sg-h3">{block.heading}</h2>}
      {block.paragraphs.map((p, i) => (
        <p key={i} className="sg-text max-w-3xl">{p}</p>
      ))}
    </section>
  );
}
