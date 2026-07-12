# UI-SPEC.md — the settings popup as the reader's lens (the double loop)
*Extend Gwern's existing settings widget (dark/reader mode) into the instrument panel for one graph read many ways. Quiet controls in the existing popup — monochrome + single indigo accent, no new chrome, JS-optional site (all features are progressive enhancement; the plain read never depends on them).*

## Control 1 — Reading (the door)
A selector listing the registered readings (from READINGS.md, build-time JSON). Choosing one: (a) re-threads every essay's prev/next to that reading's sequence; (b) shows a quiet "Reading II · 2 of 3" position marker; (c) persists (localStorage) so a returning reader gets "Continue: The Aeon Current — The Links Hold" on the homepage. Default: no reading selected = current behavior.

## Control 2 — Standing lens (the epistemics, made holdable)
Three states: OFF (default, exactly today's render) · MARK (certainty words get a quiet indigo underline everywhere, incl. inside popups) · DOCUMENTED-ONLY (passages whose standing is below documented render at reduced opacity, with a persistent one-line notice "Lens: documented only — [turn off]"). Strictly opt-in; never the default; never removes text (dims, doesn't hides); the notice keeps it honest. This is the site's signature — visible validity — turned into something the reader can operate.

## Control 3 — Depth
Popup transclusion depth: ABSTRACT (one-liner + standing) · FULL (today's whole-entry transclusion). Persisted.

## Implementation notes for Code
- READINGS.md → build-time readings.json consumed by a small vanilla-JS module alongside Gwern's; no framework.
- Standing lens keys off the existing rendered certainty-word markup (add a data-standing attribute at build where absent).
- All three controls live in the existing settings popup; keyboard accessible; degrade to nothing without JS.
- Guard: no gold, no color-coding of grades (indigo underline is an accent, not a grade palette); lens states must pass the grade-vocab guard (plain words only).
