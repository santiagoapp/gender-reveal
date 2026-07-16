// Optimize the images actually referenced by the app: scan src/ for every
// asset()/Decor/url()/<img> reference, then emit a WebP next to each source
// file in public/assets. Referenced with `npm run optimize:images`.
//
// - WebP with alpha preserved (watercolor cut-outs need transparency)
// - Longest side capped at MAX_SIDE (no upscaling) — the largest on-screen
//   size here is ~600px, so 1200px stays crisp on 2x displays
// - Originals are kept; update source references to the .webp files

import { readdir, readFile, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const ASSETS = join(ROOT, "public", "assets");
const MAX_SIDE = 1200;
const QUALITY = 82;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

// Collect every png/jpg basename referenced anywhere in src/.
const refRe = /[a-z0-9-]+\.(?:png|jpe?g)/gi;
const referenced = new Set();
for (const file of await walk(SRC)) {
  if (!/\.(tsx?|css)$/.test(file)) continue;
  const text = await readFile(file, "utf8");
  for (const m of text.matchAll(refRe)) referenced.add(m[0]);
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
let before = 0;
let after = 0;
const rows = [];

for (const name of [...referenced].sort()) {
  const srcPath = join(ASSETS, name);
  try {
    await stat(srcPath);
  } catch {
    continue; // referenced but not in public/assets (e.g. svg elsewhere)
  }
  const outPath = join(ASSETS, `${basename(name, extname(name))}.webp`);
  const srcSize = (await stat(srcPath)).size;
  await sharp(srcPath)
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outPath);
  const outSize = (await stat(outPath)).size;
  before += srcSize;
  after += outSize;
  rows.push(
    `  ${name.padEnd(40)} ${kb(srcSize).padStart(9)} -> ${kb(outSize).padStart(9)}`
  );
}

console.log(`Optimized ${rows.length} images:\n${rows.join("\n")}`);
console.log(
  `\nTotal: ${kb(before)} -> ${kb(after)}  (${(
    (1 - after / before) *
    100
  ).toFixed(0)}% smaller)`
);
