// The signature (§IV.16 / CLAUDE.md rule b): the reader never sees the internal
// grade vocabulary. Derive a plain certainty word — documented · possible ·
// apocryphal — rendered monochrome, hoverable. FRAME/PRINCIPLE are structural
// (no claim); DISCARD is omitted from the site.

export type Certainty = 'documented' | 'possible' | 'apocryphal';

export interface Standing {
  certainty: Certainty | null;
  def: string | null;
  structural: 'framework' | 'principle' | null;
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

export function standingFromGrade(grade: string | undefined | null): Standing {
  const g = (grade ?? '').trim().toUpperCase();
  if (g === 'DISCARD') return { certainty: null, def: null, structural: null, discarded: true };
  if (g === 'FRAME') return { certainty: null, def: null, structural: 'framework', discarded: false };
  if (g === 'PRINCIPLE') return { certainty: null, def: null, structural: 'principle', discarded: false };
  if (g.startsWith('WELD')) return { certainty: 'documented', def: CERTAINTY_DEF.documented, structural: null, discarded: false };
  if (g.startsWith('HYPOTHESIS')) return { certainty: 'possible', def: CERTAINTY_DEF.possible, structural: null, discarded: false };
  if (g.startsWith('FICTION')) return { certainty: 'apocryphal', def: CERTAINTY_DEF.apocryphal, structural: null, discarded: false };
  return { certainty: null, def: null, structural: null, discarded: false };
}

export function nodeRegister(tags: string[]): string | null {
  const has = (t: string) => tags.map((x) => x.toLowerCase()).includes(t);
  const a = has('articulation');
  const e = has('enactment');
  if (a && e) return 'articulation & enactment';
  if (a) return 'articulation';
  if (e) return 'enactment';
  return null;
}

export function titleCase(s: string): string {
  return s.replace(/(^|[\s-])([a-z])/g, (_, sep, c) => sep + c.toUpperCase());
}
