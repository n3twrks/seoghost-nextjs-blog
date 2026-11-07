// src/templates/saas/(seoghost)/_i18n/en.ts
import type { Messages } from './messages';

export const en: Messages = {
  dateLocale: 'en-US',

  badge: 'Blog',
  title: 'Articles & Resources',
  description: 'Practical guides, tips and news to help you get more out of what we do.',
  metaTitle: 'Blog',

  readMoreLabel: 'Read article',
  minRead: 'min read',
  backToBlog: 'All articles',
  onThisPage: 'On this page',
  keepReading: 'Keep reading',
  featuredTitle: 'Featured',
  latestTitle: 'Latest articles',
  defaultCategory: 'General',
  tagPageTitle: (tag) => tag,
  tagPageDescription: (tag) => `All our articles about ${tag.toLowerCase()}.`,
  photoBy: 'Photo by',
  on: 'on',
  previous: 'Previous',
  next: 'Next',

  emptyTitle: 'No articles yet',
  emptyDescription: 'New articles will appear here as soon as they are published.',
  notFoundTitle: 'Page not found',
  notFoundDescription: 'This article does not exist or is no longer available.',
  errorTitle: 'Something went wrong',
  errorDescription: 'We could not load the blog right now. Please try again in a moment.',
  retry: 'Try again',

  ctaTitle: 'Ready to get started?',
  ctaDescription: 'See how it works and try it for yourself.',

  poweredBy: 'Blog made on autopilot with SEOGhost',

  home: 'Home',
  hubDescription: 'Pick the page that matches your situation.',
  updated: 'Updated',
  faq: 'Frequently asked questions',
  reviewsTitle: 'What our customers say',
  offersTitle: 'Choose your plan',
  choosePlan: 'Choose this plan',
  highlightedPlan: 'Most popular',
  galleryTitle: 'In pictures',
  watchVideo: 'Watch the video',
  howItWorks: 'How it works',

  newsletterTitle: 'Subscribe to our newsletter',
  newsletterDescription: 'Get our latest articles straight to your inbox.',
  emailLabel: 'Email address',
  emailPlaceholder: 'Enter your email',
  subscribe: 'Subscribe',
  subscribing: 'Subscribing…',
  subscribeSuccess: 'Thank you, you are subscribed!',
  subscribeInvalid: 'Please enter a valid email address.',
  subscribeError: 'Something went wrong. Please try again.',
  subscribePreviewNotice: 'Sign-up is disabled in the preview.',
};
