// ═══════════════════════════════════════════════════════════
//  PSICHE HOLOS — Dati centrali del sito
//  Copia fedele dei contenuti reali (repo CharPLop/ph_site → data/content.json).
//  Unica fonte di verità per contenuti, SEO e schema.org.
// ═══════════════════════════════════════════════════════════

export interface Sede {
  citta: string;
  titolo: string;
  indirizzo: string;
  cap?: string;
  orari: string;
  mappaEmbed?: string;
  principale?: boolean;
}

export interface ProfiloBlocco {
  tipo: "p" | "ul";
  testo?: string;
  voci?: string[];
}

export interface ProfiloSezione {
  titolo: string;
  blocchi: ProfiloBlocco[];
}

export interface MembroTeam {
  slug: string;
  nome: string;
  ruolo: string;
  /** Di cosa si occupa, in poche parole (card contatti e pulsante "Contattaci") */
  ambitoBreve: string;
  bio: string;
  bioBreve: string;
  foto?: string;
  /** Versione 160×160 per i tondi piccoli (generata da scripts/genera-derivate.mjs) */
  avatar?: string;
  telefonoDisplay: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  sitoWeb?: string;
  scuole: boolean;
  /** Numero di iscrizione all'Albo degli Psicologi della Lombardia */
  albo?: string;
  /** Partita IVA individuale (D.Lgs 70/2003 art. 7 → pagina /note-legali/) */
  piva?: string;
  /** Profili pubblici esterni (directory professionali) → sameAs nello schema */
  profili?: string[];
  profilo?: ProfiloSezione[];
}

export interface Servizio {
  slug: string;
  icona: string;
  titolo: string;
  testo: string;
  descrizione?: string;
  /** Testo lungo in più paragrafi (sostituisce descrizione nella pagina Servizi) */
  paragrafi?: string[];
  /** Titolo sopra l'elenco dei punti (es. "Di cosa ci occupiamo:") */
  puntiTitolo?: string;
  punti?: string[];
  /** Paragrafo dopo l'elenco dei punti */
  chiusura?: string;
}

export interface Fascia {
  emoji: string;
  titolo: string;
  testo: string;
}

