import type { CollectionEntry } from 'astro:content';

import { getCollection } from 'astro:content';

import { isCIEnv } from '~/utils/env';

//----------------------------------------------------------------------------//

type TCollectionEntry = CollectionEntry<'locales'>;

export const getEntries = async (): Promise<TCollectionEntry[]> =>
  isCIEnv ? [] : await getCollection('locales');
