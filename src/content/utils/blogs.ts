import type { CollectionEntry } from 'astro:content';

import { getCollection } from 'astro:content';

import { isCIEnv } from '~/utils/env';

//----------------------------------------------------------------------------//

type TCollectionEntry = CollectionEntry<'blogs'>;

export const getEntries = async (): Promise<TCollectionEntry[]> =>
  isCIEnv ? [] : await getCollection('blogs');
