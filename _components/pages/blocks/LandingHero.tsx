// src/templates/saas/(seoghost)/_components/pages/blocks/LandingHero.tsx
import Image from 'next/image';

import type { BrandMedia } from '../../../_types/brand';
import type { LandingHeroBlock } from '../../../_types/pages';
import { accentGradient, accentText, primaryButton, secondaryButton } from '../../../_lib/landing-style';
import { isHttpUrl } from '../../../_lib/video';

type Props = { block: LandingHeroBlock; image: BrandMedia | null; benefits: string[]; howItWorks: string | null };

/** Text on the left, the first Brand Kit image on the right (stacked on mobile). H1 + the direct answer. */
export default function LandingHero({ block, image, benefits, howItWorks }: Props) {
  const hasImage = Boolean(image?.url);
  return (
    <header className={`grid items-center gap-12 ${hasImage ? 'md:grid-cols-[1.1fr_0.9fr]' : ''}`}>
      <div className="flex flex-col items-start gap-7">
        <h1 className="sg-display">{block.h1}</h1>
        <p className="sg-lead max-w-xl">{block.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          {block.button_label && isHttpUrl(block.button_url) && (
            <a href={block.button_url} className={primaryButton}>
              {block.button_label}
            </a>
          )}
          {howItWorks && (
            <a href="#how-it-works" className={secondaryButton}>
              {howItWorks}
            </a>
          )}
        </div>
        {benefits.length > 0 && (
          <ul className="sg-small flex flex-wrap gap-x-6 gap-y-2">
            {benefits.slice(0, 6).map((benefit, i) => (
              <li key={i} className={`items-center gap-2 ${i >= 3 ? 'hidden md:flex' : 'flex'}`}>
                <svg aria-hidden viewBox="0 0 20 20" className={`${accentText} h-4 w-4 flex-shrink-0`} fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="10" cy="10" r="8" />
                  <path d="m6.5 10 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        )}
      </div>
      {image?.url && (
        <div className="relative mx-auto w-full max-w-md">
          <div aria-hidden className={`sg-panel ${accentGradient} absolute inset-0 -z-10 translate-x-3 translate-y-3 rotate-3 opacity-20`} />
          <Image
            src={image.url}
            alt={image.alt ?? ''}
            width={image.width ?? 1200}
            height={image.height ?? 1500}
            sizes="(min-width: 768px) 448px, 100vw"
            priority
            className="sg-hero-media h-auto w-full rotate-2 object-cover"
          />
        </div>
      )}
    </header>
  );
}
