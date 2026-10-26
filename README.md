# tawsifaqib.com

Personal site of Tawsif Aqib, built with Astro. The design is a "datasheet": a white sheet on a grey page, hairline rules, numbered `§` sections, Geist and Geist Mono, and one blue accent, with a matching dark theme.

## Quick start

Node comes from the Nix flake's dev shell. With [direnv](https://direnv.net), run `direnv allow` once and the shell loads whenever you `cd` into the project. Without direnv, run `nix develop` first.

```sh
npm install
npm run dev
```

## Where the content lives

| What                                                       | Where                                                          |
| ---------------------------------------------------------- | -------------------------------------------------------------- |
| Name, email, links, navigation, page titles and meta       | `src/consts.ts`                                                |
| Method, talks, work history, toolkit, Now and Uses entries | `src/consts.ts`                                                |
| Header status line ("NOW · …")                             | `nowLine` in `src/consts.ts`                                   |
| Home NOW band and headline                                 | `nowHighlight`, `headline` in `src/consts.ts`                  |
| Years in software ("14 yrs", "Fourteen years")             | `careerStartYear` in `src/consts.ts`; worked out at build time |
| Planned posts ("In preparation")                           | `plannedPosts` in `src/consts.ts`                              |
| Posts                                                      | `src/content/posts/*.md`                                       |
| Projects and their pages                                   | `src/content/projects/*.md`                                    |
| About text and bios                                        | `src/pages/about.astro`                                        |
| Home page copy                                             | `src/pages/index.astro`                                        |
| Which home sections show (§ numbers follow)                | `homeSections` in `src/consts.ts`                              |
| Favicon (the PNG icons and `favicon.ico` are generated)    | `public/favicon.svg`                                           |

Text in `[brackets]` is still to be filled in: the Uses entries, project details and repo links.

## Features

- **Pages**: Home, About, Projects (one page per project), Writing (with tag pages), Talks, Work, Now, Uses and a 404 page.
- **Light and dark**: follows the system setting, has a toggle in the nav that remembers the choice, and doesn't flash the wrong theme on load.
- **Writing**: Markdown posts with a typed schema, drafts, tag pages with URL-safe slugs, reading time and optimized hero images. Posts still on Medium are listed and linked out until they move here.
- **SEO**: canonical URL, Open Graph and Twitter tags, generated OG images (site, each post and each project), sitemap, `robots.txt` and RSS.
- **Icons from one SVG**: `favicon.svg` is served as is and rendered to `favicon.ico`, the apple-touch-icon and the web manifest icons.
- **Page transitions**: Astro's `<ClientRouter />`.
- **Accessibility**: skip link, labelled navigation with `aria-current`, visible focus rings and reduced-motion support.
- **Tooling**: strict TypeScript, oxlint, oxfmt, `astro check`, build smoke tests, and GitHub Actions CI running in the same Nix dev shell.

## Theming

All colors are `--theme-*` variables in `src/styles/global.css`: `:root` holds the light theme and `:root.dark` the dark one. Keep them as hex values: the OG images, web manifest and `theme-color` meta tags read them at build time.

| Token                                                        | Used for                                       |
| ------------------------------------------------------------ | ---------------------------------------------- |
| `--theme-page`                                               | The grey page behind the sheet                 |
| `--theme-sheet`                                              | The sheet itself                               |
| `--theme-foreground`, `--theme-on-ink`                       | Text and solid (inked) fills, and text on them |
| `--theme-text`, `--theme-muted`, `--theme-faint`             | Body copy, labels, hints                       |
| `--theme-rule`, `--theme-dash`, `--theme-dot`                | Solid, dashed and dotted rules                 |
| `--theme-hover`, `--theme-panel`                             | Row hover and tinted panels                    |
| `--theme-accent`, `--theme-accent-tint`, `--theme-on-accent` | The blue accent                                |

