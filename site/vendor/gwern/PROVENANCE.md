# Vendored: gwern.net frontend

- **Source:** https://github.com/gwern/gwern.net
- **Upstream commit:** `b1f6ebf123507077b870db9d2b287d33fae043d6` (master, shallow clone)
- **Vendored on:** 2026-07-09
- **License:** CC-0 (public domain), or MIT where CC-0 is legally problematic —
  per the gwern.net repo. Individual files carry their own headers (some third-
  party files, e.g. the original footnote-popup code, are separately public
  domain / MIT). **All upstream headers are preserved as-is** in the copied files.
- **Authors:** frontend by **Said Achmiz**; gwern.net by **Gwern Branwen**
  (plus third-party authors named in file headers).

## What was copied (`js/ css/ font/ include/ template/`)

The runtime frontend only. These are consumed by our Astro build, which emits
HTML conforming to their class contract (see `../../FORK-PLAN.md`).

## What was NOT copied (and why)

- `build/` (Haskell/Hakyll), `nginx/`, `asset.php`, and the Python/Shell tooling
  — the build-time backend. **Astro + Node build scripts replace these** (spec
  §III.A, §IV.2).
- `font/dropcap/` — ~127 MB of decorative initial-letter image/font sets. Not
  required for the reading contract (popups/sidenotes/transclusion); excluded to
  keep the repo lean. Trivially re-addable from upstream if we adopt Gwern's
  image-dropcaps later. (Our own CSS dropcap is a typographic `::first-letter`,
  not these image sets.)
- `img/`, top-level demo HTML — not part of the frontend contract.

Do not hand-edit vendored files; keep changes in our own adapter layer so the
fork can be re-synced from upstream.
