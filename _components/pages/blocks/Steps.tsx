import type { StepsBlock } from '../../../_types/pages';

export default function Steps({ block }: { block: StepsBlock }) {
  return (
    <section className="flex flex-col gap-6">
      {block.heading && <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{block.heading}</h2>}
      <ol className="grid gap-4 md:grid-cols-2">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-4 rounded-2xl border border-current/10 p-5">
            <span
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ background: 'var(--sg-accent)' }}
            >
              {i + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-semibold">{item.title}</h3>
              {item.text && <p className="text-sm leading-6 opacity-80">{item.text}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
