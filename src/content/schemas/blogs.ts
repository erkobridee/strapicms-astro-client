import { defineCollection, z } from 'astro:content';

import { baseDocumentSchema, imageSchema } from './strapi';
import { tagSchema } from './tags';

import strapiLoader from '~/utils/strapi/loader';

import { isCIEnv } from '~/utils/env';

//----------------------------------------------------------------------------//

const baseBlogSchema = baseDocumentSchema.extend({
  title: z.string(),
  slug: z.string(),

  description: z.string().optional().nullable(),

  body: z.string(),

  cover: imageSchema.optional().nullable(),
  coverAltText: z.string().optional().nullable(),

  locale: z.string(),

  tags: z.array(tagSchema).optional()
});

export const blogSchema = baseBlogSchema.extend({
  localizations: z.array(baseBlogSchema).optional()
});

//----------------------------------------------------------------------------//

export const collection = defineCollection({
  loader: strapiLoader({
    contentType: 'blog',

    // TODO: review
    params: { populate: '*' },

    cacheDurationInMs: 60000,

    locales: ['en', 'pt-BR'],

    skipSync: isCIEnv
  }),
  schema: blogSchema
});
