# GWERN.NET — deep audit, and the map onto *The Managed Child*
*What the site actually does, why the popups are the whole point, and exactly how each feature becomes a feature of ours. Written after reading Gwern's own Design page, Style Guide, Manual of Style, the "Xanadu" essay, and the codebase notes.*

---

## 0. The one idea everything hangs from: **semantic zoom**

Gwern's site is not a collection of pages. It is one hypertext you read at **adjustable depth**. Any reference can be seen at five zoom levels, and the reader chooses which:

```
link-icon  →  title  →  abstract  →  section  →  full page
   (what it is)   (its name)   (the gist)   (a slice)   (everything)
```

Everything else on the site — popups, transclusion, collapses, backlinks — exists to let the reader slide up and down that ladder **without leaving the sentence they're on.** This is the design principle to steal wholesale, because it is *identical* to what our project needs: a reader should be able to meet a claim, zoom to its grade, zoom to its source, zoom to the whole node, and zoom back out — never losing their place in the argument. "Shows its work" is just semantic zoom pointed at evidence.

---

## 1. The popup / popin system — **the thing that was missed**

This is the soul of the site. I previously built a tooltip (a definition card). That is not this.

**What it actually is:** hover (desktop) or tap (mobile) *any* link, and the **entire target is transcluded into a floating panel** — its title, its metadata line, its abstract or full body, its own table of contents, its own similar-links. Not a summary written for the tooltip: the real target, pulled in live.

**Desktop = popup.** A floating card. It can be **moved, pinned ("stickied") so it stays, and fullscreened.** Multiple can be open at once.

**Mobile = popin.** The panel from your screenshots: a title bar with an eye-toggle and an X, the transcluded content, a table of contents, and **[Open in new tab]** at the foot. New ones **stack on top** of the old, so you can dive three references deep and then close back out one X at a time.

**Recursive / stacking.** Because the popup contains real links, and those links pop up too, you get **popups inside popups, arbitrarily deep — even loops.** This is the frictionless-navigation payoff: you trace a citation trail without ever loading a new page.

**Mobile nicety worth copying:** the links at the *top* of a popin (backlinks / similar / bibliography) don't open a fresh popin on mobile — they **jump down to the transcluded version** already sitting at the bottom of the panel, so a tap never dead-ends in a disappointment.

**The escape hatch:** a floating toggle can **disable popups** entirely for readers who find them busy. We should ship that too.

> **Map to us.** Every node-link, every graded claim, every figure's name becomes a popup/popin that transcludes that node's real entry — grade, one-line, edges, sources — and the edges *inside* it pop up their own nodes. The knowledge graph stops being a diagram you visit and becomes something you **feel through the reading**, exactly as the ROADMAP promised ("the graph felt through reading, before the graph is drawn").

---

## 2. Transclusion — the engine under the popups

Popups are just one use of the real primitive. **Transclusion** copies content from anywhere into anywhere, client-side, **lazily** (only when needed) and **recursively.** It is written as plain CSS classes on a link, e.g.:

- `.include-annotation` — pull in the target's annotation block (its metadata + abstract).
- `.include-strict` — pull it in immediately (not lazily), as a performance or correctness guarantee.

Because it's lazy and recursive, a single index page can transclude thousands of entries without dying. **This is what lets one authored thing appear in three places** — the same Julian-Huxley node as a reference entry, a book beat, and an essay citation — *authored once, surfaced everywhere.* That is precisely the "build a claim once, grade it once, cite it everywhere" rule from CONVENTIONS, solved as infrastructure.

---

## 3. Annotations — the metadata layer that makes popups worth having

A popup is only as good as what's behind the link. Gwern's answer is the **annotation**: a stored abstract + metadata for a link. They are **auto-extracted** where possible (Arxiv, Crossref, etc.) and **hand-written** where not, kept consistent by rewrite-rules and even ML that breaks dense abstracts into readable paragraphs.

Crucially: **partial annotations.** A link with no real abstract but *some* metadata (tags, backlinks) still pops up a bare-bones card showing what little is known — so the reader "knows not to expect too much" rather than hitting nothing.

> **Map to us.** Our annotation *is* the node's frontmatter: the certainty word, the register (worked-off / same-field), the one-line abstract, the sources. Every node already carries exactly the fields an annotation needs. We are, structurally, already 80% of the way to Gwern's annotation system — we just haven't rendered it as popups yet.

---

## 4. Backlinks, similar-links, bibliography — the "just keep reading" trio

Three auto-generated appendices sit transcluded at the bottom of every page/annotation:

