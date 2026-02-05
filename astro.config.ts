import type { AstroUserConfig } from 'astro';
import type { RemarkPlugin } from '@astrojs/markdown-remark';
import type { Node } from 'unist';
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

interface CustomNode extends Node {
  url: string;
  alt?: string;
}

const fixImagePaths: RemarkPlugin = (_options) => {
  const UPLOADS_PREFIX = '/uploads/';
  const STRAPI_UPLOADS_PREFIX = `${STRAPI_URL}${UPLOADS_PREFIX}`;

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
