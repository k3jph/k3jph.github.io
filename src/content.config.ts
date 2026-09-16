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

const historicalStatus = z.object({
  type: z.enum(['historical', 'superseded', 'resolved', 'discontinued']),
  reviewed: z.preprocess(
    (value) => value instanceof Date ? value.toISOString().slice(0, 10) : value,
    z.string().refine((value) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
      const date = new Date(`${value}T00:00:00Z`);
      return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
    }, 'Historical-status review dates must be valid YYYY-MM-DD dates.'),
  ),
  note: z.string().trim().min(1),
  current_url: z.string().trim().refine(
    (value) => (value.startsWith('/') && !value.startsWith('//')) || /^https?:\/\/[^\s]+$/i.test(value),
    'Historical-status current URLs must be site-relative or absolute HTTP(S) URLs.',
  ).optional(),
  current_label: z.string().trim().min(1).optional(),
}).strict().superRefine((value, context) => {
  if (value.current_label && !value.current_url) {
    context.addIssue({
      code: 'custom',
      path: ['current_label'],
      message: 'Historical-status current_label requires current_url.',
    });
  }
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,markdown}', base: './.generated/content/blog' }),
  schema: z.looseObject({ ...shared, date: z.coerce.date(), calendar_date: z.string(), tags: z.array(z.string()).default([]), categories: z.array(z.string()).default([]), excerpt: z.string().optional(), historical_status: historicalStatus.optional() }),
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
