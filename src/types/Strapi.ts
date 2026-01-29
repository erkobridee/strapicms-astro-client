import { type API } from '@strapi/client';

//----------------------------------------------------------------------------//

// Type definitions based on the actual response structure

export interface BaseDocument extends API.Document {
  id: number;
  publishedAt: string | null;
}

export interface ImageBase {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export interface ImageFormat extends ImageBase {
  path: string | null;
  sizeInBytes: number;
}

export interface ImageFormats {
  thumbnail: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  large: ImageFormat;
}

export interface Image extends BaseDocument, ImageBase {
  alternativeText: string | null;

  caption: string | null;

  previewUrl: string | null;

  provider: string;
  provider_metadata: null | { [key: string]: any };
}

//----------------------------------------------------------------------------//

// <STRAPI_CMS_HOST>/api/i18n/locales
export interface Locale extends BaseDocument {
  name: string;
  code: string;
  isDefault: boolean;
}

//----------------------------------------------------------------------------//

// Strapi Collections Data Models

export interface Page extends BaseDocument {
  title: string;
  slug: string;
  description?: string | null;
  body: string;

  cover?: Image | null;
  coverAltText?: string | null;

  locale: string;

  localizations?: Page[];
}

export interface Tag extends BaseDocument {
  title: string;
  slug: string;
  description?: string | null;

  locale: string;

  localizations?: Tag[];
}

export interface Blog extends BaseDocument {
  title: string;
  slug: string;
  description?: string | null;
  body: string;

  cover?: Image | null;
  coverAltText?: string | null;

  locale: string;

  tags?: Tag[];

  localizations?: Blog[];
}

//----------------------------------------------------------------------------//

// Strapi Responses

export type PagesResponse = API.DocumentResponseCollection<Page>;

export type TagsResponse = API.DocumentResponseCollection<Tag>;

export type BlogsResponse = API.DocumentResponseCollection<Blog>;
