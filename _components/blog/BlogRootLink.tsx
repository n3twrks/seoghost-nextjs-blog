// src/templates/saas/(seoghost)/_components/blog/BlogRootLink.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Link to the blog index the visitor is under (/blog, /fr/blog, /guides/blog).
 * not-found.tsx receives no params, so the path is read from the URL.
 */
export default function BlogRootLink({ className, children }: { className?: string; children: ReactNode }) {
  const pathname = usePathname() ?? '';
  const index = pathname.search(/\/blog(\/|$)/);
  return (
    <Link href={index >= 0 ? `${pathname.slice(0, index)}/blog` : '/'} className={className}>
      {children}
    </Link>
  );
}
