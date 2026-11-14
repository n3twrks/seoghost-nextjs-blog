// src/templates/saas/(seoghost)/_components/pages/blocks/LandingCta.tsx
import type { CtaBlock } from '../../../_types/pages';
import { accentGradient } from '../../../_lib/landing-style';

export default function LandingCta({ block }: { block: CtaBlock }) {
  return (
    <section className={`sg-panel ${accentGradient} relative overflow-hidden px-6 py-16 text-center md:px-16`}>
      <div aria-hidden className="sg-deco-circle absolute -right-16 -top-16 h-56 w-56" />
      <div aria-hidden className="sg-deco-circle absolute -bottom-20 -left-10 h-48 w-48" />
      <div className="relative">
        {block.heading && <h2 className="sg-h2 mx-auto max-w-2xl">{block.heading}</h2>}
        {block.text && <p className="sg-text mx-auto mt-4 max-w-xl">{block.text}</p>}
        <a
          href={block.button_url}
          className="sg-btn sg-btn-lg sg-btn-on-accent mt-8"
        >
          {block.button_label}
        </a>
      </div>
    </section>
  );
}
