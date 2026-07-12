// Parse the repo-root READINGS.md (the registry of reading sequences) into a
// build-time readings.json consumed by the homepage, the essay nav, and the
// vanilla-JS reading-lens module. READINGS.md is the single source of truth
// (operator- and machine-editable); this script never invents sequences.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, '../../../READINGS.md');
const md = readFileSync(SRC, 'utf8');

const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 };
const idsFromNumberedLine = (line) =>
  line
    .split('·')
    .map((s) => s.replace(/^\s*\d+\.\s*/, '').trim())
    .filter(Boolean);
// "a-great-deal-of-reading (reverberation-not-conspiracy)" -> file id in parens;
// bare "either-way" -> itself.
const idFromBullet = (line) => {
  const s = line.replace(/^\s*[-*]\s*/, '').trim();
  const paren = s.match(/\(([a-z0-9-]+)\)\s*$/);
  return paren ? paren[1] : s.split(/\s/)[0];
};

const lines = md.split('\n');
const readings = [];
const method = [];
const coda = [];
let section = null; // 'reading' | 'method' | 'coda' | 'planned' | null
let cur = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const mR = line.match(/^##\s+Reading\s+([IVX]+)\s+—\s+(.+?)\s*$/);
  if (mR) {
    section = 'reading';
    cur = { num: mR[1], order: ROMAN[mR[1]] ?? readings.length + 1,
            slug: `reading-${mR[1].toLowerCase()}`, title: mR[2].trim(),
            argument: '', essays: [] };
    readings.push(cur);
    continue;
  }
  if (/^##\s+The Method/.test(line)) { section = 'method'; cur = null; continue; }
  if (/^##\s+The Coda/.test(line)) { section = 'coda'; cur = null; continue; }
  if (/^##\s+Planned readings/.test(line)) { section = 'planned'; cur = null; continue; }
  if (/^##\s/.test(line)) { section = null; cur = null; continue; }

  if (section === 'reading' && cur) {
    const t = line.trim();
    if (!t) continue;
    if (/^\*\(/.test(t)) continue;               // *(extends …)* note
    if (/^\*.*\*$/.test(t) && !cur.argument) { cur.argument = t.replace(/^\*|\*$/g, '').trim(); continue; }
    if (/^\d+\.\s/.test(t)) { cur.essays.push(...idsFromNumberedLine(t)); continue; }
  } else if (section === 'method' && /^[-*]\s/.test(line.trim())) {
    method.push(idFromBullet(line));
  } else if (section === 'coda' && /^[-*]\s/.test(line.trim())) {
    coda.push(idFromBullet(line));
  }
}

readings.sort((a, b) => a.order - b.order);
const out = JSON.stringify({ readings, method, coda }, null, 2);

for (const dest of [resolve(here, '../src/data/readings.json'), resolve(here, '../public/readings.json')]) {
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, out);
}
console.log(`[gen-readings] ${readings.length} readings, ${method.length} method, ${coda.length} coda`);
