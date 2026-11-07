// src/templates/saas/(seoghost)/_components/pages/blocks/LandingCta.tsx
import type { CtaBlock } from '../../../_types/pages';
import { accentGradient } from '../../../_lib/landing-style';

export default function LandingCta({ block }: { block: CtaBlock }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] px-6 py-16 text-center text-white md:px-16" style={accentGradient}>
      <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
      <div aria-hidden className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10" />
      <div className="relative">
        {block.heading && <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">{block.heading}</h2>}
        {block.text && <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/85">{block.text}</p>}
        <a
          href={block.button_url}
          className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
        >
          {block.button_label}
        </a>
      </div>
    </section>
  );
}
