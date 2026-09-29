// ═══════════════════════════════════════════════════════════
//  Keystatic — pannello per scrivere gli articoli del blog e le novità
//  PROVA: gira solo in sviluppo (npm run dev → http://localhost:4321/keystatic)
//  e salva i file .md direttamente in src/content/. La build di produzione
//  non lo include: il sito online resta statico come prima.
//  I campi rispecchiano lo schema di src/content.config.ts.
// ═══════════════════════════════════════════════════════════
import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Psiche Holos" },
  },
  collections: {
    blog: collection({
      label: "Blog",
      slugField: "titolo",
      path: "src/content/blog/*",
      format: { contentField: "contenuto" },
      entryLayout: "content",
      columns: ["titolo", "data"],
      schema: {
        titolo: fields.slug({ name: { label: "Titolo" } }),
        descrizione: fields.text({ label: "Descrizione (anteprima e Google, 1–2 frasi)", multiline: true, validation: { length: { min: 50, max: 180 } } }),
        data: fields.date({ label: "Data di pubblicazione", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
        aggiornato: fields.date({ label: "Aggiornato il (facoltativo)" }),
        copertina: fields.text({ label: "Copertina: percorso della foto (es. /foto/corridoio/corridoio.jpg)" }),
        copertinaAlt: fields.text({ label: "Descrizione della copertina (per chi non vede l'immagine)" }),
        tag: fields.array(fields.text({ label: "Tag" }), { label: "Tag", itemLabel: (p) => p.value }),
        bozza: fields.checkbox({ label: "Bozza (non pubblicata)", defaultValue: true }),
        contenuto: fields.markdoc({ label: "Testo", extension: "md" }),
      },
    }),
    news: collection({
      label: "Novità",
      slugField: "titolo",
      path: "src/content/news/*",
      format: { contentField: "contenuto" },
      entryLayout: "content",
      columns: ["titolo", "data"],
      schema: {
        titolo: fields.slug({ name: { label: "Titolo" } }),
        descrizione: fields.text({ label: "Descrizione breve", multiline: true }),
        data: fields.date({ label: "Data", defaultValue: { kind: "today" }, validation: { isRequired: true } }),
        ctaLabel: fields.text({ label: "Testo del bottone (facoltativo)" }),
        ctaHref: fields.text({ label: "Link del bottone (facoltativo, es. /contatti/)" }),
        bozza: fields.checkbox({ label: "Bozza (non pubblicata)", defaultValue: true }),
        contenuto: fields.markdoc({ label: "Testo", extension: "md" }),
      },
    }),
  },
});
