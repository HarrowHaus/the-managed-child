// Astro integration: lint the graph's edges against EDGE-VOCABULARY.md and FAIL
// the build on any violation. Runs at build:start (edges are source data, so no
// need to wait for the render), keeping it a fast deterministic gate.

import { lintEdges, formatEdgeFindings } from './lint-edges.mjs';

export default function edgeLint() {
  return {
    name: 'edge-lint',
    hooks: {
      'astro:build:start': async ({ logger }) => {
        const findings = lintEdges();
        if (findings.length > 0) {
          logger.error('\n' + formatEdgeFindings(findings));
          throw new Error(`edge-lint: ${findings.length} edge-vocabulary violation(s) (see above).`);
        }
        logger.info('edge-lint: clean — every edge is in-vocabulary, resolves, and documented edges carry a primary.');
      },
    },
  };
}
