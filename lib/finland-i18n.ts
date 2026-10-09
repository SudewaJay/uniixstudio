/**
 * /finland in two languages — English (default) and Finnish.
 *
 * English content stays in lib/finland.ts. This file holds:
 *   - `ui`: every interface string, in both languages
 *   - `fi`: Finnish versions of the lib/finland.ts content arrays (same order)
 *   - `fiProjects`: Finnish translations of the project facts the page shows
 *     (industry, services, headline, and the first sentence of challenge /
 *     approach / result). These translate existing MDX copy — no new claims.
 *
 * Testimonial quotes are deliberately NOT translated: a quote stays in the
 * words the client actually used.
 *
 * Only /finland/ and /finland/fi/ use this. The rest of the site is English.
 *
 * NOTE: Finnish copy should be reviewed by a native speaker before launch.
 */

import {
  finlandCapabilities,
  finlandFounder,
  finlandIndustries,
  finlandPartner,
  finlandPresence,
  finlandProcess,
  finlandServices,
  finlandStudioFrames,
  finlandWorkLayout,
} from "./finland";

export type FiLang = "en" | "fi";

/** Remembers an explicit language choice so auto-detection never overrides it. */
export const FI_LANG_COOKIE = "uniix_fi_lang";

export const finlandPaths: Record<FiLang, string> = {
  en: "/finland/",
  fi: "/finland/fi/",
};

// ---------------------------------------------------------------------------
// Interface strings
// ---------------------------------------------------------------------------

