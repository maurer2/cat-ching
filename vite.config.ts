import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default ({ mode }) => defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  define: {
    'process.env.NODE_ENV': `"${mode}"`,
  },
});
