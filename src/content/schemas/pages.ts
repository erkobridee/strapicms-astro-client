import { defineCollection, z } from 'astro:content';

import { basePageSchema } from './strapi';

import strapiLoader from '~/utils/strapi/loader';

import { isCIEnv } from '~/utils/env';

import { locales, astroCollectionCacheDurationInMs } from '~/settings';

//----------------------------------------------------------------------------//

export const pageSchema = basePageSchema.extend({
  localizations: z.array(basePageSchema).optional()
});

//----------------------------------------------------------------------------//

export const collection = defineCollection({
  loader: strapiLoader({
    contentType: 'page',

    // TODO: review
    params: { populate: '*' },

    cacheDurationInMs: astroCollectionCacheDurationInMs,

    locales,

    skipSync: isCIEnv
  }),

  schema: pageSchema
});