const ui = {
  en: {
    meta: {
      title: "Digital Agency Finland | Uniix Studio",
      description:
        "Uniix Studio creates websites, digital products, brands and growth experiences for ambitious businesses in Finland and internationally.",
    },
    lang: { label: "Language", en: "English", fi: "Suomi" },
    hero: {
      eyebrow: "Design · Technology · Growth",
      h1: ["Digital experiences", "built to move", "businesses forward."],
      lead: "Uniix combines strategy, design, technology and digital growth to create websites, products and experiences people remember.",
      work: "Explore our work",
      start: "Start a project",
      hint: "Real projects · tap to open the case study",
      tileAlt: "project by Uniix Studio",
    },
    work: {
      eyebrow: "Work",
      title: ["Selected", "work."],
      lead: "A selection of digital experiences, identities and products we've created for ambitious businesses.",
      details: "Details from the work",
      all: "All projects",
      view: "View case study",
      stripAria: "Project details",
    },
    services: {
      eyebrow: "Services",
      title: ["What we", "do."],
      lead: "Web design, development, product and growth — for businesses in Helsinki, across Finland and internationally.",
      about: "About this service",
      related: "Related work",
      capsAria: "capabilities",
    },
    cases: {
      eyebrow: "Case studies",
      title: ["Good design looks better.", "Great design works better."],
      tabsAria: "Case studies",
      steps: ["The challenge", "The approach", "The result"],
      read: "Read the full case study",
    },
    reviews: {
      eyebrow: "Client trust",
      title: ["Trusted by the people", "we build with."],
      prev: "Previous testimonial",
      next: "Next testimonial",
      engagement: "Engagement",
      project: "Project",
      caseStudy: "case study",
      railAria: "Testimonials",
      note: "",
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: ["Design meets", "engineering."],
      lead: "Designers and engineers on one team — so what gets designed is what gets built. Select a stage to see what sits inside it.",
    },
    industries: {
      eyebrow: "Industries",
      title: ["Built for businesses with", "something to move forward."],
      lead: "Where our work has taken us, and where it naturally fits next. Tiles marked “Related work” link to a real case study.",
      related: "Related work",
      discuss: "Discuss your project",
    },
    process: {
      eyebrow: "How we work",
      title: ["From idea", "to impact."],
      lead: "Five clear stages, one accountable team.",
    },
    about: {
      eyebrow: "About Uniix",
      title: ["Small enough to care.", "Experienced enough to build."],
      lead: "Uniix Studio is a multidisciplinary digital studio working across design, technology and growth. We help businesses turn ideas, outdated digital experiences and ambitious products into modern digital experiences.",
      disciplines: "Disciplines",
      disciplinesValue: "Design · Technology · Growth",
      workingWith: "Working with",
      workingWithValue: "Sri Lanka · Australia · UK · Finland",
      more: "More about the studio",
    },
    presence: {
      eyebrow: "Finland",
      title: ["Now working with ambitious", "businesses in Finland."],
      lead: "Uniix is extending its international client work into Finland, bringing together strong design, product and engineering capabilities with Finland-side technical collaboration.",
      expertiseAria: "Areas of expertise",
      talk: "Talk to our team",
      profile: "View profile",
      tag: "Finland",
    },
    cta: {
      title: ["Have something", "worth building?"],
      lead: "Tell us what you're working on. We'll help you figure out what comes next.",
      start: "Start a project",
      work: "View our work",
      email: "Email",
      finland: "Finland",
      response: "Response",
      within: "Within 24 hours",
    },
  },
  fi: {
    meta: {
      title: "Digitoimisto Suomessa | Uniix Studio",
      description:
        "Uniix Studio suunnittelee ja toteuttaa verkkosivustoja, digitaalisia tuotteita, brändejä ja kasvua tukevia palveluja kunnianhimoisille yrityksille Suomessa ja kansainvälisesti.",
    },
    lang: { label: "Kieli", en: "English", fi: "Suomi" },
    hero: {
      eyebrow: "Design · Teknologia · Kasvu",
      h1: ["Digitaalisia kokemuksia,", "jotka vievät", "liiketoimintaa eteenpäin."],
      lead: "Uniix yhdistää strategian, designin, teknologian ja digitaalisen kasvun – ja luo verkkosivustoja, tuotteita ja kokemuksia, jotka jäävät mieleen.",
      work: "Katso työmme",
      start: "Aloita projekti",
      hint: "Oikeita projekteja · avaa case napauttamalla",
      tileAlt: "Uniix Studion projekti",
    },
    work: {
      eyebrow: "Työt",
      title: ["Valikoituja", "töitä."],
      lead: "Valikoima digitaalisia kokemuksia, identiteettejä ja tuotteita, joita olemme tehneet kunnianhimoisille yrityksille.",
      details: "Yksityiskohtia töistä",
      all: "Kaikki projektit",
      view: "Katso case",
      stripAria: "Projektien yksityiskohtia",
    },
    services: {
      eyebrow: "Palvelut",
      title: ["Mitä me", "teemme."],
      lead: "Verkkosuunnittelua, kehitystä, tuotteita ja kasvua – yrityksille Helsingissä, muualla Suomessa ja kansainvälisesti.",
      about: "Lue palvelusta",
      related: "Liittyvä työ",
      capsAria: "osaamiset",
    },
    cases: {
      eyebrow: "Asiakascaset",
      title: ["Hyvä design näyttää paremmalta.", "Erinomainen design toimii paremmin."],
      tabsAria: "Asiakascaset",
      steps: ["Haaste", "Ratkaisu", "Tulos"],
      read: "Lue koko case",
    },
    reviews: {
      eyebrow: "Asiakkaiden luottamus",
      title: ["Luotettu kumppani niille,", "joiden kanssa rakennamme."],
      prev: "Edellinen suositus",
      next: "Seuraava suositus",
      engagement: "Toimeksianto",
      project: "Projekti",
      caseStudy: "case",
      railAria: "Suositukset",
      note: "Lainaukset alkuperäiskielellä.",
    },
    capabilities: {
      eyebrow: "Osaaminen",
      title: ["Design kohtaa", "tekniikan."],
      lead: "Suunnittelijat ja kehittäjät samassa tiimissä – se, mikä suunnitellaan, myös rakennetaan. Valitse vaihe nähdäksesi, mitä siihen kuuluu.",
    },
    industries: {
      eyebrow: "Toimialat",
      title: ["Yrityksille, joilla on", "jotain vietävää eteenpäin."],
      lead: "Missä työmme on jo ollut – ja mihin se luontevasti sopii seuraavaksi. ”Liittyvä työ” -merkityt ruudut vievät oikeaan caseen.",
      related: "Liittyvä työ",
      discuss: "Keskustellaan projektistasi",
    },
    process: {
      eyebrow: "Näin työskentelemme",
      title: ["Ideasta", "vaikutukseen."],
      lead: "Viisi selkeää vaihetta, yksi vastuullinen tiimi.",
    },
    about: {
      eyebrow: "Tietoa Uniixista",
      title: ["Tarpeeksi pieni välittämään.", "Tarpeeksi kokenut rakentamaan."],
      lead: "Uniix Studio on monialainen digitaalinen studio, joka työskentelee designin, teknologian ja kasvun parissa. Autamme yrityksiä muuttamaan ideat, vanhentuneet digitaaliset palvelut ja kunnianhimoiset tuotteet moderneiksi digitaalisiksi kokemuksiksi.",
      disciplines: "Osa-alueet",
      disciplinesValue: "Design · Teknologia · Kasvu",
      workingWith: "Asiakkaita",
      workingWithValue: "Sri Lanka · Australia · Iso-Britannia · Suomi",
      more: "Lisää studiosta",
    },
    presence: {
      eyebrow: "Suomi",
      title: ["Nyt myös kunnianhimoisten", "suomalaisyritysten kanssa."],
      lead: "Uniix laajentaa kansainvälistä asiakastyötään Suomeen – yhdistäen vahvan design-, tuote- ja kehitysosaamisen suomalaiseen tekniseen yhteistyöhön.",
      expertiseAria: "Osaamisalueet",
      talk: "Keskustele tiimimme kanssa",
      profile: "Katso profiili",
      tag: "Suomi",
    },
    cta: {
      title: ["Onko sinulla jotain", "rakentamisen arvoista?"],
      lead: "Kerro, mitä olet tekemässä. Autamme sinua selvittämään, mitä seuraavaksi.",
      start: "Aloita projekti",
      work: "Katso työmme",
      email: "Sähköposti",
      finland: "Suomi",
      response: "Vastaus",
      within: "24 tunnin sisällä",
    },
  },
};

