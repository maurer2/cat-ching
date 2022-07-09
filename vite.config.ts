/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import sassDts from 'vite-plugin-sass-dts';
import eslint from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';
import path from 'node:path';

export default ({ mode }) => defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    eslint(),
    sassDts({
      enabledMode: ['development'],
      global: {
        generate: true,
        // eslint-disable-next-line unicorn/prefer-module
        outFile: path.resolve(__dirname, './src/style.d.ts'),
      },
    }),
    legacy(),
  ],
  define: {
    'process.env.NODE_ENV': `"${mode}"`,
  },
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
