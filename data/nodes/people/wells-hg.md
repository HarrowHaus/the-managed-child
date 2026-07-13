---
id: wells-hg
title: "H. G. Wells"
type: person
category: people
dates: "1866-1946"
grade: WELD
map_node: "3.1"
status: locked
abstract: "Novelist and Fabian technocrat who rewrote 'permeation' as an openly declared world-managerial order (The Open Conspiracy, 1928). Studied biology under T. H. Huxley; co-authored The Science of Life with T. H.'s grandson Julian — the documented hinge of the Administrators rail."
sources:
  - "H.G. Wells, A Modern Utopia (1905) — the 'samurai', a voluntary order of nobility governing a world state — [PRIMARY]"
  - "H.G. Wells, The Open Conspiracy (1928) — [PRIMARY]"
  - "H.G. Wells, The New World Order (Secker & Warburg, January 1940) — a socialist, scientifically planned world government — [PRIMARY]"
  - "H.G. Wells, World Brain (collected essays and addresses, 1936–38) — [PRIMARY]"
  - "H.G. Wells, Julian S. Huxley & G.P. Wells, The Science of Life (1929–30) — co-authored — [PRIMARY]"
  - "H.G. Wells, 'Faults of the Fabian' (paper delivered to a members-only meeting, February 1906) — [PRIMARY]"
  - "H.G. Wells, Experiment in Autobiography (1934) — [VERIFY: cited in the map for the Coefficients material; not checked against the text]"
welds:
  - {to: huxley-julian, type: influenced, register: direct-transmission, grade: WELD, source: "co-authored The Science of Life (1929–30) with Julian Huxley and G.P. Wells — a documented collaboration, not a resemblance"}
  - {to: fabian-society, type: member-of, register: institutional-relay, grade: WELD, source: "Fabian who delivered 'Faults of the Fabian' (Feb 1906), was defeated by Shaw at the general meeting of 14 December 1906, and resigned in 1908"}
  - {to: coefficients-club, type: member-of, register: institutional-relay, grade: WELD, source: "member of the Webb-founded dining club (1902–09)"}
  - {to: rule-by-trained-elite, type: restates, register: common-inheritance, grade: WELD, source: "The Open Conspiracy is Fabian permeation rewritten as an openly declared managerial world order"}
hypotheses:
  - {to: crowley-aleister, type: restates, register: analogy, grade: HYPOTHESIS, source: "shared early-20thC London literary milieu only; no documented intellectual tie in either direction"}
tags: [administrators, technocrat, trunk, enactment]
---

# H. G. Wells

> **WELD** · map node 3.1 · 1866-1946

Wells is the cleanest bridge on the rail from *manage society* to *you do it by shaping the young* — and he is where the Administrators rail stops being a set of parallel thinkers and becomes a **documented transmission line**.

## Documented core [WELD]
Across four decades Wells wrote the managerial future as explicit program. **A Modern Utopia** (1905) is governed by the "samurai," a **voluntary order of nobility** open to the physically and mentally fit, holding the responsible work of the world state. **The Open Conspiracy** (1928) drops the fiction: it calls, in his own voice, for a competent minority to *openly* reorganize the world into a single managed order. **The New World Order** (Secker & Warburg, January 1940) argues that a socialist and scientifically planned world government would be required. The **World Brain** essays (1936–38) imagine a managed global information organism. His utopias are, without exception, run by a trained caste.

**The Fabian schism, dated.** In February 1906 Wells delivered "Faults of the Fabian" to a members-only meeting, calling the Society "extraordinarily inadequate and feeble." He was **soundly defeated by Shaw at the general meeting of 14 December 1906**, was nonetheless elected to the Executive in March 1907, and **resigned from the Society in 1908**. The trunk's members quarrelled and split.

**The biographical spine.** Wells entered biology in 1884 as a scholarship student at the Normal School of Science, South Kensington, where he **studied under Thomas Henry Huxley**. A generation later he **co-authored The Science of Life** (1929–30) with T. H.'s grandson **Julian Huxley** and his own son G. P. Wells. The naturalist taught the technocrat; the technocrat later co-wrote a book with the naturalist's grandson.

## Edges
`huxley-julian` is the one true **direct-transmission** out of this node: a dated, co-authored book. `fabian-society` and `coefficients-club` are documented memberships (**institutional-relay**). `rule-by-trained-elite` is **convergent-selection** — Wells restated the doctrine; he did not receive it as an order.

**The T. H. Huxley mentorship is deliberately NOT an out-edge here.** It is an *in-edge*: T. H. Huxley mentored Wells, not the reverse. An earlier revision of this node carried `{to: huxley-th, type: mentored}`, which asserts the opposite of the record. The edge belongs on `huxley-th` as `{to: wells-hg, type: mentored, register: direct-transmission}` when that node is expanded; the build produces the backlink by inversion.

## Held-open / discard
- **[FICTION-ALERT]** The tale that Crowley introduced Wells to hashish belongs to the initiation-legend genre and is **not used**.
- **[HYPOTHESIS]** A direct Wells↔Crowley intellectual tie. Unproven in either direction. The defensible claim is shared literary milieu, nothing more.
- **["especially active member" — attribution demoted]** The phrases describing Wells's Coefficients role ("capable of original thoughts on every subject"; "an especially active member") circulate in the secondary literature. The map attributes them to Wells's *Experiment in Autobiography*; **that attribution was not confirmed.** Use the phrases as the secondary literature's characterization, or verify against the memoir before quoting them as Wells's own words.
- **[SCHEMA GAP resolved]** The controlled edge vocabulary now includes a `co-authored` type (added per R-Q4; used on the Webb nodes). The Wells↔Julian Huxley collaboration (*The Science of Life*, 1929–30) is currently recorded as `influenced` + `direct-transmission` with the collaboration named in the `source` string, and can be migrated to `co-authored`.

## Role in the thesis
Wells is Thesis A in its purest technocratic form: the managerial idea stated openly, by a named man, in signed books — no cabal required. The Fabian schism is the honesty pivot this node must carry: documented association is not documented agreement.
