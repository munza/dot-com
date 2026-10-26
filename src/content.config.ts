import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // A tag needs a letter or digit so it has a non-empty URL slug.
      tags: z
        .array(z.string().regex(/[a-z0-9]/i, "Tags need at least one letter or digit"))
        .default([]),
      heroImage: image().optional(),
      heroImageAlt: z.string().default(""),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  posts: postsCollection,
};
