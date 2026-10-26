import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const dist = new URL("../dist/client/", import.meta.url);
const read = (path) => readFile(new URL(path, dist), "utf8");

const [home, notFound, post, blog] = await Promise.all([
  read("index.html"),
  read("404.html"),
  read("blog/on-call-alerts/index.html"),
  read("blog/index.html"),
]);
const site = home.match(/<link rel="canonical" href="([^"]+)\/">/)?.[1];

test("emits absolute canonical and social image URLs", () => {
  assert.ok(site, "home page has an absolute canonical URL");
  assert.match(home, new RegExp(`<meta property="og:image" content="${site}/og-image\\.png">`));
  assert.ok(!home.includes(`${site}//`), "no double slashes after the site URL");
});

test("generates static assets", async () => {
  for (const path of [
    "og-image.png",
    "og/on-call-alerts.png",
    "og/postgres-advisory-locks.png",
    "og/markdown-style-guide.png",
    "icon-180.png",
    "icon-192.png",
    "icon-512.png",
    "sitemap-index.xml",
  ]) {
    await access(new URL(path, dist));
  }
});

test("favicon.ico is a valid ICO wrapping a PNG", async () => {
  const ico = await readFile(new URL("favicon.ico", dist));
  assert.deepEqual([...ico.subarray(0, 6)], [0, 0, 1, 0, 1, 0]);
  assert.equal(ico.readUInt32LE(18), 22);
  assert.deepEqual([...ico.subarray(22, 26)], [0x89, 0x50, 0x4e, 0x47]);
  assert.equal(ico.readUInt32LE(14), ico.length - 22);
});

test("404 page links back home and to the main sections", () => {
  assert.match(notFound, /href="\/"/);
  assert.match(notFound, /href="\/#about"/);
  assert.match(notFound, /href="\/blog"/);
});

test("blog lists posts, newest first, with tag links", () => {
  const order = ["Postgres advisory locks", "What a year of on-call", "Markdown style guide"].map(
    (title) => blog.indexOf(title),
  );
  assert.ok(order.every((index, i) => index > -1 && (i === 0 || index > order[i - 1])));
  assert.match(blog, /href="\/blog\/tags\/meta\/"/);
  assert.match(blog, /aria-current="page"/);
});

test("post page has article metadata, its own OG image and an optimized hero image", () => {
  assert.match(post, /<meta property="og:type" content="article">/);
  assert.match(
    post,
    new RegExp(`<meta property="og:image" content="${site}/og/on-call-alerts\\.png">`),
  );
  assert.match(post, /min read/);
  assert.match(post, /<img[^>]+src="\/_astro\/[^"]+\.webp"/);
});

test("tags with spaces get a URL-safe slug", async () => {
  const page = await read("blog/tags/background-jobs/index.html");
  assert.match(page, /#Background jobs/);
  assert.match(page, /Postgres advisory locks/);
  assert.match(blog, /href="\/blog\/tags\/background-jobs\/"/);
});

test("footer social links carry their icons", () => {
  const footer = home.slice(home.indexOf("<footer"));
  assert.equal(footer.match(/<svg/g)?.length, 3);
});

test("tag pages list only matching posts", async () => {
  const guide = await read("blog/tags/guide/index.html");
  assert.match(guide, /Markdown style guide/);
  assert.match(guide, /Postgres advisory locks/);
  assert.doesNotMatch(guide, /What a year of on-call/);
});

test("RSS, robots.txt and manifest point at the site", async () => {
  const [rss, robots, manifest] = await Promise.all([
    read("rss.xml"),
    read("robots.txt"),
    read("manifest.webmanifest"),
  ]);
  assert.match(rss, new RegExp(`<link>${site}/blog/on-call-alerts/</link>`));
  assert.match(robots, new RegExp(`Sitemap: ${site}/sitemap-index.xml`));
  assert.equal(JSON.parse(manifest).icons.length, 2);
});
