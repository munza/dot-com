import type { APIRoute } from "astro";

import { siteConfig } from "@/consts";
import { themeColor } from "@/lib/theme";

export const GET: APIRoute = () =>
  Response.json({
    name: siteConfig.title,
    short_name: siteConfig.title,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: themeColor("page"),
    theme_color: themeColor("page"),
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  });
