// ═══════════════════════════════════════════════════════════
//  scripts/controlla-segnaposto.mjs — guard di build
//
//  Gira dopo `astro build` (vedi "build" in package.json) e controlla
//  l'output in dist/, cioè esattamente quello che andrà online.
//
//  BLOCCANTI (build fallisce sempre):
//    segnaposto tecnici e diciture vietate.
//  DA COMPLETARE (build fallisce solo se il sito è indicizzabile):
//    testi ancora provvisori. Finché site.indicizza = false (noindex su
//    tutte le pagine) sono solo avvisi, così i fix urgenti si possono
//    pubblicare; appena si toglie il noindex diventano bloccanti.
// ═══════════════════════════════════════════════════════════
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const EST = new Set([".html", ".txt", ".xml", ".json", ".js"]);

const BLOCCANTI = [
  { re: /TUA_ACCESS_KEY/i, perche: "access key Web3Forms segnaposto" },
  { re: /G-X{6,}/, perche: "ID GA4 segnaposto" },
  { re: /psicoterapeuta\s+CBT/i, perche: "titolo non posseduto (Ilenia è specializzanda)" },
  { re: /L\.\s*4\/2013/, perche: "legge delle professioni non ordinistiche" },
];
const DA_COMPLETARE = [
  { re: /da completare/i, perche: "testo provvisorio" },
  { re: /data-senza-key/, perche: "form contatti senza access key Web3Forms" },
];

async function elenca(dir) {
  const out = [];
  let voci;
  try { voci = await fs.readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const v of voci) {
    const p = path.join(dir, v.name);
    if (v.isDirectory()) out.push(...(await elenca(p)));
    else if (EST.has(path.extname(v.name).toLowerCase())) out.push(p);
  }
  return out;
}

const file = await elenca(DIST);
if (file.length === 0) {
  console.error("✖ dist/ vuota: lancia prima `astro build`.");
  process.exit(1);
}

let home = "";
try { home = await fs.readFile(path.join(DIST, "index.html"), "utf8"); } catch { /* nessuna home */ }
const indicizzabile = !/<meta[^>]+name="robots"[^>]+noindex/i.test(home);

const errori = [];
const avvisi = [];
for (const f of file) {
  const testo = await fs.readFile(f, "utf8");
  const rel = path.relative(DIST, f).split(path.sep).join("/");
  for (const { re, perche } of BLOCCANTI) {
    if (re.test(testo)) errori.push(`${rel}: "${testo.match(re)[0]}" — ${perche}`);
  }
  for (const { re, perche } of DA_COMPLETARE) {
    if (re.test(testo)) (indicizzabile ? errori : avvisi).push(`${rel}: "${testo.match(re)[0]}" — ${perche}`);
  }
}

console.log(`\nControllo segnaposto su ${file.length} file (sito ${indicizzabile ? "INDICIZZABILE" : "in noindex"})`);
for (const a of avvisi) console.log(`  ⚠ ${a}`);
for (const e of errori) console.log(`  ✖ ${e}`);

if (errori.length) {
  console.error(`\n✖ Build bloccata: ${errori.length} problema/i da risolvere prima di pubblicare.`);
  process.exit(1);
}
console.log(avvisi.length ? `\n✓ Nessun bloccante (${avvisi.length} avvisi da chiudere prima di togliere il noindex).` : "\n✓ Nessun segnaposto.");
