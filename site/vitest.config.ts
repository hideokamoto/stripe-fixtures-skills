import { defineConfig } from 'vitest/config';

// JUnit output is written to <repo-root>/reports so CircleCI's
// `store_test_results: { path: reports }` step can pick it up.
export default defineConfig({
  test: {
    reporters: ['default', 'junit'],
    outputFile: {
      junit: '../reports/results.xml',
    },
  },
});
