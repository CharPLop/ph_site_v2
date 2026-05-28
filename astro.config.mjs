// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ───────────────────────────────────────────────────────────
//  IMPORTANTE — quando compri il dominio:
//  1. cambia `site` qui sotto col dominio reale (con https://, niente slash finale)
//  2. su Cloudflare Pages il dominio si configura dal dashboard (NIENTE file CNAME)
//  3. `base` resta '/' (dominio custom)
// ───────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://www.psicheholos.it', // ← PLACEHOLDER: aggiorna col dominio reale
  base: '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
