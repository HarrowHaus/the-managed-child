# The Managed Child — Writing System
A self-advancing, governed content pipeline, operated from Claude Code.

**The idea.** The repo writes itself under governance. Agents draft; a taste-critic and an evidence-gated grader keep it honest; a human sets the standard once (calibration) and then rules only on genuine exceptions. No chat relay, no pasting prose, no hand-grading at scale.

**Files.**
- `VOICE.md` — the enforceable voice: engineering method, the fingerprint mined from the gold essay, the banned AI-pattern list, the two registers, the critic's scoring.
- `PIPELINE.md` — the per-entry state machine, the gates, the phases, the anti-drift mechanisms.
- `WRITING-STATE.md` — the live queue; the single source of truth for progress.
- `agents/` — orchestrator, researcher, grader, carder, essayist, critic.
- `evals/two-testimonies.GOLD.md` — the gold standard the machine imitates.
- `evals/anti-patterns.md` — before/after calibration for the critic.
- `CLAUDE-ADDENDUM.md` — the block to merge into repo-root CLAUDE.md.

**Run it (from Claude Code).** After intake: do Phase 0 (calibration), then say **`advance the queue`** and keep saying it. It finishes an entry or hands you one specific decision.
