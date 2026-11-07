// src/templates/saas/(seoghost)/_components/blog/BlogShell.tsx
//
// Wrapper of every blog page. Presentational: blog/layout.tsx passes the
// accent from the API, the in-app preview the one from the database.
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import { shellStyle } from '../../_lib/appearance';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--sg-inter' });

export default function BlogShell({ accent, children }: { accent: string | null | undefined; children: ReactNode }) {
  return (
    <div className={`${inter.variable} bg-white text-slate-900 antialiased`} style={shellStyle(accent, 'var(--sg-inter)')}>
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">{children}</div>
    </div>
  );
}
