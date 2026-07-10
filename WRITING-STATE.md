# WRITING-STATE.md — the live queue (single source of truth for progress)
*The only record of what's done and what's next. Every agent updates this. A fresh session reads this file to know exactly where we are. Status values: queued → spine → graded → drafted → critiqued → human-gate → approved → committed.*

## Phase: 0 — CALIBRATION (do first)
- [x] Confirm critic scores evals/two-testimonies.GOLD.md = PASS and evals/anti-patterns.md "before" = REVISE
- [x] Confirm grader blocks an unsourced WELD on a test case
- [x] Lock VOICE.md
> Gate: do not begin Phase 1 until all three are checked. — CLEARED 2026-07-10 (operator-confirmed).

## Phase: 1 — FIRST CORNER (depth-first)  — target: two essays + their linked nodes, whole

### Keystone essays (human-gated)
| entry | kind | status | notes |
|---|---|---|---|
| two-testimonies | essay | committed (gold live) | essays/two-testimonies.md is the gold |
| the-administrators | essay | committed (gold live) | PASSed critic 2026-07-10; operator-approved; two live quote-integrity fixes + one banned-word fix |

### Linked nodes for this corner (machine-drafted cards, exception-gated)
| entry | kind | status |
|---|---|---|
| the-root | card | committed (locked) |
| rule-by-trained-elite | card | committed (locked) |
| managed-child | card | committed (locked) |
| four-idiom-through-line | card | committed (locked) |
| hall-g-stanley | card | drafted (committed) |
| watson-john-b | card | drafted (committed) |
| terman-lewis | card | drafted (committed) |
| cubberley-ellwood | card | drafted (committed) |
| crowley-aleister | card | drafted (committed) |
| liber-al-vel-legis | card | drafted (committed) |
| besant-annie | card | drafted (committed) |
| leadbeater-cw | card | drafted (committed) |
| krishnamurti-jiddu | card | drafted (committed) |
| order-of-the-star | card | drafted (committed) |
| bailey-alice | card | drafted (committed) |
| lucis-trust | card | drafted (committed) |
| puharich-andrija | card | drafted (committed) — core WELD; roddenberry edge ruled documented |
| roddenberry-gene | card | drafted (committed) — documented per operator ruling 2026-07-10 |
| huxley-julian | card | committed (locked) |
| unesco-purpose-philosophy | card | drafted (committed) |
| fabian-society | card | drafted (committed) |
| webb-sidney | card | drafted (committed) |
| wells-hg | card | committed (locked) |
| coefficients-club | card | committed (locked) |
| lippmann-walter | card | drafted (committed) |
| huxley-th | card | drafted (committed) |
| russell-bertrand | card | drafted (committed) — honesty case: quotes verbatim, "advocate" framing falsified |

> DoD Phase 1: **MET (2026-07-10).** Both corner essays PASS the critic (two-testimonies gold live; the-administrators PASSed + operator-approved). Every node linked by the two essays is committed & graded — zero stubs, zero hollow hovers. Zero internal grade vocabulary across all 94 built pages.

## Exceptions (grades the machine couldn't resolve — HUMAN rules on these)
- **[RULED 2026-07-10] puharich-andrija → roddenberry-gene** — claim: "Gene Roddenberry attended Puharich's Ossining 'Nine' sessions in 1974–75." Sourcing: *The Only Planet of Choice* (Schlemmer, 1993), a partisan channeling transcript, + Jeffrey Kripal's *Mutants and Mystics* (2011), a reputable scholarly secondary; no neutral primary. **Operator ruling: promote to documented** (Kripal + transcript accepted as sufficient). Edge carded WELD (worked-off) on both `puharich-andrija` and `four-idiom-through-line`; `roddenberry-gene` carded as documented. The *further* claim that the sessions shaped *Star Trek*'s cosmology remains discarded.

## Phase: 2 — WIDEN, corner by corner

### Corner 2 — articulation (the four idioms)
| entry | kind | status | notes |
|---|---|---|---|
| the-four-idioms | essay | committed (gold live) | PASSed critic + operator-approved 2026-07-10; pure reuse, zero new cards; seam load-bearing; puharich weight = documented attendance only |

> Chosen for maximum overlap with corner 1: all 11 linked nodes (crowley, liber-al, besant, order-of-the-star, leadbeater, krishnamurti, bailey, lucis-trust, puharich, roddenberry, four-idiom-through-line) were already graded — no new carding. Reader-facing essay: `essays/the-four-idioms.md` (essay register). Book chapter `04-the-hinge-and-the-four-idioms` (sober register) remains a Phase-3 stub.

