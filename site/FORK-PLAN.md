# SITE — FORK PLAN (Gwern frontend fork)

*Authoritative build spec: [`PARITY-BUILD-SPEC.md`](PARITY-BUILD-SPEC.md). Decision: [`../DECISIONS.md`](../DECISIONS.md) S-11. Guardrails: [`../CLAUDE.md`](../CLAUDE.md).*

## The decision

The reading UI is a **fork of Gwern's open-source frontend** (gwern.net is CC-0,
or MIT where CC-0 is problematic), not a from-scratch build. We vendor his
runtime (`js/ css/ font/ include/ template/`) into `site/vendor/gwern/` and make
**our build emit HTML that satisfies his class contract**. His build-time backend
(Haskell/Hakyll, nginx, `asset.php`, Python/Shell) is **not** copied — **Astro +
Node build scripts** replace it (spec §III.A, §IV.2).

**Route B** (Cytoscape / d3-force for the graph; Scrollama / D3 / GSAP for the
two scroll set-pieces) is kept **only** for those bespoke surfaces, which reuse
the forked pop-frame for shared interactions.

## What we fork vs. replace

| Gwern dir | Action | Why |
|---|---|---|
| `js/` | **fork** → `site/vendor/gwern/js/` | the pop-frame / transclude / sidenote / rewrite runtime |
| `css/` | **fork** → `site/vendor/gwern/css/` | the class contract's styling (default look, kept for now) |
| `font/` | **fork** → `site/vendor/gwern/font/` | self-hosted fonts the CSS/link-icons depend on |
| `include/` | **fork** → `site/vendor/gwern/include/` | inlined head/JS includes the templates reference |
| `template/` | **fork** → `site/vendor/gwern/template/` | the HTML skeleton + annotation/snippet shells we must mirror |
| `build/` (Haskell) | **replace** with Astro | SSG + routing + templating |
| `nginx/`, `asset.php` | **replace** | Astro/host does serving + bundling |
| Python / Shell | **replace** with Node scripts | annotations, backlinks, embeddings, adjacency |

Provenance recorded in [`CREDITS.md`](CREDITS.md); all upstream licence headers preserved.

## Build order for this pass (one working page)

1. Start the site app fresh (discard the from-scratch M0 reading UI).
2. Fork `js/ css/ font/ include/ template/` into `site/vendor/gwern/`.
3. **Learn the HTML contract** from `template/` + key JS → write it below.
4. Stand up **one node page + one chapter page** in Astro that load Gwern's
   CSS+JS and match the contract. Success = popups/popins, sidenotes, and
   transclusion actually work, at Gwern's default look (no restyle yet).
5. Emit `/annotations/<id>.html` snippets from node frontmatter; derive the
   plain certainty word from `grade` (documented/possible/apocryphal — never a
   badge) so link popups transclude the real entry.
6. Deploy a preview; share the URL.

Fallback: if the contract proves too fiddly to satisfy in this pass, stop and
fall back to the clean-room `reference-implementation.html`.

---

## STATUS (this pass)

- **Steps 0–3 done.** Decision recorded (DECISIONS.md S-11, CLAUDE.md); fork
  vendored (`site/vendor/gwern/`, commit `b1f6ebf`); HTML contract learned (below).
