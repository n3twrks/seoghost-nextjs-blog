import { Fragment } from 'react';

import type { Messages } from '../../_i18n/messages';
import type { Brand } from '../../_types/brand';
import type { CtaBlock as CtaBlockData, LandingHeroBlock, PageBlock } from '../../_types/pages';
import Cards from './blocks/Cards';
import CtaBlock from './blocks/CtaBlock';
import Examples from './blocks/Examples';
import Faq from './blocks/Faq';
import HeroAnswer from './blocks/HeroAnswer';
import LandingCta from './blocks/LandingCta';
import LandingExamples from './blocks/LandingExamples';
import LandingHero from './blocks/LandingHero';
import LandingSteps from './blocks/LandingSteps';
import MediaGallery from './blocks/MediaGallery';
import Offers from './blocks/Offers';
import Problem from './blocks/Problem';
import Reviews from './blocks/Reviews';
import Steps from './blocks/Steps';

/** The Brand Kit sections go before the first of these blocks (landing pages only). */
const KIT_BEFORE: PageBlock['type'][] = ['examples', 'faq', 'cta'];

/** Maps each block type to its component. Unknown types (newer API) are skipped. */
export default function BlockRenderer({ blocks, t, brand }: { blocks: PageBlock[]; t: Messages; brand?: Brand | null }) {
  const landing = blocks.find((b): b is LandingHeroBlock => b.type === 'landing_hero');
  // Older pages (hero_answer…) are rendered as they were generated: no kit sections.
  const kit = landing ? brand : null;
  const heroImage = kit?.media.find((m) => m.kind === 'image' && m.url) ?? null;
  const gallery = kit ? kit.media.filter((m) => m !== heroImage) : [];
  const ctaUrl = blocks.find((b): b is CtaBlockData => b.type === 'cta')?.button_url || landing?.button_url || null;

  const kitSections = kit && (
    <>
      {gallery.length > 0 && <MediaGallery items={gallery} title={t.galleryTitle} watchLabel={t.watchVideo} />}
      {kit.reviews.length > 0 && <Reviews reviews={kit.reviews} title={t.reviewsTitle} />}
      {kit.offers.length > 0 && (
        <Offers offers={kit.offers} fallbackUrl={ctaUrl} labels={{ title: t.offersTitle, choose: t.choosePlan, highlighted: t.highlightedPlan }} />
      )}
    </>
  );
  const kitIndex = kit ? blocks.findIndex((b) => KIT_BEFORE.includes(b.type)) : -1;

  return (
    <div className={`flex flex-col ${landing ? 'gap-24 md:gap-28' : 'gap-16'}`}>
      {blocks.map((block, i) => (
        <Fragment key={i}>
          {i === kitIndex && kitSections}
          {renderBlock(block, t, { landing: Boolean(landing), heroImage, benefits: kit?.benefits ?? [], hasSteps: blocks.some((b) => b.type === 'steps') })}
        </Fragment>
      ))}
      {kit && kitIndex === -1 && kitSections}
    </div>
  );
}

type RenderContext = { landing: boolean; heroImage: Brand['media'][number] | null; benefits: string[]; hasSteps: boolean };

/** Landing pages get the landing components; older pages keep the ones they were generated with. */
function renderBlock(block: PageBlock, t: Messages, kit: RenderContext) {
  switch (block.type) {
    case 'landing_hero': return <LandingHero block={block} image={kit.heroImage} benefits={kit.benefits} howItWorks={kit.hasSteps ? t.howItWorks : null} />;
    case 'cards': return <Cards block={block} />;
    case 'hero_answer': return <HeroAnswer block={block} />;
    case 'problem': return <Problem block={block} />;
    case 'steps': return kit.landing ? <LandingSteps block={block} /> : <Steps block={block} />;
    case 'examples': return kit.landing ? <LandingExamples block={block} /> : <Examples block={block} />;
    case 'faq': return <Faq block={block} fallbackHeading={t.faq} />;
    case 'cta': return kit.landing ? <LandingCta block={block} /> : <CtaBlock block={block} />;
    default: return null;
  }
}
