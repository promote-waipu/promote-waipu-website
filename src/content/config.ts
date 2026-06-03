import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.boolean().default(true),
    date: z.coerce.date(),
    end_date: z.coerce.date().nullable().optional(),
    image: z.string().optional().default(''),
    description: z.string().optional().default(''),
    ticket_url: z.string().optional().default(''),
    external_url: z.string().optional().default(''),
  }),
});

const directory = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    category: z.string().optional().default(''),
    address: z.string().optional().default(''),
    phone: z.string().optional().default(''),
    email: z.string().optional().default(''),
    website: z.string().optional().default(''),
    facebook: z.string().optional().default(''),
    instagram: z.string().optional().default(''),
    logo: z.string().optional().default(''),
    image: z.string().optional().default(''),
    description: z.string().optional().default(''),
  }),
});

const explore = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    category: z.string().optional().default(''),
    image: z.string().optional().default(''),
    description: z.string().optional().default(''),
  }),
});

export const collections = { events, directory, explore };
