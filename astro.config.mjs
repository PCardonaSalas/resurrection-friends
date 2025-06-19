// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    assets: "_assets"
  },
  base: '/resurrection-friends',
  output: 'static',
  site: 'https://pcardonasalas.github.io',
  trailingSlash: 'always' // Esto ayuda con la compatibilidad de GitHub Pages
});
