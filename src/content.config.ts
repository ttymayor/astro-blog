import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/pages/posts" }),
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
      techStacks: z.array(z.object({
        name: z.string(),
        icon: z.string(),
      })),
    }),
    menu: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
  }),
});

export const collections = { posts, site };
