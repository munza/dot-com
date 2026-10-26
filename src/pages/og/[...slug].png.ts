import type { APIRoute, GetStaticPaths } from "astro";

import { getPosts, type Post } from "@/lib/posts";
import { renderOgImage } from "@/lib/og";

export const getStaticPaths = (async () => {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ post: Post }> = ({ props }) =>
  renderOgImage(props.post.data.title, props.post.data.description);
