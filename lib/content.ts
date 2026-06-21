/* =============================================================================
   ALPENHOF · ZENTRALE INHALTS-DATEI
   -----------------------------------------------------------------------------
   Hier liegen ALLE Texte, Bildpfade, Zimmerdaten und Section-Inhalte.
   Du kannst hier alles bearbeiten, ohne die Komponenten anzufassen.

   👉 BILDER ERSETZEN:  Lege deine echten Bilder in /public/images/ ab und
      überschreibe einfach die Dateinamen unten (oder ersetze die Dateien
      direkt unter gleichem Namen).
   👉 TEXTE ERSETZEN:   Passe die Strings unten an.
   ============================================================================= */

/* ---------------------------------------------------------------------------
   SITE / META
   --------------------------------------------------------------------------- */
export const site = {
  name: "Alpenhof",
  tagline: "Bergrefugium & Spa",
  // Für SEO / Open Graph
  title: "Alpenhof – Bergrefugium & Spa in den Alpen",
  description:
    "Ein Rückzugsort zwischen Gipfeln und Stille. Suiten mit Panoramablick, ein preisgekröntes Spa und alpine Kulinarik – der Alpenhof verbindet Naturkraft mit zeitloser Eleganz.",
  url: "https://alpenhof.de",
  phone: "+49 8000 000 000",
  email: "willkommen@alpenhof.de",
  address: {
    street: "Bergstraße 1",
    zip: "00000",
    city: "Alpendorf",
    country: "Deutschland",
  },
};

/* ---------------------------------------------------------------------------
   NAVIGATION
   --------------------------------------------------------------------------- */
export const navLinks: { label: string; href: string }[] = [
  { label: "Refugium", href: "#about" },
  { label: "Zimmer & Suiten", href: "#rooms" },
  { label: "Spa", href: "#wellness" },
  { label: "Kulinarik", href: "#restaurant" },
  { label: "Erlebnis", href: "#experience" },
  { label: "Galerie", href: "#gallery" },
];

/* ---------------------------------------------------------------------------
   HERO
   👉 BILD ERSETZEN: /public/generated/hero/hero-sunrise.jpg  (idealerweise 2400×1600+,
      hochkant-tauglich, dunkle, ruhige Bergstimmung)
   --------------------------------------------------------------------------- */
export const hero = {
  eyebrow: "1.860 m · Alpine Stille",
  // Die Headline wird Wort für Wort animiert.
  headlineLines: ["Wo die Berge", "den Atem", "verlangsamen."],
  subline:
    "Ein Refugium zwischen Gipfeln und Wolken. Eingebettet in unberührte Natur – gemacht für Menschen, die wieder durchatmen wollen.",
  image: "/images/berechtegaden-königssee.jpg",
  // Optional: lege /public/videos/hero.mp4 ab und trage den Pfad hier ein,
  // dann wird statt des Bildes ein Video-Hintergrund genutzt.
  video: "" as string,
  primaryCta: { label: "Aufenthalt anfragen", href: "#booking" },
  secondaryCta: { label: "Das Haus entdecken", href: "#about" },
  stats: [
    { value: "48", label: "Suiten & Zimmer" },
    { value: "2.400", label: "m² Spa-Welt" },
    { value: "1", label: "Michelin-Stern" },
  ],
};

/* ---------------------------------------------------------------------------
   ÜBER ALPENHOF
   👉 BILDER ERSETZEN: about-1.jpg (Architektur/Haus), about-2.jpg (Detail/Holz)
   --------------------------------------------------------------------------- */
