# The Managed Child — app (Gwern fork)

The reading environment, built on a **fork of Gwern's frontend**
(`../vendor/gwern/`, see [`../FORK-PLAN.md`](../FORK-PLAN.md) and
[`../CREDITS.md`](../CREDITS.md)). Astro renders the repo's content
(`data/nodes/**`, `book/chapters/**`) into HTML that conforms to Gwern's class
contract; the vendored `js/css/font` provide the pop-frames, transclusion, and
sidenotes at runtime.

## Commands

```sh
npm install
npm run dev       # sync vendor + gen annotations, then astro dev
npm run build     # → dist/  (static)
npm run preview   # serve dist/
npm run check     # astro + TypeScript
```

`prebuild-assets` (run by dev/build) does two things before Astro:
- **`sync-vendor`** copies `../vendor/gwern/{js,css,font,img}` into
  `public/static/` under the runtime filenames the layout loads (`head.js`,
  `script.js`, `head.css`, `style.css`). `public/static/` is gitignored —
  regenerated from the vendored source of truth.
- **`gen-annotations`** writes `/metadata/annotation/%2Fnodes%2F<id>.html`
  snippets from node frontmatter (the concise cards popups transclude), with the
  plain certainty word derived from `grade`. Also gitignored.

## How it maps to Gwern's contract

- `layouts/GwernShell.astro` injects Gwern's `inlined-head.html` verbatim and
  builds the `<main>` / `<article>` / `#markdownBody` skeleton the runtime needs.
- `lib/remark-strip-scaffolding.mjs` keeps the internal grade vocabulary out of
  the rendered body (CLAUDE.md rule b).
- `lib/remark-autolink-nodes.mjs` turns backtick node-ids in prose into
  `link-annotated` inter-node links (which pop the annotation card).
- `lib/rehype-source-footnotes.mjs` turns `sources` into Pandoc footnotes →
  margin sidenotes.
- `lib/certainty.ts` + `scripts/gen-annotations.mjs` derive the signature word.

Do not restyle yet — this pass keeps Gwern's default look (DECISIONS.md S-11).

## Status

M-fork Step 4–5 complete (popups, sidenotes, transclusion, annotations with the
certainty signature). Deploy risk: annotation `%2F` paths on Netlify — see
`../FORK-PLAN.md`.
