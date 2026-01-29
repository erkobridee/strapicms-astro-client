import { strapi } from '@strapi/client';

export const STRAPI_URL = 'http://localhost:1337';

export const STRAPI_BASE_URL = `${STRAPI_URL}/api`;

export const strapiClient = strapi({
  baseURL: STRAPI_BASE_URL
});
