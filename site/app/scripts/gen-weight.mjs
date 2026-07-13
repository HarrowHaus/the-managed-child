// Contextual weight ledger (AUDIT-2 Finding 5). For every node, compute how much
// of the corpus converges on it — graded in-edges by standing, readings served,
// essays grounded — and how thin its card is. NOT reader-facing: an instrument,
// never a claim. It changes what the prose is OBLIGED TO NOTICE, never what it is
// PERMITTED TO ASSERT — weight never moves a grade (the seam is absolute).
// Consumers: the maintainer (ranks thin-but-heavy nodes as top expansion
// candidates), the method-critic ("under-read, not under-sourced" REVISE), and
// the grader (weight-never-moves-grades, documented in agents/grader.md).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '../../..');
const readings = JSON.parse(readFileSync(resolve(here, '../src/data/readings.json'), 'utf8'));

const STANDING = { WELD: 'documented', HYPOTHESIS: 'possible', 'FICTION-ALERT': 'apocryphal', FRAME: 'framework', PRINCIPLE: 'principle' };

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = resolve(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

// --- nodes: grade, card thinness, out-edges (to + edge grade) ---
const nodes = new Map();
for (const f of walk(resolve(ROOT, 'data/nodes'))) {
  const md = readFileSync(f, 'utf8');
  const id = (md.match(/^id:\s*(.+)$/m) || [])[1]?.trim();
  if (!id) continue;
  const grade = (md.match(/^grade:\s*(.+)$/m) || [, ''])[1].trim();
  const body = md.slice(md.indexOf('---', 3) + 3);
  const sourceCount = (md.match(/—\s*\[(PRIMARY|SECONDARY)\]/g) || []).length;
  const edges = [...md.matchAll(/\{to:\s*([a-z0-9-]+)[^}]*?grade:\s*([A-Z-]+)/g)].map((m) => ({ to: m[1], grade: m[2] }));
  nodes.set(id, { id, grade, bodyLen: body.trim().length, sourceCount, edges });
}

// --- in-edge counts by standing ---
const inBy = new Map(); // node -> {documented, possible, ...}
for (const { edges } of nodes.values())
  for (const e of edges) {
    if (!nodes.has(e.to)) continue;
    const s = STANDING[e.grade] || 'other';
    if (!inBy.has(e.to)) inBy.set(e.to, {});
    inBy.get(e.to)[s] = (inBy.get(e.to)[s] || 0) + 1;
  }

// --- essays grounded + readings served (grounding, one-hop like OVERLAP) ---
const grounding = {};
for (const f of walk(resolve(ROOT, 'essays'))) {
  const md = readFileSync(f, 'utf8');
  const m = md.match(/grounding_nodes:\s*\n((?:\s*-\s*.+\n?)+)/);
  if (!m) continue;
  const id = f.split('/').pop().replace(/\.md$/, '');
  grounding[id] = m[1].split('\n').map((l) => l.replace(/^\s*-\s*/, '').trim()).filter(Boolean);
}
const essaysGrounded = new Map();
for (const list of Object.values(grounding)) for (const n of list) essaysGrounded.set(n, (essaysGrounded.get(n) || 0) + 1);

const adj = new Map();
for (const { id, edges } of nodes.values())
  for (const e of edges) {
    if (!nodes.has(e.to)) continue;
    if (!adj.has(id)) adj.set(id, new Set()); adj.get(id).add(e.to);
    if (!adj.has(e.to)) adj.set(e.to, new Set()); adj.get(e.to).add(id);
  }
const serves = new Map();
const seed = (n, k) => { if (!serves.has(n)) serves.set(n, new Set()); serves.get(n).add(k); };
for (const r of readings.readings) for (const es of r.essays) for (const n of grounding[es] || []) seed(n, r.slug);
for (const [node, keys] of new Map([...serves].map(([k, v]) => [k, new Set(v)])))
  for (const nb of adj.get(node) || []) for (const k of keys) seed(nb, k);

// --- assemble ledger ---
const ledger = {};
for (const { id, grade, bodyLen, sourceCount } of nodes.values()) {
  const inc = inBy.get(id) || {};
  const readingsServed = (serves.get(id) || new Set()).size;
  const grounded = essaysGrounded.get(id) || 0;
  const inDoc = inc.documented || 0, inPos = inc.possible || 0, inOther = (inc.framework || 0) + (inc.principle || 0) + (inc.apocryphal || 0) + (inc.other || 0);
  // weight: converging documented edges and multi-reading service count most.
  const weight = inDoc * 2 + inPos + inOther + readingsServed * 2 + grounded;
  // thin card: short body AND few sources, relative to the corpus.
  const thin = bodyLen < 900 || sourceCount < 2;
  ledger[id] = { grade, weight, inDocumented: inDoc, inPossible: inPos, readingsServed, essaysGrounded: grounded, bodyLen, sourceCount, thin };
}

writeFileSync(resolve(ROOT, 'research/weight-ledger.json'), JSON.stringify(ledger, null, 0) + '\n');

// --- maintainer view: thin-but-heavy ranking (replaces gaps.md §2 by computation) ---
const ranked = Object.entries(ledger)
  .filter(([, v]) => v.thin)
  .sort((a, b) => b[1].weight - a[1].weight)
  .slice(0, 25);
let md = `# WEIGHT.md — contextual weight ledger (the instrument, not a claim)
*AUDIT-2 Finding 5. For each node: graded in-edges by standing, readings served, essays grounded, and whether its card is thin. **Weight never moves a grade** — it changes what the prose is obliged to NOTICE, never what it is permitted to ASSERT. Not reader-facing. Generated by scripts/gen-weight.mjs; full data in research/weight-ledger.json.*

## Thin-but-heavy — the top expansion candidates (maintainer §2, computed)
*High convergence, thin card. A high-weight node with a thin card is the top expansion candidate.*

| node | grade | weight | in-documented | readings | essays | body | sources |
|---|---|---|---|---|---|---|---|
`;
for (const [id, v] of ranked)
  md += `| \`${id}\` | ${v.grade} | ${v.weight} | ${v.inDocumented} | ${v.readingsServed} | ${v.essaysGrounded} | ${v.bodyLen} | ${v.sourceCount} |\n`;
writeFileSync(resolve(ROOT, 'research/WEIGHT.md'), md);
console.log(`[gen-weight] ${Object.keys(ledger).length} nodes weighted; ${ranked.length} thin-but-heavy flagged`);
