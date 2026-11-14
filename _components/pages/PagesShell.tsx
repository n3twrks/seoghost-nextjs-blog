// src/templates/saas/(seoghost)/_components/pages/PagesShell.tsx
//
// Wrapper of every programmatic page. It renders inside your own layouts, so
// your header, footer, fonts, text colour and translations apply; only the accent is set.
// Loads the kit's default styles; your theme (src/styles/seoghost.theme.css) overrides them.
import type { ReactNode } from 'react';

import { shellStyle } from '../../_lib/appearance';
import '../seoghost.base.css';

export default function PagesShell({ accent, children }: { accent: string | null | undefined; children: ReactNode }) {
  return (
    <div className="sg-pages" style={shellStyle(accent)}>
      <div className="sg-container-pages">{children}</div>
    </div>
  );
}
