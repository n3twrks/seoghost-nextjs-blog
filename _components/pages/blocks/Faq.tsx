import type { FaqBlock } from '../../../_types/pages';

/** Native <details>: readable without JavaScript, and the answers stay in the HTML. */
export default function Faq({ block, fallbackHeading }: { block: FaqBlock; fallbackHeading: string }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="sg-h3">{block.heading || fallbackHeading}</h2>
      <div className="sg-faq">
        {block.items.map((item, i) => (
          <details key={i} className="group px-5 py-4">
            <summary className="sg-faq-question flex cursor-pointer list-none items-center justify-between gap-4">
              {item.q}
              <span aria-hidden className="transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="sg-small mt-3">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
