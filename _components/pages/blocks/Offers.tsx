// src/templates/saas/(seoghost)/_components/pages/blocks/Offers.tsx
import type { BrandOffer } from '../../../_types/brand';
import { accentGradient, accentText, primaryButton, secondaryButton, sectionTitle } from '../../../_lib/landing-style';
import { isHttpUrl } from '../../../_lib/video';

type Labels = { title: string; choose: string; highlighted: string };

/** Plans entered by the client in the Brand Kit, shown exactly as typed. A plan without its own link uses the page CTA. */
export default function Offers({ offers, fallbackUrl, labels }: { offers: BrandOffer[]; fallbackUrl: string | null; labels: Labels }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className={sectionTitle}>{labels.title}</h2>
      <ul className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => {
          const url = isHttpUrl(offer.cta_url) ? offer.cta_url : fallbackUrl;
          return (
            <li
              key={offer.id}
              data-highlighted={offer.highlighted ? 'true' : undefined}
              className="sg-card sg-card-lg sg-offer relative flex flex-col gap-4 p-7"
            >
              {offer.highlighted && (
                <span className={`sg-tag ${accentGradient} absolute -top-3 left-7`}>
                  {labels.highlighted}
                </span>
              )}
              <h3 className="sg-h4">{offer.name}</h3>
              {offer.price_label && <p className="sg-price">{offer.price_label}</p>}
              {offer.description && <p className="sg-small">{offer.description}</p>}
              {offer.features.length > 0 && (
                <ul className="flex flex-col gap-2 text-sm">
                  {offer.features.map((feature, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden className={accentText}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {url && (
                <a href={url} className={`mt-auto ${offer.highlighted ? primaryButton : secondaryButton}`}>
                  {labels.choose}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
