import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

import { siteConfig } from "@/consts";
import { maskParts } from "@/lib/mask";
import { themeColor } from "@/lib/theme";

const require = createRequire(import.meta.url);
const font = (path: string) => readFileSync(require.resolve(path));
const geist = font("@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff");
const geistSemibold = font("@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff");
const domain = new URL(import.meta.env.SITE).host;
const geistMono = font("@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff");

const mono = (children: string, color: string) => ({
  type: "div",
  props: { style: { fontFamily: "Geist Mono", fontSize: 22, color }, children },
});

/** Renders a 1200×630 Open Graph PNG as a datasheet page: label strip, title, subtitle, footer strip. */
export async function renderOgImage(
  title: string,
  subtitle: string,
  label = "GENERAL DESCRIPTION",
): Promise<Response> {
  const rule = `1px solid ${themeColor("rule")}`;
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          padding: 40,
          backgroundColor: themeColor("page"),
          fontFamily: "Geist",
        },
        children: {
          type: "div",
          props: {
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: themeColor("sheet"),
              border: rule,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "24px 40px",
                    borderBottom: rule,
                  },
                  children: [
                    mono(siteConfig.title.toUpperCase(), themeColor("foreground")),
                    mono(
                      `DOC ${siteConfig.docId} · REV ${siteConfig.revision}`,
                      themeColor("muted"),
                    ),
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 40px",
                    gap: 24,
                  },
                  children: [
                    mono(`§ ${label}`, themeColor("accent")),
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "flex-end",
                          fontSize: 64,
                          fontWeight: 600,
                          lineHeight: 1.05,
                          letterSpacing: "-0.04em",
                          color: themeColor("foreground"),
                        },
                        // Hidden letters ("▮") are drawn as dark boxes, as on the site.
                        children: maskParts(title).map((part) =>
                          part.hidden
                            ? {
                                type: "div",
                                props: {
                                  style: {
                                    display: "flex",
                                    gap: 4,
                                    marginLeft: 3,
                                    marginBottom: 8,
                                  },
                                  children: Array.from({ length: part.hidden }, () => ({
                                    type: "div",
                                    props: {
                                      style: {
                                        width: 32,
                                        height: 45,
                                        backgroundColor: themeColor("dot"),
                                      },
                                    },
                                  })),
                                },
                              }
                            : {
                                type: "div",
                                props: { style: { whiteSpace: "pre-wrap" }, children: part.text },
                              },
                        ),
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: 28,
                          fontWeight: 400,
                          lineHeight: 1.4,
                          color: themeColor("text"),
                        },
                        children: subtitle,
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    padding: "20px 40px",
                    backgroundColor: themeColor("foreground"),
                  },
                  children: mono(`${domain} ↗`, themeColor("on-ink")),
                },
              },
            ],
          },
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: geist, weight: 400, style: "normal" },
        { name: "Geist", data: geistSemibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMono, weight: 400, style: "normal" },
      ],
    },
  );

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
