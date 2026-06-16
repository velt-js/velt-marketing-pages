import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velt — Aurora",
  description:
    "The collaboration layer for modern software. Drop-in real-time multiplayer — comments, live cursors, presence, notifications, huddle and recording — for any B2B SaaS app.",
};

/**
 * Aurora Dark — a standalone alternative home-page design exploration for Velt.
 *
 * Pure React Server Component: no "use client", no hooks, no handlers. Every
 * visual (cursors, avatars, icons, terminal, glows) is hand-authored CSS/SVG
 * so the page is fully self-contained and builds clean.
 */

/* ---- shared data ----------------------------------------------------- */

const NAV_LINKS = ["Product", "Use cases", "Developers", "Pricing"] as const;

const TRUSTED_BY = [
  "Northwind",
  "Cobalt",
  "Lumen",
  "Quanta",
  "Beacon",
  "Stratus",
] as const;

const FOOTER_GROUPS: { heading: string; links: string[] }[] = [
  {
    heading: "Product",
    links: ["Comments", "Live cursors", "Presence", "Notifications", "Huddle"],
  },
  {
    heading: "Developers",
    links: ["Documentation", "API reference", "Quickstart", "Changelog", "Status"],
  },
  {
    heading: "Company",
    links: ["About", "Customers", "Careers", "Blog", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Pricing", "Security", "Community", "Templates", "Support"],
  },
];

/* ---- tiny presentational primitives ---------------------------------- */

/** Soft aurora radial glow used behind hero focal + final CTA. */
function AuroraGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{
        background:
          "radial-gradient(closest-side, rgba(98,93,245,0.55), rgba(98,93,245,0.18) 45%, rgba(98,93,245,0) 78%)",
        filter: "blur(8px)",
      }}
    />
  );
}

