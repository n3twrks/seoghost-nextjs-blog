// src/templates/saas/(seoghost)/_components/blog/NewsletterBlock.tsx
'use client';

import { useActionState } from 'react';
import Image from 'next/image';

import type { NewsletterCtaDesign } from '../../_types/blog';
import { DEFAULT_NEWSLETTER_IMAGE } from '../../_lib/media-url';
import { subscribe, type SubscribeState } from '../../_lib/subscribe';
import CoverImage from './CoverImage';

// Plain strings only: this component runs in the browser, so it cannot receive the full messages object.
type Labels = {
  title: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  subscribe: string;
  subscribing: string;
  success: string;
  invalid: string;
  error: string;
  previewNotice: string;
};

type Props = {
  labels: Labels;
  /** Where the sign-up happens (the blog index or an article), stored with the subscriber. */
  source: string;
  /** Shows the form without sending anything (in-app preview). */
  disabled?: boolean;
  /** Chosen in the txtbook dashboard. Missing = the default card. */
  design?: NewsletterCtaDesign | null;
};

const INITIAL_STATE: SubscribeState = { status: 'idle' };

const DEFAULT_DESIGN: NewsletterCtaDesign = {
  variant: 'banner',
  title: null,
  description: null,
  button_label: null,
  image_url: null,
  image_position: 'right',
  text_align: 'left',
  text_tone: 'light',
  overlay_opacity: 85,
  enabled: true,
};