export const about = {
  eyebrow: "Das Refugium",
  heading: "Ein Haus, das der Landschaft zuhört.",
  paragraphs: [
    "Seit vier Generationen führen wir den Alpenhof als Ort der Entschleunigung. Wo früher ein Berggasthof stand, ist heute ein Refugium gewachsen, das Tradition und klare, zeitgenössische Architektur miteinander verwebt.",
    "Massives Altholz, kühler Naturstein und große Glasflächen rahmen die Aussicht wie ein Gemälde. Nichts drängt sich auf – alles dient dem einen Gefühl: angekommen zu sein.",
  ],
  signature: "Familie Berger · Gastgeber",
  images: {
    primary: "/images/about-1.jpg",
    secondary: "/images/about-2.jpg",
  },
  pillars: [
    { title: "Naturverbunden", text: "Regionale Materialien, kurze Wege, echte Berghandwerkskunst." },
    { title: "Inhabergeführt", text: "Persönliche Gastlichkeit seit 1924 – ohne Kette, ohne Schnörkel." },
    { title: "Zeitlos", text: "Design, das nicht laut ist, sondern bleibt." },
  ],
};

/* ---------------------------------------------------------------------------
   ZIMMER & SUITEN
   👉 BILDER ERSETZEN: room-suite.jpg, room-panorama.jpg, room-chalet.jpg,
      room-tower.jpg  (je ~1600×2000, Hochformat wirkt hier am besten)
   --------------------------------------------------------------------------- */
export type Room = {
  id: string;
  name: string;
  category: string;
  size: string;
  guests: string;
  priceFrom: string;
  description: string;
  features: string[];
  image: string;
};

export const rooms = {
  eyebrow: "Zimmer & Suiten",
  heading: "Räume, die den Horizont hereinholen.",
  intro:
    "Jede unserer Suiten ist nach Süden ausgerichtet – mit bodentiefen Fenstern, eigenem Kamin und einem Balkon, der direkt in die Berge zu schweben scheint.",
  items: [
    {
      id: "panorama-suite",
      name: "Panorama-Suite",
      category: "Suite · 2 Personen",
      size: "62 m²",
      guests: "2 Gäste",
      priceFrom: "ab 480 €",
      description:
        "Eckzimmer mit zwei Fensterfronten, freistehender Badewanne vor der Bergkulisse und privater Sonnenterrasse.",
      features: ["Bergblick 180°", "Freistehende Wanne", "Kamin", "Private Terrasse"],
      image: "/images/room-suite.jpg",
    },
    {
      id: "panorama-loft",
      name: "Gipfel-Loft",
      category: "Loft · 2–3 Personen",
      size: "78 m²",
      guests: "3 Gäste",
      priceFrom: "ab 620 €",
      description:
        "Zweigeschossiges Loft unter dem Dach mit Galerie, Sternenfenster über dem Bett und eigener Sauna.",
      features: ["Galerie-Ebene", "Private Sauna", "Sternenfenster", "Nespresso-Bar"],
      image: "/images/room-panorama.jpg",
    },
    {
      id: "chalet",
      name: "Wald-Chalet",
      category: "Chalet · 2–4 Personen",
      size: "110 m²",
      guests: "4 Gäste",
      priceFrom: "ab 890 €",
      description:
        "Freistehendes Chalet am Waldrand mit eigenem Outdoor-Hotpot, Wohnzimmer mit Schwedenofen und maximaler Privatsphäre.",
      features: ["Outdoor-Hotpot", "Eigener Eingang", "Wohnküche", "2 Schlafräume"],
      image: "/images/room-chalet.jpg",
    },
    {
      id: "turm-zimmer",
      name: "Turmzimmer",
      category: "Doppelzimmer · 2 Personen",
      size: "38 m²",
      guests: "2 Gäste",
      priceFrom: "ab 320 €",
      description:
        "Rundes Zimmer im historischen Turm mit 270°-Blick und gemütlicher Leseecke in der Fensternische.",
      features: ["Rundum-Blick", "Leseecke", "Altholz-Interieur", "Regendusche"],
      image: "/images/zimmer_beispiel.jpg",
    },
  ] satisfies Room[],
};

/* ---------------------------------------------------------------------------
   WELLNESS & SPA  (mit 3D-Wellness-Sphäre)
   👉 BILDER ERSETZEN: wellness.jpg (Pool/Sauna), wellness-detail.jpg
   --------------------------------------------------------------------------- */
