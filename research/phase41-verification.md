# Phase 41 — L2 Verification of Four Empirical Claims

Verifier pass for "The Reverberation." Each claim below carries a verdict, the
source + location, and the exact corrected wording to drop into the corpus.
Verified 2026-07-13 against live sources (WebSearch/WebFetch).

---

## CLAIM 1 — He-Man / FCC-1984 chronology

**VERDICT: PARTLY VERIFIED — the FCC action is real but the He-Man causal framing is FALSE. He-Man PREDATES the 1984 order and cannot be presented as its downstream effect.**

### What checks out
- **(a) The FCC 1984 deregulation is real.** On **27 June 1984** the FCC, under
  Reagan-appointed chairman **Mark S. Fowler**, adopted a Report and Order
  ("Revision of Programming and Commercialization Policies, Ascertainment
  Requirements, and Program Log Requirements for Commercial Television
  Stations," 98 FCC 2d 1076) that eliminated its **commercial-time guidelines**
  (the caps that had limited advertising minutes per hour, including in
  children's programming), along with program-log and ascertainment
  requirements. Fowler framed it as removing "another unnecessary layer of
  government control." Source: UPI, "FCC lifts many commercial TV rules,"
  27 June 1984 (upi.com Archives); Wikipedia, "Regulations on children's
  television programming in the United States."
- **The deregulation was later found legally inadequate as to children.** In
  *Action for Children's Television v. FCC*, 821 F.2d 741 (D.C. Cir. 1987), the
  court **remanded** the FCC's elimination of the children's-television
  commercialization guidelines as insufficiently justified (while upholding the
  logkeeping changes). This pressure culminated in the **Children's Television
  Act of 1990**. Source: *ACT v. FCC*, 821 F.2d 741 (case-law.vlex.com;
  Wikipedia, "Action for Children's Television").

### What is FALSE
- **(b) He-Man premiered 5 September 1983** in first-run/barter syndication —
  the first syndicated cartoon based on a toy line — and ran two seasons through
  1985. Source: Wikipedia, "He-Man and the Masters of the Universe"; epguides.com.
- **(c) Therefore He-Man CANNOT be presented as a downstream effect of the June
  1984 order.** It predates the order by roughly nine months. The same is
  broadly true of the trend: *Strawberry Shortcake* specials (1980), the toy-to-
  TV model, and He-Man itself were already underway. The 1984 order
  **accelerated and legitimized an already-emerging trend**; it did not
  originate it. (Transformers debuted Sept 1984 and G.I. Joe's regular series
  1985, so *those* post-date the order — but He-Man, the lead example, does not.)

### Exact corrected wording for the corpus
Replace any construction that makes 1984 the *cause* of He-Man. Use:

> In June 1984 the FCC, under chairman Mark Fowler, removed the commercial-time
> guidelines that had capped advertising in children's programming — part of a
> broad market-forces deregulation. The move accelerated a toy-driven form of
> children's television that was **already emerging**: *He-Man and the Masters
> of the Universe* had launched in syndication in **September 1983**, the year
> before the order, and *The Transformers*, *G.I. Joe*, and *My Little Pony*
> followed across 1984–85. Critics led by Action for Children's Television
> called the form the "program-length commercial." A federal court later
> (*ACT v. FCC*, 1987) found the FCC had failed to justify dropping the
> children's limits, and the Children's Television Act of 1990 reimposed them.

**Corpus files to fix:** `data/nodes/events/fcc-1984.md` (abstract + Documented
core both imply He-Man is a post-1984 effect) and
`essays/from-the-nursery-to-the-toy-aisle.md` (para: "Within a year, cartoons
built around licensed toy lines rose by about 300%: *He-Man…*" — He-Man belongs
before, not "within a year" after). The essay's own firewall ("the effect is
documented, the intent is not") is fine; the chronology inside it is not.

---

## CLAIM 2 — the "roughly 300%" figure

**VERDICT: VERIFIED (with a precision caveat) — a ~300% figure for licensed-character cartoons is documented, but pin it to 1984→1985 specifically, and it is best stated alongside the harder count (13 → 70+ toy-based shows, 1983→1988).**

### The documented numbers
- **"Between 1984 and 1985, cartoons featuring licensed characters increased by
  some 300%; by the end of 1985 there were more than 40 animated series running
  concurrently with licensed products."** This is the specific, sourced form of
  the 300% claim (widely reproduced from period industry/press analysis).
- **The more robustly sourced longitudinal count:** the number of U.S.
  **toy-based TV programs rose from 13 (1983) to more than 70 (1988)**, with
  related-product revenue roughly tripling ($26.7B → $64.6B). This figure traces
  to **Tom Engelhardt, "The Shortcake Strategy," in *Watching Television*, ed.
  Todd Gitlin (1986)**, and is repeated by Common Sense Media and *The
  Conversation* ("Masters of the Universe shows how companies learned to
  monetise childhood forever," 2024).

So the "~300%" is real but is a **one-year (1984→1985)** licensed-character
spike, not a general "year after the order" catch-all, and the underlying
absolute counts (13→70+ over 1983–88; 40+ concurrent by end of 1985) are the
firmer numbers.

### Sources
- *The Conversation*, "Masters of the Universe shows how companies learned to
  monetise childhood forever" (citing Common Sense Media for 13→70).
- Tom Engelhardt, "The Shortcake Strategy" (1986) — origin of the 13→70 count.
- Period industry summaries reproduced via web search (Serpentor's Lair;
  everything80spodcast) for the "some 300%, 1984–85" and "40+ by end of 1985."

### Exact corrected wording for the corpus
Keep 300% but **date it and anchor it**, or (safer) lead with the absolute count:

> After the June 1984 deregulation, cartoons built around licensed characters
> multiplied: by one industry count they rose roughly **300% between 1984 and
> 1985**, and more than **40** licensed-character series were airing by the end
> of 1985. Over the longer arc, the number of toy-based programs grew from about
> **13 in 1983 to more than 70 by 1988** (Tom Engelhardt, "The Shortcake
> Strategy," 1986).

If a single clean sentence is wanted, prefer the sourced count over the bare
percentage: *"the number of toy-based children's programmes rose from roughly 13
in 1983 to more than 70 by 1988."* Avoid the unanchored "rose roughly 300% in
the year that followed [June 1984]," which mis-dates the spike and drops the
attribution.

---

## CLAIM 3 — the SPR "reversal" of the Blavatsky/Hodgson finding

**VERDICT: NOT VERIFIED as stated — there was NO corporate/institutional SPR reversal. The corpus's "the Society stated Blavatsky was unjustly condemned" and "the body that condemned her later un-condemned her" are INACCURATE and must be reworded.**

### The record
- **(a) 1885 Hodgson Report.** In December 1885 the SPR's *Proceedings*
  published **Richard Hodgson**'s report concluding Blavatsky had written the
  "Mahatma Letters" and was "one of the most accomplished, ingenious, and
  interesting impostors in history." This was the report of an **investigator/
  committee**, published by the SPR — *not* a corporate verdict of the Society.
  Source: SPR Psi Encyclopedia, "Hodgson Report / Theosophy."
- **(b) Vernon Harrison's later criticism.** Published in the **Journal of the
  Society for Psychical Research, April 1986**, as **"J'Accuse: An Examination
  of the Hodgson Report of 1885."** Harrison — a professional handwriting/
  forgery expert and 50-year SPR member — found the report "riddled with slanted
  statements, conjectures advanced as fact or probable fact, uncorroborated
  testimony of unnamed witnesses, selection of evidence and downright falsity."
  He **expanded it into a 1997 monograph, *H.P. Blavatsky and the SPR: An
  Examination of the Hodgson Report of 1885*** (Theosophical University Press),
  concluding the report "is even worse than I had thought." **Crucially his own
  verdict was the Scots "NOT PROVEN"** — "His case against Madame H. P.
  Blavatsky is not proven" — i.e. he did not declare her innocent, he declared
  Hodgson's case unsound. Sources: theosociety.org (J'Accuse, Part 1);
  Theosophical Society in America, Quest.
- **(c) No corporate reversal.** The editorial note the SPR Journal ran with
  Harrison's 1986 article states plainly: **"Although, as it has been repeatedly
  pointed out, the SPR holds no corporate opinions, it has widely been regarded
  as responsible for endorsing the 'Hodgson Report.'"** The Society held no
  corporate opinion in 1885 and issued none in 1986. The famous phrase
  **"unjustly condemned" is NOT an SPR institutional finding** — it was the
  **headline of a May 1986 press release** ("MADAME BLAVATSKY … WAS UNJUSTLY
  CONDEMNED, NEW STUDY CONCLUDES"), drafted by SPR member **Leslie Price** to
  announce Harrison's paper. Note "**new study concludes**" — the claim is
  attributed to Harrison's study, not to a corporate SPR ruling. Sources:
  theosociety.org editorial note; theoarchive.com ("SPR withdraws fraud
  allegation in 1986" — a Theosophist gloss, itself evidence the "reversal"
  reading is a partisan framing, not the SPR's).

### The error in the corpus
Both `data/nodes/institutions/spr.md` and `data/nodes/people/blavatsky-helena.md`
frame this as an institutional flip: "the Society's own later finding," "the body
that condemned her later un-condemned her," "the SPR released a statement that
Blavatsky 'was unjustly condemned.'" That is exactly the corporate-verdict
picture the SPR's own editorial note disclaims. The 1885 report and the 1986
critique were both **works of individual members published under SPR auspices**,
not corporate SPR positions.

### Exact corrected wording for the corpus
For `spr.md` (Held-open) and `blavatsky-helena.md` (Held-open) use:

> In December 1885 the SPR's *Proceedings* published Richard Hodgson's report
> concluding Blavatsky had forged the "Mahatma Letters" and calling her "one of
> the most accomplished, ingenious, and interesting impostors in history." A
> century later the SPR's own *Journal* (April 1986) published Vernon Harrison's
> "J'Accuse," which found the Hodgson report "riddled with slanted statements …
> and downright falsity"; Harrison's own verdict was the Scots "not proven,"
> and he expanded the critique into a 1997 monograph. It is important to state
> what did **not** happen: the SPR **holds no corporate opinions** and issued no
> institutional reversal. The widely-quoted line that Blavatsky "was unjustly
> condemned" was the headline of a 1986 SPR **press release** announcing
> Harrison's study — the conclusion of one member's examination, not a verdict
> of the Society. Both the 1885 report and the 1986 critique are the work of
> individual investigators published under SPR auspices; the node keeps the
> tension without inventing a corporate flip.

**Delete** the phrasings "the body that condemned her later un-condemned her,"
"the Society's own later finding," and "the SPR released a statement that
Blavatsky 'was unjustly condemned'" (this last mis-assigns a press-release
headline to a corporate finding). Also correct the `spr.md` source line that
reads "the SPR statement of 8 May 1986 — the Society's own later finding … that
Blavatsky [was] 'unjustly condemned'": it was a **press release announcing
Harrison's paper**, not the Society's finding.

---

## CLAIM 4 — the Galton→Pearson→Cattell→Thorndike→Terman genealogy

**VERDICT: PARTLY VERIFIED — a DOCUMENTED disciplinary genealogy from Galton into American mental testing DOES exist (through Cattell and Thorndike), AND Terman explicitly cited Galton. So the corpus's flat "no line of citation … only a shared tradition" is TOO STRONG and should be corrected. Caveat: the specific unbroken advisor chain "…Thorndike → Terman" is NOT accurate — Terman's advisor was G. Stanley Hall, not Thorndike.**

### Each link, documented
- **(a) Galton → Pearson.** Karl Pearson was Galton's protégé, successor, and
  **biographer** — author of the multi-volume *The Life, Letters and Labours of
  Francis Galton* (1914–1930) — and the first **Galton Professor of Eugenics**,
  taking over Galton's Eugenics Record Office / Galton Laboratory at UCL.
  Direct, documented. (Sources: galton.org/pearson; Cambridge UP; Wikipedia,
  Karl Pearson.)
- **(b) Galton → Cattell.** James McKeen Cattell (PhD Leipzig under Wundt, 1886)
  did **postdoctoral research in Galton's London laboratory (c.1888–89)**,
  adopted Galton's methods, and **coined "mental test" in his 1890 paper "Mental
  Tests and Measurements"** (*Mind*). Direct, documented. (Sources: Britannica;
  Wikipedia, J.M. Cattell; Cambridge Psychometrics Centre. Cattell's 1890 paper
  is at psychclassics.yorku.ca.)
- **(c) Cattell → Thorndike.** Edward L. Thorndike took his **PhD at Columbia in
  1898 under Cattell** ("Animal Intelligence"). Direct advisor relationship,
  documented. (Sources: Wikipedia, Edward Thorndike; Britannica.)
- **(d) Terman → Galton (explicit citation, not advisor).** Terman **framed his
  work in Galton throughout**: *Genetic Studies of Genius* (Vol. I, 1925) grows
  directly out of Galton's *Hereditary Genius* (1869); Vol. II (Cox, 1926, under
  Terman) retrospectively assigned childhood IQs to historical figures and
  **estimated Galton's own childhood IQ at nearly 200**. Terman cited and
  invoked Galton by name. (Sources: Wikipedia, Genetic Studies of Genius / Lewis
  Terman; ASU Embryo Project.)

### The one broken link
**Thorndike → Terman is NOT an advisor/citation lineage.** **Terman's doctorate
(Clark, 1905) was under G. Stanley Hall**, not Thorndike. Thorndike and Terman
were contemporaries and rival leaders of American mental testing whose work
interacted, but Terman was not Thorndike's student. So the corpus should **not**
present a single unbroken teacher-to-student chain ending "…Thorndike → Terman."
The honest structure is: a documented advisor/institutional descent **Galton →
Cattell → Thorndike** (Columbia mental-testing lineage), PLUS a **direct,
explicit citation link from Terman back to Galton** — two documented connections,
not one linear chain.

### The error in the corpus
Both essays overstate the disconnection. `measuring-the-child.md` says the
American testers "worked in the tradition they founded, and a tradition is a
shared field … short of any documented line of citation" and that "the real
transmission … runs through a different door" (Hall → Terman only).
`reverberation-not-conspiracy.md` says Terman "worked inside the tradition Galton
had opened — but a tradition is a published climate any reader can breathe, not a
line of citation running from the Englishmen to the man in Palo Alto." That is
false as stated: Terman **explicitly cited Galton**, and a documented advisor
genealogy (Galton → Cattell → Thorndike) reaches into exactly the American
testing world Terman led.

### Exact corrected wording for the corpus
Replace the "no line of citation / only a shared tradition" move with a
distinction between *disciplinary genealogy* (which exists) and *a single direct
Galton→Terman advisor line* (which does not):

> Galton's measurement program reached American schooling by a **documented
> disciplinary genealogy**, not merely a shared climate. His protégé and
> biographer Karl Pearson made the mathematics exact and held the first Galton
> chair; his postdoctoral student James McKeen Cattell carried Galtonian
> measurement to America and coined "mental test" (1890); Cattell's own doctoral
> student Edward Thorndike built the Columbia school of educational measurement.
> Lewis Terman stands slightly to the side of that teacher-to-student line — his
> doctorate was under G. Stanley Hall — but he **cited Galton directly**,
> building *Genetic Studies of Genius* (1925) out of Galton's *Hereditary
> Genius* and even estimating Galton's childhood IQ at nearly 200. So the honest
> claim is not "no line of citation, only a tradition." It is that a **named,
> datable genealogy runs Galton → Cattell → Thorndike**, and that **Terman
> explicitly invoked Galton** — even though no single unbroken advisor chain
> runs straight from Galton to Palo Alto. The reverberation is documented; it is
> simply branched rather than linear.

Keep the rail's core point (no *conspiracy*, no secret relay) — that survives.
What must change is the specific false claim that there is "no line of citation"
and "only a shared tradition." There is a genealogy, and there is a citation.

---

## Summary of verdicts
1. **He-Man / FCC-1984 chronology — PARTLY VERIFIED / framing FALSE.** FCC order
   real (27 June 1984, Fowler, commercial guidelines dropped); He-Man predates it
   (Sept 1983) and cannot be its effect. Reframe as acceleration of an
   already-emerging trend.
2. **~300% figure — VERIFIED with caveat.** Real as a 1984→1985 licensed-
   character spike; anchor the date and pair with the firmer count (13→70+ toy-
   based shows, 1983–88; Engelhardt 1986).
3. **SPR "reversal" — NOT VERIFIED as stated.** No corporate SPR flip; SPR holds
   "no corporate opinions." 1885 Hodgson report and 1986 Harrison critique are
   individual works under SPR auspices; "unjustly condemned" was a press-release
   headline for Harrison's study, not an institutional finding. Harrison's own
   verdict was "not proven."
4. **Galton→…→Terman genealogy — PARTLY VERIFIED.** Documented genealogy exists
   (Galton→Pearson; Galton→Cattell→Thorndike) AND Terman explicitly cited Galton;
   the corpus's "no line of citation" is too strong. Caveat: Thorndike→Terman is
   not an advisor link (Terman's advisor was Hall), so present it as a branched
   genealogy plus a direct Terman→Galton citation, not one linear chain.
