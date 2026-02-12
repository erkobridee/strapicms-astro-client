export const strapiLocalInstanceURL = 'http://localhost:1337';

//-----------------------------------------------------------------------------//

export const STRAPI_CLOUD_PROJECT_ID = 'different-excellence-665ae44142';

export const strapiCloudInstanceURL = `https://${STRAPI_CLOUD_PROJECT_ID}.strapiapp.com`;

export const strapiCloudInstaceMediaDomain = `${STRAPI_CLOUD_PROJECT_ID}.media.strapiapp.com`;

export const strapiCloudInstaceMediaURL = `https://${strapiCloudInstaceMediaDomain}`;

//-----------------------------------------------------------------------------//

export const STRAPI_URL = strapiCloudInstanceURL;

export const STRAPI_API_URL = `${STRAPI_URL}/api`;

export const STRAPI_MEDIA_DOMAIN = strapiCloudInstaceMediaDomain;

export const STRAPI_MEDIA_URL = strapiCloudInstaceMediaURL;

//----------------------------------------------------------------------------//

const { protocol, hostname, port } = new URL(STRAPI_URL);

export const STRAPI_IMAGE_REMOTE_PATTERN = {
  protocol,
  hostname,
  port,
  pathname: '/uploads/**'
};

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