export const wellness = {
  eyebrow: "Spa & Wellness",
  heading: "Wasser, Wärme, Weite.",
  intro:
    "2.400 m² Ruhe: ein beheizter Infinity-Pool, der scheinbar ins Tal kippt, sieben Saunen, Eisbrunnen und Behandlungsräume, in denen die Zeit stillsteht.",
  image: "/images/Spa_bereich.jpg",
  experiences: [
    {
      title: "Infinity Sky-Pool",
      text: "32 °C warm, ganzjährig beheizt, mit Blick bis zum Horizont.",
    },
    {
      title: "Alpine Sauna-Welt",
      text: "Sieben Saunen von der Heustadl-Sauna bis zum Kräuter-Dampfbad.",
    },
    {
      title: "Bergquell-Anwendungen",
      text: "Massagen & Rituale mit Latschenkiefer, Bergheu und Arnika.",
    },
    {
      title: "Private Spa-Suite",
      text: "Exklusiv buchbar – Sauna, Wanne und Ruhebett nur für euch.",
    },
  ],
};

/* ---------------------------------------------------------------------------
   RESTAURANT / KULINARIK
   👉 BILDER ERSETZEN: restaurant.jpg, restaurant-dish.jpg
   --------------------------------------------------------------------------- */
export const restaurant = {
  eyebrow: "Kulinarik",
  heading: "Die Berge auf dem Teller.",
  intro:
    "Unser Küchenchef kocht, was die Region hergibt – veredelt mit Präzision und Respekt vor dem Produkt. Ein Michelin-Stern, null Effekthascherei.",
  image: "/images/restaurant.jpg",
  detailImage: "/images/restaurant-dish.jpg",
  highlights: [
    { kicker: "Abends", title: "Gipfel-Menü", text: "5 bis 8 Gänge, regional & saisonal, optional mit Weinbegleitung." },
    { kicker: "Tagsüber", title: "Almhütte", text: "Bodenständige Klassiker auf 1.860 m – mit Aussicht inklusive." },
    { kicker: "Bar", title: "Kaminbar 1924", text: "Signature-Drinks, Bergkräuter-Aufgüsse und alte Brände." },
  ],
  quote:
    "Wir erfinden die Küche nicht neu – wir hören dem Tal zu und übersetzen es auf den Teller.",
  quoteAuthor: "Jonas Berger · Küchenchef",
};

/* ---------------------------------------------------------------------------
   ERLEBNIS / NATUR / UMGEBUNG
   → Higgsfield-artige Scroll-Bildsequenz
   👉 BILDER ERSETZEN: /public/generated/sequence/frame-01.jpg … frame-16.jpg
      (alle gleiches Seitenverhältnis, gleicher Bildausschnitt = bester Effekt)
   --------------------------------------------------------------------------- */