export type FinlandUI = (typeof ui)["en"];

// ---------------------------------------------------------------------------
// Finnish versions of the content arrays (same order as lib/finland.ts)
// ---------------------------------------------------------------------------

const fi = {
  services: [
    {
      title: "Verkkosivustojen suunnittelu ja kehitys",
      desc: "Suorituskykyiset verkkosivustot, jotka on suunniteltu käyttäjien, brändin ja liiketoiminnan tavoitteiden ympärille.",
      capabilities: ["UX-strategia", "UI-suunnittelu", "Next.js", "CMS", "Suorituskyky", "Saavutettavuus"],
    },
    {
      title: "UI/UX- ja tuotesuunnittelu",
      desc: "Digitaalisia kokemuksia, käyttöliittymiä ja tuotejärjestelmiä oikeille ihmisille.",
      capabilities: ["Käyttäjätutkimus", "Käyttäjäpolut", "Rautalankamallit", "Prototyypit", "Design-järjestelmät"],
    },
    {
      title: "Brändäys",
      desc: "Visuaaliset identiteetit, jotka luovat tunnistettavuutta ja johdonmukaisuutta kaikissa digitaalisissa kohtaamisissa.",
      capabilities: ["Brändistrategia", "Logojärjestelmät", "Typografia ja värit", "Ohjeistot", "Liike"],
    },
    {
      title: "Digitaaliset tuotteet",
      desc: "Verkkosovelluksia, SaaS-alustoja ja digitaalisia tuotteita ideasta tuotantoon.",
      capabilities: ["Tuotestrategia", "MVP:t", "Verkkosovellukset", "SaaS", "Rajapinnat", "Pilvi"],
    },
    {
      title: "SEO ja digitaalinen kasvu",
      desc: "Hakunäkyvyyttä, sisältöä, konversiota ja jatkuvaa digitaalista kehittämistä.",
      capabilities: ["Tekninen SEO", "Paikallinen SEO", "AEO", "Sisältö", "Konversio", "Analytiikka"],
    },
    {
      title: "Tekoäly ja automaatio",
      desc: "Käytännöllisiä tekoälyratkaisuja, automaatiota ja älykkäitä digitaalisia työnkulkuja.",
      capabilities: ["Työnkulkujen automaatio", "Sisältöputket", "Integraatiot", "Tekoälyominaisuudet"],
    },
  ],
  capabilities: [
    { title: "Design", line: "Ihmisten ymmärtäminen – ja sitten sen muotoilu, mitä he näkevät.", items: ["Strategia", "Käyttäjätutkimus", "UI-suunnittelu", "Design-järjestelmät"] },
    { title: "Kokemus", line: "Nopeat, saavutettavat ja helposti ylläpidettävät käyttöliittymät.", items: ["Frontend", "CMS", "Suorituskyky", "Saavutettavuus"] },
    { title: "Tekniikka", line: "Järjestelmät pinnan alla – rakennettu tuotantoon.", items: ["Backend", "Rajapinnat", "Pilvi", "SaaS"] },
    { title: "Kasvu", line: "Näkyvyys ja älykkyys, jotka kasvavat julkaisun jälkeen.", items: ["SEO", "Analytiikka", "Tekoäly", "Automaatio"] },
  ],
  industries: [
    { name: "Matkailu ja ravintolat", sectors: ["Hotellit", "Ravintolat", "Matkailu", "Matkat"], statement: "Varauspolkuja, jotka tuntuvat yhtä harkituilta kuin itse vierailu.", capability: "Verkkosuunnittelu · Varaus-UX · Paikallinen haku" },
    { name: "Kiinteistöt ja rakentaminen", sectors: ["Kiinteistönvälitys", "Rakentaminen", "Arkkitehtuuri", "Sisustus"], statement: "Portfoliot ja kohdelistaukset, joissa työ myy itse itsensä.", capability: "Kohdealustat · Visuaaliset portfoliot · Liidien keruu" },
    { name: "Terveys ja hyvinvointi", sectors: ["Klinikat", "Laboratoriot", "Hammashoito", "Hyvinvointi"], statement: "Digitaalisia kokemuksia, jotka ansaitsevat luottamuksen ennen ensimmäistä käyntiä.", capability: "Saavutettava UX · Ajanvaraus · Paikallinen SEO" },
    { name: "Asiantuntijapalvelut", sectors: ["Konsultointi", "Rekrytointi", "Talous", "Juridiikka"], statement: "Selkeä asemointi yrityksille, jotka myyvät osaamista.", capability: "Brändin asemointi · Sisältö · CRM-integraatiot" },
    { name: "Teknologia", sectors: ["SaaS", "Ohjelmistot", "Tekoäly", "Alustat"], statement: "Tuotesivustoja ja alustoja, jotka selittävät monimutkaiset asiat yksinkertaisesti.", capability: "Tuotesuunnittelu · SaaS-alustat · Kehitys" },
    { name: "Teollisuus", sectors: ["Teollisuus", "Insinööritoiminta", "B2B", "Energia"], statement: "Teknisestä osaamisesta brändi, jonka ostajat muistavat.", capability: "B2B-sivustot · Brändi-identiteetti · Tuotekatalogit" },
    { name: "Vähittäis- ja verkkokauppa", sectors: ["Verkkokaupat", "D2C-brändit", "Markkinapaikat"], statement: "Kauppoja, joissa on helppo selata – ja vielä helpompi ostaa.", capability: "Verkkokauppa · Tuotesivut · Konversio" },
    { name: "Startupit", sectors: ["Lanseeraus", "MVP", "Uudistus", "Kasvuvaihe"], statement: "Ensimmäisestä identiteetistä markkinavalmiiseen tuotteeseen.", capability: "Brändi-identiteetti · MVP:t · Lanseaussivustot" },
  ],
  process: [
    { title: "Kartoitus", desc: "Ymmärrämme liiketoiminnan, käyttäjät ja mahdollisuuden." },
    { title: "Strategia", desc: "Määrittelemme, mitä rakennetaan ja miksi." },
    { title: "Suunnittelu", desc: "Luomme kokemuksen ja visuaalisen järjestelmän." },
    { title: "Toteutus", desc: "Kehitämme tuotteen tuotantovalmiiksi." },
    { title: "Kasvu", desc: "Parannamme, mittaamme ja kehitämme jatkuvasti." },
  ],
  presence: {
    finland: {
      label: "Suomi",
      items: ["Tekninen yhteistyö", "Asiakasviestintä", "Tapaamiset paikan päällä", "Tuote- ja tekniikkakeskustelut"],
    },
    team: {
      label: "Uniixin kansainvälinen tiimi",
      items: ["Design", "UX/UI", "Kehitys", "Brändäys", "Kasvu", "Tuotetoimitus"],
    },
  },
  stripCaptions: ["Somejärjestelmä", "Juhlapäiväjulkaisu", "Somedesign", "Kampanjajulkaisu", "Palvelusivut", "Kategoriakampanja"],
  studioCaptions: ["Brändi-identiteetti", "Kampanjajärjestelmä", "Kaksikieliset taitot"],
  partner: {
    role: "Tekninen kumppani — Suomi",
    capabilities: ["Ohjelmistokehitys", "Arkkitehtuuri", "Tuotekehitys", "Pilvi", "Rajapinnat", "Tekoäly"],
  },
  founder: {
    role: "Perustaja · Luova johtaja",
    bio: "Vastaa luovasta suunnasta brändi-identiteetin, verkon ja digitaalisen strategian osalta. Työskentelee suoraan jokaisen asiakkaan kanssa aloituksesta julkaisuun.",
  },
};

