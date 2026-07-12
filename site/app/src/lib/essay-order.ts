// The canonical reading order for the essays — the guided thesis sequence.
// Two Testimonies is the front door (overview); then the spine runs in chapter
// order, with The Administrators seated as the master essay at the head of the
// trunk/administrators cluster. Both the homepage list and the per-essay
// prev/next navigation read from this single source so the site reads as one
// continuous guided sequence.
export const ESSAY_ORDER = [
  'two-testimonies',                 // front door — overview
  'humanity-as-administrable-stock', // the root
  'the-administrators',              // master essay, head of the administrators cluster
  'the-trunk',                       // administrators
  'the-seed',                        // articulation seed
  'the-four-idioms',                 // the hinge and the four idioms
  'measuring-the-child',             // enactment — measuring
  'conditioning-the-child',          // enactment — conditioning
  'engineering-consent',             // consent
  'the-clean-version',               // smoothing — head of the smoothing rail (covert state enactment + its over-tidying)
  'the-denominator',                 // the base rate / honesty
  'reverberation-not-conspiracy',    // method
  'liberation-as-the-first-step',    // method
  'from-the-nursery-to-the-toy-aisle', // enactment — the marketplace
  'the-child-grown-up',              // lifespan
  'either-way',                      // the Coda
] as const;

// Rank map for sorting; unknown ids sort to the end (stable, alphabetical).
const RANK = new Map(ESSAY_ORDER.map((id, i) => [id, i]));

export function essayRank(id: string): number {
  return RANK.has(id) ? (RANK.get(id) as number) : Number.MAX_SAFE_INTEGER;
}

// Given the current essay id, return the previous/next ids in reading order
// (null at the ends).
export function essayNeighbors(id: string): { prev: string | null; next: string | null } {
  const i = ESSAY_ORDER.indexOf(id as (typeof ESSAY_ORDER)[number]);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? ESSAY_ORDER[i - 1] : null,
    next: i < ESSAY_ORDER.length - 1 ? ESSAY_ORDER[i + 1] : null,
  };
}
