// LibrarySupport — Figma node 1:20818 "Library Support". Exact
// dimensions ripped from the Figma node: 2 cards (400×493) on row 1,
// then a 824×228 Canvas card below.

type LogoSlot =
  | { kind: "image"; alt: string; w: number; h: number; src: string }
  | {
      kind: "composite";
      alt: string;
      w: number;
      h: number;
      parts: { src: string; w: number; h: number; left: number; top: number }[];
    }
  | { kind: "slate"; w: number; h: number };

// Text Editors flex-wrap items — order matches Figma children 1:20837 → 1:20879.
const textEditorLogos: LogoSlot[] = [
  { kind: "image", alt: "YJS", w: 27.972, h: 33.058, src: "/images/home/logo-yjs.svg" },
  {
    kind: "composite",
    alt: "CodeMirror",
    w: 143.675,
    h: 33.019,
    parts: [
      { src: "/images/home/logo-codemirror-icon.svg", w: 33.019, h: 33.019, left: 0, top: 0 },
      { src: "/images/home/logo-codemirror-text.svg", w: 99.056, h: 15.617, left: 44.62, top: 8.70 },
    ],
  },
  { kind: "image", alt: "Lexical", w: 105.35, h: 23.613, src: "/images/home/logo-lexical.svg" },
  { kind: "image", alt: "BlockNote", w: 176.098, h: 33.058, src: "/images/home/logo-blocknote.svg" },
  { kind: "slate", w: 57, h: 36 },
  { kind: "image", alt: "Tiptap", w: 108.892, h: 25.974, src: "/images/home/logo-tiptap-wordmark.svg" },
];

function LogoCell({ slot }: { slot: LogoSlot }) {
  if (slot.kind === "slate") {
    return (
      <div
        className="relative shrink-0 flex items-center justify-center font-urbanist"
        style={{
          width: slot.w,
          height: slot.h,
          background: "#e5e5e5",
          color: "#666",
          fontSize: 16,
          lineHeight: 1,
        }}
      >
        Slate
      </div>
    );
  }
  if (slot.kind === "composite") {
    return (
      <div className="relative shrink-0" style={{ width: slot.w, height: slot.h }}>
        {slot.parts.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.src}
            src={p.src}
            alt=""
            width={p.w}
            height={p.h}
            style={{ position: "absolute", left: p.left, top: p.top, display: "block" }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="relative shrink-0" style={{ width: slot.w, height: slot.h }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slot.src}
        alt={slot.alt}
        width={slot.w}
        height={slot.h}
        style={{ display: "block" }}
      />
    </div>
  );
}

function CellTextBlock({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="absolute flex flex-col items-start"
      style={{ bottom: 28, left: 28, width: 305, gap: 8 }}
    >
      <h3
        className="font-urbanist font-bold"
        style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}
      >
        {title}
      </h3>
      <p
        className="font-urbanist"
        style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}
      >
        {subtitle}
      </p>
    </div>
  );
}

