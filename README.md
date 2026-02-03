# strapicms-astro-client [ 🚧 under development... 🚧 ]

- Project template [[GitHub] erkobridee/astro-ts-tw-hello](https://github.com/erkobridee/astro-ts-tw-hello)

- This project is a frontend for [[GitHub] erkobridee/strapicms-server](https://github.com/erkobridee/strapicms-server)

## Local Development

- [VS Code](https://code.visualstudio.com/) + [Development Containers](https://containers.dev/) ( [Customizations](https://containers.dev/supporting#visual-studio-code) | [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) )
  - [[GitHub] erkobridee/devcontainer-hello](https://github.com/erkobridee/devcontainer-hello) - Learning about Development Containers

## import path alias

It's commonly used the pattern `@* -> src/*`, but this approach annoys me due to the current npm package namespaces ( [scopes | npm docs](https://docs.npmjs.com/about-scopes) ) which normally starts with `@{user_name/org_name}`.

Following a Linux/Unix OS approach, we have the following alias mapping `~/* -> src/*` ( [tsconfig.json](/tsconfig.json) ) which avoids the issue from `@`.

## Useful References

- [Strapi Headless CMS](https://strapi.io/)
  - [REST API reference](https://docs.strapi.io/cms/api/rest)
    - [Build your query URL with Strapi's interactive tool](https://docs.strapi.io/cms/api/rest/interactive-query-builder)

    - [REST API: locale](https://docs.strapi.io/cms/api/rest/locale)

  - [Strapi Client](https://docs.strapi.io/cms/api/client)
    - [[GitHub] strapi/client](https://github.com/strapi/client) - A client library for easily interfacing with Strapi from your JavaScript/TypeScript project
      - [demo/node-typescript](https://github.com/strapi/client/tree/e01be2ea130d5724f62bec4f4b5f4d20aee97d24/demo/node-typescript)

  - [[GitHub] PaulBratslavsky/strapi-community-astro-loader](https://github.com/PaulBratslavsky/strapi-community-astro-loader) - [src/strapi-loader.ts](https://github.com/PaulBratslavsky/strapi-community-astro-loader/blob/6406c201987f7c37eb86256412c46e315f380e55/src/strapi-loader.ts#L61-L64)

- [Strapi & Astro | Astro Docs](https://docs.astro.build/en/guides/cms/strapi/)

- [Integrate Astro with Strapi | Strapi](https://strapi.io/integrations/astro)

- [Building faster content-driven sites with Astro | Strapi Blog](https://strapi.io/blog/building-faster-content-driven-sites-with-astro)
  - [Astro & Strapi Website Tutorial: Part 3 - Project Build | Strapi Blog](https://strapi.io/blog/astro-and-strapi-website-tutorial-part-3-project-build)

- [Lightning Fast Building with Strapi & Astro | Strapi Blog](https://strapi.io/blog/lightning-fast-building-with-strapi-and-astro)
  - [[GitHub] VirtusLab-Open-Source/astro-strapi-starter](https://github.com/VirtusLab-Open-Source/astro-strapi-starter) - The Strapi x Astro Starter template

- [Add Pagination & Infinite Scrolling in Astro.js Using Strapi 5 | Strapi Blog](https://strapi.io/blog/implement-pagination-and-infinite-scrolling-in-astro-js-with-strapi)
  - [[GitHub] preshenv/astro_infinite_scrolling_app](https://github.com/preshenv/astro_infinite_scrolling_app)

- [Build a custom loader with Astro and Strapi 5 | Strapi Blog](https://strapi.io/blog/how-to-create-a-custom-astro-loader-for-strapi-using-content-layer-api)
  - [[GitHub] PaulBratslavsky/strapi-community-astro-loader](https://github.com/PaulBratslavsky/strapi-community-astro-loader)

- [astro download headless cms images on build | Perplexity.ai](https://www.perplexity.ai/search/astro-download-headless-cms-im-fDKc3oryT9WVax82bPST.w)

### Astro

- [Content: Embed images in markdown without relative path | The Valley of Code](https://thevalleyofcode.com/lesson/astro-content/markdown-image-path/)

#### Astro Content

- [Content Layer: A Deep Dive | Astro Blog](https://astro.build/blog/content-layer-deep-dive/)

- [Content collections | Guides - Astro Docs](https://docs.astro.build/en/guides/content-collections/)
  - [Defining the collection loader](https://docs.astro.build/en/guides/content-collections/#defining-the-collection-loader)

- [Content Collections API Reference | Astro Docs](https://docs.astro.build/en/reference/modules/astro-content/)
  - [Rendering body content](https://docs.astro.build/en/guides/content-collections/#rendering-body-content)

- [Astro Content Loader API | Astro Docs](https://docs.astro.build/en/reference/content-loader-reference/)
  - [renderMarkdown](https://docs.astro.build/en/reference/content-loader-reference/#rendermarkdown)
