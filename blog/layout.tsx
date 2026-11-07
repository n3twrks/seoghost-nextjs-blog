// src/templates/saas/(seoghost)/blog/layout.tsx
import type { ReactNode } from 'react';

import BlogShell from '../_components/blog/BlogShell';
import { getSite } from '../_lib/site';

export default async function BlogLayout({ children }: { children: ReactNode }) {
  // The site may be unreachable: the blog then renders with the default accent.
  const site = await getSite().catch(() => null);
  return <BlogShell accent={site?.appearance?.accent}>{children}</BlogShell>;
}
