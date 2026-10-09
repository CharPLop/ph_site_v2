// ═══════════════════════════════════════════════════════════
//  scripts/anteprima-github.mjs — anteprima su https://charplop.github.io/ph_site_v2/
//
//  Il sito è costruito per stare alla radice di www.psicheholos.it. Finché il
//  dominio non c'è, GitHub Pages lo serve nella sottocartella /ph_site_v2/:
//  questo script riscrive dist/ dopo la build perché funzioni lì.
//   • link e risorse che iniziano con "/" → "/ph_site_v2/…" (href, src, srcset, url())
//   • indirizzi assoluti https://www.psicheholos.it/ → quelli dell'anteprima
//   • noindex su tutte le pagine, sempre (l'anteprima non deve finire su Google)
//
//  Uso: npm run build:anteprima  (lo lancia il workflow "Pubblica" finché la
//  variabile DOMINIO_ATTIVO non vale "si"). Non serve al lancio sul dominio.
// ═══════════════════════════════════════════════════════════
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const BASE = "/ph_site_v2";
const DOMINIO = "https://www.psicheholos.it/";
const ANTEPRIMA = `https://charplop.github.io${BASE}/`;
const NOINDEX = '<meta name="robots" content="noindex, nofollow">';

async function elenca(dir) {
  const out = [];
  for (const v of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, v.name);
    if (v.isDirectory()) out.push(...(await elenca(p)));
    else if (/\.(html|css|xml|txt|json|webmanifest)$/i.test(v.name)) out.push(p);
  }
  return out;
}

// "/x" → "/ph_site_v2/x", ma non "//cdn…" e non percorsi già riscritti
const prefissa = (u) => (u.startsWith("/") && !u.startsWith("//") && !u.startsWith(BASE + "/") ? BASE + u : u);

let toccati = 0;
for (const f of await elenca(DIST)) {
  const prima = await fs.readFile(f, "utf8");
  let t = prima.split(DOMINIO).join(ANTEPRIMA);
  t = t.replace(/url\((['"]?)(\/[^)'"]*)\1\)/g, (_, q, u) => `url(${q}${prefissa(u)}${q})`);
  if (f.endsWith(".html")) {
    t = t.replace(/(\s(?:href|src|action|poster|data-[\w-]+)=")(\/[^"]*)"/g, (_, a, u) => `${a}${prefissa(u)}"`);
    t = t.replace(/(\ssrcset=")([^"]*)"/g, (_, a, v) =>
      a + v.split(",").map((parte) => parte.replace(/^(\s*)(\S+)/, (__, sp, u) => sp + prefissa(u))).join(",") + '"');
    if (!/<meta[^>]+name="robots"/i.test(t)) t = t.replace(/<head([^>]*)>/i, `<head$1>${NOINDEX}`);
  }
  if (t !== prima) { await fs.writeFile(f, t); toccati++; }
}
console.log(`✓ Anteprima GitHub: ${toccati} file riscritti per ${ANTEPRIMA}`);
