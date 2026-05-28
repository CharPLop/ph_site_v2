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

export interface MembroTeam {
  slug: string;
  nome: string;
  ruolo: string;
  bio: string;
  foto?: string;
  telefonoDisplay: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  sitoWeb?: string;
  scuole: boolean;
}

export interface Servizio {
  slug: string;
  icona: string;
  titolo: string;
  testo: string;
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
    "Psiche Holos è uno studio di psicologia e psicoterapia a Brescia: tre professioniste per il benessere della persona in ogni fase della vita, con percorsi individuali, di gruppo, online e supporto scolastico.",
  url: "https://www.psicheholos.it",
  email: "psicheholos@gmail.com",
  telefono: "+39 392 821 5608",
  telefonoDisplay: "392 821 5608",
  instagram: "https://www.instagram.com/psicheholos/",
  instagramHandle: "@psicheholos",
  whatsapp: wa("3928215608", "Buongiorno, vorrei prenotare un primo appuntamento presso Psiche Holos"),
  locale: "it_IT",
  logo: "/loghi/logo-psiche-holos.png",
  fotoGruppo: "/foto/team-portrait.jpg",
};

// ── Chi siamo ───────────────────────────────────────────────
export const chiSiamo = {
  titolo: "Uno spazio per il benessere nella sua totalità",
  testo:
    "Psiche Holos nasce dalla volontà di creare uno spazio di ascolto, accoglienza e cura, pensato per accogliere il bisogno psicologico nella sua totalità. Ci prendiamo cura della persona in ogni fase della vita: infanzia, adolescenza, età adulta, genitorialità e terza età. Offriamo percorsi di psicoterapia individuali e di gruppo, lavorando su ansia, depressione, difficoltà emotive e relazionali. Accompagniamo anche studenti nel costruire un metodo di studio più efficace e consapevole, con percorsi di potenziamento di lettura, scrittura e calcolo. Utilizziamo diverse metodologie nel rispetto dell'unicità di ogni persona: tecniche cognitive e comportamentali, mindfulness, training autogeno, psicodramma.",
  valori: [
    { icona: "🌿", titolo: "Ascolto e accoglienza", testo: "Uno spazio sicuro dove raccontarsi per come si è oggi, senza giudizio." },
    { icona: "🤝", titolo: "Approccio integrato", testo: "Diverse metodologie nel rispetto dell'unicità di ogni persona." },
    { icona: "🌱", titolo: "Crescita e cura", testo: "Il cambiamento richiede tempo, fiducia e relazione." },
  ],
};

export const citazione = "Il primo passo non deve essere perfetto. Deve solo essere fatto.";

// ── Galleria studio (foto reali) ────────────────────────
export const galleria = [
  { src: "/foto/studio-corridoio.jpg", alt: "L'ingresso dello studio Psiche Holos" },
  { src: "/foto/studio-ilenia-2.jpg",  alt: "Lo studio della Dott.ssa Ilenia Tagliaferro" },
  { src: "/foto/studio-ilenia-5.jpg",  alt: "Sala per bambini e ragazzi" },
  { src: "/foto/studio-anna-2.jpg",    alt: "Lo studio della Dott.ssa Anna Marini" },
  { src: "/foto/studio-anna-1.jpg",    alt: "Sala accogliente per le sedute" },
  { src: "/foto/studio-ilenia-6.jpg",  alt: "Spazio luminoso con libreria" },
];

// ── Sedi ────────────────────────────────────────────────────
export const sedi: Sede[] = [
  {
    citta: "Brescia",
    titolo: "Studio Psiche Holos",
    indirizzo: "Via Guido Zadei, 60",
    cap: "25128 Brescia (BS)",
    orari: "Su appuntamento · anche online",
    mappaEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.8!2d10.2175!3d45.534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781538e7e8fba39%3A0xc7c9f0c3e8e3d4a!2sVia+Guido+Zadei%2C+60%2C+25128+Brescia+BS!5e0!3m2!1sit!2sit!4v1",
    principale: true,
  },
];

