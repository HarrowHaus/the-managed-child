# EXPANSION-PLAN.md — the read-only back-pass & prioritized build map
*Output of a read-only back-pass of the whole live corpus (97 published nodes) against `MASTER-PLAN.md`. No node content was changed to produce this. It surfaces problems and proposes work; the operator rules on scope and order before any expansion begins. Nothing here is asserted as fact — it is a map of what to build, what to fix, and what to harvest first.*

**Method.** Five parallel readers swept the corpus by rail cluster, each reading the node files plus `CLAUDE.md` / `VOICE.md` / `EDGE-VOCABULARY.md` / `MASTER-PLAN.md` and (for the smoothing cluster) the `research/` harvests. For every node they recorded: **depth** (full / thin / stub), **adjacency** (documented neighbor nodes not yet in the graph, with a lead source and a build/incubate/hold disposition), **connection/intent hygiene**, and **deferred-relevance** (thin/orphan nodes the new vision re-threads). The governance-level findings below were then re-verified by hand against the spec files.

---

## PART 0 — HOW TO READ THIS

- **Depth tiers:** `full` = built to the Part-IV standard, expand *outward* (adjacency) not longer; `thin` = drafted on real evidence but under-built / under-connected; `stub` = template placeholder, empty `sources`/`welds`.
- **Disposition:** `build` = documented substrate exists now; `incubate` = real tie, park until its rail loops back (deferred-relevance); `hold` = tie thin/out-of-scope, keep off the graph until a primary appears.
- **Priority ranking** follows the operator's three keys, in order: **(a)** load-bearing to an existing reading-entry, **(b)** documented-density, **(c)** adjacency-count.
- **The moat still governs everything here.** No node graduates from this plan to the graph except through the pipeline (researcher → grader → carder/essayist → critic), primaries attached, connection split from intent. This plan is the *queue*, not a licence to build from memory.

---

## PART 1 — CORPUS-WIDE HYGIENE (rule on these first; most touch the moat)

These are cross-cutting; several are cheap to fix and protect the discipline before any density is added. They are surfaced, not fixed (maintainer law: surface, a human rules).

**H1 — Evidence-gate breach: WELD standing with no attached primary.** The single largest pattern. Nodes render reader-facing **"documented"** while carrying an empty (or secondary-only) `sources` list — the one thing `CLAUDE.md`'s moat forbids. Two sub-classes:
- *Empty stubs graded WELD:* `moonchild`, `on-education-of-children`, `babalon-working`, `parsons-jack`, `jpl`, `hubbard-lron`, `hall-manly-p`, `spr`, `wheatley-dennis`, `fleming-ian`, `huxley-aldous`, `theosophical-society`, `steiner-rudolf`, `ojai-convergence`, `externalisation-hierarchy`, `lab-nine`, `only-planet-of-choice`, `fabian-essays`, `webb-beatrice`, `coefficients-1902`, `shaw-george-bernard`, `burnham-james`, `brave-new-world`, `public-opinion`, `hero-thousand-faces`, `eliade-mircea`.
- *Secondary-only, no [PRIMARY]:* `leadbeater-cw`, `order-of-the-star`, `lucis-trust`, `coefficients-club` (locked WELD, zero primary), `jwt`.
- **Note — several are primary-*propagation* failures, not fabrication:** the supporting primary already exists elsewhere in the corpus (e.g. the Ommen speech in `four-idiom-through-line`; the Lucis 1922 incorporation; `externalisation-hierarchy` and `only-planet-of-choice` *are themselves* primary texts) but was never attached to the node. Those are near-free to clear.
- **Ruling needed:** for each, attach the primary, or demote the grade until harvested. (FRAME/PRINCIPLE nodes with empty `sources` — `real-enemies`, `lifespan-continuum`, `double-parentage`, `method-stance`, `grading-system` — are *legitimately* sourceless and are **not** in this list.)

**H2 — Non-canonical grade tokens.** `jung-cg: WELD-parallel`, `russell-bertrand: WELD-verified`, `quigley-carroll: HYPOTHESIS-fenced`. These render fine today (the certainty map keys on `startsWith('WELD'/'HYPOTHESIS')`), so no guard fails — but they are outside the canonical trio and encode an *edge/register* distinction (parallel, verified, fenced) into the *grade* field, where it doesn't belong. Fix: canonical grade + carry the nuance on the edge (`same-field`, etc.) or in prose.

