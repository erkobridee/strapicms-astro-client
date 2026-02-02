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

export function strapiLoader({
  contentType,
  params,
  pluralContentType = `${contentType}s`,
  cacheDurationInMs = 0,
  pageSize = 25,
  locales = [],
  skipSync = false
}: StrapiLoaderOptions): Loader {
  const collection = strapiClient.collection(pluralContentType);

  const loadData = async (
    params: StrapiLoaderOptions['params'],
    { store, logger, generateDigest, parseData }: LoaderContext
  ) => {
    logger.debug(`Fetching from Strapi with params: ${JSON.stringify(params)}`);

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
        const documentId = document.documentId;
        const locale = document.locale;

        const id = locale ? `${locale}/${documentId}` : `${documentId}`;

        const data = await parseData({ id, data: document });

        const digest = generateDigest(data);

        store.set({ id, digest, data });
      }

      invariant(
        pagination,
        'Strapi did not return pagination info. Can not page through content.'
      );

      totalPageCount = pagination.pageCount;

      logger.info(`Stored page ${currentPageNum} of ${totalPageCount}.`);

      currentPageNum++;
    } while (currentPageNum <= totalPageCount);
  };

  return {
    name: contentType,

    load: async function (context: LoaderContext) {
      const { meta, logger } = context;

      const lastSynced = meta.get('lastSynced');

      if (
        skipSync ||
        (lastSynced && Date.now() - Number(lastSynced) < cacheDurationInMs)
      ) {
        logger.info('Skipping sync');
        return;
      }

      if (locales.length > 0) {
        for (const locale of locales) {
          params = {
            ...params,
            locale
          };
          await loadData(params, context);
        }
      } else {
        await loadData(params, context);
      }

      meta.set('lastSynced', String(Date.now()));
    },

    schema: () => {
      throw new Error(
        'This default schema should not be used. Please specify your own when using `strapiLoader`.'
      );
    }
  };
}

export default strapiLoader;
