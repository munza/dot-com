import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/** Published posts, newest first. Drafts are visible only in dev. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
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
