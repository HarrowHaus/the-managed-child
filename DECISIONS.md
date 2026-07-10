# DECISIONS — settled and open
*So nothing is re-litigated and nothing is lost. **Settled** decisions carry their rationale (don't reopen without new evidence). **Open** decisions carry their options and implications (yours to make).*

---

## SETTLED (do not reopen without new evidence)

**S-1 · The "either way" frame is foundational.** The thesis stays agnostic on mechanism (directed vs reverberation). The decodes and the lineage stand regardless. *Rationale: it's not a hedge; for the A/B relationship it is the correct epistemic position (AUDIT Joint 2).*

**S-2 · The object is the root, not occultism or a cabal.** The thesis is *humanity as administrable stock, guided by an elect.* Occult and sociological are two registers of it. *Rationale: resolves the deepest audit joint; keeps the work out of the genre it studies.*

**S-3 · The seed is origin-of-articulation, not cause.** Crowley is prophet-and-pedagogue of the Aeon of the Child; no transmission line runs into the child-institutions. *Rationale: AUDIT Joint 1; the evidence supports articulation, not causation.*

**S-4 · Reverberation, not coordination.** Influence = working-off; no coordination or stated intent required. Distinguish worked-off from same-field. *Rationale: AUDIT Method Stance; demanding coordination imports the conspiracy bar.*

**S-5 · Hard Sourcing Rule: symptom, not cause.** Include ugly beliefs as record; never route causation through a coded (ethnic/financier/bloodline) collective. *Rationale: the razor between intellectual history and the pathology it studies.*

**S-6 · The grading is the argument.** Every edge graded; every discard named. This discipline is the moat, made visible, not hidden. *Rationale: the only durable differentiator in this genre.*
> *Rider (site, 2026): "made visible" means the reader sees **validity in plain words** — documented · possible · apocryphal — derived from `grade`, hoverable, monochrome. It does **not** mean colour-coded grade badges or the internal WELD/HYPOTHESIS vocabulary on the page. See `site/PARITY-BUILD-SPEC.md` §IV.16 and `data/schema/node-schema.md`. Do not re-introduce gold grade badges citing S-6.*

**S-7 · Voice wall.** Book = sober register; essays = inhabited voice; all apparatus stripped at conversion; seam carried inside prose. *Rationale: standing project directive.*
> *Rider (2026-07-09): "inhabited voice" means the author's **judgment** is present, not the author's **person**. It is not licence for first-person reader-address or reaction-coaching. See S-13 and `VOICE.md`.*

**S-8 · The denominator concession comes first.** Most of the managed child was built by secular actors; the esoteric current is a high-altitude minority tributary. *Rationale: AUDIT Joint 4; it earns the reader's trust.*

**S-9 · The repo is the source of truth; chat is disposable.** Facts live in nodes; book/essays/site render nodes. *Rationale: this handoff.*

**S-10 · Build sequence: content-spine → site core → essays → book** *(settled 2026-07-09; resolves D-1).* Not pure book-first nor pure site-first — a hybrid: (1) lock ~5–10 keystone nodes; (2) build the website core (spec M0–M3) against them; (3) run the essay series (each essay pulls the nodes it needs into `locked`); (4) write the book last. *Rationale: the site renders content, so seed a little first; essays are shorter, ship fast, build audience, and populate/stress-test the site; the book is the flagship in importance but benefits from every node the essays force to lock plus a site that already renders it. Named risk: don't let site-building become avoidance of the writing.* **Executor note:** the website is built in **Claude Code** (operates directly on the repo). The tool used for the *writing* (chat vs Cowork vs Code) is deliberately **left open — chosen per session**, not fixed here.

**S-11 · Frontend route: FORK Gwern's frontend wholesale; B only for the bespoke** *(settled 2026-07-09; **revised 2026-07-09** — fork, not adapt; resolves D-site-1).* **The reading core is now a FORK of Gwern's open-source frontend** (his site is CC-0/MIT): we vendor his `js/`, `css/`, `font/`, `include/`, and `template/` wholesale into `site/vendor/gwern/` and conform our generated HTML to his class contract, rather than hand-adapting a handful of modules. The **backend is replaced by Astro** (his Haskell/Hakyll pipeline, nginx, `asset.php`, and Python/Shell are NOT copied — Astro + Node build scripts do that job per spec §III.A/§IV.2). **Route B** (clean-room, standard libs — Cytoscape/d3-force, Scrollama/D3/GSAP) is kept **ONLY** for the **graph explorer** and the **two scroll set-pieces** — surfaces Gwern has no equivalent for. *Rationale: forking the whole battle-tested frontend gets genuine parity behaviour (recursive pop-frames, footnote↔sidenote reflow, the content-inject lifecycle) far faster and more reliably than re-adapting pieces; the real work is conforming our HTML/annotation snippets to his contract. Integration rule unchanged: Route-B surfaces reuse the forked pop-frame (e.g. hovering a graph node pops its annotation).* Plan: `site/FORK-PLAN.md`. Preserve all Gwern licences/attribution headers; credit in `site/CREDITS.md`. *(Prior wording "adapt selected modules" superseded; the earlier from-scratch M0 Astro reading UI is discarded and rebuilt on the fork.)*

**S-12 · Essays = essays about the website's material; the media decodes are parked** *(settled 2026-07-10.)* An **essay** in this project is an essay **about the work itself** — the thesis, the lineage, the method — drawing on `data/nodes/**` and linking each claim back to the reference node that grounds it. The **"Ask About Illuminati" children's-media decode series** (Finding Nemo / Dory, Cars, Fantasia, Inside Out, Pokémon, Harry Potter, Nickelodeon) is **NOT** what "essays" means for the active build: it is **parked** in `essays/_parked-decodes/` (nothing deleted), **excluded from the site build** (the `_` prefix keeps it out of Astro's content layer; the essays collection also negates the path), and **reintroduced later**, not now. *Rationale: the site is the reference/argument about the lineage; the essays layer should reinforce that, not divert into the media brand before the core is built. The decodes remain valuable and return once the work-about-the-work layer exists.* Supersedes the earlier framing (ROADMAP "Tier 2 — the essay series", PLAN Phase 4) that treated the decodes as *the* essays.

**S-13 · The prose register is intellectual history with a thesis; `VOICE.md` is its source of truth** *(settled 2026-07-09.)* The essay voice is **declarative, evidence-forward, and impersonal**: state the claim, lay the evidence, connect the dots, stop. **Banned:** second person, first-person staging ("I want you to…", "I can feel how that reads"), reaction-coaching ("sit with that", "read that twice"), throat-clearing openings, and closing reassurance. The project's honesty disciplines — the denominator, symptom-not-cause, association≠coordination, testimony-not-cause — are written as **findings the record forces, never as the author's self-policing**; a constraint stated as a confession invites doubt, the same constraint stated as a finding earns trust. Certainty is carried by ordinary sourcing phrases ("published under his own name", "no documented tie exists"), never by a bracketed grade. Adjectives may rate **evidence** (*damning*, *unassailable*) but never **emotions** (*chilling*, *disturbing*). Confidence in connecting documented chains is **required**, not optional — timidity is a failure mode; what is forbidden is asserting a connection the graph grades as unproven. *Rationale: the first draft of `essays/the-administrators.md` misread S-7's "inhabited voice" as first-person reader-address and produced prose that was meta about itself; the rewrite established the correct register, and this decision captures it so it is not relitigated.* Full spec + before/after examples: `VOICE.md`. Exemplar in the register: `essays/the-administrators.md`.

---

## OPEN (make when ready; the plan proceeds either way)

**D-1 · Flagship / sequence.** ✅ **RESOLVED → S-10** (content-spine → site core → essays → book).

**D-2 · Umbrella name.**
- *Option A:* keep it *The Managed Child*, standalone. Simpler; ships one thing.
- *Option B:* name an umbrella (working: *The Administered*) with *The Managed Child* as Book One; reserves room for Books Two/Three (public/self/future) that the root already implies.
- *Implication:* affects repo naming, the site's top-level IA, and how `methodology/` is framed. **Recommendation on file:** Option B — the root is bigger than the child; name the territory, ship the beachhead first.

**D-3 · Public + participatory, or solo?** (defer until after Book One)
- Gated public contribution (CONVENTIONS as merge gate) = the anti-conspiracy commons; novel, but adds moderation load.
- Solo = full control, slower reach.
- *Implication:* only relevant at Phase 6; noted so it isn't forgotten.

**D-4 · Imprint/brand surface for the essays vs the book.** Trestleboard Editions (books, "The Gilded Deep" identity) vs "Ask About Illuminati" (series). Decide whether the site unifies them or keeps them as distinct storefronts. *Defer to Phase 5.*

---

## OPEN — site build (surfaced by `site/PARITY-BUILD-SPEC.md`; decide at Phase 5)

**D-site-1 · Frontend route: adapt Gwern's OSS modules (A) or clean-room (B)?** ✅ **RESOLVED → S-11** (Route A for the reading core; Route B for the graph explorer + scroll set-pieces).

**D-site-2 · Similar-links embeddings provider** (hosted API vs local model). Low stakes; swappable. *Recommendation: whatever is cheapest to run in a build script.*

**D-site-3 · Auto-linkification** (`LinkAuto.hs` equivalent) on or off. *Recommendation: off until review tooling exists — false-positive links erode trust.*

**D-site-4 · Archiving depth** (full local snapshots vs recorded archive URLs). *Recommendation: record archive URLs first (`sources[].archived`), full snapshots later.*

---
*When you make an open decision: move it to SETTLED with a one-line rationale and the date. That's the whole ritual.*
