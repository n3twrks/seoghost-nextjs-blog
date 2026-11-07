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
    <section
      className="mt-24 rounded-3xl px-6 py-14 text-center text-white md:px-12"
      style={{ background: 'var(--sg-accent)' }}
    >
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.ctaTitle}</h2>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/85">{t.ctaDescription}</p>
      <a
        href={url}
        className="mt-8 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
      >
        {text}
      </a>
    </section>
  );
}
