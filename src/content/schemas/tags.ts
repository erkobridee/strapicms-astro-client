import { defineCollection, z } from 'astro:content';

import { baseBlogSchema, baseTagSchema } from './strapi';

import strapiLoader from '~/utils/strapi/loader';

import { isCIEnv } from '~/utils/env';

import { locales, astroCollectionCacheDurationInMs } from '~/settings';

//----------------------------------------------------------------------------//

export const tagSchema = baseTagSchema.extend({
  localizations: z.array(baseTagSchema).optional(),

  blogs: z.array(baseBlogSchema).optional()
});

//----------------------------------------------------------------------------//

export const collection = defineCollection({
  loader: strapiLoader({
    contentType: 'tag',

    // TODO: review
    params: { populate: '*' },

    cacheDurationInMs: astroCollectionCacheDurationInMs,

    locales,

    skipSync: isCIEnv
  }),

  schema: tagSchema
});
