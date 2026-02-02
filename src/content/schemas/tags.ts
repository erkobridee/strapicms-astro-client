import { defineCollection, z } from 'astro:content';

import { baseDocumentSchema } from './strapi';

import strapiLoader from '~/utils/strapi/loader';

import { isCIEnv } from '~/utils/env';

import { locales, cacheDurationInMs } from '~/settings';

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

    cacheDurationInMs,

    locales,

    skipSync: isCIEnv
  }),
  schema: tagSchema
});
