# Psiche Holos — ph_site_v2

Sito istituzionale dello studio **Psiche Holos** (Brescia).
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

## Pubblicazione

Hosting su **GitHub Pages**. Ogni push su `main` lancia il workflow **Pubblica**
(`.github/workflows/pubblica.yml`): build con il guard dei segnaposto e deploy su Pages.
Il workflow **Controlli** verifica accessibilità, link e HTML su ogni push.

- **Prima del lancio** (anteprima, sempre noindex): https://charplop.github.io/ph_site_v2/
  — `npm run build:anteprima` adatta la build alla sottocartella (`scripts/anteprima-github.mjs`).
- **Dopo il lancio** (variabile di repo `DOMINIO_ATTIVO` = `si`): https://www.psicheholos.it

Le foto originali ad alta risoluzione stanno in `_originali/` (le scartate in
`_originali/non-usate/`, fuori dal repo).

Messa online, DNS ed email: `docs/LANCIO.md`.

## Blog e novità

Un file `.md` per articolo in `src/content/blog/` (novità in `src/content/news/`),
campi del frontmatter in `src/content.config.ts`. Con `bozza: true` il contenuto
si vede solo con `npm run dev` e non va online.