/**
 * Finnish project facts — translations of the MDX text the page renders.
 * Keep in sync if a case study's MDX changes.
 */
export const fiProjects: Record<
  string,
  { industry: string; services: string; headline: string; problem: string; solution: string; result: string }
> = {
  "rentmycar-lk": {
    industry: "Markkinapaikka · Liikkuminen · Matkailu",
    services: "Brändäys · Verkkokehitys · Graafinen suunnittelu · SEO/GEO/AEO",
    headline: "Sri Lankan ensimmäinen vertaisvuokraukseen keskittyvä ajoneuvojen markkinapaikka – brändätty, rakennettu ja nostettu hakutuloksiin alusta loppuun.",
    problem: "Sri Lankassa ei ollut aitoa ajoneuvojen vertaisvuokrauksen markkinapaikkaa – PickMe hallitsee kyytipalveluja ja ikman on yleinen ilmoitusportaali, eikä kumpikaan omista tätä kapeaa markkinaa.",
    solution: "Rakensimme koko kategorian: ystävällisen ja luottamusta herättävän brändin, 25 piirin ja seitsemän ajoneuvotyypin markkinapaikan, viisiportaisen näkyvyysmallin, singaleesinkielisen somejärjestelmän sekä SEO-, GEO- ja AEO-perustan.",
    result: "Sri Lankan ensimmäinen vertaisvuokraukseen keskittyvä ajoneuvojen markkinapaikka – brändätty, julkaistu ja indeksoitu alusta loppuun.",
  },
  "st-lukes-medilab": {
    industry: "Terveydenhuolto · Diagnostiikka",
    services: "Verkkosuunnittelu · Kehitys · SEO",
    headline: "Diagnostiikkalaboratorion verkkosivusto, joka ansaitsee kliinisen luottamuksen jo ensimmäisellä vierityksellä.",
    problem: "Luotetulla, yli 500 yhteistyölääkäriä palvelevalla Ja-Elan laboratoriolla ei ollut digitaalista etuovea – potilaat ja kumppanit eivät löytäneet palveluja, hintoja tai kotinäytteenoton aluetta verkosta, eikä laboratorio näkynyt paikallisissa hauissa.",
    solution: "Rakensimme sivuston alusta asti uudelleen: rauhallinen, kliinisen tarkka käyttöliittymä, joka nostaa esiin 24 tunnin tulokset, ISO-sertifioinnin ja laitteiston; potilaiden hakutapojen mukaan rakennettu tietoarkkitehtuuri; todellisiin palvelualueisiin perustuva kotinäytteenotto; ja lääketieteellisiin hakuihin viritetty paikallinen SEO.",
    result: "Sivusto, joka muuttaa luottamuksen varauksiksi – laboratorion ensimmäinen orgaaninen näkyvyys Colombon alueen lääketieteellisissä hauissa ja sujuva polku ”tarvitsen testin” -ajatuksesta varattuun aikaan.",
  },
  "ecowave-energy": {
    industry: "Uusiutuva energia · Puhdas teknologia",
    services: "Brändi-identiteetti · Logo · Ohjeisto · Video",
    headline: "Kokonainen visuaalinen identiteetti älykkään energian brändille – aurinkotunnus, turkoosi–aurinkoinen väripaletti, kattava ohjeisto ja mainosvideot.",
    problem: "EcoWave Energyllä oli vahva lupaus – älykästä ja kestävää energiaa, joka antaa kodeille ja yrityksille selkeämmän kuvan, paremman tehokkuuden ja täyden hallinnan kulutukseensa – mutta ei visuaalista identiteettiä kantamaan sitä.",
    solution: "Rakensimme identiteetin sen ytimestä käsin – oivallus, tehokkuus ja kestävyys.",
    result: "EcoWave Energy lanseerattiin yhtenäisellä visuaalisella identiteetillä – omaleimainen tunnus, dokumentoitu järjestelmä, jota kumppanit voivat soveltaa oikein, ja liikkuva sisältö valmiina maksettuun someen ja tuotesivulle.",
  },
  "sierra-energy-solutions": {
    industry: "Uusiutuva energia · Aurinkoenergia",
    services: "Somedesign · Graafinen suunnittelu",
    headline: "Vuoden verran juhlapäiviin sidottuja somejulkaisuja, jotka antoivat Sri Lankan aurinkoenergiabrändille johdonmukaisen ja tunnistettavan äänen.",
    problem: "Sierra Energy Solutionsilla oli vahva tuotetarina – aurinko- ja uusiutuvaa energiaa Sri Lankaan – mutta epäjohdonmukainen läsnäolo somessa.",
    solution: "Rakensimme juhlapäiviin perustuvan somedesign-järjestelmän: kiinteä brändikehys (logo, sini-vihreä paletti, sierraenergy.lk-alapalkki) jokaisen hetken rohkean, teemaan sidotun kuvituksen ympärillä.",
    result: "Yhtenäinen sarja julkaisuvalmiita somesisältöjä, jotka tunnistaa yhdeksi brändiksi yhdellä silmäyksellä.",
  },
};

