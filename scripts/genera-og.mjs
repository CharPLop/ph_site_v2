// ═══════════════════════════════════════════════════════════
//  scripts/genera-og.mjs — immagini di anteprima per i link condivisi
//  (WhatsApp, Facebook, LinkedIn…): 1200×630, una per pagina principale
//  e una per ogni articolo pubblicato del blog.
//
//  Gira da solo prima di ogni build (vedi "build" in package.json).
//  Scrive in public/og/<nome>.jpg (cartella in .gitignore: si rigenera sempre).
//  BaseHead.astro usa public/og/<nome>.jpg se esiste, altrimenti og-card.jpg.
//  Font: Playfair Display e Nunito Sans (@fontsource), come sul sito.
// ═══════════════════════════════════════════════════════════
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(PUBLIC, "og");

const font = (pkg, file) => fs.readFile(path.join(path.dirname(require.resolve(`${pkg}/package.json`)), "files", file));
const fonts = [
  { name: "Playfair", data: await font("@fontsource/playfair-display", "playfair-display-latin-500-normal.woff"), weight: 500, style: "normal" },
  { name: "Nunito", data: await font("@fontsource/nunito-sans", "nunito-sans-latin-400-normal.woff"), weight: 400, style: "normal" },
  { name: "Nunito", data: await font("@fontsource/nunito-sans", "nunito-sans-latin-700-normal.woff"), weight: 700, style: "normal" },
];

// Colori (come src/styles/global.css)
const C = { cream: "#f8f6f0", ink: "#25301f", soft: "#465041", argilla: "#8f5a35", line: "#e1e3da" };

const dataUri = async (rel, larghezza) => {
  const buf = await sharp(await fs.readFile(path.join(PUBLIC, rel))).resize({ width: larghezza, withoutEnlargement: true }).jpeg({ quality: 82 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
};
const logo = `data:image/png;base64,${(await fs.readFile(path.join(PUBLIC, "loghi", "logo-psiche-holos.png"))).toString("base64")}`;

// Pagine principali: kicker, titolo, riga sotto, foto (senza persone)
const pagine = [
  { nome: "home", kicker: "Psicologia e psicoterapia · Brescia", titolo: "Il benessere psicologico, nella sua totalità", sotto: "Tre professioniste, uno studio", foto: "/foto/corridoio/corridoio.jpg" },
  { nome: "studio", kicker: "Chi siamo", titolo: "Uno spazio per il benessere nella sua totalità", sotto: "Via Guido Zadei 60, Brescia", foto: "/foto/ilenia/ilenia-studio-01.jpg" },
  { nome: "servizi", kicker: "Servizi", titolo: "Percorsi pensati per ogni esigenza", sotto: "In studio a Brescia e online", foto: "/foto/anna/anna-studio-1.jpg" },
  { nome: "team", kicker: "Il team", titolo: "Tre professioniste, un'unica missione", sotto: "Psicologia e psicoterapia a Brescia", foto: "/foto/ilenia/ilenia-libreria.jpg" },
  { nome: "scuole", kicker: "Scuole", titolo: "Progetti di psicologia per le scuole", sotto: "Call gratuita di 30 minuti", foto: "/foto/ilenia/ilenia-studio-01.jpg" },
  { nome: "contatti", kicker: "Contatti", titolo: "Il primo passo? Contattaci.", sotto: "Via Guido Zadei 60, Brescia", foto: "/foto/corridoio/corridoio.jpg" },
  { nome: "faq", kicker: "Domande frequenti", titolo: "Tutto quello che vuoi sapere prima di iniziare", sotto: "Psiche Holos · Brescia", foto: "/foto/anna/anna-studio-1.jpg" },
  { nome: "blog", kicker: "Blog", titolo: "Spunti e riflessioni sul benessere psicologico", sotto: "A cura dello studio Psiche Holos", foto: "/foto/ilenia/ilenia-libreria.jpg" },
];

// Articoli pubblicati del blog (le bozze non hanno pagina, quindi niente anteprima)
const BLOG = path.join(ROOT, "src", "content", "blog");
for (const f of await fs.readdir(BLOG)) {
  if (!f.endsWith(".md")) continue;
  const testo = await fs.readFile(path.join(BLOG, f), "utf8");
  const fm = testo.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
  const campo = (k) => fm.match(new RegExp(`^${k}:\\s*(.+)$`, "m"))?.[1].trim().replace(/^['"]|['"]$/g, "").replace(/''/g, "'");
  if (/^bozza:\s*true/m.test(fm)) continue;
  pagine.push({
    nome: `blog-${f.replace(/\.md$/, "")}`,
    kicker: "Blog",
    titolo: campo("titolo") ?? f,
    sotto: "Psiche Holos · Brescia",
    foto: campo("copertina") ?? "/foto/corridoio/corridoio.jpg",
  });
}

const h = (type, style, ...children) => ({ type, props: { style, children: children.length === 1 ? children[0] : children } });

await fs.mkdir(OUT, { recursive: true });
for (const p of pagine) {
  const foto = await dataUri(p.foto, 900);
  const lungo = p.titolo.length > 48;
  const albero = h("div", { width: 1200, height: 630, display: "flex", background: C.cream, fontFamily: "Nunito" },
    h("div", { width: 720, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 56px 52px 64px" },
      { type: "img", props: { src: logo, width: 92, height: 85, style: { width: 92, height: 85 } } },
      h("div", { display: "flex", flexDirection: "column" },
        h("div", { fontSize: 22, fontWeight: 700, letterSpacing: 4, color: C.argilla, textTransform: "uppercase" }, p.kicker),
        h("div", { fontFamily: "Playfair", fontSize: lungo ? 54 : 64, lineHeight: 1.12, color: C.ink, marginTop: 18 }, p.titolo),
      ),
      h("div", { fontSize: 26, color: C.soft, display: "flex", borderTop: `2px solid ${C.line}`, paddingTop: 18 }, p.sotto),
    ),
    { type: "img", props: { src: foto, width: 480, height: 630, style: { width: 480, height: 630, objectFit: "cover" } } },
  );
  const svg = await satori(albero, { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  const jpg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await fs.writeFile(path.join(OUT, `${p.nome}.jpg`), jpg);
  console.log(`✓ og/${p.nome}.jpg (${Math.round(jpg.length / 1024)} KB)`);
}
