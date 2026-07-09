# The Managed Child — site (Astro)

The Gwern-parity reading environment. Authoritative spec: [`../PARITY-BUILD-SPEC.md`](../PARITY-BUILD-SPEC.md).
Aesthetic brief: [`../DESIGN.md`](../DESIGN.md).

The repo root is the CMS — this project only renders it:

- `data/nodes/**` → one page per node at `/nodes/<id>`
- `book/chapters/**` → one page per chapter at `/book/<slug>`
- `essays/**` → (wired in a later milestone)

## Commands

```sh
npm install       # from site/astro/
npm run dev       # local dev server
npm run build     # static build → dist/
npm run preview   # serve the build
npm run check     # astro + TypeScript diagnostics
```

## Governing principles (do not regress)

- **Zero client JS to read.** The core reading experience works with JavaScript
  disabled; JS only *enhances* (theme/reader toggles now; pop-frames later).
  The control bar hides itself when JS is off rather than showing dead buttons.
- **Visible validity, plain words (§IV.16).** The reader never sees the internal
  grade vocabulary (WELD / HYPOTHESIS / FICTION-ALERT). `src/lib/certainty.ts`
  derives a plain certainty word — *documented · possible · apocryphal* — and
  `src/lib/remark-strip-scaffolding.mjs` keeps the vocabulary out of body prose.
- **Monochrome + one indigo accent.** No colour-coded grade badges anywhere.

## Milestone status

- **M0 — Skeleton (done).** Content collections; node + chapter + index pages;
  the type system, dark mode (OS-aware, no-flash), reader mode, control bar,
  print CSS; JS-off readable; self-hosted fonts.
- **M1+** — event bus + transclusion, pop-frames, annotations, sidenotes,
  backlinks/similar, search/archive, graph + set-pieces. See spec Part VI.

## Layout

```
src/
  content.config.ts    # collections + zod schema over the repo's frontmatter
  layouts/Reading.astro # masthead / sheet / footer / control bar shell
  components/MetadataLine.astro
  lib/certainty.ts     # grade → plain certainty word (the signature)
  lib/remark-strip-scaffolding.mjs  # keeps internal vocab out of the reader UI
  pages/index.astro    # annotated bibliography, grouped by category
  pages/nodes/[id].astro
  pages/book/[slug].astro
  styles/tokens.css    # palette + type tokens, light/dark
  styles/global.css    # reading surface + print CSS
```
