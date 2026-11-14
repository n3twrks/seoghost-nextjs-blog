// src/templates/saas/(seoghost)/_components/pages/blocks/Reviews.tsx
import Image from 'next/image';

import type { BrandReview } from '../../../_types/brand';
import { accentGradient, sectionTitle } from '../../../_lib/landing-style';

/** Real reviews entered by the client in the Brand Kit. Never generated. */
export default function Reviews({ reviews, title }: { reviews: BrandReview[]; title: string }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className={sectionTitle}>{title}</h2>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id} className="sg-card sg-card-lg sg-review flex flex-col gap-5 p-7">
            <div className="flex items-center justify-between">
              <span aria-hidden className="sg-quote-mark">“</span>
              {review.rating ? (
                <p aria-label={`${review.rating} / 5`} className="sg-review-stars">
                  {'★'.repeat(review.rating)}
                  <span className="sg-stars-empty">{'★'.repeat(5 - review.rating)}</span>
                </p>
              ) : null}
            </div>
            <blockquote className="text-base leading-7">{review.body}</blockquote>
            <footer className="mt-auto flex items-center gap-3">
              {review.photo_url ? (
                <Image src={review.photo_url} alt="" width={44} height={44} className="sg-avatar h-11 w-11" />
              ) : (
                <span aria-hidden className={`sg-avatar sg-avatar-initial ${accentGradient} flex h-11 w-11 items-center justify-center`}>
                  {review.author_name.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="flex flex-col text-sm">
                <span className="sg-h5 text-sm">{review.author_name}</span>
                {review.source && <span className="sg-caption">{review.source}</span>}
              </div>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}
