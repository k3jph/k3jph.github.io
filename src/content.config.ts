import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const shared = {
  id: z.union([z.string(), z.number(), z.null()]).optional(),
  title: z.string(), subtitle: z.string().optional(), date: z.coerce.date().optional(),
  author: z.string().optional(), featured_image: z.string().optional(), credits: z.string().optional(),
  permalink: z.string().optional(), route: z.string(), redirect_from: z.array(z.string()).default([]),
  source_path: z.string(), published: z.boolean().optional(), sitemap: z.boolean().optional(), search: z.boolean().optional(),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,markdown}', base: './.generated/content/blog' }),
  schema: z.looseObject({ ...shared, date: z.coerce.date(), calendar_date: z.string(), tags: z.array(z.string()).default([]), categories: z.array(z.string()).default([]), excerpt: z.string().optional() }),
});
const ancestry = defineCollection({
  loader: glob({ pattern: '**/*.{md,markdown}', base: './.generated/content/ancestry' }),
  schema: z.looseObject({ ...shared, class: z.string(), qualifying_ancestors: z.array(z.string()).default([]), qualifying_ancestor: z.string().optional(), member_number: z.union([z.string(), z.number()]).optional(), chapters: z.array(z.object({ name: z.string(), member_number: z.union([z.string(), z.number()]) })).optional() }),
});
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,markdown}', base: './.generated/content/pages' }),
  schema: z.looseObject(shared),
});
export const collections = { blog, ancestry, pages };
