// Webhooks & API page body. Two stacked card sections from Figma node
// 177:33608 in HqWIZdR6ISJmaG2n4o3gr8 (specifically 177:34699 and
// 177:34732). Mirrors the AdminConsoleHighlights pattern: a full-bleed
// white section per card, a 1280-wide white outer card with 2px border,
// hardcoded Figma copy/CTAs, and a testimonial bar at the bottom (Ethan
// attached to Card 1, free-standing Yuri after Card 2).
//
// Slug-conditional in app/(features)/[slug]/page.tsx — only rendered
// when the slug is "webhooks-and-api".

import { InlineTestimonialCard } from "@/components/home/InlineTestimonialCard";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatarSrc: string;
};

const ethanTestimonial: Testimonial = {
  name: "Ethan Veres",
  role: "CTO @eqtble",
  quote: "Commenting is something we wanted in our app, Velt made it possible",
  avatarSrc: "/images/features/comments/trust-us/avatar-ethan.png",
};

const yuriTestimonial: Testimonial = {
  name: "Yuri Kleban",
  role: "Senior PM @Google",
  quote:
    "Velt gave great 1-on-1 support, added features fast, and offered highly customizable components.",
  avatarSrc: "/images/features/comments/trust-us/avatar-yuri.png",
};

const ASSET_DIR = "/images/features/webhooks-and-api";

export function WebhooksAndApiHighlights() {
  return (
    <>
      <Card1ExtensiveApiCoverage />
      <Card2WebhookFeaturesGrid />
    </>
  );
}

// Card 1 — Extensive API Coverage. Mirrors Figma node 177:34699 exactly:
// 1280×528 white card with a centered heading + subhead + View Docs CTA at
// top:55, and an absolutely-positioned 856-wide API endpoint pill at
// top:305. Linda banner attached at the bottom.
function Card1ExtensiveApiCoverage() {
  return (
    <section
      data-outcomes
      className="flex flex-col items-center bg-white full-bleed-bg py-20 lg:py-[100px] px-6 lg:px-20"
      style={{
        marginTop: 80,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
      }}
    >
      <div
        className="overflow-hidden w-full max-w-[1280px]"
        style={{
          background: "#fff",
          border: "2px solid #0e0d36",
          borderRadius: 32,
        }}
      >
        <div
          className="relative hidden lg:block"
          style={{
            width: "100%",
            maxWidth: 1280,
            height: 528,
            overflow: "hidden",
          }}
        >
          {/* Heading + subhead + View Docs CTA, centered at top:55 (Figma 177:34709) */}
          <div
            className="absolute flex flex-col items-center"
            style={{
              top: 55,
              left: "calc(50% + 0.5px)",
              transform: "translateX(-50%)",
              gap: 32,
            }}
          >
            <div
              className="flex flex-col items-center"
              style={{
                gap: 12,
                width: 691,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              <h2
                className="font-urbanist font-bold"
                style={{
                  fontSize: 52,
                  lineHeight: 1.2,
                  letterSpacing: "-1.56px",
                  color: "#111",
                  margin: 0,
                }}
              >
                Extensive API Coverage
              </h2>
              <p
                className="font-urbanist"
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: "#111",
                  margin: 0,
                }}
              >
                Programmatically perform CRUD operations on Velt features to
                adapt to your workflows
              </p>
            </div>
            <ViewDocsButton />
          </div>

          {/* API endpoint pill at top:305, w=856 — Figma 177:34718 */}
          <ApiEndpointPill />
        </div>

        <TestimonialBannerAttached t={ethanTestimonial} />
      </div>
    </section>
  );
}

