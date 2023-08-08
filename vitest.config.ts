import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    clearMocks: true,
    // exclude: ['**/*.native.spec.tsx'],
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: [
        '**/*.spec.tsx',
        '**/*.spec.ts',
        '**/*.types.ts',
        '**/*.styles.ts',
        '**/setupTests.ts',
      ],
    },
  },
});
