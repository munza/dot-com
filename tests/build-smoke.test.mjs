import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const dist = new URL("../dist/client/", import.meta.url);
const read = (path) => readFile(new URL(path, dist), "utf8");
const exists = (path) =>
  access(new URL(path, dist)).then(
    () => true,
    () => false,
  );

const [home, notFound, writing, project] = await Promise.all([
  read("index.html"),
  read("404.html"),
  read("writing/index.html"),
  read("projects/dotfiles/index.html"),
]);
const site = home.match(/<link rel="canonical" href="([^"]+)\/">/)?.[1];

test("emits absolute canonical and social image URLs", () => {
  assert.equal(site, "https://tawsifaqib.com");
  assert.match(home, new RegExp(`<meta property="og:image" content="${site}/og-image\\.png">`));
  assert.match(home, /<title>Tawsif Aqib, backend engineer<\/title>/);
});

test("generates static assets", async () => {
  for (const path of [
    "og-image.png",
    "og/projects/dotfiles.png",
    "icon-180.png",
    "icon-192.png",
    "icon-512.png",
    "sitemap-index.xml",
  ]) {
    assert.ok(await exists(path), path);
  }
});

test("favicon.ico is a valid ICO wrapping a PNG", async () => {
  const ico = await readFile(new URL("favicon.ico", dist));
  assert.deepEqual([...ico.subarray(0, 6)], [0, 0, 1, 0, 1, 0]);
  assert.equal(ico.readUInt32LE(18), 22);
  assert.deepEqual([...ico.subarray(22, 26)], [0x89, 0x50, 0x4e, 0x47]);
  assert.equal(ico.readUInt32LE(14), ico.length - 22);
});

test("every page links to every section of the site", () => {
  for (const page of [home, notFound]) {
    for (const href of ["/projects", "/writing", "/talks", "/work", "/now", "/uses"]) {
      assert.match(page, new RegExp(`href="${href}"`));
    }
  }
  assert.match(notFound, /exit 1: that page doesn’t exist\./);
});

test("writing lists Medium posts newest first", () => {
  const order = [
    "Picking a Language",
    "Nix on macOS",
    "RPG Party Role",
    "Local Kubernetes",
    "Large Scale Laravel",
  ].map((title) => writing.indexOf(title));
  assert.ok(order.every((index, i) => index > -1 && (i === 0 || index > order[i - 1])));
  assert.match(
    writing,
    /href="https:\/\/medium\.com\/@munza\/nix-on-macos-a-pragmatic-setup-guide-374b7982a77d"/,
  );
  assert.doesNotMatch(writing, /IN PREPARATION/); // showPlannedPosts is off in consts.ts
  assert.match(writing, /href="\/writing" aria-current="page"/);
});

test("external and draft posts get no page of their own", async () => {
  assert.equal(await exists("writing/nix-on-macos/index.html"), false);
  assert.equal(await exists("writing/markdown-style-guide/index.html"), false);
});

test("a post keeps its AN-number on every list", async () => {
  const tag = await read("writing/tags/guide/index.html");
  const number = (html) =>
    html.match(/AN-\d+(?=<\/span><span class="title"[^>]*>Nix on macOS)/)?.[0];
  assert.ok(number(writing), "Nix on macOS has a number on /writing");
  assert.equal(number(tag), number(writing));
});

test("the theme toggle is named by its visible text", () => {
  const toggle = home.match(/<button[^>]*data-theme-toggle[^>]*>/)?.[0];
  assert.ok(toggle);
  assert.doesNotMatch(toggle, /aria-label/);
  assert.match(home, /Dark<span class="sr-only"[^>]*> mode<\/span>/);
});

test("tag pages use URL-safe slugs and list only matching posts", async () => {
  const page = await read("writing/tags/architecture/index.html");
  assert.match(page, /Large Scale Laravel Application/);
  assert.doesNotMatch(page, /Nix on macOS/);
  assert.match(writing, /href="\/writing\/tags\/architecture\/"/);
});

test("home page numbers only the sections that are shown", () => {
  // The method section is switched off in consts.ts, so the projects section becomes §3.
  assert.doesNotMatch(home, /Thesis &amp; method/);
  assert.match(home, /§3 Modules — projects/);
  assert.match(home, /§5 Talks/);
});

test("the mobile menu button controls the nav links", () => {
  assert.match(home, /aria-controls="nav-links"/);
  assert.match(home, /id="nav-links"/);
});

test("partly hidden project names show boxes, and their pages use neutral URLs", async () => {
  const grid = await read("projects/index.html");
  const page = await read("projects/team-sessions/index.html");
  assert.match(grid, /class="box/);
  assert.match(page, /<title>Ku▮▮▮▮▮▮ · Tawsif Aqib<\/title>/);
  assert.match(page, /Ku…, name partly hidden/);
  assert.doesNotMatch(page, /class="sr-only">[^<]*▮/);
  assert.ok(await exists("og/projects/team-sessions.png"));
});

test("reserved slots show as a card without a page", async () => {
  const grid = await read("projects/index.html");
  assert.match(grid, /RESERVED/);
  assert.doesNotMatch(grid, /href="\/projects\/reserved\/"/);
  assert.equal(await exists("projects/reserved/index.html"), false);
});

test("projects without a repo get a page without repo links", async () => {
  const page = await read("projects/agent-factory/index.html");
  assert.match(page, /AI agent factory/);
  assert.doesNotMatch(page, /View the repo/);
});

test("project pages have their repo, status and own OG image", () => {
  assert.match(project, /href="https:\/\/github\.com\/munza\/dotfiles"/);
  assert.match(project, /In progress/);
  assert.match(project, /href="https:\/\/munza\.github\.io\/dotfiles\/"/);
  assert.match(project, new RegExp(`content="${site}/og/projects/dotfiles\\.png"`));
});

test("footer carries contact details on every page", () => {
  for (const page of [home, writing, project]) {
    assert.match(page, /href="mailto:hello@tawsifaqib\.com"/);
    assert.match(page, /href="https:\/\/linkedin\.com\/in\/tawsifaqib"/);
  }
});

test("RSS, robots.txt and manifest point at the site", async () => {
  const [rss, robots, manifest] = await Promise.all([
    read("rss.xml"),
    read("robots.txt"),
    read("manifest.webmanifest"),
  ]);
  assert.match(
    rss,
    /<link>https:\/\/medium\.com\/@munza\/large-scale-laravel-application-9d52c3d38e51<\/link>/,
  );
  assert.match(robots, new RegExp(`Sitemap: ${site}/sitemap-index.xml`));
  assert.equal(JSON.parse(manifest).name, "Tawsif Aqib");
});
