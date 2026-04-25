// Production-Ready callout — light section with heading, body, View
// Docs / Get Free API Key buttons, and an optional code-block image
// rendered below. Sits inside the white block between the bento and
// the dark Security section. Layout matches Figma node 163:19160.
//
// The code block is intentionally a static image (exported from the
// Figma asset) rather than SSR'd <pre> text — it ships pixel-perfect
// without paying for a syntax-highlighting runtime.

import Image from "next/image";

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
};

export function LibraryGetStartedCallout({
  heading,
  body,
  viewDocsHref,
  getApiKeyHref,
  codeImage,
}: LibraryGetStartedCalloutProps) {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "0 80px 100px", gap: 40 }}
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
    </section>
  );
}
