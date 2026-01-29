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

- [Astro & Strapi Website Tutorial: Part 3 - Project Build | Strapi Blog](https://strapi.io/blog/astro-and-strapi-website-tutorial-part-3-project-build)
