export const cacheDurationInMs = 60000;

//----------------------------------------------------------------------------//

export const languageByLocale = {
  en: 'English',
  [`pt-BR`]: 'Português'
};

export type TLocales = keyof typeof languageByLocale;

export const locales = Object.keys(languageByLocale);

export const i18nConfig = {
  defaultLocale: 'en',
  locales
};