export const experience = {
  eyebrow: "Erlebnis & Natur",
  heading: "Eine Landschaft, die jeden Tag eine andere ist.",
  intro:
    "Vom ersten Licht über den Gipfeln bis zum Sternenhimmel über dem Tal – scrolle durch einen Tag am Berg.",
  // Diese Bilder werden beim Scrollen nacheinander eingeblendet (Higgsfield-Story, 16 Frames).
  // 👉 BILDER ERSETZEN: /public/generated/sequence/frame-01.jpg … frame-16.jpg
  //    (alle gleiches Seitenverhältnis 5:3 = bester Überblend-Effekt)
  sequence: [
    { image: "/generated/sequence/frame-01.jpg", caption: "06:12 — Erstes Licht", title: "Alpenpanorama" },
    { image: "/generated/sequence/frame-02.jpg", caption: "07:30 — Ankunft", title: "Hotel-Außenansicht" },
    { image: "/generated/sequence/frame-03.jpg", caption: "07:45 — Einfahrt", title: "Anreise" },
    { image: "/generated/sequence/frame-04.jpg", caption: "08:10 — Entrée", title: "Lobby" },
    { image: "/generated/sequence/frame-05.jpg", caption: "10:00 — Ruhe", title: "Wellness" },
    { image: "/generated/sequence/frame-06.jpg", caption: "11:00 — Wärme", title: "Sauna" },
    { image: "/generated/sequence/frame-07.jpg", caption: "12:30 — Schwerelos", title: "Infinity-Pool" },
    { image: "/generated/sequence/frame-08.jpg", caption: "13:30 — Genuss", title: "Restaurant" },
    { image: "/generated/sequence/frame-09.jpg", caption: "15:00 — Rückzug", title: "Suite mit Bergblick" },
    { image: "/generated/sequence/frame-10.jpg", caption: "16:00 — Aufbruch", title: "Bergwanderung" },
    { image: "/generated/sequence/frame-11.jpg", caption: "17:00 — Natur", title: "Wald & Stille" },
    { image: "/generated/sequence/frame-12.jpg", caption: "18:45 — Gold", title: "Alpenglühen am Grat" },
    { image: "/generated/sequence/frame-13.jpg", caption: "20:00 — Abend", title: "Terrasse im Blue Hour" },
    { image: "/generated/sequence/frame-14.jpg", caption: "21:00 — Feuer", title: "Kaminbar" },
    { image: "/generated/sequence/frame-15.jpg", caption: "22:30 — Stille", title: "Sternenhimmel über dem Tal" },
    { image: "/generated/sequence/frame-16.jpg", caption: "06:00 — Neuer Morgen", title: "Ein neuer Tag am Berg" },
  ],
  activities: [
    { season: "Sommer", items: ["Geführte Gipfeltouren", "E-Bike & Mountainbike", "Bergsee-Schwimmen", "Kräuterwanderungen"] },
    { season: "Winter", items: ["Skitouren & Tiefschnee", "Schneeschuh-Wandern", "Rodeln bei Fackelschein", "Eisbaden"] },
  ],
  panoramaImage: "/images/mountains.jpg",
};

/* ---------------------------------------------------------------------------
   GALERIE  (dynamisches Masonry-Grid)
   👉 BILDER ERSETZEN: gallery-1.jpg ... gallery-8.jpg
   --------------------------------------------------------------------------- */
export type GalleryItem = { image: string; alt: string; span: "tall" | "wide" | "normal" };

export const gallery = {
  eyebrow: "Galerie",
  heading: "Momente am Alpenhof.",
  intro: "Ein Vorgeschmack auf das, was euch erwartet.",
  items: [
    { image: "/images/zimmer_beispiel.jpg", alt: "Suite mit Bergblick", span: "tall" },
    { image: "/images/gallery-2.jpg", alt: "Infinity-Pool über dem Tal", span: "wide" },
    { image: "/images/gallery-3.jpg", alt: "Detail Altholz & Stein", span: "normal" },
    { image: "/images/gallery-4.jpg", alt: "Gedeckter Tisch am Abend", span: "normal" },
    { image: "/images/wellness_hotel.jpg", alt: "Rustikale Holzsauna", span: "tall" },
    { image: "/images/gallery-6.jpg", alt: "Bergpanorama im Morgenlicht", span: "wide" },
    { image: "/images/gallery-7.jpg", alt: "Kaminbar bei Nacht", span: "normal" },
    { image: "/images/gallery-8.jpg", alt: "Terrasse mit Aussicht", span: "normal" },
  ] satisfies GalleryItem[],
};

/* ---------------------------------------------------------------------------
   BUCHUNGS-CTA
   👉 BILD ERSETZEN: cta-bg.jpg (weite, ruhige Bergstimmung, Dämmerung)
   --------------------------------------------------------------------------- */
export const booking = {
  eyebrow: "Aufenthalt sichern",
  heading: "Reserviert euch ein Stück Stille.",
  intro:
    "Verfügbarkeiten, Arrangements und persönliche Beratung – wir melden uns innerhalb von 24 Stunden bei euch.",
  image: "/images/cta-bg.jpg",
  primaryCta: { label: "Jetzt anfragen", href: "mailto:willkommen@alpenhof.de" },
  phoneCta: { label: "+49 8000 000 000", href: "tel:+498000000000" },
  perks: [
    "Bestpreis-Garantie",
    "Persönliche Anfrage & Beratung",
    "Antwort innerhalb von 24 Stunden",
    "Kostenfreie Stornierung möglich",
  ],
};

