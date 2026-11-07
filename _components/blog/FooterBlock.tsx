// src/templates/saas/(seoghost)/_components/blog/FooterBlock.tsx
import type { Messages } from '../../_i18n/messages';
import type { Site } from '../../_types/blog';
import { appearanceOf } from '../../_lib/appearance';
import CtaBlock from './CtaBlock';
import { newsletterLabels } from '../../_lib/newsletter-labels';
import NewsletterBlock from './NewsletterBlock';

type Props = {
  site: Site | null;
  t: Messages;
  /** Where the block is shown: 'blog' for the index, the article slug otherwise. */
  source: string;
  /** In-app preview: the newsletter form is displayed but cannot submit. */
  preview?: boolean;
};

/** The block at the end of the blog pages, chosen in SEOGhost (Settings › Appearance). */
export default function FooterBlock({ site, t, source, preview = false }: Props) {
  const { footer_block: footerBlock } = appearanceOf(site);
  if (footerBlock === 'none') return null;

  if (footerBlock === 'cta') {
    return <CtaBlock text={site?.cta_text ?? null} url={site?.cta_url ?? null} t={t} />;
  }

  if (site?.newsletter_cta?.enabled === false) return null;

  return (
    <NewsletterBlock
      source={source}
      disabled={preview}
      design={site?.newsletter_cta ?? null}
      labels={newsletterLabels(t)}
    />
  );
}
