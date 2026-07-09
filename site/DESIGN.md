# SITE — design brief
> **Build authority:** the engineering stack + subsystem specs live in [`PARITY-BUILD-SPEC.md`](PARITY-BUILD-SPEC.md); the Gwern feature audit in [`GWERN-AUDIT.md`](GWERN-AUDIT.md); a working reference implementation of the signature (popins, certainty words, dark mode) in [`reference-implementation.html`](reference-implementation.html). This file is the **aesthetic** brief only.

*The design half of the site plan (pairs with `site/BUILD.md`). Covers: the study set (real sites to learn from), the aesthetic direction, the design system, the component inventory, the signature move, and an unconstrained tech stack. Principle: choose tools that don't limit the idea; the graph, the grading, and the two set-pieces are the ambition — everything else serves them.*

---

## 1. THE STUDY SET — sites to open, sit with, and steal from
Grouped by what each solves. Visit them; the notes say *what to take.*

### Structural north star — rigor made visible
- **gwern.net** (and `gwern.net/design`, `/sidenote`, `/style-guide`). The most important reference. It already solves our core problem: **epistemic "status" and "confidence/certainty" tags on every page = our grading system.** Take: **sidenotes/margin-notes** (grades and sources live in the margin, not hidden), **hover pop/preview popups** on every link (hover a figure → see the node), **transclusion** (embed a node into a chapter without duplicating it), the **"iceberg" density model** (abstract → detail → footnote → collapse → excerpt), **backlinks**, and a **reader mode**. This is the blueprint for "shows its work."
- **Molly White — "Annotate" / *The Edited Latecomers' Guide to Crypto*.** Side-by-side text + commentary. Take: the **two-column "claim beside its grading"** pattern — perfect for showing a source's assertion next to our [WELD]/[HYPOTHESIS] verdict.

### Aesthetic north star — antiquarian editorial
- **The Public Domain Review** (`publicdomainreview.org`). Curated strangeness from the history of art, literature, and ideas — *exactly our register.* Take: the **editorial calm**, generous imagery from old sources, restrained ornament, the sense that scholarship can be beautiful and a little uncanny. This is the mood "The Gilded Deep" wants on screen.
- **Stripe Press** (`press.stripe.com`). Books rendered as web-objects. Take: **the book as a designed thing** — cover-object treatment, chapter typography, the feeling that a URL can have the gravity of a hardback. Model for the book/essay reading surfaces.

### Interactive north star — scrollytelling (for the two set-pieces)
- **The Pudding** (`pudding.cool`, and its process guides). The model for **the lifespan continuum** and **the four-idiom through-line.** Take: **one visual, transformed as you scroll** (not a slideshow); restraint ("let data carry the weight"); their open-source **scrollama** approach.
- **Josh Worth — "If the Moon Were Only 1 Pixel"** + **"Universe to You."** Scale-and-time scroll journeys. Take: the **age-ladder as a scroll** — one audience aging, the media changing around them; typographic chaptering over heavy video.
- **NYT "Snow Fall"** — the origin; take the *pacing* (let each era breathe), not the maximalism.

### Galleries to browse for ongoing reference
`siteinspire.com` · `godly.website` · `land-book.com` · `awwwards.com` (editorial/serif) · `typewolf.com` (type pairings). Filter for *editorial / serif / dark / archive.*

**Anti-pattern to avoid (named in the research): "the scrollytelling scourge."** Over-animation that fights the content. Rule: **restraint beats spectacle; motion must serve the argument or it's off.**

---

## 2. AESTHETIC DIRECTION — Gwern-parity restraint, faint identity
**Decision (after review): the primary aesthetic is Gwern-parity monochrome calm** — warm near-white, near-black Source Serif body, Source Sans for UI/headers, generous whitespace, minimal ornament. "The Gilded Deep" survives only as a *whisper*: a single restrained ink-accent for links/markers, and an optional deep-indigo **dark mode**. No gold badges, no parchment-and-brass heaviness — the restraint is the point, and it is what makes the epistemics (sidenotes, certainty words, popovers) the visual focus. Original book-object palette below is retained for print/covers, not the reading UI.

