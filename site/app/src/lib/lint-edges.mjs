// Build-time EDGE LINT — enforces EDGE-VOCABULARY.md mechanically (a deterministic
// gate, exactly like the grade-vocab guard). It reads node frontmatter directly
// (edges are data, not rendered HTML) and fails the build on any violation:
//   1. every edge `type` ∈ the closed TYPE list, `register` ∈ the closed list;
//   2. every edge `to` resolves to a real node;
//   3. no `documented` (WELD*) edge without an attached confirming primary —
//      the moat: a documented standing requires a [PRIMARY] source on the node
//      that authors the edge. Otherwise the standing is `possible` (HYPOTHESIS).
// Rule 4 of EDGE-VOCABULARY (edge/prose semantic contradiction) is intentionally
// NOT mechanized here — it is semantic, and belongs to the maintainer scan, which
// surfaces it for a human ruling (agents/maintainer.md §3).

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const NODES_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../data/nodes');

// Closed vocabulary (EDGE-VOCABULARY.md). Authoritative.
export const EDGE_TYPES = new Set([
  'read', 'authored', 'met', 'influenced', 'mentored', 'groomed', 'advised',
  'funded', 'founded', 'member-of', 'broke-from', 'restates', 'precedes', 'no-relay',
]);
export const EDGE_REGISTERS = new Set(['worked-off', 'same-field', 'none']);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function frontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  return m ? m[1] : '';
}

// Parse the inline edge objects out of a frontmatter block.
function parseEdges(fm) {
  const edges = [];
  const re = /\{to:\s*([a-z0-9-]+),\s*type:\s*([a-z-]+),\s*register:\s*([a-z-]+),\s*grade:\s*([A-Za-z-]+)[^}]*\}/g;
  let m;
  while ((m = re.exec(fm)) !== null) {
    edges.push({ to: m[1], type: m[2], register: m[3], grade: m[4], raw: m[0] });
  }
  return edges;
}

/** Scan all node frontmatter for edge-vocabulary violations. Returns findings. */
export function lintEdges() {
  const nodes = new Map(); // id -> { hasPrimary, edges }
  const files = walk(NODES_DIR);
  for (const file of files) {
    const fm = frontmatter(readFileSync(file, 'utf8'));
    const id = (fm.match(/^id:\s*(.+)$/m) || [])[1]?.trim();
    if (!id) continue;
    nodes.set(id, { hasPrimary: /\[PRIMARY/.test(fm), edges: parseEdges(fm) });
  }

  const findings = [];
  for (const [id, node] of nodes) {
    for (const e of node.edges) {
      const label = `${id} → ${e.to} (${e.type})`;
      if (!EDGE_TYPES.has(e.type)) {
        findings.push({ rule: 'type', node: id, edge: label, detail: `off-vocabulary type "${e.type}"` });
      }
      if (!EDGE_REGISTERS.has(e.register)) {
        findings.push({ rule: 'register', node: id, edge: label, detail: `off-vocabulary register "${e.register}"` });
      }
      if (!nodes.has(e.to)) {
        findings.push({ rule: 'dangling', node: id, edge: label, detail: `\`to\` does not resolve to any node` });
      }
      if (/^WELD/i.test(e.grade) && !node.hasPrimary) {
        findings.push({
          rule: 'moat',
          node: id,
          edge: label,
          detail: `documented (WELD) edge but node "${id}" carries no attached [PRIMARY] source — either attach a primary or grade the edge HYPOTHESIS (possible)`,
        });
      }
    }
  }
  return findings;
}

export function formatEdgeFindings(findings) {
  const lines = [
    `Edge-vocabulary violations in ${findings.length} edge(s) — EDGE-VOCABULARY.md.`,
    `Every edge's type/register must be in the closed lists, every \`to\` must resolve,`,
    `and no \`documented\` (WELD) edge may stand without an attached [PRIMARY] source.`,
    '',
  ];
  for (const f of findings) lines.push(`  ✗ [${f.rule}] ${f.edge} — ${f.detail}`);
  return lines.join('\n');
}
