// src/templates/saas/(seoghost)/_components/pages/blocks/Reviews.tsx
import Image from 'next/image';

import type { BrandReview } from '../../../_types/brand';
import { accentGradient, accentText, sectionTitle } from '../../../_lib/landing-style';

/** Real reviews entered by the client in the Brand Kit. Never generated. */
export default function Reviews({ reviews, title }: { reviews: BrandReview[]; title: string }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className={sectionTitle}>{title}</h2>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id} className="flex flex-col gap-5 rounded-3xl border border-current/10 p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <span aria-hidden className="text-5xl leading-none opacity-20" style={accentText}>“</span>
              {review.rating ? (
                <p aria-label={`${review.rating} / 5`} className="text-sm tracking-widest text-amber-400">
                  {'★'.repeat(review.rating)}
                  <span className="opacity-30">{'★'.repeat(5 - review.rating)}</span>
                </p>
              ) : null}
            </div>
            <blockquote className="text-base leading-7">{review.body}</blockquote>
            <footer className="mt-auto flex items-center gap-3">
              {review.photo_url ? (
                <Image src={review.photo_url} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              ) : (
                <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white" style={accentGradient}>
                  {review.author_name.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{review.author_name}</span>
                {review.source && <span className="text-xs opacity-60">{review.source}</span>}
              </div>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}
