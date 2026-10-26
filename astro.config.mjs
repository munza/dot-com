// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Used for canonical, Open Graph, sitemap and RSS URLs.
  site: "https://tawsifaqib.com",

  integrations: [sitemap()],

  // Static site: no sessions, so the Cloudflare adapter doesn't add (and provision) a KV namespace for them.
  session: false,

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
      name: "Geist",
      cssVariable: "--font-geist",
      provider: fontProviders.google(),
      weights: ["300 700"],
      styles: ["normal"],
    },
    {
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      provider: fontProviders.google(),
      weights: ["400", "500"],
      styles: ["normal"],
    },
  ],

  markdown: {
    // Code blocks follow the light/dark toggle; global.css switches to the dark colors.
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" } },
  },

  // "compile" optimizes images with sharp at build time, so no Cloudflare Images binding is needed.
  adapter: cloudflare({ prerenderEnvironment: "node", imageService: "compile" }),
});
