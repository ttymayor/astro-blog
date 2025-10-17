import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    pubDate: z.coerce.date(),
  })
});

const site = defineCollection({
  loader: file("src/data/site.json"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    author: z.object({
      name: z.string(),
      email: z.string(),
      social: z.object({
        github: z.string(),
        twitter: z.string(),
        linkedin: z.string(),
      }),
    }),
    menu: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
  }),
});

export const collections = { blog, site };
