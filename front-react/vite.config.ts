import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../front-hono/dist',
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'src/entry/Login.tsx'),
        dashboard: resolve(__dirname, 'src/entry/Dashboard.tsx'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    manifest: 'manifest.json'
  }
});