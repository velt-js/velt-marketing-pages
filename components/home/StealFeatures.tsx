// StealFeatures — Figma node 8506:97488. Header + two buttons, then a row
// of 4 product cards (400×452 each, bg #f7f7f7, radius 24). First 3 cards
// have a visual in the top, an icon above the title at the bottom; the 4th
// card is text-only.

type Card = {
  title: string;
  subtitle?: string;
  image?: { src: string; top: number; left?: number; right?: number; w: number; h: number; fade?: boolean };
  icon?: { src: string; w: number; h: number };
};

const cards: Card[] = [
  {
    title: "Canvas Comments",
    subtitle: "like in Figma",
    image: { src: "/images/home/card-canvas-comments.png", top: 0, right: -4, w: 368, h: 264 },
    icon: { src: "/images/home/icon-figma.png", w: 25.333, h: 38 },
  },
  {
    title: "Cell Comments",
    subtitle: "like in Google Sheets",
    image: { src: "/images/home/card-cell-comments.png", top: -2, right: -2, w: 400, h: 344.5, fade: true },
    icon: { src: "/images/home/icon-gsheets.png", w: 38.569, h: 44 },
  },
  {
    title: "Video Comments",
    subtitle: "like Frame.io",
    image: { src: "/images/home/card-video-comments.png", top: 0, left: 86, w: 314, h: 211 },
    icon: { src: "/images/home/icon-frameio.svg", w: 36, h: 41 },
  },
  {
    title: "Custom Data Encryption",
  },
];

export function StealFeatures() {
  return (
    <section
      className="flex flex-col items-center w-full"
      style={{ gap: 52 }}
    >
      <div className="flex flex-col items-center w-full" style={{ gap: 32 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 12, maxWidth: 850 }}>
          <h2
            className="font-urbanist font-bold"
            style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Steal Features from Popular Products
          </h2>
          <p className="font-urbanist" style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}>
            Our components have different modes to match your product needs
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          <button
            className="flex items-center justify-center gap-1 rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              border: "2px solid #625df5",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-book-2.svg" alt="" width={18} height={18} />
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
            >
              View Docs
            </span>
          </button>
          <button
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              background: "#625df5",
            }}
          >
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em" }}
            >
              View Examples
            </span>
          </button>
        </div>
      </div>

      {/* Horizontal scroll row — Figma cards row is 1648 px wide (4×400 +
          3×16) but the section is 1280 wide. Phase 2 swaps the manual
          scroller for an auto-scrolling marquee. */}
      <div
        className="w-full overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
        }}
      >
        <style>{`
          section [data-steal-features-scroller]::-webkit-scrollbar { display: none; }
        `}</style>
        <div
          data-steal-features-scroller
          className="flex items-center"
          style={{ gap: 16, height: 452, width: "max-content", padding: "0 80px" }}
        >
        {cards.map((card, i) => (
          <article
            key={card.title}
            className="relative shrink-0 overflow-hidden"
            style={{
              width: 400,
              height: 452,
              background: "#f7f7f7",
              border: "2px solid #f7f7f7",
              borderRadius: 24,
            }}
          >
            {card.image && (
              <div
                className="absolute"
                style={{
                  top: card.image.top,
                  left: card.image.left,
                  right: card.image.right,
                  width: card.image.w,
                  height: card.image.h,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            {/* Fade-to-bg overlay on the Cell Comments card */}
            {card.image?.fade && (
              <div
                className="absolute"
                style={{
                  left: -2,
                  top: 91,
                  width: 400,
                  height: 250,
                  background: "linear-gradient(to bottom, rgba(247,247,247,0), #f7f7f7)",
                }}
              />
            )}

            <div
              className="absolute flex flex-col items-start"
              style={{ bottom: i === 3 ? 34 : 40, left: i === 3 ? 40 : i === 1 ? 38 : 40, width: 305, gap: 16 }}
            >
              {card.icon && (
                <div style={{ width: card.icon.w, height: card.icon.h, position: "relative" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.icon.src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              )}
              <div
                className="font-urbanist font-bold"
                style={{
                  color: "#111",
                  fontSize: 28,
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                }}
              >
                {card.title}
                {card.subtitle && (
                  <>
                    <br />
                    {card.subtitle}
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
