// src/templates/saas/(seoghost)/_lib/landing-style.ts
//
// Shared styles of the landing pages, all derived from --sg-accent (Settings ›
// Appearance, or --seoghost-accent in your CSS). No colour is hard-coded.
import type { CSSProperties } from 'react';

/** Gradient of the primary buttons and the CTA band. */
export const accentGradient: CSSProperties = {
  background: 'linear-gradient(135deg, var(--sg-accent), color-mix(in srgb, var(--sg-accent) 65%, white))',
};

/** Very light accent tint, for cards and soft backgrounds. */
export const accentTint: CSSProperties = { background: 'color-mix(in srgb, var(--sg-accent) 6%, transparent)' };

export const accentText: CSSProperties = { color: 'var(--sg-accent)' };

export const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0';

export const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full border border-current/15 px-7 py-3.5 text-sm font-semibold transition hover:bg-current/[0.04] active:bg-current/[0.08]';

export const sectionTitle = 'text-3xl font-semibold leading-tight tracking-tight md:text-4xl';
