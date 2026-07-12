// Build-time static endpoint: essay id → display title, consumed by the
// reading-lens module (readings-ui.js) so it can name re-threaded prev/next
// links and the homepage "Continue" chip without a per-essay lookup.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const essays = (await getCollection('essays')).filter((e) => e.id !== 'index');
  const titles: Record<string, string> = {};
  for (const e of essays) titles[e.id] = e.data.title as string;
  return new Response(JSON.stringify(titles), {
    headers: { 'Content-Type': 'application/json' },
  });
};
