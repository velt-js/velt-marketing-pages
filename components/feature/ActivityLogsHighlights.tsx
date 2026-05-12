"use client";

// Activity Logs page body. One hardcoded slug-conditional component
// that renders the section title plus 5 stacked card sections from
// Figma node 221:23313 in HqWIZdR6ISJmaG2n4o3gr8. Mirrors the
// notifications precedent: every mockup is built from DOM (sharp at
// any zoom) instead of being a flat screenshot. Some cards include
// raster illustrations exported from Figma — those live in
// /public/images/features/activity-logs/.
//
// "use client" because Card 1 has switchable Automatic/Custom tabs.
//
// Slug-conditional in app/(features)/[slug]/page.tsx — only rendered
// when the slug is "activity-logs".

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { FeatureSectionShell, TestimonialFooter } from "./FeatureSectionShell";
import { InlineTestimonialCard } from "@/components/home/InlineTestimonialCard";
import { Book2Icon } from "./uis/icons";

const PURPLE = "#615df5";
const ACCENT = "#b4b1fa";
const TEXT_HEADING = "#111";
const TEXT_BODY = "#111";

const ethanTestimonial = {
  name: "Ethan Veres",
  role: "CTO @eqtble",
  quote: "Commenting is something we wanted in our app, Velt made it possible",
  avatarSrc: "/images/features/comments/trust-us/avatar-ethan.png",
};

const yuriTestimonial = {
  name: "Yuri Kleban",
  role: "Senior PM @Google",
  quote:
    "Velt gave great 1 on 1 support, added features fast, and offered highly customizable components.",
  avatarSrc: "/images/features/comments/trust-us/avatar-yuri.png",
};

export function ActivityLogsHighlights() {
  return (
    <>
      <SectionTitle />
      <Card1AutomaticEvents />
      <Card2SameRecordFormat />
      <Card3WhatTeamsBuild />
      <Card4CaptureSlice />
      <Card5PRD />
    </>
  );
}

// -------------------------------------------------------------- Section title