export interface Metodologia {
  icona: string;
  titolo: string;
  testo: string;
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

const wa = (numero: string, msg: string) =>
  `https://wa.me/39${numero}?text=${encodeURIComponent(msg)}`;
const ig = (handle: string) => `https://www.instagram.com/${handle}/`;

// ── Identità / SEO globale ──────────────────────────────────
export const site = {
  nome: "Psiche Holos",
  tagline: "Studio di Psicologia e Psicoterapia",
  sottotitolo: "Il benessere psicologico nella sua totalità",
  descrizione:
    "Psiche Holos è uno studio di psicologia e psicoterapia a Brescia: tre professioniste per il benessere della persona in ogni fase della vita, con percorsi individuali, di gruppo, online e per il metodo di studio.",
  url: "https://www.psicheholos.it",
  // → "studio@psicheholos.it" appena il dominio è attivo: il guard di build blocca la
  //   pubblicazione indicizzabile finché resta Gmail. Poi va rigenerata l'access key Web3Forms.
  email: "psicheholos@gmail.com",
  telefono: "+39 392 821 5608",
  telefonoDisplay: "392\u00a0821\u00a05608",
  instagram: "https://www.instagram.com/psicheholos/",
  instagramHandle: "@psicheholos",
  whatsapp: wa("3928215608", "Buongiorno, vorrei prenotare un primo appuntamento presso Psiche Holos"),
  locale: "it_IT",
  logo: "/loghi/logo-psiche-holos.png",
  fotoGruppo: "/foto/edit/team-portrait.jpg",
  fotoGruppoWebp: "/foto/edit/team-portrait.webp",
  ga4Id: "", // ← incolla qui l'ID GA4 (es. "G-XXXXXXX") per attivare analytics + banner cookie
  // Icone di servizi, fasce d'età, valori e metodologie: "emoji" (scelta delle professioniste)
  // oppure "svg" (icone a tratto Tabler). Le icone dei contatti restano sempre SVG.
  stileIcone: "emoji" as "emoji" | "svg",
  // Access key Web3Forms del form contatti. Vuota = il form si vede ma all'invio
  // mostra subito il box con i canali alternativi (nessuna chiamata a Web3Forms).
  // Il guard di build la segnala e la blocca quando il sito diventa indicizzabile.
  web3formsKey: "",
  // false = tutte le pagine escono con <meta name="robots" content="noindex, nofollow">.
  // Mettere a true SOLO dopo aver collegato il dominio reale (oggi il sito è su workers.dev).
  indicizza: false,
};

// ── Chi siamo ───────────────────────────────────────────────
export const chiSiamo = {
  titolo: "Uno spazio per il benessere nella sua totalità",
  paragrafi: [
    "Psiche Holos nasce dalla volontà di creare uno spazio capace di accogliere il bisogno psicologico nella sua totalità. Ciò che più ci caratterizza è il senso di completezza: competenze diverse, riunite nello stesso studio.",
    "Grazie alle competenze e alla formazione specifica e variegata di ognuna di noi, possiamo accogliere la persona in ogni fase del ciclo di vita: la presa in carico copre infanzia, adolescenza, età adulta e terza età.",
    "Nei percorsi di psicoterapia, individuali e di gruppo, ci occupiamo di disturbi d'ansia, depressione, supporto alla genitorialità e difficoltà relazionali ed emotive, grazie anche all'utilizzo di diverse metodologie.",
    "Accogliamo inoltre studenti che hanno bisogno di un supporto psicologico e di un percorso verso un metodo di studio più efficace e consapevole, oltre a percorsi di potenziamento degli apprendimenti per rinforzare lettura, scrittura e calcolo.",
    "Il benessere psicologico di ogni persona è l'obiettivo primario del nostro lavoro.",
  ],
  valori: [
    { icona: "🌿", titolo: "Ascolto e accoglienza", testo: "Uno spazio sicuro dove raccontarsi senza giudizio." },
    { icona: "🤝", titolo: "Approccio integrato", testo: "Diverse metodologie nel rispetto dell'unicità di ogni persona." },
    { icona: "🌱", titolo: "Crescita e cura", testo: "Il cambiamento richiede tempo, fiducia e relazione." },
  ],
};

export const quandoRivolgersi = {
  intro:
    "Ci si può rivolgere a noi in tanti momenti diversi della vita, anche senza un motivo preciso. Per esempio quando:",
  motivi: [
    "Ansia, preoccupazione costante o attacchi di panico",
    "Tristezza persistente, calo di energia e di motivazione",
    "Stress e difficoltà ad affrontare un periodo impegnativo",
    "Un lutto o un cambiamento di vita difficile da gestire",
    "Difficoltà relazionali, in famiglia, in coppia o con gli altri",
    "Bassa autostima, insicurezza o difficoltà a riconoscere il proprio valore",
    "Difficoltà scolastiche o di apprendimento di bambini e ragazzi",
    "Il desiderio di uno spazio di ascolto, anche senza un motivo preciso",
  ],
  chiusura:
    "Se ti riconosci anche solo in parte in queste situazioni, possiamo parlarne. Il primo colloquio è uno spazio per conoscersi, senza impegno.",
};

export const citazione = "Il primo passo non deve essere perfetto. Deve solo essere fatto.";

// ── Galleria studio (foto reali) ────────────────────────
export const galleria = [
  { src: "/foto/corridoio/corridoio.jpg", alt: "L'ingresso dello studio Psiche Holos" },
  { src: "/foto/ilenia/ilenia-studio-02.jpg",  alt: "Lo studio della Dott.ssa Ilenia Tagliaferro" },
  { src: "/foto/ilenia/ilenia-studio-07.jpg",  alt: "Sala per bambini e ragazzi" },
  { src: "/foto/ilenia/ilenia-studio-01.jpg",  alt: "Spazio accogliente con cuscini" },
  { src: "/foto/anna/anna-studio-2.jpg",    alt: "Lo studio della Dott.ssa Anna Marini" },
  { src: "/foto/anna/anna-studio-1.jpg",    alt: "Sala accogliente per le sedute" },
  { src: "/foto/valentina/valentina-studio-2.jpg", alt: "Lo studio della Dott.ssa Valentina Nicolai" },
  { src: "/foto/ilenia/ilenia-libreria.jpg",  alt: "Spazio luminoso con libreria" },
];

// ── Sedi ────────────────────────────────────────────────────
export const sedi: Sede[] = [
  {
    citta: "Brescia",
    titolo: "Studio Psiche Holos",
    indirizzo: "Via Guido Zadei, 60",
    cap: "25123 Brescia (BS)",
    orari: "Su appuntamento · anche online",
    mappaEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.8!2d10.2175!3d45.534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781538e7e8fba39%3A0xc7c9f0c3e8e3d4a!2sVia+Guido+Zadei%2C+60%2C+25123+Brescia+BS!5e0!3m2!1sit!2sit!4v1",
    principale: true,
  },
];

// ── Team (bio reali) ────────────────────────────────────────
export const team: MembroTeam[] = [
  {
    slug: "ilenia-tagliaferro",
    nome: "Dott.ssa Ilenia Tagliaferro",
    ruolo: "Psicologa Clinica · Specializzanda in Psicoterapia Cognitivo-Comportamentale",
    ambitoBreve: "Ansia, difficoltà emotive e relazionali",
    bioBreve:
      "Psicologa clinica, specializzanda in psicoterapia cognitivo-comportamentale. Accompagna bambini, adolescenti e adulti in percorsi di ascolto, supporto e crescita, occupandosi di ansia e di difficoltà emotive e relazionali.",
    bio:
      "Psicologa clinica, specializzanda in psicoterapia cognitivo-comportamentale. Accompagno bambini, adolescenti e adulti in percorsi di supporto psicologico e psicoterapia, offrendo uno spazio sicuro di ascolto, accoglienza e crescita. Mi occupo di ansia, difficoltà emotive e relazionali, aiutando le persone a ritrovare equilibrio e a costruire nuove risorse per affrontare la quotidianità.",
    foto: "/foto/viso/viso-ilenia.jpg",
    avatar: "/foto/viso/avatar/viso-ilenia.webp",
    telefonoDisplay: "392\u00a0821\u00a05608",
    whatsapp: wa("3928215608", "Buongiorno Dott.ssa Tagliaferro"),
    instagram: ig("psicologa_ileniatagliaferro"),
    instagramHandle: "@psicologa_ileniatagliaferro",
    sitoWeb: "https://ileniatagliaferro.it",
    scuole: true,
    albo: "26441",
    piva: "04642290987",
  },
  {
    slug: "anna-marini",
    nome: "Dott.ssa Anna Marini",
    ruolo: "Psicologa Clinica · Psicoterapeuta",
    ambitoBreve: "Psicoterapia individuale e di gruppo",
    bioBreve:
      "Psicologa e psicoterapeuta a orientamento psicodinamico, iscritta all'Ordine della Lombardia. Si occupa di sostegno e psicoterapia individuale e di gruppo, genitorialità, formazione e supervisione, mindfulness e training autogeno.",
    bio:
      "Mi chiamo Anna Marini, sono psicologa e psicoterapeuta, iscritta all'Ordine degli Psicologi della Lombardia (n. 7229). Mi sono laureata presso l'Università degli Studi di Padova nel 2001, in Psicologia Clinica e di Comunità. Mi sono formata e ho lavorato per molti anni all'interno di servizi pubblici e studi privati. In questi contesti ho sviluppato capacità di lavoro autonomo e in rete ed ho avuto l'occasione di occuparmi di benessere psicologico lungo tutto l'arco della vita: bambini, adolescenti, adulti, terza età e famiglie. Ho imparato a redigere e gestire progetti clinici individuali e formativi. Ho sempre lavorato sia con l'individuo sia col gruppo. In particolare, oltre al contesto individuale, ho condotto: gruppi di psicoterapia per preadolescenti, per adolescenti e per adulti; gruppi di educazione alla salute, di accompagnamento alla nascita e alla crescita; di educazione all'affettività e alla sessualità nelle scuole e perfino gruppi per neo-nonni! Ho partecipato a numerosi corsi, convegni e percorsi di supervisione su tematiche legate ad adolescenza e preadolescenza, genitorialità, disabilità fisica e mentale, multiculturalità, inclusione, lavoro nei servizi e nelle istituzioni. Nel mio lavoro mi occupo principalmente di: sostegno psicologico e psicoterapia individuale, sostegno psicologico e psicoterapia di gruppo, lavoro clinico con preadolescenti e adolescenti, sostegno alla genitorialità e accompagnamento nei momenti di cambiamento (nascita, crescita, difficoltà educative), formazione e supervisione per operatori socio-educativi, insegnanti e genitori, insegnamento individuale e di gruppo di mindfulness e training autogeno. Mi caratterizza un approccio psicodinamico, in cui però integro anche diverse metodologie – tra cui psicodramma, mindfulness, training autogeno ed EMDR – in base alle specifiche caratteristiche individuali e ai bisogni specifici di ognuno. Nelle mie sedute utilizzo il colloquio clinico, ma anche modalità attive, sia nell'approccio individuale sia gruppale. Credo molto nella valorizzazione delle caratteristiche personali di ognuno, ed è proprio in base a queste che col paziente strutturo un percorso volto al potenziamento di sé attraverso piccoli e graduali cambiamenti funzionali. I temi che tratto nei percorsi proposti sono svariati: gestione di ansia e stress, capacità relazionali e tecnica comunicativa, crescita personale e consapevolezza di sé, autostima e sicurezza in sé stessi, capacità decisionali, motivazione, gestione del tempo, assertività. Nella formazione e nella supervisione metto a frutto la grande esperienza accumulata nel lavoro in équipe multidisciplinari e nella collaborazione professionale nei contesti istituzionali.",
    foto: "/foto/viso/viso-anna.jpg",
    avatar: "/foto/viso/avatar/viso-anna.webp",
    telefonoDisplay: "328\u00a0357\u00a00032",
    whatsapp: wa("3283570032", "Buongiorno Dott.ssa Marini"),
    instagram: ig("annamarini_psico"),
    instagramHandle: "@annamarini_psico",
    scuole: false,
    albo: "7229",
    // piva: "" ← da fornire (Anna)
    profili: [
      "https://www.guidapsicologi.it/studio/dottssa-anna-marini",
      "https://www.miodottore.it/anna-marini-2/psicoterapeuta/brescia",
    ],
    profilo: [
      {
        titolo: "Chi sono",
        blocchi: [
          { tipo: "p", testo: "Mi chiamo Anna Marini, sono psicologa e psicoterapeuta, iscritta all'Ordine degli Psicologi della Lombardia (n. 7229)." },
          { tipo: "p", testo: "Mi sono laureata presso l'Università degli Studi di Padova nel 2001 in Psicologia Clinica e di Comunità. Mi sono formata e ho lavorato per molti anni all'interno di servizi pubblici e studi privati." },
          { tipo: "p", testo: "In questi contesti ho sviluppato capacità di lavoro autonomo e in rete, e ho avuto l'occasione di occuparmi di benessere psicologico lungo tutto l'arco della vita: bambini, adolescenti, adulti, terza età e famiglie. Ho imparato a redigere e gestire progetti clinici individuali e formativi." },
          { tipo: "p", testo: "Ho sempre lavorato sia con l'individuo sia con il gruppo. In particolare, oltre al contesto individuale, ho condotto:" },
          { tipo: "ul", voci: [
            "Gruppi di psicoterapia per preadolescenti, adolescenti e adulti",
            "Gruppi di educazione alla salute",
            "Gruppi di accompagnamento alla nascita e alla crescita",
            "Gruppi di educazione all'affettività e alla sessualità nelle scuole",
            "E perfino gruppi per neo-nonni!",
          ] },
          { tipo: "p", testo: "Ho partecipato a numerosi corsi, convegni e percorsi di supervisione su tematiche legate ad adolescenza e preadolescenza, genitorialità, disabilità fisica e mentale, multiculturalità, inclusione e lavoro nei servizi e nelle istituzioni." },
        ],
      },
      {
        titolo: "Di cosa mi occupo",
        blocchi: [
          { tipo: "p", testo: "Nel mio lavoro mi occupo principalmente di:" },
          { tipo: "ul", voci: [
            "Sostegno psicologico e psicoterapia individuale",
            "Sostegno psicologico e psicoterapia di gruppo",
            "Lavoro clinico con preadolescenti e adolescenti",
            "Sostegno alla genitorialità e accompagnamento nei momenti di cambiamento (nascita, crescita, difficoltà educative)",
            "Formazione e supervisione per operatori socio-educativi, insegnanti e genitori",
            "Insegnamento individuale e di gruppo di mindfulness e training autogeno",
          ] },
        ],
      },
      {
        titolo: "Come lavoro",
        blocchi: [
          { tipo: "p", testo: "Mi caratterizza un approccio psicodinamico, nel quale integro anche diverse metodologie — tra cui psicodramma, mindfulness, training autogeno ed EMDR — in base alle caratteristiche e ai bisogni specifici di ognuno." },
          { tipo: "p", testo: "Nelle sedute utilizzo il colloquio clinico, ma anche modalità attive, sia nell'approccio individuale sia in quello di gruppo. Credo molto nella valorizzazione delle caratteristiche personali di ciascuno: è proprio a partire da queste che costruisco, insieme al paziente, un percorso di potenziamento di sé attraverso piccoli e graduali cambiamenti funzionali." },
          { tipo: "p", testo: "I temi che tratto nei percorsi proposti sono diversi:" },
          { tipo: "ul", voci: [
            "Gestione di ansia e stress",
            "Capacità relazionali e comunicative",
            "Crescita personale e consapevolezza di sé",
            "Autostima e sicurezza in sé stessi",
            "Capacità decisionali",
            "Motivazione",
            "Gestione del tempo",
            "Assertività",
          ] },
          { tipo: "p", testo: "Nella formazione e nella supervisione metto a frutto l'esperienza accumulata nel lavoro in équipe multidisciplinari e nella collaborazione professionale nei contesti istituzionali." },
        ],
      },
    ],
  },
  {
    slug: "valentina-nicolai",
    nome: "Dott.ssa Valentina Nicolai",
    ruolo: "Psicologa Scolastica",
    ambitoBreve: "DSA, BES, metodo di studio",
    bioBreve:
      "Si occupa di apprendimento, metodo di studio e supporto a bambini e ragazzi con DSA e BES.",
    bio:
      "Sono la dott.ssa Nicolai Valentina. Ho conseguito una laurea magistrale in psicologia clinica presso l'Università degli Studi di Bergamo e, grazie alle successive specializzazioni in Disturbi Specifici dell'Apprendimento, svolgo percorsi che hanno lo scopo di condurre verso un metodo di studio più efficace e consapevole, sia per studenti con certificazioni, sia per coloro che hanno un bisogno educativo speciale, disegnando insieme ad ognuno di essi strategie e modalità personalizzate e funzionali. Essenziale, nel mio lavoro con gli studenti, è comprendere quali siano in primis i punti di forza: ognuno di loro possiede risorse fondamentali e mi piace pensare che questo sia il punto di partenza per raggiungere gli obiettivi prefissati. Creo percorsi volti al rinforzo e potenziamento degli apprendimenti, con lo scopo di rafforzare lettura, scrittura e calcolo, oltre alla creazione e costruzione di strumenti compensativi personalizzati. Fondamentale è, per la crescita e il benessere psicologico di ogni studente, che le figure che ruotano attorno percorrano la stessa via e creino una rete ben salda. Per questa ragione, svolgo consulenze e aggiornamenti con genitori, insegnanti e professionisti.",
    foto: "/foto/viso/viso-valentina.jpg",
    avatar: "/foto/viso/avatar/viso-valentina.webp",
    telefonoDisplay: "338\u00a0608\u00a06727",
    whatsapp: wa("3386086727", "Buongiorno Dott.ssa Nicolai"),
    instagram: ig("valentina.nicolai.psy"),
    instagramHandle: "@valentina.nicolai.psy",
    scuole: true,
    // albo: "" ← da confermare (25086 da GuidaPsicologi)
    // piva: "" ← da fornire (Valentina)
    profili: ["https://www.guidapsicologi.it/studio/valentina-nicolai"],
    profilo: [
      {
        titolo: "Chi sono",
        blocchi: [
          { tipo: "p", testo: "Sono la Dott.ssa Valentina Nicolai, psicologa scolastica, e mi occupo di apprendimento, metodo di studio e supporto a bambini e ragazzi con DSA e BES." },
          { tipo: "p", testo: "Ho conseguito la laurea magistrale in Psicologia Clinica presso l’Università degli Studi di Bergamo e ho approfondito la mia formazione nell’ambito dei Disturbi Specifici dell’Apprendimento." },
          { tipo: "p", testo: "Nel mio lavoro accompagno gli studenti nella scoperta delle proprie risorse e nello sviluppo di strategie di apprendimento personalizzate, affinché possano affrontare lo studio con maggiore consapevolezza, autonomia e fiducia nelle proprie capacità." },
          { tipo: "p", testo: "Credo che ogni studente abbia un modo unico di apprendere e che le difficoltà scolastiche non definiscano il suo potenziale. Per questo, ogni percorso nasce dall’ascolto dei bisogni individuali e dalla valorizzazione dei punti di forza, per costruire insieme modalità di studio più efficaci e sostenibili." },
        ],
      },
      {
        titolo: "Come lavoro",
        blocchi: [
          { tipo: "p", testo: "Ogni studente ha caratteristiche, risorse e bisogni differenti. Per questo, non esiste un unico metodo di studio valido per tutti." },
          { tipo: "p", testo: "Il mio lavoro parte dall’ascolto e dalla comprensione delle difficoltà dello studente, per individuare insieme strategie che siano realmente adatte al suo modo di apprendere." },
          { tipo: "p", testo: "Attraverso attività mirate, accompagno bambini e ragazzi nell’organizzazione dello studio, nell’utilizzo di strategie efficaci e nella costruzione di un rapporto più sereno e fiducioso con l’apprendimento." },
          { tipo: "p", testo: "Quando necessario, il percorso si apre anche al confronto con genitori, insegnanti e altri professionisti, perché una rete educativa condivisa può rappresentare una risorsa importante per la crescita e il benessere dello studente." },
        ],
      },
      {
        titolo: "Quando può essere utile un percorso di metodo di studio?",
        blocchi: [
          { tipo: "p", testo: "Un percorso può essere utile quando un bambino o un ragazzo:" },
          { tipo: "ul", voci: [
            "Fatica a organizzare il materiale e pianificare lo studio.",
            "Impiega molto tempo per svolgere i compiti e prepararsi alle verifiche.",
            "Non sa come affrontare lo studio in modo efficace.",
            "Fatica a comprendere, ricordare o rielaborare le informazioni.",
            "Vive la scuola con frustrazione, demotivazione o scarsa fiducia nelle proprie capacità.",
            "Ha bisogno di strategie personalizzate in presenza di DSA o BES.",
          ] },
          { tipo: "p", testo: "Non è necessario aspettare che le difficoltà diventino insostenibili per chiedere un confronto. Anche un primo colloquio può aiutare a comprendere i bisogni dello studente e valutare insieme il percorso più adatto." },
        ],
      },
    ],
  },
];

// ── Servizi (6 reali) ───────────────────────────────────────
export const servizi: Servizio[] = [
  {
    slug: "psicoterapia",
    icona: "💬",
    titolo: "Psicoterapia individuale e di gruppo",
    testo: "Percorsi personali o condivisi per affrontare ansia, depressione, difficoltà emotive e relazionali.",
    descrizione:
      "Uno spazio di ascolto e cura per affrontare ansia, depressione, attacchi di panico e difficoltà emotive e relazionali. Il percorso individuale offre uno spazio personale e riservato; quello di gruppo permette di condividere l'esperienza e riconoscersi negli altri, con la guida di una professionista.",
    punti: [
      "Per adolescenti e adulti",
      "Individuale o di gruppo",
      "Diverse metodologie, in base alla persona",
      "In studio o online",
    ],
  },
  {
    slug: "metodo-di-studio",
    icona: "📚",
    titolo: "Metodo di studio e potenziamento degli apprendimenti",
    testo: "Percorsi personalizzati per un metodo di studio efficace e consapevole.",
    paragrafi: [
      "Studiare non significa soltanto dedicare tempo ai libri, ma trovare il modo di apprendere che meglio si adatta alle proprie caratteristiche e ai propri bisogni.",
      "Quando studiare diventa faticoso, i compiti richiedono molto tempo o mancano motivazione e fiducia nelle proprie capacità, può essere utile intraprendere un percorso personalizzato.",
      "Attraverso un lavoro mirato, accompagno bambini e ragazzi nello sviluppo di un metodo di studio efficace e consapevole, potenziando le abilità di apprendimento e promuovendo una progressiva autonomia.",
      "Ogni percorso parte dalle caratteristiche dello studente, dai suoi punti di forza e dalle sue difficoltà, per individuare strategie concrete e strumenti realmente funzionali.",
    ],
    puntiTitolo: "Di cosa ci occupiamo:",
    punti: [
      "Metodo di studio e strategie di apprendimento",
      "Organizzazione, pianificazione e gestione dei compiti",
      "Potenziamento di lettura, scrittura e calcolo",
      "Sviluppo delle funzioni esecutive e della metacognizione",
      "Creazione e utilizzo di strumenti compensativi personalizzati",
      "Supporto a studenti con DSA e BES",
    ],
    chiusura:
      "I percorsi sono rivolti a bambini e ragazzi della scuola primaria e secondaria e prevedono, quando necessario, un confronto con la famiglia e la scuola, per costruire una rete di supporto coerente con i bisogni dello studente.",
  },
  {
    slug: "sostegno-genitorialita",
    icona: "👪",
    titolo: "Sostegno alla genitorialità",
    testo: "Accompagnamento nelle sfide educative e relazionali.",
    descrizione:
      "Uno spazio di confronto per i genitori che attraversano sfide educative e relazionali, o momenti di cambiamento come la nascita, la crescita o le difficoltà a scuola. Insieme si cercano strategie e uno sguardo nuovo sulla relazione con i figli. Accompagniamo anche i genitori nella fase della separazione, per tutelare il benessere psicologico dei figli e trovare insieme un'organizzazione più serena della quotidianità.",
    punti: [
      "Per genitori e famiglie",
      "Sfide educative e relazionali",
      "Accompagnamento nei cambiamenti",
      "Accompagnamento nella separazione",
      "Singoli incontri o percorsi",
    ],
  },
  {
    slug: "formazione-supervisione",
    icona: "🎓",
    titolo: "Formazione e supervisione",
    testo: "Per operatori socio-educativi, insegnanti e genitori.",
    descrizione:
      "Percorsi di formazione e supervisione per operatori socio-educativi, insegnanti e genitori, costruiti sull'esperienza nel lavoro in équipe multidisciplinari. Strumenti concreti per leggere i bisogni, gestire le relazioni educative e prevenire il disagio.",
    punti: [
      "Per operatori, insegnanti e genitori",
      "Formazione su misura",
      "Supervisione di casi, individuale e di gruppo",
      "Anche per gli istituti scolastici",
    ],
  },
  {
    slug: "mindfulness-training-autogeno",
    icona: "🧘",
    titolo: "Mindfulness e training autogeno",
    testo: "Insegnamento individuale e di gruppo.",
    descrizione:
      "Pratiche di consapevolezza e rilassamento per ridurre lo stress, regolare le emozioni e ritrovare equilibrio. Proposte in percorsi individuali o di gruppo, come strumento a sé o all'interno di un percorso più ampio.",
    punti: [
      "Individuale o di gruppo",
      "Riduzione di stress e tensione",
      "Regolazione emotiva",
      "Tecniche apprendibili e ripetibili",
    ],
  },
  {
    slug: "terapia-online",
    icona: "🖥️",
    titolo: "Terapia online",
    testo: "Sedute a distanza con la stessa qualità dello studio.",
    descrizione:
      "Le sedute a distanza, in videochiamata, mantengono la stessa qualità e riservatezza di quelle in studio. Una soluzione comoda per chi vive lontano, viaggia spesso o preferisce un ambiente familiare, senza rinunciare alla continuità del percorso.",
    punti: [
      "In videochiamata",
      "Stessa riservatezza delle sedute in studio",
      "Comoda e flessibile",
    ],
  },
];

// ── Fasce d'età ─────────────────────────────────────────────
export const fasce: Fascia[] = [
  { emoji: "👶", titolo: "Infanzia", testo: "Supporto nella crescita" },
  { emoji: "🧒", titolo: "Adolescenza", testo: "Scoperta di sé" },
  { emoji: "🧑", titolo: "Età adulta", testo: "Sfide quotidiane" },
  { emoji: "👨‍👩‍👧", titolo: "Genitorialità", testo: "Il ruolo più importante" },
  { emoji: "👴", titolo: "Terza età", testo: "Benessere in ogni momento" },
];

// ── Metodologie ─────────────────────────────────────────────
export const metodologie: Metodologia[] = [
  { icona: "🧠", titolo: "Tecniche Cognitive e Comportamentali", testo: "Strumenti per riconoscere e modificare schemi di pensiero disfunzionali." },
  { icona: "🧘", titolo: "Mindfulness", testo: "Pratiche di consapevolezza per ridurre lo stress e coltivare equilibrio emotivo." },
  { icona: "🎭", titolo: "Psicodramma", testo: "Esplorazione di dinamiche interne e relazionali attraverso la messa in scena del proprio mondo interiore." },
  { icona: "🌊", titolo: "Training Autogeno", testo: "Rilassamento profondo per l'autoregolazione e la gestione dell'ansia." },
];

// ── FAQ ──────────────────────────────────────────
export const faq: FaqItem[] = [
  { domanda: "Come funziona il primo appuntamento?", risposta: "Il primo colloquio è un momento di conoscenza reciproca. Non serve preparare nulla di specifico: si racconta il motivo per cui si è chiesto aiuto, con i propri tempi. Insieme si valuta il percorso più adatto." },
  { domanda: "Quanto dura un percorso di psicoterapia?", risposta: "La durata varia molto in base alla persona e agli obiettivi. Ne parliamo insieme fin dal primo incontro." },
  { domanda: "Devo raccontare tutto alla prima seduta?", risposta: "No. La prima seduta non è un interrogatorio. Racconti ciò che ti senti, con i tuoi tempi. È uno spazio di incontro, conoscenza e ascolto — per conoscerci, capire cosa ti ha portato fin qui e costruire insieme un percorso possibile." },
  { domanda: "E se piango durante la seduta?", risposta: "Le emozioni sono benvenute. Piangere non è un fallimento, è un modo naturale di esprimere ciò che si sente. Lo studio è uno spazio sicuro e senza giudizio, dove ogni emozione ha il diritto di essere accolta." },
  { domanda: "Se non mi sento subito meglio, la terapia non funziona?", risposta: "Il cambiamento richiede tempo, fiducia e cura. La prima seduta non serve a risolvere tutto — è il primo passo per capirti meglio. Non serve stare meglio subito: il percorso si costruisce insieme, seduta dopo seduta." },
  { domanda: "Mio figlio fa fatica a scuola, è svogliato?", risposta: "Le difficoltà scolastiche non sono un segno di incapacità o svogliatezza. Spesso sono un segnale che qualcosa non sta funzionando come dovrebbe. Un ragazzo che fa fatica può essere stanco, in ansia, confuso, oppure non ha ancora trovato il metodo giusto per lui. La fatica va ascoltata, non eliminata in fretta." },
  { domanda: "Fate anche sedute online?", risposta: "Sì, tutte le professioniste dello studio offrono la possibilità di sedute online tramite videochiamata. Nel primo colloquio valutiamo insieme se è la modalità adatta." },
  { domanda: "Come posso prenotare?", risposta: "Puoi contattarci via WhatsApp, email o telefono. Scrivici un messaggio e ti risponderemo per fissare un primo appuntamento orientativo e di conoscenza, a cui seguirà la presa in carico più adeguata al bisogno." },
  { domanda: "Lavorate con bambini e adolescenti?", risposta: "Sì. Nello studio si lavora con infanzia, adolescenza, età adulta, genitorialità e terza età. La Dott.ssa Nicolai si occupa in particolare di DSA e BES." },
  { domanda: "Per un percorso con un minore serve il consenso di entrambi i genitori?", risposta: "Sì. Per un percorso psicologico con un bambino o un ragazzo serve il consenso di entrambi i genitori, o di chi esercita la responsabilità genitoriale, anche quando i genitori sono separati. Se ne parla con calma nel primo incontro." },
  { domanda: "Il primo incontro va fatto insieme a mio figlio?", risposta: "Di solito no: il primo colloquio è con i genitori, per raccontare cosa vi preoccupa e capire insieme come procedere. Con gli adolescenti si valuta di volta in volta." },
  { domanda: "Cosa resta riservato di ciò che racconta mio figlio?", risposta: "Lo spazio personale del bambino o del ragazzo è la base della fiducia, e va rispettato. I genitori vengono aggiornati sull'andamento del percorso; le situazioni di rischio vengono sempre condivise con la famiglia." },
  { domanda: "Vi occupate solo di DSA o anche di altre difficoltà?", risposta: "Non solo di DSA. Ci occupiamo anche di BES, metodo di studio, difficoltà attentive, organizzazione, strategie di apprendimento e benessere scolastico più in generale." },
  { domanda: "È necessario avere una certificazione o una diagnosi per chiedere supporto?", risposta: "No, non è necessario. Si può richiedere un supporto anche in assenza di una certificazione o di una diagnosi specifica. A volte possono emergere difficoltà nello studio, nell'organizzazione, nell'attenzione o nella gestione scolastica che meritano ascolto e approfondimento, anche senza un inquadramento diagnostico." },
  { domanda: "Quello che racconto resta riservato?", risposta: "Sì. Le professioniste dello studio sono tenute al segreto professionale: ciò che emerge nei colloqui resta riservato. Lo studio è uno spazio sicuro, dove parlare liberamente e senza giudizio." },
];

// ── Progetto Scuole (Ilenia + Valentina) ────────────────────
export const scuole = {
  target: "Scuole Secondarie di I Grado",
  intro:
    "Psiche Holos progetta interventi su misura per le scuole, dalla formazione dei docenti al supporto diretto a studenti e famiglie.",
  obiettivo:
    "Supportare la scuola nella costruzione di un ambiente educativo attento non solo al rendimento, ma anche al benessere psicologico, emotivo e relazionale degli studenti.",
  // "Come funziona" nella pagina Scuole — da confermare con Ilenia e Valentina
  passi: [
    { titolo: "Call di 30 minuti", testo: "Gratuita: ci raccontate i bisogni della scuola e il contesto delle classi." },
    { titolo: "Proposta su misura", testo: "Obiettivi, attività, tempi e preventivo, costruiti sull'istituto." },
    { titolo: "Realizzazione", testo: "In classe e con i docenti, coinvolgendo le famiglie quando serve." },
    { titolo: "Restituzione", testo: "Un incontro finale per condividere cosa è emerso e i possibili passi successivi." },
  ],
  professioniste: ["ilenia-tagliaferro", "valentina-nicolai"],
  // usato dal banner in home
  pilastri: [
    { titolo: "Formazione docenti", desc: "Percorsi su DSA e BES per riconoscere e accompagnare i bisogni educativi speciali." },
    { titolo: "Sportello e percorsi individuali", desc: "Ascolto psicologico e percorsi dedicati agli studenti in difficoltà." },
    { titolo: "Laboratori di gruppo", desc: "Bullismo, soft skills, metodo di studio, comunicazione ed emozioni, orientamento, motivazione." },
  ],
  leadMagnet: {
    titolo: "Progetti integrati per il benessere scolastico",
    sottotitolo: "La nostra proposta per le Scuole Secondarie di I Grado",
    descrizione:
      "Una presentazione completa dei nostri interventi per la scuola: formazione docenti su DSA e BES, sportello e percorsi individuali per gli studenti, laboratori di gruppo. A cura delle Dott.sse Ilenia Tagliaferro e Valentina Nicolai.",
    file: "/download/proposte-scuole-psiche-holos.pdf",
    pagine: 6,
  },
  formazione: {
    titolo: "Formazione docenti",
    sottotitolo: "DSA e BES: difficoltà scolastiche e bisogni emotivi",
    descrizione:
      "Un percorso per offrire agli insegnanti strumenti concreti per comprendere e affrontare le difficoltà scolastiche in una prospettiva integrata: apprendimento, vissuti emotivi e inclusione.",
    obiettivi: [
      "Approfondire DSA e BES in chiave didattica ed emotiva",
      "Riconoscere il legame tra difficoltà scolastiche, autostima, autoefficacia e motivazione",
      "Individuare i segnali di disagio psicologico",
      "Promuovere strategie inclusive e personalizzate",
      "Rafforzare il dialogo scuola–studente–famiglia",
    ],
    tematiche: [
      "DSA e BES: caratteristiche, differenze e bisogni",
      "Apprendimento e regolazione emotiva",
      "Difficoltà scolastiche e benessere psicologico",
      "Strumenti compensativi e strategie didattiche",
      "Relazione educativa efficace",
    ],
  },
  sportello: {
    titolo: "Sportello e percorsi individuali per studenti",
    sottotitolo: "Ascolto, supporto e metodo di studio efficace",
    descrizione:
      "Uno spazio dedicato di ascolto, supporto e orientamento, costruito attorno alle esigenze del singolo studente e in dialogo con il contesto educativo.",
    finalita: [
      "Supporto psicologico scolastico",
      "Sviluppo di un metodo di studio efficace e consapevole",
      "Potenziamento di organizzazione e autonomia",
      "Sostegno motivazionale",
      "Prevenzione del disagio emotivo",
    ],
    ambiti: [
      "Metodo di studio",
      "Organizzazione scolastica",
      "Difficoltà attentive",
      "Ansia scolastica",
      "Autostima e motivazione",
      "Difficoltà relazionali",
    ],
  },
  laboratori: [
    { titolo: "Bullismo e dinamiche relazionali", desc: "Prevenzione e sensibilizzazione per favorire rispetto, empatia e sicurezza relazionale.", focus: "Dinamiche di bullismo · cyberbullismo · empatia · gestione del conflitto · richiesta di supporto" },
    { titolo: "Soft skills e funzioni esecutive", desc: "Potenziamento delle abilità necessarie per apprendimento e crescita personale.", focus: "Pianificazione · autoregolazione · problem solving · flessibilità cognitiva · collaborazione" },
    { titolo: "Metodo di studio", desc: "Strategie di apprendimento efficaci e maggiore autonomia scolastica.", focus: "Organizzazione · pianificazione · gestione del tempo · strategie di studio · autonomia" },
    { titolo: "Comunicazione ed emozioni", desc: "Percorsi orientati allo sviluppo emotivo e relazionale.", focus: "Riconoscimento emotivo · gestione delle emozioni · comunicazione efficace · ascolto · relazione con i pari" },
    { titolo: "Orientamento scolastico", desc: "Accompagnare gli studenti verso scelte più consapevoli.", focus: "Conoscenza di sé · interessi · risorse e limiti · autoefficacia · scelta scolastica" },
    { titolo: "Motivazione", desc: "Sostenere il coinvolgimento scolastico e la fiducia nelle proprie capacità.", focus: "Motivazione intrinseca · obiettivi · senso di competenza · mindset di crescita" },
  ],
};

// ── Navigazione ─────────────────────────────────────────────
export const nav = [
  { label: "Chi siamo", href: "/studio/" },
  { label: "Servizi", href: "/servizi/" },
  { label: "Team", href: "/team/" },
  { label: "Scuole", href: "/scuole/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Blog", href: "/blog/" },
];

// Footer: come il menu principale + Novità e Contatti (nell'header "Contatti"
// non c'è: lo sostituisce il bottone "Prenota un colloquio", che porta alla stessa pagina).
export const navFooter = [
  ...nav.filter((v) => v.href !== "/contatti/"),
  { label: "Novità", href: "/novita/" },
  { label: "Contatti", href: "/contatti/" },
];
