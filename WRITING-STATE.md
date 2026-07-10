# WRITING-STATE.md — the live queue (single source of truth for progress)
*The only record of what's done and what's next. Every agent updates this. A fresh session reads this file to know exactly where we are. Status values: queued → spine → graded → drafted → critiqued → human-gate → approved → committed.*

## Phase: 0 — CALIBRATION (do first)
- [ ] Confirm critic scores evals/two-testimonies.GOLD.md = PASS and evals/anti-patterns.md "before" = REVISE
- [ ] Confirm grader blocks an unsourced WELD on a test case
- [ ] Lock VOICE.md
> Gate: do not begin Phase 1 until all three are checked.

## Phase: 1 — FIRST CORNER (depth-first)  — target: two essays + their linked nodes, whole

### Keystone essays (human-gated)
| entry | kind | status | notes |
|---|---|---|---|
| two-testimonies | essay | approved (gold) | elevated version is evals/two-testimonies.GOLD.md — replace live essay with it |
| the-administrators | essay | queued | elevate to gold via essayist+critic |

### Linked nodes for this corner (machine-drafted cards, exception-gated)
| entry | kind | status |
|---|---|---|
| the-root | card | committed (locked) |
| rule-by-trained-elite | card | queued |
| managed-child | card | queued |
| four-idiom-through-line | card | queued |
| hall-g-stanley | card | queued |
| watson-john-b | card | queued |
| terman-lewis | card | queued |
| cubberley-ellwood | card | queued |
| crowley-aleister | card | queued |
| liber-al-vel-legis | card | queued |
| besant-annie | card | queued |
| leadbeater-cw | card | queued |
| krishnamurti-jiddu | card | queued |
| order-of-the-star | card | queued |
| bailey-alice | card | queued |
| lucis-trust | card | queued |
| puharich-andrija | card | queued |
| roddenberry-gene | card | queued |
| huxley-julian | card | queued |
| unesco-purpose-philosophy | card | queued |
| fabian-society | card | queued |
| webb-sidney | card | queued |
| wells-hg | card | queued |
| coefficients-club | card | queued |

> DoD Phase 1: both essays PASS critic; every node above committed & graded; no hollow hovers in the two essays.

## Exceptions (grades the machine couldn't resolve — HUMAN rules on these)
- _(none yet)_

## Later phases
- Phase 2: widen — remaining nodes, essay by essay.
- Phase 3: the 13 book chapters (essayist + critic), each keystone-gated.
