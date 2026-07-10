# The Managed Child
### A graded knowledge graph tracing an idea — *humanity as administrable stock* — through the twentieth century, with the managed child as its clearest proof.
*Working repository. Series: "Ask About Illuminati." Imprint: Trestleboard Editions.*

---

## What this is
Not an essay and not a book — a **knowledge graph** that can be *read* as an argument (the book), *elaborated* as essays about the work (the thesis, lineage, and method), and *browsed* as a reference (the data). Every node is an entity; every edge is a relationship **carrying a grade**; the thesis is what the graph supports. *(The "Ask About Illuminati" media decodes are parked in `essays/_parked-decodes/`, reintroduced later — see `DECISIONS.md` S-12.)*

The one thing that makes this different from everything else in its genre: **it shows its work.** Every edge is rated, every discard is named, every cabal or antisemitic claim is handled by an explicit rule *on the page*. It is, deliberately, the **anti-conspiracy wiki**.

## The thesis in one line
The managed child is what happens when the conviction that humanity is administrable stock is applied to the young — **enacted** by a mostly-secular machinery, and **confessed**, in its most self-aware form, by an esoteric current that said out loud what the institutions did quietly. Directed or reverberating, the record reads the same.

**New here?** Start with [`HANDOFF.md`](HANDOFF.md) — it replaces this chat's context entirely.
Plan: [`PLAN.md`](PLAN.md) · Queue: [`TASKS.md`](TASKS.md) · Decisions: [`DECISIONS.md`](DECISIONS.md)

Full statement: [`THESIS.md`](THESIS.md) · Stress-test: [`AUDIT.md`](AUDIT.md) · What it becomes: [`ROADMAP.md`](ROADMAP.md) · Where we're thinking too small: [`VISION.md`](VISION.md)

## Layout
```
THESIS.md            the argument, distilled
AUDIT.md             the five-joint hostile-reader stress-test
ROADMAP.md           output architecture (database -> book -> essays -> site)
VISION.md            what this can and should be (read this)
CONVENTIONS.md       the grading discipline, as a contributor spec  <- the real spine
data/
  nodes/             one entry per entity (people/works/institutions/concepts/events)
  edges/             cross-node relationships (or embedded in node frontmatter)
  schema/            the data model + controlled vocabulary
map/                 lineage-map.md — the human-readable narrative of the rails
book/                THE BOOK (Tier 1): outline + chapter stubs
essays/              THE ESSAYS (about the work): scope + stub index (media decodes parked in _parked-decodes/)
site/                THE WEBSITE (Tier 3): Gwern-parity build
  PARITY-BUILD-SPEC.md   authoritative backend+frontend stack audit + build spec
  GWERN-AUDIT.md         why the popup/transclusion system is the point
  DESIGN.md              aesthetic brief (Gwern-parity + "Gilded Deep" whisper)
  BUILD.md               one-page orientation
  reference-implementation.html  working seed (recursive popins, certainty words)
  CREDITS.md             attribution (esp. Route A)
methodology/         the reusable method, separable from this first application
research/            verification queue · discard pile · future-threads frontier
```

## How to read the grades
- **[WELD]** — documented: who met/cited/funded/mentored whom; a text that verifiably says what's claimed. Survives a hostile reader.
- **[HYPOTHESIS]** — a resemblance or suspected tie not yet documented. Legitimate to pursue; never cited as proof.
- **[FICTION-ALERT]** — circulates as fact but traces to a fabricated/fictional source. Flagged so it never enters the foundation.

See [`CONVENTIONS.md`](CONVENTIONS.md) for the full discipline, including the two transmission registers (*worked-off* vs *same-field*) and the Hard Sourcing Rule.

*On the site, these internal grades are rendered to the reader as **plain certainty words** — documented · possible · apocryphal — hoverable, monochrome, never gold badges (see `site/PARITY-BUILD-SPEC.md` §IV.16). Authors keep using the internal vocabulary; the certainty word is derived at build.*

## Status
Research phase complete (8 campaigns); thesis consolidated; audit resolved (Joints 1–4; Joint 5 is a decode constraint). **The unfinished part is no longer the research — it is the product.**
