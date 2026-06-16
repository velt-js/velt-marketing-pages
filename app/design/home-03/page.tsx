import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velt — Multiplayer",
  description:
    "The collaboration stack for B2B. Drop in real-time comments, live cursors, presence, notifications, reactions, and huddles — and make your product multiplayer in minutes.",
};

/* ------------------------------------------------------------------ *
 * Small presentational helpers (pure markup, no client behavior).
 * Drawn entirely with CSS / inline SVG — no external assets.
 * ------------------------------------------------------------------ */

/** A colored multiplayer cursor (inline SVG arrow) with a name-label pill. */
function Cursor({
  color,
  name,
  className = "",
  flip = false,
}: {
  color: string;
  name: string;
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-20 flex items-start gap-1 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        className={`drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)] ${flip ? "-scale-x-100" : ""}`}
      >
        <path
          d="M5 3l14 7-6 1.6L9.6 18 5 3z"
          fill={color}
          stroke="#0d0d0d"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-tag whitespace-nowrap rounded-pill px-2.5 py-1 font-semibold text-white shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
        style={{ background: color }}
      >
        {name}
      </span>
    </div>
  );
}

/** A small floating comment bubble with avatar dot + line(s). */
function CommentBubble({
  color,
  initials,
  text,
  className = "",
}: {
  color: string;
  initials: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-20 w-[190px] rounded-[16px] rounded-tl-[4px] border border-white/10 bg-velt-charcoal/90 p-3 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.5)] ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2">
        <span
          className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-white"
          style={{ background: color }}
        >
          {initials}
        </span>
        <span className="text-[11px] font-semibold text-white/70">
          replied
        </span>
      </div>
      <p className="text-label mt-2 leading-snug text-white/85">{text}</p>
    </div>
  );
}