/* ---------------------------------------------------------------------------
   FOOTER
   --------------------------------------------------------------------------- */
export const footer = {
  claim: "Wo die Berge den Atem verlangsamen.",
  columns: [
    {
      title: "Entdecken",
      links: [
        { label: "Refugium", href: "#about" },
        { label: "Zimmer & Suiten", href: "#rooms" },
        { label: "Spa & Wellness", href: "#wellness" },
        { label: "Kulinarik", href: "#restaurant" },
      ],
    },
    {
      title: "Service",
      links: [
        { label: "Anfrage & Buchung", href: "#booking" },
        { label: "Arrangements", href: "#" },
        { label: "Gutscheine", href: "#" },
        { label: "Anreise", href: "#" },
      ],
    },
    {
      title: "Rechtliches",
      links: [
        { label: "Impressum", href: "#" },
        { label: "Datenschutz", href: "#" },
        { label: "AGB", href: "#" },
      ],
    },
  ],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Journal", href: "#" },
  ],
};

/* ---------------------------------------------------------------------------
   SCROLL STORY  (nach dem Hero – 4 emotionale Hotel-Beats)
   --------------------------------------------------------------------------- */
export const scrollStory = {
  eyebrow: "Die Alpenhof-Erfahrung",
  heading: "Jeder Aufenthalt erzählt eine Geschichte.",
  beats: [
    {
      num: "01",
      title: "Ankommen",
      text: "Frische Bergluft, der erste Panoramablick. Ein Empfang, der euch sofort entschleunigt – noch bevor ihr die Schwelle überschreitet.",
    },
    {
      num: "02",
      title: "Entspannen",
      text: "2.400 m² Stille. Sieben Saunen, Eisbrunnen und ein beheizter Infinity-Pool, der scheinbar ins Tal kippt.",
    },
    {
      num: "03",
      title: "Genießen",
      text: "Alpine Küche auf Michelin-Niveau. Kaminbar. Das goldene Alpenglühen beim Abendessen auf der Terrasse.",
    },
    {
      num: "04",
      title: "Buchen",
      text: "Euer Refugium wartet. Persönliche Anfrage, Bestpreis-Garantie, Antwort in 24 Stunden.",
      cta: { label: "Jetzt anfragen", href: "#booking" },
    },
  ] as Array<{
    num: string;
    title: string;
    text: string;
    cta?: { label: string; href: string };
  }>,
};

/* ---------------------------------------------------------------------------
   HOTEL JOURNEY  (Bildsequenz-Walkthrough: Außen → Lobby → Wellness → Zimmer)
   👉 BILDER ERSETZEN: Tausche die image-Pfade gegen deine echten Fotos aus,
      sobald du sie hast. Dateinamen in /public/images/ ablegen.
   --------------------------------------------------------------------------- */
export const hotelJourney = {
  scenes: [
    {
      label: "Ankommen",
      title: "Hotel Alpenhof",
      caption: "Berchtesgadener Land · Eingebettet in die Natur",
      image: "/images/berechtegaden-königssee.jpg",
    },
    {
      label: "Lobby",
      title: "Herzlich Willkommen",
      caption: "Altholz, Naturstein und Wärme – ab dem ersten Schritt",
      image: "/images/about-1.jpg",
    },
    {
      label: "Wellness",
      title: "Wasser, Wärme, Weite.",
      caption: "2.400 m² Spa-Welt für Körper und Geist",
      image: "/images/Spa_bereich.jpg",
    },
    {
      label: "Zimmer & Suiten",
      title: "Euer Refugium.",
      caption: "48 Suiten & Zimmer — jedes mit Bergblick",
      image: "/images/zimmer_beispiel.jpg",
    },
  ],
};
