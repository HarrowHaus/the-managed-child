# CREDITS & ATTRIBUTION
*Required especially under Route A (adapting Gwern's frontend).*

## Build status (as of M0 — skeleton)
The Astro project (`site/astro/`) renders the content collections into static
pages with the monochrome type system, dark mode, and control bar. **No Gwern
frontend JS has been vendored yet** — M0 ships effectively zero client JS (only
the theme/reader toggles). The pop-frame + transclusion + sidenote core (the
Route A vs B decision, D-site-1) is deferred to M1–M4; the CSS/HTML class
contract and the certainty signature were adapted from this repo's own
`site/reference-implementation.html`. Update the section below once any Gwern
module is actually vendored. Fonts are self-hosted via **Fontsource** (Source
Serif 4, EB Garamond, Source Sans 3, JetBrains Mono — OFL).

## If Route A (adapting Gwern.net frontend modules)
The gwern.net frontend (by **Said Achmiz**, for **Gwern Branwen**) is released under **CC-0**, or **MIT** where CC-0 is legally problematic (see the `gwern/gwern.net` repo). If we vendor/adapt any of `transclude.js`, `extracts.js`, `popups.js`, `popins.js`, `popovers.js`, `sidenotes.js`, `rewrite.js`, `typography.js`, `reader-mode.js`, or the `GW` event core:
- Preserve each file's original licence header and attribution.
- Record here: which modules were vendored, from which commit, and any modifications.
- Credit Said Achmiz (frontend) and Gwern Branwen (gwern.net) in the site footer/colophon.

## Study references (not vendored, studied for design)
gwern.net · Public Domain Review · The Pudding · Stripe Press · Molly White's "Annotate."

## Our own
Content, thesis, and node graph © the project. Visual identity "The Gilded Deep" (print/cover) is bespoke; reading UI is Gwern-parity monochrome + indigo accent.
