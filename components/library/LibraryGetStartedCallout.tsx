// Production-Ready callout — light section with heading, body, View
// Docs / Get Free API Key buttons, and an optional code block rendered
// below. Sits inside the white block between the bento and the dark
// Security section. Layout matches Figma node 163:19160.
//
// Two ways to render the code block:
//   - codeImage: legacy path, renders a static PNG/SVG (kept for back-
//     compat with any docs that still ship a Figma export).
//   - codeSnippet: text + language, syntax-highlighted at SSR via shiki
//     using a custom theme that mirrors Sandpack's atom-one-light token
//     mapping (definition→amber, property→blue, etc.). Zero client JS.

import Image from "next/image";
import { codeToHtml, type ThemeRegistration } from "shiki";

type LibraryGetStartedCalloutProps = {
  heading: string;
  body: string;
  viewDocsHref: string;
  getApiKeyHref: string;
  /** Static PNG/SVG of the code snippet, sized at its natural Figma
   *  export resolution. Rendered centered, max-width 1280. */
  codeImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Inline text snippet rendered when codeImage is absent. */
  codeSnippet?: {
    code: string;
    language?: string;
  };
};

// Mirrors Sandpack's atom-one-light CSS variables on velt.dev/libraries/*.
// Token-color mapping is intentional: function calls render in the
// "definition" amber, object keys in "property" blue.
const VELT_LIGHT_THEME: ThemeRegistration = {
  name: "velt-light",
  type: "light",
  colors: {
    "editor.background": "#fafafa",
    "editor.foreground": "#383a42",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#a0a1a7", fontStyle: "italic" },
    },
    // Override before the broader storage.type rule so the arrow operator
    // stays dark instead of inheriting the keyword purple.
    {
      scope: ["storage.type.function.arrow"],
      settings: { foreground: "#383a42" },
    },
    {
      scope: [
        "keyword.control",
        "keyword.control.flow",
        "keyword.control.import",
        "keyword.control.export",
        "keyword.control.from",
        "keyword.control.conditional",
        "keyword.control.loop",
        "keyword.other",
        "storage.type",
        "storage.type.class",
        "storage.modifier",
        "keyword.operator.new",
        "keyword.operator.expression.typeof",
        "keyword.operator.expression.instanceof",
      ],
      settings: { foreground: "#a626a4" },
    },
    {
      scope: [
        "string",
        "string.quoted",
        "string.template",
        "punctuation.definition.string",
      ],
      settings: { foreground: "#50a14f" },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.language.boolean",
        "support.class",
        "entity.name.type",
        "variable.other.constant",
      ],
      settings: { foreground: "#986801" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call entity.name.function",
        "variable.function",
        "entity.name.tag",
      ],
      settings: { foreground: "#c18401" },
    },
    {
      scope: [
        "variable.parameter",
        "variable.other.property",
        "meta.object-literal.key",
        "support.type.property-name",
        "meta.definition.property variable",
        "string.unquoted.label",
      ],
      settings: { foreground: "#4078f2" },
    },
    {
      scope: ["entity.name.tag.html", "entity.name.tag.jsx", "support.class.component"],
      settings: { foreground: "#c18401" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#4078f2" },
    },
    {
      scope: [
        "punctuation",
        "punctuation.separator",
        "punctuation.terminator",
        "punctuation.section",
        "meta.brace",
      ],
      settings: { foreground: "#383a42" },
    },
    {
      scope: ["variable", "variable.other"],
      settings: { foreground: "#383a42" },
    },
  ],
};

async function highlight(code: string, language: string) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: VELT_LIGHT_THEME,
    transformers: [
      {
        // Strip shiki's default background so our wrapper background shows.
        pre(node) {
          const style = node.properties.style;
          if (typeof style === "string") {
            node.properties.style = style.replace(
              /background-color:\s*[^;]+;?/g,
              "",
            );
          }
          delete node.properties.tabindex;
        },
      },
    ],
  });
  return html;
}

export async function LibraryGetStartedCallout({
  heading,
  body,
  viewDocsHref,
  getApiKeyHref,
  codeImage,
  codeSnippet,
}: LibraryGetStartedCalloutProps) {
  const snippetHtml =
    !codeImage && codeSnippet?.code
      ? await highlight(codeSnippet.code, codeSnippet.language || "tsx")
      : null;

  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
          style={{ padding: "150px 80px 60px", gap: 40 }}
    >
      <div className="flex flex-col items-center" style={{ gap: 32 }}>
        <div
          className="flex flex-col items-center text-center"
          style={{ gap: 12, maxWidth: 820 }}
        >
          <h2
            className="font-urbanist font-bold capitalize"
            style={{
              color: "#111",
              fontSize: 52,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            {heading}
          </h2>
          <p
            className="font-urbanist"
            style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}
          >
            {body}
          </p>
        </div>

        <div className="flex items-start" style={{ gap: 12 }}>
          <a
            href={viewDocsHref}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-1 rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              border: "2px solid #625df5",
              textDecoration: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/icon-book-2.svg"
              alt=""
              width={18}
              height={18}
            />
            <span
              className="font-urbanist font-semibold whitespace-nowrap"
              style={{
                color: "#fff",
                fontSize: 16,
                letterSpacing: "-0.03em",
                // Exclusion blend renders white text as black-ish on white,
                // matching the Figma's outlined-button text color while
                // staying consistent with the "View Docs" buttons elsewhere
                // on the site.
                mixBlendMode: "exclusion",
              }}
            >
              View Docs
            </span>
          </a>
          <a
            href={getApiKeyHref}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              background: "#625df5",
              textDecoration: "none",
            }}
          >
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em" }}
            >
              Get Free API Key
            </span>
          </a>
        </div>
      </div>

      {codeImage && (
        <div
          className="w-full flex items-center justify-center"
          style={{ maxWidth: 1280 }}
        >
          {/* The Figma PNG has its rounded #f7f7f6 container baked in,
              but the export carries a few pixels of dark anti-aliasing
              outside the rounded shape. Clipping the wrapper at the
              card's radius and scaling the image up by a hair crops
              that fringe inside the wrapper so only the clean card
              fill is visible. */}
          <div
            className="overflow-hidden"
            style={{ borderRadius: 28, lineHeight: 0 }}
          >
            <Image
              src={codeImage.src}
              alt={codeImage.alt}
              width={codeImage.width}
              height={codeImage.height}
              sizes={`${codeImage.width}px`}
              style={{
                display: "block",
                maxWidth: "100%",
                height: "auto",
                transform: "scale(1.02)",
                transformOrigin: "center",
              }}
            />
          </div>
        </div>
      )}

      {snippetHtml && (
        <div
          className="library-code-block overflow-hidden"
          style={{
            width: "100%",
            maxWidth: 820,
            borderRadius: 15,
            background: "#fafafa",
            padding: "30px",
            fontSize: 14,
            lineHeight: 1.5,
            fontFamily:
              '"Fragment Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
          }}
          dangerouslySetInnerHTML={{ __html: snippetHtml }}
        />
      )}
    </section>
  );
}
