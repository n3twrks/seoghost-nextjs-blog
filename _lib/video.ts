// src/templates/saas/(seoghost)/_lib/video.ts
//
// Brand Kit videos are URLs typed by the client: only known players are embedded,
// anything else is shown as a plain link.

export type VideoSource =
  | { kind: 'embed'; src: string }
  | { kind: 'file'; src: string }
  | { kind: 'link'; src: string };

export function isHttpUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  try {
    const { protocol } = new URL(value);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
}

export function videoSource(url: string): VideoSource | null {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  if (u.protocol !== 'https:') return null;
  const host = u.hostname.replace(/^www\./, '');

  let youtubeId: string | null = null;
  if (host === 'youtu.be') youtubeId = u.pathname.slice(1);
  else if (host === 'youtube.com' || host === 'm.youtube.com') {
    youtubeId = u.pathname === '/watch' ? u.searchParams.get('v') : u.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/)?.[1] ?? null;
  }
  if (youtubeId && /^[\w-]{6,20}$/.test(youtubeId)) return { kind: 'embed', src: `https://www.youtube-nocookie.com/embed/${youtubeId}` };

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = u.pathname.match(/(\d{5,})/)?.[1];
    if (id) return { kind: 'embed', src: `https://player.vimeo.com/video/${id}` };
  }

  if (u.pathname.toLowerCase().endsWith('.mp4')) return { kind: 'file', src: u.toString() };
  return { kind: 'link', src: u.toString() };
}
