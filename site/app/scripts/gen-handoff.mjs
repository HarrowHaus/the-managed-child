// Fill the generated state block in HANDOFF.md from live repo facts, so the
// zero-context on-ramp can never again describe a smaller, earlier project
// (AUDIT-2 Finding 2: HANDOFF was on-ramping sessions into "78 nodes, research
// complete, Phase 1"). Everything between the GEN:STATE markers is machine-
// written from node/essay counts, READINGS.md, QUEUE's resume pointer, and the
// open items in DECISIONS.md. The surrounding narrative is hand-maintained.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '../../..');
const R = (p) => resolve(ROOT, p);

function countNodes() {
  let n = 0;
  for (const cat of readdirSync(R('data/nodes'), { withFileTypes: true })) {
    if (cat.isDirectory())
      n += readdirSync(R(`data/nodes/${cat.name}`)).filter((f) => f.endsWith('.md')).length;
  }
  return n;
}
const countEssays = () =>
  readdirSync(R('essays')).filter((f) => f.endsWith('.md') && f !== 'index.md').length;

const readings = (readFileSync(R('READINGS.md'), 'utf8').match(/^## Reading\s+[IVX]+\s+—\s+.+$/gm) || [])
  .map((l) => l.replace(/^##\s+/, '').trim());

const queue = readFileSync(R('QUEUE.md'), 'utf8');
const phase = (queue.match(/PHASE:\s*([A-Z])/) || [, '?'])[1];

// Open decisions: DECISIONS.md OPEN section, ids whose line does not say RESOLVED.
const decisions = readFileSync(R('DECISIONS.md'), 'utf8');
const openBlock = decisions.slice(decisions.indexOf('## OPEN'));
const open = [...openBlock.matchAll(/^\*\*(D-[\w-]+)\s*·\s*([^*]+?)\*\*(.*)$/gm)]
  .filter((m) => !/RESOLVED/i.test(m[3]))
  .map((m) => `${m[1]} (${m[2].trim().replace(/\.$/, '')})`);

const block = [
  `## 6. Project state & next action — GENERATED (do not hand-edit; \`npm run gen-handoff\`)`,
  ``,
  `- **Corpus:** ${countNodes()} nodes across data/nodes/**, ${countEssays()} shipped reading-entries, **${readings.length} live readings**.`,
  ...readings.map((r) => `  - ${r}`),
  `- **Phase:** ${phase} (the reverberation loop — a corpus that grows by documented adjacency and is re-read whole after every growth; research is NOT closed).`,
  `- **The build enforces:** edge-lint · index-count · grade-vocab guard, and the two-key gate (method-critic + operator-agent) on every keystone. These are binding law now, not future plans.`,
  `- **Your next action:** read the **resume pointer at the bottom of \`QUEUE.md\`** — it is the single live description of where work stands and what ships next. Do not act on any "Phase 1 / stub / research complete" language elsewhere; it is stale.`,
  `- **Open decisions (see DECISIONS.md):** ${open.length ? open.join(' · ') : 'none'}.`,
].join('\n');

const src = readFileSync(R('HANDOFF.md'), 'utf8');
const START = '<!-- GEN:STATE:START -->';
const END = '<!-- GEN:STATE:END -->';
const out = src.replace(
  new RegExp(`${START}[\\s\\S]*?${END}`),
  `${START}\n${block}\n${END}`
);
writeFileSync(R('HANDOFF.md'), out);
console.log(`[gen-handoff] state block: ${countNodes()} nodes, ${countEssays()} essays, ${readings.length} readings, phase ${phase}`);
