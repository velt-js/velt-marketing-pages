import { PortableText as SanityPortableText } from "@portabletext/react";
import type {
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import { urlFor } from "@/sanity/imageUrl";

type SanityImageValue = {
  asset?: { _ref?: string; url?: string };
  alt?: string;
  caption?: string;
};

/**
 * Renders a Sanity body image as a figure with an optional caption, sized
 * for the editorial article measure.
 * @param params Portable Text type props.
 * @param params.value The image value (asset ref/url + alt + caption).
 * @returns The figure element, or null when no source resolves.
 */
function renderBodyImage({ value }: { value: SanityImageValue }) {
  try {
    const src = value?.asset?._ref
      ? urlFor(value).width(1200).fit("max").auto("format").url()
      : value?.asset?.url || "";
    if (!src) return null;
    return (
      <figure className="blog-prose-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={value?.alt || ""} className="blog-prose-img" />
        {value?.caption ? (
          <figcaption className="blog-prose-caption">{value.caption}</figcaption>
        ) : null}
      </figure>
    );
  } catch {
    return null;
  }
}

// Editorial (light) Portable Text mapping. Styling lives in BlogArticle.css
// under `.vlp .blog-prose` so it tracks the --vlp design tokens.
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="blog-prose-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="blog-prose-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="blog-prose-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="blog-prose-h4">{children}</h4>,
    normal: ({ children }) => <p className="blog-prose-p">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="blog-prose-quote">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="blog-prose-ul">{children}</ul>,
    number: ({ children }) => <ol className="blog-prose-ol">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="blog-prose-li">{children}</li>,
    number: ({ children }) => <li className="blog-prose-li">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="blog-prose-strong">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code className="blog-prose-code">{children}</code>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="blog-prose-link"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    code: ({ value }) => (
      <pre className="blog-prose-pre">
        <code>{value?.code}</code>
      </pre>
    ),
    image: renderBodyImage,
    blogBodyImage: renderBodyImage,
    table: ({ value }) => {
      const rows = (value?.rows ?? []) as Array<{
        _key?: string;
        cells?: string[];
      }>;
      if (rows.length === 0) return null;
      const [headerRow, ...bodyRows] = rows;
      return (
        <div className="blog-prose-table-wrap">
          <table className="blog-prose-table">
            {headerRow?.cells ? (
              <thead>
                <tr>
                  {headerRow.cells.map((cell, index) => (
                    <th key={index}>{cell}</th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr key={row._key ?? rowIndex}>
                  {(row.cells ?? []).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

/**
 * Renders Sanity Portable Text body content in the editorial light theme.
 * @param params Component props.
 * @param params.value The Portable Text blocks to render.
 * @returns The rendered article body.
 */
export function BlogPortableText({ value }: { value: PortableTextBlock[] }) {
  return <SanityPortableText value={value} components={components} />;
}
