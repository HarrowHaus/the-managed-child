# CREDITS & ATTRIBUTION
*The reading UI is a fork of Gwern's frontend (DECISIONS.md S-11).*

## Forked: gwern.net frontend
The gwern.net frontend (frontend by **Said Achmiz**; gwern.net by **Gwern
Branwen**) is released under **CC-0** (public domain), or **MIT** where CC-0 is
legally problematic — per the `gwern/gwern.net` repo. Some files carry their own
third-party headers (e.g. the original footnote-popup code, public domain).

- **Vendored into:** [`vendor/gwern/`](vendor/gwern/) — `js/ css/ font/ include/ template/`.
- **Upstream commit:** `b1f6ebf123507077b870db9d2b287d33fae043d6` (2026-07-09).
- **Preserved:** every upstream licence/attribution header is kept verbatim; we
  do not hand-edit vendored files (adapters live in our own layer).
- **Excluded:** the Haskell/Hakyll build, nginx, `asset.php`, Python/Shell (Astro
  replaces them), and `font/dropcap/` (~127 MB decorative images). See
  [`vendor/gwern/PROVENANCE.md`](vendor/gwern/PROVENANCE.md).
- Credit **Said Achmiz** (frontend) and **Gwern Branwen** (gwern.net) in the
  site footer/colophon.

## Study references (not vendored, studied for design)
gwern.net · Public Domain Review · The Pudding · Stripe Press · Molly White's "Annotate."

## Our own
Content, thesis, and node graph © the project. Visual identity "The Gilded Deep" (print/cover) is bespoke; reading UI is Gwern-parity monochrome + indigo accent.
