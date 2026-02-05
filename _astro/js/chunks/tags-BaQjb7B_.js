import { i as isCIEnv, g as getCollection } from './env-DRG5BxF-.js';

const getEntries = async () => isCIEnv ? [] : await getCollection("tags");
const mapByLocale = (entries) => entries.reduce((acc, entry) => {
  const locale = entry.data.locale;
  if (acc.has(locale)) {
    acc.get(locale).push(entry);
  } else {
    acc.set(locale, [entry]);
  }
  return acc;
}, /* @__PURE__ */ new Map());

export { getEntries as g, mapByLocale as m };