export function LibrarySupport() {
  return (
    <section
      className="flex flex-col items-center bg-white"
      style={{ padding: "52px 80px 0", gap: 48 }}
    >
      {/* Header — Figma node 1:20819 */}
      <div className="flex flex-col items-center" style={{ gap: 32 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
          <h2
            className="font-urbanist font-bold whitespace-nowrap"
            style={{ color: "#111", fontSize: 48, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Works seamlessly with your libraries
          </h2>
          <p className="font-urbanist" style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}>
            Use 8+ Purpose-built Library or Integrate it yourself
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          <button
            className="flex items-center justify-center gap-1 rounded-lg"
            style={{ width: 156, height: 44, padding: "8px 16px", border: "2px solid #3152f5" }}
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
            style={{ width: 156, height: 44, padding: "8px 16px", background: "#3152f5" }}
          >
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em" }}
            >
              View All Examples
            </span>
          </button>
        </div>
      </div>

      {/* Library Grid — Figma node 1:20830 */}
      <div style={{ width: 824 }}>
        {/* Row 1 — Figma node 1:20831: 2 cards of 400×493, gap:16, ml:4 */}
        <div className="flex items-center" style={{ gap: 16, marginLeft: 4 }}>
          {/* Text Editor Libraries — Figma node 1:20832 */}
          <article
            className="relative overflow-hidden"
            style={{
              width: 400,
              height: 493,
              background: "#f7f7f7",
              border: "2px solid #f7f7f7",
              borderRadius: 24,
            }}
          >
            {/* Logos container — Figma node 1:20836: absolute left:15 top:30.87 w:366,
                py:51.948, flex-wrap gap:61.394 × 61.394, items-center, justify-center,
                content-center */}
            <div
              className="absolute flex flex-wrap items-center justify-center content-center"
              style={{
                left: 15,
                top: 30.87,
                width: 366,
                padding: "51.948px 0",
                rowGap: 61.394,
                columnGap: 61.394,
              }}
            >
              {textEditorLogos.map((slot, i) => (
                <LogoCell key={i} slot={slot} />
              ))}
            </div>
            <CellTextBlock title="Text Editors" subtitle="View Docs" />
          </article>

          {/* Chart Libraries — Figma node 1:20891 */}
          <article
            className="relative overflow-hidden"
            style={{
              width: 400,
              height: 493,
              background: "#f7f7f7",
              border: "2px solid #f7f7f7",
              borderRadius: 24,
            }}
          >
            {/* Chart.js (Layer_1) — Figma node 1:20893: 43.84×43.84 at left:47.3 top:112.87 */}
            <div className="absolute" style={{ left: 47.3, top: 112.87 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/logo-chartjs.svg"
                alt="Chart.js"
                width={43.84}
                height={43.84}
                style={{ display: "block" }}
              />
            </div>

            {/* Highcharts (symbol + text) — Figma node 1:20898:
                210.43×35.62 at left:151.57 top:116.98. Symbol inset right 82.29%
                (width 37.26). Text inset top 32.76% left 25.52%
                (left 53.70, top 11.67, width 156.98, height 14.50). */}
            <div
              className="absolute"
              style={{ left: 151.57, top: 116.98, width: 210.43, height: 35.62 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/logo-highcharts-symbol.svg"
                alt=""
                width={37.26}
                height={35.62}
                style={{ position: "absolute", left: 0, top: 0, display: "block" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/logo-highcharts-text.svg"
                alt="Highcharts"
                width={156.98}
                height={14.5}
                style={{ position: "absolute", left: 53.70, top: 11.67, display: "block" }}
              />
            </div>

            {/* Nivo Charts — Figma node 1:20921:
                105.314×32.825 at left:146.59 top:227.94.
                Two PNGs share the same source canvas: wordmark "nivo"
                (with a plain blue/red "o") + colored ring. Overlaying the
                ring on top of the wordmark at matching coordinates replaces
                the plain "o" with the colorful ring. */}
            <div
              className="absolute"
              style={{ left: 146.59, top: 227.94, width: 105.314, height: 32.825 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/logo-nivo-bot.png"
                alt="Nivo Charts"
                width={105.314}
                height={32.825}
                style={{ position: "absolute", left: 0, top: 0, display: "block" }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/logo-nivo-top.png"
                alt=""
                width={104.847}
                height={32.825}
                style={{ position: "absolute", left: 0.47, top: 0, display: "block" }}
              />
            </div>

            {/* Text block — Figma node 1:20925: bottom-left at top:396.87 left:30 */}
            <div className="absolute" style={{ left: 30, top: 398.87, width: 218 }}>
              <h3
                className="font-urbanist font-bold"
                style={{
                  color: "#111",
                  fontSize: 28,
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                }}
              >
                Chart Libraries
              </h3>
            </div>
            <div className="absolute" style={{ left: 30, top: 440.87, width: 329 }}>
              <p
                className="font-urbanist"
                style={{
                  color: "#111",
                  fontSize: 18,
                  lineHeight: 1.2,
                  opacity: 0.52,
                }}
              >
                View Docs
              </p>
            </div>
          </article>
        </div>

        {/* Canvas App — Figma node 1:20928: 824×228, mt:509 */}
        <article
          className="relative overflow-hidden"
          style={{
            width: 824,
            height: 228,
            marginTop: 16,
            background: "#f7f7f7",
            borderRadius: 24,
          }}
        >
          <p
            className="absolute font-urbanist font-bold whitespace-nowrap"
            style={{
              left: 30,
              top: 114,
              color: "#111",
              fontSize: 28,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            Canvas
          </p>
          <p
            className="absolute font-urbanist"
            style={{
              left: 30,
              top: 156,
              width: 305,
              color: "#111",
              fontSize: 18,
              lineHeight: 1.2,
              opacity: 0.52,
            }}
          >
            View Docs
          </p>

          {/* React Flow cluster — left:542 top:102.87, gap:18.812, icon 31.353×31.353 */}
          <div
            className="absolute flex items-center"
            style={{ left: 542, top: 102.87, gap: 18.812 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/logo-reactflow.svg"
              alt=""
              width={31.353}
              height={31.353}
              style={{ display: "block" }}
            />
            <span
              className="font-urbanist font-semibold whitespace-nowrap"
              style={{
                color: "#111",
                fontSize: 31.353,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              React Flow
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
