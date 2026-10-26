import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import { siteConfig } from "@/consts";
import { getPosts } from "@/lib/posts";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: `/blog/${post.id}/`,
    })),
  });
};
