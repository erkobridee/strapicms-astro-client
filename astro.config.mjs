// https://docs.astro.build/en/reference/configuration-reference/
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://tailwindcss.com/docs/installation/framework-guides/astro
import tailwindcss from '@tailwindcss/vite';

import { STRAPI_IMAGE_REMOTE_PATTERN, i18nConfig } from './src/settings';

//----------------------------------------------------------------------------//

// https://github.com/eslint/eslint/discussions/15305
import { readFileSync } from 'fs';
const packageJSON = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf-8' })
);

const { name, github_pages } = packageJSON;
const isGitHubPagesBuild = !!process.env.GITHUB_PAGES;
const isGitHubPagesPreview = !!process.env.GITHUB_PAGES_PREVIEW;

/** @type {import('astro').AstroUserConfig} */
const baseConfig = {
  i18n: i18nConfig,

  integrations: [mdx()],

  image: {
    remotePatterns: [STRAPI_IMAGE_REMOTE_PATTERN]
  },

  vite: {
    plugins: [tailwindcss()]
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
