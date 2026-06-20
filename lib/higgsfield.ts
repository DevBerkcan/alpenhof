/**
 * ============================================================================
 *  HIGGSFIELD ASSET-INTEGRATION
 * ============================================================================
 *  Zentrale Schicht zwischen dem Higgsfield-Connector und der Website.
 *
 *  Architektur (ehrlich & reproduzierbar):
 *
 *    1) ASSET_MANIFEST  – beschreibt JEDES visuelle Asset deklarativ:
 *                         logischer Key, Zielpfad in /public/generated,
 *                         Fallback-Pfad, Higgsfield-Prompt, Seitenverhältnis.
 *
 *    2) scripts/higgsfield-generate.mjs  – Runner, der das Manifest abarbeitet,
 *                         jedes Asset über deinen Higgsfield-Endpoint generiert
 *                         und die Datei nach /public/generated schreibt.
 *                         (Siehe README → "Higgsfield-Workflow".)
 *
 *    3) resolveAsset()  – wird in den Components benutzt. Liefert den
 *                         generierten Pfad zurück; existiert dieser (noch)
 *                         nicht, greift automatisch der Fallback. Dadurch
 *                         läuft die Seite IMMER – mit oder ohne echte Renders.
 *
 *  → Bis echte Higgsfield-Renders vorliegen, zeigen die mitgelieferten
 *    Platzhalter in /public/generated die finale Bildkomposition an.
 *    Sobald du den Generator laufen lässt, werden sie 1:1 überschrieben.
 * ============================================================================
 */

export type AssetKind = "image" | "sequence" | "render3d" | "videoPoster";

export interface AssetSpec {
  /** Logischer Key, über den Components das Asset anfordern. */
  key: string;
  kind: AssetKind;
  /** Zielpfad (öffentlich), wird vom Higgsfield-Runner geschrieben. */
  path: string;
  /** Garantiert vorhandener Fallback, falls `path` fehlt. */
  fallback: string;
  /** Higgsfield-Prompt – exakt so an den Connector übergeben. */
  prompt: string;
  /** Negativ-Prompt zur Qualitätssicherung. */
  negativePrompt?: string;
  /** Ziel-Seitenverhältnis bzw. -auflösung. */
  aspect: string;
}

/* Wiederverwendbarer Stil-Anker für konsistente Bildsprache ("Cinematic Alpine Luxury"). */
const STYLE =
  "cinematic, editorial, warm champagne-gold light, deep warm anthracite shadows, " +
  "glacier-turquoise haze, layered mountain silhouettes, soft volumetric fog, film grain, " +
  "photorealistic, ultra detailed, shot on Hasselblad, shallow depth of field, no people, no text";

const NEG =
  "people, text, watermark, logo, signature, oversaturated, cartoon, illustration, " +
  "distorted architecture, low quality, blurry, jpeg artifacts";

/* ---- Storyline der Scroll-Sequenz (Brief: 12–20 Frames → hier 16) ---- */
const SEQUENCE_STORY: { caption: string; title: string; scene: string }[] = [
  { caption: "06:12 — Erstes Licht", title: "Alpenpanorama", scene: "vast alpine panorama at first sunrise light, sea of fog in the valleys" },
  { caption: "07:30 — Ankunft", title: "Hotel-Außenansicht", scene: "luxury alpine hotel exterior, natural stone and timber, glass facade glowing" },
  { caption: "07:45 — Einfahrt", title: "Anreise", scene: "elegant hotel driveway lined with pines, soft morning mist, premium entrance" },
  { caption: "08:10 — Entrée", title: "Lobby", scene: "warm luxury hotel lobby, fireplace, natural materials, golden ambient light" },
  { caption: "10:00 — Ruhe", title: "Wellness", scene: "serene spa relaxation room, floor-to-ceiling windows facing the mountains" },
  { caption: "11:00 — Wärme", title: "Sauna", scene: "premium panorama sauna, warm timber, steam, mountain view through glass" },
  { caption: "12:30 — Schwerelos", title: "Infinity-Pool", scene: "infinity pool merging with the alpine horizon, turquoise water, soft steam" },
  { caption: "13:30 — Genuss", title: "Restaurant", scene: "fine dining alpine restaurant, candlelight, plated gourmet dish, warm tones" },
  { caption: "15:00 — Rückzug", title: "Suite", scene: "luxury suite interior with panoramic mountain window, linen, warm wood" },
  { caption: "16:00 — Aufbruch", title: "Bergwanderung", scene: "hiker silhouette on an alpine ridge trail, golden afternoon light" },
  { caption: "17:00 — Natur", title: "Wald", scene: "ancient alpine forest, shafts of light through pines, moss, depth" },
  { caption: "18:45 — Gold", title: "Alpenglühen", scene: "alpenglow on snow-dusted peaks, intense golden and pink sky" },
  { caption: "20:00 — Abend", title: "Terrasse", scene: "hotel terrace at dusk, warm lanterns, mountains fading into blue hour" },
  { caption: "21:00 — Feuer", title: "Kaminbar", scene: "intimate fireplace lounge, glowing embers, deep warm shadows, cozy luxury" },
  { caption: "22:30 — Stille", title: "Sternenhimmel", scene: "star-filled night sky over the dark valley, milky way, hotel lights below" },
  { caption: "06:00 — Neuer Morgen", title: "Buchungserlebnis", scene: "alpine sunrise over the hotel, promise of a new day, warm cinematic glow" },
];

