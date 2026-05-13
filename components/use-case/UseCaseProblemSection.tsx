// Problem framing block — 2-line heading + up to 3 problem cards.
// Mirrors Framer `problem__*`. Renders inside the white middle stack.
// Each card is image + short text. Images are optional; cards with no
// image fall back to a soft placeholder block so the grid stays even.

import { Media } from "../comparison/Media";

export type UseCaseProblemItem = {
  _key?: string;
  imageSrc?: string | null;
  text?: string | null;
};

export type UseCaseProblemSectionProps = {
  title1?: string | null;
  title2?: string | null;
  items?: UseCaseProblemItem[] | null;
};

export function UseCaseProblemSection({
  title1,
  title2,
  items,
}: UseCaseProblemSectionProps) {
  const filtered = (items ?? []).filter((i) => i?.text || i?.imageSrc);
  if (!title1 && !title2 && filtered.length === 0) return null;

  return (
    <section
      className="w-full flex flex-col items-center"
      style={{ padding: "60px 20px", gap: 48 }}
    >
      {(title1 || title2) && (
        <header
          className="w-full flex flex-col items-center text-center"
          style={{ gap: 12, maxWidth: 880 }}
        >
          {title1 ? (
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
              {title1}
            </h2>
          ) : null}
          {title2 ? (
            <p
              className="font-urbanist"
              style={{
                fontSize: "clamp(16px, 1.5vw, 20px)",
                lineHeight: 1.4,
                color: "rgba(0,0,0,0.6)",
                margin: 0,
              }}
            >
              {title2}
            </p>
          ) : null}
        </header>
      )}

      {filtered.length > 0 ? (
        <div
          className="w-full grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 24, maxWidth: 1280 }}
        >
          {filtered.map((item, i) => (
            <article
              key={item._key ?? `problem-${i}`}
              className="flex flex-col overflow-hidden"
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 16,
                background: "#fff",
              }}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio: "4/3",
                  background: "#f7f7f7",
                }}
              >
                {item.imageSrc ? (
                  <Media
                    kind="image"
                    src={item.imageSrc}
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
              {item.text ? (
                <p
                  className="font-urbanist"
                  style={{
                    fontSize: 18,
                    lineHeight: 1.4,
                    color: "#111",
                    margin: 0,
                    padding: "20px 24px 24px",
                  }}
                >
                  {item.text}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