function SectionTitle() {
  return (
    <section
      // First light section on the page — `data-outcomes` flips the nav
      // to its light/dark scheme. The 48px rounded top + 80px gap is
      // the "topAccent" treatment FeatureSectionShell uses when it's
      // the first card; here we apply it to a plain heading block so
      // every card below can sit on a continuous white plate.
      data-outcomes
      className="flex flex-col items-center bg-white full-bleed-bg py-20 lg:py-[100px] px-6 lg:px-20"
      style={{
        marginTop: 80,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 12, maxWidth: 800 }}
      >
        <h2
          className="font-urbanist font-bold"
          style={{
            color: TEXT_HEADING,
            fontSize: "clamp(28px, 4.2vw, 52px)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          <span style={{ display: "block" }}>Automatic for Velt.</span>
          <span style={{ display: "block" }}>
            One function call for everything else.
          </span>
        </h2>
        <p
          className="font-urbanist"
          style={{
            color: TEXT_HEADING,
            fontSize: 20,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Velt provides everything you need to easily setup a robust and
          reliable notification system
        </p>
      </div>
    </section>
  );
}

// ----------------------------------- Card 1: Velt automatically captures events
// One rounded outer container with three stacked layers:
//   1. Dark CHROME tab strip (Automatic active, Custom inactive)
//   2. White content area (heading + sub + code chip + event log)
//   3. Dark Ethan testimonial banner (compact, attached to bottom)

function Card1AutomaticEvents() {
  const [tab, setTab] = useState<"automatic" | "custom">("automatic");
  const isAutomatic = tab === "automatic";
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg py-10 lg:py-[60px] px-6 lg:px-20"
    >
      <div
        className="overflow-hidden w-full max-w-[1280px]"
        style={{
          background: "#fff",
          border: "2px solid #111",
          borderRadius: 32,
        }}
      >
        {/* Dark tab strip */}
        <div
          role="tablist"
          aria-label="Activity log mode"
          style={{
            background: "#1c1d21",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="flex items-start" style={{ gap: 8 }}>
            <Card1Tab label="Automatic" active={isAutomatic} onClick={() => setTab("automatic")} />
            <Card1Tab label="Custom" active={!isAutomatic} onClick={() => setTab("custom")} />
          </div>
        </div>

        {/* White content */}
        <div
          className="flex flex-col items-center py-16 lg:py-[83px] px-6 lg:px-20"
          style={{ background: "#fff", gap: 24 }}
        >
          <div
            className="flex flex-col items-center text-center"
            style={{ gap: 12, maxWidth: 800 }}
          >
            <h3
              className="font-urbanist font-bold"
              style={{
                color: "#000",
                fontSize: "clamp(28px, 4.2vw, 52px)",
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              {isAutomatic
                ? "Velt automatically captures events"
                : "Or log custom events yourself"}
            </h3>
            <p
              className="font-urbanist"
              style={{
                color: TEXT_BODY,
                fontSize: 20,
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              {isAutomatic
                ? "A paragraph rewrite becomes one record, not 200"
                : "Drop activity.createActivity() anywhere in your app to capture deployments, agent actions, or anything else."}
            </p>
          </div>

          {isAutomatic ? (
            <>
              {/* setActivityDebounceTime() chip + trailing copy */}
              <div
                className="flex items-center"
                style={{
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 12,
                  padding: "4px 8px 4px 4px",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    background: "rgba(27,112,196,0.08)",
                    padding: 4,
                    borderRadius: 8,
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 18,
                    lineHeight: 1.2,
                  }}
                >
                  <span style={{ color: "#1b70c4" }}>setActivityDebounceTime</span>
                  <span style={{ color: "#969696" }}>()</span>
                </span>
                <span
                  className="font-urbanist"
                  style={{
                    color: TEXT_HEADING,
                    fontSize: 18,
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  batches keystrokes into meaningful records.
                </span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/features/activity-logs/automatic-logging.png"
                alt="Event log showing Who, What, When, Where columns with a sample record"
                style={{ width: "100%", height: "auto", maxWidth: 850 }}
              />
            </>
          ) : (
            <CustomLoggingMockup />
          )}
        </div>

        {/* Compact Ethan testimonial banner attached to the bottom */}
        <TestimonialFooter t={ethanTestimonial} />
      </div>
    </section>
  );
}

function Card1Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      style={{
        background: active ? PURPLE : "transparent",
        padding: "8px 12px",
        borderRadius: 8,
        border: "none",
        fontFamily: "'Fira Mono', monospace",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 1,
        letterSpacing: "-0.42px",
        textTransform: "uppercase",
        color: active ? "#fff" : "rgba(255,255,255,0.52)",
        whiteSpace: "nowrap",
        cursor: "pointer",
        transition: "background-color 160ms ease, color 160ms ease",
      }}
    >
      {label}
    </button>
  );
}

// Custom-tab mockup: light grey code panel on the left with two
// activity.createActivity({...}) calls, plus 3 white floating activity
// rows overlapping the right edge. Matches Figma node 259:26585.
function CustomLoggingMockup() {
  return (
    <div className="hidden lg:block relative" style={{ width: 930, height: 386 }}>
      {/* Light grey rounded code panel */}
      <div
        className="absolute"
        style={{
          left: 107,
          top: 20,
          width: 743,
          height: 366,
          background: "#fafbfb",
          borderRadius: 24,
        }}
        aria-hidden
      />

      {/* Code block */}
      <div
        className="absolute"
        style={{
          left: 147,
          top: 50,
          fontFamily: "'Fira Code', monospace",
          fontSize: 14,
          lineHeight: 1.6,
          color: "#000",
          letterSpacing: "0.14px",
          whiteSpace: "pre",
        }}
      >
        <div style={{ color: "rgba(0,0,0,0.52)" }}>{"// Log a deployment"}</div>
        <div>
          {"activity."}
          <span style={{ color: "#0057e2" }}>createActivity</span>
          {"({"}
        </div>
        <div>
          {"  "}
          <span style={{ color: "#0057e2" }}>type</span>
          {": "}
          <span style={{ color: "#009e74" }}>{"'deployment'"}</span>,
        </div>
        <div>
          {"  "}
          <span style={{ color: "#0057e2" }}>message</span>
          {": "}
          <span style={{ color: "#009e74" }}>{"'v2.4.1 deployed to production'"}</span>,
        </div>
        <div>
          {"  "}
          <span style={{ color: "#0057e2" }}>data</span>
          {": { "}
          <span style={{ color: "#0057e2" }}>environment</span>
          {": "}
          <span style={{ color: "#009e74" }}>{"'prod'"}</span>
          {", "}
          <span style={{ color: "#0057e2" }}>version</span>
          {": "}
          <span style={{ color: "#009e74" }}>{"'2.4.1'"}</span>
          {" }"}
        </div>
        <div>{"});"}</div>
        <div>&nbsp;</div>
        <div style={{ color: "rgba(0,0,0,0.52)" }}>{"// Log an AI agent action"}</div>
        <div>
          {"activity."}
          <span style={{ color: "#0057e2" }}>createActivity</span>
          {"({"}
        </div>
        <div>
          {"  "}
          <span style={{ color: "#0057e2" }}>type</span>
          {": "}
          <span style={{ color: "#009e74" }}>{"'ai-review'"}</span>,
        </div>
        <div>
          {"  "}
          <span style={{ color: "#0057e2" }}>message</span>
          {": "}
          <span style={{ color: "#009e74" }}>{"'Brand voice check completed'"}</span>,
        </div>
        <div>
          {"  "}
          <span style={{ color: "#0057e2" }}>data</span>
          {": { "}
          <span style={{ color: "#0057e2" }}>agent</span>
          {": "}
          <span style={{ color: "#009e74" }}>{"'brand-guard'"}</span>
          {", "}
          <span style={{ color: "#0057e2" }}>issues</span>
          {": "}
          <span style={{ color: "#c84519" }}>3</span>
          {", "}
          <span style={{ color: "#0057e2" }}>confidence</span>
          {": "}
          <span style={{ color: "#c84519" }}>0.92</span>
          {" }"}
        </div>
        <div>{"});"}</div>
      </div>

      {/* Floating activity rows (overlap the code panel's right edge) */}
      <CustomActivityRow
        icon="pencil"
        left={563}
        top={85}
        width={321}
        text="v2.4.1 deployed to production"
      />
      <CustomActivityRow
        icon="checks"
        left={613}
        top={157}
        width={317}
        text="Brand voice check completed"
      />
      <CustomActivityRow
        icon="ballpen"
        left={577}
        top={229}
        width={321}
        text={
          <>
            <span style={{ fontWeight: 400 }}>{"Jen signed "}</span>
            <span style={{ fontWeight: 600 }}>Service Agreement</span>
          </>
        }
      />
    </div>
  );
}

function CustomActivityRow({
  icon,
  left,
  top,
  width,
  text,
}: {
  icon: "pencil" | "checks" | "ballpen";
  left: number;
  top: number;
  width: number;
  text: ReactNode;
}) {
  const Icon =
    icon === "pencil" ? PencilIcon : icon === "ballpen" ? BallpenIcon : ChecksIcon;
  const iconColor =
    icon === "pencil" ? "#0168f2" : icon === "ballpen" ? "#ff7162" : "#16a34a";
  return (
    <div
      className="absolute flex items-center justify-between"
      style={{
        left,
        top,
        width,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 12,
        padding: 12,
        boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex items-center" style={{ gap: 8 }}>
        <Icon size={16} color={iconColor} />
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 14,
            color: "#141414",
            letterSpacing: "0.14px",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </p>
      </div>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 14,
          color: "#7a7a7a",
          letterSpacing: "0.14px",
        }}
      >
        12h
      </span>
    </div>
  );
}

// ---------------------------------- Card 2: Same record format. Human or AI.

function Card2SameRecordFormat() {
  return (
    <FeatureSectionShell
      heading="Same record format. Human or AI."
      subheading="AI agent writes a comment, flags an issue, suggests an edit. Same structured record as a human action. Same schema. Same attribution."
      viewDocsCta={{ label: "Get Started", href: "https://console.velt.dev/", newTab: true }}
      primaryCta={{ label: "Book Demo", href: "/book-demo" }}
      testimonial={ethanTestimonial}
    >
      <TimelineMockup />
    </FeatureSectionShell>
  );
}

function TimelineMockup() {
  // Pipeline pills row at top + 4 activity rows, with a white-fade
  // gradient over the bottom so the last row trails off.
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100%", height: 420, background: "#fff" }}
    >
      {/* Pipeline pills row */}
      <div
        className="absolute flex items-center"
        style={{
          left: "50%",
          top: 16,
          transform: "translateX(-50%)",
          gap: 5,
        }}
      >
        <PipelinePill bg="#262c35" color="#fff">Agent acted</PipelinePill>
        <PipelineArrow />
        <PipelinePill bg="#14aa6e" color="#fff">Decision recorded</PipelinePill>
        <PipelineArrow />
        <PipelinePill bg="#0168f2" color="#fff">Human reviewed</PipelinePill>
      </div>

      {/* Activity rows centered */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          left: "50%",
          top: 76,
          transform: "translateX(-50%)",
          gap: 24,
          width: 615,
        }}
      >
        <ActivityRow icon="pencil" prefix="Brand Agent" suffix="flagged 3 brand voice issues" />
        <ActivityRow icon="checks" prefix="Sarah Chen" suffix="Resolved 2 and dismissed 1 Issue" />
        <ActivityRow icon="ballpen" prefix="Compliance Agent" suffix="verified final version" />
        <ActivityRow icon="checks" prefix="James Park" suffix="approved for publishing" />
      </div>

      {/* Bottom fade */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          height: 200,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)",
          backdropFilter: "blur(2.5px)",
        }}
        aria-hidden
      />
    </div>
  );
}

function PipelinePill({
  bg,
  color,
  children,
}: {
  bg: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <span
      style={{
        background: bg,
        padding: "7.5px 15px",
        borderRadius: 37.5,
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 600,
        fontSize: 17.5,
        lineHeight: 1,
        letterSpacing: "0.175px",
        textTransform: "uppercase",
        color,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function PipelineArrow() {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        border: "1.25px solid #272c35",
        borderRadius: 37.5,
        padding: "7.5px 15px",
        background: "#fff",
      }}
    >
      <ArrowRightIcon size={17.5} />
    </span>
  );
}

function ActivityRow({
  icon,
  prefix,
  suffix,
}: {
  icon: "pencil" | "checks" | "ballpen";
  prefix: string;
  suffix: string;
}) {
  const Icon =
    icon === "pencil" ? PencilIcon : icon === "ballpen" ? BallpenIcon : ChecksIcon;
  return (
    <div
      className="flex items-center"
      style={{
        background: "#fff",
        border: "1.25px solid rgba(0,0,0,0.08)",
        borderRadius: 18.75,
        padding: 18.75,
        gap: 20,
        boxShadow: "0 0 10px rgba(0,0,0,0.08)",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div className="flex items-center" style={{ gap: 12.5 }}>
        <Icon size={25} color={icon === "checks" ? "#16a34a" : icon === "pencil" ? "#0168f2" : "#ff7162"} />
        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 21.875,
            color: "#141414",
            letterSpacing: "-0.16px",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 600 }}>{prefix}</span>{" "}
          <span style={{ fontWeight: 400 }}>{suffix}</span>
        </p>
      </div>
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 21.875,
          color: "#7a7a7a",
          letterSpacing: "0.2188px",
        }}
      >
        12h
      </span>
    </div>
  );
}

// ----------------- Card 3: What teams build with Activity Logs (3-tile bento)

function Card3WhatTeamsBuild() {
  return (
    <BentoCard
      heading={
        <>
          <span style={{ display: "block" }}>What teams build</span>
          <span style={{ display: "block" }}>with Activity Logs</span>
        </>
      }
      tiles={[
        {
          title: "Compliance Audit Trail",
          body:
            "Who approved what. When. With what context. Immutable records for SOC 2, HIPAA, and regulated workflows.",
          imageSrc: "/images/features/activity-logs/compliance-audit-trail.png",
          imageWidth: 480,
          imageHeight: 180,
          imageLeft: -42,
          imageTop: 28,
        },
        {
          title: "AI Agent Traceability",
          body:
            "AI agent acts. Human reviews. Both get the same structured record. The evidence chain enterprises need before trusting AI in production.",
          imageSrc: "/images/features/activity-logs/ai-agent-traceability.png",
          imageWidth: 421,
          imageHeight: 158,
          imageLeft: "calc(50% - 0.5px)",
          imageTop: 34,
          imageCenter: true,
        },
      ]}
      wideTile={{
        title: "Activity Feed",
        body:
          "A timeline of everything that happened in a document. Comments, edits, status changes, agent actions. Scoped to permissions.",
        imageSrc: "/images/features/activity-logs/activity-feed.png",
        imageWidth: 376,
        imageHeight: 186,
        imageLeft: 523,
        imageTop: 23,
      }}
    />
  );
}

// ------------------------ Card 4: Capture Everything. Then Slice It. (3-tile)

function Card4CaptureSlice() {
  return (
    <BentoCard
      heading="Capture Everything. Then Slice It."
      subheading="Explore activity across your org, drill into a single document, or filter by feature for focused views."
      tiles={[
        {
          title: "Query & Filter",
          body: (
            <>
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 15 }}>
                getAllActivities()
              </span>
              {" "}for org-wide or per-document. Filter by feature, user, agent, or time. Real-time or REST.
            </>
          ),
          imageSrc: "/images/features/activity-logs/query-filter.png",
          imageWidth: 392,
          imageHeight: 232,
          imageLeft: -2,
          imageTop: -2,
          coverFull: true,
        },
        {
          title: "Immutable Mode",
          body:
            "On by default. Records can't be changed or deleted. SOC 2, HIPAA, EU AI Act ready. Turn off when you need flexibility.",
          imageSrc: "/images/features/activity-logs/immutable-mode.png",
          imageWidth: 392,
          imageHeight: 232,
          imageLeft: -2,
          imageTop: -2,
          coverFull: true,
        },
      ]}
      wideTile={{
        title: "REST API",
        body:
          "Create, query, and manage records from your backend. The SDK captures. The API gives you control.",
        imageSrc: "/images/features/activity-logs/rest-api.png",
        imageWidth: 336,
        imageHeight: 198,
        imageRight: -2,
        imageTop: -2,
      }}
    />
  );
}

// Shared bento layout for Cards 3 + 4.
type BentoTile = {
  title: string;
  body: ReactNode;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageLeft?: number | string;
  imageRight?: number;
  imageTop?: number;
  imageCenter?: boolean;
  coverFull?: boolean;
};

function BentoCard({
  heading,
  subheading,
  tiles,
  wideTile,
}: {
  heading: ReactNode;
  subheading?: string;
  tiles: BentoTile[];
  wideTile: BentoTile;
}) {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg py-10 lg:py-[60px] px-6 lg:px-20"
    >
      <div
        className="flex flex-col items-center w-full max-w-[800px]"
        style={{ gap: 40 }}
      >
        {/* Header (heading + sub + dual CTA) */}
        <div
          className="flex flex-col items-center w-full"
          style={{ gap: 24, textAlign: "center" }}
        >
          <div
            className="flex flex-col items-center"
            style={{ gap: 12, color: TEXT_HEADING }}
          >
            <h3
              className="font-urbanist font-bold"
              style={{
                fontSize: "clamp(28px, 4.2vw, 52px)",
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              {heading}
            </h3>
            {subheading ? (
              <p
                className="font-urbanist"
                style={{ fontSize: 20, lineHeight: 1.2, margin: 0 }}
              >
                {subheading}
              </p>
            ) : null}
          </div>
          <div className="flex items-start" style={{ gap: 12 }}>
            <SecondaryCta href="https://docs.velt.dev/" label="View Docs" />
            <PrimaryCta href="/book-demo" label="Book Demo" />
          </div>
        </div>

        {/* Bento grid: 2 top tiles + 1 wide bottom tile */}
        <div
          className="flex flex-col items-start"
          style={{ width: "100%", gap: 16 }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-2 w-full"
            style={{ gap: 16 }}
          >
            {tiles.map((tile, i) => (
              <BentoTileBox key={i} tile={tile} />
            ))}
          </div>
          <BentoWideTileBox tile={wideTile} />
        </div>

        {/* Yuri testimonial — same shared component as the Security section */}
        <InlineTestimonialCard
          name={yuriTestimonial.name}
          role={yuriTestimonial.role}
          quote={yuriTestimonial.quote}
          avatarSrc={yuriTestimonial.avatarSrc}
        />
      </div>
    </section>
  );
}

function BentoTileBox({ tile }: { tile: BentoTile }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        minWidth: 0,
        height: 400,
        background: "#f7f7f7",
        border: "2px solid #f7f7f7",
        borderRadius: 24,
      }}
    >
      <BentoTileImage tile={tile} />
      <div
        className="absolute flex flex-col items-start"
        style={{ left: 28, bottom: 28, width: 383, gap: 8, color: TEXT_HEADING }}
      >
        <p
          className="font-urbanist font-bold"
          style={{
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {tile.title}
        </p>
        <p
          className="font-urbanist"
          style={{
            fontSize: 18,
            lineHeight: 1.2,
            opacity: 0.52,
            margin: 0,
          }}
        >
          {tile.body}
        </p>
      </div>
    </div>
  );
}

function BentoWideTileBox({ tile }: { tile: BentoTile }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100%",
        height: 198,
        background: "#f7f7f7",
        border: "2px solid #f7f7f7",
        borderRadius: 24,
      }}
    >
      <BentoTileImage tile={tile} />
      <div
        className="absolute flex flex-col items-start"
        style={{ left: 30, bottom: 30, width: 460, gap: 8, color: TEXT_HEADING }}
      >
        <p
          className="font-urbanist font-bold"
          style={{
            fontSize: 28,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {tile.title}
        </p>
        <p
          className="font-urbanist"
          style={{
            fontSize: 18,
            lineHeight: 1.2,
            opacity: 0.52,
            margin: 0,
          }}
        >
          {tile.body}
        </p>
      </div>
    </div>
  );
}

function BentoTileImage({ tile }: { tile: BentoTile }) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: tile.imageWidth,
    height: tile.imageHeight,
    pointerEvents: "none",
    objectFit: "cover",
    maxWidth: "none",
  };
  if (tile.imageCenter) {
    style.left = "50%";
    style.transform = "translateX(-50%)";
  } else if (tile.imageRight !== undefined) {
    style.right = tile.imageRight;
  } else if (tile.imageLeft !== undefined) {
    style.left = tile.imageLeft;
  }
  if (tile.imageTop !== undefined) {
    style.top = tile.imageTop;
  }
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={tile.imageSrc} alt="" style={style} aria-hidden />
  );
}