/** A reaction emoji chip (drawn with a glyph + colored ring). */
function ReactionChip({
  emoji,
  color,
  count,
  className = "",
}: {
  emoji: string;
  color: string;
  count: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-20 flex items-center gap-1.5 rounded-pill border bg-velt-charcoal/90 px-3 py-1.5 backdrop-blur-md shadow-[0_10px_24px_rgba(0,0,0,0.45)] ${className}`}
      style={{ borderColor: color }}
      aria-hidden="true"
    >
      <span className="text-[14px] leading-none">{emoji}</span>
      <span
        className="text-[12px] font-bold leading-none"
        style={{ color }}
      >
        {count}
      </span>
    </div>
  );
}

/** A single avatar (gradient disc + initials) for presence stacks. */
function Avatar({
  initials,
  from,
  to,
  ring = "#0d0d0d",
}: {
  initials: string;
  from: string;
  to: string;
  ring?: string;
}) {
  return (
    <span
      className="grid h-9 w-9 place-items-center rounded-full text-[12px] font-bold text-white"
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        boxShadow: `0 0 0 2px ${ring}`,
      }}
    >
      {initials}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Feature icon glyphs (hand-authored inline SVG, monochrome via
 * currentColor so each card can tint with its own accent).
 * ------------------------------------------------------------------ */
function Icon({ name }: { name: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "comments":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 5h16v10H9l-5 4V5z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    case "cursors":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M6 3l13 6.5-5.5 1.5L11 18 6 3z" />
        </svg>
      );
    case "presence":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="M16 6.5a3 3 0 0 1 0 5.6M16.5 19a5.5 5.5 0 0 0-2-4.3" />
        </svg>
      );
    case "notifications":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case "reactions":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 14a4.5 4.5 0 0 0 7 0" />
          <path d="M9 9.5h.01M15 9.5h.01" />
        </svg>
      );
    case "huddle":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 6h12v9H8l-3 3v-3H3V6z" />
          <path d="M17 9h4v8l-2-2h-6v-3" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ *
 * Data
 * ------------------------------------------------------------------ */
const FEATURES = [
  {
    icon: "comments",
    accent: "#E934BF",
    title: "Comments",
    copy: "Threaded, contextual comments anchored to any element in your app.",
  },
  {
    icon: "cursors",
    accent: "#0D9A5D",
    title: "Live cursors",
    copy: "See exactly where every teammate is pointing, in real time.",
  },
  {
    icon: "presence",
    accent: "#FF7162",
    title: "Presence",
    copy: "Live avatar stacks show who's online and what they're viewing.",
  },
  {
    icon: "notifications",
    accent: "#FFCD2E",
    title: "Notifications",
    copy: "In-app and email alerts that keep collaborators in the loop.",
  },
  {
    icon: "reactions",
    accent: "#625DF5",
    title: "Reactions",
    copy: "Lightweight emoji reactions on any object — no thread required.",
  },
  {
    icon: "huddle",
    accent: "#E934BF",
    title: "Huddle",
    copy: "Spin up an instant audio room right inside your product.",
  },
] as const;

const COMPANIES = [
  "Northwind",
  "Cobalt",
  "Lumenpay",
  "Hyperplane",
  "Quanta",
  "Driftwood",
  "Vellum",
  "Statix",
];

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */
export default function Home03() {
  return (
    <div className="font-urbanist min-h-screen bg-velt-midnight text-white">
      {/* Local keyframes — gentle float + marquee. Tasteful motion only. */}
      <style>{`
        @keyframes h03-float {
          0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
          50%      { transform: translateY(-12px) rotate(var(--rot, 0deg)); }
        }
        @keyframes h03-float-slow {
          0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
          50%      { transform: translateY(-7px) rotate(var(--rot, 0deg)); }
        }
        @keyframes h03-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .h03-float      { animation: h03-float 6s ease-in-out infinite; }
        .h03-float-slow { animation: h03-float-slow 8s ease-in-out infinite; }
        .h03-marquee    { animation: h03-marquee 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .h03-float, .h03-float-slow, .h03-marquee { animation: none; }
        }
      `}</style>

      {/* ============================ NAV ============================ */}
      <header className="sticky top-0 z-50">
        <div className="container-page">
          <nav
            aria-label="Primary"
            className="mt-4 flex items-center justify-between rounded-pill border border-white/10 bg-velt-midnight/70 px-3 py-2.5 backdrop-blur-xl sm:px-5"
          >
            {/* Wordmark */}
            <a
              href="#top"
              className="flex items-center gap-2 pl-1 text-[20px] font-extrabold tracking-tight text-white"
            >
              <span className="grid h-7 w-7 place-items-center rounded-[9px] bg-velt-purple text-[15px] font-black">
                V
              </span>
              Velt
            </a>

            {/* Center links */}
            <ul className="hidden items-center gap-8 lg:flex">
              {["Product", "Use cases", "Developers", "Pricing"].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-label text-white/75 transition-colors hover:text-white"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right utilities */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="#"
                className="text-label hidden px-2 text-white/75 transition-colors hover:text-white sm:inline-block"
              >
                Sign in
              </a>
              <a
                href="#"
                className="text-label rounded-pill px-4 py-2 font-semibold text-white shadow-[0_8px_24px_rgba(98,93,245,0.45)] transition-transform hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(110deg, #625DF5 0%, #9b5cf6 50%, #E934BF 100%)",
                }}
              >
                Book demo
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ============================ HERO ============================ */}
        <section className="relative overflow-hidden">
          {/* Gradient mesh canvas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(900px 520px at 18% 8%, rgba(98,93,245,0.55), transparent 60%)," +
                "radial-gradient(820px 520px at 86% 22%, rgba(233,52,191,0.42), transparent 60%)," +
                "radial-gradient(700px 480px at 50% 100%, rgba(255,205,46,0.16), transparent 60%)," +
                "linear-gradient(180deg, #0b0b10 0%, #0d0d0d 70%, #0d0d0d 100%)",
            }}
          />
          {/* Subtle grid overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(circle at 50% 30%, #000 0%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 30%, #000 0%, transparent 75%)",
            }}
          />

          <div className="container-page relative pb-24 pt-20 lg:pb-32 lg:pt-28">
            {/* Floating multiplayer props (desktop only, to avoid clutter on mobile) */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <Cursor
                color="#E934BF"
                name="Maya"
                className="left-[3%] top-[8%] h03-float"
              />
              <Cursor
                color="#0D9A5D"
                name="Devin"
                className="right-[5%] top-[16%] h03-float-slow"
                flip
              />
              <Cursor
                color="#FF7162"
                name="Priya"
                className="left-[7%] bottom-[14%] h03-float-slow"
              />
              <Cursor
                color="#FFCD2E"
                name="Leo"
                className="right-[8%] bottom-[10%] h03-float"
                flip
              />
              <CommentBubble
                color="#625DF5"
                initials="JK"
                text="Love this flow — ship it 🚀"
                className="right-[2%] top-[42%] h03-float-slow"
              />
              <ReactionChip
                emoji="🎉"
                color="#FFCD2E"
                count={12}
                className="left-[2%] top-[40%] h03-float"
              />
              <ReactionChip
                emoji="❤️"
                color="#E934BF"
                count={28}
                className="left-[12%] bottom-[28%] h03-float-slow"
              />
            </div>

            {/* Hero copy */}
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="text-tag inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-3 py-1.5 text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-velt-green" />
                The collaboration stack for B2B
              </span>

              <h1 className="text-display-h1 mt-6 text-white">
                Make your product{" "}
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-x-2 inset-y-1 -z-10 -rotate-[2.5deg] rounded-[12px]"
                    style={{ background: "#FFCD2E" }}
                  />
                  <span className="relative text-velt-midnight">
                    multiplayer
                  </span>
                </span>{" "}
                in minutes
              </h1>

              <p className="text-body-lg mx-auto mt-6 max-w-xl text-white/70">
                Drop-in real-time comments, live cursors, presence, notifications,
                reactions, and huddles. One SDK, any framework — React, Next, or
                your stack.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#"
                  className="text-label inline-flex h-12 items-center justify-center rounded-pill px-7 font-semibold text-white shadow-[0_12px_32px_rgba(98,93,245,0.5)] transition-transform hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(110deg, #625DF5 0%, #9b5cf6 55%, #E934BF 100%)",
                  }}
                >
                  Book a demo
                </a>
                <a
                  href="#"
                  className="text-label inline-flex h-12 items-center justify-center rounded-pill border border-white/25 bg-white/5 px-7 font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  Start for free
                </a>
              </div>

              <p className="text-label mt-5 text-white/50">
                Free Hacker plan · No credit card · Ship in under a week
              </p>
            </div>
          </div>
        </section>

        {/* ===================== MULTIPLAYER MONEY-SHOT ===================== */}
        <section className="relative overflow-hidden bg-velt-midnight pb-20 lg:pb-28">
          <div className="container-page">
            <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
              <h2 className="text-display-h2 text-white">
                Everyone, on the same canvas
              </h2>
              <p className="text-body mt-3 text-white/60">
                Watch the whole team think together — cursors, threads, reactions,
                and presence, all live at once.
              </p>
            </div>

            {/* The faux product canvas */}
            <div className="relative mx-auto max-w-[1000px]">
              {/* glow behind canvas */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-[40px] opacity-70 blur-2xl"
                style={{
                  background:
                    "radial-gradient(60% 60% at 30% 20%, rgba(98,93,245,0.5), transparent 70%)," +
                    "radial-gradient(60% 60% at 80% 80%, rgba(233,52,191,0.4), transparent 70%)",
                }}
              />

              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-velt-charcoal shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                {/* window chrome */}
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-velt-orange" />
                    <span className="h-3 w-3 rounded-full bg-velt-yellow" />
                    <span className="h-3 w-3 rounded-full bg-velt-green" />
                    <span className="text-label ml-3 hidden text-white/45 sm:inline">
                      app.acme.com / roadmap
                    </span>
                  </div>
                  {/* presence stack */}
                  <div
                    className="flex items-center -space-x-2"
                    aria-label="People currently viewing"
                  >
                    <Avatar initials="MA" from="#E934BF" to="#9b5cf6" ring="#1c1d21" />
                    <Avatar initials="DV" from="#0D9A5D" to="#36c98a" ring="#1c1d21" />
                    <Avatar initials="PR" from="#FF7162" to="#ff9d6e" ring="#1c1d21" />
                    <Avatar initials="LE" from="#FFCD2E" to="#ffb13e" ring="#1c1d21" />
                    <span className="text-tag ml-3 grid h-9 w-9 place-items-center rounded-full bg-white/10 font-bold text-white/80 ring-2 ring-velt-charcoal">
                      +6
                    </span>
                  </div>
                </div>

                {/* canvas body */}
                <div className="relative p-5 sm:p-8">
                  {/* faux doc rows */}
                  <div className="space-y-5">
                    <div className="h-6 w-2/3 rounded-md bg-white/12" />
                    <div className="space-y-2.5">
                      <div className="h-3 w-full rounded bg-white/8" />
                      <div className="h-3 w-[92%] rounded bg-white/8" />
                      <div className="h-3 w-[80%] rounded bg-white/8" />
                    </div>

                    {/* faux dashboard cards */}
                    <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3">
                      {[
                        ["#625DF5", "MRR", "62%"],
                        ["#0D9A5D", "Active", "84%"],
                        ["#FF7162", "Churn", "31%"],
                      ].map(([c, label, h]) => (
                        <div
                          key={label}
                          className="rounded-[14px] border border-white/10 bg-white/[0.03] p-4"
                        >
                          <div className="text-tag text-white/45">{label}</div>
                          <div className="mt-3 flex h-16 items-end gap-1.5">
                            {[40, 70, 50, 90, 60].map((bar, i) => (
                              <span
                                key={i}
                                className="flex-1 rounded-sm"
                                style={{
                                  height: `${bar}%`,
                                  background: c as string,
                                  opacity: 0.35 + (i % 5) * 0.13,
                                }}
                              />
                            ))}
                          </div>
                          <div
                            className="mt-2 text-[20px] font-extrabold"
                            style={{ color: c as string }}
                          >
                            {h}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <div className="h-3 w-[88%] rounded bg-white/8" />
                      <div className="h-3 w-[64%] rounded bg-white/8" />
                    </div>
                  </div>

                  {/* OVERLAID multiplayer activity */}
                  <Cursor
                    color="#E934BF"
                    name="Maya"
                    className="left-[18%] top-[18%]"
                  />
                  <Cursor
                    color="#0D9A5D"
                    name="Devin"
                    className="right-[20%] top-[46%]"
                    flip
                  />
                  <Cursor
                    color="#625DF5"
                    name="Jordan"
                    className="left-[40%] bottom-[20%]"
                  />
                  <Cursor
                    color="#FF7162"
                    name="Priya"
                    className="right-[14%] bottom-[28%]"
                    flip
                  />

                  <CommentBubble
                    color="#625DF5"
                    initials="JK"
                    text="Can we A/B test this card?"
                    className="right-[4%] top-[6%]"
                  />
                  <CommentBubble
                    color="#0D9A5D"
                    initials="DV"
                    text="Churn dropped 4pts 🎯"
                    className="left-[3%] bottom-[6%]"
                  />

                  <ReactionChip
                    emoji="🔥"
                    color="#FF7162"
                    count={9}
                    className="left-[46%] top-[8%]"
                  />
                  <ReactionChip
                    emoji="👀"
                    color="#FFCD2E"
                    count={4}
                    className="right-[34%] bottom-[8%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== TRUSTED-BY MARQUEE ===================== */}
        <section
          className="border-y border-white/10 bg-velt-midnight py-10"
          aria-label="Companies building with Velt"
        >
          <p className="text-tag mb-6 text-center text-white/40">
            Trusted by product teams shipping multiplayer
          </p>
          <div className="trust-marquee-viewport relative overflow-hidden">
            <div className="h03-marquee flex w-max items-center gap-14 pr-14">
              {[...COMPANIES, ...COMPANIES].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-[22px] font-extrabold tracking-tight text-white/35 transition-colors hover:text-white/70"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FEATURE CARDS ===================== */}
        <section className="bg-velt-midnight section-pad-y">
          <div className="container-page">
            <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
              <span className="text-tag text-velt-purple">The stack</span>
              <h2 className="text-display-h2 mt-3 text-white">
                Six primitives. Endless multiplayer.
              </h2>
              <p className="text-body mt-3 text-white/60">
                Compose the building blocks you need. Each ships as a drop-in
                component with sensible defaults.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <article
                  key={f.title}
                  className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-velt-charcoal p-6 transition-transform hover:-translate-y-1"
                >
                  {/* accent glow corner */}
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-50"
                    style={{ background: f.accent }}
                  />
                  <div
                    className="relative grid h-12 w-12 place-items-center rounded-[14px]"
                    style={{
                      color: f.accent,
                      background: `${f.accent}1f`,
                      boxShadow: `inset 0 0 0 1px ${f.accent}40`,
                    }}
                  >
                    <Icon name={f.icon} />
                  </div>
                  <h3 className="text-display-h3 mt-5 text-white">{f.title}</h3>
                  <p className="text-body mt-2 text-white/60">{f.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TESTIMONIALS ===================== */}
        <section className="bg-velt-midnight pb-20 lg:pb-28">
          <div className="container-page">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Primary testimonial — full gradient */}
              <figure
                className="relative overflow-hidden rounded-[24px] p-8 lg:p-10"
                style={{
                  background:
                    "linear-gradient(135deg, #625DF5 0%, #8b4ff0 45%, #E934BF 100%)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 80% 0%, rgba(255,255,255,0.5), transparent 50%)",
                  }}
                />
                <blockquote className="relative">
                  <p className="text-display-h3 font-semibold text-white">
                    “We shipped real-time comments and presence in under a week.
                    Velt felt like cheating — our users think we built a whole
                    collaboration team overnight.”
                  </p>
                </blockquote>
                <figcaption className="relative mt-8 flex items-center gap-3">
                  <Avatar initials="AR" from="#FFCD2E" to="#FF7162" ring="#ffffff" />
                  <div>
                    <div className="text-label font-semibold text-white">
                      Avery Reyes
                    </div>
                    <div className="text-label text-white/75">
                      Head of Product · Hyperplane
                    </div>
                  </div>
                </figcaption>
              </figure>

              {/* Secondary testimonial — dark card */}
              <figure className="relative overflow-hidden rounded-[24px] border border-white/10 bg-velt-charcoal p-8 lg:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -left-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl"
                  style={{ background: "#0D9A5D" }}
                />
                <blockquote className="relative">
                  <p className="text-display-h3 font-semibold text-white">
                    “The accent-colored cursors and live reactions made our app
                    feel alive instantly. Integration was a couple of lines of
                    React.”
                  </p>
                </blockquote>
                <figcaption className="relative mt-8 flex items-center gap-3">
                  <Avatar initials="SN" from="#0D9A5D" to="#36c98a" ring="#1c1d21" />
                  <div>
                    <div className="text-label font-semibold text-white">
                      Sam Nakamura
                    </div>
                    <div className="text-label text-white/60">
                      Staff Engineer · Cobalt
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ===================== FINAL CTA BAND ===================== */}
        <section className="bg-velt-midnight pb-24 lg:pb-32">
          <div className="container-page">
            <div
              className="relative overflow-hidden rounded-[32px] px-6 py-16 text-center lg:px-12 lg:py-24"
              style={{
                background:
                  "linear-gradient(120deg, #625DF5 0%, #9b5cf6 40%, #E934BF 80%, #FF7162 100%)",
              }}
            >
              {/* readability overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-black/15"
              />
              {/* decorative floating props */}
              <Cursor
                color="#FFCD2E"
                name="You"
                className="left-[8%] top-[20%] hidden h03-float sm:flex"
              />
              <ReactionChip
                emoji="🚀"
                color="#FFCD2E"
                count={42}
                className="right-[10%] bottom-[22%] hidden h03-float-slow sm:flex"
              />

              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-display-h1 text-white">
                  Ready to go multiplayer?
                </h2>
                <p className="text-body-lg mx-auto mt-4 max-w-lg text-white/85">
                  Add comments, cursors, and presence to your product today. Start
                  free, scale when you ship.
                </p>
                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="#"
                    className="text-label inline-flex h-12 items-center justify-center rounded-pill bg-white px-7 font-semibold text-velt-midnight shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-transform hover:-translate-y-0.5"
                  >
                    Book a demo
                  </a>
                  <a
                    href="#"
                    className="text-label inline-flex h-12 items-center justify-center rounded-pill border border-white/60 px-7 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Start for free
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer className="border-t border-white/10 bg-black">
        <div className="container-page py-14">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
            {/* Wordmark + blurb */}
            <div className="col-span-2 md:col-span-1">
              <a
                href="#top"
                className="flex items-center gap-2 text-[20px] font-extrabold tracking-tight text-white"
              >
                <span className="grid h-7 w-7 place-items-center rounded-[9px] bg-velt-purple text-[15px] font-black">
                  V
                </span>
                Velt
              </a>
              <p className="text-label mt-4 max-w-[220px] text-white/45">
                The collaboration stack for B2B SaaS.
              </p>
            </div>

            {[
              {
                head: "Product",
                links: ["Comments", "Live cursors", "Presence", "Huddle"],
              },
              {
                head: "Developers",
                links: ["Docs", "API reference", "SDKs", "Changelog"],
              },
              {
                head: "Use cases",
                links: ["Dashboards", "Editors", "Design tools", "AI apps"],
              },
              {
                head: "Company",
                links: ["About", "Pricing", "Careers", "Contact"],
              },
            ].map((col) => (
              <div key={col.head}>
                <div className="text-tag text-white/40">{col.head}</div>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
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

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
            <p className="text-label text-white/40">
              © {new Date().getFullYear()} Velt. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy", "Terms", "Security"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-label text-white/40 transition-colors hover:text-white"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
