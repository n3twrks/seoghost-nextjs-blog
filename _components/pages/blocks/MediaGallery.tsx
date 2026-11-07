// src/templates/saas/(seoghost)/_components/pages/blocks/MediaGallery.tsx
import Image from 'next/image';

import type { BrandMedia } from '../../../_types/brand';
import { sectionTitle } from '../../../_lib/landing-style';
import { videoSource } from '../../../_lib/video';

/** Photos and videos of the Brand Kit. Only YouTube, Vimeo and direct .mp4 links are played; other links stay links. */
export default function MediaGallery({ items, title, watchLabel }: { items: BrandMedia[]; title: string; watchLabel: string }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className={sectionTitle}>{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const video = item.kind === 'video' && item.video_url ? videoSource(item.video_url) : null;
          return (
            <li key={item.id} className="flex flex-col gap-2">
              {item.kind === 'image' && item.url && (
                <Image
                  src={item.url}
                  alt={item.alt ?? ''}
                  width={item.width ?? 1200}
                  height={item.height ?? 800}
                  sizes="(min-width: 640px) 480px, 100vw"
                  className="h-auto w-full rounded-3xl object-cover"
                />
              )}
              {video?.kind === 'embed' && (
                <iframe
                  src={video.src}
                  title={item.caption || item.alt || watchLabel}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="aspect-video w-full rounded-3xl"
                />
              )}
              {video?.kind === 'file' && <video src={video.src} controls preload="none" className="aspect-video w-full rounded-3xl bg-black" />}
              {video?.kind === 'link' && (
                <a href={video.src} rel="noopener noreferrer" className="text-sm font-medium underline underline-offset-4">
                  {item.caption || watchLabel}
                </a>
              )}
              {item.caption && video?.kind !== 'link' && <p className="text-sm opacity-70">{item.caption}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