Patterns used on several pages are classes in `global.css`: `.split` (two columns with a hairline divider that stack on narrow screens), `.display` (large page heading), `.sec` (section label), `.caption`, `.lede`, `.btn` and `.btn-solid`, `.link`, `.kv` (spec list with dotted leaders), `.rows` / `.row` (table-like rows; set `--cols` for the grid), `.chip` and `.led` (status light). Anything used once lives in its component's scoped `<style>`.

Fonts are Geist and Geist Mono, loaded through `fonts` in `astro.config.mjs`. The OG images use `@fontsource/geist-sans` and `@fontsource/geist-mono` (`src/lib/og.ts`); change both together.

## Posts

Each post is a Markdown file in `src/content/posts/`. The schema is in `src/content.config.ts`:

```yaml
---
title: Post title
description: One sentence, used in lists, RSS and the OG image.
pubDate: 2026-10-01
updatedDate: 2026-10-20 # optional
tags: [Architecture]
heroImage: "@/assets/posts/cover.png" # optional
heroImageAlt: Describe the image
externalUrl: https://medium.com/… # optional; listed and linked out, no page here
draft: true # optional; never listed, previewable by URL in `npm run dev`
---
```

The file name becomes the URL: `event-sourcing.md` is served at `/writing/event-sourcing/`. To move a post from Medium, paste its text below the frontmatter and remove `externalUrl`.

Put post images in `src/assets/posts/` and reference them with the `@/` alias, as above. Astro's `image()` schema helper resolves the path, checks that the file exists, and outputs resized WebP versions at build time.

`markdown-style-guide.md` is a draft that shows every element the post styles cover. Drafts never appear in lists or RSS; in `npm run dev`, open one by its URL, e.g. `/writing/markdown-style-guide/`.

## Projects

Each project is a Markdown file in `src/content/projects/` with `title`, `summary`, `area`, `status` (`in-progress` or `planned`), `order`, and optionally `repo` and `site`. The body follows the five-part template: What it is, Why I built it, What you get, Get started, Status.

To partly hide a name, write `▮` for each hidden letter in the title, for example `Ku▮▮▮▮▮▮`; it shows as dark boxes on the site and in the OG image. Keep the full name out of the file and its file name, because the repo is public.

`kind: reserved` makes a card that has no page:

- `reserved`: a hatched "To be announced" slot for whatever comes next.

## Project structure

```text
src/
├── components/
│   ├── layout/       Head (SEO), Header, Footer (contact), SkipLink, ScrollToTop
│   ├── sheet/        datasheet blocks: SectionHead, PageIntro, PostRows, TalkRows, WorkRows, ProjectGrid, Toolkit, EntryList
│   └── ui/           Icon, ThemeToggle
├── content/          posts and projects (Markdown)
├── icons/            SVG icons used by <Icon />
├── layouts/          BaseLayout (page, sheet, colophon)
├── lib/              posts and projects, theme colors, OG images, favicon rendering
├── pages/            routes, including rss.xml, robots.txt, the manifest, favicon.ico and generated images
├── styles/global.css tokens, shared classes and Markdown styles
└── consts.ts         site content and configuration
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

The site deploys to **Cloudflare Workers** as static assets: every page is prerendered, so `npm run build` writes the files to `dist/client/` along with a generated `wrangler.json`, and there's no server code. Unknown URLs get `404.html` with a 404 status (`not_found_handling` in `wrangler.jsonc`).

Deploy from your machine:

```sh
npx wrangler login     # once
npm run build
npx wrangler deploy    # uses the generated config in dist/client/
```

Or connect the GitHub repo in the Cloudflare dashboard (Workers & Pages → Create → Import a repository) with build command `npm run build` and deploy command `npx wrangler deploy`, and set the build variable `NODE_VERSION=24`.

The domain: with `tawsifaqib.com` on Cloudflare DNS, add it under the Worker's Settings → Domains & Routes → Custom domain. Add `www.tawsifaqib.com` too and redirect it to the bare domain with a redirect rule.

To deploy somewhere else, remove the Cloudflare adapter from `astro.config.mjs`; the site then builds as plain static files in `dist/`.
