// src/templates/saas/(seoghost)/blog/not-found.tsx — 404 of /blog/* only (unknown article or tag, other locale).
import BlogNotFoundView from '../_components/blog/BlogNotFoundView';
import { getSite } from '../_lib/site';

export default async function NotFound() {
  // The site may be unreachable: a missing language just means the URL one, or English.
  const site = await getSite().catch(() => null);
  return <BlogNotFoundView siteLanguage={site?.language} />;
}
