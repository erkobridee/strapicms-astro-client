import { i as isCIEnv, g as getCollection } from './env-DPsaK8Gq.js';

const getEntries = async () => isCIEnv ? [] : await getCollection("blogs");
const getEntriesSorted = async () => await getEntries().then(
  (entries) => entries.sort((a, b) => {
    const bData = b.data;
    const bDatetime = new Date(bData.createdAt).valueOf();
    const aData = a.data;
    const aDatetime = new Date(aData.createdAt).valueOf();
    return bDatetime - aDatetime;
  })
);
const mapByLocale = (entries) => entries.reduce((acc, entry) => {
  const locale = entry.data.locale;
  if (acc.has(locale)) {
    acc.get(locale).push(entry);
  } else {
    acc.set(locale, [entry]);
  }
  return acc;
}, /* @__PURE__ */ new Map());

export { getEntriesSorted as a, getEntries as g, mapByLocale as m };
