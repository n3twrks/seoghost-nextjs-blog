// src/templates/saas/(seoghost)/_components/pages/PagesShell.tsx
//
// Wrapper of every programmatic page. It renders inside your own layouts, so
// your header, footer, fonts and translations apply; only the accent is set.
import type { ReactNode } from 'react';

import { shellStyle } from '../../_lib/appearance';

export default function PagesShell({ accent, children }: { accent: string | null | undefined; children: ReactNode }) {
  return (
    <div className="antialiased" style={shellStyle(accent)}>
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">{children}</div>
    </div>
  );
}
