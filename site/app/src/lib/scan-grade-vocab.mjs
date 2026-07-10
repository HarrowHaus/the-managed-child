// Build-time guardrail for CLAUDE.md rule (b): the internal grade vocabulary
// (WELD / HYPOTHESIS / FICTION-ALERT / DISCARD / FRAME / PRINCIPLE) is
// build-scaffolding the reader must NEVER see. remark-strip-scaffolding removes
// the *designated* patterns (standing blockquote, [WELD] bracket tags on
// headings, whole-italic stubs) but cannot catch a grade word written inline in
// prose. This scanner is the backstop: it reads the *rendered visible text* of
// every built page and fails the build if any grade token survives to the
// reader. Content discipline stays the first line of defence; this makes it a
// guarantee rather than a habit.
//
// Scope is deliberately narrow to avoid false positives on ordinary English:
//   - The six grade labels are matched ONLY in ALL-CAPS token form. Lowercase
//     "principle", "frame", "discard" are normal words and are NOT flagged;
//     Title-case "Discarded", "Frame" likewise pass. Only the internal label
//     form (all-caps) is a leak.
//   - "weld" is the one word banned in prose in ANY lowercase form, because it
//     is pure pipeline jargon here ("a documented social weld"); the all-caps
//     WELD is covered by the label rule. (Title-case "Weld" — e.g. a surname —
//     is left alone.)
//
// Anything a page legitimately needs is added to ALLOW below, narrowly and with
// a reason. Today the corpus is clean, so ALLOW is empty.

import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── explicit whitelist ───────────────────────────────────────────────────────
// Each entry exempts ONE known-legitimate occurrence, pinned narrowly so it
// cannot mask a future real leak: `page` is a suffix of the page's site path,
// `token` is the exact matched string, and `context` (required) is a phrase that
// must appear in the surrounding text for the exemption to apply. `reason`
// documents why it is allowed.
//
// The only legitimate collisions in this corpus are the ordinary English VERB
// "to weld" (join firmly) — e.g. "the child and the elect, welded inside one
// document" — which is house-voice prose, not the grade-jargon noun ("a weld").
const ALLOW = [
  { page: '/essays/two-testimonies/', token: 'welded', context: 'welded inside one document', reason: 'English verb "to weld" (join) in the gold essay; not grade jargon' },
  { page: '/nodes/crowley-aleister/', token: 'welded', context: 'welded inside one document', reason: 'English verb "to weld" (join); not grade jargon' },
  { page: '/nodes/four-idiom-through-line/', token: 'welded', context: 'are welded inside the same 1904 document', reason: 'English verb "to weld" (join); not grade jargon' },
  { page: '/metadata/annotation/%2Fnodes%2Fcrowley-aleister.html', token: 'welds', context: 'welds the elect to the many', reason: 'English verb "to weld" (join); not grade jargon' },
];

// ── token patterns ───────────────────────────────────────────────────────────
// All-caps grade labels (case-sensitive). FICTION-ALERT carries a hyphen.
const LABELS = /\b(?:WELD|HYPOTHESIS|FICTION-ALERT|DISCARD|FRAME|PRINCIPLE)\b/g;
// "weld" jargon in lowercase prose form (case-sensitive; all-caps WELD is a LABEL).
const WELD_JARGON = /\bweld(?:s|ed|ing)?\b/g;

/** Strip scripts/styles/comments/tags → the text a reader actually sees. */
function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function isAllowed(pagePath, token, context) {
  return ALLOW.some(
    (a) => pagePath.endsWith(a.page) && a.token === token && (!a.context || context.includes(a.context)),
  );
}

function contextAround(text, index, len) {
  const start = Math.max(0, index - 45);
  const end = Math.min(text.length, index + len + 45);
  return text.slice(start, end).replace(/\s+/g, ' ').trim();
}

function scanText(text, pagePath, findings) {
  for (const re of [LABELS, WELD_JARGON]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      const token = m[0];
      const context = contextAround(text, m.index, token.length);
      if (isAllowed(pagePath, token, context)) continue;
      findings.push({ page: pagePath, token, context });
    }
  }
}

async function* htmlFiles(rootDir) {
  for (const entry of await readdir(rootDir, { withFileTypes: true })) {
    const full = join(rootDir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) yield full;
  }
}

/**
 * Scan every built .html page under `distDir` for leaked grade vocabulary in
 * visible text. Returns an array of { page, token, context } findings (empty =
 * clean). Does not throw.
 */
export async function scanGradeVocab(distDir) {
  const rootPath = distDir instanceof URL ? fileURLToPath(distDir) : distDir;
  const findings = [];
  for await (const file of htmlFiles(rootPath)) {
    const pagePath = '/' + relative(rootPath, file).replace(/index\.html$/, '').replace(/\\/g, '/');
    scanText(visibleText(readFileSync(file, 'utf8')), pagePath, findings);
  }
  return findings;
}

/** Format findings into a human-readable, actionable error block. */
export function formatFindings(findings) {
  const lines = [
    `Grade vocabulary leaked into ${findings.length} place(s) of rendered visible text.`,
    `The reader must never see WELD/HYPOTHESIS/FICTION-ALERT/DISCARD/FRAME/PRINCIPLE`,
    `(or lowercase "weld") — CLAUDE.md rule (b). Rewrite the source prose to the`,
    `plain-word claim-limit ("held open", "not asserted", "documented"), or, if`,
    `genuinely legitimate, add a narrow entry to ALLOW in src/lib/scan-grade-vocab.mjs.`,
    '',
  ];
  for (const f of findings) {
    lines.push(`  ✗ ${f.page}  [${f.token}]`);
    lines.push(`      …${f.context}…`);
  }
  return lines.join('\n');
}