**H3 — `influenced`+`same-field` semantic contradiction (corpus-wide).** Verified against `EDGE-VOCABULARY.md`: `influenced` (type) = *documented worked-off absorption*; `same-field` (register) = *parallel, no documented contact*. Pairing them asserts contact and no-contact at once. Used as a catch-all across most concept edges (`the-root`, `managed-child`, `galton-francis`, `pearson-karl`, `cubberley-ellwood`, `spock-benjamin`, `fcc-1984`, and more). The true type for a parallel is `restates` (or `precedes`). Passes the mechanical lint (both tokens legal); caught only by lint rule 4 (semantic). **Corpus-wide reclass pass needed** — maintainer proposes, human rules per node.

**H4 — Uneven reciprocal seams.** (a) `jwt → watson-john-b` graded **HYPOTHESIS** while `watson-john-b → jwt` is **WELD** — the employment is documented; HYPOTHESIS is too weak and contradicts the reciprocal and jwt's own prose. (b) `lippmann-walter → bernays-edward` is `influenced`/WELD, asserting a transmission the corrected `bernays → lippmann` edge explicitly demotes to `restates`/HYPOTHESIS (the known Bernays↔Lippmann fix) — the two directions must be evened.

**H5 — Edge-type misuse on event nodes.** `krishnamurti-custody` (an *event*) carries `broke-from` and `groomed` edges — both are person→person relations and both contradict their own `source` text. `coefficients-club` carries `member-of` edges pointing *from the club to its members* (direction-inverted; the correct person→club edges already exist on `wells-hg`/`russell-bertrand`) — duplicative/backwards, prune.

**H6 — Spec divergence (governance).** `data/schema/node-schema.md` lists a stale, partly-open edge vocabulary (`cited, corresponded, channeled, adapted, schismed-from, co-founded, hosted`) that does not match the authoritative closed `EDGE-VOCABULARY.md` the lint enforces (`read, authored, restates, precedes, no-relay`, …). Reconcile the schema doc to the vocabulary file. **Also:** there is no `co-authored` type despite the documented Wells↔Julian Huxley collaboration (`wells-hg` stores it as `influenced`+worked-off as a workaround) — consider adding it.

**H7 — `map_node` collisions.** `theosophical-society` (1.4) vs `krishnamurti-custody` (1.4); `lab-nine` (4.3) vs `roddenberry-gene` (4.3) vs `only-planet-of-choice` (4.3). De-collide.

**H8 — Smoothing rail is graph-isolated.** Evidence is spine-grade but the wiring isn't: every smoothing *event* node has `welds: []` (connected only by prose "see X" pointers), and `real-enemies` (the interpretive spine) has **zero** computed backlinks. Wiring the intra-cluster edges is **zero new research** and is the cheapest high-value structural fix in the corpus (see Tier 0).

**H9 — Redundancy.** `coefficients-1902` (empty stub) is functionally subsumed by `coefficients-club`'s opening paragraph. Merge, or keep only as a bare timeline anchor.

**H10 — Metadata nit.** `huxley-aldous` is a bare stub but lacks the `incubating: true` flag its sibling stubs carry.

---

## PART 2 — NODE-BY-NODE (all 97, by cluster)

Format: `id — depth — action`. "Wire" = edges only (no new research). "Deepen" = attach more primaries + adjacency. "Harvest→build" = needs a research-mode harvest first.

### Occult spine / Crowley-in-America (Atlas §A/§B)
- `crowley-aleister` — thin — **deepen** (American reach; Spence/Sutin/Confessions); anchor of the densest node.
- `liber-al-vel-legis` — thin — deepen (Equinox of the Gods reception).
- `aeon-of-the-child` — thin(full-for-scope) — wire (`jung-cg` *Aion* restates/same-field).
- `four-idiom-through-line` — **full** — model node; expand outward only.
- `moonchild` — stub — harvest→build; **H1**.
- `on-education-of-children` — stub — harvest→build; **H1**; touches the project's own subject.
- `babalon-working` — stub — harvest→build; **H1**; crown event, Priority-1 rail.
- `parsons-jack` — stub — harvest→build; **H1**; "crown node" empty.
- `jpl` — stub — harvest→build; **H1**.
- `hubbard-lron` — stub — harvest→build; **H1**; the connection/derivation split must be built explicitly (Urban/Atack/Melton held open).
- `hall-manly-p` — stub — harvest→build; **H1**; Parsons tie stays `possible`/hold.
- `spr` — stub — build; **H1**; re-threads via Carrington→Puharich.
- `jung-cg` — stub — build; **H1 + H2** (`WELD-parallel`).
- `wheatley-dennis` — stub — build; **H1**; Maxwell Knight is the hinge.
- `fleming-ian` — stub — build; **H1**; Hess/Crowley claim must stay `possible`/apocryphal.
- `huxley-aldous` — stub — build; **H1 + H10**; four neighbors already in-graph unlinked.

