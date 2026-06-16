import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velt — Playground",
  description:
    "The collaboration layer for modern software. Drop-in comments, live cursors, presence, notifications, huddle and recording — playful, fast, framework-agnostic.",
};

/* ──────────────────────────────────────────────────────────────────────────
   "Playground" — 5th exploration, Geniestudio style reference.

   Faithful to the supplied Geniestudio spec: an airy pastel Sky Wash canvas
   (#ebf5ff) with Paper White cards (#fafdff) separated by 1px Stone hairlines
   — no drop shadows, just one barely-there blue-tinted wash. The ONLY filled
   action color is Pressed Charcoal (#181d27); the four illustration accents
   (Cornflower, Tangerine, Amethyst, Mustard) are reserved strictly for
   decorative characters, doodles and icon tiles — never for UI controls or
   text. Radii live on the 8 / 16 / 32 / 9999 scale; 32px is the signature.

   Composition deliberately departs from the dark-grid siblings: a centered
   hero with inline character avatars + a confetti scatter of floating
   doodles, a grid-less "scene" band, a quartet of pastel-tinted feature
   callouts, a 3-column hairline testimonial grid, and the brand blue gradient
   used exactly once for the closing CTA. Whitespace is the section divider.

   Aeonik → Inter Tight, Geist → Geist (both pulled from Google Fonts and
   hoisted by React 19). Standalone RSC — no "use client", no hooks, no
   external images; every character and motif is inline SVG / CSS.
   ────────────────────────────────────────────────────────────────────────── */

// ── Palette (Geniestudio spec) ───────────────────────────────────────────────
const SKY = "#ebf5ff"; // page canvas
const PAPER = "#fafdff"; // card surface
const INK = "#0a0d12"; // primary text
const CHARCOAL = "#181d27"; // the one filled action color
const STONE = "#535862"; // body text + hairline borders
const FOG = "#93979f"; // muted helper text

const CORNFLOWER = "#4fbeff";
const TANGERINE = "#f26110";
const AMETHYST = "#9552e0";
const MUSTARD = "#bb9915";

const MORNING = "#cce7ff";
const LILAC = "#f1e6ff";
const SPROUT = "#d3f6e3";
const BUTTERY = "linear-gradient(rgb(255,249,224) 0%, rgb(255,236,163) 100%)";
const SUNSET = "linear-gradient(rgb(255,242,235) 0%, rgb(255,209,184) 100%)";
const BRAND_BLUE = "linear-gradient(135deg, #479dff 11%, #0069e0 78%)";

const DISPLAY = "'Inter Tight', ui-sans-serif, system-ui, sans-serif";
const UI = "'Geist', ui-sans-serif, system-ui, sans-serif";

const ACCENTS = [CORNFLOWER, TANGERINE, AMETHYST, MUSTARD] as const;

// ── Inline data ──────────────────────────────────────────────────────────────
const NAV_LINKS = ["How it works", "Features", "Customers", "Pricing"];