### 2a. (print/cover identity only) "The Gilded Deep"
Extend the established book identity (do not invent a new one): **abyssal indigo / prussian blue, antique brass & lure-gold, parchment interior, humanist old-style roman display, Spectral body.** Translate to screen:
- **Dark-first.** Base is an abyssal indigo near-black; reading surfaces can lift to a warm **parchment** panel for long-form (best of both: the deep frame, the readable page).
- **Gold stays on the book-object, not the reading UI.** Lure-gold belongs to the print cover, spine, and frontispiece. On screen the reading surface is Gwern-parity monochrome (see §2); the interaction/validity layer is the **indigo accent + plain certainty words**, never gold badges. *(Corrected per `PARITY-BUILD-SPEC.md` §IV.16 — the signature is visible validity in plain language, not colour-coded grades.)*
- **Ornament, sparingly.** A rule, a dropcap, a smallcap run — antiquarian, not busy. The Public Domain Review's discipline, not a tarot deck's excess.
- Distinct from **Harrow Haus** styling (per project convention).

---

## 3. DESIGN SYSTEM (tokens)
**Type**
- *Display:* a humanist old-style roman with gilt gravity — **EB Garamond** or **Cormorant** (both free, self-hostable). Smallcaps for labels.
- *Body:* **Spectral** (the established body; free, screen-tuned serif). Measure ~62–68ch.
- *Mono (for grades/IDs/code):* **iA Writer Mono** or **JetBrains Mono**.
- *Sidenote/margin:* body at ~0.85em, set in the wide margin (Gwern model).

**Color roles** (fill exact hex during build)
- `--bg` abyssal indigo/near-black · `--surface` parchment (reading) · `--ink` warm off-black on parchment / warm off-white on indigo
- `--accent` **abyssal indigo** (links, active, focus) — the single reading-UI accent (gold is print/cover only)
- **No grade colours.** The signature is *not* a colour-coded badge set. Certainty is rendered as a **plain italic word** in the metadata line — *documented · possible · apocryphal* — monochrome, hoverable for its definition (see §5 and `PARITY-BUILD-SPEC.md` §IV.16). The internal vocabulary (WELD/HYPOTHESIS/FICTION-ALERT) never reaches the reader.

**Space & grid**
- Center reading column + a persistent **wide right (and, on very wide screens, left) margin** for sidenotes/grades. The margin is not decoration — it's where the epistemics live.
- Iceberg density: abstract → body → sidenote → collapsible → transcluded excerpt.

**Motion**
- Smooth scroll (Lenis). Set-piece animations scroll-linked (Scrollama). **Respect `prefers-reduced-motion`** — every set-piece has a static fallback.

---