// ── Team (bio reali) ────────────────────────────────────────
export const team: MembroTeam[] = [
  {
    slug: "ilenia-tagliaferro",
    nome: "Dott.ssa Ilenia Tagliaferro",
    ruolo: "Psicologa Clinica · Psicoterapeuta CBT",
    bio:
      "Psicologa clinica e psicoterapeuta cognitivo-comportamentale. Accompagno bambini, adolescenti e adulti in percorsi di supporto psicologico e psicoterapia, offrendo uno spazio sicuro di ascolto, accoglienza e crescita. Mi occupo di ansia, difficoltà emotive e relazionali, aiutando le persone a ritrovare equilibrio e a costruire nuove risorse per affrontare la quotidianità.",
    foto: "/foto/foto-ilenia.jpg",
    telefonoDisplay: "392 821 5608",
    whatsapp: wa("3928215608", "Buongiorno Dott.ssa Tagliaferro"),
    instagram: ig("psicologa_ileniatagliaferro"),
    instagramHandle: "@psicologa_ileniatagliaferro",
    sitoWeb: "https://ileniatagliaferro.it",
    scuole: true,
  },
  {
    slug: "anna-marini",
    nome: "Dott.ssa Anna Marini",
    ruolo: "Psicologa Clinica · Psicoterapeuta",
    bio:
      "Psicologa clinica e psicoterapeuta con oltre 20 anni di esperienza. Mi occupo di sostegno psicologico e psicoterapia per adolescenti, adulti e famiglie. Il mio approccio psicodinamico integra diverse metodologie — Mindfulness, Training Autogeno, Psicodramma ed EMDR — in base alle caratteristiche e ai bisogni specifici di ognuno. Il mio obiettivo è promuovere benessere, consapevolezza e crescita individuale.",
    foto: "/foto/foto-anna.jpg",
    telefonoDisplay: "328 357 0032",
    whatsapp: wa("3283570032", "Buongiorno Dott.ssa Marini"),
    instagram: ig("annamarini_psico"),
    instagramHandle: "@annamarini_psico",
    scuole: false,
  },
  {
    slug: "valentina-nicolai",
    nome: "Dott.ssa Valentina Nicolai",
    ruolo: "Psicologa Scolastica",
    bio:
      "Psicologa scolastica. Accompagno bambini e ragazzi nel loro percorso scolastico, aiutandoli a trovare un metodo di studio personalizzato che valorizzi i punti di forza e le risorse di ciascuno. Creo percorsi di rinforzo degli apprendimenti e di costruzione di strumenti compensativi, con uno sguardo attento al benessere emotivo. Credo profondamente nel lavoro di rete con famiglie e insegnanti.",
    foto: "/foto/foto-valentina.jpg",
    telefonoDisplay: "338 608 6727",
    whatsapp: wa("3386086727", "Buongiorno Dott.ssa Nicolai"),
    instagram: ig("valentina.nicolai.psy"),
    instagramHandle: "@valentina.nicolai.psy",
    scuole: true,
  },
];

// ── Servizi (6 reali) ───────────────────────────────────────
export const servizi: Servizio[] = [
  { slug: "psicoterapia-individuale", icona: "💬", titolo: "Psicoterapia individuale", testo: "Un percorso personale per affrontare ansia, depressione, difficoltà emotive e relazionali." },
  { slug: "percorsi-di-gruppo", icona: "👥", titolo: "Percorsi di gruppo", testo: "Esperienze condivise di crescita, confronto e sostegno reciproco." },
  { slug: "terapia-online", icona: "🖥️", titolo: "Terapia online", testo: "Sedute a distanza con la stessa qualità dello studio." },
  { slug: "supporto-scolastico", icona: "📚", titolo: "Supporto scolastico", testo: "Metodo di studio, potenziamento lettura, scrittura e calcolo." },
  { slug: "sostegno-genitorialita", icona: "👪", titolo: "Sostegno alla genitorialità", testo: "Accompagnamento nelle sfide educative e relazionali." },
  { slug: "incontri-protetti", icona: "🔒", titolo: "Incontri protetti", testo: "Gestione di incontri in contesti delicati e supervisionati." },
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
  { icona: "🧠", titolo: "Tecniche Cognitive e Comportamentali", testo: "Approccio basato sull'evidenza scientifica per modificare schemi di pensiero disfunzionali." },
  { icona: "🧘", titolo: "Mindfulness", testo: "Pratiche di consapevolezza per ridurre lo stress e coltivare equilibrio emotivo." },
  { icona: "🎭", titolo: "Psicodramma", testo: "Esplorazione di dinamiche interne e relazionali attraverso la messa in scena." },
  { icona: "🌊", titolo: "Training Autogeno", testo: "Rilassamento profondo per l'autoregolazione e la gestione dell'ansia." },
];

