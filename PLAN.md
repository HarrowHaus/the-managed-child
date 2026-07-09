# PLAN — everything, to the finish
*The complete phased plan. Phases have dependencies (noted) but Phases 3–4 run in parallel. Each phase lists its tasks, its **definition of done (DoD)**, and what it unblocks. Granular checkboxes live in `TASKS.md`; this file is the shape and the sequence.*

---

## PHASE 0 — Finalize the repo & the decisions  *(now; blocks clean start of everything)*
**Tasks**
- Make the two open decisions (`DECISIONS.md`): flagship (book/site) and umbrella name.
- `git init`, `.gitignore` already present, first commit, push to GitHub (private to start).
- Confirm the working loop (HANDOFF §4) and the merge gate (HANDOFF §5).
- Optional: set up a simple CI check that lints node frontmatter against `data/schema/node-schema.md`.

**DoD:** repo on GitHub; decisions recorded in `DECISIONS.md`; a fresh reader can go from `HANDOFF.md` to a correct first commit unaided.
**Unblocks:** all subsequent phases; collaboration.

---

## PHASE 1 — Atomize the graph (fill the 78 nodes)  *(depends on 0)*
Take every stub in `data/nodes/**` from `status: stub` → `drafted` → `locked`, drawing from `map/lineage-map.md` + named sources. This is the "database of every detail."

**Batch order (do in this sequence; each batch is a sitting):**
1. **Spine concepts** — `the-root` (done, exemplar), `rule-by-trained-elite`, `managed-child`, `method-stance`, `hard-sourcing-rule`, `grading-system`, `four-idiom-through-line`, `double-parentage`, `lifespan-continuum`, `aeon-of-the-child`, `permeation`, `moonchild`. *(Concepts first — everything else references them.)*
2. **Keystone people** — `crowley-aleister`, `besant-annie`, `huxley-julian`, `watson-john-b`, `parsons-jack`, `hall-g-stanley`, `lippmann-walter`.
3. **Rail One + Four idioms** — `bailey-alice`, `krishnamurti-jiddu`, `leadbeater-cw`, `steiner-rudolf`, `puharich-andrija`, `roddenberry-gene`, `jung-cg`.
4. **The enactment rail** — `terman-lewis`, `galton-francis`, `pearson-karl`, `bernays-edward`, `dewey-john`, `holt-l-emmett`, `gesell-arnold`, `spock-benjamin`, `mann-horace`, `cubberley-ellwood`.
5. **Trunk + technocrats** — `webb-sidney`, `webb-beatrice`, `shaw-george-bernard`, `wells-hg`, `russell-bertrand`, `burnham-james`, `huxley-aldous`, `huxley-th`.
6. **Decode-prep + contested** — `campbell-joseph`, `vogler-christopher`, `eliade-mircea`, `wheatley-dennis`, `fleming-ian`, `quigley-carroll`, `hall-manly-p`, `hubbard-lron`.
7. **Works, institutions, events** — fill remaining `works/`, `institutions/`, `events/` from the map.
8. **Edge pass** — sweep every node; ensure `welds:`/`hypotheses:` frontmatter mirrors the body and that every edge has a `register`. Build `data/edges/` adjacency export if desired.

**Per-node DoD (a node is `locked` when):** documented core written from named sources; every edge graded + given a register; held-open/discard section present; role-in-thesis stated; symptom-not-cause observed where relevant; frontmatter mirrors body.
**Unblocks:** Phase 2 (needs full frontmatter), and materially strengthens Phases 3–4.

---

## PHASE 2 — The computational layer  *(depends on 1 frontmatter being complete)*
Make the graph interrogate itself.
**Tasks**
- Frontmatter validator (schema conformance, dangling edge targets, missing register).
- Graph export (nodes + edges → JSON/GraphML).
- **HYPOTHESIS-density map** — rank nodes/regions by unresolved-edge ratio → *auto-locates the thesis's weak spots.*
- Centrality (confirm Besant/Crowley as hubs) and shortest-documented-path queries (e.g. prove no worked-off chain Crowley→Watson).
- Register-over-time series (articulation vs enactment curve).

**DoD:** running the tooling on `data/nodes/**` produces the density map, a centrality table, and a valid graph export. The audit is now a **live query**, not a static doc.
*Note: this overlaps the site build pipeline (`PARITY-BUILD-SPEC.md` §IV.2 — the validator, `adjacency.json` export, and hypothesis-density query are the same scripts the site consumes). Build once; both phases use them.*
**Unblocks:** aims all further research; feeds the site's interactive views.

---

