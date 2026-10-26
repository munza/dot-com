## Development

Node and npm come from the Nix flake dev shell (`flake.nix`, loaded by direnv). Outside direnv, prefix commands with `nix develop --command`. Don't install tools globally; add them to `package.json`, or to the flake if they aren't npm packages.

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Post-task verification

After completing any coding task, run:

```bash
npm run fix
npm run type-check
```

## Theming

The theme is brutalist: Tailwind is loaded without its preflight reset, so browser defaults (heading sizes, list bullets, underlined links, native buttons) are the design. Write semantic HTML and avoid classes; use a utility class only when there is no element-level way to do it (e.g. `sr-only`, `fixed`). Site-wide element rules go in the `@layer base` block of `src/styles/global.css`.

Colors are the `--theme-*` variables in the `:root` (light) and `:root.dark` (dark) blocks: page, foreground, link, visited, rule and surface. Page and foreground are also available as `bg-page` and `text-foreground`. Keep them as hex values because `src/lib/theme.ts` reads them for the OG images, manifest and `theme-color` tags.

Site-wide text, navigation and social links live in `src/consts.ts`.

## Blog

Posts are Markdown files in `src/content/posts/`, validated by the schema in `src/content.config.ts`. Always load posts with `getPosts()` from `src/lib/posts.ts`, not `getCollection()`, so drafts stay out of production and the order is consistent.

## Page transitions

The site uses Astro's `<ClientRouter />`. Component scripts run once, not on every page, so run per-page setup in an `astro:page-load` listener and use delegated `document` listeners for clicks. Look elements up when an event fires, not once at load.

## SVG Icons

All icons are stored in `src/icons/` as raw `.svg` files and loaded via `src/components/ui/Icon.astro`.

When adding or copying icons:

1. Use [Lucide](https://lucide.dev) for UI icons and [Simple Icons](https://simpleicons.org) for brand/social icons.
2. Copy the SVG markup into `src/icons/<name>.svg`.
3. Ensure the SVG is styleable with Tailwind text color utilities:
   - Must have `width="24" height="24" viewBox="0 0 24 24"`
   - For outline icons: use `stroke="currentColor"`.
   - For filled icons: use `fill="currentColor"`.
4. Reference them in components with `<Icon icon="<name>" aria-hidden="true" />` when text beside it already says what it is. Inside `<nav>`, CSS sizes icons to the text.
5. To show an icon before a navigation or social link, set `icon: "<name>"` on the link in `src/consts.ts`.

## Dependency overrides

`overrides` in `package.json` force a patched version of `undici`, which `@cloudflare/vite-plugin`'s `miniflare` pins too low. Remove it once the upstream package ships a fixed version and `npm audit` stays clean without it. Never run `npm audit fix --force`: it "fixes" it by downgrading `@astrojs/cloudflare` to a version for Astro 5.

`wrangler` is pinned to the exact version that `@cloudflare/vite-plugin` (via `@astrojs/cloudflare`) depends on, so only one `wrangler`/`miniflare`/`workerd` gets installed. When upgrading the adapter, set `wrangler` to the plugin's version (`npm view @cloudflare/vite-plugin dependencies.wrangler`).
