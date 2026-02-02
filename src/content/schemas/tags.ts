import { defineCollection, z } from 'astro:content';

import { baseDocumentSchema } from './strapi';

import strapiLoader from '~/utils/strapi/loader';

import { isCIEnv } from '~/utils/env';

//----------------------------------------------------------------------------//

const baseTagSchema = baseDocumentSchema.extend({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional().nullable(),
  locale: z.string()
});

export const tagSchema = baseTagSchema.extend({
  localizations: z.array(baseTagSchema).optional()
});

//----------------------------------------------------------------------------//

export const collection = defineCollection({
  loader: strapiLoader({
    contentType: 'tag',

    // TODO: review
    params: { populate: '*' },

    cacheDurationInMs: 60000,

    locales: ['en', 'pt-BR'],

    skipSync: isCIEnv
  }),
  schema: tagSchema
});
