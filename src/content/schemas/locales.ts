import type { Loader, LoaderContext } from 'astro/loaders';
import type { Locale } from '~/types/Strapi';

import { defineCollection, z } from 'astro:content';

import { baseDocumentSchema } from './strapi';

import { isCIEnv } from '~/utils/env';
import { STRAPI_BASE_URL } from '~/utils/strapi/client';

//----------------------------------------------------------------------------//

export const localeSchema = baseDocumentSchema.extend({
  name: z.string(),
  code: z.string(),
  isDefault: z.boolean()
});

//----------------------------------------------------------------------------//

// https://docs.astro.build/en/reference/content-loader-reference/#loader-types

const strapiLocalesLoader = (): Loader => {
  const localesUrl = new URL(`${STRAPI_BASE_URL}/i18n/locales`);

  const cacheDurationInMs = 60000;

  return {
    name: 'locale',
    load: async ({
      store,
      meta,
      logger,
      generateDigest,
      parseData
    }: LoaderContext): Promise<void> => {
      const lastSynced = meta.get('lastSynced');

      if (
        isCIEnv ||
        (lastSynced && Date.now() - Number(lastSynced) < cacheDurationInMs)
      ) {
        logger.info('Skipping locales load from Strapi');
        return;
      }

      logger.debug('Fetching from locales Strapi');

      const response = await fetch(localesUrl);

      const locales = (await response.json()) as Locale[];

      for (const document of locales) {
        const id = String(document.documentId);

        const data = await parseData({ id, data: document });

        const digest = generateDigest(data);

        store.set({ id, digest, data });
      }

      meta.set('lastSynced', String(Date.now()));
    },
    schema: localeSchema
  };
};

//---

export const collection = defineCollection({
  loader: strapiLocalesLoader()
});
