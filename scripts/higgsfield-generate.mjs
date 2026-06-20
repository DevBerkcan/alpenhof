#!/usr/bin/env node
/**
 * ============================================================================
 *  HIGGSFIELD ASSET-GENERATOR
 * ============================================================================
 *  Liest das Asset-Manifest (lib/higgsfield.ts → als JSON gespiegelt unten)
 *  und generiert jedes Asset über deinen Higgsfield-Endpoint. Die fertigen
 *  Dateien werden direkt nach /public/generated geschrieben und von der
 *  Website automatisch genutzt (siehe lib/higgsfield.ts → resolveAsset()).
 *
 *  AUFRUF
 *    node scripts/higgsfield-generate.mjs --dry-run     # nur Prompts ausgeben
 *    HIGGSFIELD_API_KEY=xxx node scripts/higgsfield-generate.mjs
 *    HIGGSFIELD_API_KEY=xxx node scripts/higgsfield-generate.mjs --only hero
 *
 *  INTEGRATION
 *    Die Funktion `callHiggsfield()` unten ist der EINZIGE Punkt, den du an
 *    deinen konkreten Connector anpasst (MCP-Tool, REST-Endpoint o. Ä.).
 *    Erwartet wird: Prompt rein → Bild-Bytes (Buffer) raus. Der Rest
 *    (Manifest, Pfade, Speichern, Fallback) ist fertig.
 * ============================================================================
 */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;

/* ----------------------------------------------------------------------------
 *  MANIFEST  (gespiegelt aus lib/higgsfield.ts – Single Source bleibt dort)
 *  Bei Änderungen am Manifest hier synchron halten oder per Build-Step
 *  aus lib/higgsfield.ts exportieren.
 * -------------------------------------------------------------------------- */
const STYLE =
  "cinematic, editorial, warm champagne-gold light, deep warm anthracite shadows, " +
  "glacier-turquoise haze, layered mountain silhouettes, soft volumetric fog, film grain, " +
  "photorealistic, ultra detailed, no people, no text";
const NEG =
  "people, text, watermark, logo, oversaturated, cartoon, distorted architecture, low quality, blurry";

const MANIFEST = [
  { path: "generated/hero/hero-sunrise.jpg", aspect: "21:9",
    prompt: `ultra premium alpine luxury hotel at sunrise, snow-dusted peaks, mist, glass facade glowing, infinity pool, ${STYLE}` },
  ...Array.from({ length: 16 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { path: `generated/sequence/frame-${n}.jpg`, aspect: "5:3",
      prompt: `alpine luxury story frame ${n}, ${STYLE}` };
  }),
  { path: "generated/3d/crystal.jpg", aspect: "1:1", prompt: `floating faceted mountain crystal, glowing core, dark bg, ${STYLE}` },
  { path: "generated/3d/wellness-sphere.jpg", aspect: "1:1", prompt: `glowing turquoise wellness sphere, morphing surface, dark bg, ${STYLE}` },
  { path: "generated/3d/alpine-landscape.jpg", aspect: "1:1", prompt: `low-poly alpine landscape object, golden rim light, dark bg, ${STYLE}` },
  { path: "generated/3d/particles.jpg", aspect: "1:1", prompt: `golden floating particle field, bokeh, dark bg, ${STYLE}` },
  { path: "generated/videos/loop-mist.jpg", aspect: "16:9", prompt: `drifting mist over peaks at dawn, ${STYLE}` },
  { path: "generated/videos/loop-pool.jpg", aspect: "16:9", prompt: `infinity pool water reflections, ${STYLE}` },
  { path: "generated/videos/loop-fire.jpg", aspect: "16:9", prompt: `fireplace embers warm glow, ${STYLE}` },
  { path: "generated/videos/loop-water.jpg", aspect: "16:9", prompt: `spa water surface reflections, ${STYLE}` },
  { path: "generated/videos/loop-forest.jpg", aspect: "16:9", prompt: `wind through alpine forest, light shafts, ${STYLE}` },
];

/* ----------------------------------------------------------------------------
 *  >>> HIER ANPASSEN <<<  – Anbindung an deinen Higgsfield-Connector.
 *
 *  Beispiel (REST). Bei MCP rufst du stattdessen dein MCP-Tool auf und gibst
 *  die zurückgelieferten Bild-Bytes als Buffer zurück.
 * -------------------------------------------------------------------------- */
async function callHiggsfield({ prompt, aspect }) {
  const KEY = process.env.HIGGSFIELD_API_KEY;
  const ENDPOINT = process.env.HIGGSFIELD_ENDPOINT || "https://platform.higgsfield.ai/v1/images/generations";
  if (!KEY) throw new Error("HIGGSFIELD_API_KEY fehlt (oder --dry-run nutzen).");

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      prompt,
      negative_prompt: NEG,
      aspect_ratio: aspect,
      // model: "soul",  // ggf. konkretes Higgsfield-Modell setzen
    }),
  });
  if (!res.ok) throw new Error(`Higgsfield ${res.status}: ${await res.text()}`);
  const data = await res.json();

  // Erwartet eine Bild-URL oder base64 – beide Fälle abgedeckt:
  const url = data?.data?.[0]?.url || data?.images?.[0]?.url;
  const b64 = data?.data?.[0]?.b64_json || data?.images?.[0]?.b64_json;
  if (url) return Buffer.from(await (await fetch(url)).arrayBuffer());
  if (b64) return Buffer.from(b64, "base64");
  throw new Error("Higgsfield-Antwort enthielt kein Bild.");
}

/* -------------------------------------------------------------------------- */
async function run() {
  const targets = ONLY ? MANIFEST.filter((m) => m.path.includes(ONLY)) : MANIFEST;
  console.log(`\nHiggsfield-Generator · ${targets.length} Asset(s)${DRY ? " · DRY-RUN" : ""}\n`);

  for (const item of targets) {
    if (DRY) {
      console.log(`• ${item.path}  [${item.aspect}]`);
      console.log(`  ${item.prompt}\n`);
      continue;
    }
    process.stdout.write(`• ${item.path} … `);
    try {
      const bytes = await callHiggsfield(item);
      const out = join(PUBLIC, item.path);
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, bytes);
      console.log("✓");
    } catch (err) {
      console.log(`✗  ${err.message}`);
    }
  }
  console.log("\nFertig. Vorhandene Platzhalter wurden überschrieben.\n");
}

run().catch((e) => { console.error(e); process.exit(1); });
