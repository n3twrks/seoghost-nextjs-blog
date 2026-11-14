import type { CtaBlock as CtaBlockType } from '../../../_types/pages';

export default function CtaBlock({ block }: { block: CtaBlockType }) {
  return (
    <section className="sg-cta sg-accent-bg px-6 py-12 text-center md:px-12">
      {block.heading && <h2 className="sg-h2">{block.heading}</h2>}
      {block.text && <p className="sg-text mx-auto mt-3 max-w-xl">{block.text}</p>}
      <a
        href={block.button_url}
        className="sg-btn sg-btn-on-accent mt-8"
      >
        {block.button_label}
      </a>
    </section>
  );
}
