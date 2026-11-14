import type { StepsBlock } from '../../../_types/pages';

export default function Steps({ block }: { block: StepsBlock }) {
  return (
    <section className="flex flex-col gap-6">
      {block.heading && <h2 className="sg-h3">{block.heading}</h2>}
      <ol className="grid gap-4 md:grid-cols-2">
        {block.items.map((item, i) => (
          <li key={i} className="sg-card flex gap-4 p-5">
            <span className="sg-num flex h-8 w-8 flex-shrink-0 items-center justify-center">
              {i + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="sg-h5">{item.title}</h3>
              {item.text && <p className="sg-small">{item.text}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