- **Step 4 done — one working page.** The Astro app (`site/app/`) renders nodes,
  chapters, and an index into Gwern-contract HTML loading the forked CSS+JS.
  Verified in a real browser (Gwern's default look, no restyle):
  - **Link popups** — hovering an inter-node link spawns a transcluded pop-frame.
  - **Sidenotes** — node `sources` become footnotes that reflow into margin
    sidenotes above the 1761px breakpoint (endnotes below — Gwern's own behavior).
  - **Inline transclusion** — chapters embed their `draws_on` nodes recursively
    (the embedded node keeps its own links, edges, and pop-frames).
- **Step 5 done — real annotations.** `/metadata/annotation/%2Fnodes%2F<id>.html`
  snippets generated from frontmatter; inter-node links marked `link-annotated`
  pop a concise card showing the plain **certainty word** (derived from `grade`)
  + dates + map + abstract. Verified: popup shows "documented · 1904 · map Seed"
  + abstract.
- **Integration fixes required by the contract** (all in `site/app`, none in the
  vendored fork): inject Gwern's full `inlined-head.html` (the dark
  `#inlined-styles-colors-dark` block is mandatory — DarkMode.currentMode()
  reads its `.media`); add the `page-body-classes` + complete `og:image` +
  `gwern:thumbnail:css-classes` metas the content-extractor requires; emit
  footnotes with the strict `fn<N>`/`fnref<N>` ids Notes needs.
- **Known risk — Step 6 deploy.** The annotation path uses `%2F`-encoded
  filenames; Netlify's CDN may 404 encoded slashes. The local-page transclusion
  popups do not depend on this and work on any static host. Verify on the
  deployed preview; if broken, add redirects or fall back to page-transclusion
  popups.

## THE HTML CONTRACT (learned in Step 3 from the fork)

Read from `template/default.html`, `template/pandoc/`, `include/*.html`, and
`js/{initial,rewrite,extracts,extracts-content,annotations,content,transclude,
sidenotes}.js` at commit `b1f6ebf`.

### 1. Page skeleton (what our HTML must produce)

```html
<html lang="en-us">
<head>
  … meta …
  <style id="inlined-styles-colors"> …GW color vars… </style>   <!-- required: from include/inlined-standalone.html -->
  <link rel="stylesheet" href="/static/css/head.css">
  <link rel="stylesheet" href="/static/css/style.css">
  <script src="/static/js/head.js"></script>   <!-- SYNCHRONOUS, in <head> (bootstraps GW) -->
</head>
<body class="…page-body-classes…">
  <main>                                        <!-- becomes document.main -->
    <a id="skip-to-content-link" href="#markdownBody">Skip to main content</a>
    <!-- optional #navbar -->
    <article>
      <header><h1>$title$</h1></header>
      <div class="markdownBody" id="page-metadata"> …metadata line… </div>
      <div class="markdownBody" id="markdownBody"> $body$ </div>   <!-- THE content container -->
    </article>
  </main>
  <script src="/static/js/script.js" defer></script>   <!-- main runtime bundle, deferred -->
</body>
```

- `head.js` = `vendor/gwern/js/head-GENERATED.js`; `script.js` = `js/script-GENERATED.js`.
- `head.css` = `css/head-GENERATED.css`; `style.css` = `css/style-GENERATED.css`
  (self-contained, no `@import`; `style.css` also carries all `@font-face`).
- The inline `#inlined-styles-colors` block (light-mode `--GW-*` vars) is required;
  it comes verbatim from `include/inlined-standalone.html` (lines 1–345).

### 2. Bootstrap + content-inject lifecycle

- `head.js` defines the `GW` global, `GW.notificationCenter`, `GWLog`, and
  `document.main` (via `doWhenMainExists`, so a `<main>` element is mandatory).
- On `DOMContentLoaded`, `initial.js` fires **`GW.contentDidLoad`** then
  **`GW.contentDidInject`** with `{ container: document.main, document, loadLocation, flags }`.
- Handlers registered by `script.js` (rewrite → bind extracts/pop-frames →
  build sidenotes → run transcludes) run **scoped to `container`**; most gate on
  `info.container == document.main` for the first pass. Any later injection
  (a transclude) fires the same events on its own container → recursive, composable.

### 3. What makes an element pop / transclude

- **Local-page links (no class needed):** a same-host `<a href="/nodes/x">` whose
  pathname has no `.` auto-pops, transcluding the target page's `#markdownBody`
  (`content.js` `localPage.matches` + `extracts-content.js` `isLocalPageLink`).
  → **This is our cheapest parity win: inter-node links just work.** Requires
  clean, extensionless, dot-free URLs (Astro `build.format: 'directory'`).
- **Footnotes → sidenotes:** Pandoc footnotes (`a.footnote-ref` + `section.footnotes`)
  are reflowed into margin sidenotes on wide viewports by `sidenotes.js`
  (footnote-popups on mobile). We render node `sources` as footnotes so the
  margin carries the receipts (DESIGN.md §3).
- **Explicit transclusion:** `<a class="include" href="/nodes/x">` transcludes the
  target inline on load; `<a class="include-annotation" …>` transcludes its
  annotation snippet. (`transclude.js`.)
- **Annotated links (Step 5):** `<a class="link-annotated" href="/nodes/x">` pops a
  rich annotation transcluded from
  `/metadata/annotation/` + `enc(enc(pathname+hash))` + `.html`
  (`annotations.js` `sourceURLForLink` / `targetIdentifier`; double
  `encodeURIComponent`). For `/nodes/the-root` → `/metadata/annotation/%252Fnodes%252Fthe-root.html`.

### 4. Assets (absolute `/static/…`)

`/static/js/{head,script}.js`, `/static/css/{head,style}.css`, `/static/font/**`
(otf/ttf, `?v=` query ignored), `/static/img/icon/icons.svg` (link-icons). Served
from the Astro `public/static/` tree, synced from `vendor/gwern/` at prebuild.
Excluded `font/dropcap/**` 404s harmlessly (affects only image-dropcaps).

### 5. The signature, inside the contract

Gwern's own `page-confidence` field ("certainty: possible") IS the slot for our
signature. We fill it with the plain word derived from `grade`
(documented/possible/apocryphal) — monochrome, no badge — satisfying both the
Gwern contract and CLAUDE.md rule (b).