// ------------------- Card 5: Easy to build. Until you list what's inside (PRD)

function Card5PRD() {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg py-10 lg:py-[60px] px-6 lg:px-20"
      style={{ paddingBottom: 120 }}
    >
      <div
        className="flex flex-col items-center relative w-full max-w-[800px]"
        style={{ gap: 40 }}
      >
        {/* Header */}
        <div
          className="flex flex-col items-center w-full"
          style={{ gap: 24, maxWidth: 552, textAlign: "center" }}
        >
          <div
            className="flex flex-col items-center"
            style={{ gap: 12, color: TEXT_HEADING }}
          >
            <h3
              className="font-urbanist font-bold"
              style={{
                fontSize: "clamp(28px, 4.2vw, 52px)",
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              <span style={{ display: "block" }}>Easy to build.</span>
              <span style={{ display: "block" }}>{`Until you list what's inside`}</span>
            </h3>
            <p
              className="font-urbanist"
              style={{ fontSize: 20, lineHeight: 1.2, margin: 0 }}
            >
              One feature. Ten systems under it. Every one of these ships out of the box with Velt.
            </p>
          </div>
          <div className="flex items-start" style={{ gap: 12 }}>
            <SecondaryCta href="https://docs.velt.dev/" label="View Docs" />
            <PrimaryCta href="/book-demo" label="Book Demo" />
          </div>
        </div>

        {/* PRD checklist mockup */}
        <PRDMockup />

        {/* Decorative cursors flanking the mockup — desktop only */}
        <CursorPin
          color="#ff74f6"
          name="Emma"
          className="hidden lg:flex"
          style={{ position: "absolute", right: -30, top: "calc(50% + 169.5px)", transform: "translateY(-50%)" }}
          variant="left"
        />
        <CursorPin
          color="#8bf2e1"
          name="Sean"
          className="hidden lg:flex"
          style={{ position: "absolute", left: -80, top: 647 }}
          variant="right"
        />
      </div>
    </section>
  );
}

function PRDMockup() {
  return (
    <div
      className="relative overflow-hidden flex flex-col items-start"
      style={{
        width: "100%",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 24,
        padding: 24,
        gap: 2,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ width: "100%", padding: "12px 4px" }}
      >
        <p
          className="font-urbanist font-bold"
          style={{
            fontSize: 20,
            lineHeight: 1.2,
            color: TEXT_HEADING,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          Activity Logs PRD
        </p>
        <p
          className="font-urbanist font-bold"
          style={{
            fontSize: 20,
            lineHeight: 1.2,
            color: TEXT_HEADING,
            opacity: 0.32,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          10 Weeks
        </p>
      </div>

      <PRDWeekLabel>Week 1 - 3</PRDWeekLabel>
      <PRDItem n="01" bold="Event schema" rest=" for comments, edits, reactions, agent actions, and custom events" />
      <PRDItem n="02" bold="User attribution" rest=" across sessions, devices, and API keys" />
      <PRDItem n="03" bold="Agent attribution" rest=" that distinguishes AI from human in the same schema" />
      <PRDItem n="04" bold="Debouncing" rest=" that turns rapid edits into meaningful records" />
      <PRDItem n="05" bold="Real-time subscriptions" rest=" so feeds update without polling" />

      <PRDWeekLabel>Week 3 - 5</PRDWeekLabel>
      <PRDItem n="06" bold="Filtering" rest=" by org, document, feature, user, agent, time" />
      <PRDItem n="07" bold="Immutability" rest=" that actually prevents tampering" />
      <PRDItem n="08" bold="Permission" rest=" scoping so users only see what they should" />

      <PRDWeekLabel>Week 6 - 8</PRDWeekLabel>
      <PRDItem n="09" bold="REST API" rest=" for backend access and exports" />
      <PRDItem n="10" bold="Compliance" rest=" formatting for SOC 2, HIPAA, and audits" />

      {/* Bottom white-fade gradient */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: -2,
          right: 0,
          bottom: -2,
          height: 191,
          background:
            "linear-gradient(to bottom, rgba(254,255,255,0) 0%, #fff 100%)",
          backdropFilter: "blur(2px)",
        }}
        aria-hidden
      />
    </div>
  );
}

function PRDWeekLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center" style={{ padding: 8 }}>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 600,
          fontSize: 14,
          color: "#db615d",
          letterSpacing: "0.14px",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}

function PRDItem({
  n,
  bold,
  rest,
}: {
  n: string;
  bold: string;
  rest: string;
}) {
  return (
    <div
      className="flex items-center"
      style={{ padding: "8px 12px", gap: 16 }}
    >
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 600,
          fontSize: 14,
          color: "#000",
          letterSpacing: "0.14px",
          textTransform: "uppercase",
          opacity: 0.32,
        }}
      >
        #{n}
      </span>
      <div className="flex items-center" style={{ gap: 8 }}>
        <span
          aria-hidden
          style={{
            display: "inline-block",
            width: 16,
            height: 16,
            border: "1.5px solid #111",
            borderRadius: "50%",
            opacity: 0.5,
          }}
        />
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 14,
            color: "#000",
            letterSpacing: "0.14px",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          <span style={{ fontWeight: 600 }}>{bold}</span>
          <span style={{ fontWeight: 400 }}>{rest}</span>
        </p>
      </div>
    </div>
  );
}

function CursorPin({
  color,
  name,
  style,
  variant,
  className,
}: {
  color: string;
  name: string;
  style: React.CSSProperties;
  variant: "left" | "right";
  className?: string;
}) {
  // variant=left → cursor pointer on the left edge of the pill
  // variant=right → cursor pointer on the right edge (mirrored)
  const Pointer = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={{ display: "block" }}
      aria-hidden
    >
      <path
        d="M2 2 L18 8 L10 11 L8 18 Z"
        fill={color}
        stroke="#000"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <div
      className={`flex flex-col${className ? ` ${className}` : ""}`}
      style={{
        ...style,
        alignItems: variant === "left" ? "flex-start" : "flex-end",
      }}
    >
      {variant === "left" ? Pointer : <div style={{ transform: "scaleX(-1)" }}>{Pointer}</div>}
      <div
        style={{
          paddingLeft: variant === "left" ? 20 : 0,
          paddingRight: variant === "left" ? 0 : 20,
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: color,
            padding: "2.5px 10px",
            borderRadius: 18,
            fontFamily: "Urbanist, sans-serif",
            fontWeight: 700,
            fontSize: 13.75,
            color: "#020202",
            letterSpacing: "0.1375px",
            boxShadow: "0 1.25px 2.5px rgba(0,0,0,0.16)",
          }}
        >
          {name}
        </span>
      </div>
    </div>
  );
}

