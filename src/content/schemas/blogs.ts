import { defineCollection, z } from 'astro:content';

import { baseBlogSchema, baseTagSchema } from './strapi';

import strapiLoader from '~/utils/strapi/loader';

import { isCIEnv } from '~/utils/env';

import { locales, astroCollectionCacheDurationInMs } from '~/settings';

//----------------------------------------------------------------------------//

export const blogSchema = baseBlogSchema.extend({
  localizations: z.array(baseBlogSchema).optional(),

  tags: z.array(baseTagSchema).optional()
});

//----------------------------------------------------------------------------//

export const collection = defineCollection({
  loader: strapiLoader({
    contentType: 'blog',

    // TODO: review
    params: { populate: '*' },

    cacheDurationInMs: astroCollectionCacheDurationInMs,

    locales,

    skipSync: isCIEnv
  }),

  schema: blogSchema
});
