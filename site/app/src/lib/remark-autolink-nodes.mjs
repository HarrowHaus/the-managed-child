// Auto-linkify explicit node-id references in prose (spec §IV.2 step 7). Node
// bodies cite other nodes as backtick code (`managed-child`). Convert any inline
// code whose value is a known node id into a real inter-node link. These get
// clean, dot-free, trailing-slash hrefs (/nodes/<id>/) and the `link-page` class,
// so Gwern's frontend pops them as WHOLE-PAGE transclusions (CLAUDE.md rule d) —
// via Content.contentTypes.localPage, not the fragile %2F annotation fetch. The
// trailing slash matches the directory-format route and avoids a 308 redirect on
// the transclusion fetch. Gated to exact id matches only, so no false links.
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
            url: `/nodes/${id}/`,
            title: null,
            // link-page → whole-page local transclusion (rule d), stacks recursively.
            data: { hProperties: { className: ['link-page'] } },
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
