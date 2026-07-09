# TASKS — the working queue
*Granular, checkbox-level. Work top-down within the current phase. Check the box, add follow-ups you surface, commit. `PLAN.md` holds the shape; this holds the doing. Legend: `[ ]` open · `[~]` in progress · `[x]` done.*

---

## PHASE 0 — Finalize repo & decisions
- [ ] Decide flagship: book-first or site-first (`DECISIONS.md` D-1)
- [ ] Decide umbrella name: *The Managed Child* vs Book One of *The Administered* (`DECISIONS.md` D-2)
- [ ] `git init` + first commit + push to GitHub (private)
- [ ] Add a CI/pre-commit lint of node frontmatter vs `data/schema/node-schema.md` (optional but recommended)
- [ ] Confirm collaborators (if any) have read `HANDOFF.md` + `CONVENTIONS.md`

## PHASE 1 — Atomize the graph (78 nodes → locked)
*Procedure per node in `PLAN.md` Phase 1; DoD there. Check a node when `status: locked`.*
### Batch 1 — spine concepts
- [x] `the-root` (exemplar, locked)
- [ ] `rule-by-trained-elite`  - [ ] `managed-child`  - [ ] `method-stance`  - [ ] `hard-sourcing-rule`
- [ ] `grading-system`  - [ ] `four-idiom-through-line`  - [ ] `double-parentage`  - [ ] `lifespan-continuum`
- [ ] `aeon-of-the-child`  - [ ] `permeation`  - [ ] `moonchild`
### Batch 2 — keystone people
- [ ] `crowley-aleister`  - [ ] `besant-annie`  - [ ] `huxley-julian`  - [ ] `watson-john-b`
- [ ] `parsons-jack`  - [ ] `hall-g-stanley`  - [ ] `lippmann-walter`
### Batch 3 — Rail One + four idioms
- [ ] `bailey-alice`  - [ ] `krishnamurti-jiddu`  - [ ] `leadbeater-cw`  - [ ] `steiner-rudolf`
- [ ] `puharich-andrija`  - [ ] `roddenberry-gene`  - [ ] `jung-cg`
### Batch 4 — the enactment rail
- [ ] `terman-lewis`  - [ ] `galton-francis`  - [ ] `pearson-karl`  - [ ] `bernays-edward`
- [ ] `dewey-john`  - [ ] `holt-l-emmett`  - [ ] `gesell-arnold`  - [ ] `spock-benjamin`
- [ ] `mann-horace`  - [ ] `cubberley-ellwood`
### Batch 5 — trunk + technocrats
- [ ] `webb-sidney`  - [ ] `webb-beatrice`  - [ ] `shaw-george-bernard`  - [ ] `wells-hg`
- [ ] `russell-bertrand`  - [ ] `burnham-james`  - [ ] `huxley-aldous`  - [ ] `huxley-th`
### Batch 6 — decode-prep + contested
- [ ] `campbell-joseph`  - [ ] `vogler-christopher`  - [ ] `eliade-mircea`  - [ ] `wheatley-dennis`
- [ ] `fleming-ian`  - [ ] `quigley-carroll`  - [ ] `hall-manly-p`  - [ ] `hubbard-lron`
### Batch 7 — works / institutions / events
- [ ] Works (10): `liber-al-vel-legis` … `only-planet-of-choice` (see `data/nodes/works/`)
- [ ] Institutions (10): `fabian-society` … `jwt` (see `data/nodes/institutions/`)
- [ ] Events (6): `coefficients-1902` … `krishnamurti-custody` (see `data/nodes/events/`)
### Batch 8 — edge sweep
- [ ] Every node: `welds:`/`hypotheses:` mirror body; every edge has a `register`
- [ ] Export `data/edges/adjacency.json`

## PHASE 2 — Computational layer
- [ ] Frontmatter validator (schema + dangling targets + missing register)
- [ ] Graph export (JSON/GraphML)
- [ ] HYPOTHESIS-density map → pick next deepening from it
- [ ] Centrality table + shortest-path query
- [ ] Register-over-time series

## PHASE 3 — The book (13 chapters)
- [ ] Ch 1 Humanity as Administrable Stock  - [ ] Ch 2 The Trunk  - [ ] Ch 3 The Seed
- [ ] Ch 4 The Hinge and the Four Idioms  - [ ] Ch 5 Measuring the Child  - [ ] Ch 6 Conditioning the Child
- [ ] Ch 7 Engineering Consent  - [ ] Ch 8 The Denominator  - [ ] Ch 9 Reverberation, Not Conspiracy
- [ ] Ch 10 Liberation as the First Step  - [ ] Ch 11 Nursery to Toy Aisle  - [ ] Ch 12 The Child Grown Up
- [ ] Ch 13 Either Way  - [ ] Front/back matter  - [ ] Editorial pass

## PHASE 4 — The essays
- [~] `cars-the-engine-that-prays` (in progress)
- [ ] `finding-nemo-dory` front-matter package (half-title, title page, colophon, dedication, epigraphs, TOC)
- [ ] `fantasia`  - [ ] `inside-out`  - [ ] `pokemon`  - [ ] `harry-potter`  - [ ] `nickelodeon`

## PHASE 5 — The site
*Design brief: `site/DESIGN.md` · Build plan: `site/BUILD.md`. Study set to review first: gwern.net, Public Domain Review, The Pudding, Molly White's Annotate, Stripe Press.*
- [ ] Lock exact palette hexes + self-host fonts (Spectral / EB Garamond|Cormorant / mono)
- [ ] Make ONE node page + ONE chapter beautiful (parchment/indigo) before scaling
- [ ] Grade badges + hover 'shows-its-work' popover + sidenotes (the signature)
- [ ] Choose SSG; render `data/nodes/**`  - [ ] Visible hoverable grades  - [ ] Cross-linking (essay→node→chapter)
- [ ] Interactive lifespan continuum  - [ ] Animated four-idiom through-line  - [ ] Live hypothesis-density view  - [ ] Deploy

## PHASE 6 — Umbrella & Books Two/Three
- [ ] Name the umbrella  - [ ] Scope *The Administered Public* as its own partition  - [ ] (optional) open gated contribution

---
## Backlog / surfaced follow-ups
_(add here as work surfaces new threads; promote into a phase when scheduled — see also `research/future-threads.md`)_
