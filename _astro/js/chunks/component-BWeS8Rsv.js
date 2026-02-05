import { b as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, e as renderSlot, a as renderTemplate, f as renderJSX, g as createVNode, r as renderComponent, F as Fragment, u as unescapeHTML } from './astro/server-D0T6fP_R.js';
import 'piccolore';
import 'clsx';
import { c as cn, b as STRAPI_URL } from './index-wSZY7w-1.js';
import { $ as $$Image } from './_astro_assets-11uqjeIe.js';
import { transform, __unsafeHTML } from 'ultrahtml';
import sanitize from 'ultrahtml/transformers/sanitize';
import swap from 'ultrahtml/transformers/swap';
import { Marked } from 'marked';
import markedFootnote from 'marked-footnote';
import { markedSmartypants } from 'marked-smartypants';
import * as entities from 'entities';

const $$Astro$6 = createAstro("https://erkobridee.github.io");
const $$TailwindTypographyProse = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$TailwindTypographyProse;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cn("prose max-w-[90vw]", className), "class")}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/x-bridee.e/dev_personal/strapicms-astro-client/src/components/TailwindTypographyProse.astro", void 0);

function createComponentProxy(result, _components = {}) {
  const components = {};
  for (const [key, value] of Object.entries(_components)) {
    if (typeof value === "string") {
      components[key] = value;
    } else {
      components[key] = async (props, children) => {
        if (key === "CodeBlock" || key === "CodeSpan") {
          props.code = entities.decode(JSON.parse(`"${props.code}"`));
        }
        const output = await renderJSX(
          result,
          createVNode(value, { ...props, "set:html": children.value })
        );
        return __unsafeHTML(output);
      };
    }
  }
  return components;
}
function getIndent(ln) {
  if (ln.trimStart() === ln) return "";
  return ln.slice(0, ln.length - ln.trimStart().length);
}
function dedent(str) {
  const lns = str.replace(/^[\r\n]+/, "").split("\n");
  let indent = getIndent(lns[0]);
  if (indent.length === 0 && lns.length > 1) {
    indent = getIndent(lns[1]);
  }
  if (indent.length === 0) return lns.join("\n");
  return lns.map((ln) => ln.startsWith(indent) ? ln.slice(indent.length) : ln).join("\n");
}
async function markdown(input, opts = {}, markedExtenstion = []) {
  const renderer = {};
  if (opts.components) {
    if ("Note" in opts.components) {
      renderer.blockquote = (text) => {
        const lines = text.split("\n");
        const ln = lines[0].replace("<p>", "");
        if (ln === "<strong>Note</strong>") {
          return `<Note type="note"><p>${lines.slice(1).join("\n")}</Note>`;
        }
        if (ln === "<strong>Warning</strong>") {
          return `<Note type="warning"><p>${lines.slice(1).join("\n")}</Note>`;
        }
        return `<blockquote>${text}</blockquote>`;
      };
    }
    if ("Heading" in opts.components) {
      renderer.heading = (children, level, raw, slugger) => {
        return `<Heading as="h${level}" text="${raw}">${children}</Heading>`;
      };
    }
    if ("CodeBlock" in opts.components) {
      renderer.code = (code, meta = "") => {
        const info = meta.split(/\s+/g) ?? [];
        const lang = info[0] ?? "plaintext";
        const value = JSON.stringify(entities.encode(code));
        return `<CodeBlock lang=${JSON.stringify(lang)} code=${value} ${info.splice(1).join(" ")} />`;
      };
    }
    if ("CodeSpan" in opts.components) {
      renderer.codespan = (code) => {
        const value = JSON.stringify(entities.encode(code));
        return `<CodeSpan code=${value}>${code}</CodeSpan>`;
      };
    }
  }
  const instance = new Marked(markedSmartypants(), markedFootnote(), ...markedExtenstion, {
    gfm: true,
    renderer
  });
  const content = await instance.parse(dedent(input));
  return transform(content, [
    swap(opts.components),
    sanitize(opts.sanitize)
  ]);
}
async function html(input, opts = {}) {
  return transform(dedent(input), [
    sanitize(opts.sanitize),
    swap(opts.components)
  ]);
}

const $$Astro$5 = createAstro("https://erkobridee.github.io");
const $$Markdown = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Markdown;
  const input = Astro2.props.content ?? await Astro2.slots.render("default");
  if (!input) {
    throw new Error("Unable to render <Markdown> without a content prop or children");
  }
  const components = createComponentProxy($$result, Astro2.props.components);
  const content = await markdown(input, { sanitize: Astro2.props.sanitize, components }, Astro2.props.marked?.extensions);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`;
}, "/home/x-bridee.e/dev_personal/strapicms-astro-client/node_modules/astro-remote/lib/Markdown.astro", void 0);

const $$Astro$4 = createAstro("https://erkobridee.github.io");
const $$Markup = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Markup;
  const input = Astro2.props.content ?? await Astro2.slots.render("default");
  if (!input) {
    throw new Error("Unable to render <Markup> without a content prop or children");
  }
  const components = createComponentProxy($$result, Astro2.props.components);
  const content = await html(input, { sanitize: Astro2.props.sanitize, components });
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`${unescapeHTML(content)}` })}`;
}, "/home/x-bridee.e/dev_personal/strapicms-astro-client/node_modules/astro-remote/lib/Markup.astro", void 0);

const $$Astro$3 = createAstro("https://erkobridee.github.io");
const $$MarkdownImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MarkdownImage;
  const UPLOADS_PREFIX = "/uploads/";
  const STRAPI_UPLOADS_PREFIX = `${STRAPI_URL}${UPLOADS_PREFIX}`;
  const { src: initialSrc, alt } = Astro2.props;
  const src = initialSrc.startsWith(UPLOADS_PREFIX) ? initialSrc.replace(UPLOADS_PREFIX, STRAPI_UPLOADS_PREFIX) : initialSrc;
  return renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": src, "alt": alt, "inferSize": true })}`;
}, "/home/x-bridee.e/dev_personal/strapicms-astro-client/src/components/RemoteMarkdown/MarkdownImage.astro", void 0);

const $$Astro$2 = createAstro("https://erkobridee.github.io");
const $$Component$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Component$1;
  const { content } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Markdown", $$Markdown, { "content": content, "components": { img: $$MarkdownImage } })}`;
}, "/home/x-bridee.e/dev_personal/strapicms-astro-client/src/components/RemoteMarkdown/component.astro", void 0);

const $$Astro$1 = createAstro("https://erkobridee.github.io");
const $$HTMLImage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HTMLImage;
  const { src, alt } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": src, "alt": alt, "inferSize": true })}`;
}, "/home/x-bridee.e/dev_personal/strapicms-astro-client/src/components/RemoteHTML/HTMLImage.astro", void 0);

const $$Astro = createAstro("https://erkobridee.github.io");
const $$Component = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Component;
  const { content } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Markup", $$Markup, { "content": content, "components": { img: $$HTMLImage } })}`;
}, "/home/x-bridee.e/dev_personal/strapicms-astro-client/src/components/RemoteHTML/component.astro", void 0);

export { $$TailwindTypographyProse as $, $$Component$1 as a, $$Component as b };
