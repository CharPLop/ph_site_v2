# Lancio di psicheholos.it — runbook

> **Stato: sito online dal 10/10/2026** su https://www.psicheholos.it (GitHub Pages, HTTPS).
> Fatti: dominio e `studio@` su Aruba, DNS, Pages con dominio verificato, Web3Forms, Search Console
> (proprietà Dominio, sitemap, indicizzazione delle pagine principali), vecchio Worker Cloudflare spento,
> GA4 `G-NY2FDE7FQ2` con banner di consenso (account psicheholos@gmail.com, conservazione 14 mesi).
> Differenze rispetto al piano: SPF, DKIM e DMARC (`p=none`) li ha creati Aruba da sola; Search Console
> verificata con un secondo TXT `@`; la scheda Google "Psiche Holos" esisteva già (account di Anna) e
> non ha telefono, quindi neanche i dati per Google del sito.
> Da fare: Bing, scheda Google (accesso, CAP 25123, sito, categorie), caselle personali, verifica in due
> passaggi su Aruba, P.IVA di Anna, DMARC a `p=quarantine` dopo un mese.

Da seguire nell'ordine. Tempo stimato: circa 2 ore di lavoro, più l'attesa del DNS
(di solito meno di un'ora, al massimo 24). Ogni passo ha la sua verifica: non passare
al successivo finché non è ✓.

**Chi intesta cosa.** Titolare del sito è la Dott.ssa **Valentina Nicolai**: il dominio
è a nome suo. Gli account dei servizi (Aruba, Google, Web3Forms) usano come email
**psicheholos@gmail.com**, così tutte e tre vedono avvisi e scadenze; la verifica in due
passaggi e i dati di recupero di quella Gmail sono sul telefono di Valentina.
Il codice e l'hosting restano sul GitHub di Pier (`CharPLop/ph_site_v2`), come per itfsite.

---

## 0. Prima di iniziare

- [ ] P.IVA di Anna e Valentina → `src/config/site.ts` (campo `piva`, oggi commentato)
- [ ] numero di telefono dello studio per la scheda Google (diverso dal cellulare di Ilenia) — facoltativo al lancio

Verifica: `npm run build` mostra solo l'avviso dell'access key Web3Forms (`data-senza-key`).

---

## 1. Dominio ed email su Aruba

1. Acquista `psicheholos.it` su Aruba con il servizio email: **intestataria Valentina Nicolai**
   (nome e codice fiscale suoi), email del contratto `psicheholos@gmail.com`.
2. Attiva la **verifica in due passaggi** sull'account Aruba.
3. Crea le caselle: `studio@psicheholos.it` (la leggono tutte e tre) e, se le vogliono,
   `anna@`, `valentina@`, `ilenia@` (per Ilenia basta un inoltro alla sua casella attuale).

Verifica: accedi alla webmail di `studio@` e mandati un'email di prova da una Gmail.

---

## 2. Il codice

In `src/config/site.ts`:

1. `web3formsKey`: su web3forms.com crea la chiave con `studio@psicheholos.it` (arriva per
   email) e incollala. L'accettazione del DPA di Web3Forms vale per conto di Valentina.
2. `ga4Id`: crea la proprietà GA4 (vedi sotto) e incolla l'ID `G-…`.
3. `indicizza: true`

Verifica: `npm run build` finisce con **✓ Nessun segnaposto** e nessun ✖. Il guard controlla
anche canonical, robots, sitemap e l'assenza di link a `workers.dev` o `github.io`.

### GA4 (una volta sola)
Con `psicheholos@gmail.com`: analytics.google.com → nuova proprietà "Psiche Holos" (fuso
Italia, EUR) → flusso web `https://www.psicheholos.it`. In *Amministrazione → Raccolta dati*:
conservazione **14 mesi**, **Google Signals disattivato**, personalizzazione annunci
disattivata. Poi aggiungi come utenti gli account Google di Pier e delle professioniste.

### Merge su main

```powershell
git switch fix/sprint1-bloccanti
git add src/config/site.ts
git commit -m "lancio: P.IVA, form Web3Forms, GA4, indicizzazione attiva"
git push origin fix/sprint1-bloccanti
git switch main
git pull origin main
git merge --no-ff fix/sprint1-bloccanti -m "Merge fix/sprint1-bloccanti: sito pronto per il lancio"
git push origin main
```

Il workflow *Pubblica* aggiorna l'anteprima su `charplop.github.io/ph_site_v2/`, sempre in
noindex: va bene così, il dominio arriva al passo 3.

---

## 3. GitHub Pages

Nel repo `CharPLop/ph_site_v2`:

1. **Verifica del dominio** (impedisce che altri lo usino su GitHub): avatar → *Settings* →
   *Pages* → *Add a domain* → `psicheholos.it`. GitHub mostra un record **TXT**
   `_github-pages-challenge-charplop`: aggiungilo su Aruba (passo 4) e torna qui a premere *Verify*.
2. Repo → *Settings* → *Secrets and variables* → *Actions* → *Variables* → nuova variabile
   `DOMINIO_ATTIVO` = `si`: da qui *Pubblica* costruisce il sito per il dominio e non più
   l'anteprima.
3. *Actions* → **Pubblica** → *Run workflow* su `main`.
4. Repo → *Settings* → *Pages* → *Custom domain*: `www.psicheholos.it` → *Save*.
   Da questo momento `charplop.github.io/ph_site_v2/` rimanda al dominio.

Verifica: il run *Pubblica* è verde.

---

## 4. DNS su Aruba

Pannello Aruba → *Gestione DNS* di `psicheholos.it`. I record email (MX, SPF, DKIM)
li ha già creati Aruba: **non toccarli**.

| Tipo  | Nome                               | Valore                                                |
|-------|------------------------------------|-------------------------------------------------------|
| A     | `@`                                | `185.199.108.153`                                     |
| A     | `@`                                | `185.199.109.153`                                     |
| A     | `@`                                | `185.199.110.153`                                     |
| A     | `@`                                | `185.199.111.153`                                     |
| AAAA  | `@`                                | `2606:50c0:8000::153`                                 |
| AAAA  | `@`                                | `2606:50c0:8001::153`                                 |
| AAAA  | `@`                                | `2606:50c0:8002::153`                                 |
| AAAA  | `@`                                | `2606:50c0:8003::153`                                 |
| CNAME | `www`                              | `charplop.github.io.`                                 |
| TXT   | `_github-pages-challenge-charplop` | il codice del passo 3.1                               |
| TXT   | `_dmarc`                           | `v=DMARC1; p=none; rua=mailto:studio@psicheholos.it`  |

Togli eventuali record A/CNAME di Aruba già presenti su `@` e `www` (la pagina "dominio
parcheggiato"). Dopo un mese senza problemi DMARC passa a `p=quarantine`.

Verifica:
- GitHub → *Settings* → *Pages*: "DNS check successful"; spunta **Enforce HTTPS** appena è
  disponibile (il certificato arriva in qualche minuto, a volte in qualche ora).
- `https://www.psicheholos.it` → il sito; `https://psicheholos.it` → redirect a `www`.
- Un'email da e verso `studio@psicheholos.it` arriva e non finisce in spam.

---

## 5. Verifica finale sul dominio

- [ ] tutte le pagine si aprono; il pulsante **Prenota** e le card di `/contatti/` aprono WhatsApp della professionista giusta
- [ ] invio di prova dal form → arriva a `studio@psicheholos.it` con l'oggetto "per Dott.ssa …"
- [ ] banner cookie: *Rifiuta* → nessuna richiesta a Google; *Accetta* → GA4 → *Tempo reale* mostra la visita
- [ ] "Preferenze cookie" nel footer riapre la scelta
- [ ] `https://www.psicheholos.it/robots.txt` e `/sitemap-index.xml` rispondono
- [ ] nessun `noindex` nel sorgente della home
- [ ] una pagina inesistente mostra la 404 dello studio
- [ ] Lighthouse mobile sulla home: tutto sopra 90

---

## 6. Google e directory

Con `psicheholos@gmail.com` come proprietario, poi Pier e le professioniste come utenti:

1. **Search Console** → proprietà di tipo **Dominio** `psicheholos.it` → record TXT su Aruba →
   invia `sitemap-index.xml` → *Controllo URL* e richiesta di indicizzazione per home,
   servizi, team, scuole.
2. **Bing Webmaster Tools** → importa da Search Console.
3. **Scheda Google "Psiche Holos"** (distinta da quella di Ilenia): categoria *Psicologo*,
   indirizzo Via Guido Zadei 60, numero **dello studio**, sito con UTM
   `?utm_source=gbp&utm_medium=organic`.
4. Nome, indirizzo e telefono **identici** su GuidaPsicologi, MioDottore e Instagram di Psiche Holos.
5. **itfsite**: link a psicheholos.it (e nello schema di Ilenia `worksFor` → Psiche Holos).

---

## 7. Spegnere il vecchio hosting (si può fare anche prima del lancio)

1. Cloudflare (account di Pier) → *Workers & Pages* → `phsitev2` → *Settings* → *Delete*.
   Verifica: `https://phsitev2.pierangelo-lopresti.workers.dev` non risponde più.
2. Cloudflare → *My Profile* → *API Tokens*: revoca il token usato per `wrangler deploy`.
3. Nella cartella del progetto (PowerShell):
   ```powershell
   Remove-Item -Recurse -Force .wrangler
   ```

---

## 8. Dopo il lancio

- **Ogni pubblicazione**: push su `main` → *Pubblica* va online in un paio di minuti.
  Le modifiche si fanno vedere alle professioniste prima, da `npm run dev` o con screenshot.
- **Blog e novità**: un file `.md` in `src/content/blog/` o `src/content/news/`; con
  `bozza: true` resta offline. Si pubblica togliendo `bozza: true`, dopo la conferma delle professioniste.
- **A 2 settimane**: Search Console → pagine indicizzate, errori di copertura.
- **A 1 mese**: DMARC da `p=none` a `p=quarantine`; prime query su Search Console.
- **Web3Forms**: controlla nella dashboard se gli invii si possono cancellare o non salvare.
  Se sì, cancellali ogni 12 mesi e aggiorna il punto 4 della privacy (oggi dice "al massimo 3 anni").
- **Ogni anno**: cancella dalle caselle i messaggi di chi non ha iniziato un percorso da più di
  12 mesi (lo promette la privacy); rinnovo del dominio su Aruba.
