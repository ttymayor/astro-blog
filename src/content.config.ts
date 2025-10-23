import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/pages/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    tags: z.array(z.string()).optional(),
    categories: z.string().optional(),
    draft: z.boolean().optional(),
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
        github: z.string().optional(),
        twitter: z.string().optional(),
        discord: z.string().optional(),
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        youtube: z.string().optional(),
        tiktok: z.string().optional(),
        twitch: z.string().optional(),
      }),
      techStacks: z.array(z.object({
        name: z.string(),
        icon: z.string(),
      })),
      events: z.array(z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
      })),
    }),
    menu: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })),
  }),
});

export const collections = { posts, site };
