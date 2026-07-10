# VOICE.md — the enforceable voice of *The Managed Child*
*This is not a mood board. It is a spec with a judge. Every long-form entry is written to Part B, checked against Part C, and scored by the critic (Part E) until it passes. The gold standard it imitates is `evals/two-testimonies.GOLD.md`. When this file and a draft disagree, this file wins.*

---

## Part A — How a voice is actually engineered (the method, not vibes)

Professional practice for cloning a specific essayist's voice — in newsrooms, in ghostwriting, and in modern LLM systems — converges on six mechanisms. We use all six.

1. **Exemplar anchoring (few-shot) beats description.** A model imitates a distribution far better than it follows adjectives. The single most powerful lever is a small set of *gold* passages in the target voice. → Our gold set is `evals/`. The essayist agent is always given the gold essay, not just this rubric.
2. **Stylometric fingerprinting.** A voice is measurable: sentence-length variance ("burstiness"), clause structure, punctuation habits, function-word ratios, the ratio of concrete to abstract nouns, how quotations are deployed. → Part B encodes this writer's fingerprint as concrete, checkable features.
3. **Rubric-based evaluation.** "Be literary" is unenforceable; testable criteria are. → Part E is a checklist that yields pass/fail + specific edits, not a vibe.
4. **LLM-as-judge / critic loop (self-refine).** The reliable way to get non-robotic prose from a model is not a better single prompt — it is *draft → critique-against-rubric → revise*, iterated to threshold, before a human ever sees it. → The `critic` agent runs this loop.
5. **Negative constraints (banned-pattern lists).** Removing the tells matters as much as adding the strengths. AI prose has a known signature; naming it lets the critic reject it. → Part C.
6. **Editing over generating.** The best prose is revised, not one-shot. Every entry is expected to fail the critic at least once. A first pass that "passes" immediately is treated as suspicious and re-scored.

---

## Part B — The fingerprint of this essayist (mined from `evals/two-testimonies.GOLD.md`)

Write to these. They are what makes the gold essay good.

**Rhythm — burstiness, not uniformity.** Long evidentiary build, then a short declarative landing. The signature cadence is a paragraph of sourced detail closed by a 3–7 word verdict:
- *"The robes became lab coats; the structure held."*
- *"He is more damning unparaphrased than any critic could make him."*
- *"Directed or reverberating, the evidence does not move."*
Never let three long sentences run without a short one breaking them. Uniform sentence length is the surest tell of machine prose.

**The flat, load-bearing opener.** Open on the plainest true sentence, not a hook. (*"Most of the people who built the managed child had no occult connection at all."*) No "In an age of…", no scene-setting, no rhetorical question.

**Primary quotes at the pivot — unparaphrased where the exact words are more damning.** Deploy the source's own words at the decisive moment ("has no great attachments to any place or person"; "so that much that now is unthinkable may at least become thinkable"). Paraphrase the connective tissue; quote the incriminating line verbatim. One quote does the work of a paragraph of characterization.

**Restraint — let the fact land; do not gloss it.** State the documented thing and stop. Trust the reader to feel it. Do **not** append "which shows that…", "the significance of this is…", "no reader imposes it." The gold essay's power is in what it declines to explain.

**The seam carried inside the prose.** The documented/speculative line is held in the sentences themselves, never in a label or a badge. "Whether any council exists is not a claim made here. That these people believed one did, and organized accordingly, is the documented fact." That move — mark the limit of the claim in-prose — is mandatory wherever a claim could be over-read.

**Controlled anaphora, used once.** Parallel openers are allowed as a *deliberate* device for one movement (the four "The stage is…" beats), never as a default paragraph template. Earn it once; don't reach for it twice.

**Concrete over abstract.** Dates, names, page references, institutions — "Book III, 414b–415c", "26 June 1923", "Salomon's House". The concrete particular always beats the abstract summary. When a sentence names a concept, ask whether it could instead show the instance.

**Epistemic exactness as the closing move.** End on the precise boundary of the claim, not a swell. *"The thesis stands exactly as far as the evidence reaches, and stops precisely where it stops."* The ending states the limit; it does not inflate.

**Diction.** Plain, muscular, unshowy. Anglo-Saxon verbs over Latinate abstractions. No ornament that isn't doing argumentative work.

---

## Part C — Banned patterns (the anti-AI constraints; the critic auto-fails these)

Any of these is a defect. The critic must flag and the essayist must remove them.

