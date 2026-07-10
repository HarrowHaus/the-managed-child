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
| the-administrators | essay | queued | elevate to gold via essayist+critic |

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
| puharich-andrija | card | drafted (committed) — core WELD; roddenberry edge = EXCEPTION |
| roddenberry-gene | card | BLOCKED — awaiting exception ruling (see Exceptions) |
| huxley-julian | card | committed (locked) |
| unesco-purpose-philosophy | card | queued (after the stop) |
| fabian-society | card | queued (after the stop) |
| webb-sidney | card | queued (after the stop) |
| wells-hg | card | committed (locked) |
| coefficients-club | card | committed (locked) |

> DoD Phase 1: both essays PASS critic; every node above committed & graded; no hollow hovers in the two essays.

## Exceptions (grades the machine couldn't resolve — HUMAN rules on these)
- **puharich-andrija → roddenberry-gene** — claim: "Gene Roddenberry attended Puharich's Ossining 'Nine' sessions in 1974–75." Sourcing is contestable-quality: *The Only Planet of Choice* (Schlemmer, 1993) records his participation but is a **partisan channeling transcript**; Jeffrey Kripal's *Mutants and Mystics* (2011) is a **reputable scholarly secondary**. No neutral primary. Grader will not resolve WELD on its own and it is not nothing → held at **HYPOTHESIS**, referred to the operator. **`roddenberry-gene` is blocked on this ruling.** (Note: the gold essay asserts this link as fact; the grader flags it as the corner's weakest weld.)

## Later phases
- Phase 2: widen — remaining nodes, essay by essay.
- Phase 3: the 13 book chapters (essayist + critic), each keystone-gated.
