// src/templates/saas/(seoghost)/_components/blog/BlogShell.tsx
//
// Wrapper of every blog page. Presentational: blog/layout.tsx passes the
// accent from the API, the in-app preview the one from the database.
// Loads the kit's default styles; your theme (src/styles/seoghost.theme.css) overrides them.
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import { shellStyle } from '../../_lib/appearance';
import '../seoghost.base.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--sg-inter' });

export default function BlogShell({ accent, children }: { accent: string | null | undefined; children: ReactNode }) {
  return (
    <div className={`${inter.variable} sg-blog`} style={shellStyle(accent)}>
      <div className="sg-container">{children}</div>
    </div>
  );
}
