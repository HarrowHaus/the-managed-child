# PARITY CORRECTION — audit outcome & change log
*What the original handoff repo needed vs. the corrected Gwern-parity build spec, and exactly what was changed. Date: 2026-07.*

## Verdict
The **content and discipline layers were correct and were left untouched**: all 78 nodes, 13 chapters, `CONVENTIONS.md`, `THESIS.md`, `AUDIT.md`, `map/`, `research/`, `methodology/`, essays. The corrections were confined to the **site/build layer**, where two real conflicts existed.

## The two conflicts found
1. **DESIGN.md contradicted itself.** §2 said "Gwern-parity, no gold badges," but §2a/§3/§4 still defined a **gold grade-badge palette** and called it "the signature." → Reconciled: gold is **print/cover only**; the reading-UI accent is **indigo**; the signature is **plain certainty words**, no colour-coded grades.
2. **Schema mismatch.** The first draft spec referenced `certainty`/`edges`/`abstract`, but the 78 real nodes use `grade`/`welds`/`hypotheses`. → Reconciled **without re-authoring any node**: reader-facing `certainty` is now **derived from `grade`** at build; `edges` = `welds` + `hypotheses`; the "transmission" axis = the edge-level `register` field; `abstract` added as optional with a body-paragraph fallback.

## M0 build (2026-07) — skeleton
The Astro project was built under `site/astro/` per spec Part VI M0. Notes:
- **Content stays authoritative.** No node/chapter source file was edited. The
  `glob` loader reads `data/nodes/**` and `book/chapters/**` in place.
- **Signature enforced in the pipeline.** `src/lib/certainty.ts` derives the
  plain certainty word from `grade`; a remark plugin
  (`src/lib/remark-strip-scaffolding.mjs`) strips authoring scaffolding from
  rendered bodies (the leading standing blockquote, `[WELD]`/`[HYPOTHESIS]`
  heading tags, whole-italic stub guidance, and the empty section headings left
  behind) so the internal grade vocabulary never reaches the reader.
- **Known exception:** the `grading-system` node's own body is *about* the grade
  vocabulary ("WELD/HYPOTHESIS/FICTION-ALERT; the grading is the argument"), so
  those words appear there by authorial intent, not as a leak. Left as-is.
- **Verified:** clean build of 92 pages, `astro check` clean (0/0/0), and the
  node page renders fully with JavaScript disabled (control bar self-hides).

## Changes made (REPLACE / MODIFY / ADD / KEEP)
**ADDED to `site/`:**
- `PARITY-BUILD-SPEC.md` — authoritative backend+frontend audit + build spec (M0–M7, schemas, acceptance criteria).
- `GWERN-AUDIT.md` — the UX/feature audit (why popups/transclusion are the point).
- `reference-implementation.html` — working seed: recursive popins, certainty words, dark/reader/pops controls.
- `CREDITS.md` — attribution scaffold (esp. Route A: Gwern JS is CC-0/MIT).
- `PARITY-CORRECTION-LOG.md` — this file.

**MODIFIED:**
- `site/DESIGN.md` — removed the gold grade-badge contradiction (§2a bullet, §3 palette); accent → indigo; reader-facing grade→certainty renames (§4); added a build-authority pointer up top.
- `site/BUILD.md` — rewritten to defer to the spec; corrected stack (popups/transclusion/sidenotes, progressive enhancement, Route A/B) and the signature.
- `site/README.md` — rewritten as the site read-order/orientation.
- `data/schema/node-schema.md` — **additive:** grade→certainty derivation table (covers WELD-verified/parallel, FRAME, PRINCIPLE), optional `abstract`, the two-axis (node register vs edge transmission) note, edges-for-build note. No existing node changes.
- `PLAN.md` — Phase 5 rewritten to the parity milestones; Phase 2 cross-referenced to the site build pipeline.
- `DECISIONS.md` — added D-site-1..4 (Route A/B, embeddings, auto-linkify, archiving); added a rider to S-6 (plain words, not gold badges).
- `README.md` — layout block now shows the built-out `site/`; note that grades render as plain certainty words.

**KEPT (superseded-but-retained):**
- `site/style-tile.html` — the earlier monochrome tile; retained as reference, not authoritative.

**UNCHANGED (correct as-is):** everything under `data/nodes/**`, `book/**`, `essays/**`, `map/**`, `research/**`, `methodology/**`, plus `THESIS.md`, `AUDIT.md`, `CONVENTIONS.md`, `HANDOFF.md`, `VISION.md`, `ROADMAP.md`, `TASKS.md`.

## Precedence (unchanged, extended)
For the site build specifically: `PARITY-BUILD-SPEC.md` > `data/schema/node-schema.md` > `DESIGN.md` > `BUILD.md`. Repo-wide precedence in `HANDOFF.md` §3 still governs content.
