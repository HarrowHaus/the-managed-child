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
