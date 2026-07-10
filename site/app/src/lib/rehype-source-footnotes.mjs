// Turn a node's `sources` frontmatter into real Pandoc-style footnotes, so the
// forked sidenotes.js reflows them into the margin (DESIGN.md §3: "grades and
// sources live in the margin"). Reference markers are appended to the first body
// paragraph; the footnotes section is appended at the end of #markdownBody.
//
// Runs as a rehype plugin (hast) with access to the page frontmatter via
// file.data.astro.frontmatter. Only nodes with sources get footnotes; chapters
// and source-less nodes are untouched.

function stripSourceTag(s) {
  // Drop a trailing quality tag "… — [PRIMARY]" — that is internal apparatus.
  return s.replace(/\s*—\s*\[[^\]]+\]\s*$/, '').trim();
}

export default function rehypeSourceFootnotes() {
  return (tree, file) => {
    const fm = file?.data?.astro?.frontmatter;
    const sources = fm?.sources;
    if (!Array.isArray(sources) || sources.length === 0) return;

    // Gwern's Notes requires the strict Pandoc id format: refs `#fn<N>` /
    // id `fnref<N>`, notes id `fn<N>` — digits only (Notes.hashForCitationRegexp
    // = /^#fnref[0-9]+$/). Non-matching ids yield an empty sidenote. Collisions
    // across pages don't matter (pages are separate); on transclusion Gwern's
    // transclude.js renumbers footnotes to keep them unique.
    const firstP = tree.children.find((n) => n.type === 'element' && n.tagName === 'p');
    if (!firstP) return;

    sources.forEach((_src, i) => {
      const n = i + 1;
      firstP.children.push({
        type: 'element',
        tagName: 'a',
        properties: {
          href: `#fn${n}`,
          id: `fnref${n}`,
          className: ['footnote-ref'],
          role: 'doc-noteref',
        },
        children: [{ type: 'element', tagName: 'sup', properties: {}, children: [{ type: 'text', value: String(n) }] }],
      });
    });

    const items = sources.map((src, i) => {
      const n = i + 1;
      return {
        type: 'element',
        tagName: 'li',
        properties: { id: `fn${n}`, role: 'doc-endnote' },
        children: [{
          type: 'element',
          tagName: 'p',
          properties: {},
          children: [
            { type: 'text', value: stripSourceTag(src) + ' ' },
            {
              type: 'element',
              tagName: 'a',
              properties: { href: `#fnref${n}`, className: ['footnote-back'], role: 'doc-backlink' },
              children: [{ type: 'text', value: '↩︎' }],
            },
          ],
        }],
      };
    });

    tree.children.push({
      type: 'element',
      tagName: 'section',
      properties: { id: 'footnotes', className: ['footnotes', 'footnotes-end-of-document'], role: 'doc-endnotes' },
      children: [
        { type: 'element', tagName: 'hr', properties: {}, children: [] },
        { type: 'element', tagName: 'ol', properties: {}, children: items },
      ],
    });
  };
}
