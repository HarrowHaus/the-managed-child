// Rewrite essay links that point at node SOURCE paths
// (e.g. `../data/nodes/concepts/the-root.md`) to the site's node ROUTES
// (`/nodes/the-root/`), and mark them `link-page` so they pop the whole node as a
// local-page transclusion (CLAUDE.md rule d) — the "receipts one hover away" the
// voice wall allows (CONVENTIONS §8), via Content.contentTypes.localPage rather
// than the fragile %2F annotation fetch. Trailing slash avoids a 308 on the fetch.
//
// Runs as a rehype pass (hast). Only rewrites links whose target node actually
// exists (via the node index); anything else is left untouched.
import { nodeIndex } from './node-index.mjs';

const NODE_PATH = /^(?:\.\.\/)*data\/nodes\/[^/]+\/([a-z0-9-]+)\.md(#[^)]*)?$/i;

export default function rehypeEssayNodeLinks() {
  const index = nodeIndex();
  // Visit with parent awareness so a link to an UNROUTED node can be unwrapped
  // to plain text (No-Stubs Law: an unrouted node never renders as a link, and a
  // dead .md href must never survive to the reader).
  const visit = (node, parent, i) => {
    if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
      const m = String(node.properties.href).match(NODE_PATH);
      if (m && index.has(m[1])) {
        if (index.get(m[1]).routed === false) {
          // Replace the <a> with its children — the phrase stays, the link goes.
          if (parent && Array.isArray(parent.children) && typeof i === 'number') {
            parent.children.splice(i, 1, ...(node.children ?? []));
            return; // children already re-parented; don't recurse into the removed node
          }
        } else {
          node.properties.href = `/nodes/${m[1]}/${m[2] ?? ''}`;
          const cls = node.properties.className ?? [];
          node.properties.className = Array.isArray(cls) ? [...cls, 'link-page'] : [cls, 'link-page'];
        }
      }
    }
    if (node.children) for (let j = 0; j < node.children.length; j++) visit(node.children[j], node, j);
  };
  return (tree) => visit(tree, null, null);
}
