# PIPELINE.md — how the encyclopedia writes itself, without drift
*The system is a governed content pipeline run from Claude Code with one operator command. This file defines the stages every entry passes through, the gates that stop bad output, the order the work happens in, and the specific mechanisms that prevent drift. `WRITING-STATE.md` is the live queue; this file is the law it runs on.*

---

## The unit: an entry
Everything is an **entry** — node, essay, or book chapter — at a different length. Each entry has a `kind` (`card` | `essay` | `chapter`) and moves through a fixed state machine. Nothing skips a stage; nothing is edited out of order.

## The per-entry state machine
```
queued → spine → graded → drafted → critiqued → HUMAN-GATE → approved → committed
```
- **queued** — exists in `WRITING-STATE.md` with a kind and a reason it's in scope.
- **spine** (`researcher`) — biographical/factual skeleton pulled; candidate edges listed; every load-bearing claim has a *fetched primary quote* attached or is marked unverified. Output is evidence, not prose.
- **graded** (`grader`) — each claim/edge assigned a grade **only if** a confirming primary quote is attached; default is HYPOTHESIS; contradictions and can't-finds go to the **exception list**. Evidence-gate.
- **drafted** — `carder` for `card` kind (plain register), `essayist` for `essay`/`chapter` kind (voiced, given the gold exemplar).
- **critiqued** (`critic`) — scored against `VOICE.md` Part E; loops draft↔critic to PASS (max 4 rounds). Taste-gate. `card` kind gets a lighter check (bans + facts only).
- **HUMAN-GATE** — a person reviews. Only two things ever reach a human: (1) the **exception list** (grades the machine couldn't resolve), and (2) **keystone entries** (the essays and any chapter where the argument is being invented, not assembled). Everything else that PASSed both gates is auto-approvable.
- **approved → committed** — written to the repo path, `WRITING-STATE.md` updated, site rebuilt/redeployed by Code.

## The operator command
From Claude Code: **`advance the queue`**. The `orchestrator` takes the next entry, runs its stages in order, stops at the first gate it cannot clear on its own (an exception, a keystone, or 4 failed critic rounds), reports, and waits. One command; it either finishes an entry or hands you a specific decision.

---

## The macro phases (the order corners get built)

**Phase 0 — Calibration (once, human-in-loop). Do this before anything scales.**
- Lock `VOICE.md`. Confirm the `critic` scores `evals/two-testimonies.GOLD.md` as PASS and the `evals/anti-patterns.md` "before" samples as REVISE. If it can't, tune the critic prompt until it can.
- Confirm the `grader` refuses to assign WELD without an attached quote on a test case.
- **DoD:** critic agrees with the gold/anti-pattern verdicts; grader blocks an unsourced WELD. Only then proceed.

**Phase 1 — The first corner (depth-first). The finishable target.**
- Scope = the two essays (`the-administrators`, `two-testimonies`) elevated to gold, **plus** the ~15–20 nodes those essays hover-link, fully carded and graded.
- Essays are keystones (human-gated); their linked nodes are cards (machine-drafted, exception-gated).
- **DoD:** every popup inside the two essays lands on a real graded card; the two essays PASS the critic; the site shows one complete neighborhood, no hollow hovers.

**Phase 2 — Widen, corner by corner.**
- Each additional essay + the nodes it links, same loop. Never open a new corner until the current one hits DoD. Reuse already-built nodes; only new links pull new cards.

**Phase 3 — The book (long-form, last).**
- The 13 chapters, `essayist` + `critic`, each keystone-gated. They assemble from now-solid nodes rather than researching from zero.

---

## Anti-drift mechanisms (why this holds together)
1. **One queue, one truth.** `WRITING-STATE.md` is the only record of what's done and what's next. No entry is "in progress" anywhere else. A fresh Claude Code (or chat) session reads it and is instantly current — compaction cannot lose state because state isn't in the session.
2. **The eval anchor.** Every essay is measured against `evals/two-testimonies.GOLD.md`, not against the model's drifting sense of "good." The gold file is versioned; changing the voice means editing it deliberately, not letting it slide.
3. **Mechanical gates, not vibes.** The evidence-gate (grader) and taste-gate (critic) are pass/fail with quoted reasons. Drift shows up as a failed gate, visibly, not as slow quality rot.
4. **Idempotent, single-entry advance.** The orchestrator advances one entry at a time and re-runs a stage cleanly if repeated. No batch that silently degrades.
5. **Two human gates, narrow and fixed.** Humans touch only grade-exceptions and keystones. This is the moat, and it's small enough to actually sustain. Everything else is automated, so attention isn't diluted across 78 stubs.
6. **Register separation (`VOICE.md` Part D).** Card register and essay register are written by different agents into different slots. The most common "robotic" failure — essay voice bled into cards or card flatness bled into essays — is structurally prevented.
7. **CLAUDE.md constitution.** The repo-root guardrails (no gold badges, plain certainty words, JS-optional core) plus this pipeline are loaded every session, so a new agent can't reinvent the rules.

## What a human must never let the machine do
- Ship a WELD without an attached, confirmed primary quote. (Grader hard-gate; human confirms exceptions.)
- Publish a keystone essay the critic hasn't PASSed.
- Silently rewrite the gold essay to make a weak draft "pass." Changing the standard is a deliberate, logged edit to `evals/`, never a shortcut.
