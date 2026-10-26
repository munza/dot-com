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
      // Posts still hosted elsewhere (e.g. Medium): listed here, linked out, no page of their own.
      externalUrl: z.url().optional(),
      draft: z.boolean().default(false),
    }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    area: z.string(),
    status: z.enum(["in-progress", "planned"]),
    // "reserved": an open slot for something not decided yet, with no page.
    // To partly hide a name, write "▮" for each hidden letter in the title (see src/lib/mask.ts).
    kind: z.enum(["project", "reserved"]).default("project"),
    repo: z.url().optional(),
    // Project homepage or docs, when it has one.
    site: z.url().optional(),
    order: z.number(),
  }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};
