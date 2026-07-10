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

### Next candidates (by corner-1 reuse; see analysis 2026-07-10)
- the-trunk (02): 4 reuse, 1 new (permeation)
- the-seed (03): 2 reuse, 1 new (aeon-of-the-child)
- measuring-the-child (05): 2 reuse, 2 new (galton-francis, pearson-karl)

## Later phases
- Phase 3: the 13 book chapters (essayist + critic), each keystone-gated.
