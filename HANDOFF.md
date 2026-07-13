# HANDOFF — start here
*You have no prior context. This file is the whole on-ramp. Read it top to bottom once; after that you can work. Nothing important lives outside this repo. The state block in §6 is machine-generated from live repo facts — trust it over any older number you find elsewhere.*

---

## 1. What this project is (30 seconds)
A **graded knowledge graph** and a set of **readings** over it, arguing one thesis: *an old conviction — that humanity is administrable stock, to be graded and guided toward a planned end by a fit elect — was applied across the twentieth century to the child, and reverberates through the century in three registers: enacted in daylight by a mostly-secular machinery, enacted in the dark by the covert state, and articulated in the esoteric current that said out loud what the institutions did quietly.* Directed or reverberating, the record reads the same. The project's signature is that it **shows its work**: every claim is graded, every discard named, every cabal/antisemitic move refused by an explicit rule. It is the anti-conspiracy wiki. The reading environment is a fork of Gwern's frontend; the graph lives in `data/nodes/**`, the readings in `essays/**` and `READINGS.md`, the site in `site/**`.

## 2. Read order (do this once, in this sequence)
1. `CLAUDE.md` — the project guardrail (auto-loaded; wins over everything).
2. `THESIS.md` — the argument, distilled. **This is the spine.**
3. `CONVENTIONS.md` — the content law. `VOICE.md` — the enforceable prose voice. `RULINGS.md` — the standing operator rulings (R-1..R-10, R-Q1..R-Q5).
4. `EDGE-VOCABULARY.md` — the closed edge list the build lints.
5. `READINGS.md` — the live registry of readings (the doors). `OPERATOR-LOG.md` — every ruling, newest at the bottom.
6. `AUDIT.md` + `AUDIT-2.md` — where the thesis and then its governance were stress-tested; prevents re-opening settled questions.
7. `AUTOPILOT.md` — the full-autonomy phases and safety invariants. `QUEUE.md` — the live resume pointer. **This is where you start doing.**

## 3. Where truth lives (so you never guess)
| You need… | Look in |
|---|---|
| The argument | `THESIS.md` |
| The content law / the voice | `CONVENTIONS.md` / `VOICE.md` |
| The standing rulings | `RULINGS.md` (+ `OPERATOR-LOG.md` for the log) |
| A single entity's facts + edges | `data/nodes/<category>/<id>.md` |
| A generated list of all entities | `data/INDEX.md` (regenerated every build) |
| The readings (the doors) | `READINGS.md` |
| What's unverified / discarded | `research/verification-queue.md` / `research/discard-pile.md` |
| The live resume pointer | bottom of `QUEUE.md` |

If two sources ever conflict, precedence is: `CLAUDE.md` > `CONVENTIONS.md` > `THESIS.md` > `AUDIT.md` > node files > research notes. `AUDIT-2.md` documents where the older planning docs (`PLAN.md`, `TASKS.md`, `VISION.md`, `HANDOFF` §6/§8 before generation) went stale; do not treat those as current state.

## 4. How to work (the loop)
The operative command is **`autopilot`** (see `AUTOPILOT.md`); it runs the reverberation loop to completion, ruling everything through `agents/operator.md` against `RULINGS.md`.
1. Read the resume pointer at the bottom of `QUEUE.md`; take the next unfinished thread.
2. New rail → **harvester first**: web research into `research/*-harvest.md` before any node is built (no rail is built from priors).
3. Build to `CONVENTIONS`: grade every edge, name every source, declare every register (worked-off vs same-field), keep symptom-not-cause. No reader-facing `documented` without an attached primary (the moat).
4. Cluster reaches essay-density → head entry through the **two-key gate** (essayist → method-critic → operator-agent, three separate instances).
5. Build green (all guards) → commit → deploy at boundaries → log the ruling in `OPERATOR-LOG.md`.

## 5. The merge gate (non-negotiable)
A contribution enters `main` only if every new claim (a) states its **grade**, (b) names its **source**, (c) declares its **register**, and (d) does not route causation through a coded collective. Every keystone essay clears the **two-key gate**. The build enforces the deterministic half — edge-lint, index-count, grade-vocab guard — and fails on any violation. This gate is the product's armor; loosening it destroys the one thing that makes this different from the genre.

<!-- GEN:STATE:START -->
## 6. Project state & next action — GENERATED (do not hand-edit; `npm run gen-handoff`)

- **Corpus:** 133 nodes across data/nodes/**, 24 shipped reading-entries, **6 live readings**.
  - Reading I — The Managed Child
  - Reading II — The Aeon Current
  - Reading III — The Smoothing
  - Reading IV — The Recurring Doctrine
  - Reading V — The State Laboratory
  - Reading VI — The Manufactured Faiths
- **Phase:** C (the reverberation loop — a corpus that grows by documented adjacency and is re-read whole after every growth; research is NOT closed).
- **The build enforces:** edge-lint · index-count · grade-vocab guard, and the two-key gate (method-critic + operator-agent) on every keystone. These are binding law now, not future plans.
- **Your next action:** read the **resume pointer at the bottom of `QUEUE.md`** — it is the single live description of where work stands and what ships next. Do not act on any "Phase 1 / stub / research complete" language elsewhere; it is stale.
- **Open decisions (see DECISIONS.md):** D-2 (Umbrella name) · D-3 (Public + participatory, or solo?) · D-4 (Imprint/brand surface for the essays vs the book) · D-site-2 (Similar-links embeddings provider) · D-site-3 (Auto-linkification) · D-site-4 (Archiving depth).
<!-- GEN:STATE:END -->

## 7. Decisions that shape everything (see DECISIONS.md)
- **Settled:** the object is the root, not a cabal (S-2); the seed is origin-of-articulation, not cause (S-3); reverberation, not coordination (S-4); symptom, not cause (S-5); the denominator concession comes first (S-8); the site is a fork of Gwern's frontend (S-11); essays are about the work, the media decodes are parked (S-12); the prose register is intellectual history with a thesis (S-13).
- **Open — the umbrella name (D-2):** *The Managed Child* standalone, or the mechanism-name already on the homepage (*The Reverberation*) with the managed child as Reading I? The managed child is now one reading of six. This is a live operator ruling; see DECISIONS.md.
