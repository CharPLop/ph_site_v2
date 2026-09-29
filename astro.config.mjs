// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// Keystatic (pannello per blog e novità) solo in sviluppo: `npm run dev` → /keystatic.
// La build di produzione resta statica e non lo include.
const sviluppo = process.argv.includes('dev');

// ───────────────────────────────────────────────────────────
//  IMPORTANTE — quando compri il dominio:
//  1. cambia `site` qui sotto col dominio reale (con https://, niente slash finale)
//  2. su Cloudflare Pages il dominio si configura dal dashboard (NIENTE file CNAME)
//  3. `base` resta '/' (dominio custom)
// ───────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://www.psicheholos.it', // ← PLACEHOLDER: aggiorna col dominio reale
  base: '/',
  // In sviluppo 'ignore': le API di Keystatic non usano lo slash finale
  trailingSlash: sviluppo ? 'ignore' : 'always',
  integrations: [
    ...(sviluppo ? [react(), keystatic()] : []),
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
