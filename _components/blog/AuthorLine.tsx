// src/templates/saas/(seoghost)/_components/blog/AuthorLine.tsx
import Image from 'next/image';

import type { Messages } from '../../_i18n/messages';
import { formatDate } from '../../_lib/format';

type Props = {
  authorName: string | null;
  authorAvatarUrl: string | null;
  date: string;
  t: Messages;
};

/** Author (optional) on the left, date on the right. Without an author only the date is shown. */
export default function AuthorLine({ authorName, authorAvatarUrl, date, t }: Props) {
  return (
    <div
      className={`sg-meta flex items-center gap-3 ${authorName ? 'justify-between' : 'justify-start'}`}
    >
      {authorName ? (
        <span className="flex min-w-0 items-center gap-2">
          {authorAvatarUrl ? (
            <Image
              src={authorAvatarUrl}
              alt=""
              width={24}
              height={24}
              className="sg-avatar h-6 w-6 flex-none"
            />
          ) : null}
          <span className="sg-meta-strong truncate">{authorName}</span>
        </span>
      ) : null}
      <time dateTime={date} className="flex-none">
        {formatDate(date, t.dateLocale)}
      </time>
    </div>
  );
}