// ------------------------------------------ Shared CTA + testimonial helpers

function PrimaryCta({ href, label }: { href: string; label: string }) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 156,
    height: 44,
    padding: "8px 16px",
    borderRadius: 8,
    fontFamily: '"Urbanist", sans-serif',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
    color: "#fff",
    textDecoration: "none",
    background: PURPLE,
    border: "2px solid " + PURPLE,
  };
  return (
    <Link href={href} style={baseStyle}>
      {label}
    </Link>
  );
}

function SecondaryCta({ href, label }: { href: string; label: string }) {
  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minWidth: 156,
    height: 44,
    padding: "8px 16px",
    borderRadius: 8,
    fontFamily: '"Urbanist", sans-serif',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
    color: "#fff",
    textDecoration: "none",
    background: "transparent",
    border: "2px solid " + PURPLE,
  };
  return (
    <a href={href} target="_blank" rel="noopener" style={baseStyle}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: "#fff",
          mixBlendMode: "exclusion",
        }}
      >
        <Book2Icon size={18} stroke="#fff" />
        {label}
      </span>
    </a>
  );
}


// --------------------------------------------------- Inline Tabler-style icons

function ChecksIcon({ size = 18, color = "#16a34a" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 12l5 5l10 -10" />
      <path d="M2 12l5 5m5 -5l5 -5" />
    </svg>
  );
}

function PencilIcon({ size = 18, color = "#0168f2" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

function BallpenIcon({ size = 18, color = "#ff7162" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 6l7 7l-4 4" />
      <path d="M5.828 18.172a2.828 2.828 0 0 0 4 0l10.586 -10.586a2 2 0 0 0 0 -2.829l-1.171 -1.171a2 2 0 0 0 -2.829 0l-10.586 10.586a2.828 2.828 0 0 0 0 4z" />
      <path d="M4 20l1.768 -1.768" />
    </svg>
  );
}

function ArrowRightIcon({ size = 17.5 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#272c35"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12l14 0" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </svg>
  );
}
