// src/templates/saas/(seoghost)/_components/blog/CoverImage.tsx
import Image from 'next/image';

type Props = {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Cover with a fixed ratio (set through className) and an accent-tinted fallback when there is no image. */
export default function CoverImage({ src, alt, sizes, priority = false, className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: 'color-mix(in srgb, var(--sg-accent) 10%, white)' }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : null}
    </div>
  );
}
