import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velt — Blueprint",
  description:
    "The collaboration stack for B2B. Drop-in real-time multiplayer features — comments, live cursors, presence, notifications, recording, and huddle — for any framework.",
};

/* ──────────────────────────────────────────────────────────────────────────
   Blueprint Enterprise — alternative Velt home page.
   Standalone React Server Component. No "use client", no hooks, no handlers.
   Light "blueprint" canvas, dashed measure-guide motif, one bold purple
   diagonal ribbon as the single accent gesture, CSS-drawn icons + diagrams.
   ────────────────────────────────────────────────────────────────────────── */

// ── Small data tables (kept inline; this is a self-contained exploration) ──

const NAV_LINKS = ["Product", "Use cases", "Developers", "Pricing"];

const LOGOS = [
  "Northwind",
  "Quanta",
  "Hyperline",
  "Vellum",
  "Cohort",
  "Datalore",
  "Arcfield",
  "Brightloom",
];

const STATS = [
  { value: "<5 min", label: "TIME_TO_INTEGRATE" },
  { value: "99.99%", label: "UPTIME_SLA" },
  { value: "10M+", label: "CURSORS / DAY" },
  { value: "SOC 2", label: "TYPE_II_CERTIFIED" },
];

const FEATURES = [
  {
    tag: "FIG.01",
    title: "Comments",
    body: "Threaded, contextual comments anchored to any element, cell, or coordinate in your app.",
    icon: "comments" as const,
  },
  {
    tag: "FIG.02",
    title: "Live cursors",
    body: "Render every collaborator's pointer in real time with sub-100ms latency, anywhere on the page.",
    icon: "cursor" as const,
  },
  {
    tag: "FIG.03",
    title: "Presence",
    body: "Avatar stacks and online status that show exactly who is here and what they're viewing.",
    icon: "presence" as const,
  },
  {
    tag: "FIG.04",
    title: "Notifications",
    body: "In-app inbox plus email and webhook delivery — fully managed, fully themeable.",
    icon: "bell" as const,
  },
  {
    tag: "FIG.05",
    title: "Recording",
    body: "Capture and replay async video and audio walkthroughs attached to any thread.",
    icon: "record" as const,
  },
  {
    tag: "FIG.06",
    title: "Huddle",
    body: "Spin up an instant audio/video room scoped to the document your team is working in.",
    icon: "huddle" as const,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We shipped real-time comments and presence across our whole editor in under a week. The Velt SDK did in days what we'd scoped for a quarter.",
    name: "Priya Natarajan",
    role: "Staff Engineer",
    company: "Quanta",
    accent: "var(--color-velt-purple)",
    initials: "PN",
  },
  {
    quote:
      "Framework-agnostic and genuinely drop-in. We wrapped our app in VeltProvider and had live cursors working the same afternoon.",
    name: "Marcus Feld",
    role: "Head of Product",
    company: "Hyperline",
    accent: "var(--color-velt-green)",
    initials: "MF",
  },
  {
    quote:
      "The reliability is what sold us. 99.99% uptime, SOC 2, and a roadmap that keeps pace with how our customers actually collaborate.",
    name: "Sofia Almeida",
    role: "VP Engineering",
    company: "Northwind",
    accent: "var(--color-velt-orange)",
    initials: "SA",
  },
];

// ── CSS-drawn monochrome feature icons (no external assets) ──────────────

