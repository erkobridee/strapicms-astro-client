export const STRAPI_IMAGE_REMOTE_PATTERN = {
  protocol: 'http',
  hostname: 'localhost',
  port: '1337',
  pathname: '/uploads/**'
};

export const STRAPI_URL = 'http://localhost:1337';

export const STRAPI_API_URL = `${STRAPI_URL}/api`;

//----------------------------------------------------------------------------//

export const SITE_TITLE = 'Strapi CMS Astro Client';

//----------------------------------------------------------------------------//

export const astroCollectionCacheDurationInMs = 60000;

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
