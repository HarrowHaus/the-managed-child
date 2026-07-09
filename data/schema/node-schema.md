# NODE SCHEMA
*The data model. Every node file in `data/nodes/**` carries this frontmatter. Frontmatter = the machine-readable graph (feeds queries, the site, network computation); body = the human-readable entry. Keep them in sync.*

## Frontmatter fields
```yaml
id:        kebab-case-unique          # matches filename; used as the edge target key
title:     "Display Name"
type:      person | work | institution | concept | event
category:  people | works | institutions | concepts | events
dates:     "1875-1947" | "1904" | "-"  # birth-death, year, or n/a
grade:     WELD | HYPOTHESIS | FICTION-ALERT | WELD-parallel | HYPOTHESIS-fenced | FRAME | PRINCIPLE
map_node:  "0.3"                       # cross-ref into map/lineage-map.md
status:    stub | drafted | locked
abstract:  "1-3 sentence summary."     # OPTIONAL; the annotation/popup body. If absent, the build derives it from the first body paragraph after the blockquote.
# certainty: (DERIVED — do not author) reader-facing standing, computed from `grade` at build time. See "Grade -> certainty" below.
sources:                               # named refs only; aggregators flagged
  - "Author, Title (year), p. — [PRIMARY|SECONDARY|VERIFY]"
welds:                                 # documented edges out of this node
  - to: node-id
    type: influenced | met | corresponded | cited | funded | mentored | founded | advised | member-of | channeled | adapted
    register: worked-off | same-field  # per CONVENTIONS §2
    grade: WELD
    source: "…"
hypotheses:                            # suspected/ungraded edges, same shape, grade: HYPOTHESIS
tags: [trunk, root, rail-one, articulation, enactment, denominator, ...]
```

## Edge types (controlled vocabulary)
`influenced, met, corresponded, cited, funded, mentored, advised, founded, member-of, channeled, adapted, groomed, schismed-from, co-founded, hosted`

## The `register` field is load-bearing
Every edge is either **worked-off** (encounter documented → transmission) or **same-field** (parallel emergence → reverberation). This single field is what lets the graph be queried for "true transmission lines" vs. "resonances" — and what stops reverberation from being mis-read as a chain of command.

## Why frontmatter matters
Because the graph is structured, it is **computable**: centrality (who is the real hub), shortest documented path between any two figures, and — most useful — a **HYPOTHESIS-density map** that auto-locates where the thesis is still weakly supported. The audit becomes a live query, not a static document. See `VISION.md`.

---

## Grade → certainty (the reader-facing signature) — DERIVED AT BUILD
The reader never sees the internal `grade` vocabulary. The site derives a **plain certainty word** from `grade` and renders *that* (monochrome, hoverable — never a colour-coded badge). This mapping is authoritative; the build applies it. Ref: `site/PARITY-BUILD-SPEC.md` §IV.16.

| `grade` (internal, authored) | reader-facing `certainty` | rendered as |
|---|---|---|
| `WELD`, `WELD-verified`, `WELD-parallel` | **documented** | quiet italic word |
| `HYPOTHESIS`, `HYPOTHESIS-fenced` | **possible** | quiet italic word |
| `FICTION-ALERT` | **apocryphal** | quiet italic word |
| `FRAME`, `PRINCIPLE` | *(structural — no certainty word)* | shown as a "framework"/"principle" label, not a claim |
| `DISCARD` | *(not shown)* | omitted from the site |

Keep authoring in the internal vocabulary; the certainty word is generated. Do **not** add a `certainty:` field by hand.

## Two axes, kept distinct (naming note for the build)
There are two different "register"-like axes; the spec and the build must not conflate them:
1. **Node register (articulation vs enactment)** — carried in `tags` (e.g. `articulation`, `enactment`). Describes what *kind* of node this is in the thesis.
2. **Edge transmission (worked-off vs same-field)** — carried per-edge in `welds[].register` / `hypotheses[].register` (per `CONVENTIONS.md` §2). Describes *how* a connection is known.
`PARITY-BUILD-SPEC.md` §IV.1 refers to the edge axis as `transmission`; in this repo it is the edge-level `register` field. Same thing, two names — the build reads the edge `register`.

## Edges, for the build
The site's backlinks and graph read **both** `welds:` and `hypotheses:` arrays as the node's out-edges (the spec's single `edges` array = these two combined). Each carries `to`, `type` (controlled vocab above), `register` (worked-off | same-field), `grade`, `source`. Backlinks are produced by inverting these across all nodes (spec §IV.2 step 3); `data/edges/adjacency.json` is exported from them (spec §IV.2 step 5).

