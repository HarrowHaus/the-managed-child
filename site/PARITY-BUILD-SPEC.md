# THE MANAGED CHILD — Gwern-Parity Build Specification
### Full backend + frontend stack audit, and the complete parity spec for handoff

*Status: build handoff. Nothing here is built yet — this document is the buildable spec in its entirety. An executor (human developer or an agentic coding session) should be able to build the site to Gwern-parity from this alone, plus the repo's content files (`data/nodes/**`, `book/**`, `essays/**`) and `site/DESIGN.md`.*

*Pairs with: `GWERN-AUDIT.md` (the conceptual/UX audit — why these features matter). This document supersedes that file's §8 "stack" section with the engineering-grade version.*

---

## 0. How to use this document

- **PART I** audits Gwern's real architecture, backend and frontend, module by module. This is the reference standard.
- **PART II** defines exactly what "parity" means for us as a feature contract (with priorities).
- **PART III** fixes the parity stack decisions (SSG, frontend strategy, hosting, licensing).
- **PART IV** is the subsystem specs — the buildable core. Each subsystem states *purpose, inputs, behavior, the HTML/CSS/JS contract, and acceptance criteria*.
- **PARTS V–IX** cover the quality budget (progressive enhancement, performance, a11y), build order with milestone definition-of-done, the verification checklist, repo layout, and risks/effort.