**Structural tells**
- Throat-clearing openers: "In a world where…", "In an age of…", "Throughout history…", a rhetorical question as a hook.
- Summary/restatement closers: "In conclusion", "Ultimately", "In summary", or a final paragraph that only restates.
- Announced takeaways: "This shows that…", "The significance of this is…", "It's important to note", "It's worth noting", "What this means is…". State the fact; cut the announcement.
- Telling the reader how to read: "no reader imposes it", "as we can see", "clearly", "obviously".
- Uniform sentence length across a paragraph (no burstiness).

**Lexical tells (ban outright)**
- delve, underscore, leverage, navigate (figurative), boasts, tapestry, landscape (figurative), realm, journey (figurative), testament, beacon, crucial, pivotal, vital, robust, myriad, plethora, foster, garner, stark, resonate, illuminate, nuanced, multifaceted.
- Empty intensifiers: truly, deeply, profoundly, remarkably, fundamentally, genuinely, incredibly, undeniably, notably (as a sentence-opener), importantly, interestingly.
- Hedging filler: "arguably", "in many ways", "to some extent", "one could argue".

**Syntactic tics**
- The "not X, but Y" antithesis more than once per ~800 words.
- The rule-of-three list as a reflex (every series in threes). Vary series length.
- The colon-summary reflex ("The result: …", "The takeaway: …") more than once per essay.
- Em-dash overuse; the "—and that's the point" tag.
- Both-sides mush: "while some argue X, others argue Y" without adjudication.
- Beginning consecutive sentences/paragraphs with the same connective ("Moreover", "Furthermore", "Additionally").

**Register violations**
- Editorializing the reader's emotion ("chillingly", "disturbingly", "shockingly"). Let the fact be chilling; don't say it is.
- Inflation beyond the evidence (any claim stronger than the source supports — this is also a grading violation, see `agents/grader.md`).

*(Deltas applied when elevating the draft essay to gold — use as calibration: cut "The primary text makes the connection; no reader imposes it." Cut announced-takeaway framings. Tightened three long runs with a short landing. Left every fact, source, and the deliberate four-beat anaphora untouched. The essay was ~90% there; gold is the residual-tell removal.)*

---

## Part D — The two registers (write the right one in the right place)

The single biggest cause of "robotic" copy is writing one register in the other's slot.

**Essay register** (essays, book chapters, and any long-form entry that carries argument). Part B in full. Voiced, rhythmic, argued. **Written only by the `essayist` agent, always against the gold exemplar, always through the critic.**

**Card register** (the 2–4 sentence annotation body of a node — what pops up on hover). Deliberately plain and factual. NOT small-essay-voice; nobody wants a lyrical hover-card. Structure: (1) who/what this is in one sentence; (2) the one or two *documented* facts that make it load-bearing, with the primary source; (3) one line on its role in the thesis. Plain register is *correct* here — so the `carder` agent may draft these, and "robotic" doesn't apply because factual-plain is the target. Still obeys Part C's lexical bans. Certainty shown as the plain word (documented/possible/apocryphal), never a grade badge.

Rule of thumb: **if it argues, it's essay register and a human-gated keystone; if it just informs, it's card register and machine-draftable.**

---

## Part E — The critic's scoring protocol

The `critic` agent scores every essay-register draft and returns **PASS** or **REVISE + a numbered list of exact line edits**. It never rewrites silently; it instructs. Loop until PASS, max 4 rounds, then escalate to a human.

Score each, 0–2 (0 fail / 1 weak / 2 strong). PASS requires ≥ the bar on every line and zero Part-C bans present:

1. **Burstiness** — long build, short landings; no uniform runs. (≥1)
2. **Opener** — flat and load-bearing; no throat-clearing. (=2)
3. **Quote deployment** — primary words at the pivots; connective tissue paraphrased; copyright-safe (short, exact, attributed). (≥1)
4. **Restraint** — facts land unglossed; no announced takeaways. (=2)
5. **Seam** — claim-limits marked in-prose wherever over-readable. (=2)
6. **Concreteness** — dates/names/sources over abstractions. (≥1)
7. **Closing** — ends on the precise boundary of the claim, not a swell. (≥1)
8. **Banned patterns** — zero present. (hard gate)
9. **Fidelity to gold** — reads like `evals/two-testimonies.GOLD.md` could have written it. (≥1)
10. **Grade integrity** — no sentence claims more than its node's grade supports. (hard gate; see grader)

The critic quotes the offending text and gives the replacement. Calibration set: `evals/two-testimonies.GOLD.md` must score PASS; `evals/anti-patterns.md` "before" samples must score REVISE. If the critic can't reproduce those two verdicts, it is mis-tuned — stop and recalibrate before running at scale.
