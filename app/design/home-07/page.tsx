import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velt — Review & approval for AI-native apps",
  description:
    "Add a pull request to your product. Embeddable review and approval for AI-native apps — let agents propose, not touch. Approved changes ship through your webhook with an audit record.",
};

/* ──────────────────────────────────────────────────────────────────────────
   "Dispatch" — 7th exploration, General Intelligence Company style reference.

   An editorial publication about applied AI, not a product catalog. Faithful
   to the supplied spec: a warm Cream canvas (#fefffc), near-black ppmondwest
   serif headlines (→ Source Serif 4, ligatures disabled, -0.02em tracking),
   compact 'af' sans body (→ Inter), and a single chromatic accent — Hudson
   Blue (#0081c0) used ONLY for inline links inside headlines. Navigation is a
   dark floating pill island (~50px radius), never a full-width bar. The hero
   is a literary tableau: a hand-painted (CSS/SVG) twilight metropolis with a
   frosted-glass text card floating lower-left — no product screenshots, no
   gradients-as-background, no card grids / matrices. Content radii stay at
   4px; pill + frosted radii are reserved for the nav island and overlays.

   Carries the CURRENT Velt positioning (per project memory): embeddable
   review & approval for AI-native apps — "Add a pull request to your product."
   "governance" is used exactly once (hero secondary), and no stats or quotes
   are fabricated — the editorial format leads with argument, not metrics.

   Standalone RSC — no "use client", no hooks, no external images; every
   painted scene and diagram is inline SVG / CSS. Source Serif 4 + Inter are
   pulled from Google Fonts and hoisted by React 19.
   ────────────────────────────────────────────────────────────────────────── */

// ── Palette (General Intelligence Company spec) ───────────────────────────────
const CREAM = "#fefffc"; // page canvas
const LINEN = "#f9faf7"; // band / nav-adjacent surface
const PAPER = "#ffffff"; // elevated card surface
const INK = "#171717"; // primary text
const CARBON = "#2c2c2c"; // subheadings
const IRON = "#444141"; // borders / labels
const STEEL = "#646464"; // muted body
const SAGE = "#dee2de"; // hairline border ring
const GRAPHITE = "#282834"; // floating nav fill
const OBSIDIAN = "#1f1f29"; // nav CTA fill
const HUDSON = "#0081c0"; // the one chromatic accent — headline links only
const SLATE = "#41a1cf"; // outlined action border

const SERIF = "'Source Serif 4', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif";

const DIAGRAM_SHADOW = "rgba(0,0,0,0.08) 0px 1px 1px 0px, rgba(0,0,0,0.08) 0px 4px 5px 0px";
const FROSTED_SHADOW = "rgba(0,0,0,0.06) 0px 2px 2px 0px, rgba(0,0,0,0.04) 0px 0px 0px 5px";
const NAV_SHADOW = "rgba(0,0,0,0.15) 0px 2px 6px 0px";

// ── Inline data ──────────────────────────────────────────────────────────────
const NAV_LINKS = ["Product", "Manifesto", "Customers", "Pricing"];

// The review & approval layer, presented as a reading list — not a card grid.
const PRIMITIVES = [
  { name: "Comments", desc: "Agents and humans propose changes as threaded, contextual comments pinned to the work." },
  { name: "Approval flows", desc: "Route every proposed change to the right human. Nothing ships unapproved." },
  { name: "Review agents", desc: "Automated reviewers triage, summarize, and flag proposals before a person looks." },
  { name: "Suggestions", desc: "Inline edit suggestions that apply cleanly the moment they're approved." },
  { name: "Audit trail", desc: "Every proposal, decision, and change recorded as an immutable history." },
  { name: "Memory", desc: "Context that persists across reviews so decisions stay consistent over time." },
  { name: "Notifications", desc: "An in-app inbox and email that keep approvers in the loop, never blocked." },
];

const SUBSTRATE = ["Presence", "Multiplayer editing", "Recording", "Huddle"];

const TRUST = ["Northwind", "Quanta", "Lumen", "Stratus", "Cohort", "Datalore"];

