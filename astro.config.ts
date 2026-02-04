import type { AstroUserConfig } from 'astro';
import type { RemarkPlugin } from '@astrojs/markdown-remark';
import type { Node, Data } from 'unist';
import type { Visitor } from 'unist-util-visit';

// https://docs.astro.build/en/reference/configuration-reference/
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://tailwindcss.com/docs/installation/framework-guides/astro
import tailwindcss from '@tailwindcss/vite';

import { visit } from 'unist-util-visit';

import {
  STRAPI_URL,
  STRAPI_IMAGE_REMOTE_PATTERN,
  i18nConfig
} from './src/settings';

//----------------------------------------------------------------------------//

// https://github.com/eslint/eslint/discussions/15305
import { readFileSync } from 'fs';
const packageJSON = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf-8' })
);

const { name, github_pages } = packageJSON;
const isGitHubPagesBuild = !!process.env.GITHUB_PAGES;
const isGitHubPagesPreview = !!process.env.GITHUB_PAGES_PREVIEW;

//----------------------------------------------------------------------------//
/* @begin: remark-plugin > fix images paths */
// https://thevalleyofcode.com/lesson/astro-content/markdown-image-path/

interface CustomDataProperties {
  // required: original src
  src: string;
  alt: string;

  // any getImage options:
  format: string;
  widths: number[];
  quality: number;
  loading: string;
  decoding: string;
  inferSize: boolean;
  index: number;
}

interface CustomData extends Data {
  hProperties?: CustomDataProperties;
}

interface CustomNode extends Node {
  url: string;
  alt?: string;

  data?: CustomData;

  properties?: any;
}

const fixImagePaths: RemarkPlugin = (_options) => {
  const UPLOADS_PREFIX = '/uploads/';
  const STRAPI_UPLOADS_PREFIX = `${STRAPI_URL}${UPLOADS_PREFIX}`;

  let index = 0;

  /*
    how to write a remark plugin that uses the astro getImage to download and optimize images from a markdown content | Perplexity.ai
    https://www.perplexity.ai/search/how-to-download-and-optimize-t-3TpcbuT4QyaEaZjAUGpkaw#1
  */
  const setStrapiCMSImageProperties = (node: CustomNode) => {
    if (!node.url.startsWith(STRAPI_UPLOADS_PREFIX)) return;

    // TODO: remove
    console.log(`Strapi CMS Image > ${node.url}`);

    // Ensure data and hProperties objects
    node.data ||= {};
    node.data.hProperties ||= {} as CustomDataProperties;

    // These props are serialized into __ASTRO_IMAGE_ and later used by getImage
    // https://docs.astro.build/en/reference/modules/astro-assets/#getimage
    Object.assign(node.data.hProperties, {
      // required: original src
      src: node.url,
      alt: node.alt || '',

      // any getImage options:
      format: 'webp', // or ['webp', 'avif', 'png']
      widths: [480, 768, 1200],
      quality: 80,
      loading: 'lazy',
      decoding: 'async',

      // Remote‑specific helper: infer dimensions if you don't know them
      inferSize: true,

      // Used by Astro to distinguish multiple occurrences of same src
      index: index++
    });
  };

  const visitor: Visitor<CustomNode> = (node) => {
    const url = node.url;

    if (url.startsWith('http') || url.startsWith('/img')) {
      return;
    }

    if (url.startsWith('/src/')) {
      node.url = url.replace('/src/', '~/');
    }

    if (url.startsWith(UPLOADS_PREFIX)) {
      node.url = url.replace(UPLOADS_PREFIX, `${STRAPI_UPLOADS_PREFIX}`);
    }

    setStrapiCMSImageProperties(node);
  };

  return (tree) => {
    visit(tree, 'image', visitor as any);
  };
};

/* @end: remark-plugin > fix images paths */
//----------------------------------------------------------------------------//

const baseConfig: AstroUserConfig = {
  i18n: i18nConfig,

  image: {
    //domains: [STRAPI_IMAGE_REMOTE_PATTERN.hostname],
    remotePatterns: [STRAPI_IMAGE_REMOTE_PATTERN]
  },

  markdown: {
    shikiConfig: {
      theme: 'github-light'
    },
    remarkPlugins: [fixImagePaths]
  },

  integrations: [mdx()],

  vite: {
    plugins: [tailwindcss()],

    // https://docs.astro.build/en/recipes/customizing-output-filenames/
    build: {
      rollupOptions: {
        output: {
          // path names relative to `outDir`
          entryFileNames: '_astro/js/[name]-[hash].js',
          chunkFileNames: '_astro/js/chunks/[name]-[hash].js',
          assetFileNames: '_astro/static/[name]-[hash][extname]'
        }
      }
    }
  }
};

// https://docs.astro.build/en/guides/deploy/github/#configure-astro-for-github-pages
const config = isGitHubPagesBuild
  ? {
      ...baseConfig,
      site: isGitHubPagesPreview ? undefined : github_pages,
      base: `/${name}`
    }
  : baseConfig;

// https://astro.build/config
export default defineConfig(config);
