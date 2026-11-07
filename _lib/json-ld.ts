// src/templates/saas/(seoghost)/_lib/json-ld.ts
// Structured data for search and AI answer engines: FAQPage + BreadcrumbList.
import type { FaqBlock, ProgrammaticPage } from '../_types/pages';

// "FAQ" heading in the languages a site can be written in (same list as the SEO scorer; accents are stripped before the test).
const FAQ_HEADING =
  /\b(faq|frequently asked|questions? frequentes|foire aux questions|questions et reponses|preguntas frecuentes|haufig gestellte fragen|fragen und antworten|domande frequenti|perguntas frequentes)\b/;

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: "'", lsquo: "'", laquo: '«', raquo: '»', hellip: '…' };

function textOf(html: string): string {
  return html
    .replace(/<\/?(strong|em|b|i|u|a|span|mark)\b[^>]*>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match)
    .replace(/\s+/g, ' ')
    .trim();
}

/** FAQPage structured data from the FAQ section of an article (an H2 "Frequently asked questions", each question an H3 followed by its answer). Null without at least 2 questions. */
export function articleFaqJsonLd(contentHtml: string) {
  const h2s = [...contentHtml.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)];
  const faqH2 = h2s.find((m) => FAQ_HEADING.test(textOf(m[1]).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()));
  if (!faqH2 || faqH2.index === undefined) return null;

  const start = faqH2.index + faqH2[0].length;
  const nextH2 = contentHtml.slice(start).search(/<h2\b/i);
  const section = contentHtml.slice(start, nextH2 === -1 ? undefined : start + nextH2);

  const entities = [...section.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3\b|$)/gi)]
    .map((m) => ({ q: textOf(m[1]), a: textOf(m[2]) }))
    .filter((item) => item.q && item.a);
  if (entities.length < 2) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entities.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
  };
}

export function pageJsonLd(page: ProgrammaticPage, urls: { home: string; hub: string; page: string }, labels: { home: string; hub: string }) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: labels.home, item: urls.home },
        { '@type': 'ListItem', position: 2, name: labels.hub, item: urls.hub },
        { '@type': 'ListItem', position: 3, name: page.title, item: urls.page },
      ],
    },
  ];

  const faq = page.blocks.find((b): b is FaqBlock => b.type === 'faq');
  if (faq?.items.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
