import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ═══════════════════════════════════════════════════════════
//  CONTENT COLLECTIONS — Psiche Holos
//  • blog  → approfondimenti educativi (articoli lunghi, sempreverdi)
//  • news  → novità brevi (gruppi, iniziative, appuntamenti)
//  Ogni contenuto è un file .md dentro src/content/<collection>/
//  Imposta `bozza: true` nel frontmatter per tenerlo offline.
// ═══════════════════════════════════════════════════════════

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    titolo: z.string(),
    descrizione: z.string(),
    data: z.coerce.date(),
    autore: z.string().default("Psiche Holos"),
    copertina: z.string().optional(), // path in /public, es: "/foto/ilenia/ilenia-studio-01.jpg"
    copertinaAlt: z.string().optional(),
    tag: z.array(z.string()).default([]),
    bozza: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    titolo: z.string(),
    descrizione: z.string(),
    data: z.coerce.date(),
    ctaLabel: z.string().optional(), // es: "Scrivici per informazioni"
    ctaHref: z.string().optional(), // es: "/contatti/"
    bozza: z.boolean().default(false),
  }),
});

export const collections = { blog, news };