const FOOTER_GROUPS = [
  { heading: "Product", links: ["Comments", "Approval flows", "Review agents", "Audit trail", "Notifications"] },
  { heading: "Developers", links: ["Documentation", "Quickstart", "Webhooks", "API reference", "Status"] },
  { heading: "Company", links: ["Manifesto", "Customers", "Careers", "Writing", "Contact"] },
];

// ── Painted scenes (hand-authored, CSS + SVG) ─────────────────────────────────

/** Twilight metropolis behind frosted glass — the hero tableau. */
function CityScene() {
  // deterministic building set (no Math.random → no hydration drift)
  const buildings = [
    { x: 0, w: 78, h: 150, cols: 3, rows: 7 },
    { x: 70, w: 96, h: 232, cols: 4, rows: 11 },
    { x: 158, w: 70, h: 184, cols: 3, rows: 9 },
    { x: 222, w: 110, h: 290, cols: 4, rows: 13 },
    { x: 326, w: 84, h: 206, cols: 3, rows: 10 },
    { x: 402, w: 124, h: 330, cols: 5, rows: 15 },
    { x: 520, w: 80, h: 196, cols: 3, rows: 9 },
    { x: 592, w: 104, h: 256, cols: 4, rows: 12 },
    { x: 690, w: 72, h: 168, cols: 3, rows: 8 },
    { x: 756, w: 116, h: 300, cols: 4, rows: 14 },
    { x: 866, w: 86, h: 214, cols: 3, rows: 10 },
    { x: 944, w: 96, h: 250, cols: 4, rows: 12 },
  ];
  const stars = [
    [60, 40], [140, 70], [240, 36], [360, 60], [470, 30], [560, 64],
    [680, 44], [800, 70], [900, 38], [990, 58], [320, 90], [620, 96],
  ];
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* sky */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #141a36 0%, #29274f 34%, #5b4a73 62%, #b9745f 84%, #e8a368 100%)",
        }}
      />
      {/* afterglow near horizon */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "16%",
          width: 900,
          height: 520,
          transform: "translateX(-50%)",
          background: "radial-gradient(closest-side, rgba(255,200,120,0.55), rgba(255,170,110,0.18) 55%, rgba(255,170,110,0) 78%)",
          filter: "blur(6px)",
        }}
      />
      <svg
        viewBox="0 0 1040 560"
        preserveAspectRatio="xMidYMax slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {/* stars */}
        {stars.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.6 : 1} fill="#fff" opacity={0.85} />
        ))}
        {/* haze layer of distant buildings */}
        <g opacity="0.5">
          {buildings.map((b, i) => (
            <rect key={`haze-${i}`} x={b.x + 18} y={560 - b.h * 0.7} width={b.w * 0.8} height={b.h * 0.7} fill="#3a3a56" />
          ))}
        </g>
        {/* foreground skyline */}
        {buildings.map((b, bi) => {
          const top = 560 - b.h;
          const padX = 9;
          const cellW = (b.w - padX * 2) / b.cols;
          const cellH = (b.h - 22) / b.rows;
          const windows = [];
          for (let r = 0; r < b.rows; r++) {
            for (let c = 0; c < b.cols; c++) {
              const lit = (r * 7 + c * 3 + bi * 5) % 4 !== 0;
              windows.push(
                <rect
                  key={`${bi}-${r}-${c}`}
                  x={b.x + padX + c * cellW + cellW * 0.18}
                  y={top + 14 + r * cellH + cellH * 0.18}
                  width={cellW * 0.62}
                  height={cellH * 0.5}
                  fill={lit ? "#ffd98a" : "#1a1828"}
                  opacity={lit ? (r + c) % 3 === 0 ? 0.95 : 0.7 : 0.9}
                />
              );
            }
          }
          return (
            <g key={bi}>
              <rect x={b.x} y={top} width={b.w} height={b.h} fill="#14121f" />
              {windows}
            </g>
          );
        })}
        {/* foreground foliage silhouette, lower corners */}
        <path d="M0 560 C 40 500, 30 470, 70 460 C 50 500, 90 520, 110 560 Z" fill="#0e0c16" />
        <path d="M1040 560 C 1000 506, 1014 474, 974 462 C 1000 500, 962 524, 940 560 Z" fill="#0e0c16" />
      </svg>
      {/* vignette */}
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 220px rgba(8,6,20,0.65)" }} />
    </div>
  );
}

