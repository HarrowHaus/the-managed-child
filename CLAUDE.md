# CLAUDE.md — project guardrail

**This file is the guardrail. It is auto-loaded every session. If any other file
contradicts it, this file wins.**

## What this repo is

This repo is **The Managed Child** — a single, self-contained project:

- the **graph** lives in `data/nodes/**` (Markdown+YAML nodes and their edges),
- the **book** lives in `book/**`,
- the **essays about the work** (thesis, lineage, method — drawing on `data/nodes/**`) live in `essays/**`; the parked **"Ask About Illuminati" media decodes** (Nemo/Dory, Cars, …) sit in `essays/_parked-decodes/`, out of the active build, to be reintroduced later (see `DECISIONS.md`),
- the **site** (the reading environment that renders all of the above) lives in `site/**`.

**On-ramp:** start at [`HANDOFF.md`](HANDOFF.md). **The repo is the single source
of truth** — not memory, not any external doc.

**Separate projects — do NOT pull them in.** This project is distinct from the
standalone **Finding Nemo / Dory** book and the standalone **Cars** book. Do not
import, merge, or cross-reference those here.

## Sources of truth (by domain)

- **Content law** → [`CONVENTIONS.md`](CONVENTIONS.md)
- **Prose voice (book & essays)** → [`VOICE.md`](VOICE.md)
- **Node schema** → [`data/schema/node-schema.md`](data/schema/node-schema.md)
- **Site build authority** → [`site/PARITY-BUILD-SPEC.md`](site/PARITY-BUILD-SPEC.md)
- **Site aesthetic** → [`site/DESIGN.md`](site/DESIGN.md)
- **Canonical visual reference** → [`site/reference-implementation.html`](site/reference-implementation.html)

## Frontend route (settled — DECISIONS.md S-11)

The reading UI is a **FORK of Gwern's open-source frontend** (CC-0/MIT),
vendored into `site/vendor/gwern/` (`js/ css/ font/ include/ template/`). We
conform our generated HTML to his class contract rather than building pop-frames
from scratch. The **backend is Astro + Node build scripts** (his Haskell/Hakyll,
nginx, `asset.php`, Python/Shell are NOT copied). **Route B** (Cytoscape /
Scrollama, clean-room) is used **only** for the graph explorer + the two scroll
set-pieces. Plan + HTML contract: [`site/FORK-PLAN.md`](site/FORK-PLAN.md).
Attribution: [`site/CREDITS.md`](site/CREDITS.md). The from-scratch M0 Astro
reading UI has been discarded and is being rebuilt on the fork.

## DESIGN DO-NOT LIST (non-negotiable)

**(a) No grade badges, no grade-colour palette.** Do NOT build "grade badges" or
any colour-coded grade palette. The internal grades (**WELD / HYPOTHESIS /
FICTION-ALERT**) are build-scaffolding the **reader never sees**.

**(b) The signature is VISIBLE VALIDITY IN PLAIN WORDS.** The reader sees a quiet
italic **certainty word** — *documented · possible · apocryphal* — **derived from
`grade` at build time**, hoverable for its definition, and **MONOCHROME**. Never
a coloured badge; never the internal WELD/HYPOTHESIS vocabulary on the page.

**(c) Gold is for the print/cover book-object ONLY.** The reading UI is
**monochrome + a single INDIGO ink-accent** — no gold badges, no brass.

**(d) Popups/popins are NOT tooltips.** They **transclude the whole target** and
**stack recursively** (open a link inside a pop-frame → another pop-frame). Build
them as pop-frames, not tooltips.

**(e) JavaScript is optional for the core reading experience.** The site must be
readable with JS disabled; JS only *enhances* (pop-frames, sidenote reflow,
toggles). If a popup is the only way to reach content, that is a parity failure.

## Writing system (how content gets made)

Content is produced by a governed pipeline, not ad-hoc. Read `VOICE.md` (the enforceable voice), `PIPELINE.md` (stages + gates + phases), and `WRITING-STATE.md` (the live queue). Long-form entries are written by the `essayist` and judged by the `critic` against `evals/two-testimonies.GOLD.md`; node cards are written by the `carder`; grades are assigned by the `grader` and require an attached primary quote (no WELD without evidence). Agents are defined in `agents/`. The operator command is **`advance the queue`**. Only two things reach a human: grade **exceptions** and **keystone** essays/chapters. Never edit `evals/` or `VOICE.md` to make a weak draft pass.

## Maintenance & governance (edges, gates, node-first)
**Never node-first.** The reading (the long-form entries in thesis order) is the front door; nodes are the depth a reader descends into, never the entry surface. Do NOT build a graph/field explorer (it manufactures the corkboard the method refutes) and do NOT adopt a half-formed "digital garden" aesthetic (maturity tags, dates-as-blog). Node expansion IS encouraged — every node earned its place — but depth must be carried by confirmed primaries, never by padding prose.
**Two kinds of gate, kept separate.** *Deterministic* checks are mechanical and pass/fail, never "smart": the grade-vocab guard, the status/workflow-token guard, the edge-lint (`EDGE-VOCABULARY.md`), link/citation integrity. *Qualitative* checks require judgment: the critic (VOICE.md), the human ruling on exceptions. Never automate the qualitative; never make the deterministic debatable.
**Edges** obey the closed vocabulary in `EDGE-VOCABULARY.md`; the build lints them.
**The maintainer** (`agents/maintainer.md`) SURFACES corpus problems into `gaps.md` and NEVER reconciles them; contradictions are ruled on by a human, and the honest resolution is often to keep the tension and mark the seam. Anything the maintainer proposes to write goes through grader → critic.
**The evidence gate is the moat.** No `documented` standing — on a node or an edge — without an attached confirming primary. This is the one thing the Karpathy/newsroom patterns lack and the thing this project cannot.

## Full-autonomy law
The standing command `autopilot` runs AUTOPILOT.md's phases to completion. agents/operator.md rules everything that formerly stopped for a human, against RULINGS.md + MASTER-PLAN Part I, logging every ruling to OPERATOR-LOG.md (provisional where novel). Nothing waits for chat. Safety invariants in AUTOPILOT.md are unoverridable. Boot order unchanged; QUEUE.md resumes any session mid-phase.
