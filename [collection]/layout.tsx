// src/templates/saas/(seoghost)/[collection]/layout.tsx
import type { ReactNode } from 'react';

import PagesShell from '../_components/pages/PagesShell';
import { getSite } from '../_lib/site';

export default async function PagesLayout({ children }: { children: ReactNode }) {
  const site = await getSite().catch(() => null);
  return <PagesShell accent={site?.appearance?.accent}>{children}</PagesShell>;
}
