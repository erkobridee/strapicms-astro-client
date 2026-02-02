import type { CollectionEntry } from 'astro:content';

import { getCollection } from 'astro:content';

import { isCIEnv } from '~/utils/env';

//----------------------------------------------------------------------------//

export type TCollectionEntry = CollectionEntry<'pages'>;

export const getEntries = async (): Promise<TCollectionEntry[]> =>
  isCIEnv ? [] : await getCollection('pages');

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
