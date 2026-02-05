# strapicms-astro-client

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

#### Astro Assets

- [Image and Assets API Reference | Astro Docs](https://docs.astro.build/en/reference/modules/astro-assets/)

- [Content: Embed images in markdown without relative path | The Valley of Code](https://thevalleyofcode.com/lesson/astro-content/markdown-image-path/)

- [Astro Background Caching and CDN Image Optimization | Asep Alazhari](https://asepalazhari.com/blog/astro-background-caching-cdn-image-optimization)

- [Mastering Astro.js Images | Caisy](https://caisy.io/blog/astro-js-images)

- [How to use optimized images in Astro | Fogbender](https://fogbender.com/blog/optimize-images-in-astro-with-assets-integration/)

- [Preloading images with Astro | Alex Nguyen - Web Developer](https://alexnguyen.co.nz/blog/preloading-images-with-astro/)

- [Cache Astro images across GitHub Action runs | Daniel Farquhar-Wulff’s blog](https://danielwulff.dev/blog/cache-astro-images-across-github-action-runs/)
  - [[GitHub] danwulff/astro-image-cache](https://github.com/danwulff/astro-image-cache) - Example of how to cache images between github action runs for astro projects

#### Astro Content

- [Content Layer: A Deep Dive | Astro Blog](https://astro.build/blog/content-layer-deep-dive/)

- [Content collections | Guides - Astro Docs](https://docs.astro.build/en/guides/content-collections/)
  - [Defining the collection loader](https://docs.astro.build/en/guides/content-collections/#defining-the-collection-loader)

- [Content Collections API Reference | Astro Docs](https://docs.astro.build/en/reference/modules/astro-content/)
  - [Rendering body content](https://docs.astro.build/en/guides/content-collections/#rendering-body-content)

- [Astro Content Loader API | Astro Docs](https://docs.astro.build/en/reference/content-loader-reference/)
  - [renderMarkdown](https://docs.astro.build/en/reference/content-loader-reference/#rendermarkdown)

- [[GitHub] natemoo-re/astro-remote](https://github.com/natemoo-re/astro-remote) - Render remote HTML or Markdown content in Astro with full control over the output

#### Astro known issue

- [Missing support for remote image configuration at the content-layer · Issue #15417 · withastro/astro](https://github.com/withastro/astro/issues/15417)

**Astro version:** `v5.17.x`

**Description:** Missing of remote image support for the content processed by the Astro Collections, which uses the `content-layer` ( `createMarkdownProcessor` [line 144](https://github.com/withastro/astro/blob/astro%405.17.1/packages/astro/src/content/content-layer.ts#L144) ). The remote image is only supported on the local files by `vite-plugin-markdown` ( `createMarkdownProcessor` [line 64](https://github.com/withastro/astro/blob/astro%405.17.1/packages/astro/src/vite-plugin-markdown/index.ts#L64) ). Both places uses `@astrojs/markdown-remark` ( `createMarkdownProcessor` ).

**Current solution / workaround:** ( _20260205_ ) Use the `astro-remote` library to render the markdown content and define a custom image component to be used and correctly process the image defined inside of the markdow content.

**Example of the issue**

- https://erkobridee.com/strapicms-astro-client/en/blogs/content-with-images/

- `src/pages/[locale]/blogs/[slug].astro`
  - `astro:content` ( lines [127](https://github.com/erkobridee/strapicms-astro-client/blob/8b3c0e5731f783c26dda286ec2b26958853dedaf/src/pages/%5Blocale%5D/blogs/%5Bslug%5D.astro#L127) and [218](https://github.com/erkobridee/strapicms-astro-client/blob/8b3c0e5731f783c26dda286ec2b26958853dedaf/src/pages/%5Blocale%5D/blogs/%5Bslug%5D.astro#L218) )

  - `astro-remote - Markdown` ( [line 229](https://github.com/erkobridee/strapicms-astro-client/blob/8b3c0e5731f783c26dda286ec2b26958853dedaf/src/pages/%5Blocale%5D/blogs/%5Bslug%5D.astro#L229) )
    - [RemoteMarkdown](https://github.com/erkobridee/strapicms-astro-client/blob/8b3c0e5731f783c26dda286ec2b26958853dedaf/src/components/RemoteMarkdown/component.astro)
      - [MarkdownImage](https://github.com/erkobridee/strapicms-astro-client/blob/8b3c0e5731f783c26dda286ec2b26958853dedaf/src/components/RemoteMarkdown/MarkdownImage.astro)

  - `astro-remote - RemoteHTML` ( [line 240](https://github.com/erkobridee/strapicms-astro-client/blob/8b3c0e5731f783c26dda286ec2b26958853dedaf/src/pages/%5Blocale%5D/blogs/%5Bslug%5D.astro#L240C8-L240C18) )
    - [RemoteHTML](https://github.com/erkobridee/strapicms-astro-client/blob/8b3c0e5731f783c26dda286ec2b26958853dedaf/src/components/RemoteHTML/component.astro)
      - [HTMLImage](https://github.com/erkobridee/strapicms-astro-client/blob/8b3c0e5731f783c26dda286ec2b26958853dedaf/src/components/RemoteHTML/HTMLImage.astro)

**Suggested Solution:** at the Astro code base, update the code of `content-layer` ( `createMarkdownProcessor` [line 143](https://github.com/withastro/astro/blob/astro%405.17.1/packages/astro/src/content/content-layer.ts#L143) ) to something like the following

```js
async #processMarkdown(content: string): Promise<RenderedContent> {
  const config = this.#settings.config;
  this.#markdownProcessor ??= await createMarkdownProcessor({
    image: config.image,
    experimentalHeadingIdCompat: config.experimental.headingIdCompat,
    ...config.markdown
  });
  const { code, metadata } = await this.#markdownProcessor.render(content);
  return {
    html: code,
    metadata,
  };
}
```
