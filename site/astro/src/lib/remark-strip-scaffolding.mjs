// ---------------------------------------------------------------------------
// remark plugin — keep the internal grade vocabulary out of the reader's view
// (§IV.16 "the reader never sees WELD/HYPOTHESIS/FICTION-ALERT").
//
// Node/chapter source bodies carry authoring scaffolding: a leading standing
// blockquote ("> **WELD** · map node Cap.0 · …") that duplicates the derived
// metadata line, and bracketed grade tags on headings ("## Documented core
// [WELD]"). We strip both at build time so the source files stay in the
// internal vocabulary while the rendered page shows only plain language.
//
// Zero external deps: a manual mdast walk (avoids pinning unist-util-visit).
// ---------------------------------------------------------------------------

const GRADE_WORDS = [
  'WELD-verified', 'WELD-parallel', 'WELD',
  'HYPOTHESIS-fenced', 'HYPOTHESIS',
  'FICTION-ALERT', 'DISCARD', 'FRAME', 'PRINCIPLE',
];

// A leading blockquote is "standing scaffolding" if its text opens with a grade
// word and mentions the map node — e.g. "WELD · map node Cap.0 · the deepest layer".
const STANDING_RE = new RegExp(`^\\s*(?:${GRADE_WORDS.join('|')})\\b.*map node`, 'i');

// Bracketed grade tags to remove from any text: " [WELD]", "[HYPOTHESIS]", …
const BRACKET_RE = new RegExp(`\\s*\\[(?:${GRADE_WORDS.join('|')})\\]`, 'g');

function textOf(node) {
  if (node.value) return node.value;
  if (node.children) return node.children.map(textOf).join('');
  return '';
}

function stripBrackets(node) {
  if (node.type === 'text' && typeof node.value === 'string') {
    node.value = node.value.replace(BRACKET_RE, '');
  }
  if (node.children) node.children.forEach(stripBrackets);
}

// A stub-template guidance note is a paragraph whose entire content is one
// emphasis (italic) run — the repo authors all scaffolding instructions that
// way ("_STUB — expand from…_", "_HYPOTHESIS and FICTION-ALERT items…_"). Real
// prose italicises words inline, not whole paragraphs, so this is safe.
function isScaffoldingParagraph(node) {
  return (
    node.type === 'paragraph' &&
    node.children?.length === 1 &&
    node.children[0].type === 'emphasis'
  );
}

// Remove headings left empty after scaffolding is stripped. A heading is empty
// when the next top-level node is a heading of equal-or-shallower depth (or the
// document ends) — i.e. it has no body and no subsections of its own.
function pruneEmptyHeadings(children) {
  return children.filter((node, i) => {
    if (node.type !== 'heading') return true;
    const next = children[i + 1];
    if (!next) return false;
    if (next.type === 'heading' && next.depth <= node.depth) return false;
    return true;
  });
}

export default function remarkStripScaffolding() {
  return (tree) => {
    if (!tree.children) return;
    // Drop the leading H1 — the page shell renders the title from frontmatter,
    // so the body's own top-level heading is a duplicate.
    const firstIdx = tree.children.findIndex((n) => n.type !== 'yaml' && n.type !== 'toml');
    if (firstIdx !== -1) {
      const first = tree.children[firstIdx];
      if (first.type === 'heading' && first.depth === 1) tree.children.splice(firstIdx, 1);
    }
    // Drop the standing blockquote wherever it sits (it follows the H1, not at
    // index 0). The pattern is unique to authoring scaffolding, so removing any
    // matching top-level blockquote is safe.
    tree.children = tree.children.filter(
      (node) => !(node.type === 'blockquote' && STANDING_RE.test(textOf(node).trim())),
    );
    // Drop whole-italic stub guidance paragraphs.
    tree.children = tree.children.filter((n) => !isScaffoldingParagraph(n));
    // Collapse section headings left empty by the removals above (iterate until
    // stable so consecutive empty sections all clear).
    let prev;
    do {
      prev = tree.children.length;
      tree.children = pruneEmptyHeadings(tree.children);
    } while (tree.children.length !== prev);
    // Strip bracketed grade tags from remaining content.
    tree.children.forEach(stripBrackets);
  };
}