/** A floating colored cursor with a name-label pill. */
function LiveCursor({
  name,
  color,
  className = "",
  delay = "0s",
}: {
  name: string;
  color: string;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute flex items-start ${className}`}
      style={{ animation: "aurora-float 6s ease-in-out infinite", animationDelay: delay }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 3.5L19 11.2L12.4 12.7L9.6 19L5 3.5Z"
          fill={color}
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="-ml-1 mt-3 rounded-full px-2.5 py-1 text-[11px] font-semibold text-black shadow-lg"
        style={{ background: color }}
      >
        {name}
      </span>
    </div>
  );
}

/** Overlapping presence avatar stack drawn with gradient circles. */
function AvatarStack() {
  const avatars = [
    "linear-gradient(135deg,#E934BF,#625DF5)",
    "linear-gradient(135deg,#0D9A5D,#FFCD2E)",
    "linear-gradient(135deg,#FF7162,#E934BF)",
    "linear-gradient(135deg,#625DF5,#0D9A5D)",
  ];
  return (
    <div className="flex items-center">
      <div className="flex -space-x-3">
        {avatars.map((bg, i) => (
          <span
            key={i}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0a0a0a]"
            style={{ background: bg }}
            aria-hidden="true"
          />
        ))}
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-velt-charcoal text-[11px] font-semibold text-white ring-2 ring-[#0a0a0a]">
          +9
        </span>
      </div>
    </div>
  );
}

/** Feature-tile icon: a 36px rounded square with a small CSS/SVG glyph. */
function TileIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-velt-charcoal bg-[#101013] text-velt-purple">
      {children}
    </div>
  );
}

/* ---- page ------------------------------------------------------------ */

export default function AuroraHomePage() {
  return (
    <div className="font-urbanist min-h-screen bg-black text-white antialiased">
      {/* Animation + texture keyframes (RSC-safe inline style element). */}
      <style>{`
        @keyframes aurora-float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-8px) translateX(3px); }
        }
        @keyframes aurora-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes aurora-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-motion { animation: none !important; }
        }
      `}</style>

      {/* ============================ NAV ============================ */}
      <header className="fixed inset-x-0 top-0 z-[2147483647]">
        <nav
          aria-label="Primary"
          className="border-b border-white/[0.06] bg-black/70 backdrop-blur-xl"
        >
          <div className="container-page flex h-16 items-center justify-between">
            {/* wordmark */}
            <a href="#top" className="flex items-center gap-2">
              <span
                className="inline-block h-6 w-6 rounded-md"
                style={{
                  background:
                    "conic-gradient(from 210deg, #625DF5, #E934BF, #625DF5)",
                }}
                aria-hidden="true"
              />
              <span className="text-xl font-bold tracking-tight">Velt</span>
            </a>

            {/* centered links */}
            <ul className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-label text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* right utilities */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="hidden text-label text-white/70 transition-colors hover:text-white sm:inline-block"
              >
                Sign in
              </a>
              <a
                href="#"
                className="rounded-full bg-velt-purple px-4 py-2 text-label font-semibold text-white shadow-[0_0_24px_-4px_rgba(98,93,245,0.7)] transition-transform hover:scale-[1.03]"
              >
                Book demo
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* ============================ HERO ============================ */}
        <section className="relative overflow-hidden bg-black pt-32 pb-24 lg:pt-44 lg:pb-32">
          {/* dot/grid texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 90% 60% at 50% 28%, #000 35%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 60% at 50% 28%, #000 35%, transparent 80%)",
            }}
          />
          {/* top spotlight bleed */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[-120px] h-[460px] w-[820px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(98,93,245,0.35), rgba(98,93,245,0) 72%)",
              filter: "blur(12px)",
            }}
          />

          <div className="container-page relative">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-velt-charcoal bg-[#0d0d10] px-3 py-1.5 text-tag text-velt-link-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-velt-green aurora-motion" style={{ animation: "aurora-pulse 2.4s ease-in-out infinite" }} />
                The collaboration stack for B2B
              </span>

              <h1 className="text-display-h1 mt-6">
                The collaboration layer
                <br className="hidden sm:block" /> for modern software
              </h1>

              <p className="text-body-lg mx-auto mt-6 max-w-xl text-velt-muted">
                Drop-in real-time multiplayer — comments, live cursors, presence,
                notifications, huddle and recording. Add it to your app in minutes,
                in any framework.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#"
                  className="w-full rounded-full bg-velt-purple px-7 py-3.5 text-label font-semibold text-white shadow-[0_0_40px_-6px_rgba(98,93,245,0.85)] transition-transform hover:scale-[1.03] sm:w-auto"
                >
                  Book a demo
                </a>
                <a
                  href="#"
                  className="w-full rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-label font-semibold text-white/90 transition-colors hover:bg-white/[0.06] sm:w-auto"
                >
                  Read the docs
                </a>
              </div>
            </div>

            {/* ---- HERO FOCAL: collaboration canvas on aurora glow ---- */}
            <div className="relative mx-auto mt-16 max-w-4xl lg:mt-20">
              <AuroraGlow className="left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2" />

              <div className="relative overflow-hidden rounded-[28px] border border-velt-charcoal bg-[#0a0a0c]/90 shadow-[0_30px_120px_-30px_rgba(98,93,245,0.55)] backdrop-blur-xl">
                {/* window chrome */}
                <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="h-3 w-3 rounded-full bg-velt-orange" />
                    <span className="h-3 w-3 rounded-full bg-velt-yellow" />
                    <span className="h-3 w-3 rounded-full bg-velt-green" />
                  </div>
                  <span className="text-tag text-velt-muted">app.acme.com · live</span>
                  <AvatarStack />
                </div>

                {/* canvas body */}
                <div className="relative h-[300px] sm:h-[360px]">
                  {/* faint grid */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                  />

                  {/* a faux doc/spreadsheet block being collaborated on */}
                  <div className="absolute left-6 top-7 hidden w-[260px] rounded-xl border border-velt-charcoal bg-[#101014] p-4 sm:block">
                    <div className="mb-3 h-2.5 w-24 rounded-full bg-white/15" />
                    <div className="space-y-2.5">
                      <div className="h-2 w-full rounded-full bg-white/[0.08]" />
                      <div className="h-2 w-[85%] rounded-full bg-white/[0.08]" />
                      <div className="h-2 w-[70%] rounded-full bg-velt-purple/40" />
                      <div className="h-2 w-[60%] rounded-full bg-white/[0.08]" />
                    </div>
                  </div>

                  {/* comment bubble */}
                  <div className="absolute right-5 top-10 w-[210px] rounded-2xl rounded-tr-sm border border-velt-charcoal bg-[#121217] p-3.5 shadow-xl sm:right-10">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-6 w-6 rounded-full"
                        style={{ background: "linear-gradient(135deg,#E934BF,#625DF5)" }}
                        aria-hidden="true"
                      />
                      <span className="text-[12px] font-semibold text-white">Priya N.</span>
                      <span className="text-[11px] text-velt-muted">2m</span>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-velt-link-muted">
                      Can we ship this view behind the Hacker plan? 🚀
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="rounded-full bg-velt-purple/20 px-2 py-0.5 text-[10px] font-semibold text-velt-purple">
                        Reply
                      </span>
                      <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-velt-link-muted">
                        Resolve
                      </span>
                    </div>
                  </div>

                  {/* live cursors */}
                  <LiveCursor
                    name="Maya"
                    color="#E934BF"
                    className="left-[42%] top-[30%]"
                    delay="0s"
                  />
                  <LiveCursor
                    name="Devon"
                    color="#0D9A5D"
                    className="left-[24%] bottom-[18%]"
                    delay="1.1s"
                  />
                  <LiveCursor
                    name="Sora"
                    color="#FFCD2E"
                    className="right-[34%] bottom-[26%]"
                    delay="2.2s"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= TRUSTED BY ========================= */}
        <section className="border-y border-white/[0.06] bg-black py-14">
          <div className="container-page">
            <p className="text-center text-tag text-velt-muted">
              Trusted by product teams building the next generation of SaaS
            </p>
            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
              {TRUSTED_BY.map((name) => (
                <li
                  key={name}
                  className="text-lg font-bold tracking-tight text-white/40 transition-colors hover:text-white/75"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ========================= BENTO GRID ========================= */}
        <section className="bg-black section-pad-y">
          <div className="container-page">
            <div className="max-w-2xl">
              <span className="text-tag text-velt-purple">The collaboration stack</span>
              <h2 className="text-display-h2 mt-4">
                Every multiplayer feature, one SDK
              </h2>
              <p className="text-body-lg mt-4 text-velt-muted">
                Composable React components and headless APIs. Mix and match to ship
                the collaborative experience your users expect.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
              {/* Comments — wide tile */}
              <article className="group relative overflow-hidden rounded-[20px] border border-velt-charcoal bg-[#0a0a0c] p-7 transition-colors hover:border-white/15 md:col-span-4">
                <TileIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 5h16v10H9l-5 4V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </TileIcon>
                <h3 className="text-display-h3 mt-5">Comments</h3>
                <p className="text-body mt-2 max-w-md text-velt-muted">
                  Threaded, contextual comments anywhere in your UI — pin them to any
                  element, with reactions, mentions and reply-by-email.
                </p>
                {/* preview motif */}
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-velt-charcoal bg-[#101014] p-3">
                  <span className="h-7 w-7 shrink-0 rounded-full" style={{ background: "linear-gradient(135deg,#625DF5,#E934BF)" }} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="h-2 w-20 rounded-full bg-white/15" />
                    <div className="mt-2 h-2 w-[70%] rounded-full bg-white/[0.08]" />
                  </div>
                  <span className="rounded-full bg-velt-purple/20 px-2.5 py-1 text-[10px] font-semibold text-velt-purple">@mention</span>
                </div>
              </article>

              {/* Live cursors — tall tile */}
              <article className="group relative overflow-hidden rounded-[20px] border border-velt-charcoal bg-[#0a0a0c] p-7 transition-colors hover:border-white/15 md:col-span-2 md:row-span-2">
                <TileIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 4l13 7-6 1.4-2.6 6L6 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </TileIcon>
                <h3 className="text-display-h3 mt-5">Live cursors</h3>
                <p className="text-body mt-2 text-velt-muted">
                  See everyone’s cursor in real time, with names and colors. Sub-100ms
                  presence across the globe.
                </p>
                <div className="relative mt-6 h-40 rounded-xl border border-velt-charcoal bg-[#101014]">
                  <LiveCursor name="Maya" color="#E934BF" className="left-5 top-6" />
                  <LiveCursor name="Devon" color="#0D9A5D" className="right-6 top-16" delay="1s" />
                  <LiveCursor name="Sora" color="#FFCD2E" className="left-10 bottom-5" delay="2s" />
                </div>
              </article>

              {/* Presence */}
              <article className="group relative overflow-hidden rounded-[20px] border border-velt-charcoal bg-[#0a0a0c] p-7 transition-colors hover:border-white/15 md:col-span-2">
                <TileIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </TileIcon>
                <h3 className="text-display-h3 mt-5">Presence</h3>
                <p className="text-body mt-2 text-velt-muted">
                  Avatar stacks that show who’s online, where.
                </p>
                <div className="mt-5">
                  <AvatarStack />
                </div>
              </article>

              {/* Notifications */}
              <article className="group relative overflow-hidden rounded-[20px] border border-velt-charcoal bg-[#0a0a0c] p-7 transition-colors hover:border-white/15 md:col-span-2">
                <TileIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </TileIcon>
                <h3 className="text-display-h3 mt-5">Notifications</h3>
                <p className="text-body mt-2 text-velt-muted">
                  In-app inbox plus email — fully customizable.
                </p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-velt-charcoal bg-[#101014]">
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-velt-pink text-[9px] font-bold text-white">3</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                  </span>
                  <div className="h-2 flex-1 rounded-full bg-white/[0.08]" />
                </div>
              </article>

              {/* Huddle — wide tile */}
              <article className="group relative overflow-hidden rounded-[20px] border border-velt-charcoal bg-[#0a0a0c] p-7 transition-colors hover:border-white/15 md:col-span-4">
                <TileIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="6" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M16 10l5-3v10l-5-3v-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </TileIcon>
                <h3 className="text-display-h3 mt-5">Huddle</h3>
                <p className="text-body mt-2 max-w-md text-velt-muted">
                  Spin up audio + video huddles directly inside your product — no
                  context switching, no third-party tabs.
                </p>
                <div className="mt-6 flex items-center gap-2">
                  {["#E934BF", "#0D9A5D", "#FF7162", "#FFCD2E"].map((c, i) => (
                    <span key={i} className="flex h-9 items-end gap-[3px] rounded-lg border border-velt-charcoal bg-[#101014] px-2.5">
                      {[10, 18, 8, 22, 12].map((h, j) => (
                        <span key={j} className="w-[3px] rounded-full aurora-motion" style={{ height: h, background: c, animation: "aurora-pulse 1.6s ease-in-out infinite", animationDelay: `${j * 0.15}s` }} />
                      ))}
                    </span>
                  ))}
                  <span className="ml-1 rounded-full bg-velt-green/15 px-2.5 py-1 text-[10px] font-semibold text-velt-green">● Live · 4 in call</span>
                </div>
              </article>

              {/* Recording — wide tile */}
              <article className="group relative overflow-hidden rounded-[20px] border border-velt-charcoal bg-[#0a0a0c] p-7 transition-colors hover:border-white/15 md:col-span-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <TileIcon>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                      </svg>
                    </TileIcon>
                    <h3 className="text-display-h3 mt-5">Recording</h3>
                    <p className="text-body mt-2 max-w-md text-velt-muted">
                      Capture async screen + voice recordings and attach them to any
                      comment thread, so feedback never gets lost in translation.
                    </p>
                  </div>
                  <div className="flex w-full items-center gap-3 rounded-xl border border-velt-charcoal bg-[#101014] p-3 md:w-[320px]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-velt-orange/20 text-velt-orange">
                      <span className="h-3 w-3 rounded-full bg-velt-orange aurora-motion" style={{ animation: "aurora-pulse 1.5s ease-in-out infinite" }} />
                    </span>
                    <div className="flex flex-1 items-center gap-[3px]">
                      {[8, 16, 10, 22, 14, 26, 12, 18, 9, 20, 11, 24].map((h, i) => (
                        <span key={i} className="w-[3px] rounded-full bg-velt-orange/60" style={{ height: h }} />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-velt-link-muted">0:42</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ===================== DEVELOPER SNIPPET ===================== */}
        <section className="bg-black section-pad-y">
          <div className="container-page">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              {/* pitch */}
              <div>
                <span className="text-tag text-velt-purple">Developer-first</span>
                <h2 className="text-display-h2 mt-4">
                  Drop-in. Framework-agnostic.
                </h2>
                <p className="text-body-lg mt-4 text-velt-muted">
                  Wrap your app in a provider, drop a component where you want
                  collaboration, and you’re live. Works with React, Next.js, and any
                  framework via headless APIs.
                </p>
                <ul className="mt-7 space-y-3.5">
                  {[
                    "Ship in minutes, not sprints",
                    "Free Hacker plan — 100 monthly active docs",
                    "SOC 2 Type II · GDPR-ready infrastructure",
                  ].map((item) => (
                    <li key={item} className="text-body flex items-center gap-3 text-white/90">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-velt-purple/15 text-velt-purple">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-label font-semibold text-white/90 transition-colors hover:bg-white/[0.06]"
                  >
                    Start for free
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </div>
              </div>

              {/* terminal/editor card */}
              <div className="relative">
                <AuroraGlow className="left-1/2 top-1/2 h-[420px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
                <div className="relative overflow-hidden rounded-[18px] border border-velt-charcoal bg-[#0a0a0c] shadow-[0_30px_90px_-30px_rgba(98,93,245,0.5)]">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-velt-orange" aria-hidden="true" />
                    <span className="h-3 w-3 rounded-full bg-velt-yellow" aria-hidden="true" />
                    <span className="h-3 w-3 rounded-full bg-velt-green" aria-hidden="true" />
                    <span className="ml-2 font-firacode text-[12px] text-velt-muted">App.tsx</span>
                  </div>
                  <pre className="overflow-x-auto px-5 py-5 font-firacode text-[13px] leading-relaxed">
                    <code>
                      <span className="text-velt-pink">import</span>{" "}
                      <span className="text-white">{"{ VeltProvider, VeltComments }"}</span>{" "}
                      <span className="text-velt-pink">from</span>{" "}
                      <span className="text-velt-green">{"\"@veltdev/react\""}</span>
                      <span className="text-velt-muted">;</span>
                      {"\n\n"}
                      <span className="text-velt-pink">export default function</span>{" "}
                      <span className="text-velt-yellow">App</span>
                      <span className="text-white">() {"{"}</span>
                      {"\n  "}
                      <span className="text-velt-pink">return</span>{" "}
                      <span className="text-white">(</span>
                      {"\n    "}
                      <span className="text-velt-muted">&lt;</span>
                      <span className="text-velt-purple">VeltProvider</span>{" "}
                      <span className="text-velt-orange">apiKey</span>
                      <span className="text-white">=</span>
                      <span className="text-velt-green">{"\"YOUR_API_KEY\""}</span>
                      <span className="text-velt-muted">&gt;</span>
                      {"\n      "}
                      <span className="text-velt-muted">&lt;</span>
                      <span className="text-velt-purple">VeltComments</span>{" "}
                      <span className="text-velt-muted">/&gt;</span>
                      {"\n      "}
                      <span className="text-velt-muted">{"{/* your app */}"}</span>
                      {"\n    "}
                      <span className="text-velt-muted">&lt;/</span>
                      <span className="text-velt-purple">VeltProvider</span>
                      <span className="text-velt-muted">&gt;</span>
                      {"\n  "}
                      <span className="text-white">);</span>
                      {"\n"}
                      <span className="text-white">{"}"}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================== TESTIMONIAL ======================== */}
        <section className="relative overflow-hidden bg-black section-pad-y">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(98,93,245,0.18), rgba(98,93,245,0) 72%)",
              filter: "blur(10px)",
            }}
          />
          <div className="container-page relative">
            <figure className="mx-auto max-w-3xl text-center">
              <span aria-hidden="true" className="text-display-h1 block leading-none text-velt-purple/40">“</span>
              <blockquote className="text-display-h2 -mt-4 font-semibold text-white">
                We shipped real-time comments and presence across our entire
                product in under a week. Velt felt like adding a few lines of code —
                not building an infra team.
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-4">
                <span
                  className="h-12 w-12 rounded-full"
                  style={{ background: "linear-gradient(135deg,#625DF5,#E934BF)" }}
                  aria-hidden="true"
                />
                <div className="text-left">
                  <div className="text-label font-semibold text-white">Alex Rivera</div>
                  <div className="text-label text-velt-muted">VP Engineering · Stratus</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ======================== FINAL CTA ======================== */}
        <section className="relative overflow-hidden bg-black section-pad-y">
          <AuroraGlow className="left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 75%)",
            }}
          />
          <div className="container-page relative text-center">
            <h2 className="text-display-h1 mx-auto max-w-3xl">
              Add multiplayer to your app in minutes
            </h2>
            <p className="text-body-lg mx-auto mt-5 max-w-xl text-velt-muted">
              Start free with the Hacker plan, or book a demo to see Velt in your
              product.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#"
                className="w-full rounded-full bg-velt-purple px-8 py-4 text-label font-semibold text-white shadow-[0_0_48px_-6px_rgba(98,93,245,0.9)] transition-transform hover:scale-[1.03] sm:w-auto"
              >
                Book a demo
              </a>
              <a
                href="#"
                className="w-full rounded-full border border-white/15 bg-white/[0.02] px-8 py-4 text-label font-semibold text-white/90 transition-colors hover:bg-white/[0.06] sm:w-auto"
              >
                Read the docs
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer className="border-t border-white/[0.06] bg-black">
        <div className="container-page py-16">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
            {/* brand col */}
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-6 w-6 rounded-md"
                  style={{ background: "conic-gradient(from 210deg, #625DF5, #E934BF, #625DF5)" }}
                  aria-hidden="true"
                />
                <span className="text-xl font-bold tracking-tight">Velt</span>
              </div>
              <p className="text-body mt-4 max-w-xs text-velt-muted">
                The collaboration stack for B2B. Real-time multiplayer features,
                drop-in for any framework.
              </p>
            </div>

            {/* link groups */}
            {FOOTER_GROUPS.map((group) => (
              <div key={group.heading}>
                <h4 className="text-tag text-velt-muted">{group.heading}</h4>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-label text-velt-link-muted transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
            <p className="text-label text-velt-muted">
              © {new Date().getFullYear()} Velt. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Security"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-label text-velt-muted transition-colors hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
