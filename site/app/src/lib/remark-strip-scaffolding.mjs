// Keep the internal grade vocabulary out of the reader's view (§IV.16 /
// CLAUDE.md rule b). Node/chapter bodies carry authoring scaffolding: a leading
// standing blockquote ("> **WELD** · map node …"), a duplicate leading H1,
// bracketed grade tags on headings ("## Documented core [WELD]"), whole-italic
// stub guidance, and the empty headings those removals leave behind. Strip all
// of it at build time; the source files stay in the internal vocabulary.

const GRADE_WORDS = [
  'WELD-verified', 'WELD-parallel', 'WELD',
  'HYPOTHESIS-fenced', 'HYPOTHESIS',
  'FICTION-ALERT', 'DISCARD', 'FRAME', 'PRINCIPLE',
];
const STANDING_RE = new RegExp(`^\\s*(?:${GRADE_WORDS.join('|')})\\b.*map node`, 'i');
const BRACKET_RE = new RegExp(`\\s*\\[(?:${GRADE_WORDS.join('|')})\\]`, 'g');

function textOf(node) {
  if (node.value) return node.value;
  if (node.children) return node.children.map(textOf).join('');
  return '';
}
function stripBrackets(node) {
  if (node.type === 'text' && typeof node.value === 'string')
    node.value = node.value.replace(BRACKET_RE, '');
  if (node.children) node.children.forEach(stripBrackets);
}
function isScaffoldingParagraph(node) {
  return node.type === 'paragraph' && node.children?.length === 1 && node.children[0].type === 'emphasis';
}
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
    const firstIdx = tree.children.findIndex((n) => n.type !== 'yaml' && n.type !== 'toml');
    if (firstIdx !== -1) {
      const first = tree.children[firstIdx];
      if (first.type === 'heading' && first.depth === 1) tree.children.splice(firstIdx, 1);
    }
    tree.children = tree.children.filter(
      (n) => !(n.type === 'blockquote' && STANDING_RE.test(textOf(n).trim())),
    );
    tree.children = tree.children.filter((n) => !isScaffoldingParagraph(n));
    let prev;
    do {
      prev = tree.children.length;
      tree.children = pruneEmptyHeadings(tree.children);
    } while (tree.children.length !== prev);
    tree.children.forEach(stripBrackets);
  };
}
