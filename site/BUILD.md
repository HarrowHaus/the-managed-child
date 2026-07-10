# SITE — build plan (Tier 3)
> **Superseded in detail by [`PARITY-BUILD-SPEC.md`](PARITY-BUILD-SPEC.md).** That document is the authoritative, executor-ready backend+frontend spec (module-by-module Gwern audit, subsystem specs, schemas, milestones M0–M7, acceptance criteria). This file is now the **one-page orientation**; when the two differ, the spec wins.

*Design brief (aesthetic): [`DESIGN.md`](DESIGN.md). Gwern feature audit: [`GWERN-AUDIT.md`](GWERN-AUDIT.md). Working reference implementation of the signature: [`reference-implementation.html`](reference-implementation.html).*

---

## The corrected target in one paragraph
The site is a **Gwern-parity reading environment**, not a CMS blog. The governing principle: **transclusion is everything, and JavaScript is optional** — the core reading experience must work with JS off; JS only enhances. Every rich feature (popups/popins, backlinks, similar-links, annotations, collapses) is one mechanism — transclusion — pointed a different way. The signature is **visible validity in plain words** (*documented · possible · apocryphal*), hoverable, monochrome — **never gold badges**.

## Stack (corrected)
- **SSG:** **Astro** (reads our Markdown+YAML natively; ships zero JS by default; islands for the graph + set-pieces). Eleventy is the fallback.
- **Frontend (where parity lives):** a pop-frame + transclusion + sidenote system with a pub/sub content-inject event bus.
  - **Route A (recommended for the core):** adapt Gwern's open-source modules (`transclude.js`, `extracts.js`, `popups.js`, `popins.js`, `sidenotes.js`, `rewrite.js`; CC-0/MIT) and conform our generated HTML to their class contract.
  - **Route B (clean-room):** build our own small framework; the seed is [`reference-implementation.html`](reference-implementation.html), which already does recursive popins, stacking, certainty words, and the control bar.
  - Use **B** for the project-specific surfaces (graph explorer, scroll set-pieces) where Gwern has nothing to copy.
- **Content source:** `data/nodes/**` (reference), `book/chapters/**` (spine), `essays/**` (leaves) — the files are the CMS.
- **Build scripts (replace the Haskell backend):** emit annotation snippets, backlinks (invert `welds`/`hypotheses`), similar-links (embeddings), `data/edges/adjacency.json`, and link-icons. See spec §IV.2.
- **Search:** Pagefind (static). **Host:** Netlify or Vercel (connectors); deploy on push.

## The three surfaces, cross-linked
1. **Reference (browse):** every node a page; **certainty word visible + hoverable** (plain language, per §IV.16); filter by rail, register, certainty.
2. **Argument (read):** book chapters, each transcluding/linking the nodes they draw on.
3. **Essays (about the work):** essays on the thesis/lineage/method, each claim linking back to its grounding node (receipts one hover away). *(The "Ask About Illuminati" media decodes are parked in `essays/_parked-decodes/`, out of the build — DECISIONS.md S-12.)*

## Signature interactions (corrected)
- **Popups/popins (the real feature)** — hover (desktop) or tap (mobile) any link → the whole target **transcludes** into a panel; links inside stack recursively. Built as pop-frames, **not** tooltips. (Spec §IV.5.)
- **Visible validity** — certainty as a plain italic word + hover definition (Spec §IV.16). No colour-coded grades.
- **Sidenotes** — margin on wide screens; footnote↔sidenote reflow at the breakpoint; footnote-popins on mobile. (Spec §IV.7.)
- **Backlinks + similar-links** transcluded at the foot ("just keep reading"). (Spec §IV.8–9.)
- **Lifespan continuum** and **four-idiom through-line** — the two scroll set-pieces (Spec §IV.14).
- **Live hypothesis-density** — Phase-2 query as a heat layer over the graph.

## Build order (see spec Part VI for DoD per milestone)
M0 skeleton · M1 event-bus + transclusion · M2 pop-frames · M3 annotations + certainty signature · M4 sidenotes · M5 backlinks + similar · M6 reader/search/archive/print → **parity** · M7 graph + set-pieces.

## DoD
Parity checklist in `PARITY-BUILD-SPEC.md` Part VII passes; core readable with JS disabled; every essay claim links to its node; certainty visible as plain words; the two set-pieces live with static fallbacks.
