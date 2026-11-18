// src/templates/saas/(seoghost)/_components/blog/CategoryLink.tsx
import type { ArticleTag } from '../../_types/blog';

type Props = {
  tag: ArticleTag | undefined;
  /** Label shown when the article has no tag. */
  fallbackLabel: string;
};

/** First tag of an article, shown as its category. Plain text: the blog has no tag pages (thin pages Google does not index). */
export default function CategoryLink({ tag, fallbackLabel }: Props) {
  return <span className="sg-link inline-block">{tag?.name ?? fallbackLabel}</span>;
}
