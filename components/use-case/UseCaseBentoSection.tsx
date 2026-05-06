// One bento row inside a use-case detail page (Figma 177:56515 et al,
// 1280×460). Two variants:
//   - twoCol: two 50/50 cards side-by-side, each with title + description
//             + optional visual.
//   - oneCol: one full-width card with a wider visual area.
//
// Each card visual is wrapped in <Media> so a future kind="video" swap
// is one line per card. Optional `accentColor` per card tints the body
// background — defaults to a soft purple.

import { Media } from "../comparison/Media";

export type UseCaseBentoCardData = {
  title: string;
  description?: string;
  /** Resolved Sanity image URL (from `image.asset->url`). Pass null
   *  / undefined to render a soft placeholder. */
  image?: string | null;
  accentColor?: string | null;
};

export type UseCaseBentoSectionData = {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  variant: "twoCol" | "oneCol";
  cards: UseCaseBentoCardData[];
};

const DEFAULT_ACCENT = "#EFEEFD";
const CARD_RADIUS = 32;

export function UseCaseBentoSection({
  eyebrow,
  heading,
  subheading,
  variant,
  cards,
}: UseCaseBentoSectionData) {
  return (
    <section className="flex flex-col items-stretch w-full" style={{ gap: 32 }}>
      {(eyebrow || heading || subheading) && (
        <div
          className="flex flex-col items-center text-center"
          style={{ gap: 12, maxWidth: 820, alignSelf: "center" }}
        >
          {eyebrow ? (
            <span
              className="font-urbanist font-semibold uppercase"
              style={{
                fontSize: 12,
                letterSpacing: "0.05em",
                color: "#625df5",
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          {heading ? (
            <h2
              className="font-urbanist font-bold"
              style={{
                fontSize: 40,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "#111",
                margin: 0,
              }}
            >
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p
              className="font-urbanist"
              style={{
                fontSize: 18,
                lineHeight: 1.5,
                color: "#3a3a3a",
                margin: 0,
              }}
            >
              {subheading}
            </p>
          ) : null}
        </div>
      )}

      <div
        className="grid w-full"
        style={{
          gridTemplateColumns:
            variant === "twoCol" ? "repeat(2, minmax(0, 1fr))" : "1fr",
          gap: 24,
        }}
      >
        {cards.map((card, i) => (
          <BentoCard key={i} card={card} variant={variant} />
        ))}
      </div>
    </section>
  );
}

function BentoCard({
  card,
  variant,
}: {
  card: UseCaseBentoCardData;
  variant: "twoCol" | "oneCol";
}) {
  const accent = card.accentColor ?? DEFAULT_ACCENT;
  return (
    <article
      className="relative flex flex-col items-stretch overflow-hidden"
      style={{
        background: accent,
        borderRadius: CARD_RADIUS,
        height: variant === "oneCol" ? 460 : 460,
        padding: 40,
        gap: 24,
      }}
    >
      <div className="flex flex-col" style={{ gap: 12, maxWidth: 540 }}>
        <h3
          className="font-urbanist font-bold"
          style={{
            fontSize: variant === "oneCol" ? 32 : 28,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "#111",
            margin: 0,
          }}
        >
          {card.title}
        </h3>
        {card.description ? (
          <p
            className="font-urbanist"
            style={{
              fontSize: 18,
              lineHeight: 1.4,
              color: "#3a3a3a",
              margin: 0,
            }}
          >
            {card.description}
          </p>
        ) : null}
      </div>

      <div
        className="relative w-full"
        style={{ flex: 1, minHeight: 0, borderRadius: 16, overflow: "hidden" }}
      >
        {card.image ? (
          <Media
            kind="image"
            src={card.image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 100%)",
            }}
          >
            <span
              className="font-urbanist font-medium uppercase"
              style={{
                fontSize: 12,
                letterSpacing: "0.15em",
                color: "rgba(98,93,245,0.55)",
              }}
            >
              {card.title}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
