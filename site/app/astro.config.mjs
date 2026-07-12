// @ts-check
import { defineConfig } from 'astro/config';
import remarkStripScaffolding from './src/lib/remark-strip-scaffolding.mjs';
import remarkAutolinkNodes from './src/lib/remark-autolink-nodes.mjs';
import rehypeSourceFootnotes from './src/lib/rehype-source-footnotes.mjs';
import rehypeEssayNodeLinks from './src/lib/rehype-essay-node-links.mjs';
import gradeVocabGuard from './src/lib/integration-grade-vocab.mjs';
import edgeLint from './src/lib/integration-edge-lint.mjs';

// The Managed Child — reading environment on a fork of Gwern's frontend.
// build.format 'directory' keeps URLs extensionless and dot-free (e.g.
// /nodes/the-root/), which is what Gwern's localPage matcher requires for
// inter-node links to auto-pop as transclusions. Zero Astro client JS — the
// only runtime is the vendored Gwern bundle loaded by the layout.
export default defineConfig({
  site: 'https://the-managed-child.example',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [edgeLint(), gradeVocabGuard()],
  markdown: {
    smartypants: true,
    gfm: true,
    remarkPlugins: [remarkStripScaffolding, remarkAutolinkNodes],
    rehypePlugins: [rehypeSourceFootnotes, rehypeEssayNodeLinks],
  },
});
