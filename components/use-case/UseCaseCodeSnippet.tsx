// Code preview block — light card containing a syntax-highlighted code
// sample. Mirrors Framer `code` (formattedText). Uses the same shiki
// theme + setup as LibraryGetStartedCallout so blog/library/use-case
// pages share one visual idiom for inline code.

import { codeToHtml } from "shiki";

export type UseCaseCodeSnippetProps = {
  code?: string | null;
  language?: string | null;
};

export async function UseCaseCodeSnippet({ code, language }: UseCaseCodeSnippetProps) {
  if (!code) return null;

  const html = await codeToHtml(code, {
    lang: language || "tsx",
    theme: "github-light",
    transformers: [
      {
        pre(node) {
          // Strip the default shiki background so our wrapper bg shows.
          if (node.properties.style) {
            node.properties.style = String(node.properties.style)
              .replace(/background-color:[^;]*;?/, "")
              .replace(/background:[^;]*;?/, "");
          }
        },
      },
    ],
  });

  return (
    <section
      className="w-full flex flex-col items-center"
      style={{ padding: "60px 20px" }}
    >
      <div
        className="w-full overflow-hidden"
        style={{
          maxWidth: 960,
          background: "#fafafa",
          border: "1px solid #e5e5e5",
          borderRadius: 16,
        }}
      >
        <div
          className="font-mono"
          style={{
            padding: "24px 28px",
            fontSize: 14,
            lineHeight: 1.6,
            overflowX: "auto",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}
