/// <reference types="vitest/config" />
import { themeInitScript } from '@eylulg/ui/theme-script';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  // The repository is eylulg.github.io, a GitHub Pages user site served from the domain root.
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'theme-init',
      transformIndexHtml: () => [
        { tag: 'script', children: themeInitScript, injectTo: 'head-prepend' },
      ],
    },
  ],
  build: {
    // The Turkish font subset is 3 kB: as a file it loads only on a page that uses it, as a data URI it would weigh down every stylesheet.
    assetsInlineLimit: (file) => (file.endsWith('.woff2') ? false : undefined),
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    // The linked library has its own node_modules; share this app's single copy of these.
    dedupe: ['react', 'react-dom', 'react-aria-components', 'lucide-react'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
    restoreMocks: true,
  },
});
