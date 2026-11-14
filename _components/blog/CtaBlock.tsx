// src/templates/saas/(seoghost)/_components/blog/CtaBlock.tsx
import type { Messages } from '../../_i18n/messages';

type Props = {
  text: string | null;
  url: string | null;
  t: Messages;
};

/** Call-to-action from the site's settings (CTA text and URL). Hidden when either is missing. */
export default function CtaBlock({ text, url, t }: Props) {
  if (!text || !url) return null;

  return (
    <section className="sg-cta sg-accent-bg mt-24 px-6 py-14 text-center md:px-12">
      <h2 className="sg-h2">{t.ctaTitle}</h2>
      <p className="sg-text mx-auto mt-3 max-w-xl">{t.ctaDescription}</p>
      <a
        href={url}
        className="sg-btn sg-btn-on-accent mt-8"
      >
        {text}
      </a>
    </section>
  );
}