function FeatureIcon({ kind }: { kind: (typeof FEATURES)[number]["icon"] }) {
  const stroke = "#111111";
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "comments":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 5.5h16v10H9l-4 3.5v-3.5H4z" />
          <path d="M8 9.5h8M8 12.5h5" />
        </svg>
      );
    case "cursor":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M5 4l13 5.5-5.5 1.8L10.5 17 5 4z" />
        </svg>
      );
    case "presence":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="9" cy="9" r="3" />
          <circle cx="16.5" cy="10.5" r="2.4" />
          <path d="M3.5 18c0-3 2.6-4.6 5.5-4.6 1.4 0 2.7.4 3.7 1.1" />
          <path d="M13.5 18c.2-1.7 1.4-2.9 3-3.2" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M6.5 16c0-5 1.6-7.5 5.5-7.5S17.5 11 17.5 16z" />
          <path d="M5 16h14M10.3 19a1.8 1.8 0 0 0 3.4 0" />
          <path d="M12 6.5V4.5" />
        </svg>
      );
    case "record":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3.5" y="6.5" width="11" height="11" rx="2" />
          <path d="M14.5 10l5-2.5v9l-5-2.5z" />
        </svg>
      );
    case "huddle":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="8.2" />
          <path d="M12 8.2v7.6M8.4 9.6v4.8M15.6 9.6v4.8" />
        </svg>
      );
  }
}