### Theosophy → world-teacher → Nine (Atlas §A/§D/§F)
- `besant-annie` — thin — deepen; edge `groomed→krishnamurti` lacks in-node primary.
- `leadbeater-cw` — thin — deepen; **H1** (secondary-only).
- `krishnamurti-jiddu` — thin — wire (`huxley-aldous`, `campbell-joseph` both exist).
- `krishnamurti-custody` — **full** — **H5** (event carries `broke-from`/`groomed`).
- `order-of-the-star` — thin — wire + **H1**; missing forward edges to founder/protector/head.
- `theosophical-society` — stub — harvest→build; **H1**; the empty structural *hub* of the branch.
- `steiner-rudolf` — stub(incubating) — build; deferred-relevance → education/enactment (Waldorf).
- `ojai-convergence` — stub(incubating) — build; wire to `huxley-aldous`/`campbell-joseph`.
- `bailey-alice` — **full** — expand outward.
- `lucis-trust` — thin — **H1** (1922 incorporation primary exists uncited).
- `externalisation-hierarchy` — stub(incubating) — **H1** (is itself a primary; trivially clearable).
- `puharich-andrija` — **full** — expand outward (Geller/Schlemmer/Vinod).
- `lab-nine` — stub — harvest→build; **H1 + H7**; resolve Round Table Foundation identity + the Glen Cove/Camden seam.
- `only-planet-of-choice` — stub — **H1 + H7** (is itself the primary).
- `roddenberry-gene` — **full** — wire to `lab-nine`.