/** Dawn meadow behind frosted glass — the closing tableau. */
function MeadowScene() {
  const flowers = [
    [120, 470], [210, 500], [330, 478], [460, 510], [560, 486],
    [690, 506], [800, 480], [910, 500], [400, 520], [640, 470],
  ];
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #cfe7f2 0%, #eaf3ec 42%, #fbf6df 66%, #f6f0dd 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "72%",
          top: "12%",
          width: 360,
          height: 360,
          transform: "translate(-50%,0)",
          background: "radial-gradient(closest-side, rgba(255,238,180,0.9), rgba(255,236,170,0.25) 55%, rgba(255,236,170,0) 78%)",
          filter: "blur(4px)",
        }}
      />
      <svg viewBox="0 0 1040 560" preserveAspectRatio="xMidYMax slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* rolling hills */}
        <path d="M0 360 C 260 300, 520 380, 1040 320 L1040 560 L0 560 Z" fill="#bcd9a6" />
        <path d="M0 420 C 320 360, 640 440, 1040 392 L1040 560 L0 560 Z" fill="#9bc783" />
        <path d="M0 470 C 300 430, 700 500, 1040 452 L1040 560 L0 560 Z" fill="#7eb267" />
        {/* daffodils */}
        {flowers.map(([cx, cy], i) => (
          <g key={i}>
            <rect x={cx - 1} y={cy} width="2" height="26" fill="#5a8a46" />
            <circle cx={cx} cy={cy} r="7" fill="#ffd23f" />
            <circle cx={cx} cy={cy} r="3" fill="#f08a24" />
          </g>
        ))}
      </svg>
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 200px rgba(40,60,40,0.28)" }} />
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Logo glyph + wordmark. */
function Logo({ light = false }: { light?: boolean }) {
  const c = light ? "#fff" : INK;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke={c} strokeWidth="1.6" />
        <path d="M8 12.5l2.8 3L16 9" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em", color: c }}>Velt</span>
    </span>
  );
}

/** Frosted glass text card overlaid on a painted scene. */
function FrostedCard({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "center" }) {
  return (
    <div
      style={{
        position: "relative",
        maxWidth: 520,
        borderRadius: 24,
        padding: "28px 28px 26px",
        background: "linear-gradient(180deg, rgba(40,46,72,0.42), rgba(20,24,44,0.5))",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow: FROSTED_SHADOW,
        textAlign: align,
      }}
    >
      {children}
    </div>
  );
}

/** White arrow link used inside frosted cards. */
function FrostLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: SANS,
        fontWeight: 500,
        fontSize: 15,
        color: "#fff",
        textDecoration: "underline",
        textUnderlineOffset: 3,
        textDecorationThickness: 1,
      }}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

/** Secondary action — Slate Cyan outline, 4px radius (no filled CTA on canvas). */
function OutlinedButton({ children, tone = SLATE }: { children: React.ReactNode; tone?: string }) {
  return (
    <a
      href="#"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontFamily: SANS,
        fontWeight: 500,
        fontSize: 15,
        color: tone,
        border: `1px solid ${tone}`,
        borderRadius: 4,
        padding: "9px 16px",
        textDecoration: "none",
        background: "transparent",
      }}
    >
      {children}
    </a>
  );
}

