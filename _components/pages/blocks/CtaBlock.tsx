import type { CtaBlock as CtaBlockType } from '../../../_types/pages';

export default function CtaBlock({ block }: { block: CtaBlockType }) {
  return (
    <section className="rounded-3xl px-6 py-12 text-center text-white md:px-12" style={{ background: 'var(--sg-accent)' }}>
      {block.heading && <h2 className="text-3xl font-semibold tracking-tight">{block.heading}</h2>}
      {block.text && <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/85">{block.text}</p>}
      <a
        href={block.button_url}
        className="mt-8 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
      >
        {block.button_label}
      </a>
    </section>
  );
}
