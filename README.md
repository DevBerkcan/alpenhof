# Alpenhof — Premium Relaunch

Ein cinematic Website-Relaunch für den **Alpenhof** auf Awwwards-Niveau.
„Apple trifft Aman Resort trifft Higgsfield" — dunkel, editorial, emotional.

**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion ·
Lenis Smooth Scroll · GSAP ScrollTrigger · React Three Fiber + Drei (Three.js).
Visuelle Assets werden über den **Higgsfield-Connector** generiert.

---

## 1 · Schnellstart

```bash
npm install        # Abhängigkeiten installieren
npm run dev        # Dev-Server → http://localhost:3000
```

Für Production:

```bash
npm run build      # optimierten Build erzeugen
npm run start      # Production-Server starten
```

> Die Seite läuft **sofort** — alle Bilder liegen bereits als klar markierte
> Platzhalter in `/public/generated`. Du kannst sie jederzeit durch echte
> Higgsfield-Renders ersetzen (siehe unten), ohne Code anzufassen.

---

## 2 · Higgsfield-Workflow

Die gesamte Bildsprache läuft über eine deklarative Integrationsschicht.
Du musst nie Pfade im Code suchen — alles hängt an einem Manifest.

```
lib/higgsfield.ts                  ← Single Source of Truth
   ├─ ASSET_MANIFEST               jedes Asset: Key, Zielpfad, Fallback, PROMPT, Aspect
   ├─ resolveAsset(key)            liefert Pfad (mit automatischem Fallback)
   └─ HIGGSFIELD_STYLE / _NEGATIVE gemeinsamer Stil-Anker

scripts/higgsfield-generate.mjs    ← Runner: Manifest → Higgsfield → /public/generated
```

### 2.1 · Assets generieren

```bash
# 1) Erst die Prompts ansehen (ohne zu generieren):
npm run generate:assets:dry

# 2) Mit aktivem Connector alles generieren:
HIGGSFIELD_API_KEY=dein_key npm run generate:assets

# 3) Nur ein bestimmtes Asset neu rendern:
HIGGSFIELD_API_KEY=dein_key node scripts/higgsfield-generate.mjs --only hero
HIGGSFIELD_API_KEY=dein_key node scripts/higgsfield-generate.mjs --only sequence
```

Der Runner schreibt die fertigen Dateien **direkt** nach `/public/generated`
und überschreibt die Platzhalter. Die Website nutzt sie automatisch.

### 2.2 · Connector anbinden

Der **einzige** anzupassende Punkt ist die Funktion `callHiggsfield()` in
`scripts/higgsfield-generate.mjs`. Sie bekommt `{ prompt, aspect }` und muss
Bild-Bytes (Buffer) zurückgeben. Vorbereitet sind:

- **REST:** `HIGGSFIELD_API_KEY` + optional `HIGGSFIELD_ENDPOINT` setzen.
- **MCP:** dein MCP-Tool aufrufen und die zurückgelieferten Bytes als Buffer
  zurückgeben — der Rest (Manifest, Speichern, Fallback) bleibt unverändert.

### 2.3 · Neue Sequenz-Frames erstellen

Die Higgsfield-Scroll-Story liegt in `lib/content.ts → experience.sequence`.

1. Frame in `experience.sequence` ergänzen (Pfad `/generated/sequence/frame-NN.jpg`,
   `caption`, `title`).
2. Passenden Prompt im `ASSET_MANIFEST` (`lib/higgsfield.ts`, Block `SEQUENCE_STORY`)
   und im Runner-Manifest ergänzen.
3. `npm run generate:assets` — fertig. Die Sektion (`components/sections/Experience.tsx`)
   blendet die Frames per GSAP ScrollTrigger automatisch durch.

> Tipp: gleiches Seitenverhältnis (5:3) und gleicher Bildausschnitt für ALLE
> Frames = sauberster Higgsfield-Überblendeffekt.

### 2.4 · Hintergrund-Videos einbinden

Für die Loops (`/public/generated/videos`) liegen aktuell **Poster-Bilder**.
So machst du daraus echte Loops:

1. `.mp4` mit gleichem Namen ablegen, z. B. `/public/generated/videos/loop-mist.mp4`.
2. In der jeweiligen Section/Komponente das `<video>` mit `poster={…jpg}` und
   `<source src=".../loop-mist.mp4">` versehen (Muster: siehe `Hero.tsx`,
   das bereits Video-Fallback auf Bild unterstützt via `hero.video`).
3. Ohne `.mp4` bleibt automatisch das Poster-Bild stehen (Fallback).

---

## 3 · Inhalte & Bilder austauschen

**Alle Texte und Bildpfade** liegen zentral in **`lib/content.ts`**.
Du brauchst keine Komponente anzufassen.

