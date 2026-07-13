// Regenerate data/INDEX.md from data/nodes/** at build time. The index is the
// map of the map: one line per node, grouped by category, id — title (grade).
// It is GENERATED, never hand-edited — a hand-written list rots the moment a
// node is added (see AUDIT-2 Finding 3, which found INDEX listing 78 of 133).
// The integration-index-lint guard fails the build if the counts ever diverge.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const NODES = resolve(here, '../../../data/nodes');
const OUT = resolve(here, '../../../data/INDEX.md');

// The five node categories, rendered in this order.
const CATEGORIES = ['people', 'institutions', 'events', 'works', 'concepts'];

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim().replace(/^["']|["']$/g, '');
    fm[kv[1]] = v;
  }
  return fm;
}

const sections = [];
let total = 0;
for (const cat of CATEGORIES) {
  let files;
  try {
    files = readdirSync(resolve(NODES, cat)).filter((f) => f.endsWith('.md'));
  } catch {
    continue;
  }
  const rows = files
    .map((f) => frontmatter(readFileSync(resolve(NODES, cat, f), 'utf8')))
    .filter((fm) => fm.id)
    .map((fm) => ({ id: fm.id, title: fm.title || fm.id, grade: fm.grade || '—' }))
    .sort((a, b) => a.id.localeCompare(b.id));
  total += rows.length;
  sections.push(
    `## ${cat}\n` +
      rows.map((r) => `- \`${r.id}\` — ${r.title} *(${r.grade})*`).join('\n')
  );
}

const body =
  `# NODE INDEX (generated)\n` +
  `*Machine-generated from data/nodes/** on every build — do not hand-edit. ${total} nodes.*\n\n` +
  sections.join('\n\n') +
  '\n';

writeFileSync(OUT, body);
console.log(`[gen-index] ${total} nodes across ${sections.length} categories`);