### Corner 3 — administrators (the trunk)
| entry | kind | status | notes |
|---|---|---|---|
| permeation | card | drafted (committed) | WELD; Webb "inevitability of gradualness" (26 Jun 1923) + Cole "honeycombing" (1961); no exception |
| the-trunk | essay | committed (gold live) | PASSed critic (round 1) + operator-approved 2026-07-10; seam = continuity without direction (real tradition, not a directed relay) |

> Reader-facing essay: `essays/the-trunk.md` (essay register). Book chapter `02-the-trunk` (sober register) remains a Phase-3 stub. One new card (`permeation`); the other four nodes reused from corner 1.

### Corner 4 — articulation seed (closes the articulation rail)
| entry | kind | status | notes |
|---|---|---|---|
| aeon-of-the-child | card | drafted (committed) | WELD; Liber AL Ch. III + I:49; three-aeon doctrine (Isis/Osiris/Horus) verified; no exception |
| the-seed | essay | committed (gold live) | PASSed critic (round 1) + operator-approved 2026-07-10; Crowley held to testimony, not cause; seed of the confession, not the machinery |

> Reader-facing essay: `essays/the-seed.md` (essay register). Book chapter `03-the-seed` (sober register) remains a Phase-3 stub. Articulation rail now complete: the-seed (Crowley/Aeon) + the-four-idioms (the whole through-line).

### Priority (operator directive 2026-07-10): light the two rails the book most needs BEFORE any Phase-3 chapter
Advance the cheapest-overlap corner toward these each session; stop at exceptions/keystones.

#### Corner 5 — enactment (measuring the child) ✅ DONE
| entry | kind | status | notes |
|---|---|---|---|
| galton-francis | card | drafted (committed) | WELD; coined "eugenics" (Inquiries, 1883); no exception |
| pearson-karl | card | drafted (committed) | WELD; first Galton Professor of Eugenics (1906); no exception |
| measuring-the-child | essay | committed (gold live) | PASSed critic (round 1) + operator-approved 2026-07-10; denominator concession early; eugenics = co-symptom; Galton→Terman held same-field |

#### Corner 6 — consent (engineering consent) ✅ DONE
| entry | kind | status | notes |
|---|---|---|---|
| dewey-john | card | drafted (committed) | WELD; The Public and Its Problems (1927), public "in eclipse"; no exception |
| lippmann-dewey-debate | card | drafted (committed) | WELD; positions documented, adversarial "debate" corrected as later reframing; no exception |
| engineering-consent | essay | committed (gold live) | PASSed critic (round 1) + operator-approved 2026-07-10; double discipline (no cabal needed; the "debate" is a retrospective invention) |

> Both book-priority rails now have a gold anchor: enactment (measuring-the-child) + consent (engineering-consent).

#### Corner 7 — the Root essay ✅ DONE
| entry | kind | status | notes |
|---|---|---|---|
| humanity-as-administrable-stock | essay | committed (gold live) | PASSed critic (round 1) + operator-approved 2026-07-10; pure reuse (the-root + rule-by-trained-elite), zero new cards; states the central discipline (impulse not cabal; forbidden causal move) |

## Finish-line sequencing (operator directive 2026-07-10) — NOT pure cost order
Do the enactment/lifespan corners next to light the last rail and build the card library; SAVE the method essays for last (strongest over a fully-graded graph). Cheapest-overlap within each group.

### Group A — enactment / lifespan (in progress)
- ✅ **nursery-to-toy-aisle (11)** — DONE: fcc-1984 carded; essay gold 2026-07-10.
- ✅ **conditioning-the-child (06)** — DONE: holt-l-emmett + psychological-care + jwt carded (WELD); essay gold + operator-approved 2026-07-10. Little Albert held to contested per operator flag; evidence rests on published advice (Holt schedule + Watson's detachment text).
- ✅ **the-denominator (08)** — DONE: mann-horace + gesell-arnold + spock-benjamin carded (WELD); essay gold + operator-approved 2026-07-10. Base rate carries the essay's full weight; esoteric held to a thin tributary; the "denominator error" named.
- ✅ **the-child-grown-up (12)** — DONE: lifespan-continuum + campbell-joseph + vogler-christopher carded; essay gold + operator-approved 2026-07-10. Monomyth held contested; Vogler's industrial adoption the load; no roddenberry upgrade. **Group A complete.**

### Group B — method essays (SAVE for last, write over the fully-graded graph)
- reverberation-not-conspiracy (09): 1 new (method-stance)
- liberation-as-the-first-step (10): 2 new (double-parentage, krishnamurti-custody)
- either-way (13): 2 new (grading-system, method-stance [shared w/09])

> Finish line from here: 7 essays / ~13 distinct new cards. After Group A + B, all 13 chapter themes have a gold essay-about-the-work, every rail is gold, zero hollow hovers.

## Later phases
- Phase 3: the 13 book chapters (essayist + critic), each keystone-gated.
