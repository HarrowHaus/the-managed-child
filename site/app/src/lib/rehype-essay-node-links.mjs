// Rewrite essay links that point at node SOURCE paths
// (e.g. `../data/nodes/concepts/the-root.md`) to the site's node ROUTES
// (`/nodes/the-root`), and mark them `link-annotated` so they pop the concise
// annotation card — the "receipts one hover away" the voice wall allows
// (CONVENTIONS §8): the prose reads clean, the grounding node is one hover away.
//
// Runs as a rehype pass (hast). Only rewrites links whose target node actually
// exists (via the node index); anything else is left untouched.
import { nodeIndex } from './node-index.mjs';

const NODE_PATH = /^(?:\.\.\/)*data\/nodes\/[^/]+\/([a-z0-9-]+)\.md(#[^)]*)?$/i;

export default function rehypeEssayNodeLinks() {
  const index = nodeIndex();
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
      const m = String(node.properties.href).match(NODE_PATH);
      if (m && index.has(m[1])) {
        node.properties.href = `/nodes/${m[1]}${m[2] ?? ''}`;
        const cls = node.properties.className ?? [];
        node.properties.className = Array.isArray(cls) ? [...cls, 'link-annotated'] : [cls, 'link-annotated'];
      }
    }
    node.children?.forEach(visit);
  };
  return (tree) => visit(tree);
}
