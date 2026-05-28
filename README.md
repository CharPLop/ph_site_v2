# Psiche Holos — ph_site_v2

Sito istituzionale dello studio **Psiche Holos** (Brescia · Rovato · Iseo).
Stack: **Astro 5** + **Tailwind CSS v4** (plugin Vite) + `@astrojs/sitemap`.
Multi-pagina statico, ottimizzato per SEO e Core Web Vitals.

## Sviluppo

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build statica in /dist
npm run preview    # anteprima della build
```

## Struttura

```
src/
├── config/site.ts          ← FONTE UNICA dei contenuti (testi, sedi, team, servizi)
├── styles/global.css       ← design tokens Psiche Holos (palette + font)
├── components/BaseHead.astro  ← SEO: meta, canonical, OG, JSON-LD
├── components/Header.astro · Footer.astro
├── layouts/BaseLayout.astro
└── pages/                  ← una pagina = una rotta (index, studio, team, servizi, scuole, contatti, privacy)
```

## Deploy su Cloudflare Pages

1. Push del repo su GitHub.
2. Cloudflare → Compute → Workers & Pages → Create → tab Pages → Connect to Git.
3. Build settings: preset `Astro`, build command `npm run build`, output `dist`.
4. Save and Deploy → URL `*.pages.dev`.
5. Dominio: aggiungilo come sito su Cloudflare (nameserver da Aruba), poi Custom domains nel progetto Pages. Aggiorna `site` in `astro.config.mjs`.

## ⚠️ Contenuti da completare (cerca `TODO` nel codice)

- **Bio Anna Marini e Valentina Nicolai** (`src/config/site.ts`).
- **Email / telefono / Instagram ufficiali dello studio** (ora placeholder coi recapiti di Ilenia).
- **Dominio reale** in `astro.config.mjs` e `robots.txt`.
- **Privacy policy** (`src/pages/privacy.astro`).
- **Foto** team/sedi + immagine OG `public/og-default.jpg` (1200×630).
