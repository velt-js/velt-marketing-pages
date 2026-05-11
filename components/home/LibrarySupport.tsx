// LibrarySupport — Figma node 1:20818 "Library Support". Exact
// dimensions ripped from the Figma node: 2 cards (400×493) on row 1,
// then a 824×228 Canvas card below.

const ICON_PATH = "/images/home/libraries";

interface LibLogo {
  alt: string;
  src: string;
}

const textEditorLogos: LibLogo[] = [
  { alt: "YJS", src: `${ICON_PATH}/yjs.png` },
  { alt: "CodeMirror", src: `${ICON_PATH}/codemirror.png` },
  { alt: "Lexical", src: `${ICON_PATH}/lexical.png` },
  { alt: "BlockNote", src: `${ICON_PATH}/blocknote.png` },
  { alt: "Slate", src: `${ICON_PATH}/slatejs.png` },
  { alt: "Tiptap", src: `${ICON_PATH}/tiptap.png` },
];

const chartLogos: LibLogo[] = [
  { alt: "Chart.js", src: `${ICON_PATH}/chartjs.png` },
  { alt: "Highcharts", src: `${ICON_PATH}/highcharts.png` },
  { alt: "Nivo Charts", src: `${ICON_PATH}/nivo-charts.png` },
];

function LogoCell({ logo, maxWidth }: { logo: LibLogo; maxWidth?: number }) {
  return (
    <div className="flex items-center justify-center" style={{ height: 30 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={logo.alt}
        style={{ display: "block", maxHeight: 30, maxWidth, objectFit: "contain" }}
      />
    </div>
  );
}

function CellTextBlock({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="absolute flex flex-col items-start"
      style={{ bottom: 28, left: 28, right: 28, gap: 8 }}
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
      className="flex flex-col items-center bg-white full-bleed-bg px-6 lg:px-20 pt-16 lg:pt-[100px] gap-10 lg:gap-12"
    >
      {/* Header — Figma node 1:20819 */}
      <div className="flex flex-col items-center gap-6 lg:gap-8">
        <div className="flex flex-col items-center text-center gap-3">
          <h2
            className="font-urbanist font-bold"
            style={{
              color: "#111",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            Works seamlessly with your libraries
          </h2>
          <p
            className="font-urbanist"
            style={{
              color: "#111",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.3,
            }}
          >
            Use 8+ Purpose-built Library or Integrate it yourself
          </p>
        </div>
        <div className="flex items-start gap-3">
          <button
            className="flex items-center justify-center gap-1 rounded-lg"
            style={{ width: 156, height: 44, padding: "8px 16px", border: "2px solid #625df5" }}
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
            style={{ width: 156, height: 44, padding: "8px 16px", background: "#625df5" }}
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

      {/* Library Grid — Figma node 1:20830. Cards stack on mobile, two-up
          at lg+. The Canvas card always spans full width below. */}
      <div className="w-full max-w-[824px] flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Text Editor Libraries — Figma node 1:20832 */}
          <article
            className="relative overflow-hidden w-full"
            style={{
              height: 493,
              background: "#f7f7f7",
              border: "2px solid #f7f7f7",
              borderRadius: 24,
            }}
          >
            <div
              className="absolute grid items-center justify-items-center"
              style={{
                left: 0,
                right: 0,
                top: 40,
                bottom: 120,
                padding: "0 40px",
                gridTemplateColumns: "1fr 1fr",
                rowGap: 40,
                columnGap: 24,
                alignContent: "center",
              }}
            >
              {textEditorLogos.map((logo) => (
                <LogoCell key={logo.alt} logo={logo} />
              ))}
            </div>
            <CellTextBlock title="Text Editors" subtitle="View Docs" />
          </article>

          {/* Chart Libraries — Figma node 1:20891 */}
          <article
            className="relative overflow-hidden w-full"
            style={{
              height: 493,
              background: "#f7f7f7",
              border: "2px solid #f7f7f7",
              borderRadius: 24,
            }}
          >
            <div
              className="absolute grid items-center justify-items-center"
              style={{
                left: 0,
                right: 0,
                top: 40,
                bottom: 120,
                padding: "0 40px",
                gridTemplateColumns: "1fr 1fr",
                rowGap: 40,
                columnGap: 24,
                alignContent: "center",
              }}
            >
              {chartLogos.map((logo, index) => {
                const isLastOdd = index === chartLogos.length - 1 && chartLogos.length % 2 === 1;
                return (
                  <div
                    key={logo.alt}
                    className="flex items-center justify-center"
                    style={isLastOdd ? { gridColumn: "1 / -1" } : undefined}
                  >
                    <LogoCell logo={logo} maxWidth={isLastOdd ? 140 : undefined} />
                  </div>
                );
              })}
            </div>
            <CellTextBlock title="Chart Libraries" subtitle="View Docs" />
          </article>
        </div>

        {/* Canvas App — full-width below the row pair. Switches from
            absolute-positioned (desktop) to a flex column with image-on-top
            (mobile) so the "Canvas" label and React Flow logo never collide
            below the 1024px breakpoint. */}
        <article
          className="relative overflow-hidden w-full flex flex-col items-stretch lg:block"
          style={{
            minHeight: 228,
            background: "#f7f7f7",
            borderRadius: 24,
            padding: "24px 30px",
          }}
        >
          {/* Mobile-only: React Flow logo at the top, centered. */}
          <div
            className="flex lg:hidden items-center justify-center"
            style={{ marginBottom: 16, minHeight: 56 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ICON_PATH}/react-flow.png`}
              alt="React Flow"
              style={{ display: "block", maxHeight: 40, objectFit: "contain" }}
            />
          </div>

          {/* Title + subtitle — relative on mobile (top of card), absolute on
              desktop (left-aligned, vertically centered as per Figma). */}
          <div className="lg:absolute" style={{ left: 30, top: 114 }}>
            <p
              className="font-urbanist font-bold whitespace-nowrap"
              style={{
                color: "#111",
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Canvas
            </p>
            <p
              className="font-urbanist"
              style={{
                marginTop: 8,
                color: "#111",
                fontSize: 18,
                lineHeight: 1.2,
                opacity: 0.52,
              }}
            >
              View Docs
            </p>
          </div>

          {/* Desktop-only: React Flow logo anchored to the right of the card. */}
          <div
            className="hidden lg:flex absolute items-center justify-center"
            style={{ right: 40, top: 0, bottom: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ICON_PATH}/react-flow.png`}
              alt="React Flow"
              style={{ display: "block", maxHeight: 40, objectFit: "contain" }}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
