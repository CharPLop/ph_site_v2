// ═══════════════════════════════════════════════════════════
//  scripts/ottimizza-immagini.mjs — ottimizzazione immagini di public/
//
//  node scripts/ottimizza-immagini.mjs            → DRY-RUN (non tocca nulla)
//  node scripts/ottimizza-immagini.mjs --apply    → applica
//
//  Cosa fa (solo con --apply):
//  1. trova le immagini di public/foto e public/loghi;
//  2. le considera "usate" se il loro percorso (/foto/…, /loghi/…) compare
//     in src/ o in public/llms.txt;
//  3. usate: backup dell'originale in _originali/<percorso>, poi
//     - foto: max 1600 px sul lato lungo, JPG qualità 80 (mozjpeg), orientamento EXIF applicato;
//     - loghi: larghezza fissa (2x della misura mostrata), PNG compresso;
//     il file viene riscritto SOLO se il risultato è più leggero;
//  4. non usate: spostate in _originali/non-usate/<percorso> (non cancellate).
//
//  Idempotente: le foto già leggere (≤ 1600 px e ≤ 400 KB) e i loghi già alla
//  misura giusta vengono saltati; un backup già presente non viene sovrascritto.
//  I file vengono letti in memoria prima di essere elaborati, così su Windows
//  non restano bloccati da sharp durante la riscrittura.
//  _originali/ è in .gitignore.
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
const BACKUP = path.join(ROOT, "_originali");
const CARTELLE = ["foto", "loghi"];
const EST_IMG = new Set([".jpg", ".jpeg", ".png"]);
const EST_TESTO = new Set([".astro", ".ts", ".js", ".mjs", ".md", ".mdx", ".css", ".json", ".txt"]);

const FOTO_MAX_LATO = 1600;
const FOTO_QUALITA = 80;
const SOGLIA_KB = 400;
// larghezza finale dei loghi (circa il doppio di quella mostrata a schermo)
const LOGHI = {
  "loghi/logo-psiche-holos.png": 140,
  "loghi/logo-psiche-holos-cream.png": 220,
};

async function elenca(dir) {
  const out = [];
  let voci;
  try { voci = await fs.readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const v of voci) {
    const p = path.join(dir, v.name);
    if (v.isDirectory()) out.push(...(await elenca(p)));
    else out.push(p);
  }
  return out;
}

const kb = (b) => `${(b / 1024).toFixed(0)} KB`;
const mb = (b) => `${(b / 1024 / 1024).toFixed(2)} MB`;
const rel = (p) => path.relative(PUBLIC, p).split(path.sep).join("/");

async function esiste(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

// 1. testo di src/ + llms.txt, per capire quali immagini sono usate
const fileTesto = [
  ...(await elenca(path.join(ROOT, "src"))),
  path.join(PUBLIC, "llms.txt"),
].filter((f) => EST_TESTO.has(path.extname(f).toLowerCase()));
let corpus = "";
for (const f of fileTesto) {
  try { corpus += "\n" + (await fs.readFile(f, "utf8")); } catch { /* ignora */ }
}

// 2. immagini
const immagini = [];
for (const c of CARTELLE) {
  for (const f of await elenca(path.join(PUBLIC, c))) {
    if (EST_IMG.has(path.extname(f).toLowerCase())) immagini.push(f);
  }
}

console.log(APPLY ? "MODALITÀ: APPLY\n" : "MODALITÀ: DRY-RUN (aggiungi --apply per applicare)\n");

let totPrima = 0;
let totDopo = 0;
const nonUsate = [];

for (const f of immagini.sort()) {
  const r = rel(f);
  const usata = corpus.includes("/" + r);
  const stat = await fs.stat(f);

  if (!usata) {
    nonUsate.push({ f, r, size: stat.size });
    continue;
  }

  totPrima += stat.size;
  const input = await fs.readFile(f); // in memoria: il file su disco resta libero
  const meta = await sharp(input).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const isLogo = r in LOGHI;

  let pipeline;
  let motivo = "";
  if (isLogo) {
    const target = LOGHI[r];
    if (w <= target) { motivo = "logo già piccolo"; }
    else {
      pipeline = sharp(input).resize({ width: target }).png({ compressionLevel: 9, palette: true, quality: 90 });
    }
  } else {
    const lato = Math.max(w, h);
    if (lato <= FOTO_MAX_LATO && stat.size <= SOGLIA_KB * 1024) { motivo = "già ottimizzata"; }
    else {
      pipeline = sharp(input)
        .rotate()
        .resize({ width: FOTO_MAX_LATO, height: FOTO_MAX_LATO, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: FOTO_QUALITA, mozjpeg: true, progressive: true });
    }
  }

  if (!pipeline) {
    totDopo += stat.size;
    console.log(`  = ${r.padEnd(42)} ${`${w}×${h}`.padEnd(11)} ${kb(stat.size).padStart(9)}  (${motivo})`);
    continue;
  }

  const buf = await pipeline.toBuffer({ resolveWithObject: true });
  const nuovo = buf.data.length;
  if (nuovo >= stat.size) {
    totDopo += stat.size;
    console.log(`  = ${r.padEnd(42)} ${`${w}×${h}`.padEnd(11)} ${kb(stat.size).padStart(9)}  (nessun guadagno)`);
    continue;
  }
  totDopo += nuovo;
  console.log(
    `  ↓ ${r.padEnd(42)} ${`${w}×${h}`.padEnd(11)} ${kb(stat.size).padStart(9)} → ${`${buf.info.width}×${buf.info.height}`.padEnd(11)} ${kb(nuovo).padStart(8)}`
  );

  if (APPLY) {
    const bk = path.join(BACKUP, r);
    await fs.mkdir(path.dirname(bk), { recursive: true });
    if (!(await esiste(bk))) await fs.copyFile(f, bk);
    await fs.writeFile(f, buf.data);
  }
}

console.log(`\nImmagini usate: ${mb(totPrima)} → ${mb(totDopo)}`);

const totNonUsate = nonUsate.reduce((s, x) => s + x.size, 0);
console.log(`\nNon usate (${nonUsate.length}, ${mb(totNonUsate)}) → _originali/non-usate/`);
for (const { f, r, size } of nonUsate) {
  console.log(`  ✕ ${r.padEnd(42)} ${kb(size).padStart(9)}`);
  if (APPLY) {
    const dest = path.join(BACKUP, "non-usate", r);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    if (await esiste(dest)) await fs.rm(f);
    else await fs.rename(f, dest);
  }
}

if (!APPLY) console.log("\nNessun file modificato. Rilancia con --apply per applicare.");
else console.log(`\nFatto. Originali in ${path.relative(ROOT, BACKUP)}/`);
