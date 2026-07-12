// Reading-aware essay ordering. The single source of truth is READINGS.md,
// parsed at build into readings.json. An essay's DEFAULT prev/next follows its
// PRIMARY reading (the first reading, in order, that contains it); the reading-
// lens UI re-threads prev/next client-side to whichever reading the reader picks.
// The Method and the Coda are cross-cutting (served by / closing every reading)
// and carry no fixed default neighbours.
import readingsData from '../data/readings.json';

export interface Reading {
  num: string;
  order: number;
  slug: string;
  title: string;
  argument: string;
  essays: string[];
}
export const READINGS: Reading[] = readingsData.readings as Reading[];
export const METHOD_ESSAYS: string[] = readingsData.method as string[];
export const CODA_ESSAYS: string[] = readingsData.coda as string[];

const primaryReadingOf = new Map<string, Reading>();
for (const r of [...READINGS].sort((a, b) => a.order - b.order)) {
  for (const id of r.essays) if (!primaryReadingOf.has(id)) primaryReadingOf.set(id, r);
}

export function primaryReadingSlug(id: string): string | null {
  if (primaryReadingOf.has(id)) return primaryReadingOf.get(id)!.slug;
  if (METHOD_ESSAYS.includes(id)) return 'method';
  if (CODA_ESSAYS.includes(id)) return 'coda';
  return null;
}

// Default neighbours = position within the essay's PRIMARY reading.
export function essayNeighbors(id: string): { prev: string | null; next: string | null } {
  const r = primaryReadingOf.get(id);
  if (!r) return { prev: null, next: null };
  const i = r.essays.indexOf(id);
  return {
    prev: i > 0 ? r.essays[i - 1] : null,
    next: i < r.essays.length - 1 ? r.essays[i + 1] : null,
  };
}

// Backwards-compatible rank (concatenated reading order, then method, then coda);
// unknown ids sort to the end.
const RANK = new Map<string, number>();
let k = 0;
for (const r of READINGS) for (const id of r.essays) if (!RANK.has(id)) RANK.set(id, k++);
for (const id of [...METHOD_ESSAYS, ...CODA_ESSAYS]) if (!RANK.has(id)) RANK.set(id, k++);
export function essayRank(id: string): number {
  return RANK.has(id) ? (RANK.get(id) as number) : Number.MAX_SAFE_INTEGER;
}
