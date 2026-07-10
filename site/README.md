# SITE (Tier 3)
The container that cross-links reference (`data/nodes`) + argument (`book`) + essays about the work (`essays`) into a **Gwern-parity reading environment**. (Essays here = essays about the thesis/lineage/method; the "Ask About Illuminati" media decodes are parked in `essays/_parked-decodes/`, out of the build — DECISIONS.md S-12.)

**Read in this order:**
1. [`PARITY-BUILD-SPEC.md`](PARITY-BUILD-SPEC.md) — the authoritative backend+frontend stack audit and the full build spec (schemas, milestones, acceptance criteria). **Build from this.**
2. [`GWERN-AUDIT.md`](GWERN-AUDIT.md) — why the popup/transclusion system is the whole point (the UX audit).
3. [`DESIGN.md`](DESIGN.md) — the aesthetic brief (Gwern-parity restraint + "The Gilded Deep" as a whisper).
4. [`BUILD.md`](BUILD.md) — one-page orientation.
5. [`reference-implementation.html`](reference-implementation.html) — a working page: recursive popins, certainty words, dark/reader/pops controls. Open it in a browser.

The schema is already site-ready: an SSG reads node frontmatter directly. The signature is **visible validity in plain words** (documented · possible · apocryphal) — never gold badges. Build after a book spine + ≥2 essays exist (per `PLAN.md` Phase 5).
