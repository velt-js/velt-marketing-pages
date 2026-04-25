// Security — Figma node 177:44582 (updated to 2×2 grid).
//
// Header: shield icon + "Enterprise Level Security" + subhead + two CTAs.
// Grid: 4 cards (400×493 each, 2 columns × 2 rows):
//   Row 1 — Multi Region Hosting (binary tree routing visual)
//           Multi Region Hosting (pixel clouds: Amsterdam/Tokyo/Texas)
//   Row 2 — Isolated Server and Data Storage (selection grid)
//           Custom Data Encryption (colored pixel grid with 1s/0s)
// Below: Security Certification wide card (816×228) with SOC2 + HIPAA badges.
//
// Pixel visuals approximated with inline SVG + CSS — a phase-3 pass can
// swap in exact Figma-exported sprites.
//
// Note: Figma labels both row-1 cards "Multi Region Hosting". The left card's
// visual (YOUR SERVER → VELT routing) is conceptually "routing", but we
// render the title verbatim to match Figma copy.

type CloudColor = "purple" | "pink" | "orange" | "faint";

function PixelCloud({ color, label }: { color: CloudColor; label?: string }) {
  const fill =
    color === "purple"
      ? "#625df5"
      : color === "pink"
      ? "#ff74f6"
      : color === "orange"
      ? "#ff6d4f"
      : "rgba(17,17,17,0.08)";
  return (
    <div className="flex flex-col items-center" style={{ gap: 8 }}>
      <svg width="80" height="48" viewBox="0 0 80 48" fill="none" aria-hidden="true">
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
      {label && (
        <span
          className="font-firacode font-medium uppercase"
          style={{ color: fill, fontSize: 14, letterSpacing: "0.04em" }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function DatabaseCylinder({
  variant,
}: {
  variant: "faint" | "pink" | "blue" | "orange" | "purple";
}) {
  const stroke =
    variant === "blue"
      ? "#1d2ec4"
      : variant === "pink"
      ? "#e935c0"
      : variant === "orange"
      ? "#c4471d"
      : variant === "purple"
      ? "#625df5"
      : "rgba(17,17,17,0.12)";
  return (
    <svg
      width="48"
      height="50"
      viewBox="0 0 48 50"
      fill="none"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <ellipse cx="24" cy="10" rx="22" ry="8" stroke={stroke} strokeWidth="1.5" />
      <path d="M2 10 V40 Q24 48 46 40 V10" stroke={stroke} strokeWidth="1.5" fill="none" />
      <line x1="2" y1="22" x2="46" y2="22" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="2" y1="30" x2="46" y2="30" stroke={stroke} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="40"
      height="48"
      viewBox="0 0 40 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 2 L36 8 V22 C36 33 28 42 20 46 C12 42 4 33 4 22 V8 L20 2 Z"
        stroke="#625df5"
        strokeWidth="2"
        fill="none"
      />
      <line x1="20" y1="14" x2="20" y2="30" stroke="#625df5" strokeWidth="2" />
      <line x1="12" y1="22" x2="28" y2="22" stroke="#625df5" strokeWidth="2" />
    </svg>
  );
}

// Multi Region Hosting (routing visual) — row 1 left. Uses the exact
// pixel-art SVG extracted from the reference enterprise-cards.jsx.
function RoutingVisual() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/home/security-routing.svg"
      alt=""
      aria-hidden="true"
      style={{ width: 286, height: 267, objectFit: "contain" }}
    />
  );
}

// Custom Data Encryption — 2×7 grid of colored cells, each containing either
// a small pixel icon or a binary digit.
function EncryptionGrid() {
  type Cell = { bg: string; glyph?: "0" | "1"; color?: string };
  const row1: Cell[] = [
    { bg: "#c4471d" },
    { bg: "#1d2ec4" },
    { bg: "#ffffff", glyph: "1", color: "#111" },
    { bg: "#0d9a5d" },
    { bg: "#e935c0" },
    { bg: "#111", glyph: "0", color: "#fff" },
    { bg: "#54c9e8" },
  ];
  const row2: Cell[] = [
    { bg: "#e935c0" },
    { bg: "#111", glyph: "0", color: "#fff" },
    { bg: "#54c9e8" },
    { bg: "#c4471d" },
    { bg: "#7c4dff" },
    { bg: "#ffffff", glyph: "1", color: "#111" },
    { bg: "#ff9144" },
  ];

  const renderCell = (cell: Cell, i: number) => (
    <div
      key={i}
      className="flex items-center justify-center"
      style={{ width: 44, height: 44, background: cell.bg, borderRadius: 2 }}
    >
      {cell.glyph ? (
        <span
          className="font-firacode font-bold"
          style={{ color: cell.color, fontSize: 18 }}
        >
          {cell.glyph}
        </span>
      ) : (
        <span
          aria-hidden
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
          }}
        />
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center" style={{ gap: 6, paddingTop: 60 }}>
      <div className="flex items-center" style={{ gap: 6 }}>
        {row1.map(renderCell)}
      </div>
      <div className="flex items-center" style={{ gap: 6 }}>
        {row2.map(renderCell)}
      </div>
    </div>
  );
}

type SecurityCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

function SecurityCard({ title, subtitle, children }: SecurityCardProps) {
  return (
    <article
      className="relative overflow-hidden"
      style={{
        width: 400,
        height: 493,
        background: "#f7f7f7",
        borderRadius: 24,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
      <div
        className="absolute flex flex-col items-start"
        style={{ bottom: 28, left: 30, right: 30, gap: 8 }}
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
    </article>
  );
}

export function Security() {
  return (
    <section
      // `full-bleed-bg` stretches the white bg to 100vw on viewports ≥1440.
      // On the homepage Security already sits inside a full-bleed parent, so
      // this is idempotent there; on /libraries it lets Security match the
      // edge-to-edge feel of the other white sections.
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "52px 80px 100px", gap: 52 }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32, width: 691 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 16 }}>
          <ShieldIcon />
          <h2
            className="font-urbanist font-bold whitespace-nowrap"
            style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Enterprise Level Security
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

      {/* 2x2 card grid */}
      <div className="flex flex-col" style={{ gap: 16, width: 816 }}>
        {/* Row 1 */}
        <div className="flex items-center" style={{ gap: 16 }}>
          <SecurityCard
            title="Multi Region Hosting"
            subtitle="Own and control your customer data"
          >
            <RoutingVisual />
          </SecurityCard>

          <SecurityCard
            title="Multi Region Hosting"
            subtitle="Host your data where you need it"
          >
            <div className="relative" style={{ width: 360, height: 360 }}>
              {/* Faded background clouds */}
              <div className="absolute" style={{ top: 10, left: 16 }}>
                <PixelCloud color="faint" />
              </div>
              <div className="absolute" style={{ top: 130, right: 10 }}>
                <PixelCloud color="faint" />
              </div>
              <div className="absolute" style={{ top: 200, left: 0 }}>
                <PixelCloud color="faint" />
              </div>
              {/* Main labeled clouds */}
              <div className="absolute" style={{ top: 20, left: 130 }}>
                <PixelCloud color="purple" label="AMSTERDAM" />
              </div>
              <div className="absolute" style={{ top: 110, left: 12 }}>
                <PixelCloud color="orange" label="TEXAS" />
              </div>
              <div className="absolute" style={{ top: 150, right: 10 }}>
                <PixelCloud color="pink" label="TOKYO" />
              </div>
            </div>
          </SecurityCard>
        </div>

        {/* Row 2 */}
        <div className="flex items-center" style={{ gap: 16 }}>
          <SecurityCard
            title="Isolated Server and Data Storage"
            subtitle="Our customer data is logically isolated and never co-mingled"
          >
            <div
              className="grid grid-cols-5 content-center justify-items-center items-center"
              style={{ gap: 28, padding: "20px 20px 120px" }}
            >
              {(
                [
                  "faint",
                  "faint",
                  "faint",
                  "faint",
                  "faint",
                  "pink",
                  "faint",
                  "blue",
                  "faint",
                  "orange",
                  "faint",
                  "faint",
                  "faint",
                  "faint",
                  "faint",
                ] as const
              ).map((variant, i) => (
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
          </SecurityCard>

          <SecurityCard
            title="Custom Data Encryption"
            subtitle="Encrypt with your own keys, so even we can't read your data"
          >
            <EncryptionGrid />
          </SecurityCard>
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
            <h3
              className="font-urbanist font-bold"
              style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              Security Certification
            </h3>
            <p
              className="font-urbanist"
              style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}
            >
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
