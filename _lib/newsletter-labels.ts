// src/templates/saas/(seoghost)/_lib/newsletter-labels.ts
import type { Messages } from '../_i18n/messages';

/** The plain strings NewsletterBlock needs: it is a client component and cannot receive `Messages`. */
export function newsletterLabels(t: Messages) {
  return {
    title: t.newsletterTitle,
    description: t.newsletterDescription,
    emailLabel: t.emailLabel,
    emailPlaceholder: t.emailPlaceholder,
    subscribe: t.subscribe,
    subscribing: t.subscribing,
    success: t.subscribeSuccess,
    invalid: t.subscribeInvalid,
    error: t.subscribeError,
    previewNotice: t.subscribePreviewNotice,
  };
}
