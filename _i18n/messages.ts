// src/templates/saas/(seoghost)/_i18n/messages.ts

export type Language = 'en' | 'fr';

export type Messages = {
  /** Locale used to format dates. */
  dateLocale: string;

  badge: string;
  title: string;
  description: string;
  metaTitle: string;

  readMoreLabel: string;
  minRead: string;
  backToBlog: string;
  onThisPage: string;
  keepReading: string;
  /** Section titles of the blog index. */
  featuredTitle: string;
  latestTitle: string;
  /** Category label shown when an article has no tag. */
  defaultCategory: string;
  tagPageTitle: (tag: string) => string;
  tagPageDescription: (tag: string) => string;
  photoBy: string;
  on: string;
  previous: string;
  next: string;

  emptyTitle: string;
  emptyDescription: string;
  notFoundTitle: string;
  notFoundDescription: string;
  errorTitle: string;
  errorDescription: string;
  retry: string;

  ctaTitle: string;
  ctaDescription: string;

  poweredBy: string;

  /** Programmatic pages: breadcrumb root, hub fallback intro, date label, FAQ fallback heading. */
  home: string;
  hubDescription: string;
  updated: string;
  faq: string;
  /** Brand Kit sections of the landing pages. */
  reviewsTitle: string;
  offersTitle: string;
  choosePlan: string;
  highlightedPlan: string;
  galleryTitle: string;
  watchVideo: string;
  howItWorks: string;

  newsletterTitle: string;
  newsletterDescription: string;
  emailLabel: string;
  emailPlaceholder: string;
  subscribe: string;
  subscribing: string;
  subscribeSuccess: string;
  subscribeInvalid: string;
  subscribeError: string;
  subscribePreviewNotice: string;
};
