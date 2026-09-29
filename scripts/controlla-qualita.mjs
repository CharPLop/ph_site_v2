// ═══════════════════════════════════════════════════════════
//  scripts/controlla-qualita.mjs — controlli di qualità sulla build (dist/)
//
//  Uso (dopo `npm run build`):
//    npm i --no-save playwright axe-core html-validate
//    npx playwright install chromium
//    node scripts/controlla-qualita.mjs
//
//  Controlla ogni pagina HTML di dist/ a 390 px (mobile) e 1280 px (desktop):
//  • accessibilità WCAG 2.1 AA con axe-core (animazioni disattivate);
//  • nessuno scorrimento orizzontale;
//  • nessun errore JavaScript;
//  • link interni e risorse locali che rispondono (niente 404);
//  • HTML valido (html-validate, regole in .htmlvalidate.json).
//  Esce con codice 1 se trova problemi: in GitHub Actions il commit diventa rosso.
// ═══════════════════════════════════════════════════════════
import { promises as fs } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

let chromium, axeSrc;
try {
  ({ chromium } = await import("playwright"));
  axeSrc = await fs.readFile(path.join(ROOT, "node_modules", "axe-core", "axe.min.js"), "utf8");
} catch {
  console.error("Mancano gli strumenti. Esegui:\n  npm i --no-save playwright axe-core html-validate\n  npx playwright install chromium");
  process.exit(1);
}

// ── elenco pagine ────────────────────────────────────────
async function htmlIn(dir) {
  const out = [];
  for (const v of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, v.name);
    if (v.isDirectory()) out.push(...(await htmlIn(p)));
    else if (v.name.endsWith(".html")) out.push(p);
  }
  return out;
}
const file = await htmlIn(DIST);
const pagine = file.map((f) => "/" + path.relative(DIST, f).split(path.sep).join("/").replace(/index\.html$/, ""));

// ── server statico sulla build ───────────────────────────
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".ico": "image/x-icon", ".woff2": "font/woff2", ".pdf": "application/pdf", ".xml": "application/xml", ".txt": "text/plain" };
const server = http.createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  try {
    const buf = await fs.readFile(path.join(DIST, p));
    res.writeHead(200, { "content-type": MIME[path.extname(p)] ?? "application/octet-stream" });
    res.end(buf);
  } catch { res.writeHead(404); res.end("404"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}`;

const problemi = [];
// CHROME_PATH permette di usare un Chrome già installato invece di scaricarne uno
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const linkVisti = new Set();

for (const larghezza of [390, 1280]) {
  const ctx = await browser.newContext({ viewport: { width: larghezza, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  // I servizi esterni (Google Maps, font, ecc.) non servono ai controlli
  await page.route((url) => !url.href.startsWith(BASE), (r) => r.abort());
  for (const u of pagine) {
    const errori = [];
    page.removeAllListeners("pageerror");
    page.on("pageerror", (e) => errori.push(e.message));
    await page.goto(BASE + u, { waitUntil: "load" });
    await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important}.reveal{opacity:1!important;transform:none!important}" });
    await page.waitForTimeout(150);
    const dove = `${u} @${larghezza}px`;

    const axe = await page.evaluate(axeSrc + ";axe.run({runOnly:['wcag2a','wcag2aa','wcag21aa']}).then(r=>r.violations.map(v=>v.id+' ('+v.nodes.length+'): '+v.nodes[0].target.join(' ')))");
    for (const v of axe) problemi.push(`${dove} — accessibilità: ${v}`);
    if (await page.evaluate("document.documentElement.scrollWidth > innerWidth + 1")) problemi.push(`${dove} — scorrimento orizzontale`);
    for (const e of errori) problemi.push(`${dove} — errore JS: ${e}`);

    if (larghezza === 390) {
      const hrefs = await page.evaluate(`[...document.querySelectorAll('a[href],img[src],link[href],script[src],source[srcset]')]
        .map(e=>e.getAttribute('href')||e.getAttribute('src')||e.getAttribute('srcset'))
        .filter(h=>h&&h.startsWith('/')&&!h.startsWith('//')).map(h=>h.split('#')[0].split(' ')[0])`);
      for (const h of hrefs) {
        if (!h || linkVisti.has(h)) continue;
        linkVisti.add(h);
        const r = await fetch(BASE + h);
        if (r.status >= 400) problemi.push(`${u} — link o risorsa rotta: ${h} (${r.status})`);
      }
    }
  }
  await ctx.close();
}
await browser.close();
server.close();

// ── validazione HTML ─────────────────────────────────────
try {
  execFileSync("npx", ["html-validate", "dist/**/*.html"], { cwd: ROOT, stdio: "pipe", shell: process.platform === "win32" });
} catch (e) {
  const out = String(e.stdout || "").trim().split("\n").filter((l) => /error/.test(l)).slice(0, 20);
  problemi.push(...out.map((l) => "HTML non valido: " + l.trim()));
}

console.log(`\nControllo qualità: ${pagine.length} pagine × 2 larghezze, ${linkVisti.size} link e risorse locali`);
if (problemi.length) {
  for (const p of problemi) console.log("  ✖ " + p);
  console.error(`\n✖ ${problemi.length} problema/i.`);
  process.exit(1);
}
console.log("✓ Nessun problema: accessibilità AA, niente overflow, niente errori JS, link ok, HTML valido.");
