import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The repo root is the CMS. The glob loader reads data/nodes/** and
// book/chapters/** in place (two levels up), so authored Markdown+YAML stays the
// single source of truth — no file is copied or edited.

// Closed edge vocabulary — EDGE-VOCABULARY.md (authoritative; the edge-lint
// integration enforces the same list and the moat at build time).
const edgeType = z.enum([
  'read', 'authored', 'met', 'influenced', 'mentored', 'groomed', 'advised',
  'funded', 'founded', 'member-of', 'broke-from', 'restates', 'precedes', 'no-relay',
]);
const transmission = z.enum(['worked-off', 'same-field', 'none']);
const edge = z.object({
  to: z.string(),
  type: edgeType,
  register: transmission.optional(),
  grade: z.string().optional(),
  source: z.string().optional(),
});
const edgeList = z.array(edge).nullish().transform((v) => v ?? []);
const strList = z.array(z.string()).nullish().transform((v) => v ?? []);

const nodes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../../data/nodes' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    type: z.enum(['person', 'work', 'institution', 'concept', 'event']),
    category: z.enum(['people', 'works', 'institutions', 'concepts', 'events']),
    dates: z.string().default('-'),
    grade: z.string().default('WELD'),
    map_node: z.string().optional(),
    status: z.enum(['stub', 'drafted', 'locked']).default('stub'),
    abstract: z.string().optional(),
    sources: strList,
    welds: edgeList,
    hypotheses: edgeList,
    tags: strList,
    backlink: z.boolean().optional(),
    // INCUBATE: a node held deliberately because it belongs to a planned but
    // unwritten rail (e.g. Crowley-in-America). Incubating ≠ orphaned — the
    // maintainer scan lists these separately and never flags them for retirement.
    incubating: z.boolean().optional(),
  }),
});

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../../book/chapters' }),
  schema: z.object({
    chapter: z.number(),
    part: z.string().optional(),
    title: z.string(),
    status: z.enum(['stub', 'drafted', 'locked']).default('stub'),
    register: z.string().optional(),
    draws_on: strList,
    governing_rule: z.string().optional(),
  }),
});

// Essays = essays ABOUT THE WORK (thesis / lineage / method), not media decodes
// (DECISIONS.md S-12). The "Ask About Illuminati" decode series is parked under
// essays/_parked-decodes/ and is EXCLUDED here two ways: the leading `_` keeps it
// out of Astro's content layer, and the negated glob makes the exclusion explicit
// so nothing parked can ever render or be backlinked. README.md is not an essay.
const essays = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!_parked-decodes/**', '!README.md'],
    base: '../../essays',
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date().optional(),
    status: z.string().default('stub'),
    rail: z.string().optional(),
    // grounding nodes (the essay's "receipts") — linked, poppable, at the foot
    grounding_nodes: strList,
    // fields on the stub index / older essays
    scope: z.string().optional(),
    stands_on: strList,
    draws_on: strList,
  }),
});

export const collections = { nodes, chapters, essays };
