// 2-column feature row inside a use-case detail page.
// Spec: Figma HqWIZdR6ISJmaG2n4o3gr8 node 177:56515 ("Use Case Carousel"),
// 1280×460 with 20px padding all sides; 150px column gap; text column
// uses justify-between so the "Features Used" pills sit at the column
// bottom regardless of body length. `imagePosition` flips the column
// order so consecutive rows can alternate.

import type { ReactNode } from "react";
import { Media } from "../comparison/Media";

export type UseCaseFeatureChipData = {
  _key?: string;
  label: string;
  href?: string | null;
};

export type UseCaseFeatureRowData = {
  eyebrow: string;
  heading: string;
  description: string;
  features?: UseCaseFeatureChipData[] | null;
  /** Resolved Sanity image URL (from `image.asset->url`). Optional. */
  image?: string | null;
  imagePosition?: "left" | "right";
  /** Render-time override: when set, replaces the default image-with-border
   *  visual entirely. Used by /migrate pages to inject hand-built mocks
   *  (e.g. the Extensive Features comment-thread) that can't be captured
   *  cleanly as a flat PNG. */
  customVisual?: ReactNode;
  /** Override the visual column height. Defaults to 420 (use-case spec).
   *  Migration page uses 480 to match its Figma. */
  columnHeight?: number;
};

const DEFAULT_COLUMN_HEIGHT = 420;
const VISUAL_RADIUS = 12;

export function UseCaseFeatureRow({
  eyebrow,
  heading,
  description,
  features,
  image,
  imagePosition = "right",
  customVisual,
  columnHeight,
}: UseCaseFeatureRowData) {
  const height = columnHeight ?? DEFAULT_COLUMN_HEIGHT;
  const hasFeatures = features && features.length > 0;
  const text = (
    <div
      className="flex flex-col items-start w-full lg:flex-1 lg:min-w-0"
      style={{
        gap: 12,
        justifyContent: hasFeatures ? "space-between" : "center",
      }}
    >
      <div className="flex flex-col items-start" style={{ gap: 12 }}>
        {eyebrow ? (
          <span
            className="font-urbanist font-bold uppercase"
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(98,93,245,0.12)",
              color: "#625df5",
              fontSize: 14,
              lineHeight: 1.2,
              letterSpacing: "2.1px",
              padding: "10px 16px",
              borderRadius: 32,
              whiteSpace: "nowrap",
            }}
          >
            {eyebrow}
          </span>
        ) : null}
        {heading ? (
          <h2
            className="font-urbanist font-bold"
            style={{
              fontSize: "clamp(28px, 4.2vw, 52px)",
              lineHeight: 1.2,
              letterSpacing: "-1.56px",
              color: "#111",
              margin: 0,
            }}
          >
            {heading}
          </h2>
        ) : null}
        {description ? (
          <p
            className="font-urbanist"
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.3,
              color: "#111",
              margin: 0,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>

      {features && features.length > 0 ? (
        <div className="flex flex-col items-start" style={{ gap: 10 }}>
          <span
            className="font-urbanist uppercase"
            style={{
              fontSize: 12,
              lineHeight: 1.2,
              letterSpacing: "1.8px",
              color: "#111",
            }}
          >
            Features Used
          </span>
          <div className="flex flex-wrap" style={{ gap: 12 }}>
            {features.map((chip, i) => (
              <FeatureChip
                key={chip._key ?? `${chip.label}-${i}`}
                chip={chip}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );

  const visual = customVisual ? (
    <div
      className="relative w-full lg:flex-1 lg:min-w-0"
      style={{ minHeight: 240 }}
    >
      {customVisual}
    </div>
  ) : (
    <div
      className="relative overflow-hidden w-full lg:flex-1 lg:min-w-0"
      style={{
        minHeight: 240,
        border: "1px solid #d9d9d9",
        borderRadius: VISUAL_RADIUS,
        background: "#ffffff",
      }}
    >
      {image ? (
        <Media
          kind="image"
          src={image}
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
  );

  return (
    <section
      className="w-full flex flex-col lg:flex-row items-start lg:items-stretch"
      style={{
        padding: 20,
        gap: 40,
        justifyContent: "center",
      }}
    >
      {imagePosition === "left" ? (
        <>
          {visual}
          {text}
        </>
      ) : (
        <>
          {text}
          {visual}
        </>
      )}
    </section>
  );
}

function FeatureChip({ chip }: { chip: UseCaseFeatureChipData }) {
  const inner = (
    <span
      className="font-urbanist font-semibold"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        lineHeight: 1.2,
        letterSpacing: "-0.48px",
        color: "#ffffff",
        mixBlendMode: "exclusion",
        border: "2px solid #625df5",
        borderRadius: 32,
        padding: "10px 16px",
        whiteSpace: "nowrap",
      }}
    >
      {chip.label}
    </span>
  );

  if (!chip.href) return inner;
  return (
    <a
      href={chip.href}
      className="no-underline"
      target={chip.href.startsWith("http") ? "_blank" : undefined}
      rel={chip.href.startsWith("http") ? "noopener" : undefined}
    >
      {inner}
    </a>
  );
}
