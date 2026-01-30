/*
  based on:
  https://github.com/PaulBratslavsky/strapi-community-astro-loader/blob/6406c201987f7c37eb86256412c46e315f380e55/src/strapi-loader.ts
*/

import type { Loader, LoaderContext } from 'astro/loaders';
import { type API } from '@strapi/client';
import type { StrapiLoaderOptions } from './types';

import invariant from 'tiny-invariant';

import { strapiClient } from './client';

//----------------------------------------------------------------------------//

// TODO: review and redefine
//
// it to support passing an array of locales to be loaded,
// but it should be also be possible to doesn't define it
//

export function strapiLoader({
  contentType,
  params,
  pluralContentType = `${contentType}s`,
  cacheDurationInMs = 0,
  pageSize = 25
}: StrapiLoaderOptions): Loader {
  const collection = strapiClient.collection(pluralContentType);

  return {
    name: contentType,

    load: async function ({
      store,
      meta,
      logger,
      generateDigest,
      parseData
    }: LoaderContext) {
      const lastSynced = meta.get('lastSynced');

      if (lastSynced && Date.now() - Number(lastSynced) < cacheDurationInMs) {
        logger.info('Skipping sync');
        return;
      }

      logger.debug(
        `Fetching from Strapi with params: ${JSON.stringify(params)}`
      );

      let currentPageNum = 1;
      let totalPageCount = Number.MAX_SAFE_INTEGER; // TODO: is there a way to get this before paging?

      do {
        const paginatedParams = {
          ...params,
          pagination: { page: currentPageNum, pageSize }
        } satisfies API.BaseQueryParams;

        const {
          data: page,
          meta: { pagination }
        } = await collection.find(paginatedParams);

        for (const document of page) {
          const id = String(document.documentId);
          const data = await parseData({ id, data: document });
          const digest = generateDigest(data);
          store.set({ id, digest, data });
        }

        invariant(
          pagination,
          'Strapi did not return pagination info. Can not page through content.'
        );

        meta.set('lastSynced', String(Date.now()));

        totalPageCount = pagination.pageCount;

        logger.info(`Stored page ${currentPageNum} of ${totalPageCount}.`);

        currentPageNum++;
      } while (currentPageNum <= totalPageCount);
    },

    schema: () => {
      throw new Error(
        'This default schema should not be used. Please specify your own when using `strapiLoader`.'
      );
    }
  };
}

export default strapiLoader;
