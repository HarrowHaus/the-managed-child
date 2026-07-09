import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ---------------------------------------------------------------------------
// Content collections. The repo root is the CMS: data/nodes/**, book/chapters/**.
// We point Astro's glob loader at those existing files rather than copying them
// into src/content — the authored Markdown+YAML is the single source of truth.
// Paths are relative to this project (site/astro/); the content sits two levels
// up at the repo root.
// ---------------------------------------------------------------------------

// Controlled vocab for edge relation type (schema §"Edge types").
const edgeType = z.enum([
  'influenced', 'met', 'corresponded', 'cited', 'funded', 'mentored',
  'advised', 'founded', 'member-of', 'channeled', 'adapted', 'groomed',
  'schismed-from', 'co-founded', 'hosted',
]);

// Edge transmission axis (per-edge). "worked-off" = documented encounter;
// "same-field" = parallel emergence. Distinct from the node register in `tags`.
const transmission = z.enum(['worked-off', 'same-field']);

// One out-edge — the shape shared by `welds` and `hypotheses`.
const edge = z.object({
  to: z.string(),
  type: edgeType,
  register: transmission.optional(),
  grade: z.string().optional(),
  source: z.string().optional(),
});

// coerce `key:` with no value (YAML null) into an empty array
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
    // Internal authoring vocabulary. Reader never sees this — the site derives a
    // plain `certainty` word from it (see lib/certainty.ts). Kept as a permissive
    // string so a new internal grade never breaks the build; unknown grades map
    // to "no certainty word" downstream.
    grade: z.string().default('WELD'),
    map_node: z.string().optional(),
    status: z.enum(['stub', 'drafted', 'locked']).default('stub'),
    abstract: z.string().optional(),
    sources: strList,
    welds: edgeList,
    hypotheses: edgeList,
    tags: strList,
    // Per §IV.8 a node/aggregator may opt out of receiving backlinks.
    backlink: z.boolean().optional(),
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

export const collections = { nodes, chapters };
