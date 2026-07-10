// Generate Gwern-format annotation snippets from node frontmatter (spec §IV.2
// step 2). Links marked `.link-annotated` pop a concise card transcluded
// from /metadata/annotation/<double-encoded href>.html.
//
// The forked runtime requests `/metadata/annotation/` + enc(enc(pathname)) +
// `.html`; the static server decodes %25→% once, so the on-disk file is named
// `%2Fnodes%2F<id>.html`. The card's title-link must carry `link-annotated`
// (Annotations.referenceDataFromParsedAPIResponse). We surface the signature —
// the plain certainty word derived from `grade` — inside the abstract.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const NODES_DIR = resolve(here, '../../../data/nodes');
const OUT_DIR = resolve(here, '../public/metadata/annotation');

const CERT = {
  documented: 'Documented: verifiable in the record. Survives a hostile reader.',
  possible: 'Possible: a resemblance or suspected tie, legitimate to pursue but never cited as proof.',
  apocryphal: 'Apocryphal: circulates as fact but traces to a fabricated or fictional source.',
};
function standing(grade) {
  const g = (grade || '').trim().toUpperCase();
  if (g === 'DISCARD') return { discarded: true };
  if (g === 'FRAME') return { structural: 'framework' };
  if (g === 'PRINCIPLE') return { structural: 'principle' };
  if (g.startsWith('WELD')) return { word: 'documented' };
  if (g.startsWith('HYPOTHESIS')) return { word: 'possible' };
  if (g.startsWith('FICTION')) return { word: 'apocryphal' };
  return {};
}
function register(tags) {
  const t = tags.map((x) => x.toLowerCase());
  const a = t.includes('articulation'), e = t.includes('enactment');
  if (a && e) return 'articulation & enactment';
  if (a) return 'articulation';
  if (e) return 'enactment';
  return null;
}
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function walk(dir) {
  const out = [];
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (n.endsWith('.md')) out.push(p);
  }
  return out;
}
function scalar(fm, key) {
  const m = fm.match(new RegExp(`^${key}:[ \\t]*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : undefined;
}
function tagList(fm) {
  const m = fm.match(/^tags:[ \t]*\[(.*)\]/m);
  if (!m) return [];
  return m[1].split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
}
// First real body paragraph, skipping the H1, the standing blockquote, section
// headings, and italic-only scaffolding notes.
function firstParagraph(body) {
  const lines = body.split('\n');
  const paras = [];
  let cur = [];
  for (const line of lines) {
    if (line.trim() === '') { if (cur.length) { paras.push(cur.join(' ')); cur = []; } continue; }
    if (/^#/.test(line) || /^>/.test(line)) continue;
    cur.push(line.trim());
  }
  if (cur.length) paras.push(cur.join(' '));
  for (const p of paras) {
    const t = p.trim();
    if (!t) continue;
    if (/^_.*_$/.test(t)) continue;          // italic-only scaffolding
    if (/^\*?STUB/i.test(t)) continue;
    // strip inline markdown emphasis/code/link syntax for a plain preview
    return t.replace(/[`*_]/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').slice(0, 400);
  }
  return null;
}

function main() {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });
  let n = 0;
  for (const file of walk(NODES_DIR)) {
    const raw = readFileSync(file, 'utf8');
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!fmMatch) continue;
    const fm = fmMatch[1], body = fmMatch[2];
    const id = scalar(fm, 'id');
    if (!id) continue;
    const st = standing(scalar(fm, 'grade'));
    if (st.discarded) continue;

    const title = scalar(fm, 'title') || id;
    const dates = scalar(fm, 'dates');
    const mapNode = scalar(fm, 'map_node');
    const reg = register(tagList(fm));
    const abstract = scalar(fm, 'abstract') || firstParagraph(body) || '';

    // Metadata line inside the card — the signature word, plain and hoverable.
    const bits = [];
    if (st.word) bits.push(`<span class="certainty-word" title="${esc(CERT[st.word])}">${st.word}</span>`);
    else if (st.structural) bits.push(`<span class="certainty-structural">${st.structural}</span>`);
    if (reg) bits.push(`<em>${esc(reg)}</em>`);
    if (dates && dates !== '-') bits.push(esc(dates));
    if (mapNode) bits.push(`map ${esc(mapNode)}`);
    const metaLine = bits.length ? `<p class="annotation-standing">${bits.join(' · ')}</p>` : '';
    const abstractP = abstract ? `<p>${esc(abstract)}</p>` : '<p class="annotation-empty">A partial entry — metadata only, no abstract yet.</p>';

    const html = `<div class="annotation">
<p class="data-field title"><a class="link-annotated" href="/nodes/${id}">${esc(title)}</a></p>
<blockquote class="annotation-abstract">
${metaLine}
${abstractP}
</blockquote>
</div>
`;
    // On-disk name maps from the double-encoded request after one %25→% decode.
    writeFileSync(join(OUT_DIR, `%2Fnodes%2F${id}.html`), html, 'utf8');
    n++;
  }
  console.log(`[gen-annotations] wrote ${n} annotation snippets to ${OUT_DIR}`);
}
main();
