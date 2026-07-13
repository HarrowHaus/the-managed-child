# EDGE-VOCABULARY.md — the closed lists that keep edges from rotting
*Typed, standing-tagged edges decay the moment they are free text. This file is the fixed controlled vocabulary + the lint rule. Same discipline as the grade-vocab guard, pointed at edges. Authoritative; the build enforces it.*

## Edge TYPE — closed list (an edge's `type` must be one of these; nothing else compiles)
- `read` — A demonstrably read B's work (documented).
- `authored` — A wrote / received work B (documented). Also stored inverse on the work node (rendered "X — authored" = authored by X); the concept-in-a-work / attestation case shares this type for want of a narrower one.
- `co-authored` — A and B jointly produced a work (documented collaboration; e.g. Wells & Julian Huxley, *The Science of Life*). Symmetric; carries `worked-off` (the collaboration is the contact).
- `met` — A and B were in the same room / corresponded (documented).
- `influenced` — A worked off B's published idea (documented absorption + extension).
- `mentored` / `advised` — formal teaching/advising relation.
- `groomed` — a documented predatory / grooming relation: A raised or directed B toward a role for A's ends. Kept as itself and NEVER softened to `mentored` (per the Hard Sourcing Rule — the material is not laundered by neutral vocabulary).
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

---

## EDGE VOCABULARY v2 — THE SIX MECHANISMS (MASTER-SPEC 2.1)
*The `register` dimension migrates from `worked-off / same-field / none` to six **mechanism classes**. The whole point of the split: `same-field` bundled three very different things (a shared source, an independent convergence, and a mere analyst's resemblance) and let them read alike. Each mechanism below carries a **minimum proof** (what the graph must hold to assign it) and a **does-not-permit** (what it may never be read to license). Migration is per-edge, performed in Phase 4 as each node is absorbed; until an edge is migrated its legacy register stays valid (both vocabularies lint-clean during the transition).*

- **`direct-transmission`** — A took B's specific idea or method by documented direct contact with B or B's work (read it, studied under B, corresponded, was employed by B). **Min proof:** a documented act of contact or absorption (a citation, a letter, an enrolment, a post). **Does not permit:** inferring shared belief, agreement, or coordination — only the specific content shown moved.
- **`institutional-relay`** — the idea moved through a **shared institution** (same organisation, common employer, a funded program), not person-to-person. **Min proof:** both parties documented in the institution AND the institution documented as carrying the content. **Does not permit:** reading co-membership as agreement, or the institution as a cabal.
- **`network-exposure`** — A stood in a **milieu where B's idea circulated** (same scene, city, social network) and could absorb it, with no documented direct contact. **Min proof:** documented co-presence in the network AND the idea documented as circulating there. **Does not permit:** asserting A *held* the idea — only that A was exposed to it.
- **`common-inheritance`** — A and B independently drew the same idea from a **shared prior source**, with no contact between them. **Min proof:** each documented reading or using the common source. **Does not permit:** any A→B transmission claim — the parallel runs through the ancestor, never between the heirs.
- **`convergent-selection`** — A and B reached the same idea independently because the **same conditions or incentives selected for it** (no shared source needed). **Min proof:** the selecting pressure documented AND both responses documented. **Does not permit:** any transmission or shared-source claim.
- **`analogy`** — the tie is the **analyst's**: A and B resemble each other in the reading, with no documented historical relation at all. **Min proof:** the resemblance, stated as the reader's — no historical claim. **Does not permit:** any lineage, contact, or transmission — interpretive only; it never renders as history.

### Migration map (legacy register → mechanism, per evidence)
- `worked-off` → **`direct-transmission`** (person-to-person) or **`institutional-relay`** (through a shared body).
- `same-field` → **`common-inheritance`** (shared prior source) or **`convergent-selection`** (independent, same pressure) or **`analogy`** (interpretive only) — *choose by the evidence; this three-way split is the reform.*
- `no-relay` → **RETIRED (L3).** A documented absence is not an edge; it is a bounded negative ("not established in the sources checked") carrying its search universe, recorded in prose and the claim register.

### The three rendered layers (MASTER-SPEC 0.4 — centrality computed per layer, never blended)
- **Layer 1 — historical / event** (renders as lineage without qualification): `direct-transmission`, `institutional-relay`, and the event types (`read`, `authored`, `co-authored`, `met`, `mentored`, `advised`, `funded`, `founded`, `member-of`, `groomed`, `broke-from`).
- **Layer 2 — institutional / field**: `network-exposure`, `common-inheritance`.
- **Layer 3 — interpretive** (never renders as history): `convergent-selection`, `analogy`, `restates`, `precedes`.
