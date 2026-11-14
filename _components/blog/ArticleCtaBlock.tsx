// src/templates/saas/(seoghost)/_components/blog/ArticleCtaBlock.tsx
import { BUTTON_RADIUS, resolveColors, withTracking } from '../../_lib/article-cta';
import type { ArticleCta } from '../../_types/site';
// Also rendered alone by the CTA editor of SEOGhost: it loads the kit's styles itself.
import '../seoghost.base.css';

type Props = {
  cta: ArticleCta;
  /** Site accent, to derive the colors the user did not pick. */
  accent: string | null | undefined;
  /** Slug of the article: goes in the tracking of the button link. */
  articleSlug: string;
  /** Site language, to format the score ("4,8" in French). */
  locale: string;
};

function formatNumber(value: number, locale: string): string {
  try {
    return new Intl.NumberFormat(locale).format(value);
  } catch {
    return String(value);
  }
}

/** Internal ad shown before the first h2 of an article. Also used as-is by the preview in SEOGhost. */
export default function ArticleCtaBlock({ cta, accent, articleSlug, locale }: Props) {
  const colors = resolveColors(cta, accent);
  const hasRating = cta.rating !== null && cta.rating > 0;
  const filledStars = hasRating ? Math.round(cta.rating ?? 0) : 0;
  const ratingText = [hasRating ? `${formatNumber(cta.rating ?? 0, locale)}/5` : null, cta.rating_label]
    .filter(Boolean)
    .join(' · ');

  return (
    <aside
      className="sg-article-cta my-10 px-6 py-8 text-center md:px-10"
      style={{
        background: colors.background,
        color: colors.text,
        border: cta.border_enabled ? `1px solid ${colors.border}` : 'none',
      }}
    >
      {cta.image_url ? (
        // Plain img: the block must not depend on the client's next/image remote patterns.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cta.image_url}
          alt={cta.image_alt ?? ''}
          width={128}
          height={128}
          loading="lazy"
          className="sg-article-cta-media mx-auto h-32 w-32"
        />
      ) : null}

      {ratingText ? (
        <p className="mt-4 flex items-center justify-center gap-2 text-sm">
          {hasRating ? (
            <span aria-hidden="true" className="sg-stars">
              {'★'.repeat(filledStars)}
              <span className="sg-stars-empty">{'★'.repeat(5 - filledStars)}</span>
            </span>
          ) : null}
          <span>{ratingText}</span>
        </p>
      ) : null}

      <p className="sg-article-cta-title mt-3">{cta.title}</p>
      {cta.subtitle ? <p className="sg-article-cta-text mx-auto mt-2 max-w-md">{cta.subtitle}</p> : null}

      <a
        href={withTracking(cta.button_url, articleSlug)}
        className="sg-article-cta-btn mt-6"
        style={{
          background: colors.button_background,
          color: colors.button_text,
          borderRadius: BUTTON_RADIUS[cta.button_radius ?? 'rounded'],
        }}
      >
        {cta.button_label}
      </a>

      {cta.subtext ? <p className="sg-article-cta-note mt-4">{cta.subtext}</p> : null}
    </aside>
  );
}
