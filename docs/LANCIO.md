# Lancio di psicheholos.it — runbook

Da seguire nell'ordine. Tempo stimato: circa 1 ora, più l'attesa della propagazione DNS.
Ogni passo ha la sua verifica: non passare al successivo finché non è ✓.

---

## 0. Prima di iniziare

Servono dalle professioniste (vedi messaggio del 29/09):

- [ ] titolare del trattamento e tempi di conservazione dei messaggi → `src/pages/privacy.astro` (le due costanti `[DA DEFINIRE]`)
- [ ] verifica garanzie Web3Forms → ultimo `[DA DEFINIRE]` di `privacy.astro`
- [ ] P.IVA di Anna e Valentina, Albo di Valentina → `src/config/site.ts` (campi `piva`, `albo`)
- [ ] numero di telefono dello studio (per la scheda Google, diverso dal cellulare di Ilenia) — facoltativo al lancio

Verifica: `npm run build` mostra solo gli avvisi di email Gmail e access key.

---

## 1. Dominio ed email su Aruba

1. Acquista `psicheholos.it` su Aruba, con il servizio email.
2. Crea la casella `studio@psicheholos.it` e attiva la **verifica in due passaggi** sull'account Aruba.
3. Dal pannello Aruba annota i record email: **MX**, **SPF** (`include:_spf.aruba.it`) e **DKIM**. Serviranno al passo 2.

Verifica: accedi alla webmail e mandati una email di prova.

---

## 2. DNS su Cloudflare

1. Cloudflare → *Add a site* → `psicheholos.it` → piano Free.
2. Cloudflare importa i record DNS esistenti: controlla che ci siano **tutti** quelli email di Aruba (MX, SPF, DKIM). Se mancano, aggiungili a mano, con la nuvola **grigia** (solo DNS).
3. Aggiungi DMARC (TXT su `_dmarc`): `v=DMARC1; p=none; rua=mailto:studio@psicheholos.it`
   Dopo un mese senza problemi si passa a `p=quarantine`.
4. Nel pannello Aruba sostituisci i nameserver con quelli indicati da Cloudflare.

Verifica: Cloudflare mostra il dominio come **Active** (da pochi minuti a 24 ore). Manda un'email da e verso `studio@psicheholos.it`: arriva e non finisce in spam.

---

## 3. Il sito sul dominio

1. In `wrangler.toml` togli il commento al blocco **LANCIO** (dominio `www` collegato al Worker, `workers.dev` spento).
2. Cloudflare → *Rules* → *Redirect Rules* → modello **"Redirect from root to WWW"** (301): `psicheholos.it` → `https://www.psicheholos.it`.
   Se la regola non scatta, aggiungi un record `A` per `@` verso `192.0.2.1` con nuvola **arancione** (serve solo a far passare le richieste da Cloudflare).

Verifica dopo il deploy (passo 5):
- `https://www.psicheholos.it` → il sito
- `https://psicheholos.it` → redirect 301 a `www`
- `https://phsitev2.pierangelo-lopresti.workers.dev` → non risponde più

---

## 4. Il codice

In `src/config/site.ts`:

1. `email: "studio@psicheholos.it"`
2. `web3formsKey`: crea la chiave su web3forms.com con `studio@psicheholos.it` (arriva per email) e incollala.
3. `ga4Id`: crea la proprietà GA4 (vedi sotto) e incolla l'ID `G-…`.
4. `indicizza: true`

In `astro.config.mjs` togli il commento `← PLACEHOLDER` dalla riga `site`.

Verifica: `npm run build` finisce con **✓ Nessun segnaposto** e nessun ✖. Il guard ora controlla anche canonical, robots, sitemap e l'assenza di link a `workers.dev`: se qualcosa non torna, la build si ferma.

### GA4 (una volta sola)
analytics.google.com → nuova proprietà "Psiche Holos" (fuso Italia, EUR) → flusso web `https://www.psicheholos.it`.
Poi in *Amministrazione → Raccolta dati*: conservazione dati **14 mesi**, **Google Signals disattivato**, personalizzazione annunci disattivata.

---

## 5. Merge e deploy

PowerShell, nella cartella del progetto:

```powershell
git switch fix/sprint1-bloccanti
git add src/config/site.ts
git add astro.config.mjs
git add wrangler.toml
git commit -m "lancio: dominio psicheholos.it, email studio, form, GA4, indicizzazione attiva"
git push origin fix/sprint1-bloccanti
git switch main
git pull origin main
git merge --no-ff fix/sprint1-bloccanti -m "Merge fix/sprint1-bloccanti: sito pronto per il lancio"
git push origin main
$env:CLOUDFLARE_API_TOKEN="<token>"
npm run deploy
```

Verifica: il run *Controlli* su GitHub → Actions è verde.

---

## 6. Verifica finale sul dominio

- [ ] tutte le pagine si aprono; il pulsante **Prenota** e le card di `/contatti/` aprono WhatsApp della professionista giusta
- [ ] invio di prova dal form → arriva a `studio@psicheholos.it` con l'oggetto "per Dott.ssa …"
- [ ] banner cookie: *Rifiuta* → nessuna richiesta a Google; *Accetta* → GA4 → *Tempo reale* mostra la visita
- [ ] "Preferenze cookie" nel footer riapre la scelta
- [ ] `https://www.psicheholos.it/robots.txt` e `/sitemap-index.xml` rispondono
- [ ] nessun `noindex` nel sorgente della home
- [ ] Lighthouse mobile sulla home: tutto sopra 90

---

## 7. Google e directory

1. **Search Console** → proprietà di tipo **Dominio** `psicheholos.it` → verifica con il record TXT su Cloudflare → invia `sitemap-index.xml` → *Controllo URL* e richiesta di indicizzazione per home, servizi, team, scuole.
2. **Bing Webmaster Tools** → importa da Search Console.
3. **Scheda Google "Psiche Holos"** (studio, distinta da quella di Ilenia): categoria *Psicologo*, indirizzo Via Guido Zadei 60, numero **dello studio**, sito con UTM `?utm_source=gbp&utm_medium=organic`.
4. Nome, indirizzo e telefono **identici** su GuidaPsicologi, MioDottore e Instagram di Psiche Holos.
5. **itfsite**: aggiungi il link a psicheholos.it (e nello schema di Ilenia `worksFor` → Psiche Holos) quando il sito è online.

---

## 8. Dopo il lancio

- A 2 settimane: Search Console → pagine indicizzate, errori di copertura.
- A 1 mese: DMARC da `p=none` a `p=quarantine`; prime query su Search Console.
- Articoli del blog: si pubblicano togliendo `bozza: true`, solo dopo la conferma delle professioniste.
