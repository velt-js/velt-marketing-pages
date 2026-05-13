// Example showcase — a media slot (video or image) on one side, a list
// of Velt features + sandbox/docs CTAs on the other. Mirrors Framer
// `example__*`. Both columns are optional; renders only the populated
// half when the other is empty.

import { Media } from "../comparison/Media";

export type UseCaseExampleSectionProps = {
  videoSrc?: string | null;
  imageSrc?: string | null;
  exampleUrl?: string | null;
  sandboxLink?: string | null;
  docsLink?: string | null;
  featureCountText?: string | null;
  features?: (string | null | undefined)[] | null;
};

export function UseCaseExampleSection(props: UseCaseExampleSectionProps) {
  const {
    videoSrc,
    imageSrc,
    sandboxLink,
    docsLink,
    featureCountText,
    features,
  } = props;
  const cleanFeatures = (features ?? []).filter(
    (f): f is string => typeof f === "string" && f.length > 0
  );
  const hasMedia = Boolean(videoSrc || imageSrc);
  const hasContent =
    cleanFeatures.length > 0 ||
    featureCountText ||
    sandboxLink ||
    docsLink;
  if (!hasMedia && !hasContent) return null;

  return (
    <section
      className="w-full flex flex-col items-center"
      style={{ padding: "60px 20px" }}
    >
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2"
        style={{ gap: 40, maxWidth: 1280, alignItems: "center" }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16/10",
            borderRadius: 16,
            border: "1px solid #e5e5e5",
            background: "#f7f7f7",
          }}
        >
          {videoSrc ? (
            <Media
              kind="video"
              src={videoSrc}
              poster={imageSrc ?? undefined}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : imageSrc ? (
            <Media
              kind="image"
              src={imageSrc}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : null}
        </div>

        <div className="flex flex-col" style={{ gap: 24 }}>
          {featureCountText ? (
            <span
              className="font-urbanist font-bold uppercase"
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                alignItems: "center",
                background: "rgba(98,93,245,0.12)",
                color: "#625df5",
                fontSize: 14,
                lineHeight: 1.2,
                letterSpacing: "2.1px",
                padding: "10px 16px",
                borderRadius: 32,
              }}
            >
              {featureCountText} collaboration features
            </span>
          ) : null}

          {cleanFeatures.length > 0 ? (
            <ul
              className="flex flex-col"
              style={{
                gap: 12,
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {cleanFeatures.map((f, i) => (
                <li
                  key={`${f}-${i}`}
                  className="font-urbanist flex items-center"
                  style={{
                    fontSize: 20,
                    lineHeight: 1.3,
                    color: "#111",
                    gap: 12,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: "#625df5",
                      flexShrink: 0,
                    }}
                  />
                  {f}
                </li>
              ))}
            </ul>
          ) : null}

          {(sandboxLink || docsLink) && (
            <div className="flex flex-wrap" style={{ gap: 12 }}>
              {sandboxLink ? (
                <a
                  href={sandboxLink}
                  target={sandboxLink.startsWith("http") ? "_blank" : undefined}
                  rel={sandboxLink.startsWith("http") ? "noopener" : undefined}
                  className="font-urbanist font-semibold no-underline"
                  style={{
                    background: "#625df5",
                    color: "#fff",
                    padding: "12px 20px",
                    borderRadius: 999,
                    fontSize: 16,
                  }}
                >
                  Try in sandbox
                </a>
              ) : null}
              {docsLink ? (
                <a
                  href={docsLink}
                  target={docsLink.startsWith("http") ? "_blank" : undefined}
                  rel={docsLink.startsWith("http") ? "noopener" : undefined}
                  className="font-urbanist font-semibold no-underline"
                  style={{
                    background: "transparent",
                    color: "#111",
                    padding: "11px 19px",
                    borderRadius: 999,
                    border: "1px solid #111",
                    fontSize: 16,
                  }}
                >
                  Read the docs
                </a>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
