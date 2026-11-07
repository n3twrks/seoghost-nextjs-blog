// src/templates/saas/(seoghost)/_lib/subscribe.ts
'use server';

// Runs on the server, so the txtbook API key never reaches the visitor's browser.

export type SubscribeState = {
  status: 'idle' | 'success' | 'invalid' | 'error';
};

const API_URL = process.env.SEOGHOST_API_URL ?? 'https://seoghost.dev';

export async function subscribe(_previous: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const site = process.env.NEXT_PUBLIC_SEOGHOST_SITE_SLUG;
  const apiKey = process.env.SEOGHOST_API_KEY;
  if (!site || !apiKey) return { status: 'error' };

  try {
    const res = await fetch(`${API_URL}/api/v1/subscribe?${new URLSearchParams({ site, api_key: apiKey })}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        source: formData.get('source'),
        website: formData.get('website'),
      }),
      cache: 'no-store',
    });

    if (res.ok) return { status: 'success' };
    return { status: res.status === 400 ? 'invalid' : 'error' };
  } catch {
    return { status: 'error' };
  }
}
