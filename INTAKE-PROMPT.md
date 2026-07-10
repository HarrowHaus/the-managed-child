# INTAKE — paste this into Claude Code (with the zip attached)

I'm attaching managed-child-writing-system.zip. It installs a governed writing pipeline that changes how we produce content from here on. Do the following in order, then STOP for my confirmation before advancing any real work.

1. UNZIP & PLACE. Unzip the attachment. Place its files into the repo at these paths (root level):
   VOICE.md, PIPELINE.md, WRITING-STATE.md, README-WRITING-SYSTEM.md, CLAUDE-ADDENDUM.md at repo root;
   the agents/ folder and the evals/ folder at repo root.
   Do NOT overwrite data/, book/, essays/, map/, research/, or the existing CLAUDE.md contents.

2. WIRE CLAUDE.md. Append the block from CLAUDE-ADDENDUM.md to the existing repo-root CLAUDE.md (do not replace what's already there). Then you can delete CLAUDE-ADDENDUM.md.

3. READ & UNDERSTAND. Read, in this order: CLAUDE.md, VOICE.md, PIPELINE.md, WRITING-STATE.md, evals/two-testimonies.GOLD.md, evals/anti-patterns.md, and every file in agents/. Then tell me back, in your own words and briefly: what the pipeline is, the entry state machine, the two human gates, and the operator command. This confirms you've absorbed the plan.

4. COMMIT & PUSH. Commit "Install writing-system pipeline (VOICE, PIPELINE, agents, gold eval, state queue)" and push. If push fails (auth), stop and tell me.

5. PHASE 0 — CALIBRATION (do not skip; do not proceed past it without me). Acting as the `critic` agent per agents/critic.md and VOICE.md Part E:
   - Score evals/two-testimonies.GOLD.md. It MUST come out PASS.
   - Score each "before" sample in evals/anti-patterns.md. Each MUST come out REVISE, and you must name which banned pattern each one trips.
   - Acting as the `grader`, show me you will refuse WELD on a test claim that has no attached primary quote.
   Report all three results. If the critic does not cleanly PASS the gold and REVISE the anti-patterns, say so — we tune before anything scales.

6. STOP. Do not draft any node or essay yet. After I confirm calibration looks right, my next instruction will be "advance the queue," and you'll begin Phase 1 (the first corner) per PIPELINE.md — starting by replacing the live two-testimonies essay with the gold version, then carding its linked nodes through the grader.

Notes: The gold essay in evals/ is the voice standard — every essay imitates it. Node cards are plain/factual by design (not essay voice). Grades never ship without an attached primary quote. Only grade-exceptions and keystone essays come to me; everything else runs through the gates automatically.
