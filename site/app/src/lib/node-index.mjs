// A lightweight node index for build-time plugins (the content collection is the
// authoritative source for pages; remark plugins need their own cheap lookup).
// Reads data/nodes/** once and extracts id/title/category via frontmatter regex.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const NODES_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../data/nodes');

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

function field(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!m) return undefined;
  return m[1].trim().replace(/^["']|["']$/g, '');
}

let INDEX = null;

/** Map of node id → { title, category }. Built once, cached. */
export function nodeIndex() {
  if (INDEX) return INDEX;
  INDEX = new Map();
  for (const file of walk(NODES_DIR)) {
    const raw = readFileSync(file, 'utf8');
    const fm = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    const id = field(fm[1], 'id');
    if (!id) continue;
    INDEX.set(id, {
      title: field(fm[1], 'title') ?? id,
      category: field(fm[1], 'category') ?? 'concepts',
      // No-Stubs Law: unrouted nodes are known (so links can degrade) but never
      // linked. `routed: false` → not routed; absent/anything else → routed.
      routed: field(fm[1], 'routed') !== 'false',
    });
  }
  return INDEX;
}
