import type { CollectionEntry } from 'astro:content';

import { getCollection } from 'astro:content';

import { isCIEnv } from '~/utils/env';

//----------------------------------------------------------------------------//

export type TCollectionEntry = CollectionEntry<'blogs'>;

export const getEntries = async (): Promise<TCollectionEntry[]> =>
  isCIEnv ? [] : await getCollection('blogs');

export const getEntriesSorted = async (): Promise<TCollectionEntry[]> =>
  await getEntries().then((entries) =>
    entries.sort((a, b) => {
      const bData = b.data;
      const bDatetime = new Date(bData.createdAt).valueOf();

      const aData = a.data;
      const aDatetime = new Date(aData.createdAt).valueOf();

      return bDatetime - aDatetime;
    })
  );

export const mapByLocale = (entries: TCollectionEntry[]) =>
  entries.reduce((acc, entry) => {
    const locale = entry.data.locale;

    if (acc.has(locale)) {
      acc.get(locale).push(entry);
    } else {
      acc.set(locale, [entry]);
    }

    return acc;
  }, new Map<String, TCollectionEntry[]>());
