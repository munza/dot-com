import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

import { siteConfig } from "@/consts";
import { themeColor } from "@/lib/theme";

const require = createRequire(import.meta.url);
const fontPath =
  require.resolve("@fontsource/source-serif-4/files/source-serif-4-latin-700-normal.woff");
const fontData = readFileSync(fontPath);

/** Renders a 1200×630 Open Graph PNG with a title and subtitle in the light theme colors. */
export async function renderOgImage(title: string, subtitle: string): Promise<Response> {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundColor: themeColor("page"),
          color: themeColor("foreground"),
          fontFamily: "Source Serif 4",
          fontSize: 72,
          fontWeight: 700,
          gap: 24,
        },
        children: [
          { type: "div", props: { children: title } },
          {
            type: "div",
            props: {
              style: { fontSize: 32, color: themeColor("foreground") },
              children: subtitle,
            },
          },
          {
            type: "div",
            props: {
              style: { fontSize: 28, marginTop: 48, color: themeColor("foreground") },
              children: siteConfig.title,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Source Serif 4", data: fontData, weight: 700, style: "normal" }],
    },
  );

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
