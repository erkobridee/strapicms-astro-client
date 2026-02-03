import { strapi } from '@strapi/client';

import { STRAPI_API_URL } from '~/settings';

//----------------------------------------------------------------------------//

export const strapiClient = strapi({
  baseURL: STRAPI_API_URL
});
