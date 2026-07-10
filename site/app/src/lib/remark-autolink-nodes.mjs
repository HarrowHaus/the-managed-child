// Auto-linkify explicit node-id references in prose (spec §IV.2 step 7). Node
// bodies cite other nodes as backtick code (`managed-child`). Convert any inline
// code whose value is a known node id into a real inter-node link. These get
// clean, dot-free hrefs (/nodes/<id>), so Gwern's frontend auto-pops them as
// transclusions — no class needed. Gated to exact id matches only (no fuzzy
// matching), so it cannot create false links.
import { nodeIndex } from './node-index.mjs';

export default function remarkAutolinkNodes() {
  const index = nodeIndex();
  return (tree) => {
    const visit = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'inlineCode' && index.has(child.value.trim())) {
          const id = child.value.trim();
          return {
            type: 'link',
            url: `/nodes/${id}`,
            title: null,
            // link-annotated → pops the concise annotation snippet
            // (/metadata/annotation/…) rather than transcluding the whole page.
            data: { hProperties: { className: ['link-annotated'] } },
            children: [{ type: 'text', value: index.get(id).title }],
          };
        }
        return child;
      });
      node.children.forEach(visit);
    };
    visit(tree);
  };
}
