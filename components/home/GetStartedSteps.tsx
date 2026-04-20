// GetStartedSteps — Figma node 8506:97727 (1280×811). Gradient headline
// "Get Started in 3 Steps" + sub + two CTAs, then a 1280-wide dark rounded
// card split into 3 columns (Initialize / Add Component / Style Your
// Components), capped by a #1a1a1a testimonial strip (Linda Belcher).

function Step1Column() {
  return (
    <div
      className="relative overflow-hidden shrink-0"
      style={{ width: 424, height: 445, background: "#0d0d0d" }}
    >
      <div
        className="absolute flex flex-col items-start"
        style={{ left: 50, top: 30, gap: 12, maxWidth: 250 }}
      >
        <h3 className="font-urbanist font-bold text-white" style={{ fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
          1. Initialize Velt
        </h3>
        <p className="font-urbanist text-white" style={{ fontSize: 14, lineHeight: 1, opacity: 0.52, letterSpacing: "-0.03em" }}>
          Setting up velt takes 2 minutes
        </p>
      </div>

      {/* Code panel */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: 137,
          left: 57,
          width: 378,
          height: 270,
          background: "linear-gradient(to bottom, #1e1e1e, rgba(20,20,20,0))",
          borderTopLeftRadius: 24,
        }}
      >
        <div className="absolute flex items-center" style={{ top: 21, left: 21, gap: 10 }}>
          <span className="inline-block rounded-full" style={{ width: 12, height: 12, background: "#ff4e54" }} />
          <span className="inline-block rounded-full" style={{ width: 12, height: 12, background: "#e7bc00" }} />
          <span className="inline-block rounded-full" style={{ width: 12, height: 12, background: "#00c500" }} />
        </div>
        <p className="absolute font-firacode font-medium whitespace-nowrap" style={{ left: 21, top: 72, fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          <span style={{ color: "rgba(255,255,255,0.32)" }}>app &gt;</span>
          <span style={{ color: "#fff" }}> npm i </span>
          <span style={{ color: "#b387f7" }}>@veltdev/client</span>
        </p>
        <p className="absolute font-firacode font-medium whitespace-nowrap" style={{ left: 21, top: 125, fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.32)" }}>
          app &gt; <span style={{ color: "#fff" }}>Enter your API Key:</span>
        </p>
      </div>

      {/* Right fade */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: 0,
          top: 0,
          width: 94,
          height: 445,
          background: "linear-gradient(to left, #0d0d0d, rgba(13,13,13,0))",
          opacity: 0.8,
        }}
      />
    </div>
  );
}

function Step2Column() {
  return (
    <div className="relative flex-1 overflow-hidden min-w-0" style={{ height: 445, background: "#0d0d0d" }}>
      <div className="absolute flex flex-col items-start" style={{ left: 30, top: 30, gap: 12 }}>
        <h3 className="font-urbanist font-bold text-white" style={{ fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
          2. Add Component
        </h3>
        <p className="font-urbanist text-white" style={{ fontSize: 14, lineHeight: 1, opacity: 0.52, letterSpacing: "-0.03em" }}>
          Copy paste from 15+ components
        </p>
      </div>

      {/* Code + mock comment */}
      <div className="absolute" style={{ left: 76, top: 175, width: 387 }}>
        <p className="font-firacode text-[14px]">
          <span style={{ color: "rgba(255,255,255,0.52)" }}>&lt;</span>
          <span style={{ color: "#67f9c8" }}>VeltComments</span>
          <span style={{ color: "rgba(255,255,255,0.52)" }}>&gt;</span>
        </p>
      </div>

      <div
        className="absolute flex flex-col items-start overflow-hidden"
        style={{
          left: 96,
          top: 216,
          width: 387,
          background: "#1b1b1b",
          border: "1.2px solid rgba(230,232,236,0.08)",
          borderRadius: 14.4,
          boxShadow: "0px 9.6px 19.2px 0px rgba(15,15,15,0.1)",
          padding: "0 19.2px 19.2px",
        }}
      >
        <div className="flex items-center w-full" style={{ paddingTop: 19.2, gap: 9.6 }}>
          <div
            className="rounded-full shrink-0"
            style={{ width: 38.4, height: 38.4, background: "rgba(255,255,255,0.08)" }}
          />
          <div className="flex-1 flex items-center" style={{ gap: 4 }}>
            <div
              className="rounded-full"
              style={{ width: 70, height: 21, background: "rgba(255,255,255,0.04)" }}
            />
          </div>
        </div>
        <div className="w-full" style={{ paddingLeft: 48, paddingTop: 9.6 }}>
          <div
            className="rounded-full"
            style={{ width: 167, height: 21, background: "rgba(255,255,255,0.04)" }}
          />
        </div>
      </div>

      <div className="absolute" style={{ left: 76, top: 350 }}>
        <p className="font-firacode text-[14px]">
          <span style={{ color: "rgba(255,255,255,0.52)" }}>&lt;/</span>
          <span style={{ color: "#67f9c8" }}>VeltComments</span>
          <span style={{ color: "rgba(255,255,255,0.52)" }}>&gt;</span>
        </p>
      </div>

      <div
        className="absolute pointer-events-none"
        style={{
          right: 0,
          top: 0,
          width: 80,
          height: 445,
          background: "linear-gradient(to left, #0d0d0d, rgba(13,13,13,0))",
          opacity: 0.8,
        }}
      />
    </div>
  );
}

function Step3Column() {
  return (
    <div className="relative flex-1 overflow-hidden min-w-0" style={{ height: 445, background: "#0d0d0d" }}>
      <div className="absolute flex flex-col items-start" style={{ left: 30, top: 30, gap: 12 }}>
        <h3 className="font-urbanist font-bold text-white" style={{ fontSize: 20, lineHeight: 1.2, letterSpacing: "-0.03em", maxWidth: 230 }}>
          3. Style Your Components
        </h3>
        <p className="font-urbanist text-white" style={{ fontSize: 14, lineHeight: 1, opacity: 0.52, letterSpacing: "-0.03em" }}>
          Match your UI language with CSS
        </p>
      </div>

      {/* Comment card mock */}
      <div
        className="absolute overflow-hidden"
        style={{
          right: -52,
          top: 178,
          width: 337,
          height: 170,
          background: "#151515",
          border: "1.3px solid rgba(225,225,225,0.06)",
          borderRadius: 11.2,
          padding: 11,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              border: "1px solid #414141",
              padding: "2px 8px",
              height: 30,
            }}
          >
            <span className="font-poppins font-semibold" style={{ color: "#414141", fontSize: 11.66 }}>
              Open
            </span>
          </div>
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              border: "1px solid #414141",
              padding: "2px 8px",
              height: 30,
            }}
          >
            <span className="font-poppins font-semibold" style={{ color: "#414141", fontSize: 11.66 }}>
              P0
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="rounded-full" style={{ width: 30, height: 30, border: "1px solid #4b4b4b" }} />
          <div className="flex flex-col gap-1">
            <div style={{ width: 80, height: 18, borderRadius: 4 }} />
            <div className="rounded" style={{ width: 80, height: 16, background: "#282828" }} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-lg" style={{ height: 32, background: "#282828" }} />
          <div className="rounded-full" style={{ width: 32, height: 32, background: "#f9f9f9" }} />
        </div>
      </div>

      {/* Styling tokens (overlay pills) */}
      <div
        className="absolute flex items-center rounded-lg border"
        style={{
          right: 288,
          top: 350,
          padding: 4,
          gap: 5,
          background: "#282828",
          borderColor: "#0085ff",
          boxShadow: "0px 3px 34px rgba(0,133,255,0.12)",
        }}
      >
        <div className="flex items-center justify-center rounded" style={{ background: "#0085ff", width: 20, height: 20 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M4 4h6v6M20 20h-6v-6M4 20v-6h6M20 4v6h-6" />
          </svg>
        </div>
        <span className="font-urbanist font-bold text-white" style={{ fontSize: 14 }}>16px</span>
      </div>
      <div
        className="absolute flex items-center rounded-lg border"
        style={{
          right: -84,
          top: 231,
          padding: "4px 8px 4px 4px",
          gap: 5,
          background: "rgba(252,132,68,0.04)",
          borderColor: "#fc8444",
          boxShadow: "0px 3px 34px rgba(252,132,68,0.12)",
        }}
      >
        <div className="flex items-center justify-center rounded" style={{ background: "#fc8444", width: 21, height: 21 }}>
          <span className="font-poppins font-semibold text-white" style={{ fontSize: 10 }}>Tt</span>
        </div>
        <span className="font-urbanist font-bold" style={{ color: "#4b4b4b", fontSize: 12 }}>Poppins</span>
      </div>
      <div
        className="absolute flex items-center rounded-lg border"
        style={{
          right: 238,
          top: 228,
          padding: "4px 10px 4px 4px",
          gap: 5,
          background: "#282828",
          borderColor: "#f55d67",
          boxShadow: "0px 3px 34px rgba(245,93,103,0.12)",
        }}
      >
        <div className="rounded" style={{ background: "#f55d67", width: 21, height: 21 }} />
        <span className="font-urbanist font-bold text-white" style={{ fontSize: 12 }}>Primary / 6</span>
      </div>

      <div
        className="absolute pointer-events-none"
        style={{
          right: 0,
          top: 0,
          width: 104,
          height: 445,
          background: "linear-gradient(to left, #0d0d0d, rgba(13,13,13,0))",
          opacity: 0.8,
        }}
      />
    </div>
  );
}

export function GetStartedSteps() {
  return (
    <section
      className="flex flex-col items-center bg-black w-full"
      style={{ padding: "100px 80px", gap: 50 }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
          <h2
            className="font-urbanist font-bold whitespace-nowrap"
            style={{ fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em", color: "#fff" }}
          >
            Get Started in{" "}
            <span
              style={{
                background: "linear-gradient(to right, #bcbaff 13%, #625df5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              3 Steps
            </span>
          </h2>
          <p className="font-urbanist text-white" style={{ fontSize: 20, lineHeight: 1.2 }}>
            All features take less than 5 minutes to get started
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
              Try for Free
            </span>
          </button>
        </div>
      </div>

      {/* Dark 3-column card */}
      <div
        className="flex flex-col overflow-hidden"
        style={{
          width: 1280,
          background: "#111",
          border: "2px solid #1a1a1a",
          borderRadius: 24,
        }}
      >
        <div
          className="flex items-center overflow-hidden w-full"
          style={{ gap: 6, padding: 2, background: "#111" }}
        >
          <Step1Column />
          <Step2Column />
          <Step3Column />
        </div>

        {/* Testimonial strip */}
        <div
          className="flex items-center justify-between w-full"
          style={{ padding: 40, background: "#1a1a1a" }}
        >
          <div className="flex items-center" style={{ gap: 16 }}>
            <div
              className="relative overflow-hidden"
              style={{ width: 52, height: 52, borderRadius: "50%" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/linda-steps.png"
                alt="Linda Belcher"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col" style={{ gap: 4 }}>
              <span className="font-urbanist font-semibold text-white" style={{ fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
                Linda Belcher
              </span>
              <span className="font-urbanist text-white" style={{ fontSize: 16, lineHeight: 1.2, opacity: 0.52, letterSpacing: "-0.03em" }}>
                Product Manager @HeyGen
              </span>
            </div>
          </div>
          <p
            className="font-urbanist font-semibold text-white"
            style={{ fontSize: 24, width: 421, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Velt hosts all collaboration functionalities needed to{" "}
            <span style={{ color: "#0085ff" }}>boost engagement</span> at HeyGen
          </p>
        </div>
      </div>
    </section>
  );
}