## PHASE 3 — The book (Tier 1 flagship)  *(depends on 1; parallel with 4)*
Draft `book/chapters/01…13` in the **sober register** from the nodes each chapter names.
**Tasks:** per chapter — beats → draft → weave nodes → boundary-check (where it must not overreach) → internal review against `AUDIT.md` and `CONVENTIONS.md`.
**Governing rules:** lead on Thesis A as fact; B as confession not cause; denominator concession early; never let B carry A's weight; strip all apparatus (no tags/grades/node-numbers in prose).
**Per-chapter DoD:** every load-bearing sentence traces to a [WELD]; boundaries stated; reads as one voice; no apparatus leaked.
**Book DoD:** 13 chapters drafted, internally consistent, front-and-back matter, one editorial pass.
**Unblocks:** the site spine; excerpts feed the essays' credibility.

---

## PHASE 4 — The essays (Tier 2; parallel with 3)  *(depends on 1 for grounding)*
Work the queue in the **inhabited voice**, each standing on the audited thesis.
**Order:** finish `essays/in-progress/cars-the-engine-that-prays.md`; build front-matter for the complete `finding-nemo-dory` manuscript; then queue: `fantasia` → `inside-out` → `pokemon` → `harry-potter` → `nickelodeon`.
**Per-essay procedure:** documented base → symbols run through the four-test filter (specific / deliberate / correct-to-sources / reads-one-way) → the read → mark where it stays HYPOTHESIS. Keep structure-as-craft (Vogler) distinct from esoteric-intent (Joint 5).
**Per-essay DoD:** voice consistent and un-attributed; four-test filter applied to every symbol; "correct?" claims sourced to Manly P. Hall / primary esoterica; apparatus stripped; stands on `THESIS.md` without leaning on B as cause.
**Unblocks:** audience; the site's leaf layer.

---

## PHASE 5 — The site (Tier 3)  *(depends on a book spine + ≥2 essays)*
A **Gwern-parity reading environment**, built to `site/PARITY-BUILD-SPEC.md` (the authoritative backend+frontend spec; `site/BUILD.md` is the one-page orientation, `site/DESIGN.md` the aesthetic brief, `site/reference-implementation.html` a working seed). **Governing principle:** transclusion is everything, and JavaScript is optional (core readable with JS off).
**Stack:** Astro SSG over `data/nodes/**` frontmatter; build scripts emit annotation/backlink/similar-links snippets + `adjacency.json` (replacing the Haskell backend); pop-frame + transclusion + sidenote frontend (Route A = adapt Gwern's CC-0/MIT modules for the core; Route B = the reference implementation for graph + set-pieces). Deploy Netlify/Vercel.
**Milestones (DoD per milestone in spec Part VI):** M0 skeleton · M1 event-bus + transclusion · M2 pop-frames (popups/popins, recursive) · M3 annotations + the **visible-validity signature** (certainty as plain words — *never gold badges*) · M4 sidenotes · M5 backlinks + similar-links · M6 reader/search/archive/print → **parity reached** · M7 graph explorer + the two scroll set-pieces.
**Signature (corrected):** the reader sees **plain certainty words** (documented · possible · apocryphal) derived from `grade`, hoverable — not colour-coded grades. Cross-linking: essay claim → grounding node → book chapter, via transclusion.
**DoD:** the parity checklist in `PARITY-BUILD-SPEC.md` Part VII passes; core readable with JS disabled; every essay claim links to its node; both set-pieces live with static fallbacks; deployed.
**Open decisions (see DECISIONS.md D-site-1..4):** Route A/B, embeddings provider, auto-linkification, archiving depth.
**Unblocks:** public presence; participation (Phase 6 optional).

---

## PHASE 6 — The umbrella & Books Two/Three  *(after Book One ships)*
Only once Book One is real. `methodology/` is already separable.
**Candidates (same method, same graph engine):** *The Administered Public* (propaganda/PR — half-built in the enactment rail), *The Administered Self* (therapy culture, human-potential movement), *The Administered Future* (transhumanism/longtermism — Huxley/Teilhard node present).
**Optional:** open the graph to **gated public contribution** (CONVENTIONS as merge gate) — the anti-conspiracy commons.
**DoD:** umbrella named; Book Two scoped as its own graph-partition sharing `methodology/` verbatim.

---

## CROSS-CUTTING RULES (apply in every phase)
- **Argument pulls research.** Expand a thread only when a render needs it or a load-bearing node is still HYPOTHESIS. Never for completeness (the encyclopedic trap — `ROADMAP.md`).
- **The grading is the deliverable, not a note on it.** No ungraded claim ships anywhere.
- **One source of truth.** Facts live in nodes; the book/essays/site *render* nodes, never fork them.
- **Every phase ends shippable.** No phase leaves the repo in a broken state.
