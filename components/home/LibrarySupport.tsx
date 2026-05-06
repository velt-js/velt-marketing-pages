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
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "100px 80px 0", gap: 48 }}
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
            className="relative overflow-hidden"
            style={{
              width: 400,
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

          <div
            className="absolute flex items-center justify-center"
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