const FEATURES = [
  {
    name: "Comments",
    blurb:
      "Threaded, contextual comments pinned to any element — with mentions, reactions and reply-by-email.",
    tint: MORNING,
    accent: CORNFLOWER,
    icon: "comment",
  },
  {
    name: "Live cursors",
    blurb:
      "Everyone's cursor in real time, with names and colors. Sub-100ms presence across the globe.",
    tint: SUNSET,
    accent: TANGERINE,
    icon: "cursor",
  },
  {
    name: "Presence",
    blurb:
      "Avatar stacks that show who's online and exactly where they're working right now.",
    tint: LILAC,
    accent: AMETHYST,
    icon: "presence",
  },
  {
    name: "Notifications",
    blurb:
      "A drop-in inbox plus email — fully themeable, batched, and wired to your events.",
    tint: BUTTERY,
    accent: MUSTARD,
    icon: "bell",
  },
  {
    name: "Huddle",
    blurb:
      "Spin up audio + video huddles right inside your product. No tabs, no context switching.",
    tint: SPROUT,
    accent: "#0d9a5d",
    icon: "huddle",
  },
  {
    name: "Recording",
    blurb:
      "Capture async screen + voice clips and attach them to any thread, so feedback never gets lost.",
    tint: MORNING,
    accent: CORNFLOWER,
    icon: "record",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Install the SDK",
    body: "Add @veltdev/react and wrap your app in a single provider.",
  },
  {
    n: "2",
    title: "Drop a component",
    body: "Place <VeltComments /> wherever you want collaboration to live.",
  },
  {
    n: "3",
    title: "Ship to everyone",
    body: "Presence, cursors and notifications light up — instantly, in any framework.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We shipped real-time comments and presence across the whole product in under a week. It felt like adding a few lines of code, not building an infra team.",
    name: "Alex Rivera",
    role: "VP Engineering",
    company: "Stratus",
    accent: CORNFLOWER,
  },
  {
    quote:
      "Our designers and PMs finally live in the same canvas as the build. Velt made the app feel alive without us touching the backend.",
    name: "Priya Nair",
    role: "Head of Product",
    company: "Northwind",
    accent: AMETHYST,
  },
  {
    quote:
      "The free Hacker plan got us prototyping in an afternoon. By Friday we had multiplayer huddles in production.",
    name: "Devon Cole",
    role: "Founding Engineer",
    company: "Lumen",
    accent: TANGERINE,
  },
];

const FOOTER_GROUPS = [
  { heading: "Product", links: ["Comments", "Live cursors", "Presence", "Notifications", "Huddle"] },
  { heading: "Developers", links: ["Documentation", "Quickstart", "API reference", "Changelog", "Status"] },
  { heading: "Company", links: ["Customers", "Pricing", "Careers", "Blog", "Contact"] },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Diamond logomark + wordmark. */
function Logo() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <span
        aria-hidden="true"
        style={{
          width: 22,
          height: 22,
          background: BRAND_BLUE,
          borderRadius: 7,
          transform: "rotate(45deg)",
          display: "inline-block",
        }}
      />
      <span style={{ fontFamily: UI, fontWeight: 600, fontSize: 18, color: INK, letterSpacing: "-0.01em" }}>
        Velt
      </span>
    </span>
  );
}

