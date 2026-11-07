import type { FaqBlock } from '../../../_types/pages';

/** Native <details>: readable without JavaScript, and the answers stay in the HTML. */
export default function Faq({ block, fallbackHeading }: { block: FaqBlock; fallbackHeading: string }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{block.heading || fallbackHeading}</h2>
      <div className="divide-y divide-current/10 rounded-2xl border border-current/10">
        {block.items.map((item, i) => (
          <details key={i} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {item.q}
              <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-6 opacity-80">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
