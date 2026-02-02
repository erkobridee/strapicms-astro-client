import { defineCollection, z } from 'astro:content';

import { baseDocumentSchema, imageSchema } from './strapi';

import strapiLoader from '~/utils/strapi/loader';

import { isCIEnv } from '~/utils/env';

//----------------------------------------------------------------------------//

const basePageSchema = baseDocumentSchema.extend({
  title: z.string(),
  slug: z.string(),

  description: z.string().optional().nullable(),

  body: z.string(),

  cover: imageSchema.optional().nullable(),
  coverAltText: z.string().optional().nullable(),

  locale: z.string()
});

export const pageSchema = basePageSchema.extend({
  localizations: z.array(basePageSchema).optional()
});

//----------------------------------------------------------------------------//

export const collection = defineCollection({
  loader: strapiLoader({
    contentType: 'page',

    // TODO: review
    params: { populate: '*' },

    skipSync: isCIEnv
  }),
  schema: pageSchema
});
