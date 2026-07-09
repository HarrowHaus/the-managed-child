// @ts-check
import { defineConfig } from 'astro/config';
import remarkStripScaffolding from './src/lib/remark-strip-scaffolding.mjs';

// The Managed Child — Gwern-parity reading environment.
// Content lives in the repo root (data/nodes, book/chapters, essays); this
// project only renders it. Zero client JS by default (progressive enhancement);
// the reading experience must work with JavaScript disabled.
export default defineConfig({
  site: 'https://the-managed-child.example',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: {
    smartypants: true,
    gfm: true,
    remarkPlugins: [remarkStripScaffolding],
  },
});