// "View Docs" CTA — 156×44 with 2px indigo `#3f12a1` border, 18×18
// tabler-icon-book-2 asset and white-text-with-mix-blend-exclusion label.
// Mirrors Figma node 177:34714.
function ViewDocsButton() {
  return (
    <a
      href="https://velt.dev/docs/api-reference"
      target="_blank"
      rel="noopener"
      className="flex items-center justify-center"
      style={{
        width: 156,
        height: 44,
        gap: 4,
        padding: "8px 16px",
        border: "2px solid #3f12a1",
        borderRadius: 8,
        textDecoration: "none",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/features/webhooks-and-api/icon-tabler-book-2.svg"
        alt=""
        aria-hidden
        style={{ width: 18, height: 18, display: "block" }}
      />
      <span
        className="font-urbanist font-semibold whitespace-nowrap"
        style={{
          fontSize: 16,
          color: "#111",
          letterSpacing: "-0.48px",
          lineHeight: 1.2,
        }}
      >
        View Docs
      </span>
    </a>
  );
}

// API endpoint pill — Figma 177:34718. 856-wide white container with a
// faint border and drop-shadow, holding a flex-fill light-gray inner pill
// (POST tag + URL segments) on the left and a blue "Try It ▶" button on
// the right.
function ApiEndpointPill() {
  return (
    <div
      className="absolute flex items-center"
      style={{
        top: 305,
        left: "calc(50% - 15px)",
        transform: "translateX(-50%)",
        width: 856,
        gap: 8,
        padding: 8,
        background: "#fff",
        border: "2px solid rgba(0,0,0,0.04)",
        borderRadius: 24,
        filter: "drop-shadow(0 12px 12px rgba(0,0,0,0.08))",
      }}
    >
      {/* Inner light-gray pill: POST tag + URL */}
      <div
        className="flex items-center"
        style={{
          flex: "1 0 0",
          minWidth: 0,
          gap: 20,
          padding: 8,
          background: "#f3f3f3",
          borderRadius: 16,
        }}
      >
        {/* POST tag — Urbanist Bold 28, indigo on 8% indigo bg, rounded 16 */}
        <span
          className="font-urbanist font-bold flex items-center justify-center whitespace-nowrap"
          style={{
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.56px",
            color: "#3064e3",
            background: "rgba(48,100,227,0.08)",
            padding: "8px 24px",
            borderRadius: 16,
            flexShrink: 0,
          }}
        >
          POST
        </span>
        {/* URL — Geist Mono Bold 28, gap 8, slashes at 32% opacity */}
        <div
          className="flex items-start whitespace-nowrap"
          style={{
            gap: 8,
            fontFamily: "'Geist Mono', ui-monospace, monospace",
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.56px",
            color: "#111",
            flexShrink: 0,
          }}
        >
          <span style={{ opacity: 0.32 }}>/</span>
          <span>v2</span>
          <span style={{ opacity: 0.32 }}>/</span>
          <span>organizations</span>
          <span style={{ opacity: 0.32 }}>/</span>
          <span>add</span>
        </div>
      </div>

      {/* Try It button */}
      <a
        href="https://velt.dev/docs/api-reference"
        target="_blank"
        rel="noopener"
        className="flex items-center"
        style={{
          gap: 20,
          padding: "16px 24px",
          background: "#3064e3",
          borderRadius: 16,
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <span
          className="whitespace-nowrap"
          style={{
            fontFamily: "'Geist Mono', ui-monospace, monospace",
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.56px",
            color: "#fff",
          }}
        >
          Try It
        </span>
        {/* Polygon 11 asset rotated 90° — points right */}
        <span
          className="flex items-center justify-center"
          style={{ width: 18, height: 18, transform: "rotate(90deg)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/features/webhooks-and-api/icon-polygon-11.svg"
            alt=""
            aria-hidden
            style={{ width: 15.59, height: 13.5, display: "block" }}
          />
        </span>
      </a>
    </div>
  );
}

// Card 2 — Advanced Webhooks. Mirrors Figma node 177:34732 exactly:
// 824-wide centered content with heading + (Trust Centre / Learn More)
// CTAs at top, a 3×2 grid of 264×260 feature cards (each rendered as
// DOM with the actual tabler-icon SVG asset from Figma + title +
// description), and an 824×132 dark Linda banner attached at the bottom.
const FEATURE_CARDS: { title: string; icon: string; alt: string }[] = [
  {
    title: "Custom Headers",
    icon: `${ASSET_DIR}/icon-tabler-columns.svg`,
    alt: "Columns icon",
  },
  {
    title: "Transform Payload",
    icon: `${ASSET_DIR}/icon-tabler-braces.svg`,
    alt: "Braces icon",
  },
  {
    title: "Custom Encryption",
    icon: `${ASSET_DIR}/icon-tabler-key.svg`,
    alt: "Key icon",
  },
  {
    title: "Failure Recovery",
    icon: `${ASSET_DIR}/icon-tabler-arrow-back-up-double.svg`,
    alt: "Arrow back up icon",
  },
  {
    title: "Rate Limiting",
    icon: `${ASSET_DIR}/icon-tabler-clock.svg`,
    alt: "Clock icon",
  },
  {
    title: "Retries",
    icon: `${ASSET_DIR}/icon-tabler-refresh.svg`,
    alt: "Refresh icon",
  },
];

function Card2WebhookFeaturesGrid() {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg py-10 lg:py-[60px] px-6 lg:px-20"
      style={{ paddingBottom: 120 }}
    >
      <div
        className="flex flex-col items-center w-full max-w-[824px]"
        style={{ gap: 52 }}
      >
        {/* Heading + 2 CTAs centered (Figma 177:34733) */}
        <div
          className="flex flex-col items-center w-full"
          style={{ gap: 32, textAlign: "center" }}
        >
          <div
            className="flex flex-col items-center"
            style={{ gap: 12, width: "100%" }}
          >
            <h2
              className="font-urbanist font-bold"
              style={{
                fontSize: "clamp(28px, 4.2vw, 52px)",
                lineHeight: 1.2,
                letterSpacing: "-1.56px",
                color: "#111",
                textTransform: "capitalize",
                margin: 0,
              }}
            >
              advanced Webhooks
            </h2>
            <p
              className="font-urbanist"
              style={{
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.2,
                color: "#111",
                margin: 0,
              }}
            >
              We security at each touchpoint to ensure privacy for our users
            </p>
          </div>
          <div className="flex" style={{ gap: 12 }}>
            <TrustCentreButton />
            <LearnMoreButton />
          </div>
        </div>

        {/* 3×2 grid of feature cards — 1 col mobile, 3 cols desktop */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 w-full"
          style={{ gap: 16 }}
        >
          {FEATURE_CARDS.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>

        {/* Free-standing Yuri testimonial — same component as Security */}
        <div className="w-full">
          <InlineTestimonialCard
            name={yuriTestimonial.name}
            role={yuriTestimonial.role}
            quote={yuriTestimonial.quote}
            avatarSrc={yuriTestimonial.avatarSrc}
          />
        </div>
      </div>
    </section>
  );
}

// Trust Centre — outlined indigo button with dark text. Mirrors Figma
// node 177:34738.
function TrustCentreButton() {
  return (
    <a
      href="https://velt.dev/docs/security"
      target="_blank"
      rel="noopener"
      className="flex items-center justify-center"
      style={{
        width: 156,
        height: 44,
        padding: "8px 16px",
        border: "2px solid #3f12a1",
        borderRadius: 8,
        textDecoration: "none",
      }}
    >
      <span
        className="font-urbanist font-semibold whitespace-nowrap"
        style={{
          fontSize: 16,
          color: "#111",
          letterSpacing: "-0.48px",
          lineHeight: 1.2,
        }}
      >
        Trust Centre
      </span>
    </a>
  );
}

// Learn More — solid indigo button with white text. Mirrors Figma
// node 177:34740.
function LearnMoreButton() {
  return (
    <a
      href="https://velt.dev/docs/security"
      target="_blank"
      rel="noopener"
      className="flex items-center justify-center"
      style={{
        width: 156,
        height: 44,
        padding: "8px 16px",
        background: "#3f12a1",
        borderRadius: 8,
        textDecoration: "none",
      }}
    >
      <span
        className="font-urbanist font-semibold whitespace-nowrap"
        style={{
          fontSize: 16,
          color: "#fff",
          letterSpacing: "-0.48px",
          lineHeight: 1.2,
        }}
      >
        Learn More
      </span>
    </a>
  );
}

// One feature card — light-gray 264×260 rounded box with a 32×32 tabler
// icon at top-left and (title + description) at the bottom. Mirrors any of
// Figma nodes 177:34745 / 177:34751 / 177:34757 / 177:34764 / 177:34770 /
// 177:34776.
function FeatureCard({
  title,
  icon,
  alt,
}: {
  title: string;
  icon: string;
  alt: string;
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        minHeight: 200,
        padding: 32,
        background: "#f5f5f5",
        borderRadius: 24,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt={alt}
        style={{ width: 32, height: 32, display: "block", flexShrink: 0 }}
      />
      <div
        className="flex flex-col"
        style={{ gap: 6, color: "#000", width: "100%" }}
      >
        <p
          className="font-urbanist font-bold"
          style={{
            fontSize: 20,
            lineHeight: 1.2,
            letterSpacing: "-0.4px",
            margin: 0,
          }}
        >
          {title}
        </p>
        <p
          className="font-urbanist"
          style={{
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: "-0.32px",
            margin: 0,
          }}
        >
          Add headers by to be used in your applications
        </p>
      </div>
    </div>
  );
}

// ---------- Shared helpers (mirrors AdminConsoleHighlights) ----------

function TestimonialBannerAttached({ t }: { t: Testimonial }) {
  // Compact attached spec from Phase 4.1: bg #1c1d21, padding 40v / 52h,
  // height driven by avatar + padding (~132 total).
  return (
    <div
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      style={{
        background: "#1c1d21",
        padding: "40px 52px",
        gap: 24,
      }}
    >
      <div className="flex items-center" style={{ gap: 16, flexShrink: 0 }}>
        <Avatar src={t.avatarSrc} alt={t.name} />
        <div className="flex flex-col" style={{ gap: 4 }}>
          <p
            className="font-urbanist font-semibold"
            style={{
              color: "#fff",
              fontSize: 18,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {t.name}
          </p>
          <p
            className="font-urbanist"
            style={{
              color: "#fff",
              opacity: 0.52,
              fontSize: 16,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {t.role}
          </p>
        </div>
      </div>
      <p
        className="font-urbanist font-semibold w-full lg:w-[421px] lg:flex-shrink-0"
        style={{
          color: "#fff",
          fontSize: 24,
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          margin: 0,
        }}
      >
        {t.quote}
      </p>
    </div>
  );
}

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        border: "2px solid #B4B1FA",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
