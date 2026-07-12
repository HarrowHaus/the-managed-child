# EDGE-VOCABULARY.md — the closed lists that keep edges from rotting
*Typed, standing-tagged edges decay the moment they are free text. This file is the fixed controlled vocabulary + the lint rule. Same discipline as the grade-vocab guard, pointed at edges. Authoritative; the build enforces it.*

## Edge TYPE — closed list (an edge's `type` must be one of these; nothing else compiles)
- `read` — A demonstrably read B's work (documented).
- `met` — A and B were in the same room / corresponded (documented).
- `influenced` — A worked off B's published idea (documented absorption + extension).
- `mentored` / `advised` — formal teaching/advising relation.
- `funded` / `founded` / `member-of` — institutional relations.
- `broke-from` — A split from B or B's body (a schism — carries the antagonism).
- `restates` — A states the same idea in a different idiom, no contact claimed.
- `precedes` — chronological/positional only, no causal claim.
- `no-relay` — an explicit NON-connection: A and B are adjacent in the argument but there is documented *absence* of transmission. (Load-bearing for the seam.)

## TRANSMISSION register — closed list (an edge's `register` must be one of these)
- `worked-off` — documented contact or absorption.
- `same-field` — parallel; same milieu; no documented contact.
- `none` — explicit non-relay.

## STANDING — derived, never authored
Each edge carries a standing derived from its grade exactly as nodes do: `documented` / `possible` / `apocryphal`. An edge is `documented` only with an attached confirming primary; otherwise `possible`. Never author a standing word; it is generated.

## The LINT (build-time, hard fail)
1. Every edge's `type` ∈ the Edge TYPE list and `register` ∈ the register list. Off-vocab → FAIL with node id + edge.
2. Every edge `to` resolves to a real node. Dangling → FAIL.
3. No edge renders a standing stronger than its attached evidence supports (documented requires an attached primary). → FAIL.
4. Report (do not auto-fix) any edge whose rendered standing/type appears to CONTRADICT the node's prose about that same edge — this is semantic, so the lint only flags it; the maintainer and a human resolve it. (See the Bernays→Lippmann case: prose demoted it, frontmatter still said `influenced` — that contradiction must surface, not silently persist.)

## Known fix to apply on install
`bernays-edward` → `lippmann-walter`: the prose demotes this to a hypothesis (chronology reverses; "manufacture of consent" is Lippmann's coinage). Update the frontmatter edge to match: not `influenced/same-field/documented`. Set it to `restates`/`same-field` with standing `possible` (or `precedes` if that reads truer), so the footer list stops contradicting the prose.
