# astro-ts-tw-hello [![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/erkobridee/astro-ts-tw-hello)

[Astro Build](https://astro.build/) using [TypeScript](https://www.typescriptlang.org/) plus [TailwindCSS](https://tailwindcss.com/)

## Local Development

- [VS Code](https://code.visualstudio.com/) + [Development Containers](https://containers.dev/) ( [Customizations](https://containers.dev/supporting#visual-studio-code) | [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) )
  - [[GitHub] erkobridee/devcontainer-hello](https://github.com/erkobridee/devcontainer-hello) - Learning about Development Containers

## import path alias

It's commonly used the pattern `@* -> src/*`, but this approach annoys me due to the current npm package namespaces ( [scopes | npm docs](https://docs.npmjs.com/about-scopes) ) which normally starts with `@{user_name/org_name}`.

Following a Unix OS approach, that beens said so we have the following alias mapping `~/* -> src/*` ( [tsconfig.json](/tsconfig.json) ) which avoid the issue from `@`.

## Astro

- [[YouTube] Astro in 100 Seconds | Fireship](https://www.youtube.com/watch?v=dsTXcSeAZq8) ( 2021-07-15 )

- [Astro Docs](https://docs.astro.build/en/getting-started/)
  - [Install and set up Astro](https://docs.astro.build/en/install-and-setup/)

  - [Project Structure | Astro Docs](https://docs.astro.build/en/basics/project-structure/)

  - [Import Aliases | Astro Docs](https://docs.astro.build/en/guides/aliases/)

  - [Markdown & MDX | Astro Docs](https://docs.astro.build/en/guides/markdown-content/)
    - [Configuring Markdown and MDX](https://docs.astro.build/en/guides/markdown-content/#configuring-markdown-and-mdx)

  - [View Transitions | Astro Docs](https://docs.astro.build/en/guides/view-transitions/)
    - [astro:after-swap](https://docs.astro.build/en/guides/view-transitions/#astroafter-swap)

    - [Astro View Transitions | Chrome for Developers](https://developer.chrome.com/blog/astro-view-transitions?hl=en) - [live](https://live-transitions.pages.dev/), [source code](https://github.com/Charca/view-transitions-live)

  - [Deploy your Astro Site to GitHub Pages | Astro Docs](https://docs.astro.build/en/guides/deploy/github/)
    - [[GitHub] withastro/github-pages](https://github.com/withastro/github-pages) - Automatically deploy an Astro site to GitHub Pages

    - [Create gh-pages branch in existing repo | jf](https://jiafulow.github.io/blog/2020/07/09/create-gh-pages-branch-in-existing-repo/)

  - [Deprecated] [@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)
    - [Tailwind 4 support](https://astro.build/blog/astro-520/#tailwind-4-support) >>> [Astro TailwindCSS Integration](https://docs.astro.build/en/guides/styling/#tailwind) >>> [Install Tailwind CSS v4 with Astro](https://tailwindcss.com/docs/installation/framework-guides/astro)

### Editor Setup

- [Editor Setup | Astro Docs](https://docs.astro.build/en/editor-setup/)
  - [ESLint](https://docs.astro.build/en/editor-setup/#eslint)
    - [[GitHub] ota-meshi/eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro)

  - [Prettier](https://docs.astro.build/en/editor-setup/#prettier)
    - [[GitHub] withastro/prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro)

- [Get VSCode, eslint & prettier working with Astro | Geek's blog](https://patheticgeek.dev/blog/astro-prettier-eslint-vscode) (2023/02/11)

- [Effortless Code Styling: Configuring Astro with Prettier, ESLint, and Tailwind CSS | Raj Vadeghar](https://r44j.dev/blog/beginner-s-guide-to-setting-up-astro-astro-prettier-eslint-tailwind-css/) (2024/03/03)

## Test it online

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/erkobridee/astro-ts-tw-hello)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/erkobridee/astro-ts-tw-hello?devcontainer_path=.devcontainer/devcontainer.json)

## Setup a new project using this repository

You can use the `Use this template` button

### degit

```sh
npx degit erkobridee/astro-ts-tw-hello {project_name}
```

### create a new project based on a GitHub repository’s main branch

```sh
npm create astro@latest -- --template erkobridee/astro-ts-tw-hello
```
