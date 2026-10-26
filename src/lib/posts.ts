import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/** Published posts, newest first. Drafts are never listed; see getLocalPosts for previewing them. */
export async function getPosts({ drafts = false } = {}): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => drafts || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Posts with a page on this site; posts with an `externalUrl` only link out. In dev, drafts get a page too (open them by URL). */
export async function getLocalPosts(): Promise<Post[]> {
  return (await getPosts({ drafts: import.meta.env.DEV })).filter((post) => !post.data.externalUrl);
}

export function postUrl(post: Post): string {
  return post.data.externalUrl ?? `/writing/${post.id}/`;
}

export type Project = CollectionEntry<"projects">;

/** Every card on the projects grid, in order, including reserved slots. */
export async function getProjects(): Promise<Project[]> {
  return (await getCollection("projects")).sort((a, b) => a.data.order - b.data.order);
}

/** Projects that get a page (and OG image) of their own. */
export async function getProjectPages(): Promise<Project[]> {
  return (await getProjects()).filter((project) => project.data.kind === "project");
}

/** URL-safe form of a tag: "CI/CD" → "ci-cd", "Background jobs" → "background-jobs". */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** One display name per tag slug, sorted; tags that differ only in case or punctuation share a page. */
export function getTags(posts: Post[]): string[] {
  const bySlug = new Map<string, string>();
  for (const tag of posts.flatMap((post) => post.data.tags)) {
    if (!bySlug.has(tagSlug(tag))) bySlug.set(tagSlug(tag), tag);
  }
  return [...bySlug.values()].sort();
}

/** Minutes to read at 200 words per minute. */
export function readingTime(body = ""): number {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 200));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
