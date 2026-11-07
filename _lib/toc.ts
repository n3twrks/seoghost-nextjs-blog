// src/templates/saas/(seoghost)/_lib/toc.ts

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};

function decodeEntities(text: string): string {
  return text.replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (match) => ENTITIES[match] ?? match);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Adds an id to every h2/h3 (so the table of contents can link to them) and
 * returns the list of headings.
 */
export function ensureHeadingIds(html: string): { html: string; items: TocItem[] } {
  const used = new Set<string>();
  const items: TocItem[] = [];

  const withIds = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (_match, level: string, attrs: string, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
      if (!text) return _match;

      const base = slugify(text) || `section-${items.length + 1}`;
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);

      items.push({ id, text, level: Number(level) as 2 | 3 });
      const cleanAttrs = attrs.replace(/\sid=("[^"]*"|'[^']*')/i, '');
      return `<h${level}${cleanAttrs} id="${id}">${inner}</h${level}>`;
    }
  );

  return { html: withIds, items };
}
