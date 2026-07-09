// ---------------------------------------------------------------------------
// The signature (§IV.16 / node-schema "Grade → certainty"): the reader NEVER
// sees the internal grade vocabulary (WELD / HYPOTHESIS / FICTION-ALERT / …).
// The site derives a plain, monochrome certainty word — documented · possible ·
// apocryphal — and renders that, hoverable for a one-line definition. Never a
// colour-coded badge. FRAME / PRINCIPLE are structural, not claims, so they get
// a label and no certainty word; DISCARD is omitted from the site entirely.
// ---------------------------------------------------------------------------

export type Certainty = 'documented' | 'possible' | 'apocryphal';

export interface Standing {
  /** Plain reader-facing word, or null when the node is structural (FRAME/PRINCIPLE). */
  certainty: Certainty | null;
  /** One-line plain-language definition, shown on hover/focus. */
  def: string | null;
  /** Structural label for FRAME / PRINCIPLE nodes (they carry no certainty claim). */
  structural: 'framework' | 'principle' | null;
  /** True when the grade is DISCARD — the node should not be published at all. */
  discarded: boolean;
}

export const CERTAINTY_DEF: Record<Certainty, string> = {
  documented:
    'Documented: verifiable in the record — who wrote, met, funded, or said what. Survives a hostile reader.',
  possible:
    'Possible: a resemblance or suspected tie, legitimate to pursue but never cited as proof.',
  apocryphal:
    'Apocryphal: circulates as fact but traces to a fabricated or fictional source. Flagged so it never enters the foundation.',
};

/** Map an internal `grade` to reader-facing standing. Case/suffix tolerant. */
export function standingFromGrade(grade: string | undefined | null): Standing {
  const g = (grade ?? '').trim().toUpperCase();

  if (g === 'DISCARD') {
    return { certainty: null, def: null, structural: null, discarded: true };
  }
  if (g === 'FRAME') {
    return { certainty: null, def: null, structural: 'framework', discarded: false };
  }
  if (g === 'PRINCIPLE') {
    return { certainty: null, def: null, structural: 'principle', discarded: false };
  }
  if (g.startsWith('WELD')) {
    return { certainty: 'documented', def: CERTAINTY_DEF.documented, structural: null, discarded: false };
  }
  if (g.startsWith('HYPOTHESIS')) {
    return { certainty: 'possible', def: CERTAINTY_DEF.possible, structural: null, discarded: false };
  }
  if (g.startsWith('FICTION')) {
    return { certainty: 'apocryphal', def: CERTAINTY_DEF.apocryphal, structural: null, discarded: false };
  }
  // Unknown internal grade: fail safe to no claim rather than leaking the vocab.
  return { certainty: null, def: null, structural: null, discarded: false };
}

// ---------------------------------------------------------------------------
// Node register (articulation vs enactment) lives in `tags` (schema "Two axes").
// Distinct from the edge transmission axis. Surface it plainly in the metadata
// line when present.
// ---------------------------------------------------------------------------
export function nodeRegister(tags: string[]): string | null {
  const has = (t: string) => tags.map((x) => x.toLowerCase()).includes(t);
  const a = has('articulation');
  const e = has('enactment');
  if (a && e) return 'articulation & enactment';
  if (a) return 'articulation';
  if (e) return 'enactment';
  return null;
}

/** Title-case a category/type slug for display ("people" → "People"). */
export function titleCase(s: string): string {
  return s.replace(/(^|[\s-])([a-z])/g, (_, sep, c) => sep + c.toUpperCase());
}
