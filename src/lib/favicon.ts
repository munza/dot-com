import { readFileSync } from "node:fs";
import { join } from "node:path";

import { Resvg } from "@resvg/resvg-js";

// The one icon source: favicon.ico and the PNG app icons are all rendered from it.
// Prerendered in Node from the project root, so cwd points at the repo.
// The dark-mode block is only for browser tabs; strip it so the generated files always use the light colors.
// shortcut: the regex handles rules one level deep inside the @media block, enough for an icon's <style>.
const favicon = readFileSync(join(process.cwd(), "public/favicon.svg"), "utf8").replace(
  /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g,
  "",
);

export function renderFaviconPng(size: number): Uint8Array<ArrayBuffer> {
  return new Uint8Array(
    new Resvg(favicon, { fitTo: { mode: "width", value: size } }).render().asPng(),
  );
}

/** A single-image ICO file wrapping a PNG, which every current browser accepts. */
export function renderFaviconIco(size = 32): Uint8Array<ArrayBuffer> {
  const png = renderFaviconPng(size);
  const ico = new Uint8Array(22 + png.length);
  const view = new DataView(ico.buffer);
  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, 1, true); // image count
  ico[6] = size; // width (0 means 256)
  ico[7] = size; // height
  view.setUint16(10, 1, true); // color planes
  view.setUint16(12, 32, true); // bits per pixel
  view.setUint32(14, png.length, true);
  view.setUint32(18, 22, true); // offset of the PNG data
  ico.set(png, 22);
  return ico;
}