/** Finnish labels for the project `stats` recorded in MDX. */
export const fiStatLabels: Record<string, string> = {
  "Districts in IA": "Piiriä tietoarkkitehtuurissa",
  "Cities mapped": "Kaupunkia kartoitettu",
  "Vehicle categories": "Ajoneuvokategoriaa",
  "Listing tiers": "Ilmoitustasoa",
  "Report turnaround": "Tulosten valmistuminen",
  "Partner doctors": "Yhteistyölääkäriä",
  "Collection centres": "Näytteenottopistettä",
  "Average rating": "Keskiarvosana",
};

// ---------------------------------------------------------------------------
// Assemble localized content for a language
// ---------------------------------------------------------------------------

export function getFinlandContent(lang: FiLang) {
  const isFi = lang === "fi";
  const pick = <T, U>(base: T[], tr: U[]) => base.map((b, i) => (isFi ? { ...b, ...tr[i] } : b));

  return {
    lang,
    t: ui[lang],
    services: pick(finlandServices, fi.services),
    capabilities: pick(finlandCapabilities, fi.capabilities),
    industries: pick(finlandIndustries, fi.industries),
    process: pick(finlandProcess, fi.process),
    presence: isFi
      ? {
          finland: { ...finlandPresence.finland, ...fi.presence.finland },
          team: { ...finlandPresence.team, ...fi.presence.team },
        }
      : finlandPresence,
    strip: finlandWorkLayout.strip.map((s, i) => (isFi ? { ...s, caption: fi.stripCaptions[i] } : s)),
    studioFrames: finlandStudioFrames.map((s, i) => (isFi ? { ...s, caption: fi.studioCaptions[i] } : s)),
    partner: isFi ? { ...finlandPartner, ...fi.partner } : finlandPartner,
    founder: isFi ? { ...finlandFounder, ...fi.founder } : finlandFounder,
  };
}

export type FinlandContent = ReturnType<typeof getFinlandContent>;
