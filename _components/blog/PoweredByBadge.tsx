// src/templates/saas/(seoghost)/_components/blog/PoweredByBadge.tsx
import type { Messages } from '../../_i18n/messages';
import type { Site } from '../../_types/blog';

/** Where the badge points. One constant: the domain is final, no redirect in between. */
const SEOGHOST_URL = 'https://seoghost.dev';

/** Mascot hosted by SEOGhost, so the template needs no image file or Next image config. */
const SEOGHOST_LOGO =
  'https://apnsxmfcxswfhjfqlale.supabase.co/storage/v1/object/public/txtbook-media/brand/seoghost.webp';

type Props = {
  site: Site | null;
  t: Messages;
};

/**
 * "Blog made on autopilot with SEOGhost", shown on freemium blogs
 * (`show_badge` comes from the txtbook API). Absent flag = no badge, so a blog
 * running an older template or API stays as it is.
 */
export default function PoweredByBadge({ site, t }: Props) {
  if (!site?.show_badge) return null;

  // The source domain tells us which blog the click came from.
  const params = new URLSearchParams({ utm_source: site.domain ?? 'blog', utm_medium: 'blog-badge' });

  return (
    <div className="mt-16 flex justify-center border-t border-slate-200 pt-8">
      <a
        href={`${SEOGHOST_URL}/?${params}`}
        target="_blank"
        rel="noopener"
        className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
      >
        {/* Plain <img>: the template must not depend on next/image remote patterns. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SEOGHOST_LOGO} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
        <span>{t.poweredBy}</span>
      </a>
    </div>
  );
}
