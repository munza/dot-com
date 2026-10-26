// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Used for canonical, Open Graph, sitemap and RSS URLs; set to the real domain.
  site: "https://example.com",

  integrations: [sitemap()],

  env: {
    schema: {
      // Optional analytics script (e.g. Plausible or Umami); omitted from the page when unset.
      PUBLIC_ANALYTICS_SCRIPT_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
        url: true,
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
    // Native Node addon used by the prerendered image routes; workerd's dep optimizer can't bundle it.
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
  },

  fonts: [
    {
      name: "Source Serif 4",
      cssVariable: "--font-source-serif",
      provider: fontProviders.google(),
      weights: ["400", "700"],
      styles: ["normal", "italic"],
    },
  ],

  markdown: {
    // Code blocks follow the light/dark toggle; global.css switches to the dark colors.
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" } },
  },

  // "compile" optimizes images with sharp at build time, so no Cloudflare Images binding is needed.
  adapter: cloudflare({ prerenderEnvironment: "node", imageService: "compile" }),
});
