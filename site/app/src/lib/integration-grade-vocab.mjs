// Astro integration: after the static build finishes, scan the rendered output
// for leaked internal grade vocabulary and FAIL the build if any is found.
// Wired into astro.config.mjs so `npm run build` enforces CLAUDE.md rule (b)
// automatically — no separate step to remember.

import { scanGradeVocab, formatFindings } from './scan-grade-vocab.mjs';

export default function gradeVocabGuard() {
  return {
    name: 'grade-vocab-guard',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const findings = await scanGradeVocab(dir);
        if (findings.length > 0) {
          logger.error('\n' + formatFindings(findings));
          // Throwing in astro:build:done aborts the build with a non-zero exit.
          throw new Error(
            `grade-vocab-guard: ${findings.length} grade-vocabulary leak(s) in rendered pages (see above).`,
          );
        }
        logger.info('grade-vocab-guard: clean — no internal grade vocabulary in any rendered page.');
      },
    },
  };
}