/** The single high-emphasis action — Pressed Charcoal pill. */
function ActionButton({
  children,
  large = false,
  light = false,
}: {
  children: React.ReactNode;
  large?: boolean;
  light?: boolean;
}) {
  return (
    <a
      href="#"
      style={{
        fontFamily: UI,
        fontWeight: 500,
        fontSize: large ? 16 : 14,
        color: light ? INK : "#ffffff",
        background: light ? "#ffffff" : CHARCOAL,
        borderRadius: 9999,
        padding: large ? "14px 30px" : "10px 20px",
        display: "inline-block",
        textDecoration: "none",
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </a>
  );
}

/** A circular character avatar — a round accent fill with a tiny doodle face. */
function Character({ color, size = 48 }: { color: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        background: color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
        <circle cx="8.5" cy="10" r="1.6" fill="#fff" />
        <circle cx="15.5" cy="10" r="1.6" fill="#fff" />
        <path d="M8 15c1.3 1.6 6.7 1.6 8 0" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** A floating cursor with a name pill — a "character" in the Genie sense. */
function Cursor({ name, color }: { name: string; color: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "flex-start" }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 3.5L19 11.2L12.4 12.7L9.6 19L5 3.5Z" fill={color} />
      </svg>
      <span
        style={{
          fontFamily: UI,
          fontWeight: 600,
          fontSize: 11,
          color: "#fff",
          background: color,
          borderRadius: 9999,
          padding: "3px 9px",
          marginLeft: -2,
          marginTop: 8,
        }}
      >
        {name}
      </span>
    </span>
  );
}

/** Square icon tile, 16px radius, in one of the accent colors. */
function IconTile({ accent, icon }: { accent: string; icon: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 48,
        height: 48,
        borderRadius: 16,
        background: accent,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <FeatureGlyph icon={icon} />
    </span>
  );
}

function FeatureGlyph({ icon }: { icon: string }) {
  const s = { stroke: "#fff", strokeWidth: 1.8, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "comment":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 5h16v10H9l-5 4V5z" {...s} /></svg>
      );
    case "cursor":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 4l13 7-6 1.4-2.6 6L6 4z" {...s} /></svg>
      );
    case "presence":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" {...s} /><path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" {...s} /><circle cx="17" cy="8" r="2.4" {...s} /></svg>
      );
    case "bell":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" {...s} /><path d="M10 19a2 2 0 004 0" {...s} /></svg>
      );
    case "huddle":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="2" {...s} /><path d="M16 10l5-3v10l-5-3v-4z" {...s} /></svg>
      );
    case "record":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" {...s} /><circle cx="12" cy="12" r="3" fill="#fff" stroke="none" /></svg>
      );
    default:
      return null;
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PlaygroundHomePage() {
  return (
    <div
      style={{
        background: SKY,
        color: INK,
        fontFamily: UI,
        minHeight: "100vh",
        letterSpacing: "-0.01em",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Genie typography — Inter Tight (display) + Geist (UI), hoisted to <head>. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=Geist:wght@400;500;600&display=swap"
      />

      <style>{`
        .genie-wrap { max-width: 1200px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
        @media (min-width: 1024px) { .genie-wrap { padding-left: 40px; padding-right: 40px; } }
        .genie-link { color: ${STONE}; text-decoration: none; transition: color .15s ease; }
        .genie-link:hover { color: ${INK}; }
        @keyframes genie-bob { 0%,100% { transform: translateY(0) rotate(var(--r,0deg)); } 50% { transform: translateY(-12px) rotate(var(--r,0deg)); } }
        .genie-float { animation: genie-bob 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .genie-float { animation: none !important; } }
      `}</style>

      {/* ============================ NAV ============================ */}
      <header style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2147483647 }}>
        <nav className="genie-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
          <Logo />
          <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }} className="genie-navlinks">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a href="#" className="genie-link" style={{ fontFamily: UI, fontWeight: 500, fontSize: 14 }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <ActionButton>Book demo</ActionButton>
        </nav>
      </header>

      <main>
        {/* ============================ HERO ============================ */}
        <section style={{ position: "relative", overflow: "hidden", paddingTop: 168, paddingBottom: 96 }}>
          {/* confetti scatter of floating doodles */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div className="genie-float" style={{ position: "absolute", left: "8%", top: 150, ["--r" as string]: "-8deg" }}>
              <Cursor name="Maya" color={CORNFLOWER} />
            </div>
            <div className="genie-float" style={{ position: "absolute", right: "9%", top: 140, animationDelay: "1.4s", ["--r" as string]: "6deg" }}>
              <Cursor name="Devon" color={TANGERINE} />
            </div>
            <div className="genie-float" style={{ position: "absolute", left: "14%", bottom: 90, animationDelay: "2.1s" }}>
              <Character color={AMETHYST} size={44} />
            </div>
            <div className="genie-float" style={{ position: "absolute", right: "13%", bottom: 70, animationDelay: ".8s" }}>
              <Character color={MUSTARD} size={40} />
            </div>
            {/* heart */}
            <svg className="genie-float" style={{ position: "absolute", left: "26%", top: 120, animationDelay: "1.1s" }} width="26" height="26" viewBox="0 0 24 24"><path d="M12 21s-7-4.6-9.2-8.4C1 9.5 2.6 6 6 6c2 0 3.2 1.3 4 2.4C10.8 7.3 12 6 14 6c3.4 0 5 3.5 3.2 6.6C19 16.4 12 21 12 21z" fill={TANGERINE} /></svg>
            {/* star */}
            <svg className="genie-float" style={{ position: "absolute", right: "27%", top: 110, animationDelay: "2.4s" }} width="24" height="24" viewBox="0 0 24 24"><path d="M12 3l2.3 5.6 6 .5-4.6 3.9 1.5 5.9L12 16.8 6.3 18.8l1.5-5.9L3.2 9.1l6-.5L12 3z" fill={MUSTARD} /></svg>
            {/* paper plane */}
            <svg className="genie-float" style={{ position: "absolute", left: "6%", bottom: 180, animationDelay: "1.7s" }} width="30" height="30" viewBox="0 0 24 24"><path d="M21 3L3 11l6 2 2 6 4-5 6 5z" fill="none" stroke={AMETHYST} strokeWidth="1.6" strokeLinejoin="round" /></svg>
            {/* cloud */}
            <svg className="genie-float" style={{ position: "absolute", right: "6%", bottom: 200, animationDelay: ".5s" }} width="46" height="28" viewBox="0 0 46 28"><path d="M12 24a8 8 0 010-16 10 10 0 0119.5-2A7 7 0 0136 24H12z" fill="#fff" stroke={CORNFLOWER} strokeWidth="1.4" /></svg>
          </div>

          <div className="genie-wrap" style={{ position: "relative", textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: UI,
                fontWeight: 600,
                fontSize: 12,
                color: STONE,
                background: PAPER,
                border: `1px solid ${STONE}`,
                borderRadius: 9999,
                padding: "7px 14px",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 9999, background: "#0d9a5d", display: "inline-block" }} />
              The collaboration layer for B2B
            </span>

            <h1
              style={{
                fontFamily: DISPLAY,
                fontWeight: 500,
                fontSize: "clamp(44px, 7vw, 84px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: INK,
                margin: "24px auto 0",
                maxWidth: 900,
              }}
            >
              Make your app feel
              <span style={{ display: "inline-flex", alignItems: "center", gap: 12, margin: "0 14px", verticalAlign: "middle" }}>
                <Character color={CORNFLOWER} size={56} />
                <Character color={TANGERINE} size={56} />
                <Character color={AMETHYST} size={56} />
              </span>
              alive
            </h1>

            <p
              style={{
                fontFamily: UI,
                fontWeight: 500,
                fontSize: 18,
                lineHeight: 1.5,
                color: STONE,
                maxWidth: 560,
                margin: "24px auto 0",
              }}
            >
              Drop-in comments, live cursors, presence, notifications, huddle and
              recording. Add real-time multiplayer to your product in minutes — in
              any framework.
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", marginTop: 36, flexWrap: "wrap" }}>
              <ActionButton large>Book a demo</ActionButton>
              <a href="#" className="genie-link" style={{ fontFamily: UI, fontWeight: 600, fontSize: 16, color: INK, display: "inline-flex", alignItems: "center", gap: 6 }}>
                Read the docs
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ===================== GRID-LESS SCENE BAND ===================== */}
        <section style={{ paddingTop: 32, paddingBottom: 88 }}>
          <div className="genie-wrap">
            <div
              style={{
                position: "relative",
                background: PAPER,
                border: `1px solid ${STONE}`,
                borderRadius: 32,
                padding: "56px 32px",
                overflow: "hidden",
                boxShadow: "rgba(4,69,144,0.08) 0px 14px 20px 4px",
              }}
            >
              {/* scattered product motifs, no grid */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div className="genie-float" style={{ position: "absolute", left: "7%", top: 40, ["--r" as string]: "-4deg" }}>
                  <Cursor name="Sora" color={AMETHYST} />
                </div>
                <div className="genie-float" style={{ position: "absolute", right: "10%", top: 56, animationDelay: "1.3s", ["--r" as string]: "5deg" }}>
                  <Cursor name="Kai" color="#0d9a5d" />
                </div>
                {/* mini comment bubble */}
                <div
                  className="genie-float"
                  style={{
                    position: "absolute",
                    left: "12%",
                    bottom: 36,
                    animationDelay: ".9s",
                    background: "#fff",
                    border: `1px solid ${STONE}`,
                    borderRadius: 16,
                    borderTopLeftRadius: 4,
                    padding: "10px 12px",
                    width: 190,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Character color={TANGERINE} size={22} />
                    <span style={{ fontFamily: UI, fontWeight: 600, fontSize: 12, color: INK }}>Priya</span>
                  </div>
                  <p style={{ fontFamily: UI, fontSize: 12, color: STONE, margin: "6px 0 0", lineHeight: 1.4 }}>
                    Ship this behind the Hacker plan? 🚀
                  </p>
                </div>
                {/* reaction chips */}
                <div className="genie-float" style={{ position: "absolute", right: "12%", bottom: 44, animationDelay: "1.8s", display: "flex", gap: 6 }}>
                  {["❤️", "🎉", "👀"].map((e) => (
                    <span key={e} style={{ background: "#fff", border: `1px solid ${STONE}`, borderRadius: 9999, padding: "4px 8px", fontSize: 13 }}>{e}</span>
                  ))}
                </div>
              </div>

              <div style={{ position: "relative", textAlign: "center", maxWidth: 520, margin: "0 auto", padding: "40px 0" }}>
                <span style={{ fontFamily: UI, fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: FOG }}>
                  Your product, full of people
                </span>
                <h2 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: INK, margin: "12px 0 0" }}>
                  Collaboration that feels like play
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== TINTED FEATURE CALLOUTS ===================== */}
        <section style={{ paddingTop: 8, paddingBottom: 88 }}>
          <div className="genie-wrap">
            <div style={{ maxWidth: 640 }}>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.12, letterSpacing: "-0.02em", color: INK, margin: 0 }}>
                Every multiplayer feature, one SDK
              </h2>
              <p style={{ fontFamily: UI, fontWeight: 500, fontSize: 18, lineHeight: 1.5, color: STONE, marginTop: 16 }}>
                Composable React components and headless APIs. Mix and match to build
                exactly the collaborative experience your users expect.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
                marginTop: 48,
              }}
            >
              {FEATURES.map((f) => (
                <article
                  key={f.name}
                  style={{
                    background: f.tint,
                    borderRadius: 32,
                    padding: 32,
                  }}
                >
                  <IconTile accent={f.accent} icon={f.icon} />
                  <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 24, letterSpacing: "-0.02em", color: INK, margin: "20px 0 0" }}>
                    {f.name}
                  </h3>
                  <p style={{ fontFamily: UI, fontWeight: 500, fontSize: 14, lineHeight: 1.5, color: STONE, marginTop: 8 }}>
                    {f.blurb}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== GET STARTED — 3 STEPS ===================== */}
        <section style={{ paddingTop: 8, paddingBottom: 88 }}>
          <div className="genie-wrap">
            <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: INK, margin: 0 }}>
                Live in three steps
              </h2>
              <p style={{ fontFamily: UI, fontWeight: 500, fontSize: 16, lineHeight: 1.5, color: STONE, marginTop: 12 }}>
                Wrap, drop, ship. Most teams have multiplayer running before lunch.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 48 }}>
              {STEPS.map((s, i) => (
                <article
                  key={s.n}
                  style={{
                    background: PAPER,
                    border: `1px solid ${STONE}`,
                    borderRadius: 32,
                    padding: 32,
                  }}
                >
                  <span
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 16,
                      background: ACCENTS[i % ACCENTS.length],
                      color: "#fff",
                      fontFamily: DISPLAY,
                      fontWeight: 600,
                      fontSize: 22,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {s.n}
                  </span>
                  <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 20, letterSpacing: "-0.02em", color: INK, margin: "20px 0 0" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontFamily: UI, fontWeight: 500, fontSize: 14, lineHeight: 1.5, color: STONE, marginTop: 8 }}>
                    {s.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TESTIMONIAL GRID ===================== */}
        <section style={{ paddingTop: 8, paddingBottom: 88 }}>
          <div className="genie-wrap">
            <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: INK, margin: 0 }}>
                Teams ship faster with Velt
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, alignItems: "stretch" }}>
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.name}
                  style={{
                    background: PAPER,
                    border: `1px solid ${STONE}`,
                    borderRadius: 32,
                    padding: 40,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <blockquote style={{ fontFamily: UI, fontWeight: 500, fontSize: 16, lineHeight: 1.5, color: INK, margin: 0, flex: 1 }}>
                    “{t.quote}”
                  </blockquote>
                  <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 28 }}>
                    <Character color={t.accent} size={48} />
                    <span style={{ flex: 1 }}>
                      <span style={{ display: "block", fontFamily: UI, fontWeight: 600, fontSize: 14, color: INK }}>{t.name}</span>
                      <span style={{ display: "block", fontFamily: UI, fontWeight: 500, fontSize: 12, color: STONE }}>
                        {t.role} · {t.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== BRAND GRADIENT CTA (used once) ===================== */}
        <section style={{ paddingTop: 8, paddingBottom: 96 }}>
          <div className="genie-wrap">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: BRAND_BLUE,
                borderRadius: 32,
                padding: "72px 32px",
                textAlign: "center",
              }}
            >
              {/* floating characters on the gradient */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div className="genie-float" style={{ position: "absolute", left: "10%", top: 36 }}>
                  <Character color={MUSTARD} size={40} />
                </div>
                <div className="genie-float" style={{ position: "absolute", right: "11%", bottom: 36, animationDelay: "1.2s" }}>
                  <Character color={TANGERINE} size={44} />
                </div>
                <svg className="genie-float" style={{ position: "absolute", right: "20%", top: 44, animationDelay: ".7s" }} width="24" height="24" viewBox="0 0 24 24"><path d="M12 3l2.3 5.6 6 .5-4.6 3.9 1.5 5.9L12 16.8 6.3 18.8l1.5-5.9L3.2 9.1l6-.5L12 3z" fill="#fff" opacity="0.85" /></svg>
              </div>

              <h2 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: "#fff", margin: "0 auto", maxWidth: 680, position: "relative" }}>
                Add multiplayer to your app in minutes
              </h2>
              <p style={{ fontFamily: UI, fontWeight: 500, fontSize: 18, lineHeight: 1.5, color: "rgba(255,255,255,0.9)", margin: "20px auto 0", maxWidth: 480, position: "relative" }}>
                Start free with the Hacker plan, or book a demo to see Velt running in
                your own product.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 32, position: "relative", flexWrap: "wrap" }}>
                <ActionButton large light>Book a demo</ActionButton>
                <a
                  href="#"
                  style={{
                    fontFamily: UI,
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.6)",
                    borderRadius: 9999,
                    padding: "13px 28px",
                    textDecoration: "none",
                  }}
                >
                  Read the docs
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer style={{ paddingBottom: 56 }}>
        <div className="genie-wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 40 }}>
            <div style={{ gridColumn: "1 / -1", maxWidth: 300 }}>
              <Logo />
              <p style={{ fontFamily: UI, fontWeight: 500, fontSize: 14, lineHeight: 1.5, color: STONE, marginTop: 16 }}>
                The collaboration layer for B2B. Real-time multiplayer features,
                drop-in for any framework.
              </p>
            </div>
            {FOOTER_GROUPS.map((g) => (
              <div key={g.heading}>
                <h4 style={{ fontFamily: UI, fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: FOG, margin: 0 }}>
                  {g.heading}
                </h4>
                <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {g.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="genie-link" style={{ fontFamily: UI, fontWeight: 500, fontSize: 14 }}>{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 56,
              paddingTop: 28,
              borderTop: `1px solid ${STONE}`,
            }}
          >
            <p style={{ fontFamily: UI, fontWeight: 500, fontSize: 14, color: STONE, margin: 0 }}>
              © {new Date().getFullYear()} Velt. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy", "Terms", "Security"].map((l) => (
                <a key={l} href="#" className="genie-link" style={{ fontFamily: UI, fontWeight: 500, fontSize: 14 }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
