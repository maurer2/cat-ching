import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import sassDts from 'vite-plugin-sass-dts';
import eslint from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';

export default ({ mode }: { mode: string }) => defineConfig({
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
        outputFilePath: path.resolve(__dirname, './src/style.d.ts'),
      },
    }),
    legacy(),
  ],
  define: {
    'process.env.NODE_ENV': `"${mode}"`,
  },
});
