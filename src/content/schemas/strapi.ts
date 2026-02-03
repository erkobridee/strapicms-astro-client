import { z } from 'astro:content';

//----------------------------------------------------------------------------//

export const baseDocumentSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().nullable()
});

export const imageBaseSchema = z.object({
  ext: z.string(),
  url: z.string(),
  hash: z.string(),
  mime: z.string(),
  name: z.string(),
  size: z.number(),
  width: z.number(),
  height: z.number()
});

export const imageFormatSchema = imageBaseSchema.extend({
  path: z.string().nullable(),
  sizeInBytes: z.number()
});

export const imageFormatsSchema = z.object({
  thumbnail: imageFormatSchema,
  small: imageFormatSchema,
  medium: imageFormatSchema,
  large: imageFormatSchema
});

export const imageSchema = baseDocumentSchema
  .extend(imageBaseSchema.shape)
  .extend({
    alternativeText: z.string().nullable(),
    caption: z.string().nullable(),
    previewUrl: z.string().nullable(),
    provider: z.string(),
    provider_metadata: z.record(z.any()).nullable()
  });

export const localeSchema = baseDocumentSchema.extend({
  name: z.string(),
  code: z.string(),
  isDefault: z.boolean()
});

//----------------------------------------------------------------------------//

export const basePageSchema = baseDocumentSchema.extend({
  title: z.string(),
  slug: z.string(),

  description: z.string().optional().nullable(),

  body: z.string(),

  cover: imageSchema.optional().nullable(),
  coverAltText: z.string().optional().nullable(),

  locale: z.string()
});

export const baseTagSchema = baseDocumentSchema.extend({
  title: z.string(),
  slug: z.string(),

  description: z.string().optional().nullable(),

  locale: z.string()
});

export const baseBlogSchema = baseDocumentSchema.extend({
  title: z.string(),
  slug: z.string(),

  description: z.string().optional().nullable(),

  body: z.string(),

  cover: imageSchema.optional().nullable(),
  coverAltText: z.string().optional().nullable(),

  locale: z.string()
});
