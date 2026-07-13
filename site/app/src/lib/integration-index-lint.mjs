// Astro integration: fail the build if data/INDEX.md does not list exactly one
// entry per node file. Same discipline as the grade-vocab and edge-lint guards,
// pointed at the map of the map (AUDIT-2 Finding 3: INDEX had drifted to 78 of
// 133 nodes and every downstream survey inherited the shrunken graph). gen-index
// regenerates INDEX in prebuild; this guard proves it actually ran and matched.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const NODES = resolve(here, '../../../../data/nodes');
const INDEX = resolve(here, '../../../../data/INDEX.md');

function countNodeFiles() {
  // Count ROUTED node files only — the index lists routed nodes; unrouted
  // placeholders (No-Stubs Law) keep their file but are not indexed.
  let n = 0;
  for (const cat of readdirSync(NODES, { withFileTypes: true })) {
    if (!cat.isDirectory()) continue;
    for (const f of readdirSync(resolve(NODES, cat.name))) {
      if (!f.endsWith('.md')) continue;
      const raw = readFileSync(resolve(NODES, cat.name, f), 'utf8');
      if (/^routed:\s*false\s*$/m.test(raw)) continue;
      n++;
    }
  }
  return n;
}

export default function indexCountLint() {
  return {
    name: 'index-count-lint',
    hooks: {
      'astro:build:start': async ({ logger }) => {
        const nodes = countNodeFiles();
        const entries = (readFileSync(INDEX, 'utf8').match(/^- `/gm) || []).length;
        if (nodes !== entries) {
          throw new Error(
            `index-count-lint: data/INDEX.md lists ${entries} entries but data/nodes/** holds ${nodes} node files. ` +
              `Run \`npm run gen-index\` (it is wired into prebuild-assets) and commit the regenerated INDEX.`
          );
        }
        logger.info(`index-count-lint: clean — INDEX lists all ${nodes} nodes.`);
      },
    },
  };
}