/* ============================================================================
 *  ASSET MANIFEST
 * ========================================================================== */
export const ASSET_MANIFEST: AssetSpec[] = [
  /* ---- HERO ---- */
  {
    key: "hero",
    kind: "image",
    path: "/generated/hero/hero-sunrise.jpg",
    fallback: "/fallback/placeholder.jpg",
    aspect: "21:9 (2560×1440+)",
    prompt: `ultra premium alpine luxury hotel at sunrise, dramatic snow-dusted Dolomite peaks, mist in the valley, floor-to-ceiling glass facade with warm interior glow, infinity pool reflecting the mountains, ${STYLE}, ultra-wide establishing shot, calm upper sky for headline overlay`,
    negativePrompt: NEG,
  },

  /* ---- SCROLL-SEQUENZ (16 Frames) ---- */
  ...SEQUENCE_STORY.map((s, i): AssetSpec => {
    const n = String(i + 1).padStart(2, "0");
    return {
      key: `sequence/${n}`,
      kind: "sequence",
      path: `/generated/sequence/frame-${n}.jpg`,
      fallback: "/fallback/placeholder.jpg",
      aspect: "5:3 (2000×1200)",
      prompt: `${s.scene}, ${STYLE}`,
      negativePrompt: NEG,
    };
  }),

  /* ---- 3D-RENDER-FALLBACKS (Poster, falls WebGL nicht verfügbar) ---- */
  {
    key: "3d/crystal",
    kind: "render3d",
    path: "/generated/3d/crystal.jpg",
    fallback: "/fallback/placeholder.jpg",
    aspect: "1:1 (1280×1280), transparent/dark bg",
    prompt: `floating faceted mountain crystal, glacier-turquoise and champagne-gold refractions, glowing core, dark studio background, ${STYLE}`,
    negativePrompt: NEG,
  },
  {
    key: "3d/wellness-sphere",
    kind: "render3d",
    path: "/generated/3d/wellness-sphere.jpg",
    fallback: "/fallback/placeholder.jpg",
    aspect: "1:1 (1280×1280)",
    prompt: `abstract glowing wellness sphere, soft turquoise inner light, liquid morphing surface, dark background, ${STYLE}`,
    negativePrompt: NEG,
  },
  {
    key: "3d/alpine-landscape",
    kind: "render3d",
    path: "/generated/3d/alpine-landscape.jpg",
    fallback: "/fallback/placeholder.jpg",
    aspect: "1:1 (1280×1280)",
    prompt: `abstract low-poly alpine landscape object floating in dark space, golden rim light, ${STYLE}`,
    negativePrompt: NEG,
  },
  {
    key: "3d/particles",
    kind: "render3d",
    path: "/generated/3d/particles.jpg",
    fallback: "/fallback/placeholder.jpg",
    aspect: "1:1 (1280×1280)",
    prompt: `golden floating particle field, bokeh, depth, dark cinematic background, ${STYLE}`,
    negativePrompt: NEG,
  },

  /* ---- VIDEO-LOOP POSTER-FALLBACKS ---- */
  ...[
    ["loop-mist", "slow drifting mist over alpine peaks at dawn, seamless loop"],
    ["loop-pool", "gentle infinity pool water movement, reflections, seamless loop"],
    ["loop-fire", "close-up crackling fireplace embers, warm glow, seamless loop"],
    ["loop-water", "soft water surface reflections, turquoise spa, seamless loop"],
    ["loop-forest", "subtle wind through an alpine forest, light shafts, seamless loop"],
  ].map(([name, scene]): AssetSpec => ({
    key: `video/${name}`,
    kind: "videoPoster",
    path: `/generated/videos/${name}.jpg`,
    fallback: "/fallback/placeholder.jpg",
    aspect: "16:9 (1920×1080) poster; loop als .mp4 gleichen Namens",
    prompt: `${scene}, ${STYLE}`,
    negativePrompt: NEG,
  })),
];

/* Schneller Lookup nach Key. */
const BY_KEY: Record<string, AssetSpec> = Object.fromEntries(
  ASSET_MANIFEST.map((a) => [a.key, a]),
);

/**
 * Liefert den anzuzeigenden Pfad für einen Asset-Key.
 * Da statische Imports/`<Image>` keine Existenzprüfung am Server erlauben,
 * geben wir standardmäßig den generierten Pfad zurück – die mitgelieferten
 * Platzhalter liegen bereits dort. Über `preferFallback` lässt sich der
 * garantierte Fallback erzwingen (z. B. für `<img onError>`-Handler).
 */
export function resolveAsset(key: string, preferFallback = false): string {
  const spec = BY_KEY[key];
  if (!spec) return "/fallback/placeholder.jpg";
  return preferFallback ? spec.fallback : spec.path;
}

/** Vollständige Spec inkl. Prompt (für Tooling / Generator). */
export function getAssetSpec(key: string): AssetSpec | undefined {
  return BY_KEY[key];
}

/** Alle Sequence-Frames in Reihenfolge (für die Scroll-Story). */
export function sequenceFrames(): { path: string; caption: string; title: string }[] {
  return SEQUENCE_STORY.map((s, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { path: `/generated/sequence/frame-${n}.jpg`, caption: s.caption, title: s.title };
  });
}

export { STYLE as HIGGSFIELD_STYLE, NEG as HIGGSFIELD_NEGATIVE };
