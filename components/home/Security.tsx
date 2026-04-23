// Security — Figma node 8506:97836 (1280×963). Centered header + 2 CTAs,
// then a grid: Multi Region Hosting (400×493) + Isolated Server and Data
// Storage (400×493) above a wide Security Certification card (816×228).
//
// The pixel-art cloud + database visuals from Figma are approximated here
// with CSS/SVG — phase-3 asset swap will bring in the exact pixel art.

type CloudColor = "purple" | "pink" | "orange";

function PixelCloud({ color, label }: { color: CloudColor; label: string }) {
  const fill = color === "purple" ? "#625df5" : color === "pink" ? "#ff74f6" : "#ff6d4f";
  return (
    <div className="flex flex-col items-center" style={{ gap: 8 }}>
      <svg width="80" height="48" viewBox="0 0 80 48" fill="none" aria-hidden="true">
        {/* Simplified pixel cloud — phase-3 will use the exact Figma sprite */}
        <g fill={fill}>
          <rect x="16" y="8" width="8" height="8" />
          <rect x="24" y="4" width="8" height="8" />
          <rect x="32" y="0" width="16" height="8" />
          <rect x="48" y="4" width="8" height="8" />
          <rect x="56" y="8" width="8" height="8" />
          <rect x="8" y="16" width="8" height="8" />
          <rect x="64" y="16" width="8" height="8" />
          <rect x="0" y="24" width="72" height="8" />
          <rect x="0" y="32" width="8" height="8" />
          <rect x="64" y="32" width="8" height="8" />
        </g>
      </svg>
      <span
        className="font-firacode font-medium uppercase"
        style={{ color: fill, fontSize: 14, letterSpacing: "0.04em" }}
      >
        {label}
      </span>
    </div>
  );
}

function DatabaseCylinder({ variant }: { variant: "faint" | "pink" | "blue" | "orange" }) {
  const stroke =
    variant === "blue"
      ? "#1d2ec4"
      : variant === "pink"
      ? "#e935c0"
      : variant === "orange"
      ? "#c4471d"
      : "rgba(17,17,17,0.12)";
  return (
    <svg width="48" height="50" viewBox="0 0 48 50" fill="none" aria-hidden="true" style={{ overflow: "visible" }}>
      <ellipse cx="24" cy="10" rx="22" ry="8" stroke={stroke} strokeWidth="1.5" />
      <path d="M2 10 V40 Q24 48 46 40 V10" stroke={stroke} strokeWidth="1.5" fill="none" />
      <line x1="2" y1="22" x2="46" y2="22" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="2" y1="30" x2="46" y2="30" stroke={stroke} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function Security() {
  return (
    <section
      className="flex flex-col items-center bg-white"
      style={{ padding: "52px 80px 100px", gap: 52 }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32, width: 691 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
          <h2
            className="font-urbanist font-bold whitespace-nowrap"
            style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Enterprise level security
          </h2>
          <p className="font-urbanist" style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}>
            We security at each touchpoint to ensure privacy for our users
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          <button
            className="flex items-center justify-center rounded-lg"
            style={{ width: 156, height: 44, padding: "8px 16px", border: "2px solid #625df5" }}
          >
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
            >
              Trust Centre
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
              Learn More
            </span>
          </button>
        </div>
      </div>

      {/* Info grid */}
      <div className="flex flex-col" style={{ gap: 16, width: 816 }}>
        <div className="flex items-center" style={{ gap: 16 }}>
          {/* Multi Region Hosting card */}
          <article
            className="relative overflow-hidden"
            style={{
              width: 400,
              height: 493,
              background: "#f7f7f7",
              borderRadius: 24,
            }}
          >
            <div className="absolute" style={{ top: 36, left: 155 }}>
              <PixelCloud color="purple" label="AMSTERDAM" />
            </div>
            <div className="absolute" style={{ top: 177, right: 30 }}>
              <PixelCloud color="pink" label="TOKYO" />
            </div>
            <div className="absolute" style={{ top: 220, left: 20 }}>
              <PixelCloud color="orange" label="TEXAS" />
            </div>
            <div
              className="absolute flex flex-col items-start"
              style={{ bottom: 28, left: 30, width: 305, gap: 8 }}
            >
              <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
                Multi Region Hosting
              </h3>
              <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}>
                Host your data where you need it
              </p>
            </div>
          </article>

          {/* Isolated Server and Data Storage card */}
          <article
            className="relative overflow-hidden"
            style={{
              width: 400,
              height: 493,
              background: "#f7f7f7",
              borderRadius: 24,
            }}
          >
            <div
              className="absolute grid grid-cols-5 content-center justify-items-center items-center"
              style={{ top: 40, left: 0, right: 0, gap: 28 }}
            >
              {(["faint","faint","faint","faint","faint","pink","faint","blue","faint","orange","faint","faint","faint","faint","faint"] as const).map((variant, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center"
                  style={{
                    width: 56,
                    height: 56,
                    border: i === 7 ? "1.5px dashed #1d2ec4" : undefined,
                    borderRadius: 4,
                  }}
                >
                  <DatabaseCylinder variant={variant} />
                </div>
              ))}
            </div>
            <div
              className="absolute flex flex-col items-start"
              style={{ bottom: 29, left: 30, width: 329, gap: 8 }}
            >
              <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
                Isolated Server
                <br />
                and Data Storage
              </h3>
              <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}>
                Enable Loom-style recording. Your users can record their screen,
                camera or audio
              </p>
            </div>
          </article>
        </div>

        {/* Security Certification wide card */}
        <article
          className="relative flex items-center justify-between overflow-hidden"
          style={{
            width: 816,
            height: 228,
            background: "#f7f7f7",
            borderRadius: 24,
            padding: 32,
          }}
        >
          <div className="flex flex-col items-start" style={{ gap: 8 }}>
            <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
              Security Certification
            </h3>
            <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}>
              SOC2 Type, HIPAA with BAA
            </p>
          </div>
          <div className="flex items-center" style={{ gap: 24 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/badge-soc2-light.png"
              alt="AICPA SOC"
              width={128}
              height={128}
              style={{ display: "block", objectFit: "contain" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/badge-hipaa-base.png"
              alt="HIPAA"
              width={128}
              height={128}
              style={{ display: "block", objectFit: "contain" }}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