// ── FAQ (10 reali) ──────────────────────────────────────────
export const faq: FaqItem[] = [
  { domanda: "Come funziona il primo appuntamento?", risposta: "Il primo colloquio è un momento di conoscenza reciproca. Non serve preparare nulla di specifico: si racconta il motivo per cui si è chiesto aiuto, con i propri tempi. Insieme si valuta il percorso più adatto. Dura circa 50 minuti." },
  { domanda: "Quanto dura un percorso di psicoterapia?", risposta: "La durata varia in base alla persona e alle esigenze. Un percorso breve può durare 8-12 sedute, percorsi più approfonditi possono protrarsi per diversi mesi. Ne parliamo insieme fin dal primo incontro." },
  { domanda: "Devo raccontare tutto alla prima seduta?", risposta: "Assolutamente no. La prima seduta non è un interrogatorio. Racconti ciò che ti senti, con i tuoi tempi. È uno spazio di incontro, conoscenza e ascolto — per conoscerci, capire cosa ti ha portato fin qui e costruire insieme un percorso possibile." },
  { domanda: "E se piango durante la seduta?", risposta: "Le emozioni sono benvenute. Piangere non è un fallimento, è un modo naturale di esprimere ciò che si sente. Lo studio è uno spazio sicuro e senza giudizio, dove ogni emozione ha il diritto di essere accolta." },
  { domanda: "Se non mi sento subito meglio, la terapia non funziona?", risposta: "Il cambiamento richiede tempo, fiducia e cura. La prima seduta non serve a risolvere tutto — è il primo passo per capirti meglio. Non serve stare meglio subito: il percorso si costruisce insieme, seduta dopo seduta." },
  { domanda: "Mio figlio fa fatica a scuola, è svogliato?", risposta: "Le difficoltà scolastiche non sono un segno di incapacità o svogliatezza. Spesso sono un segnale che qualcosa non sta funzionando come dovrebbe. Un ragazzo che fa fatica può essere stanco, in ansia, confuso, oppure non ha ancora trovato il metodo giusto per lui. La fatica va ascoltata, non eliminata in fretta." },
  { domanda: "Fate anche sedute online?", risposta: "Sì, tutte le professioniste dello studio offrono la possibilità di sedute online tramite videochiamata. La qualità e la riservatezza sono le stesse delle sedute in presenza." },
  { domanda: "Come posso prenotare?", risposta: "Puoi contattarci via WhatsApp, email o telefono. Scrivici un messaggio e ti risponderemo in giornata per fissare un primo appuntamento." },
  { domanda: "Lo studio è accessibile?", risposta: "Lo studio si trova in Via Guido Zadei 60 a Brescia, con possibilità di parcheggio nelle vicinanze. Per eventuali esigenze di accessibilità, contattaci e troveremo la soluzione migliore." },
  { domanda: "Lavorate con bambini e adolescenti?", risposta: "Assolutamente sì. Il nostro team lavora con tutte le fasce d'età: infanzia, adolescenza, età adulta, genitorialità e terza età. La Dott.ssa Nicolai è inoltre specializzata in psicologia scolastica, DSA e BES." },
];

// ── Progetto Scuole (Ilenia + Valentina) ────────────────────
export const scuole = {
  target: "Scuole Secondarie di I Grado",
  intro:
    "Psiche Holos progetta interventi su misura per le scuole, dalla formazione dei docenti al supporto diretto a studenti e famiglie.",
  obiettivo:
    "Supportare la scuola nella costruzione di un ambiente educativo attento non solo al rendimento, ma anche al benessere psicologico, emotivo e relazionale degli studenti.",
  professioniste: ["ilenia-tagliaferro", "valentina-nicolai"],
  // usato dal banner in home
  pilastri: [
    { titolo: "Formazione docenti", desc: "Percorsi su DSA e BES per riconoscere e accompagnare i bisogni educativi speciali." },
    { titolo: "Sportello e percorsi individuali", desc: "Ascolto psicologico e percorsi dedicati agli studenti in difficoltà." },
    { titolo: "Laboratori di gruppo", desc: "Bullismo, soft skills, metodo di studio, comunicazione ed emozioni, orientamento, motivazione." },
  ],
  leadMagnet: {
    titolo: "5 segnali di disagio in classe",
    sottotitolo: "Guida pratica per docenti e dirigenti",
    descrizione:
      "Cosa osservare, cosa fare e quando chiedere aiuto. Una guida operativa gratuita (8 pagine), a cura delle Dott.sse Ilenia Tagliaferro e Valentina Nicolai.",
    file: "/download/5-segnali-disagio-in-classe.pdf",
    pagine: 8,
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
  { label: "Contatti", href: "/contatti/" },
];
