// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ───────────────────────────────────────────────────────────
//  Hosting: GitHub Pages (workflow .github/workflows/pubblica.yml), dominio
//  www.psicheholos.it impostato in Settings → Pages (niente file CNAME: con il
//  deploy da GitHub Actions viene ignorato). Vedi docs/LANCIO.md.
// ───────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://www.psicheholos.it',
  base: '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      // pagine in noindex: fuori dalla sitemap
      filter: (page) => !/\/(privacy|note-legali)\/$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
