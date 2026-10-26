# dot-com

An Astro starter theme with a blog, light and dark mode, SEO, and Cloudflare deployment. Restyle it by changing a few CSS variables; content is Markdown.

## Quick start

Node comes from the Nix flake's dev shell. With [direnv](https://direnv.net), run `direnv allow` once and the shell loads whenever you `cd` into the project. Without direnv, run `nix develop` first.

```sh
npm install
npm run dev
```

Then:

1. Set `site` in `astro.config.mjs` to your domain. Canonical URLs, Open Graph tags, the sitemap and RSS all use it.
2. Edit `src/consts.ts`: site title and description, author, navigation and social links. The header shows the site title with the author's `designation` and `location` as its subtitle. The demo persona (Mara Lindqvist) and her links are made up.
3. Replace `public/favicon.svg` with your own square SVG. `favicon.ico` and the PNG app icons are generated from it at build time. A `prefers-color-scheme: dark` block inside the SVG changes the browser-tab icon in dark mode; the generated files use the light colors.
4. Write posts in `src/content/posts/` and delete the samples. Keep `markdown-style-guide.md` while you restyle; it shows every element the theme styles.

## Features

- **Brutalist styling**: semantic HTML on top of the browser's default styles, a serif and a monospace font, six colors, and almost no classes. Tailwind CSS v4 is still available for utilities.
- **Dark mode**: follows the system setting, has a toggle that remembers the choice, and doesn't flash the wrong theme on load.
- **Blog**: Markdown posts with a typed schema, drafts, tag pages with URL-safe slugs, reading time, and optimized hero images.
- **SEO**: canonical URL, Open Graph and Twitter tags, a generated OG image per post, sitemap, `robots.txt` and RSS feed.
- **Icons from one SVG**: `favicon.svg` is served as is and rendered to `favicon.ico`, the apple-touch-icon and the web manifest icons.
- **Page transitions**: Astro's `<ClientRouter />`.
- **Accessibility**: skip link, labelled navigation with `aria-current`, and reduced-motion support.
- **Tooling**: strict TypeScript, oxlint, oxfmt, `astro check`, build smoke tests, and GitHub Actions CI running in the same Nix dev shell.

## Theming

The theme is brutalist: Tailwind is loaded without its CSS reset, so the browser's default styles (heading sizes, list bullets, underlined links, native buttons) are the design. Components are semantic HTML with almost no classes.

To restyle it, edit `src/styles/global.css`:

- Six colors in `:root` (light) and `:root.dark` (dark): `--theme-page`, `--theme-foreground`, `--theme-link`, `--theme-visited`, `--theme-rule` (rules and borders) and `--theme-surface` (buttons, table headers). Keep them as hex values: the OG images, web manifest and `theme-color` meta tags read them at build time.
- The `@layer base` block holds the element rules: page width, fonts, links, rules, buttons, inline nav lists, tables, code and numbered section headings. Add element rules there rather than classes on components.

Body text uses Source Serif 4, loaded through `fonts` in `astro.config.mjs`; code, dates, buttons and the footer use the system monospace font. Both font stacks are `--theme-font-body` and `--theme-font-mono` in `global.css`. The OG images use `@fontsource/source-serif-4` (`src/lib/og.ts`); change both together.

## Blog posts

Each post is a Markdown file in `src/content/posts/`. The schema is in `src/content.config.ts`:

```yaml
---
title: Post title
description: One sentence, used in lists, RSS and the OG image.
pubDate: 2026-10-01
updatedDate: 2026-10-20 # optional
tags: [astro]
heroImage: "@/assets/posts/cover.png" # optional
heroImageAlt: Describe the image
draft: true # optional; drafts show only in `npm run dev`
---
```

The file name becomes the URL: `on-call-alerts.md` is served at `/blog/on-call-alerts/`.

Put post images in `src/assets/posts/` and reference them with the `@/` alias, as above. Astro's `image()` schema helper resolves the path, checks that the file exists, and outputs resized WebP versions at build time. A path relative to the Markdown file (`./cover.png`) also works.

## Analytics

Copy `.env.example` to `.env` and set `PUBLIC_ANALYTICS_SCRIPT_URL` to your analytics script, for example a Plausible or Umami script URL. Nothing is loaded when it's unset. Use a tool that tracks history-based page changes, because page transitions don't do full page loads.

## Project structure

```text
src/
├── components/
│   ├── layout/       Head (SEO), Header, Footer, Navigation, Section, SkipLink, ScrollToTop
│   ├── ui/           Icon, ThemeToggle
│   └── PostList, TagList
├── assets/posts/     images for blog posts
├── content/posts/    Markdown blog posts
├── icons/            SVG icons used by <Icon /> (the footer's social links)
├── layouts/          BaseLayout
├── lib/              posts, theme colors, OG images, favicon rendering
├── pages/            routes, including rss.xml, robots.txt, the manifest, favicon.ico and generated images
├── styles/global.css colors and element styles
└── consts.ts         site config, navigation and social links
```

## Commands

| Command                  | Action                                                 |
| ------------------------ | ------------------------------------------------------ |
| `npm run dev`            | Start the dev server at `localhost:4321`               |
| `npm run build`          | Build the site to `./dist/` (pages in `dist/client/`)  |
| `npm run preview`        | Preview the build                                      |
| `npm run check`          | Lint, type-check and check formatting (what CI runs)   |
| `npm run fix`            | Fix lint issues and format the code                    |
| `npm test`               | Build, then run the smoke tests in `tests/`            |
| `npm run generate-types` | Generate Cloudflare Worker types from `wrangler.jsonc` |

## Deployment

The site deploys to Cloudflare Workers with `npx wrangler deploy` after `npm run build`. Images are optimized at build time, so no Cloudflare Images binding is needed. To deploy somewhere else, remove the Cloudflare adapter from `astro.config.mjs` and the site builds as plain static files.
