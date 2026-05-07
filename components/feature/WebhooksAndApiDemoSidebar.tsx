"use client";

// Webhooks & API page hero demo panel — Figma node 177:33611 (panel 177:39597
// Slack Sync, panel 177:41207 Email Notifications). 1280×879 navy panel
// sitting under PageHero on /features/webhooks-and-api with a 4-tab strip.
// Slack Sync and Email Notifications are wired; Task Management and Zapier
// remain placeholders until those Figma frames ship.

import { useState } from "react";

type TabKey = "slack" | "email" | "tasks" | "zapier";

const TABS: { key: TabKey; label: string }[] = [
  { key: "slack", label: "Slack Sync" },
  { key: "email", label: "Email Notifications" },
  { key: "tasks", label: "Task Management" },
  { key: "zapier", label: "Zapier" },
];

export function WebhooksAndApiDemoSidebar() {
  const [tab, setTab] = useState<TabKey>("slack");

  return (
    <section
      style={{
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        background: "rgb(6, 5, 26)",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: "36px 0 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", background: "rgb(10, 9, 42)", borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: "36px 0 0", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", background: "rgb(14, 12, 56)", borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: "40px 36px 160px", display: "flex", justifyContent: "center" }}>
          <div className="relative overflow-hidden" style={{ width: "100%", maxWidth: 1280, height: 879, borderRadius: 22, border: "1.5px solid rgba(255,255,255,0.24)", background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.32) 100%), linear-gradient(180deg, rgb(13, 11, 56) 0%, rgb(20, 17, 88) 55%, rgb(33, 28, 138) 100%)", boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.25)" }}>
            <DotGrid />
            <TabStrip current={tab} onChange={setTab} />
            {tab === "slack" ? <SlackSyncBody /> : null}
            {tab === "email" ? <EmailNotificationsBody /> : null}
            {tab === "tasks" ? <TaskManagementBody /> : null}
            {tab === "zapier" ? <ZapierBody /> : null}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180, background: "linear-gradient(to top, rgb(14, 12, 56) 0%, transparent 100%)", pointerEvents: "none", borderBottomLeftRadius: 22, borderBottomRightRadius: 22 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- Tab strip -----

function TabStrip({
  current,
  onChange,
}: {
  current: TabKey;
  onChange: (k: TabKey) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Webhooks & API integration"
      className="absolute flex items-center"
      style={{
        top: 30,
        left: 30,
        width: 1220,
        height: 62,
        padding: 8,
        gap: 2,
        border: "1.5px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {TABS.map((t) => {
        const active = t.key === current;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.key)}
            className="cursor-pointer"
            style={{
              flex: "1 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              height: 46,
              padding: "0 16px",
              borderRadius: 10,
              border: "none",
              background: active ? "rgba(255,255,255,0.10)" : "transparent",
              transition: "background 160ms ease, color 160ms ease",
            }}
          >
            <TabIcon kind={t.key} active={active} />
            <span
              className="font-urbanist whitespace-nowrap"
              style={{
                fontWeight: active ? 600 : 500,
                fontSize: 16,
                lineHeight: 1.2,
                letterSpacing: "-0.32px",
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
              }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TabIcon({ kind, active }: { kind: TabKey; active: boolean }) {
  if (kind === "slack") {
    if (active) return <SlackBrandIcon size={18} />;
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 12v-3a2 2 0 1 1 2 2h-3" />
        <path d="M9 12h3a2 2 0 1 1 -2 2v-3" />
        <path d="M12 12v3a2 2 0 1 1 -2 -2h3" />
        <path d="M15 12h-3a2 2 0 1 1 2 -2v3" />
      </svg>
    );
  }
  const stroke = active ? "#fff" : "rgba(255,255,255,0.55)";
  if (kind === "email") {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x={3} y={5} width={18} height={14} rx={2} />
        <path d="M3 7l9 6l9 -6" />
      </svg>
    );
  }
  if (kind === "tasks") {
    return (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx={12} cy={6} r={3} />
        <circle cx={6} cy={16} r={3} />
        <circle cx={18} cy={16} r={3} />
      </svg>
    );
  }
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="M5.6 5.6l12.8 12.8" />
      <path d="M18.4 5.6l-12.8 12.8" />
    </svg>
  );
}

// ----- Pill backgrounds ----------------------------
//
// Approximate the Figma radial gradients (node 177:40360 / 177:40368 /
// 177:41989) with CSS native gradients. White→lavender for the bright
// CommentPill; the frosted variants ride on top of `backdrop-filter` and
// the dark navy panel.

const PILL_BG_LIGHT = "radial-gradient(ellipse 65% 110% at 45% 38%, #ffffff 0%, #dedeff 100%)";
const PILL_BG_FROSTED = "rgba(255, 255, 255, 0.08)";
const PILL_BG_TRANSFORM = "linear-gradient(105deg, rgba(78,247,241,0.18) 0%, rgba(147,223,238,0.14) 50%, rgba(222,221,255,0.10) 100%)";

// ----- Body: Slack Sync -----

function SlackSyncBody() {
  return (
    <>
      <h2
        className="absolute font-urbanist"
        style={{
          left: 47,
          top: 135,
          width: 547,
          fontSize: 70,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-2.1px",
          color: "#fff",
          margin: 0,
        }}
      >
        Get a two way sync for Slack
      </h2>

      <SlackSyncFlow />
    </>
  );
}

// Pill positions in panel coordinates from Figma node 177:39597.
function SlackSyncFlow() {
  return (
    <>
      <svg
        width={1280}
        height={879}
        viewBox="0 0 1280 879"
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <path d="M 769,402 H 600 V 537 H 423" stroke="#ee392c" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
        <path d="M 925,442 V 502 H 1081 V 562" stroke="#7c5dff" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
        <path d="M 1081,642 V 695 H 793" stroke="#ee392c" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
      </svg>

      <CommentPill left={769} top={362} width={312} label="Comment Added" />
      <CommentPill left={967} top={562} width={228} label="Add Reply" />
      <SlackPill left={157} top={497} width={266} label="Post On Slack" />
      <SlackPill left={510} top={615} width={283} label="Reply On Slack" />
    </>
  );
}

// ----- Body: Email Notifications -----

function EmailNotificationsBody() {
  return (
    <>
      <h2
        className="absolute font-urbanist"
        style={{
          left: 47,
          top: 135,
          width: 547,
          fontSize: 70,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-2.1px",
          color: "#fff",
          margin: 0,
        }}
      >
        Use Velt data and craft personlized email notifications
      </h2>

      <EmailFlow />
    </>
  );
}

// Pill positions in panel coordinates from Figma node 177:41207.
function EmailFlow() {
  return (
    <>
      <svg
        width={1280}
        height={879}
        viewBox="0 0 1280 879"
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <path d="M 388,614 H 566" stroke="#7c5dff" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
        <path d="M 794,610 H 870 V 495 H 912" stroke="#ee392c" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
      </svg>

      <CommentPill left={47} top={573} width={341} label="Comment Added" />
      <TransformPill left={566} top={570} width={228} label="Transform" />
      <EmailCard left={912} top={253} />
    </>
  );
}

// ----- Pills (one component per Figma pill type) -----

// White pill with indigo icon-square + speech-bubble shape (hollow, white
// border, sharp BL tail). Used for Comment Added and Add Reply on both
// tabs. Mirrors Figma node 177:40360 / 177:40364 / 177:41971.
function CommentPill({ left, top, width, label }: { left: number; top: number; width: number; label: string }) {
  return (
    <div
      className="absolute font-urbanist flex items-center"
      style={{
        left,
        top,
        width,
        height: 80,
        paddingLeft: 12,
        paddingRight: 20,
        paddingTop: 12,
        paddingBottom: 12,
        gap: 16,
        borderRadius: 24,
        background: PILL_BG_LIGHT,
        boxShadow: "0 12px 22.5px rgba(0,0,0,0.25)",
      }}
    >
      <span
        className="flex items-center"
        style={{
          width: 56,
          height: 56,
          padding: 16,
          borderRadius: 12,
          background: "#3f12a1",
          flexShrink: 0,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 24,
            height: 24,
            border: "2px solid #fff",
            background: "transparent",
            // tl tr br bl — sharp bottom-left makes the speech-bubble tail.
            borderRadius: "32px 32px 32px 2px",
            display: "block",
          }}
        />
      </span>
      <span
        style={{
          color: "#000",
          fontWeight: 700,
          fontSize: 28,
          lineHeight: 1.2,
          letterSpacing: "-0.84px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// Frosted-glass pill with white icon-square containing the colorful Slack
// mark. Used for Post On Slack and Reply On Slack. Mirrors Figma node
// 177:40368.
function SlackPill({ left, top, width, label }: { left: number; top: number; width: number; label: string }) {
  return (
    <div
      className="absolute font-urbanist flex items-center"
      style={{
        left,
        top,
        width,
        height: 80,
        paddingLeft: 12,
        paddingRight: 20,
        paddingTop: 12,
        paddingBottom: 12,
        gap: 16,
        borderRadius: 24,
        background: PILL_BG_FROSTED,
        backdropFilter: "blur(4.5px)",
        WebkitBackdropFilter: "blur(4.5px)",
        boxShadow: "0 12px 22.5px rgba(0,0,0,0.25)",
      }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          padding: 16,
          borderRadius: 12,
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <SlackBrandIcon size={24} />
      </span>
      <span
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 28,
          lineHeight: 1.2,
          letterSpacing: "-0.84px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// Frosted-glass pill with cyan icon-square containing the f(x) function
// asset. Used for Transform on the Email Notifications tab. Mirrors Figma
// node 177:41989.
function TransformPill({ left, top, width, label }: { left: number; top: number; width: number; label: string }) {
  return (
    <div
      className="absolute font-urbanist flex items-center"
      style={{
        left,
        top,
        width,
        height: 80,
        paddingLeft: 12,
        paddingRight: 20,
        paddingTop: 12,
        paddingBottom: 12,
        gap: 16,
        borderRadius: 24,
        background: PILL_BG_TRANSFORM,
        backdropFilter: "blur(4.5px)",
        WebkitBackdropFilter: "blur(4.5px)",
        boxShadow: "0 12px 22.5px rgba(0,0,0,0.25)",
      }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          padding: 11.309,
          borderRadius: 16.963,
          background: "#4ef7f1",
          flexShrink: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/features/webhooks-and-api/icon-tabler-function.svg"
          alt=""
          aria-hidden
          style={{ width: 33.383, height: 33.383, display: "block" }}
        />
      </span>
      <span
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 28,
          lineHeight: 1.2,
          letterSpacing: "-0.84px",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ----- Email card (Figma node 177:41975) -----

function EmailCard({ left, top }: { left: number; top: number }) {
  return (
    <div
      className="absolute"
      style={{
        left,
        top,
        width: 292,
        height: 242,
        padding: 24,
        borderRadius: 28.75,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        // Diagonal blue-to-violet sweep — distilled from the conic gradient
        // in Figma node 177:41976. The original conic ranges from rgb(14,13,54)
        // up to rgb(92,87,255); we use the brighter midband for visual lift.
        background:
          "linear-gradient(135deg, rgb(38,35,116) 0%, rgb(67,60,255) 45%, rgb(92,87,255) 70%, rgb(67,60,236) 100%)",
        boxShadow: "0 16px 40px rgba(67,60,255,0.35)",
      }}
    >
      <div style={{ width: 37.148, height: 37.148, flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/features/webhooks-and-api/icon-tabler-bell.svg"
          alt=""
          aria-hidden
          style={{ width: 33.433, height: 33.433, marginLeft: 1.86, marginTop: 1.86, display: "block" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 12, paddingBottom: 12, color: "#fff" }}>
        <p
          className="font-poppins"
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 400,
            letterSpacing: "-0.54px",
          }}
        >
          Hi Emma!
        </p>
        <p
          className="font-poppins"
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Can you take a look at the Q4 Document, I have marked you here
        </p>
      </div>
    </div>
  );
}

// ----- Body: Task Management -----

function TaskManagementBody() {
  return (
    <>
      <h2
        className="absolute font-urbanist"
        style={{
          left: 47,
          top: 135,
          width: 612,
          fontSize: 70,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-2.1px",
          color: "#fff",
          margin: 0,
        }}
      >
        Let your users Connect to Task Management Apps
      </h2>

      <TasksFlow />
    </>
  );
}

// Layout in panel coordinates from Figma node 177:41995.
// Comment Added pill: (838, 207), w=341.5, h=82.8 → bottom edge y≈290
// Hub circles (120×120) at y=566, centers at x = 375 / 585 / 797 / 1006
// Cross bar at y≈466 (mid-way between pill bottom and circle tops)
const TASK_HUBS = [
  {
    key: "clickup",
    left: 315,
    borderColor: "#ffab24",
    src: "/images/features/webhooks-and-api/logo-clickup.svg",
    imgWidth: 44.373,
    imgHeight: 53.247,
    alt: "ClickUp",
  },
  {
    key: "asana",
    left: 525,
    borderColor: "#ff6624",
    src: "/images/features/webhooks-and-api/logo-asana.jpeg",
    imgWidth: 62.4,
    imgHeight: 62.4,
    alt: "Asana",
    rounded: true,
  },
  {
    key: "symbol",
    left: 737,
    borderColor: "#ecffff",
    src: "/images/features/webhooks-and-api/logo-symbol.svg",
    imgWidth: 51.864,
    imgHeight: 51.864,
    alt: "",
  },
  {
    key: "monday",
    left: 946,
    borderColor: "#00ca72",
    src: "/images/features/webhooks-and-api/logo-monday.svg",
    imgWidth: 51.864,
    imgHeight: 31.244,
    alt: "monday.com",
  },
] as const;

function TasksFlow() {
  return (
    <>
      <svg
        width={1280}
        height={879}
        viewBox="0 0 1280 879"
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {/* Trunk: Comment Added bottom-mid → cross bar */}
        <path d="M 1009,290 V 466" stroke="#7c5dff" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
        {/* Cross bar across all 4 hub centers */}
        <path d="M 375,466 H 1006" stroke="#7c5dff" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
        {/* Drops to each hub — color-matched to each hub's border */}
        <path d="M 375,466 V 566" stroke="#ffab24" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
        <path d="M 585,466 V 566" stroke="#ff6624" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
        <path d="M 797,466 V 566" stroke="#ecffff" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
        <path d="M 1006,466 V 566" stroke="#00ca72" strokeWidth={2} strokeDasharray="6 6" fill="none" strokeLinecap="round" />
      </svg>

      <CommentPill left={838} top={207} width={341} label="Comment Added" />

      {TASK_HUBS.map((h) => (
        <LogoHub
          key={h.key}
          left={h.left}
          top={566}
          borderColor={h.borderColor}
          src={h.src}
          imgWidth={h.imgWidth}
          imgHeight={h.imgHeight}
          alt={h.alt}
          rounded={"rounded" in h ? h.rounded : false}
        />
      ))}
    </>
  );
}

// Circular brand-logo container — matches the shell from Figma nodes
// 177:42764 / 177:42770 / 177:42773 / 177:42777. 120×120 with a 3.2px brand
// border, subtle white→gray vertical gradient fill, and a centered logo.
function LogoHub({
  left,
  top,
  borderColor,
  src,
  imgWidth,
  imgHeight,
  alt,
  rounded,
}: {
  left: number;
  top: number;
  borderColor: string;
  src: string;
  imgWidth: number;
  imgHeight: number;
  alt: string;
  rounded?: boolean;
}) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left,
        top,
        width: 120,
        height: 120,
        borderRadius: 98.4,
        border: `3.2px solid ${borderColor}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(153,153,153,0.06) 100%)",
        backdropFilter: "blur(4.8px)",
        WebkitBackdropFilter: "blur(4.8px)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: imgWidth,
          height: imgHeight,
          display: "block",
          borderRadius: rounded ? 96 : 0,
          objectFit: rounded ? "cover" : "contain",
        }}
      />
    </div>
  );
}

// ----- Body: Zapier -----

function ZapierBody() {
  return (
    <>
      <h2
        className="absolute font-urbanist"
        style={{
          left: 47,
          top: 135,
          width: 487,
          fontSize: 70,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-2.1px",
          color: "#fff",
          margin: 0,
        }}
      >
        Connect Zapier to embed your automations
      </h2>

      <ZapierFlow />
    </>
  );
}

// Layout in panel coordinates from Figma node 177:42785.
// 3 small icon-boxes stacked at x=251 (panel-relative), y=435/533/631, 80×80.
// Zapier wordmark pill at (611, 527), w=214, h=88.8. Automate pill at
// (823, 187), w=201, h=66. Line 390 horizontal at y=573 (middle icon ↔
// zapier pill). Vector 461 curves from zapier pill up to the Automate pill.
function ZapierFlow() {
  // Right edge of small icons = 251 + 80 = 331.
  // Zapier pill left = 611, vertical center = 527 + 88.8/2 ≈ 571.
  // Zapier pill right = 825. Automate pill bottom-mid ≈ (923, 253).
  return (
    <>
      <svg
        width={1280}
        height={879}
        viewBox="0 0 1280 879"
        aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {/* Top (Slack, faded) icon → zapier — curve into top of pill */}
        <path
          d="M 331,475 C 470,475 470,548 611,548"
          stroke="#7c5dff"
          strokeOpacity={0.4}
          strokeWidth={2}
          strokeDasharray="6 6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Middle (yellow bolt) icon → zapier — Line 390, straight bright */}
        <path
          d="M 331,573 H 611"
          stroke="#FFCD2E"
          strokeWidth={2}
          strokeDasharray="6 6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Bottom (Asana, faded) icon → zapier — curve into bottom of pill */}
        <path
          d="M 331,671 C 470,671 470,594 611,594"
          stroke="#ee392c"
          strokeOpacity={0.4}
          strokeWidth={2}
          strokeDasharray="6 6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Zapier pill → Automate pill — curved sweep up-right */}
        <path
          d="M 825,560 C 1080,560 1080,253 950,253"
          stroke="#FFCD2E"
          strokeWidth={2}
          strokeDasharray="6 6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Connector dot at the end of the zapier→Automate curve */}
        <circle cx={950} cy={253} r={6} fill="#FFCD2E" />
        {/* Connector dot at the curve's right apex */}
        <circle cx={1024} cy={359} r={5} fill="#fff" fillOpacity={0.85} />
      </svg>

      <SmallIconBox left={251} top={435} faded>
        {/* Faded Slack mark — same composition as the larger SlackBrandIcon */}
        <SlackBrandIcon size={32} />
      </SmallIconBox>
      <SmallIconBox left={251} top={533}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/features/webhooks-and-api/icon-tabler-bolt-yellow.svg"
          alt=""
          aria-hidden
          style={{ width: 32, height: 32, display: "block" }}
        />
      </SmallIconBox>
      <SmallIconBox left={251} top={631} faded>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/features/webhooks-and-api/icon-asana-small.jpeg"
          alt=""
          aria-hidden
          style={{ width: 32, height: 32, borderRadius: 49.231, objectFit: "cover", display: "block" }}
        />
      </SmallIconBox>

      <ZapierWordmarkPill left={611} top={527} />
      <AutomatePill left={823} top={187} />
    </>
  );
}

// 80×80 frosted-glass box with a centered icon. Used for the 3 surrounding
// app icons on the Zapier tab. `faded` applies the design's opacity-50 dim.
function SmallIconBox({
  left,
  top,
  faded,
  children,
}: {
  left: number;
  top: number;
  faded?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left,
        top,
        width: 80,
        height: 80,
        padding: 24,
        borderRadius: 24,
        background: PILL_BG_TRANSFORM,
        backdropFilter: "blur(4.5px)",
        WebkitBackdropFilter: "blur(4.5px)",
        boxShadow: "0 12px 22.5px rgba(0,0,0,0.25)",
        opacity: faded ? 0.5 : 1,
      }}
    >
      {children}
    </div>
  );
}

// Frosted-glass pill containing the centered Zapier orange wordmark. Mirrors
// Figma node 177:43549.
function ZapierWordmarkPill({ left, top }: { left: number; top: number }) {
  return (
    <div
      className="absolute flex flex-col items-center justify-center"
      style={{
        left,
        top,
        width: 214,
        height: 88.8,
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 24,
        paddingBottom: 24,
        borderRadius: 24,
        background: PILL_BG_TRANSFORM,
        backdropFilter: "blur(4.5px)",
        WebkitBackdropFilter: "blur(4.5px)",
        boxShadow: "0 12px 22.5px rgba(0,0,0,0.25)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/features/webhooks-and-api/logo-zapier-wordmark.svg"
        alt="Zapier"
        style={{ width: 150, height: 40.8, display: "block" }}
      />
    </div>
  );
}

// White-lavender pill with a 32×32 purple bolt icon (no icon-square) and
// "Automate" text. Mirrors Figma node 177:43583.
function AutomatePill({ left, top }: { left: number; top: number }) {
  return (
    <div
      className="absolute font-urbanist flex items-center"
      style={{
        left,
        top,
        width: 201,
        height: 66,
        paddingLeft: 16,
        paddingRight: 20,
        paddingTop: 16,
        paddingBottom: 16,
        gap: 12,
        borderRadius: 24,
        background: PILL_BG_LIGHT,
        boxShadow: "0 12px 22.5px rgba(0,0,0,0.25)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/features/webhooks-and-api/icon-tabler-bolt-purple.svg"
        alt=""
        aria-hidden
        style={{ width: 32, height: 32, display: "block", flexShrink: 0 }}
      />
      <span
        style={{
          color: "#000",
          fontWeight: 700,
          fontSize: 28,
          lineHeight: 1.2,
          letterSpacing: "-0.84px",
          whiteSpace: "nowrap",
        }}
      >
        Automate
      </span>
    </div>
  );
}

// ----- Body: placeholder for non-implemented tabs -----

function ComingSoonBody() {
  return (
    <div
      className="absolute flex flex-col items-center justify-center"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        gap: 16,
        textAlign: "center",
      }}
    >
      <p
        className="font-urbanist font-semibold"
        style={{
          color: "#fff",
          fontSize: 48,
          lineHeight: 1.2,
          letterSpacing: "-1.44px",
          margin: 0,
        }}
      >
        Coming soon
      </p>
      <p
        className="font-urbanist"
        style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: 20,
          lineHeight: 1.4,
          margin: 0,
          maxWidth: 520,
        }}
      >
        This integration's flow visualization is shipping next.
      </p>
    </div>
  );
}

// ----- Background dot grid -----

function DotGrid() {
  const cols = Math.ceil(1280 / 38) + 2;
  const rows = Math.ceil(879 / 38) + 2;
  const dots: { cx: number; cy: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const odd = r % 2 === 1;
      dots.push({ cx: c * 38 + (odd ? 19 : 0), cy: r * 38 });
    }
  }
  return (
    <svg
      aria-hidden
      width={1280}
      height={879}
      viewBox="0 0 1280 879"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={3} fill="rgba(255,255,255,0.05)" />
      ))}
    </svg>
  );
}

// ----- Slack mark -----

// Slack mark — composed from the 4 quadrant SVG assets shipped at
// /public/images/home/icon-slack-{tl,tr,bl,br}.svg. Quadrant proportions
// (tile = 11.355, offset = 12.64 inside a 24px box) lifted from Figma node
// 177:40370. Scales with the `size` prop.
function SlackBrandIcon({ size = 24 }: { size?: number }) {
  const tile = size * (11.355 / 24);
  const offset = size * (12.64 / 24);
  const tiles = [
    { src: "/images/home/icon-slack-tl.svg", left: 0, top: 0 },
    { src: "/images/home/icon-slack-tr.svg", left: offset, top: 0 },
    { src: "/images/home/icon-slack-bl.svg", left: 0, top: offset },
    { src: "/images/home/icon-slack-br.svg", left: offset, top: offset },
  ];
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden>
      {tiles.map((t) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={t.src}
          src={t.src}
          alt=""
          className="absolute block"
          style={{ left: t.left, top: t.top, width: tile, height: tile }}
        />
      ))}
    </div>
  );
}
