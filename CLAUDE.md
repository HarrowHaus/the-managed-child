# CLAUDE.md — project guardrail

**This file is the guardrail. It is auto-loaded every session. If any other file
contradicts it, this file wins.**

## What this repo is

This repo is **The Managed Child** — a single, self-contained project:

- the **graph** lives in `data/nodes/**` (Markdown+YAML nodes and their edges),
- the **book** lives in `book/**`,
- the **decode essays** live in `essays/**`,
- the **site** (the reading environment that renders all of the above) lives in `site/**`.

**On-ramp:** start at [`HANDOFF.md`](HANDOFF.md). **The repo is the single source
of truth** — not memory, not any external doc.

**Separate projects — do NOT pull them in.** This project is distinct from the
standalone **Finding Nemo / Dory** book and the standalone **Cars** book. Do not
import, merge, or cross-reference those here.

## Sources of truth (by domain)

- **Content law** → [`CONVENTIONS.md`](CONVENTIONS.md)
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