/** White diagram card with hairline Sage border + soft layered shadow. */
function DiagramCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: PAPER, border: `1px solid ${SAGE}`, borderRadius: 16, padding: 24, boxShadow: DIAGRAM_SHADOW }}>
      {children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DispatchHomePage() {
  return (
    <div style={{ background: CREAM, color: INK, fontFamily: SANS, minHeight: "100vh", letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased" }}>
      {/* GIC typography — Source Serif 4 (display) + Inter (UI), hoisted to <head>. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&display=swap"
      />

      <style>{`
        .gic-wrap { max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
        @media (min-width: 1024px) { .gic-wrap { padding-left: 40px; padding-right: 40px; } }
        .gic-serif { font-family: ${SERIF}; font-feature-settings: "liga" 0; letter-spacing: -0.02em; }
        .gic-hlink { color: ${HUDSON}; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
        .gic-navlink { color: #fff; text-decoration: none; opacity: .92; transition: opacity .15s ease; }
        .gic-navlink:hover { opacity: 1; }
        .gic-foot { color: ${STEEL}; text-decoration: none; transition: color .12s ease; }
        .gic-foot:hover { color: ${INK}; }
        @media (min-width: 900px) {
          .gic-editorial { grid-template-columns: 1.1fr 0.9fr !important; }
          .gic-sidebar-row { grid-template-columns: 200px 1fr !important; }
          .gic-primitives { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ====================== FLOATING PILL NAV ====================== */}
      <nav
        aria-label="Primary"
        style={{
          position: "fixed",
          top: 18,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2147483647,
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: GRAPHITE,
          borderRadius: 50,
          padding: "8px 10px 8px 18px",
          boxShadow: NAV_SHADOW,
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        <Logo light />
        <ul style={{ display: "flex", gap: 18, listStyle: "none", margin: 0, padding: 0 }} className="gic-navitems">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href="#" className="gic-navlink" style={{ fontFamily: SANS, fontWeight: 400, fontSize: 15 }}>{l}</a>
            </li>
          ))}
        </ul>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.7)", fontFamily: SANS, fontSize: 13 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          9:41 PM NYC
        </span>
        <a
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: OBSIDIAN,
            color: "#fff",
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: 15,
            borderRadius: 4,
            padding: "8px 14px",
            textDecoration: "none",
          }}
        >
          Book a demo <span aria-hidden="true">→</span>
        </a>
      </nav>

      <main>
        {/* ====================== FULL-BLEED PAINTED HERO ====================== */}
        <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
          <CityScene />
          <div className="gic-wrap" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end" }}>
            <div style={{ paddingTop: 120, paddingBottom: 72, width: "100%" }}>
              <FrostedCard>
                <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)" }}>
                  Velt · the review &amp; approval layer
                </span>
                <h1 className="gic-serif" style={{ fontWeight: 400, fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.1, color: "#fff", margin: "14px 0 0" }}>
                  Add a pull request to your product
                </h1>
                <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,0.88)", margin: "16px 0 0", maxWidth: 440 }}>
                  Embeddable review and approval for AI-native apps. Add governance to
                  the work that can&apos;t ship unapproved — let agents propose, not touch.
                </p>
                <div style={{ marginTop: 20 }}>
                  <FrostLink>Get to know us</FrostLink>
                </div>
              </FrostedCard>
            </div>
          </div>
        </section>

        {/* ====================== TRUST LINE (quiet) ====================== */}
        <section style={{ background: CREAM, paddingTop: 56, paddingBottom: 8 }}>
          <div className="gic-wrap" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
            <p style={{ fontFamily: SANS, fontWeight: 400, fontSize: 13, color: STEEL, margin: 0 }}>
              Trusted by teams shipping AI-native products
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28 }}>
              {TRUST.map((n) => (
                <span key={n} style={{ fontFamily: SANS, fontWeight: 600, fontSize: 16, color: INK, opacity: 0.4 }}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ====================== EDITORIAL: THE PROBLEM ====================== */}
        <section style={{ background: CREAM, paddingTop: 64, paddingBottom: 64 }}>
          <div className="gic-wrap gic-editorial" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
            <div>
              <h2 className="gic-serif" style={{ fontWeight: 400, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.1, color: INK, margin: 0, maxWidth: 520 }}>
                Agents now act inside the apps your customers{" "}
                <a href="#" className="gic-hlink">can&apos;t afford to break</a>.
              </h2>
              <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.5, color: STEEL, margin: "20px 0 0", maxWidth: 460 }}>
                Software is filling with autonomous actors that write, edit, and execute
                on their own. The moment an agent can change something that matters, the
                question stops being <em>can it act</em> and becomes <em>who approved this</em>.
              </p>
            </div>

            {/* sidebar label + diagram card: isolated, ungoverned systems */}
            <div className="gic-sidebar-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start" }}>
              <div>
                <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: 15, color: INK, margin: 0 }}>Isolated actions</h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: STEEL, margin: "8px 0 0" }}>
                  Today each agent acts alone, with no shared place to be reviewed or
                  recorded.
                </p>
              </div>
              <DiagramCard>
                <svg viewBox="0 0 260 150" style={{ width: "100%", height: "auto", display: "block" }}>
                  {[
                    [18, 22], [120, 14], [206, 34], [70, 70], [168, 84], [30, 108], [214, 110], [120, 120],
                  ].map(([x, y], i) => (
                    <rect key={i} x={x} y={y} width="32" height="32" rx="3" fill="none" stroke={IRON} strokeWidth="1.4" />
                  ))}
                </svg>
              </DiagramCard>
            </div>
          </div>
        </section>

        {/* ====================== EDITORIAL: THE TURN ====================== */}
        <section style={{ background: LINEN, paddingTop: 64, paddingBottom: 64 }}>
          <div className="gic-wrap gic-editorial" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
            {/* diagram first on this band */}
            <div className="gic-sidebar-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, alignItems: "start", order: 2 }}>
              <DiagramCard>
                <svg viewBox="0 0 260 150" style={{ width: "100%", height: "auto", display: "block" }}>
                  {/* propose → review → approve → webhook flow */}
                  <rect x="10" y="58" width="46" height="34" rx="3" fill="none" stroke={IRON} strokeWidth="1.4" />
                  <rect x="92" y="58" width="46" height="34" rx="3" fill="none" stroke={IRON} strokeWidth="1.4" />
                  <rect x="174" y="58" width="46" height="34" rx="3" fill="none" stroke={HUDSON} strokeWidth="1.6" />
                  <path d="M56 75h32M138 75h32" stroke={IRON} strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M84 71l6 4-6 4M166 71l6 4-6 4" fill="none" stroke={IRON} strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M197 92v18h40" stroke={HUDSON} strokeWidth="1.6" fill="none" />
                  <circle cx="241" cy="110" r="4" fill={HUDSON} />
                  <text x="33" y="116" fontFamily={SANS} fontSize="9" fill={STEEL} textAnchor="middle">propose</text>
                  <text x="115" y="116" fontFamily={SANS} fontSize="9" fill={STEEL} textAnchor="middle">review</text>
                  <text x="197" y="50" fontFamily={SANS} fontSize="9" fill={HUDSON} textAnchor="middle">approve</text>
                </svg>
              </DiagramCard>
              <div>
                <h3 style={{ fontFamily: SANS, fontWeight: 700, fontSize: 15, color: INK, margin: 0 }}>One reviewable surface</h3>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: STEEL, margin: "8px 0 0" }}>
                  Proposals gather in one place, get a decision, and ship through your
                  webhook with a signed audit record.
                </p>
              </div>
            </div>

            <div style={{ order: 1 }}>
              <h2 className="gic-serif" style={{ fontWeight: 400, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.1, color: INK, margin: 0, maxWidth: 520 }}>
                So give the work a place to be{" "}
                <a href="#" className="gic-hlink">proposed and approved</a>.
              </h2>
              <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.5, color: STEEL, margin: "20px 0 0", maxWidth: 460 }}>
                Velt embeds the pattern every engineering team already trusts — the pull
                request — directly into your product. Agents open proposals as comments.
                People review them. Approved changes fire through your webhook, and every
                decision is recorded.
              </p>
              <div style={{ marginTop: 24 }}>
                <OutlinedButton>Read how it works</OutlinedButton>
              </div>
            </div>
          </div>
        </section>

        {/* ====================== EDITORIAL: THE LAYER, IN PARTS ====================== */}
        <section style={{ background: CREAM, paddingTop: 64, paddingBottom: 64 }}>
          <div className="gic-wrap">
            <h2 className="gic-serif" style={{ fontWeight: 400, fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, color: INK, margin: 0, maxWidth: 560 }}>
              The review &amp; approval layer, in parts
            </h2>
            <p style={{ fontFamily: SANS, fontSize: 16, lineHeight: 1.5, color: STEEL, margin: "16px 0 0", maxWidth: 520 }}>
              Seven primitives, composable as React components or headless APIs. Read
              them as a list, adopt them in any order.
            </p>

            {/* reading list, not a card grid — hairline-divided definition rows */}
            <dl className="gic-primitives" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0, margin: "32px 0 0", columnGap: 48 }}>
              {PRIMITIVES.map((p) => (
                <div
                  key={p.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "150px 1fr",
                    gap: 16,
                    alignItems: "baseline",
                    padding: "16px 0",
                    borderTop: `1px solid ${SAGE}`,
                  }}
                >
                  <dt className="gic-serif" style={{ fontWeight: 400, fontSize: 18, color: CARBON }}>{p.name}</dt>
                  <dd style={{ margin: 0, fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: STEEL }}>{p.desc}</dd>
                </div>
              ))}
            </dl>

            <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: STEEL, margin: "28px 0 0", maxWidth: 640 }}>
              Beneath them sits the collaboration substrate — {SUBSTRATE.join(", ").replace(/, ([^,]*)$/, ", and $1")} —
              so the people doing the approving feel each other in the room.
            </p>
          </div>
        </section>

        {/* ====================== PULL STATEMENT ====================== */}
        <section style={{ background: CREAM, paddingTop: 24, paddingBottom: 64 }}>
          <div className="gic-wrap" style={{ borderTop: `1px solid ${SAGE}`, borderBottom: `1px solid ${SAGE}`, paddingTop: 48, paddingBottom: 48 }}>
            <p className="gic-serif" style={{ fontWeight: 400, fontSize: "clamp(26px, 3.6vw, 40px)", lineHeight: 1.2, color: INK, margin: 0, maxWidth: 820 }}>
              The next decade of software won&apos;t be defined by what agents{" "}
              <em>can</em> do, but by what we let them ship{" "}
              <a href="#" className="gic-hlink">without a human in the loop</a>.
            </p>
          </div>
        </section>

        {/* ====================== CLOSING PAINTED TABLEAU + CTA ====================== */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: 520 }}>
          <MeadowScene />
          <div className="gic-wrap" style={{ position: "relative", minHeight: 520, display: "flex", alignItems: "center" }}>
            <div style={{ paddingTop: 80, paddingBottom: 80 }}>
              <FrostedCard>
                <h2 className="gic-serif" style={{ fontWeight: 400, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, color: "#fff", margin: 0 }}>
                  Let agents propose, not touch
                </h2>
                <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,0.88)", margin: "16px 0 0", maxWidth: 420 }}>
                  Add review and approval to your product in an afternoon. Start free, or
                  book a demo to see it running on your own workflows.
                </p>
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 22, flexWrap: "wrap" }}>
                  <FrostLink>Book a demo</FrostLink>
                  <a href="#" style={{ fontFamily: SANS, fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,0.85)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Read the docs <span aria-hidden="true">→</span>
                  </a>
                </div>
              </FrostedCard>
            </div>
          </div>
        </section>
      </main>

      {/* ====================== FOOTER ====================== */}
      <footer style={{ background: CREAM, borderTop: `1px solid ${SAGE}` }}>
        <div className="gic-wrap" style={{ paddingTop: 56, paddingBottom: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 40 }}>
            <div style={{ gridColumn: "1 / -1", maxWidth: 320 }}>
              <Logo />
              <p style={{ fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: STEEL, marginTop: 14 }}>
                Embeddable review and approval for AI-native apps. Add a pull request to
                your product.
              </p>
            </div>
            {FOOTER_GROUPS.map((g) => (
              <div key={g.heading}>
                <h4 style={{ fontFamily: SANS, fontWeight: 600, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", color: IRON, margin: 0 }}>{g.heading}</h4>
                <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                  {g.links.map((l) => (
                    <li key={l}><a href="#" className="gic-foot" style={{ fontFamily: SANS, fontSize: 15 }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between", marginTop: 48, paddingTop: 24, borderTop: `1px solid ${SAGE}` }}>
            <p style={{ fontFamily: SANS, fontSize: 13, color: STEEL, margin: 0 }}>© {new Date().getFullYear()} Velt. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy", "Terms", "Security"].map((l) => (
                <a key={l} href="#" className="gic-foot" style={{ fontFamily: SANS, fontSize: 13 }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