- **Backlinks** — every place that links *to* this page, shown **with the surrounding context** of the citation (a "reverse transclusion"), not just a bare list. So you see *how* you were cited.
- **Similar-links** — related items, generated from **text embeddings.**
- **Link-bibliography** — every outbound link, collected.

They're transcluded (not just linked) so the reader can **"just keep reading"** straight into them, or pop them up from the top of the page.

> **Map to us.** Backlinks are the anti-conspiracy wiki's honesty made navigable: every node shows what leans on it. Similar-links, run over our own node abstracts, become "other nodes on this rail." Both are free once the graph exists.

---

## 5. The metadata line, link-icons, and epistemic tags

Under every title/link sits a compact **metadata line**: author, date, tags, and small **link-icons** — little glyphs marking what a link *is* (Wikipedia, PDF, Arxiv, code…) so the reader knows before clicking. Pages also carry **epistemic tags** — `status` (draft→finished) and `certainty`/`importance` — rendered as quiet marginal metadata.

> **Map to us.** This is the direct ancestor of our signature. Gwern's `certainty: highly likely` **is** our *documented / possible / apocryphal*. We render ours the same way: a plain italic word in the metadata line, hoverable for its definition — never a gold badge.

---

## 6. Sidenotes, typography, modes

- **Sidenotes.** Tufte-style notes in the wide margin on desktop; on mobile they collapse into **footnote-popins.** The margin is where the apparatus lives, so the body stays clean.
- **Typography.** Monochrome by design; **dropcaps** and **smallcaps**; collapsible/disclosure sections; multi-column lists; inflation-adjusted figures; subscripted citations. Restraint is deliberate — the ornament is removed so the *reading* and the *epistemics* are the focus.
- **Dark mode + reader mode**, plus the **floating toggle bar** in the corner: dark, reader, disable-popups, search, help.

> **Map to us.** We already chose Gwern-parity restraint and the indigo-whisper palette. Sidenotes-on-desktop / popins-on-mobile is now on the build list. The floating control bar (dark · reader · popups-off) is a half-day of work and makes the site feel finished.

---

## 7. Long Content & local archiving (the durability ethic)

Gwern **mirrors external links locally** so they don't rot; a popup offers an `[original]` link back to the live web. The guiding idea is **"Long Content"** — writing built to stay useful and self-contained for decades.

> **Map to us.** Directly on-brand for a reference meant to "survive a hostile reader." Sources we cite should be archived, not just linked, so the foundation can't crumble under us. This is a later-phase concern, but worth naming now.

---

## 8. The stack (so we know what we're *not* rebuilding)

| Layer | Gwern | What we do instead |
|---|---|---|
| Content | Pandoc Markdown + YAML | **Same** — our nodes are already MD+YAML |
| Build | **Hakyll** (Haskell SSG) | **Astro** (our choice; simpler, same job) |
| Link metadata / annotations | custom Haskell (`LinkMetadata.hs`, `LinkAuto.hs`) | our node frontmatter + a small build step |
| Frontend | **custom vanilla-JS** pub/sub framework by Said Achmiz (`popups.js`, `transclude.js`) | a small popup/transclude script (prototyped now) |
| Assets / misc | PHP, Python (LLM text), Shell (embeddings, archiving) | Astro + optional scripts later |

The essential lesson: **the heavy machinery is the popup + transclusion frontend, not the backend.** Gwern's own writing notes that these client-side features were *days* of work for a good engineer — the value is in the design, not exotic tooling. We do **not** need Haskell. We need the frontend behavior, and Markdown that carries the right fields (which ours does).

---

## 9. What to actually build, in order (Gwern-faithful, Astro-friendly)

1. **The popin/popup transclusion** — tap/hover a link → the target node transcludes into a panel; the links inside it stack on top; X or Esc closes back out. *(Prototyped alongside this audit — see the HTML file.)*
2. **The metadata line as annotation** — certainty word + register + backlinks/similar/sources icons, each poppable.
3. **Sidenotes** — margin on desktop, footnote-popins on mobile.
4. **Backlinks + similar-links** transcluded at page foot ("just keep reading").
5. **Floating control bar** — dark · reader · disable-popups.
6. **The graph explorer + the two scroll set-pieces** — last, once the reading experience is right.

The order matters for the same reason it did in the ROADMAP: get **one page** to feel like Gwern before scaling to seventy-eight nodes.

---

*Sources read for this audit: gwern.net/design, gwern.net/style-guide, gwern.net Manual of Style, gwern.net/xanadu, gwern.net/design-graveyard, the gwern/gwern.net repo README, and the unofficial codebase docs (Pleometric). All paraphrased.*