## 4. COMPONENT INVENTORY
- **Node page** — the reference atom. Renders frontmatter: **certainty word** (plain, derived from `grade` — see schema), dates, `map_node`, **sources list**, and **edges as hover-preview links** (each tagged worked-off vs same-field). Backlinks at the foot.
- **Certainty word + "shows-its-work" pop-frame** — hover/tap any claim → certainty (plain) + source + register, transcluded. *The signature interaction* — built as a popup/popin, not a tooltip (see §4a).
- **Sidenote / margin-note** — grades, sources, and asides in the margin; collapse to tap-popovers on mobile. (Adapt Gwern's `sidenotes.js`, or `littlefoot` for footnote→popover.)
- **Link popover** — hover a node link anywhere → preview card of that node (title, grade, one-line). (Transclusion of the node's abstract.)
- **Essay page** — inhabited voice; apparatus *hidden* in the prose but every claim still **links to its grounding node** (the voice wall holds; the receipts are one hover away).
- **Book chapter** — parchment reading surface, dropcap, sidenotes for the citations the sober register keeps out of the body.
- **Graph explorer** — the force-directed map of nodes/edges; filter by rail, register, **certainty**; click a node → its page.
- **Set-piece 1 — Lifespan continuum:** a scroll where one audience ages (infant→adult) and the media rung + mechanism change around them.
- **Set-piece 2 — Four-idiom through-line:** an animated recurrence — Aeon → World-Teacher → Hierarchy → Nine — secularizing and scaling across the century.
- **Live hypothesis-density view** — the Phase-2 audit query as a heat layer over the graph (where the thesis is still thin).

---


## 4a. THE POPUP / POPIN SYSTEM (Gwern's signature — not a tooltip)
A **popover** is a hover tooltip. Gwern's real feature is bigger and must be built as such:
- **Popup (desktop):** floating, hover-triggered, **recursive/stackable** panel that transcludes the whole target — a title-bar (hide · title · close), a **source line** (`type · dates · certainty · similar ≈ · backlinks ⋔ · bibliography ☰`), the **full abstract**, the target's own **mini table of contents**, and a footer (**Open in full ↗** · settings ⚙). Opening a link *inside* a popup opens another popup.
- **Popin (mobile):** the same panel **docked to the bottom** as a sheet (the “bottom pop-up”), tap-triggered, with a dimmed backdrop; tapping links inside stacks deeper panels; close returns to the parent.
- Detect with `matchMedia('(hover:hover) and (pointer:fine)')`; hover→popup, tap→popin.
- **Masthead:** a logo/monogram + a **dotted-bordered small-caps nav grid** (Index/People/Concepts / Essays/Map/About). Annotated links carry a **dotted underline**.

## 5. THE SIGNATURE (non-negotiable) — VISIBLE VALIDITY, not internal grades
The reader never sees the internal vocabulary (WELD / HYPOTHESIS / FICTION-ALERT). That is build-scaffolding. **The reader sees *validity*, phrased plainly** — Gwern's model: a quiet italic **certainty** word in the metadata line, no colored badges. Mapping, internal → reader-facing:
- WELD → **documented** (or *certain / highly likely*)
- HYPOTHESIS → **possible / speculative** (or *likely / unlikely* per Kesselman estimative words)
- FICTION-ALERT → **apocryphal**
- DISCARD → not shown (or *rejected*)

So every page and every claim can carry a certainty word the way Gwern carries `status: finished · certainty: highly likely`. Understated, monochrome, hoverable for a one-line definition. *This* is "shows its work" — validity in plain language, not jargon in gold.

## 6. TECH STACK (unconstrained — chosen to not cap the idea)
*The repo's Markdown+YAML is already the CMS; the stack renders it.*
- **Framework: Astro.** Content-first, ships zero JS by default, "islands" for the interactive pieces, reads our frontmatter natively. (Alt: Next.js if it grows app-like.)
- **Smooth scroll:** Lenis.
- **Scrollytelling:** Scrollama (Intersection Observer) + **D3** for the data set-pieces; **GSAP** or **Motion** for choreographed sequences.
- **Graph viz:** Cytoscape.js (rich interaction) or react-force-graph / d3-force; **Sigma.js** if the graph gets large.
- **Popovers/sidenotes:** tippy.js (popovers) + adapted Gwern sidenotes / littlefoot (footnote→popover).
- **Type:** self-host via Fontsource (Spectral, EB Garamond/Cormorant, a mono). No FOUT, no third-party calls.
- **Styling:** Tailwind with a **custom token theme** (the palette above as CSS vars) — or vanilla CSS custom properties if you prefer full control.
- **Static search:** Pagefind (built for Astro, indexes at build) or Fuse.js.
- **Graph data:** a build step exports `data/edges/adjacency.json` from node frontmatter (Phase 2 tooling).
- **Deploy:** Netlify or Vercel — **both already connected** as MCP connectors, so deploy-on-push is one step.

---

## 7. BUILD ORDER (design-side; slots into PLAN Phase 5)
1. Tokens + type + the parchment/indigo reading surface (get *one node page* and *one chapter* beautiful first).
2. Grade badges + hover popover + sidenotes (the signature) — prove "shows its work" on that one page.
3. Node→node link popovers + backlinks (the graph felt through reading, before the graph is drawn).
4. Graph explorer.
5. The two scroll set-pieces.
6. Search, reader mode, hypothesis-density layer.
*Ship each step; never leave the site broken. Get one page truly right before scaling to all 78 nodes.*