| Bereich            | Bild-Datei(en)                                  | Text in `lib/content.ts` |
|--------------------|-------------------------------------------------|--------------------------|
| Hero               | `/public/generated/hero/hero-sunrise.jpg`       | `hero`                   |
| Scroll-Story (16×) | `/public/generated/sequence/frame-01…16.jpg`    | `experience.sequence`    |
| 3D-Fallbacks       | `/public/generated/3d/*.jpg`                    | `lib/higgsfield.ts`      |
| Video-Loops        | `/public/generated/videos/loop-*.jpg` (+ .mp4)  | jeweilige Section        |
| Über Alpenhof      | `/public/images/about-1.jpg`, `about-2.jpg`     | `about`                  |
| Zimmer & Suiten    | `/public/images/room-*.jpg`                     | `rooms`                  |
| Wellness & Spa     | `/public/images/wellness.jpg`, `wellness-detail.jpg` | `wellness`          |
| Kulinarik          | `/public/images/restaurant.jpg`, `restaurant-dish.jpg` | `restaurant`       |
| Panorama / Natur   | `/public/images/mountains.jpg`                  | `experience.panoramaImage` |
| Galerie (8×)       | `/public/images/gallery-1…8.jpg`                | `gallery.items`          |
| Buchungs-CTA       | `/public/images/cta-bg.jpg`                     | `booking`                |
| Kontakt / Footer   | —                                               | `site`, `footer`         |

> **Bildformate:** Hero 21:9 (≥ 2560×1440), Sequenz 5:3 (2000×1200),
> Galerie/Zimmer Hochformat/Querformat gemischt. Immer als optimiertes JPG/WebP.

---

## 4 · Projektstruktur

```
app/                     App Router (layout, page, globals, sitemap, robots)
components/
  sections/              Hero, About, Rooms, Wellness, Restaurant,
                         Experience (GSAP-Scroll-Story), Gallery, BookingCTA, Footer
  layout/                Navbar (Glassmorphism + Mobile-Overlay)
  ui/                    Reveal, MagneticButton, ScrollProgress, SectionHeading, MediaImage
  3d/                    HeroCrystal, WellnessSphere, MountainScene (React Three Fiber)
  providers/             LenisProvider (Lenis ↔ GSAP ScrollTrigger)
  FloatingGuide.tsx      globales scroll-getriebenes 3D-Leitobjekt
  FloatingGuideMount.tsx Client-Wrapper (lädt FloatingGuide ohne SSR)
hooks/                   useReducedMotion
lib/
  content.ts             ★ ALLE Texte & Bildpfade (hier editieren)
  higgsfield.ts          ★ Asset-Manifest, Prompts, resolveAsset, Fallback
  fonts.ts               lokale Variable-Fonts (Fraunces + Outfit, DSGVO-freundlich)
  utils.ts               cn()-Helper
scripts/
  higgsfield-generate.mjs Asset-Runner (Higgsfield → /public/generated)
types/                   gemeinsame TS-Typen
public/
  generated/             Higgsfield-Assets (hero, sequence, 3d, videos)
  fallback/              garantierte Fallbacks
  images/                redaktionelle Fotos (Zimmer, Galerie, …)
  fonts/                 Fraunces.ttf, Fraunces-Italic.ttf, Outfit.ttf
```

---

## 5 · Design & Technik

- **Cinematic Alpine Luxury:** warmes Anthrazit + Champagner-Gold + Gletscher-Türkis.
  Farben & Tokens in `app/globals.css` (CSS-Variablen) + `tailwind.config.ts`.
- **Scroll:** Lenis Smooth Scroll, sauber an **GSAP ScrollTrigger** gekoppelt
  (ein rAF-Loop für alles).
- **3D:** React Three Fiber + Drei. Alle Canvas via `dynamic(..., { ssr: false })`,
  ohne Runtime-CDN (kein `<Environment>`-Request → schneller & offline-fest).
- **Motion:** Framer Motion für Reveals/Parallax, GSAP für die gepinnte Story.
- **Accessibility:** respektiert `prefers-reduced-motion` durchgängig
  (Lenis, FloatingGuide, Reveals).
- **Performance:** Next/Image, Code-Splitting der 3D-Bundles, lokale Fonts,
  schlanke Geometrien. Ziel Lighthouse 90+.

---

## 6 · Hinweis zu den Platzhaltern

Alle Bilder in `/public/generated` und `/public/images` sind **generierte
Platzhalter**, klar mit „PLATZHALTER · via Higgsfield ersetzen" beschriftet.
Sie zeigen die finale Komposition/Stimmung — ersetze sie durch echte
Higgsfield-Renders (Abschnitt 2) oder echte Fotografie (Abschnitt 3).
# alpenhof
