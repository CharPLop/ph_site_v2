// ═══════════════════════════════════════════════════════════
//  scripts/genera-derivate.mjs — versioni leggere delle immagini usate in piccolo
//
//  node scripts/genera-derivate.mjs            → DRY-RUN (elenca cosa farebbe)
//  node scripts/genera-derivate.mjs --apply    → genera i file
//
//  Cosa genera (solo con --apply):
//  • public/foto/viso/avatar/<nome>.webp — 160×160, ritaglio sul soggetto:
//    usato per i tondi da 32–80 px (card team in home, contatti, pulsante Prenota);
//  • public/foto/edit/team-portrait.webp — stessa foto del gruppo in WebP;
//  • public/foto/{anna,ilenia,valentina,corridoio}/*.webp — foto dello studio in WebP
//    (le usa il componente Foto.astro: carosello di /studio/ e copertine del blog);
//  • favicon dal logo Psiche Holos: favicon.ico (16+32+48), favicon-16.png, favicon-32.png
//    con il centro del logo (la scritta), apple-touch-icon.png (180) con il logo intero,
//    tutti su un tondo crema. Sorgente: _originali/loghi/logo-psiche-holos.png se c'è
//    (alta risoluzione), altrimenti public/loghi/logo-psiche-holos.png.
//
//  Idempotente: un derivato più recente della sua sorgente (e di questo script) viene saltato.
//  Se cambi una foto in public/foto/viso/, rilancia con --apply.
// ═══════════════════════════════════════════════════════════
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let sharp;
try {
  sharp = (await import("sharp")).default;
  sharp.cache(false); // su Windows la cache di libvips tiene aperti i file
} catch {
  console.error("sharp non trovato. Installa con:  npm i -D sharp");
  process.exit(1);
}

const APPLY = process.argv.includes("--apply");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");

const VISI = path.join(PUBLIC, "foto", "viso");

// Ritratto verticale (mezzo busto): quadrato sulla parte alta, dove c'è il viso.
// Foto orizzontale (primo piano): ritaglio automatico sul soggetto.
async function avatar(buf) {
  const img = sharp(buf).rotate();
  const { width: w, height: h } = await img.metadata();
  const base = h > w
    ? img.extract({ left: Math.round((w - Math.round(w * 0.6)) / 2), top: Math.round(h * 0.06), width: Math.round(w * 0.6), height: Math.round(w * 0.6) }).resize(160, 160)
    : img.resize(160, 160, { fit: "cover", position: sharp.strategy.attention });
  return base.webp({ quality: 78 }).toBuffer();
}
const lavori = [];

for (const f of await fs.readdir(VISI)) {
  if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
  const nome = f.replace(/\.[^.]+$/, "");
  lavori.push({
    src: path.join(VISI, f),
    dst: path.join(VISI, "avatar", `${nome}.webp`),
    fai: avatar,
  });
}
// Foto dello studio (carosello e copertine del blog): WebP della stessa misura
for (const cartella of ["anna", "ilenia", "valentina", "corridoio"]) {
  const dir = path.join(PUBLIC, "foto", cartella);
  let voci = [];
  try { voci = await fs.readdir(dir); } catch { continue; }
  for (const f of voci) {
    if (!/\.jpe?g$/i.test(f)) continue;
    lavori.push({
      src: path.join(dir, f),
      dst: path.join(dir, f.replace(/\.jpe?g$/i, ".webp")),
      fai: (buf) => sharp(buf).rotate().webp({ quality: 74 }).toBuffer(),
    });
  }
}
lavori.push({
  src: path.join(PUBLIC, "foto", "edit", "team-portrait.jpg"),
  dst: path.join(PUBLIC, "foto", "edit", "team-portrait.webp"),
  fai: (buf) => sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 76 }).toBuffer(),
});

// ── Favicon dal logo ─────────────────────────────────────
const exists = async (p) => { try { await fs.access(p); return true; } catch { return false; } };
const LOGO_HQ = path.join(ROOT, "_originali", "loghi", "logo-psiche-holos.png");
const LOGO = (await exists(LOGO_HQ)) ? LOGO_HQ : path.join(PUBLIC, "loghi", "logo-psiche-holos.png");
const CREMA = "#f8f6f0";

async function iconaPng(buf, size, zoom) {
  const img = sharp(buf);
  const { width: w, height: h } = await img.metadata();
  const cw = Math.round(w * zoom), ch = Math.round(h * zoom);
  const logo = await sharp(buf)
    .extract({ left: Math.round((w - cw) / 2), top: Math.round((h - ch) / 2), width: cw, height: ch })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toBuffer();
  const disco = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${CREMA}"/></svg>`);
  return sharp(disco).composite([{ input: logo }]).png({ compressionLevel: 9 }).toBuffer();
}
// ICO con PNG incorporati (formato supportato da tutti i browser attuali)
function ico(pngs) {
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let offset = head.length;
  pngs.forEach(({ size, buf }, i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(size >= 256 ? 0 : size, e); head.writeUInt8(size >= 256 ? 0 : size, e + 1);
    head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(buf.length, e + 8); head.writeUInt32LE(offset, e + 12);
    offset += buf.length;
  });
  return Buffer.concat([head, ...pngs.map((p) => p.buf)]);
}
const ZOOM_PICCOLE = 0.62; // sotto i 48 px si tiene solo il centro del logo, altrimenti la scritta non si legge
lavori.push(
  { src: LOGO, dst: path.join(PUBLIC, "favicon-16.png"), fai: (b) => iconaPng(b, 16, ZOOM_PICCOLE) },
  { src: LOGO, dst: path.join(PUBLIC, "favicon-32.png"), fai: (b) => iconaPng(b, 32, ZOOM_PICCOLE) },
  { src: LOGO, dst: path.join(PUBLIC, "apple-touch-icon.png"), fai: (b) => iconaPng(b, 180, 1) },
  {
    src: LOGO, dst: path.join(PUBLIC, "favicon.ico"),
    fai: async (b) => ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, buf: await iconaPng(b, size, ZOOM_PICCOLE) })))),
  },
);

const SCRIPT_MTIME = (await fs.stat(fileURLToPath(import.meta.url))).mtimeMs;
const mtime = async (p) => { try { return (await fs.stat(p)).mtimeMs; } catch { return 0; } };
let fatti = 0;
for (const l of lavori) {
  const rel = path.relative(ROOT, l.dst);
  if ((await mtime(l.dst)) >= Math.max(await mtime(l.src), SCRIPT_MTIME)) { console.log(`= già aggiornato  ${rel}`); continue; }
  if (!APPLY) { console.log(`+ da generare     ${rel}`); continue; }
  const out = await l.fai(await fs.readFile(l.src));
  await fs.mkdir(path.dirname(l.dst), { recursive: true });
  await fs.writeFile(l.dst, out);
  console.log(`✓ generato        ${rel} (${Math.round(out.length / 1024)} KB)`);
  fatti++;
}
console.log(APPLY ? `\n${fatti} file generati.` : "\nDry-run: rilancia con --apply per generare.");
