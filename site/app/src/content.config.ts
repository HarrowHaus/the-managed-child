import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The repo root is the CMS. The glob loader reads data/nodes/** and
// book/chapters/** in place (two levels up), so authored Markdown+YAML stays the
// single source of truth — no file is copied or edited.

const edgeType = z.enum([
  'influenced', 'met', 'corresponded', 'cited', 'funded', 'mentored',
  'advised', 'founded', 'member-of', 'channeled', 'adapted', 'groomed',
  'schismed-from', 'co-founded', 'hosted',
]);
const transmission = z.enum(['worked-off', 'same-field']);
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
