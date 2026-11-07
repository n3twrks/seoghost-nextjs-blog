// src/templates/saas/(seoghost)/_components/blog/CategoryLink.tsx
import Link from 'next/link';

import type { ArticleTag } from '../../_types/blog';

type Props = {
  tag: ArticleTag | undefined;
  basePath: string;
  /** Label shown (without link) when the article has no tag. */
  fallbackLabel: string;
};

/** First tag of an article, shown as its category. */
export default function CategoryLink({ tag, basePath, fallbackLabel }: Props) {
  if (!tag) {
    return <span className="inline-block text-sm font-medium text-[color:var(--sg-accent)]">{fallbackLabel}</span>;
  }

  return (
    <Link
      href={`${basePath}/tag/${tag.slug}`}
      className="inline-block text-sm font-medium text-[color:var(--sg-accent)] hover:underline"
    >
      {tag.name}
    </Link>
  );
}