export default function NewsletterBlock({ labels, source, disabled = false, design }: Props) {
  const [state, formAction, isPending] = useActionState(subscribe, INITIAL_STATE);
  const chosen = design ?? DEFAULT_DESIGN;

  const title = chosen.title?.trim() || labels.title;
  const description = chosen.description?.trim() || labels.description;
  const buttonLabel = chosen.button_label?.trim() || labels.subscribe;
  const imageUrl = chosen.image_url ?? DEFAULT_NEWSLETTER_IMAGE;

  const feedback =
    state.status === 'success' ? labels.success
    : state.status === 'invalid' ? labels.invalid
    : state.status === 'error' ? labels.error
    : disabled ? labels.previewNotice
    : null;

  // tone: 'light' = form over a dark fade, 'dark' = form over a light fade, 'plain' = on the page background.
  const renderForm = (tone: 'plain' | 'light' | 'dark') =>
    state.status === 'success' ? (
      <p role="status" className={`text-base font-medium ${tone === 'light' ? 'text-slate-900 lg:text-white' : 'text-slate-900'}`}>
        {feedback}
      </p>
    ) : (
      <>
        <form action={formAction} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <input type="hidden" name="source" value={source} />
          {/* Honeypot: invisible to people, tempting to basic bots. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <label htmlFor="blog-newsletter-email" className="sr-only">
            {labels.emailLabel}
          </label>
          <input
            id="blog-newsletter-email"
            type="email"
            name="email"
            required
            disabled={disabled}
            placeholder={labels.emailPlaceholder}
            className={
              tone === 'light'
                ? 'h-11 min-w-0 flex-1 rounded-full border border-slate-900/15 bg-white/60 px-5 text-sm text-slate-900 backdrop-blur-md placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-70 lg:border-white/25 lg:bg-white/15 lg:text-white lg:placeholder:text-white/60 lg:focus:ring-white'
                : tone === 'dark'
                  ? 'h-11 min-w-0 flex-1 rounded-full border border-slate-900/15 bg-white/60 px-5 text-sm text-slate-900 backdrop-blur-md placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:opacity-70'
                  : 'h-11 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--sg-accent)] disabled:opacity-70'
            }
          />
          <button
            type="submit"
            disabled={disabled || isPending}
            className={
              tone === 'light'
                ? 'h-11 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70 lg:bg-white lg:text-slate-900 lg:hover:bg-white/90'
                : tone === 'dark'
                  ? 'h-11 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70'
                  : 'h-11 rounded-lg px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70'
            }
            style={tone === 'plain' ? { background: 'var(--sg-accent)' } : undefined}
          >
            {isPending ? labels.subscribing : buttonLabel}
          </button>
        </form>
        {feedback ? (
          <p role="status" className={`mt-3 text-sm ${tone === 'light' ? 'text-slate-500 lg:text-white/70' : 'text-slate-500'}`}>
            {feedback}
          </p>
        ) : null}
      </>
    );

  const form = renderForm('plain');

  // 'card' is retired: rows saved with it render as a banner.
  if (chosen.variant === 'banner' || chosen.variant === 'card') {
    const tone = chosen.text_tone;
    const rgb = tone === 'light' ? '0, 0, 0' : '255, 255, 255';
    const strength = Math.min(100, Math.max(0, chosen.overlay_opacity)) / 100;
    // Desktop: text over the image. Mobile and tablet: a card, image on top, text below.
    const layout = {
      left: { text: 'lg:items-start lg:text-left', row: 'lg:justify-start', direction: 'to right' },
      center: { text: 'lg:items-center lg:text-center', row: 'lg:justify-center', direction: null },
      right: { text: 'lg:items-end lg:text-right', row: 'lg:justify-end', direction: 'to left' },
    }[chosen.text_align];
    // The fade is strongest behind the text and disappears toward the image subject.
    const fade = layout.direction
      ? `linear-gradient(${layout.direction}, rgba(${rgb}, ${strength}) 0%, rgba(${rgb}, ${strength * 0.65}) 50%, rgba(${rgb}, 0) 100%)`
      : `linear-gradient(rgba(${rgb}, ${strength * 0.75}), rgba(${rgb}, ${strength * 0.75}))`;
    const heading = tone === 'light' ? 'lg:text-white' : '';
    const body = tone === 'light' ? 'lg:text-white/80' : '';

    return (
      <section className="relative isolate mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white lg:border-0 lg:bg-transparent">
        {/* Already WebP and under 150 KB: served as is. */}
        <div className="relative h-56 lg:absolute lg:inset-0 lg:-z-20 lg:h-auto">
          <Image
            src={imageUrl}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 -z-10 hidden lg:block" style={{ background: fade }} aria-hidden="true" />
        <div
          className={`flex flex-col items-center px-6 py-10 text-center lg:min-h-[26rem] lg:justify-center lg:px-14 lg:py-14 ${layout.text}`}
        >
          <h2 className={`max-w-xl text-2xl font-semibold leading-tight tracking-tight text-slate-900 md:text-3xl lg:text-4xl ${heading}`}>
            {title}
          </h2>
          <p className={`mt-3 max-w-lg text-base leading-7 text-slate-600 lg:mt-4 ${body}`}>{description}</p>
          <div className={`mt-6 flex w-full justify-center lg:mt-8 ${layout.row}`}>
            <div className="w-full max-w-md">{renderForm(tone)}</div>
          </div>
        </div>
      </section>
    );
  }

  if (chosen.variant === 'minimal') {
    return (
      <section className="mt-24 flex flex-col gap-6 border-y border-slate-200 py-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <div className="flex w-full flex-col md:w-auto md:items-end">{form}</div>
      </section>
    );
  }

  // Split is the last remaining variant.
  return (
    <section className="mt-24 grid overflow-hidden rounded-3xl border border-slate-200 bg-white lg:grid-cols-2">
      <CoverImage
        src={imageUrl}
        alt=""
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`min-h-56 lg:min-h-full ${chosen.image_position === 'left' ? 'lg:order-first' : 'lg:order-last'}`}
      />
      {/* Stacked (mobile, tablet): a centered card. Side by side (desktop): left-aligned. */}
      <div className="flex flex-col items-center justify-center px-6 py-10 text-center lg:items-start lg:px-10 lg:text-left">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">{title}</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
        <div className="mt-6 flex w-full flex-col items-center lg:items-start">{form}</div>
      </div>
    </section>
  );
}