// ── Wordmark ──────────────────────────────────────────────────────────────

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-velt-ink ${className}`}
      aria-label="Velt"
    >
      <span
        aria-hidden="true"
        className="grid h-7 w-7 place-items-center rounded-[7px] bg-velt-purple"
      >
        <span className="h-2.5 w-2.5 rounded-[3px] bg-white" />
      </span>
      <span className="text-[20px] font-bold tracking-[-0.02em]">Velt</span>
    </span>
  );
}

// ── Page ────────────────────────────────────────────────────────────────

export default function HomeBlueprintPage() {
  return (
    <div className="font-urbanist min-h-screen bg-velt-offwhite text-velt-ink antialiased">
      {/* Scoped keyframes — subtle motion only */}
      <style>{`
        @keyframes bp-drift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes bp-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bp-animate { animation: none !important; }
        }
      `}</style>

      {/* ── Fixed top nav ─────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-[2147483647] border-b border-black/10 bg-velt-offwhite/85 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="container-page flex h-16 items-center justify-between"
        >
          <Wordmark />

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[14px] font-medium text-velt-ink/80 transition-colors hover:text-velt-ink"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden text-[14px] font-medium text-velt-ink/80 transition-colors hover:text-velt-ink sm:inline-block"
            >
              Sign in
            </a>
            <a
              href="#"
              className="inline-flex h-9 items-center rounded-pill bg-velt-purple px-5 text-[14px] font-semibold text-white shadow-[0_1px_2px_rgba(98,93,245,0.4)] transition-transform hover:-translate-y-px"
            >
              Book demo
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section
          aria-label="Hero"
          className="relative overflow-hidden border-b border-black/10 bg-velt-offwhite"
        >
          {/* Blueprint dashed measure guides */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="container-page relative h-full">
              <div className="absolute left-6 top-0 hidden h-full border-l border-dashed border-black/15 lg:block" />
              <div className="absolute left-1/2 top-0 hidden h-full border-l border-dashed border-black/10 lg:block" />
              <div className="absolute right-6 top-0 hidden h-full border-l border-dashed border-black/15 lg:block" />
            </div>
          </div>

          <div className="container-page relative grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            {/* Left — copy */}
            <div className="relative">
              <p className="font-firacode mb-5 text-[12px] uppercase tracking-[0.14em] text-velt-muted">
                FIG.00 — THE COLLABORATION STACK
              </p>

              <h1 className="text-display-h1 max-w-[15ch] text-velt-ink">
                Ship multiplayer features in{" "}
                <span className="text-velt-purple">minutes</span>, not quarters.
              </h1>

              <p className="text-body-lg mt-6 max-w-[46ch] text-velt-ink/70">
                Velt is the developer-first collaboration SDK for B2B SaaS.
                Drop in real-time comments, live cursors, presence,
                notifications, recording, and huddle — for React, Next, or any
                framework.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a
                  href="#"
                  className="inline-flex h-12 items-center rounded-pill bg-velt-purple px-7 text-[15px] font-semibold text-white shadow-[0_2px_10px_rgba(98,93,245,0.35)] transition-transform hover:-translate-y-px"
                >
                  Book a demo
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 text-[15px] font-semibold text-velt-ink/80 transition-colors hover:text-velt-ink"
                >
                  Read the docs
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              </div>

              <p className="font-firacode mt-7 text-[12px] text-velt-muted">
                $ npm i @veltdev/react
                <span className="ml-3 text-velt-ink/40">
                  {"// free Hacker plan · 100 monthly active docs"}
                </span>
              </p>
            </div>

            {/* Right — the one bold gesture: diagonal purple ribbon + grid */}
            <div className="relative">
              <div className="relative mx-auto aspect-square w-full max-w-[440px]">
                {/* Crisp blueprint grid block */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[16px] border border-black/10 bg-white"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(17,17,17,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.05) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Diagonal gradient ribbon — single strong accent */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-x-6 top-1/2 h-24 -translate-y-1/2 rotate-[-14deg] rounded-[14px] shadow-[0_18px_40px_-12px_rgba(98,93,245,0.55)]"
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, #625DF5 0%, #8E8BF8 55%, #B9B7FB 100%)",
                  }}
                />

                {/* Floating annotated UI chips on the grid */}
                <div className="bp-animate absolute left-5 top-6 flex items-center gap-2 rounded-[10px] border border-black/10 bg-white/95 px-3 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3)] [animation:bp-drift_6s_ease-in-out_infinite]">
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full bg-velt-pink"
                  />
                  <span className="text-[12px] font-semibold">Mara is editing</span>
                </div>

                <div className="bp-animate absolute bottom-7 right-5 rounded-[10px] border border-black/10 bg-white/95 px-3 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3)] [animation:bp-drift_7s_ease-in-out_infinite_0.8s]">
                  <p className="text-[11px] font-semibold text-velt-ink">
                    “Can we ship this?”
                  </p>
                  <p className="font-firacode mt-0.5 text-[10px] text-velt-muted">
                    THREAD · 3 REPLIES
                  </p>
                </div>

                {/* Cursor with name flag */}
                <div className="absolute left-1/2 top-1/2 -translate-x-2 -translate-y-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="drop-shadow"
                  >
                    <path
                      d="M5 4l13 5.5-5.5 1.8L10.5 17 5 4z"
                      fill="#0D9A5D"
                    />
                  </svg>
                  <span className="ml-3 inline-block rounded-[6px] bg-velt-green px-2 py-0.5 text-[10px] font-semibold text-white">
                    Devon
                  </span>
                </div>

                {/* Mono corner label */}
                <span className="font-firacode absolute -bottom-7 right-1 text-[11px] uppercase tracking-[0.12em] text-velt-muted">
                  FIG.01 — LIVE CURSORS
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trusted-by logo wall ───────────────────────────────────── */}
        <section
          aria-label="Trusted by"
          className="border-b border-black/10 bg-white"
        >
          <div className="container-page py-12">
            <p className="font-firacode mb-8 text-center text-[12px] uppercase tracking-[0.14em] text-velt-muted">
              TRUSTED BY ENGINEERING TEAMS AT
            </p>
            <div className="grid grid-cols-2 items-center gap-x-8 gap-y-7 sm:grid-cols-4 lg:grid-cols-8">
              {LOGOS.map((name) => (
                <span
                  key={name}
                  className="text-center text-[16px] font-bold tracking-[-0.01em] text-velt-ink/35 transition-colors hover:text-velt-ink/60"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats row ──────────────────────────────────────────────── */}
        <section
          aria-label="Key metrics"
          className="border-b border-black/10 bg-velt-offwhite"
        >
          <div className="container-page py-14">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-black/10 bg-black/10 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-velt-offwhite px-6 py-8 text-center"
                >
                  <p className="text-display-h2 text-velt-ink">{stat.value}</p>
                  <p className="font-firacode mt-2 text-[12px] uppercase tracking-[0.1em] text-velt-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature grid ───────────────────────────────────────────── */}
        <section aria-label="Features" className="bg-white">
          <div className="container-page section-pad-y">
            <div className="mb-12 max-w-[42ch]">
              <p className="font-firacode mb-4 text-[12px] uppercase tracking-[0.14em] text-velt-muted">
                MODULES — INSTALL WHAT YOU NEED
              </p>
              <h2 className="text-display-h2 text-velt-ink">
                Six production-grade collaboration primitives.
              </h2>
              <p className="text-body-lg mt-4 text-velt-ink/70">
                Each module is independent, themeable, and ships with managed
                infrastructure. Mix and match — no backend to maintain.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feat) => (
                <article
                  key={feat.title}
                  className="group relative overflow-hidden rounded-[12px] border border-black/10 bg-velt-offwhite p-7 transition-colors hover:border-velt-purple/40"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-0 h-12 w-12 origin-top-right scale-0 bg-velt-purple/5 transition-transform duration-300 group-hover:scale-100"
                    style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                  />
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-[10px] border border-black/10 bg-white">
                      <FeatureIcon kind={feat.icon} />
                    </span>
                    <span className="font-firacode text-[11px] uppercase tracking-[0.12em] text-velt-muted">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-display-h3 text-velt-ink">{feat.title}</h3>
                  <p className="text-body mt-2 text-velt-ink/70">{feat.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-velt-purple opacity-0 transition-opacity group-hover:opacity-100">
                    View module
                    <span aria-hidden="true">→</span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Schematic / exploded-view diagram ──────────────────────── */}
        <section
          aria-label="The collaboration stack"
          className="border-y border-black/10 bg-velt-offwhite"
        >
          <div
            className="relative"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(17,17,17,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          >
            <div className="container-page section-pad-y grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Left — copy */}
              <div>
                <p className="font-firacode mb-4 text-[12px] uppercase tracking-[0.14em] text-velt-muted">
                  SCHEMATIC — EXPLODED VIEW
                </p>
                <h2 className="text-display-h2 text-velt-ink">
                  One SDK. Every layer of collaboration, handled.
                </h2>
                <p className="text-body-lg mt-4 max-w-[44ch] text-velt-ink/70">
                  Velt sits between your app and a managed real-time backend.
                  Sync, storage, presence, and delivery are all wired for you —
                  you compose the UI.
                </p>

                <ul className="mt-7 space-y-3">
                  {[
                    "Conflict-free real-time sync engine",
                    "Managed presence + cursor transport",
                    "Notification fan-out (in-app, email, webhook)",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] text-velt-ink/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 flex-none rotate-45 bg-velt-purple"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — CSS exploded layer stack */}
              <div
                aria-hidden="true"
                className="relative mx-auto h-[380px] w-full max-w-[460px]"
              >
                {[
                  {
                    label: "LAYER_01 — COMMENTS",
                    top: 0,
                    left: 70,
                    accent: "#625DF5",
                  },
                  {
                    label: "LAYER_02 — PRESENCE",
                    top: 95,
                    left: 35,
                    accent: "#0D9A5D",
                  },
                  {
                    label: "LAYER_03 — NOTIFICATIONS",
                    top: 190,
                    left: 0,
                    accent: "#FF7162",
                  },
                ].map((layer, idx) => (
                  <div
                    key={layer.label}
                    className="absolute flex h-[112px] w-[300px] flex-col justify-between rounded-[12px] border border-black/10 bg-white/90 p-4 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.4)] backdrop-blur-sm"
                    style={{ top: layer.top, left: layer.left, zIndex: 10 - idx }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="h-2.5 w-2.5 rounded-[3px]"
                        style={{ background: layer.accent }}
                      />
                      <span className="font-firacode text-[10px] uppercase tracking-[0.1em] text-velt-muted">
                        {layer.label}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <span className="block h-2 w-3/4 rounded-full bg-black/8" />
                      <span className="block h-2 w-1/2 rounded-full bg-black/8" />
                    </div>
                    <span
                      className="h-1 w-10 rounded-full"
                      style={{ background: layer.accent }}
                    />
                  </div>
                ))}

                {/* Thin connector lines between layers */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 460 380"
                  fill="none"
                >
                  <path
                    d="M225 112 L190 95"
                    stroke="#11111133"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M190 207 L155 190"
                    stroke="#11111133"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                </svg>

                {/* Base plate label */}
                <div className="absolute bottom-0 left-0 flex w-[300px] items-center justify-center rounded-[12px] border border-dashed border-black/20 bg-velt-offwhite/60 py-2.5">
                  <span className="font-firacode text-[10px] uppercase tracking-[0.12em] text-velt-muted">
                    MANAGED_REALTIME_BACKEND
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Code snippet block ─────────────────────────────────────── */}
        <section aria-label="Integration code" className="bg-white">
          <div className="container-page section-pad-y grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-firacode mb-4 text-[12px] uppercase tracking-[0.14em] text-velt-muted">
                DROP-IN · FRAMEWORK-AGNOSTIC
              </p>
              <h2 className="text-display-h2 text-velt-ink">
                Wrap your app. That&apos;s the integration.
              </h2>
              <p className="text-body-lg mt-4 max-w-[44ch] text-velt-ink/70">
                Add the provider, set your API key, and mount any module
                anywhere in your tree. Works with React, Next.js, and any
                framework via the core SDK.
              </p>
              <a
                href="#"
                className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-velt-purple transition-colors hover:text-velt-ink"
              >
                Read the quickstart
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Light-themed code card with faux window header */}
            <div className="overflow-hidden rounded-[12px] border border-black/12 bg-velt-offwhite shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2 border-b border-black/10 bg-white px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-velt-orange/80" />
                <span className="h-3 w-3 rounded-full bg-velt-yellow/90" />
                <span className="h-3 w-3 rounded-full bg-velt-green/80" />
                <span className="font-firacode ml-3 text-[12px] text-velt-muted">
                  app/layout.tsx
                </span>
              </div>
              <pre className="font-firacode overflow-x-auto px-5 py-5 text-[13px] leading-[1.7] text-velt-ink">
                <code>
                  <span className="text-velt-muted">
                    {"// 1 — wrap your app"}
                  </span>
                  {"\n"}
                  <span className="text-velt-purple">import</span>{" "}
                  {"{ VeltProvider, VeltComments } "}
                  <span className="text-velt-purple">from</span>{" "}
                  <span className="text-velt-green">
                    &apos;@veltdev/react&apos;
                  </span>
                  {";\n\n"}
                  <span className="text-velt-purple">export default function</span>{" "}
                  <span className="text-velt-ink">App</span>
                  {"({ children }) {\n"}
                  {"  "}
                  <span className="text-velt-purple">return</span>
                  {" (\n"}
                  {"    "}
                  <span className="text-velt-ink/50">&lt;</span>
                  <span className="text-velt-purple">VeltProvider</span>{" "}
                  apiKey=
                  <span className="text-velt-green">
                    &quot;YOUR_API_KEY&quot;
                  </span>
                  <span className="text-velt-ink/50">&gt;</span>
                  {"\n"}
                  {"      "}
                  <span className="text-velt-ink/50">&lt;</span>
                  <span className="text-velt-purple">VeltComments</span>{" "}
                  <span className="text-velt-ink/50">/&gt;</span>
                  {"\n"}
                  {"      {children}\n"}
                  {"    "}
                  <span className="text-velt-ink/50">&lt;/</span>
                  <span className="text-velt-purple">VeltProvider</span>
                  <span className="text-velt-ink/50">&gt;</span>
                  {"\n"}
                  {"  );\n"}
                  {"}"}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* ── Testimonials ───────────────────────────────────────────── */}
        <section
          aria-label="Testimonials"
          className="border-y border-black/10 bg-velt-offwhite"
        >
          <div className="container-page section-pad-y">
            <div className="mb-12 max-w-[42ch]">
              <p className="font-firacode mb-4 text-[12px] uppercase tracking-[0.14em] text-velt-muted">
                FROM THE FIELD
              </p>
              <h2 className="text-display-h2 text-velt-ink">
                Teams ship faster on Velt.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((quote) => (
                <figure
                  key={quote.name}
                  className="flex flex-col rounded-[12px] border border-black/10 bg-white p-7"
                >
                  <span
                    aria-hidden="true"
                    className="mb-4 text-[40px] leading-none text-velt-purple/30"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="text-body text-velt-ink/85">
                    {quote.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-black/8 pt-5">
                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 flex-none place-items-center rounded-full text-[13px] font-bold text-white"
                      style={{ background: quote.accent }}
                    >
                      {quote.initials}
                    </span>
                    <span>
                      <span className="block text-[14px] font-semibold text-velt-ink">
                        {quote.name}
                      </span>
                      <span className="font-firacode block text-[11px] uppercase tracking-[0.08em] text-velt-muted">
                        {quote.role} · {quote.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA band ─────────────────────────────────────────── */}
        <section aria-label="Get started" className="bg-white">
          <div className="container-page section-pad-y">
            <div className="relative overflow-hidden rounded-[16px] border border-black/10 bg-velt-offwhite px-8 py-16 text-center lg:px-16">
              {/* Dashed-guide motif framing */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
              >
                <div className="absolute left-10 top-0 hidden h-full border-l border-dashed border-black/15 lg:block" />
                <div className="absolute right-10 top-0 hidden h-full border-l border-dashed border-black/15 lg:block" />
              </div>
              {/* Single accent ribbon, faint, behind text */}
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-16 h-56 w-56 rotate-12 rounded-[24px] opacity-20 blur-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #625DF5, #B9B7FB)",
                }}
              />

              <p className="font-firacode relative mb-5 text-[12px] uppercase tracking-[0.14em] text-velt-muted">
                FIG.07 — GET STARTED
              </p>
              <h2 className="text-display-h2 relative mx-auto max-w-[22ch] text-velt-ink">
                Add multiplayer to your app this week.
              </h2>
              <p className="text-body-lg relative mx-auto mt-4 max-w-[48ch] text-velt-ink/70">
                Start free on the Hacker plan — 100 monthly active docs, no
                credit card. Talk to us when you&apos;re ready to scale.
              </p>
              <div className="relative mt-9 flex flex-wrap items-center justify-center gap-5">
                <a
                  href="#"
                  className="inline-flex h-12 items-center rounded-pill bg-velt-purple px-8 text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(98,93,245,0.4)] transition-transform hover:-translate-y-px"
                >
                  Book a demo
                </a>
                <a
                  href="#"
                  className="inline-flex h-12 items-center gap-2 rounded-pill border border-black/15 px-7 text-[15px] font-semibold text-velt-ink transition-colors hover:border-black/40"
                >
                  Read the docs
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-black/10 bg-velt-offwhite">
        <div className="container-page py-16">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2 md:col-span-1">
              <Wordmark />
              <p className="text-body mt-4 max-w-[28ch] text-velt-ink/60">
                The collaboration stack for B2B SaaS.
              </p>
            </div>

            {[
              {
                heading: "PRODUCT",
                links: [
                  "Comments",
                  "Live cursors",
                  "Presence",
                  "Notifications",
                  "Recording",
                  "Huddle",
                ],
              },
              {
                heading: "DEVELOPERS",
                links: ["Docs", "API reference", "Quickstart", "Changelog", "Status"],
              },
              {
                heading: "COMPANY",
                links: ["About", "Customers", "Careers", "Blog", "Contact"],
              },
              {
                heading: "LEGAL",
                links: ["Privacy", "Terms", "Security", "SOC 2"],
              },
            ].map((group) => (
              <div key={group.heading}>
                <h3 className="font-firacode mb-4 text-[11px] uppercase tracking-[0.12em] text-velt-muted">
                  {group.heading}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[14px] text-velt-ink/70 transition-colors hover:text-velt-ink"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-7 sm:flex-row sm:items-center">
            <p className="font-firacode text-[12px] text-velt-muted">
              © {new Date().getFullYear()} VELT, INC. · ALL RIGHTS RESERVED
            </p>
            <div className="flex items-center gap-5 text-[13px] text-velt-ink/60">
              <a href="#" className="transition-colors hover:text-velt-ink">
                X / Twitter
              </a>
              <a href="#" className="transition-colors hover:text-velt-ink">
                GitHub
              </a>
              <a href="#" className="transition-colors hover:text-velt-ink">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