**The one governing principle (Gwern's, adopted wholesale): _transclusion is everything, and JavaScript is optional._** Every rich feature — popups, backlinks, annotations, similar-links, collapses — is one mechanism (transclusion) pointed in a different direction. And the core reading experience must work with JS disabled; JS only *enhances*. Build in that order or parity will not hold.

---

# PART I — AUDIT: Gwern.net's actual stack

## I.A Architecture at a glance

Two phases, cleanly separated:

- **Build-time (backend):** Markdown + YAML → HTML via a Haskell/Hakyll pipeline over Pandoc's AST, plus offline batch jobs (annotations, backlinks, embeddings, link-archives) that generate HTML snippets and databases the site transcludes.
- **Run-time (frontend):** static HTML enhanced by a custom vanilla-JS framework (no React/Vue/build-time JS framework) organized around a **publish/subscribe event bus** that coordinates rewriting, transclusion, popups/popins, sidenotes, and theming.

Design constraints that hold across both, and that we inherit as non-negotiable:

- **Progressive enhancement.** Semantic HTML; JS not required to read. Pages remain usable in a text browser. JS powers only optional features (popups, transclusion, sidenotes, table-sort).
- **Long Content.** Content is built to last decades; external links are archived locally to fight linkrot.
- **Iceberg pages / semantic zoom.** Hierarchical collapse + instant popup access lets most information stay hidden until the reader drills down: link-icon → title → abstract → section → full page.
- **Monochrome, typographically precise, fast.** The aesthetic restraint is deliberate; performance is a feature.

## I.B Backend stack (build-time)

| Component | Tech | Job |
|---|---|---|
| Static site generator | **Hakyll** (Haskell) | Orchestrates the build; routing; templating |
| Markdown → AST → HTML | **Pandoc** (as a library) | Parses Gwerndown/Markdown, applies AST transforms |
| Templating | Hakyll/Pandoc HTML **templates** (~17) | Page/annotation/snippet shells |
| Link metadata / annotations | **`LinkMetadata.hs`** | The annotation database: auto-extract from Arxiv/BioRxiv/MedRxiv/Crossref, or hand-written; consistency rewrite-rules; ML paragraph-splitting of abstracts |
| Auto-linkification | **`LinkAuto.hs`** | Turns recurring keywords/phrases into links automatically |
| Link archiving | **`LinkArchive.hs`** | Mirrors external links locally (self-contained static snapshots); popup exposes an `[original]` link; mirror only after N days so pages finalize |
| Backlinks | **offline cron job** (nightly) | Parses Markdown sources + annotation HTML, extracts URL+ID pairs, emits per-URL HTML lists of **transclusions** (reverse-citation context), collapsible; `.backlink-not` disables per link/page |
| Similar-links | **embeddings** (shell + Python) | Text-embedding nearest-neighbours; emitted as transcluded snippets |
| Asset pipeline | **PHP** | Bundling, CSS generation, SVG optimization; generates `*-GENERATED`/`*-VERSIONED` files via a pre-commit hook |
| Text processing | **Python** | LLM-based paragraph splitting, title cleaning |
| Utilities | **Shell** | Embedding generation, archiving, uploads |
| Serving | **Nginx** | Static hosting, redirects, headers |
| Quality gate | `Test.testAll`, `-Wall`/`hlint`-clean | No compile-time or runtime warnings; generated files never hand-edited |

**Key backend insight for parity:** the "database" is not a runtime DB. It is a set of **pre-generated static HTML snippets** (annotations, backlinks, similar-links) that the frontend transcludes on demand. This is why the site is fast and hostable as pure static files. We replicate the *outputs* (snippets + an adjacency/metadata index), not the Haskell.

## I.C Frontend stack (run-time)

Vanilla JS by Said Achmiz, coordinated by a pub/sub **notification center** (`GW.notificationCenter`) with structured logging (`GWLog`) and media-query/layout helpers (`doWhenMatchMedia`, `doWhenPageLayoutComplete`). The defining pattern is the **content-injection lifecycle**: whenever content enters the page (initial load *or* a transclusion), events fire (`GW.contentDidInject`, `Rewrite.contentDidChange`, `Collapse.collapseStateDidChange`, …) and registered handlers (`addContentInjectHandler`) run passes over the new content. This is what makes everything **recursive and composable** — a transcluded fragment is rewritten, gets its own popups, its own sidenotes, its own further transclusions, with no special-casing.

Module map (`/js`), with the parity-critical ones marked ★:

| Module | Responsibility |
|---|---|
| `initial.js` | Bootstrap; sets up the event bus and early state |
| `rewrite.js` (+ `rewrite-initial.js`) ★ | The DOM-transform pipeline: runs all rewrite passes on injected content; fires `contentDidChange` |
| `transclude.js` (+ `transclude-templates-GENERATED.js`) ★ | The transclusion engine: lazy, recursive client-side includes (`.include`, `.include-annotation`, `.include-strict`, …); the templates that render annotations/snippets |
| `extracts.js` ★ | Binds "targets" (links/elements) to pop-frames; decides what pops and how; the glue between links and popups/popins |
| `popups.js` ★ | **Desktop** hover pop-frames: floating, movable, pin/"sticky", fullscreen, recursive |
| `popins.js` ★ | **Mobile** click pop-frames: stacked sheets, title bar, `spawnedPopins` stack, Escape-to-close, stack numbering |
| `popovers.js` | Additional pop-frame variant / shared pop-frame plumbing |
| `sidenotes.js` ★ | Builds margin sidenotes on wide viewports; reflows footnote↔sidenote at the breakpoint; recomputes positions on content change/collapse; **skips on mobile** (footnotes become popins) |
| `reader-mode.js` (+ `reader-mode-initial.js`) | Reader mode: strips chrome, widens, quiets non-essential UI |
| `typography.js` | Runtime typographic transforms (dropcaps, smallcaps, spacing, etc.) |
| `layout.js` | Layout/position calculations (margins, columns, pop-frame placement) |
| `image-focus.js` | Click-to-zoom / focus images |
| `tablesorter.js` | Sortable tables |
| `special-occasions.js` | Seasonal theming ("dropcats," holidays) |
| `misc.js`, `utility.js` | Shared helpers |
| `head-GENERATED.js`, `script-GENERATED.js` | Bundled/generated entrypoints |

CSS/theming: monochrome system; self-hosted fonts (tuned per-platform because link-icons/sidenotes/subscripts break on font substitution); dark mode + reader mode; Wikipedia-style **link-icons** by link type; dropcaps; smallcaps; collapsible sections; inflation-adjusted currency; custom syntax highlighting.

## I.D Cross-cutting truths to carry into the spec

1. **Transclusion underlies popups, backlinks, annotations, similar-links, and collapses.** Build the transclusion engine + event bus first; everything else is a consumer.
2. **Popups (desktop) and popins (mobile) are two renderers over one pop-frame abstraction.** Same content, different presentation and interaction.
3. **Backlinks/similar-links are generated offline as transclusion snippets**, then displayed at the page foot *and* poppable from the top — "just keep reading" or drill up.
4. **JS-optional core.** If our popups require JS to read the content at all, we've failed parity; the linked/transcluded content must also exist as reachable pages.
5. **The frontend JS is open source (CC-0, or MIT where CC-0 is problematic).** This creates a legitimate fast path to parity (adaptation) — see §III.B.

---

# PART II — PARITY TARGET (the feature contract)

Priority: **P0** = parity is meaningless without it; **P1** = core parity; **P2** = full parity; **P3** = Gwern-beyond / project-specific.

| # | Gwern feature | Our requirement | Pri |
|---|---|---|---|
| 1 | Client-side **transclusion** (lazy, recursive) | Same engine; drives everything below | P0 |
| 2 | **Content-inject event lifecycle** | A pub/sub bus so transcluded content is rewritten + re-bound recursively | P0 |
| 3 | **Popups** (desktop hover, movable, pin, fullscreen, recursive) | Full | P0 |
| 4 | **Popins** (mobile click, stacked, title bar, Esc) | Full | P0 |
| 5 | **Annotations** (metadata + abstract per link; partial vs full) | Node frontmatter → annotation snippet; partial-annotation fallback | P0 |
| 6 | **Metadata line** + certainty/register + icon row (backlinks·similar·sources) | Full; certainty = our signature (visible validity, plain words) | P0 |
| 7 | **Sidenotes** (margin on wide; footnote↔sidenote reflow; popin on mobile) | Full | P1 |
| 8 | **Backlinks** (offline; in-context reverse transclusion; `.backlink-not`) | Full | P1 |
| 9 | **Similar-links** (embeddings; transcluded at foot) | Full | P1 |
| 10 | **Dark mode + reader mode + floating control bar + disable-popups** | Full | P1 |
| 11 | **Link-icons** by type; **dropcaps**; **smallcaps**; **collapses** | Full | P1 |
| 12 | **Local archiving / Long Content** | Archive cited sources; `[original]` link in popup | P2 |
| 13 | **Self-hosted tuned fonts**; monochrome system; print CSS | Full | P1 |
| 14 | **Static search** | Pagefind (Gwern has site search) | P2 |
| 15 | **Progressive enhancement** (JS-optional, text-browser readable, fast) | Non-negotiable quality budget | P0 |
| 16 | Tag/index pages as transcluded annotated bibliographies | Rail/tag pages via transclusion | P2 |
| 17 | — (project-specific) **Graph explorer** over nodes/edges | Force-directed; filter by rail/register/certainty | P3 |
| 18 | — (project-specific) **Two scroll set-pieces** (lifespan; four-idiom) | Scrollytelling | P3 |

---

# PART III — THE PARITY STACK (decisions)

## III.A Static site generator — **Astro** (recommended), Eleventy as fallback

- **Astro** reads our Markdown+YAML natively (content collections), ships **zero JS by default** (matches the JS-optional principle), supports "islands" for the few interactive pieces (graph, set-pieces), and integrates Pagefind. It emits clean static HTML we can hang the frontend framework on. Deploys to Netlify/Vercel (already connectors).
- **Eleventy** is the fallback if the team prefers minimal tooling; same job, more manual.
- **We do NOT reimplement Hakyll/Haskell.** The Haskell exists because Gwern started in 2009 and Hakyll fit then. Our equivalent of `LinkMetadata.hs`/backlinks/embeddings is **a set of Node/TS build scripts** run at build or as pre-build steps (see §IV.2). This is strictly simpler and sufficient.

## III.B Frontend strategy — TWO ROUTES

The frontend is where parity actually lives. Gwern's JS is released under **CC-0 (or MIT)**. Two legitimate paths:

- **Route A — ADAPT Gwern's open-source modules (RECOMMENDED for true parity fastest).** Vendor `transclude.js`, `extracts.js`, `popups.js`, `popins.js`, `sidenotes.js`, `rewrite.js`, `typography.js`, `reader-mode.js`, and the `GW` event core; then **conform our generated HTML/CSS class contract** to what those modules expect (this is the real integration work). Pros: genuine parity behavior (recursion, pin, fullscreen, footnote↔sidenote reflow) for a fraction of the effort; battle-tested. Cons: must learn their HTML/class conventions; must preserve licenses and attribution; their code assumes their annotation-snippet format, so our build must emit compatible snippets. **Preserve `LICENSE`/attribution headers; note provenance in `site/CREDITS.md`.**
- **Route B — CLEAN-ROOM equivalent.** Build our own small framework: an event bus (`content:inject` / `content:changed`), a transclude module, a unified pop-frame module with popup+popin renderers, a sidenotes module. Pros: full control, minimal surface, no external conventions. Cons: significantly more work to reach the same polish (recursion edge-cases, sidenote reflow, focus management). The v2 prototype (`the-managed-child-node-v2.html`) is the seed of Route B and already demonstrates recursion, stacking, popins, control bar.

**Recommendation:** start **Route A** for the pop-frame + transclusion + sidenote core (items 1–9), because reimplementing them well is weeks of subtle work Gwern already solved; keep **Route B** techniques for our project-specific surfaces (graph explorer, scroll set-pieces) where Gwern has nothing to copy. If licensing/attribution overhead is unwanted, fall back to Route B entirely using the v2 prototype as the foundation.

## III.C Content model, hosting, licensing

- **Content = our existing repo.** `data/nodes/**` (Markdown+YAML), `book/**`, `essays/**` are the CMS. No database.
- **Hosting:** Netlify or Vercel, deploy-on-push (both are connectors).
- **Licensing:** if Route A, vendor Gwern JS under its stated terms (CC-0/MIT), keep headers, credit Said Achmiz + Gwern Branwen in `site/CREDITS.md`. Our content stays under our own terms.

---

# PART IV — SUBSYSTEM SPECS (buildable core)

> Convention for each spec: **Purpose · Inputs · Behavior · Contract (HTML/CSS/JS) · Done-when.**

## IV.1 Content model & schemas

**Purpose.** One authored source of truth per entity; graded once; surfaced as page, annotation, book beat, essay citation.

**Node frontmatter (YAML) — the repo's ACTUAL schema (authoritative: `data/schema/node-schema.md`).** Do not invent a new schema; 78 nodes already use this one. Build against it:
```yaml
id:        julian-huxley-unesco          # kebab-case; matches filename; the transclusion/edge-target key
title:     "Julian Huxley at UNESCO"
type:      person | work | institution | concept | event
category:  people | works | institutions | concepts | events
dates:     "1887-1975" | "1946" | "-"
grade:     WELD | WELD-verified | WELD-parallel | HYPOTHESIS | HYPOTHESIS-fenced | FICTION-ALERT | FRAME | PRINCIPLE
map_node:  "0.3"                          # cross-ref into map/lineage-map.md
status:    stub | drafted | locked
abstract:  "1-3 sentence annotation body."   # OPTIONAL; falls back to first body paragraph
sources:   [ "Author, Title (year), p. — [PRIMARY|SECONDARY|VERIFY]" ]
welds:                                    # DOCUMENTED out-edges
  - { to: node-id, type: influenced|met|cited|funded|mentored|founded|advised|member-of|…, register: worked-off|same-field, grade: WELD, source: "…" }
hypotheses:                               # SUSPECTED out-edges, same shape, grade: HYPOTHESIS
tags:      [ trunk, rail-one, articulation, enactment, … ]   # node register (articulation/enactment) lives here
```

**Edges = `welds` + `hypotheses` combined.** Each carries `to`, `type` (controlled vocab), `register` (`worked-off` | `same-field` — the spec's "transmission"), `grade`, `source`. The build inverts all nodes' edges to produce backlinks (§IV.2 step 3) and exports `data/edges/adjacency.json` (step 5).

**Two axes — do not conflate** (see schema): **node register** = articulation/enactment, in `tags`; **edge transmission** = worked-off/same-field, in the edge `register` field.

**Grade → reader-facing `certainty` (DERIVED at build; the signature — never a colour-coded badge):**
`WELD` / `WELD-verified` / `WELD-parallel` → **documented** · `HYPOTHESIS` / `HYPOTHESIS-fenced` → **possible** · `FICTION-ALERT` → **apocryphal** · `FRAME` / `PRINCIPLE` → structural label, *no* certainty word · `DISCARD` → not shown. The reader never sees the internal vocabulary. (Authoritative table: `data/schema/node-schema.md`.)

**Done-when.** A JSON schema validates every node; CI fails on unknown `rail`/`kind`/`certainty`/`transmission` or dangling `edges.to`.

## IV.2 Build pipeline (the "backend," as Node scripts)

**Purpose.** Turn `data/nodes/**` + `book/**` + `essays/**` into: (a) HTML pages, (b) **annotation snippets** (one per node), (c) **backlink snippets**, (d) **similar-links snippets**, (e) an **adjacency/metadata index** (`data/edges/adjacency.json`), (f) link-icon decoration.

**Steps.**
1. **Compile pages** (Astro): each node → a page; each book chapter → a page; each essay → a page.
2. **Emit annotation snippets:** `/annotations/<id>.html` = metadata line (**certainty derived from `grade`**, node register from `tags`, dates) + abstract (`abstract:` field, else first body paragraph) + icon row + edges. This is what popups transclude. (Mirrors `LinkMetadata.hs` output.)
3. **Generate backlinks (offline step):** invert every node's `welds` + `hypotheses`; for each target, emit `/backlinks/<id>.html` listing each citing node **with context** (the edge `type` + `source`), as transclusions; honor a `.backlink-not` / `backlink: false` suppression flag on aggregator nodes. (Mirrors the nightly cron.)
4. **Generate similar-links:** compute text embeddings over node abstracts (any embeddings API or local model, run in a script); nearest-neighbours per node → `/similar/<id>.html`. (Mirrors the embeddings shell/Python.)
5. **Export `adjacency.json`** for the graph explorer.
6. **Link-icon decoration:** post-process HTML to add type icons (Wikipedia, PDF, arxiv, internal-node, external) by URL pattern. (Mirrors Gwern's link-icons.)
7. **(Optional) auto-linkification** of recurring node titles across prose (mirrors `LinkAuto.hs`); gate behind review to avoid false links.

**Contract.** Snippets are plain static HTML with the class contract §IV.4 expects. Everything is a file under the build output; no runtime server.

**Done-when.** A clean build produces pages + all four snippet types + `adjacency.json`; re-running is deterministic; a broken `edges.to` fails the build.

## IV.3 The event framework (frontend backbone) — P0

**Purpose.** Make injected content (initial or transcluded) automatically get all enhancement passes, recursively.

**Behavior.** A pub/sub bus. On any content injection, fire `content:injected(container, source, loadLocation)`. Registered handlers run in priority order: **rewrite passes** → **bind pop-frame targets** → **construct sidenotes** → **trigger nested transcludes**. Handlers must be idempotent and scoped to the injected `container` (never re-process the whole document). Provide `contentDidChange` for layout-dependent consumers (sidenote reflow).

**Contract.** `GW.notificationCenter.addHandlerForEvent(name, fn, {condition, once})` + `addContentInjectHandler(fn, phase, condition)`. (Route A: use Gwern's `GW` directly. Route B: implement this minimal bus.)

**Done-when.** A transcluded fragment three levels deep has working links, popups, and (desktop) sidenotes with no extra wiring.

## IV.4 Transclusion engine — P0

**Purpose.** Copy any page/part/metadata into the current context, lazily and recursively.

**Behavior.** A link/element carrying an include class is replaced/augmented by fetching the target and injecting it. Classes:
- `.include` — transclude the target page/fragment.
- `.include-annotation` — transclude the target's annotation snippet (metadata + abstract).
- `.include-strict` — do it immediately (non-lazy) for correctness/perf.
- ID/range support — transclude a specific `#id` or a span range.
Lazy by default (load on demand/near-viewport); recursion allowed (including guarded loops). After injection, fire `content:injected` (→ §IV.3).

**Contract.** `data-` attributes for target URL/ID; templates render annotation snippets (`transclude-templates`). Reuse `transclude.js` (Route A) or implement the fetch-inject-notify loop (Route B; the v2 prototype's `openPanel`/`makePanel` is a non-fetching seed to generalize to fetch real snippets).

**Done-when.** Popups, backlinks, and similar-links are all implemented *as transclusions* — no bespoke rendering paths.

## IV.5 Pop-frame system: popups + popins — P0

**Purpose.** Hover/tap any qualifying link → the target transcludes into a frame; frames stack recursively.

**Behavior.**
- **Desktop (`popups`):** hover-intent open; floating placement near the trigger, flipped to stay on-screen; **movable**, **pin/sticky** (stays on mouse-out), **fullscreen**; multiple open; recursion via links inside.
- **Mobile (`popins`):** click/tap open; **stacked sheets** with a **title bar** (collapse/eye, title, close); `spawnedPopins` stack; **Escape/`✕` closes top**; top-line links (backlinks/similar) **jump to the transcluded copy at the foot** instead of spawning a redundant popin.
- **Both:** share one content source (the transcluded annotation/page); respect **disable-popups** toggle; keyboard-accessible (focus the frame, Esc closes, focus returns to trigger); `prefers-reduced-motion` honored.

**Contract.** Targets marked by `extracts.js` logic (what qualifies: internal node links, annotated links, footnotes). Frame DOM = title bar + scroll body + optional foot. Route A gives all of this; Route B extends the v2 prototype (which already does stacking, popins, Esc, control-bar disable) to add desktop pin/fullscreen + hover-intent + real fetching.

**Done-when.** From the base page you can open a node, open an edge inside it, and an edge inside *that*, then close back out one frame at a time; on mobile the same as stacked sheets; popups-off disables it entirely.

## IV.6 Annotations (metadata line + icon row) — P0

**Purpose.** Give every link something worth popping: standing + abstract + navigation.

**Behavior.** Full annotation = certainty word (hoverable definition) + register + dates + abstract + **icon row** (`backlinks · similar · sources`), each icon itself transcluding its snippet. **Partial annotation** = a link with metadata but no abstract still pops a bare card (tags/backlinks) so the reader "knows not to expect too much" rather than getting nothing.

**Contract.** `/annotations/<id>.html` from §IV.2. Certainty rendered as quiet italic word + `data-def`; never a colored badge (see §IV.16).

**Done-when.** Every node link pops its annotation; nodes lacking abstracts still pop a partial card; the icon row works.

## IV.7 Sidenotes — P1

**Purpose.** Put the apparatus (sources, grades, asides) in the margin so the body stays clean.

**Behavior.** Wide viewports: render footnotes as **margin sidenotes**, left/right columns, positions recomputed on content change and collapse toggles. At the breakpoint, **reflow footnote↔sidenote** and keep the URL hash targeting the visible counterpart. **Mobile: do not build sidenotes** — footnotes become popins.

**Contract.** `sidenotes.js` (Route A). Route B: the v2 prototype renders a static "receipts" margin — upgrade it to auto-generate from footnotes and reflow at the breakpoint.

**Done-when.** Resizing across the breakpoint moves notes between margin and inline without duplication; mobile shows footnote-popins.

## IV.8 Backlinks — P1

**Purpose.** Show, on every node, what leans on it — in context (the anti-conspiracy-wiki honesty, made navigable).

**Behavior.** Offline-generated (§IV.2 step 3) as reverse-citation transclusions; displayed as a **collapsed appendix at the page foot** and **poppable from the top**; `backlink: false` suppresses. Show the citing context, not a bare list.

**Done-when.** Node A's foot lists every node/chapter/essay that cites it, each showing the citing sentence, each poppable.

## IV.9 Similar-links — P1

**Purpose.** "Other nodes on this rail," by content, not hand-curation.

**Behavior.** Embeddings nearest-neighbours (§IV.2 step 4); transcluded at the foot + poppable from the top.

**Done-when.** Each node shows 3–8 nearest nodes; regenerating is a single script.

## IV.10 Reader mode + dark mode + floating control bar — P1

**Purpose.** Reader control over presentation; the escape hatch for popups.

**Behavior.** A corner control bar (matches Gwern): **dark · reader · disable-popups** (+ later: search, help). Dark = deep-indigo theme (our palette). Reader = widen, drop margin apparatus, quiet chrome. Disable-popups = turn off all pop-frames. State may persist via `localStorage` **on the deployed site** (note: not in Claude-hosted artifact previews). Honor OS `prefers-color-scheme` for initial theme.

**Done-when.** All three toggles work; dark mode covers pop-frames and sidenotes; reduced-motion respected.

## IV.11 Typography & visual system — P1

**Purpose.** Gwern-parity restraint + our "Gilded Deep" whisper (per `site/DESIGN.md`).

**Behavior.** Monochrome base; **self-hosted fonts** (Source Serif 4 body, EB Garamond display, Source Sans UI, a mono) via Fontsource — self-host is required (link-icons/sidenotes/subscripts break under font substitution). **Dropcaps**, **smallcaps** running heads, **collapsible sections**, **link-icons** by type, print CSS. Single indigo accent; no gold badges in reading UI.

**Done-when.** No third-party font calls; link-icons render consistently cross-platform; print CSS expands transclusions/collapses so nothing is lost.

## IV.12 Search — P2

**Purpose.** Find any node/chapter/essay.

**Behavior.** **Pagefind** (indexes at build, static, works on Netlify/Vercel). Surfaced from the control bar.

**Done-when.** Full-text search over all pages + annotations; zero server.

## IV.13 Graph explorer — P3 (project-specific)

**Purpose.** Browse the lineage as a graph; the payoff of the node/edge model.

**Behavior.** Force-directed (**Cytoscape.js** or **d3-force**; **Sigma.js** if node count grows large); nodes coloured/filtered by **rail / register / certainty**; click a node → its page; hover → its annotation popup (reuse §IV.5). Data from `adjacency.json`. Astro island; static fallback = the rail index pages.

**Done-when.** All nodes/edges render; filters work; every node is one click from its page; degrades to index lists without JS.

## IV.14 The two scroll set-pieces — P3 (project-specific)

**Purpose.** The signature narrative moments from `site/DESIGN.md`.

**Behavior.** (1) **Lifespan continuum** — one audience ages infant→adult while media rung + mechanism change. (2) **Four-idiom through-line** — Aeon → World-Teacher → Hierarchy → Nine, secularizing across the century. Scrollama + D3/GSAP; **every set-piece has a static fallback**; `prefers-reduced-motion` swaps to static.

**Done-when.** Both scroll cleanly on desktop/mobile and present a legible static version with motion disabled.

## IV.15 Local archiving / Long Content — P2

**Purpose.** Sources can't rot out from under the foundation.

**Behavior.** Archive cited external sources (self-contained snapshots) at build/offline; popups expose `[original]`; archive only after a delay so targets finalize. (Mirrors `LinkArchive.hs`.) Lightweight first version: store archive URLs in `sources[].archived`.

**Done-when.** Cited sources have an archived copy or a recorded archive URL; popups link both live and archived.

## IV.16 The signature — visible validity (do-not-violate)

The reader never sees WELD/HYPOTHESIS/FICTION-ALERT. They see **plain certainty words** — *documented / possible / apocryphal* — as quiet italic text in the metadata line and sidenotes, hoverable for a one-line definition. **No colored/gold badges.** This is the one rule that makes the site unmistakably this project and keeps the epistemics — not ornament — the visual focus. Enforced everywhere certainty appears.

---

# PART V — Quality budget (parity is also *these*)

- **Progressive enhancement.** Core reading works with JS off; every popup target is also a real, reachable page/anchor. Text-browser readable. *This is a P0 acceptance gate, not a nicety.*
- **Performance.** Ship near-zero JS on content pages (Astro default); lazy-load pop-frame JS; self-hosted fonts with `font-display: swap`; images sized. Target: fast first paint, no layout shift from late fonts/icons.
- **Accessibility.** Visible keyboard focus; pop-frames are focus-managed dialogs (Esc closes, focus returns); `prefers-reduced-motion` honored on every animation and set-piece; color-contrast AA in both themes; sidenote markers are real buttons.
- **Resilience.** No console warnings (Gwern's own bar); broken data fails the build, not the reader.

---

# PART VI — Build order & milestones (with definition-of-done)

Get **one node page** to feel like Gwern before scaling to all nodes.

- **M0 — Skeleton.** Astro reads `data/nodes/**`; one node + one chapter render as static pages with the §IV.11 type system, dark mode, control bar. *Done: two beautiful static pages, JS-off readable.*
- **M1 — Event bus + transclusion (P0).** §IV.3 + §IV.4 working; a link can transclude an annotation snippet. *Done: `.include-annotation` injects a real snippet and fires inject events.*
- **M2 — Pop-frames (P0).** §IV.5 popups + popins over M1; recursion + stacking + disable-popups. *Done: three-deep open/close on desktop and mobile.*
- **M3 — Annotations + metadata line + icon row (P0).** §IV.6; partial-annotation fallback; the signature certainty words (§IV.16). *Done: every node link pops its annotation; certainty hovers work.*
- **M4 — Sidenotes (P1).** §IV.7 with breakpoint reflow; mobile footnote-popins. *Done: reflow across breakpoint, no duplication.*
- **M5 — Backlinks + similar-links (P1).** §IV.2 steps 3–4 + §IV.8–9; transcluded at foot, poppable at top. *Done: node foot shows in-context backlinks + neighbours.*
- **M6 — Reader mode, search, archiving, print CSS (P1–P2).** §IV.10, IV.12, IV.15, IV.11 print. *Done: toggles + Pagefind + archived sources + clean print.*
- **M7 — Graph explorer + scroll set-pieces (P3).** §IV.13–14 as islands with static fallbacks. *Done: graph + both set-pieces, reduced-motion-safe.*

Parity (items 1–16) is reached at **end of M6**; M7 is the project-specific beyond-Gwern layer.

---

# PART VII — Verification checklist (parity acceptance)

- [ ] Every popup target is independently reachable with JS disabled.
- [ ] Transcluded content 3 levels deep has working links, popups, and (desktop) sidenotes with no extra wiring.
- [ ] Desktop popup: hover-open, move, pin, fullscreen, recursive, Esc/return-focus.
- [ ] Mobile popin: tap-open, stack, title bar, Esc/✕ closes top, top-links jump to foot copy.
- [ ] Disable-popups turns everything off; dark + reader modes cover pop-frames and sidenotes.
- [ ] Sidenotes reflow across the breakpoint without duplication; mobile shows footnote-popins.
- [ ] Backlinks show citing context; `backlink:false` suppresses; similar-links populated by embeddings.
- [ ] Certainty shown only as plain words (documented/possible/apocryphal), hoverable; no gold badges anywhere.
- [ ] Link-icons consistent cross-platform; fonts self-hosted; print expands transclusions/collapses.
- [ ] No browser console warnings; broken `edges.to`/schema fails the build; Pagefind indexes all pages.
- [ ] `prefers-reduced-motion` honored on all motion incl. set-pieces; keyboard focus visible throughout.

---

# PART VIII — Repo layout (`site/`)

```
site/
  DESIGN.md                 # aesthetic brief (exists)
  PARITY-BUILD-SPEC.md      # this document
  CREDITS.md                # attributions (esp. if Route A: Said Achmiz / Gwern JS, licenses)
  astro/                    # the Astro project
    src/
      pages/                # node/chapter/essay routes
      layouts/              # page shells (reading surface, print)
      components/           # metadata line, control bar, graph island, set-pieces
      styles/               # tokens (palette/type), monochrome system, dark/reader
      lib/frontend/         # event bus, transclude, popframe (popups+popins), sidenotes
                            #   Route A: vendored gwern JS + our class-contract adapters
                            #   Route B: our clean-room modules (v2 prototype = seed)
    scripts/                # build-time: annotations, backlinks, similar-links(embeddings),
                            #   adjacency.json, link-icons, (optional) auto-linkify, archiving
    public/annotations/     # generated snippets
    public/backlinks/
    public/similar/
  data/edges/adjacency.json # generated
```

---

# PART IX — Risks, open decisions, effort

**Open decisions (for you):**
- **D-site-1 · Route A vs B.** Adapt Gwern's OSS frontend (fast true parity, licensing/attribution + class-contract learning) vs clean-room (full control, more time). *Recommendation: A for the pop-frame/transclude/sidenote core; B for graph + set-pieces.*
- **D-site-2 · Embeddings provider** for similar-links (hosted API vs local model). Low stakes; swappable.
- **D-site-3 · Auto-linkification** on or off (false-positive risk). *Recommendation: off until review tooling exists.*
- **D-site-4 · Archiving depth** (full snapshots vs recorded archive URLs). *Recommendation: URLs first, snapshots later.*

**Risks.**
- *Route A class-contract friction* — Gwern's JS expects specific HTML/classes; budget integration time to conform our snippets. Mitigation: build M1–M3 against their conventions from the start.
- *Sidenote reflow + recursion edge-cases* — the subtle, time-eating parts; the strongest argument for Route A.
- *Scope creep via the graph/encyclopedia urge* — the ROADMAP's named trap. The database serves the products; expand threads only when a product needs them.

**Rough effort (one capable frontend dev, or an agentic session with review):**
- Route A: M0–M3 ≈ 1–2 weeks; M4–M6 ≈ 1–2 weeks; M7 ≈ 1–2 weeks.
- Route B: roughly +50–100% on M1–M4 (rebuilding what Route A vendors).

---

## Appendix — sources audited
gwern.net/design; gwern.net/style-guide; gwern.net Manual of Style; gwern.net/xanadu; gwern.net/design-graveyard; the `gwern/gwern.net` repo (`/js` module listing, README, `LinkArchive.hs`, CONTRIBUTING); the unofficial `Pleometric/gwern-net-docs` codebase map; syntax-highlighted previews of `sidenotes.js` and `popins.js`. All paraphrased; the Gwern frontend JS is CC-0/MIT per the repo.