### Trunk (Atlas §A / Part II)
- `rule-by-trained-elite` — **full** — hub; expand outward (Saint-Simon/Comte ring).
- `plato` — thin — deepen (Statesman/Laws; the Academy).
- `the-republic` — thin — deepen.
- `bacon-francis` — thin — deepen (Novum Organum; Invisible College).
- `new-atlantis` — thin — deepen (Salomon's House node).
- `royal-society` — thin — deepen + wire (founders ring).
- `fabian-society` — thin(edge-poor) — wire (Webb/permeation/essays/LSE).
- `fabian-essays` — stub — build; **H1**; the seven signed essayists.
- `permeation` — **full** — internal to Fabian cluster.
- `webb-sidney` — **full** — wire (`webb-beatrice`, LSE).
- `webb-beatrice` — stub — build; **H1**; Poor Law + eugenics co-symptom.
- `coefficients-club` — **full** — **H1** (zero primary) **+ H5** (inverted edges).
- `coefficients-1902` — stub — **H9** (merge candidate).
- `shaw-george-bernard` — stub — build; **H1**; Krishnamurti cross-tie = deferred-relevance into Rail One.

### Administrators (Part II)
- `wells-hg` — **full** — model node; surfaces the missing `co-authored` type (**H6**).
- `huxley-julian` — **full** — the §G eugenics rail should nucleate here.
- `huxley-th` — thin — deepen (the **X Club**, a Coefficients mirror).
- `russell-bertrand` — thin(complete-for-role) — **H2** (`WELD-verified`).
- `burnham-james` — stub — build; **H1**; the named Machiavelli→managerial bridge the trunk hub's open edge waits on.
- `quigley-carroll` — stub(incubating) — build; **H2** (`HYPOTHESIS-fenced`); Milner→Round Table bridge.
- `unesco` — **full** — expand outward.
- `unesco-purpose-philosophy` — **full** — **H3-class** (`authored` frontmatter vs "cited" prose — surface).

### Enactment (Atlas §G measurement wing)
- `the-root` — **full** — **H3** (`influenced`/`same-field`).
- `managed-child` — **full** — spine; build named-but-absent Thorndike/Bobbitt.
- `mann-horace` — thin — deepen (Barnard co-member).
- `cubberley-ellwood` — thin — deepen; wire to `terman-lewis` (Stanford colleagues).
- `hall-g-stanley` — **full** — build **Goddard** (his student; the Binet→US bridge).
- `james-william` — thin — deepen (Thorndike student).
- `galton-francis` — **full** — build **Davenport** (transatlantic bridge).
- `pearson-karl` — **full** — deepen.
- `binet-alfred` — thin — deepen (Simon; Goddard the US importer).
- `terman-lewis` — **full** — model split-discipline; build **Yerkes** (Army tests).
- `gesell-arnold` — thin/mid — deepen; edge to Hall is really `mentored`.
- `spock-benjamin` — mid — deepen; wire to `freud-sigmund` (analytic training).
- `watson-john-b` — mid/full — build **Skinner/Pavlov** ring; **H4** (jwt reciprocal).
- `holt-l-emmett` — thin/mid — deepen; build **Truby King** (parallel-abroad).
- `psychological-care` — mid — fine as work-node.
- `brave-new-world` — stub(incubating) — build; **H1**; `authored`-by `huxley-aldous` gap.

### Consent (Atlas §H-adjacent)
- `lippmann-walter` — mid — deepen (Wallas mentor; Creel/CPI); **H4**.
- `bernays-edward` — **full** — model split; build Creel/CPI, Ivy Lee.
- `freud-sigmund` — thin/mid — deepen (**Le Bon** taproot).
- `dewey-john` — mid — deepen; the under-exploited consent↔enactment bridge (Democracy and Education).
- `lippmann-dewey-debate` — **full** — model event-node.
- `public-opinion` — stub — build; **H1** (1922 text; `authored`-by Lippmann gap).
- `jwt` — mid — **H1 + H4**; the one node where standing outruns evidence.
- `fcc-1984` — mid/full — deepen (Charren/ACT counter-actor); **H3**.

### Lifespan (Atlas — monomyth)
- `lifespan-continuum` — **full** (FRAME) — build Erikson backbone.
- `campbell-joseph` — **full** — build **Jung** (source) + **Lucas** (adoption case).
- `hero-thousand-faces` — stub — build; **H1** (1949 text; `authored`-by gap).
- `eliade-mircea` — stub(incubating, ORPHAN) — build the Eranos/Bollingen→Campbell edge; textbook deferred-relevance.
- `vogler-christopher` — mid/full — deepen (Snyder/Harmon propagation).

### Smoothing (Atlas §I — candidate spine) + MKUltra cross-list
- `mkultra` — **full** — split out **Gottlieb**; **H8** wiring.
- `west-louis-jolyon` — **full** — the model node; firewall holding (no West→Manson edge). ✅
- `cameron-allan-memorial` — **full** — Cameron↔Process gap holding (no edge) ✅; build `Cameron` person + Orlikow v. US.
- `real-enemies` — **full** (FRAME) — **H8** (zero backlinks); the §I targets belong under it.
- `helms-file-destruction-1973` — **full** — **H8** wire (`precedes`).
- `sanitized-1977-testimony` — **full** — **H8** wire.
- `altered-west-document` — **full** — **H8** wire (neighbors already in-graph).
- `process-v-sanders` — **full** — build **process-church** (its missing subject).
- `latey-judgment` — **full** — **H8** wire to `hubbard-lron`/`parsons-jack` (stitches smoothing↔Crowley rails).
- `mkultra-hearing-2026` — **full** — **H8** wire to mkultra/west/helms/altered.
- `dana-rotting-jewels` — **full** — intent firewall holding ✅; attach the Hansard primary; `restates` type is a soft fit for an asserted-connection claim.

### Method (the study's own rules)
- `method-stance` — **full** (PRINCIPLE).
- `grading-system` — **full** (PRINCIPLE).
- `hard-sourcing-rule` — **stub** (incubating, `tags:[]`) — **finish now**; the third leg of the method rail, written from the governance files (no external harvest).
- `double-parentage` — **full** (FRAME).

---

## PART 3 — MASTER ADJACENCY LIST (deduplicated, grouped by Atlas rail)

Newly-surfaced documented neighbor nodes not yet in the graph. `name — lead source — disposition`. (Nodes named by two clusters are listed once, under their primary rail.)

### §A Occult lineage
- OTO / Ordo Templi Orientis — Reuss charter 1912; Crowley's OTO constitutions — **build**
- Rose Edith Kelly — Crowley, *The Equinox of the Gods* — **build**
- S.L. MacGregor Mathers / Golden Dawn — *Confessions*; R.A. Gilbert — **build**
- Manly P. Hall's PRS + *The Secret Teachings of All Ages* (1928) — Sahagun, *Master of the Mysteries* — **build**
- Gerald Gardner / Wicca — OTO charter; Gardner, *Witchcraft Today* — **build** (new-rail seed, §E)
- Anton LaVey / Church of Satan (1966) — *The Satanic Bible* — incubate
- Theodor Reuss · Victor Neuburg · Karl Germer · Israel Regardie — OTO/biography records — incubate
- Aiwass (concept) · Frater Achad (C.S. Jones) — Liber AL; *Liber 31* — incubate
- Abbey of Thelema (Cefalù) · Rabelais' Abbey of Thélème · A.S. Neill / Summerhill — Symonds, *The Great Beast*; *Summerhill* (1960) — incubate (liberation-register mirrors)

### §B Aerospace, intelligence, state
- **Sidney Gottlieb** — Kinzer, *Poisoner in Chief*; NSA immunity testimony (Oct 2025) — **build** (atlas's own "node to expand"; connective hub)
- **Process Church of the Final Judgment** — 338 F. Supp. 1396; Bainbridge, *The Power*; Wyllie — **build** (resolves 4 dangling references)
- Frank Malina · Theodore von Kármán — Pendle, *Strange Angel*; von Kármán memoir — **build**
- Aerojet · GALCIT/Caltech — JPL institutional histories — **build**
- Scientology / Dianetics — Miller, *Bare-Faced Messiah*; Urban (Princeton) — **build**
- Urban / Atack / Melton (the held-open derivation trio) — their own works — **build** (this *is* the contradiction)
- Church Committee (Final Report, 1976) — **build** (documentary spine already quoted throughout)
- Donald Ewen Cameron (person) + Orlikow v. United States, 682 F. Supp. 77 (1988) — court record — **build**
- Robert Heinlein · John W. Campbell — Patterson, *Heinlein*; *Astounding* — build (SF sub-rail)
- Frank Olson · Operation Midnight Climax / George White · Richard Helms (person) · Roger Smith / Haight Free Clinic · Jack Ruby / Warren Commission — Church Cmte; O'Neill; Sixth Floor Museum — incubate
- "Suicide Squad" (Forman, A.M.O. Smith, Tsien) · Wilfred T. Smith · Sara Northrup — Pendle — incubate

### Deception sub-rail (surfaced by §A/§B — a genuinely new cluster)
- **Maxwell Knight** — Masters, *The Man Who Was M* — **build** (single highest-leverage connector: welds `wheatley-dennis` + `fleming-ian` + `crowley-aleister`)
- London Controlling Section · NID/Room 39/Adm. Godfrey · 30 Assault Unit — Wheatley, *The Deception Planners*; Macintyre — build
- Ewen Montagu / Operation Mincemeat · Somerset Maugham (*Ashenden*, *The Magician*) — incubate

### §C Music — **harvest-gated (Atlas §C, Part V)**
Beatles/*Sgt. Pepper* · Rolling Stones/Anger · Jimmy Page/Boleskine · Bowie/"Quicksand" · Ozzy/"Mr. Crowley" · Genesis P-Orridge/TOPY · Jay-Z (Rocawear "Do What Thou Wilt") / Marina Abramović — per-artist connection + intent split. **build after Music harvest.**

### §D Film & TV
- Kenneth Anger — (spine harvest present) — **build**
- Marjorie Cameron — Kansa, *Wormwood Star* — **build**
- Jon Povill (Roddenberry aide, Nine sessions) — incubate; *Rosemary's Baby* / occult-Hollywood lattice — hold

### §E Manufactured religion — **partial harvest-gated**
- Best Friends Animal Society (1991) · Timothy Wyllie · Ed Sanders (*The Family*) · Maury Terry (*The Ultimate Evil*) — incubate (grade Terry/Sanders as synthesizers)
- Wicca/Gardner · Church of Satan/LaVey primaries — **build after Religion-manufacture harvest**

### §F Psychedelia & counterculture — **harvest-gated**
- Uri Geller — Puharich, *Uri* — **build**
- Humphry Osmond · Gerald Heard — *Doors of Perception* correspondence — build
- Phyllis Schlemmer · D.G. Vinod · Puthoff/Targ (SRI) · Arthur Young / Sir John Whitmore — incubate
- Timothy Leary — atlas §F — **build after Psychedelic harvest**

### §G Eugenics theater — **branch off enactment (see ruling Q1), partial harvest**
- **Henry H. Goddard** — *The Kallikak Family* (1912); Hall's PhD student; Binet→US importer — **build** (highest §G leverage; welds into `hall-g-stanley`, `binet-alfred`)
- **Robert M. Yerkes** — WWI Army Alpha/Beta (with Terman) — **build** (testing goes to population scale)
- Charles Davenport / Eugenics Record Office (Cold Spring Harbor, 1910) — **build** (transatlantic bridge from Galton/Pearson)
- British Eugenics Society (Julian Huxley chaired) · E.S. Gosney / Human Betterment Foundation (Terman member) — **build** (institutions currently name-dropped)
- Pierre Teilhard de Chardin — the mysticism→managerial hinge (Julian/UNESCO) — **build**
- Harry Laughlin · Buck v. Bell (1927) · Carl Brigham (SAT) — incubate

### §I Smoothing catalogue — **harvest-gated (no §I primaries in `research/` yet)**
- Operation Northwoods (JCS memo, 13 Mar 1962, declassified) — Olmsted's own example — **build after §I harvest**
- COINTELPRO (Church Cmte Bk III; Media, PA files 1971) — **build after §I harvest**
- Gulf of Tonkin (Hanyok/NSA study, declass. 2005) — build/incubate after harvest
- Kathryn Olmsted (person) — *Real Enemies*, OUP — incubate

### §J Psychedelic dispersal — **harvest-gated**
Ken Kesey / Menlo Park VA study (pin the MKUltra-subproject primary) · Merry Pranksters / Acid Tests · Warlocks→Grateful Dead · Owsley Stanley · Hank Harrison → Courtney Love · McGowan/Laurel Canyon (synthesizer-grade). **build after Psychedelic Dispersal harvest.**

### §K Art world & leaked material — **harvest-gated**
Marina Abramović ("Spirit Cooking"; 2016 Podesta/WikiLeaks) — catalogue the over-read AND the smoothing · leaked/FOIA node-class. **build after Art-World harvest.**

### Trunk / Administrators (Part II — not in the §A–K catalog)
- **Alfred Milner** (Kindergarten / Round Table) — bridges `coefficients-club`→`quigley-carroll` — **build** (two orphans threaded in one move)
- Saint-Simon · Comte · Mosca / Pareto / Michels — elite-theory ring behind `rule-by-trained-elite` + `burnham-james` — build/incubate
- The Academy · *Statesman* / *Laws* · Dionysius II/Dion (the enacted philosopher-king) — build/incubate
- *Novum Organum* / *Great Instauration* · Hartlib "Invisible College" / Comenius · Boyle / Oldenburg / Sprat — the trunk's scientific pivot — build/incubate
- London School of Economics (1895) — Webb/Fabian institution — **build**
- The **X Club** (1864) — T.H. Huxley's dining club, a Coefficients mirror — build
- Other *Fabian Essays* contributors (Olivier, Wallas, Clarke, Bland) · Edward Pease · *New Statesman* — incubate
- Burnham's *The Managerial Revolution* / *The Machiavellians* · Quigley's *Tragedy and Hope* / *Anglo-American Establishment* — build (the works under the two stub persons)

### Enactment / Consent / Lifespan (documented neighbors)
- **Edward L. Thorndike** — *Educational Psychology* (1913); named in `managed-child`'s prose; James's student — **build**
- **B.F. Skinner** · Ivan Pavlov — the conditioning lineage forward/back of Watson — **build**
- **Gustave Le Bon** (*The Crowd*, 1895) — the crowd-manipulation taproot under Freud/Bernays — **build**
- **Graham Wallas** — Lippmann's LSE mentor — **build**
- **George Creel / Committee on Public Information** — Lippmann *and* Bernays both served; theory→state-practice bridge — **build**
- Frederic Truby King — parallel scheduled-feeding regime abroad — **build**
- Wilhelm Wundt — experimental-psychology taproot (Hall, James) — build
- **Carl Jung** — Campbell's acknowledged source (also §D) — **build**
- **George Lucas / Star Wars** — the famous documented monomyth adoption — **build**
- Eranos / Bollingen Foundation — funds Eliade↔Campbell (de-orphans `eliade-mircea`) — build
- Franklin Bobbitt · David Snedden · Henry Barnard · Théodore Simon · Rosalie Rayner · Ivy Lee · A.A. Brill · Wilfred Trotter · Stanley Resor · Peggy Charren/ACT · Erik Erikson · Blake Snyder · Bill Moyers — incubate

### Theosophy hub (deferred but load-bearing)
- **Helena Blavatsky** + **Henry Steel Olcott** — TS founders (*The Secret Doctrine*; TS records) — **build** (the hub every articulation node hangs off)
- **Maria Montessori** — hosted at Adyar; bridges articulation→education/enactment — **build**
- Anthroposophical Society + Emil Molt / first Waldorf school — Steiner's institution/education bridge — build
- William Quan Judge · George Arundale · Hubert van Hook · Foster Bailey · Arcane School / World Goodwill (UN-consultative = denominator caution) · Jiddu Narayaniah · David Bohm — incubate

---

## PART 4 — HARVEST REQUIREMENTS (per rail; the moat: primaries before grading)

**No new harvest needed (build/wire from evidence in hand):**
- The smoothing rail's **intra-cluster wiring** and `process-church` / `gottlieb-sidney` builds (primaries already in `research/mkultra-west-june2026-harvest.md` + Kinzer/NSA).
- The enactment **adjacency builds** whose primaries are canonical published works (Thorndike 1913, Skinner, Le Bon 1895, Goddard 1912, Yerkes/Army tests, Jung, Lucas/Campbell).
- The `hard-sourcing-rule` finish (from the governance files).
- All **H1–H10 hygiene** fixes.

**Verify coverage, then build:**
- **Crowley-in-America rail** — a spine harvest exists (`research/crowley-in-america-rail-harvest.md`), but the per-figure crown builds (`parsons-jack`, `hubbard-lron`, `babalon-working`, `jpl`) may need per-figure depth the spine harvest doesn't carry (Pendle *Strange Angel*, Parsons FBI file [FOIA], the Parsons–Crowley Babalon correspondence, the Urban/Atack/Melton trio). **Audit the harvest against the crown-node build list before building; top up if thin.**

**New harvest required before any node is built (MASTER-PLAN Part V queue):**
- **Smoothing §I** — Northwoods, Church Committee, COINTELPRO, Gulf of Tonkin primaries. *(The existing harvest stops at MKUltra/West/Process/hearing.)*
- **Music §C** · **Psychedelic Dispersal §J** · **Art-World/leaked §K** · **Religion-manufacture §E (Wicca/LaVey)** · **Theosophy hub** (Blavatsky/Olcott/schism map) · **Puharich/Nine sub-cluster** (resolve the Round Table Foundation date/location seam) · **§G eugenics institutions** (Goddard/Yerkes/Davenport/HBF — persons buildable now, but the *program* nodes — Buck v. Bell, ERO, sterilization law — want a harvest).
- **Standing FOIA/leak sweep** — before any thread is called thin.

---

## PART 5 — PRIORITIZED BUILD SEQUENCE (ranked by load-bearing → density → adjacency)

**Tier 0 — Hygiene & free wiring (do first; protects the moat, near-zero research).**
1. Wire the **Smoothing rail** intra-cluster edges + `real-enemies` backlinks (**H8**) — and the `latey`→`hubbard-lron`/`parsons-jack` edge that stitches smoothing to the Crowley rail.
2. Clear the **primary-propagation** WELD breaches where the primary already exists (`only-planet-of-choice`, `externalisation-hierarchy`, `lucis-trust`, `order-of-the-star`) (**H1**).
3. Fix **non-canonical grade tokens** (**H2**), **reciprocal seams** (**H4**), **event-node edge misuse** (**H5**), **map collisions** (**H7**), and **merge** `coefficients-1902` (**H9**).
4. Escalate the **spec divergence** (**H6**) and the **`influenced`/`same-field` reclass** (**H3**) to a human ruling.
5. Finish `hard-sourcing-rule` (method rail's third leg).

**Tier 1 — Highest-value new builds (load-bearing to a *built* reading-entry; primaries in hand).**
6. **`process-church`** — load-bearing to *The Clean Version*; resolves four dangling references (process-v-sanders, dana, cameron, latey).
7. **`gottlieb-sidney`** — load-bearing to *The Clean Version* + `mkultra`; the rail's connective hub.
8. **Henry Goddard + Robert Yerkes (+ Davenport)** — load-bearing to *Measuring the Child*; each welds by documented relation into `hall-g-stanley`/`binet-alfred`/`terman-lewis`; nucleates §G.
9. **Aldous Huxley + `brave-new-world` (+ Julian tie)** — load-bearing to *Conditioning the Child*; closes an `authored`-edge gap; bridges dystopia↔§G↔`the-root`.
10. **Consent antecedents — Le Bon, Graham Wallas, Creel/CPI** — load-bearing to *Engineering Consent*; gives the Lippmann/Bernays seam a real upstream (fixes **H4** structurally).
11. **Alfred Milner + Burnham** — load-bearing to *The Trunk* / *The Administrators*; closes the trunk hub's open hypothesis edge and bridges to Quigley.
12. **Jung + Lucas; Eliade↔Campbell via Eranos** — load-bearing to *The Child Grown Up*; de-orphans `eliade-mircea`, gives the monomyth its backbone and adoption case.

**Tier 2 — MASTER-PLAN priority rails (density high; harvest audit/expansion first).**
13. **Crowley-in-America crown** (`parsons-jack`, `babalon-working`, `hubbard-lron`, `jpl`, + Malina/von Kármán/Aerojet/GALCIT) — Priority #1 in MASTER-PLAN; the densest documented cluster and the proof-of-method rail. *Audit the spine harvest first (Part 4).*
14. **Theosophy hub** (`theosophical-society` + Blavatsky/Olcott/Montessori) — anchors the whole articulation branch; **needs harvest**.
15. **Deception sub-rail** (Maxwell Knight hinge) — converts three orphan stubs (`wheatley`, `fleming`, + Crowley-intelligence) into a documented sub-web; small harvest.
16. **Smoothing §I expansion** (Church Committee → Northwoods → COINTELPRO) — **needs §I harvest**; Church Committee first (already quoted corpus-wide).

**Tier 3 — Zoom-out rails (harvest-gated; MASTER-PLAN Part V).**
17. **§G eugenics program nodes** (ERO/Laughlin, Buck v. Bell, HBF) — complete the theater.
18. **Music (§C)** · **Psychedelic Dispersal (§J)** · **Religion-manufacture (§E)** · **Film (§D)** · **Art-World (§K)** — each begins with its harvest.
19. The long tail — compile everything to a documented edge.

---

## PART 6 — OPEN QUESTIONS FOR OPERATOR RULING

- **Q1 — Eugenics (§G): branch off enactment, or its own rail?** Finding: enactment already carries the *measurement lineage* (Galton→Pearson→Terman) as documented co-symptom, welded to `the-root`; what's missing is the *theater* (institutions + applied program), which exists only as name-drops. **Recommendation: build a eugenics cluster branching off enactment, not a standalone rail** — the spine is already threaded; only the theater's nodes are absent.
- **Q2 — Is the smoothing the site spine?** Finding: on evidence, yes — the most primary-dense, least-contestable material in the corpus (a federal judgment, the Congressional Record, declassified CIA documents, an OUP scholarly backbone), and the one rail whose thesis needs no intent-claim to stand. But it **cannot carry a site as currently wired** (H8). **Recommendation: rule the spine question only after Tier-0 wiring + the §I harvest**, when the rail can actually be seen as a graph.
- **Q3 — The WELD-stub evidence-gate breach (H1).** Rule the disposition: (a) attach primaries where they already exist in-corpus (cheap, do now), and (b) for the rest, **demote to provisional/ungraded until harvested**, or leave WELD-pending — the moat says a reader-facing "documented" must have a primary under it.
- **Q4 — Reconcile `node-schema.md` to `EDGE-VOCABULARY.md` (H6),** and rule on adding a `co-authored` edge type.
- **Q5 — `coefficients-1902` (H9):** merge into `coefficients-club`, or keep as a bare timeline anchor?

*End of plan. Read-only pass; no node content changed. Awaiting the operator's ruling on scope and order before any expansion begins.*
