// LibrarySupport — Figma node 8506:97175. Centered header + 2 CTAs, then a
// grid: two 400×493 cards (Text Editors with 6 library logos, Chart
// Libraries with Chart.js + Highcharts + NivoCharts) above a wide 824×228
// Canvas card (React Flow).

type Logo = { src: string; w: number; h: number; alt: string };

const editorLogos: Logo[] = [
  { src: "/images/home/logo-yjs.svg", w: 28, h: 33, alt: "YJS" },
  { src: "/images/home/logo-tiptap.svg", w: 144, h: 33, alt: "Tiptap" },
  { src: "/images/home/logo-lexical.svg", w: 105, h: 24, alt: "Lexical" },
  { src: "/images/home/logo-codemirror.svg", w: 176, h: 33, alt: "CodeMirror" },
  { src: "/images/home/logo-blocknote.png", w: 57, h: 36, alt: "BlockNote" },
  { src: "/images/home/logo-slate.svg", w: 109, h: 26, alt: "SlateJS" },
];

export function LibrarySupport() {
  return (
    <section
      className="flex flex-col items-center bg-white"
      style={{ padding: "52px 80px 0", gap: 48 }}
    >
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

      <div className="flex flex-col" style={{ gap: 16, width: 824 }}>
        <div className="flex items-center" style={{ gap: 16 }}>
          {/* Text Editors card */}
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
              className="absolute flex flex-wrap items-center justify-center content-center"
              style={{ left: 15, top: 31, width: 366, padding: "52px 0", gap: 61 }}
            >
              {editorLogos.map((logo) => (
                <div
                  key={logo.alt}
                  className="relative flex items-center justify-center shrink-0"
                  style={{ width: logo.w, height: logo.h }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    style={{ maxWidth: logo.w, maxHeight: logo.h, objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
            <div
              className="absolute flex flex-col items-start"
              style={{ bottom: 28, left: 28, width: 305, gap: 8 }}
            >
              <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
                Text Editors
              </h3>
              <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}>
                View Docs
              </p>
            </div>
          </article>

          {/* Chart Libraries card */}
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
            {/* Chart.js */}
            <div className="absolute flex items-center justify-center" style={{ top: 110, left: 45, width: 44, height: 44 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/logo-chartjs.svg" alt="Chart.js" style={{ maxWidth: 44, maxHeight: 44, objectFit: "contain" }} />
            </div>
            {/* Highcharts */}
            <div className="absolute flex items-center" style={{ top: 116, left: 151, width: 210, height: 36, gap: 6 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/logo-highcharts-symbol.svg" alt="" style={{ width: 37, height: 36, objectFit: "contain" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/logo-highcharts-text.svg" alt="Highcharts" style={{ width: 157, height: 14, objectFit: "contain" }} />
            </div>
            {/* Nivo (two stacked images) */}
            <div className="absolute flex items-center justify-center" style={{ top: 230, left: 146, width: 105, height: 33 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/logo-nivo-top.png" alt="Nivo Charts" style={{ maxWidth: 105, maxHeight: 33, objectFit: "contain" }} />
            </div>
            <div
              className="absolute flex flex-col items-start"
              style={{ top: 398, left: 30, width: 329, gap: 12 }}
            >
              <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
                Chart Libraries
              </h3>
              <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}>
                View Docs
              </p>
            </div>
          </article>
        </div>

        {/* Canvas wide card */}
        <article
          className="relative overflow-hidden"
          style={{
            width: 824,
            height: 228,
            background: "#f7f7f7",
            borderRadius: 24,
          }}
        >
          <div
            className="absolute flex flex-col items-start"
            style={{ top: 114, left: 30, gap: 8, width: 305 }}
          >
            <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
              Canvas
            </h3>
            <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}>
              View Docs
            </p>
          </div>
          <div
            className="absolute flex items-center"
            style={{ top: 102, left: 542, gap: 18.8 }}
          >
            <div style={{ width: 31, height: 31 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/logo-reactflow.svg" alt="" style={{ width: 31, height: 31, objectFit: "contain" }} />
            </div>
            <span
              className="font-urbanist font-semibold whitespace-nowrap"
              style={{ color: "#111", fontSize: 31, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              React Flow
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
