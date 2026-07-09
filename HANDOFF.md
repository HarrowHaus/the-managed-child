# HANDOFF — start here
*You have no prior context. This file is the whole on-ramp. Read it top to bottom once; after that you can work. Nothing important lives outside this repo.*

---

## 1. What this project is (30 seconds)
A **graded knowledge graph** arguing one thesis: *the managed child is what happens when the conviction that humanity is administrable stock is applied to the young — enacted by a mostly-secular machinery, and confessed, in its most self-aware form, by an esoteric current.* Directed or reverberating, the record reads the same. The project's signature is that it **shows its work**: every claim is graded, every discard named, every cabal/antisemitic move refused by an explicit rule. It is the anti-conspiracy wiki.

## 2. Read order (do this once, in this sequence)
1. `README.md` — the map of the repo.
2. `THESIS.md` — the argument, distilled. **This is the spine.**
3. `CONVENTIONS.md` — the grading discipline. **This is the law.** You cannot contribute correctly without it.
4. `map/lineage-map.md` — the full narrative of the evidence (long; the source most node entries are drawn from).
5. `AUDIT.md` — where the thesis was stress-tested and how each weakness was resolved. Prevents you from re-opening settled questions.
6. `VISION.md` — what this can become beyond Book One.
7. `PLAN.md` — the complete phased plan to finished products.
8. `TASKS.md` — the granular, current work queue. **This is where you start doing.**
9. `DECISIONS.md` — what's settled (don't re-litigate) and what's still open (your call to make).

## 3. Where truth lives (so you never guess)
| You need… | Look in |
|---|---|
| The argument | `THESIS.md` |
| The rules of engagement | `CONVENTIONS.md` |
| The evidence, narrated | `map/lineage-map.md` |
| A single entity's facts + edges | `data/nodes/<category>/<id>.md` |
| A quick list of all entities | `data/INDEX.md` |
| What's been tried and rejected | `research/discard-pile.md` |
| What's unverified | `research/verification-queue.md` |
| What could be built next | `research/future-threads.md` |
| The plan / the queue / the decisions | `PLAN.md` / `TASKS.md` / `DECISIONS.md` |

If two sources ever conflict, precedence is: `CONVENTIONS.md` > `THESIS.md` > `AUDIT.md` > `map/lineage-map.md` > node files > research notes.

## 4. How to work (the loop)
1. Pick the top open item in `TASKS.md`.
2. Do it **to CONVENTIONS**: grade every edge, name every source, declare every register (worked-off vs same-field), keep symptom-not-cause.
3. If it's a node: move its `status:` stub → drafted → locked; mirror `welds:`/`hypotheses:` in frontmatter and body.
4. If a claim can't be graded, it goes to `research/verification-queue.md`, not into a documented core.
5. Update `TASKS.md` (check the box, add any follow-ups surfaced).
6. Commit. One logical change per commit; message names the node/chapter/decision touched.

## 5. The merge gate (non-negotiable)
A contribution enters `main` only if every new claim (a) states its **grade**, (b) names its **source**, (c) declares its **register**, and (d) does not route causation through a coded collective. If it can't, it isn't ready. This gate is the product's armor; loosening it destroys the one thing that makes this different from the genre.

## 6. Project state, right now
- Research: **complete** (8 campaigns). Thesis: **consolidated**. Audit: Joints 1–4 **resolved**, Joint 5 is a decode-constraint only.
- Repo: **scaffolded** — 78 node files (mostly stubs, metadata complete), 13 chapter stubs, essay stubs, full planning layer.
- **The unfinished part is the product, not the research.**

## 7. Decisions that shape everything (see DECISIONS.md)
- **Flagship / sequence:** ✅ settled (S-10) — content-spine → site core → essays → book.
- **Frontend route:** ✅ settled (S-11) — Route A (adapt Gwern) for the core, Route B for the graph + set-pieces.
- **Still open — umbrella name:** is this *The Managed Child* (standalone) or Book One of *The Administered*? (D-2.) Plus the deferred site decisions D-site-2..4. Make them when ready; the plan proceeds either way.

## 8. Your next action if you read nothing else
Open `TASKS.md`, take **Phase 1, item 1** (node atomization, highest-priority batch), and take one stub node to `locked` following `CONVENTIONS.md`. That is always a safe, correct first move.
