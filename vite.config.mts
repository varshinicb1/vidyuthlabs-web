/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // three.js alone is ~720 kB minified; it is split out and loaded lazily.
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // three.js changes rarely; a separate chunk stays cached across site updates.
        manualChunks: {three: ['three']},
      },
    },
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
