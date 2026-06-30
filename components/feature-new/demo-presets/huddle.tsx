import type { ReactNode } from "react";

import { AvatarStack, DarkPanel, NotifItem } from "../demos";
import type { AvatarUser } from "../demos";
import { AiNativeBoard } from "./ai-board";
import { ComplianceBoard } from "./compliance-board";
import { DigitalSalesRoom } from "./digital-sales-room";
import { FintechBoard } from "./fintech-board";
import { LegalBoard } from "./legal-board";
import { OperationsBoard } from "./ops-board";
import { Av, Composer, FACES, Frame, IconArrowRight, IconBubble, IconCheck, IconX, Presence } from "./hero-surface";
import type { PresenceUser } from "./hero-surface";

import "./huddle-showcase.css";

// Simulated-UI demo nodes for the /new-features/huddle page. Keys match
// components/feature-new/demo-presets/huddle.keys.ts; the matching record is
// merged into the registry in demo-registry.tsx. Visuals are simulated, not
// live SDK instances: huddle never opens a real audio/video/screen channel
// here, and agents are shown in presence only (they do not join the call).

// Aligned with the home + comments artifacts: editorial --vlp-* design tokens
// (ink #26251e, accent #f54e00) rather than the legacy teal/orange palette.
const LINE = "1px solid var(--vlp-border-default)";
const SURFACE_BG = "var(--vlp-bg-card)";
const BRAND = "var(--vlp-color-accent)";
const INK = "var(--vlp-color-ink)";

// Huddle-page personas mapped to shared headshots.
const FACE = {
  maya: FACES.fenne,
  sarah: FACES.hope,
  ethan: FACES.ethan,
  jordan: FACES.roman,
} as const;

const CALL_TEAM: AvatarUser[] = [
  { initials: "MA", kind: "human", name: "Maya" },
  { initials: "SR", kind: "human", name: "Sarah" },
];

const REVIEW_TEAM: AvatarUser[] = [
  { initials: "MA", kind: "human", name: "Maya" },
  { initials: "SR", kind: "human", name: "Sarah" },
  { initials: "JD", kind: "human", name: "Jordan" },
  { initials: "CC", kind: "agent", name: "Clause Checker" },
];

// Avatar stack shown in the hero document top bar (everyone on the doc).
const HERO_PRESENCE: PresenceUser[] = [
  { initials: "MA", tone: "a2", img: FACE.maya },
  { initials: "ET", tone: "a1", img: FACE.ethan },
  { initials: "JD", tone: "a4", img: FACE.jordan },
  { initials: "SR", tone: "a3", img: FACE.sarah },
];

/**
 * A framed "document" surface used to host huddle scenes.
 * @param {{ children: ReactNode }} props Surface content.
 * @returns {JSX.Element} Document surface.
 */
function DocSurface({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: LINE,
        borderRadius: 12,
        background: SURFACE_BG,
        padding: 16,
        position: "relative",
        minHeight: 96,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Pill-shaped live huddle bar: a LIVE marker, the participant avatar row, and
 * a channel label (audio / video / screen).
 * @param {{ users: AvatarUser[]; channel?: string }} props Bar content.
 * @returns {JSX.Element} Huddle bar.
 */
function HuddleBar({ users, channel }: { users: AvatarUser[]; channel?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 12px",
        border: LINE,
        borderRadius: 999,
        background: SURFACE_BG,
        width: "fit-content",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 0.6,
          color: BRAND,
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: BRAND, display: "inline-block" }} />
        LIVE
      </span>
      <AvatarStack users={users} />
      {channel ? <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.62, color: INK }}>{channel}</span> : null}
    </div>
  );
}

/** @returns {JSX.Element} Microphone SVG glyph. */
function IconMic() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5.5" y="1.5" width="5" height="8" rx="2.5" />
      <path d="M3 8a5 5 0 0 0 10 0" />
      <line x1="8" y1="13" x2="8" y2="15" />
      <line x1="5.5" y1="15" x2="10.5" y2="15" />
    </svg>
  );
}

/** @returns {JSX.Element} Camera SVG glyph. */
function IconCam() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.5" y="4.5" width="9" height="7" rx="1.5" />
      <path d="M10.5 7l4-2v6l-4-2" />
    </svg>
  );
}

/** @returns {JSX.Element} Screen-share monitor SVG glyph. */
function IconScreen() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="9" rx="1.5" />
      <path d="M5.5 14.5h5M8 11.5v3" />
    </svg>
  );
}

/** @returns {JSX.Element} Muted-microphone SVG glyph (slash through the mic). */
function IconMicOff() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.5 6V4a2.5 2.5 0 0 0-4.8-1" />
      <path d="M5.5 6.5V7a2.5 2.5 0 0 0 3.6 2.25" />
      <path d="M3 8a5 5 0 0 0 6.5 4.78M13 8a5 5 0 0 1-.4 1.95" />
      <line x1="8" y1="13" x2="8" y2="15" />
      <line x1="2" y1="2" x2="14" y2="14" />
    </svg>
  );
}

/** @returns {JSX.Element} Group / participants SVG glyph for the presence header. */
function IconRoom() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5M17 14.2A6 6 0 0 1 21 20" />
    </svg>
  );
}

/** @returns {JSX.Element} Bolt SVG glyph for the instant, no-link header. */
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
    </svg>
  );
}

/** @returns {JSX.Element} Clock SVG glyph for the ephemeral-chat note. */
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/** @returns {JSX.Element} Pinned-document SVG glyph for the scoped-to-doc header. */
function IconDocPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M19 12V7l-5-4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5" />
      <circle cx="17" cy="17" r="3" />
      <path d="M17 20v2" />
    </svg>
  );
}

/** @returns {JSX.Element} Solid play triangle for the recording related teaser. */
function IconPlay() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5 13 8 4 13.5 Z" />
    </svg>
  );
}

/** @returns {JSX.Element} Headphone glyph with a small signal mark for the huddle panel header. */
function IconHeadphones() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4.5" height="7" rx="1.6" />
      <rect x="16.5" y="13" width="4.5" height="7" rx="1.6" />
    </svg>
  );
}

/** @returns {JSX.Element} Person-with-plus glyph for the invite control. */
function IconUserPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.4" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M18 8v6M21 11h-6" />
    </svg>
  );
}

/** @returns {JSX.Element} Vertical three-dot kebab glyph. */
function IconKebab() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="12" cy="19" r="1.7" />
    </svg>
  );
}

/** @returns {JSX.Element} Filled phone glyph for the Leave button. */
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.57 3.5.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1c0 1.2.2 2.4.57 3.5a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

/** @returns {JSX.Element} Chain-link glyph for the Huddle Link button. */
function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a4 4 0 0 0 5.66 0l2.83-2.83a4 4 0 0 0-5.66-5.66L11.5 5.9" />
      <path d="M14 11a4 4 0 0 0-5.66 0L5.5 13.83a4 4 0 0 0 5.66 5.66L12.5 18.1" />
    </svg>
  );
}

/** @returns {JSX.Element} Camera glyph with a slash (camera off). */
function IconCamOff() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.5 6.5V5a1 1 0 0 0-1-1H4.2" />
      <path d="M2 5.6V11a1 1 0 0 0 1 1h6.5" />
      <path d="M10.5 8.5 14.5 6v6l-2.3-1.15" />
      <line x1="2" y1="2" x2="14" y2="14" />
    </svg>
  );
}

/** @returns {JSX.Element} Monitor glyph with a slash (screen-share off). */
function IconScreenOff() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1.5 3.2v6.3a1 1 0 0 0 1 1h9" />
      <path d="M14.5 9.4V3.5a1 1 0 0 0-1-1H5.2" />
      <path d="M5.5 14.5h5M8 11.5v3" />
      <line x1="1.5" y1="1.5" x2="14.5" y2="14.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Cursor / pointer glyph for the Follow-mode round button. */
function IconPointer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3l6 18 2.4-7.6L21 11 5 3z" />
    </svg>
  );
}

/** @returns {JSX.Element} Plus glyph for invite rows. */
function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/**
 * Top-bar right cluster for hero document frames: a headphone "N in huddle"
 * badge (when count is set) alongside the live presence stack.
 * @param {{ count?: number }} props Optional in-huddle participant count.
 * @returns {JSX.Element} The frame's right-side cluster.
 */
function HeroBarRight({ count }: { count?: number }) {
  return (
    <span className="hud-hero-bar-right">
      {typeof count === "number" ? (
        <span className="hud-hero-hbadge"><IconHeadphones />{count}</span>
      ) : null}
      <Presence users={HERO_PRESENCE} />
    </span>
  );
}

/**
 * Document stage: skeleton body lines with one accent-highlighted line, used as
 * the surface the floating huddle popup and a live cursor sit over. The popup is
 * absolutely positioned, so `minHeight` reserves room for it (the frame clips
 * overflow).
 * @param {{ children?: ReactNode; cursor?: ReactNode; minHeight?: number }} props Floating overlay, optional cursor, and reserved stage height.
 * @returns {JSX.Element} The document stage.
 */
function DocStage({ children, cursor, minHeight = 290 }: { children?: ReactNode; cursor?: ReactNode; minHeight?: number }) {
  const widths = ["62%", "84%", "73%", "80%", null, "78%", "66%", "82%", "48%"];
  return (
    <div className="hud-hero-doc" style={{ minHeight }}>
      {widths.map((width, index) =>
        width === null ? (
          <span key="hl" className="hud-hero-sk hud-hero-sk--hl" />
        ) : (
          <span key={index} className="hud-hero-sk" style={{ width }} />
        ),
      )}
      {cursor}
      {children}
    </div>
  );
}

/** @returns {JSX.Element} A teal "Sean" live cursor for the document stage. */
function SeanCursor() {
  return (
    <div className="hud-hero-cur">
      <svg className="hud-hero-cur-ptr" viewBox="0 0 14 18" fill="none" aria-hidden="true">
        <path d="M1 1.5l11 5.5-5.5 1.5L5 15 1 1.5z" fill="#10b981" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span className="hud-hero-cur-name">Sean</span>
    </div>
  );
}

/**
 * The live in-call huddle popup (light theme): a headphone header with invite +
 * kebab controls, a participant roster (your muted controls, others' live
 * waveforms), and a Leave button with a Follow-mode control.
 * @returns {JSX.Element} The roster popup.
 */
function HuddleRosterPanel() {
  return (
    <div className="hud-hero-panel">
      <div className="hud-hero-phead">
        <span className="hud-hero-phones"><IconHeadphones /></span>
        <span className="hud-hero-ptitle">3 people in Huddle</span>
        <span className="hud-hero-pinvite" aria-label="Invite"><IconUserPlus /></span>
        <span className="hud-hero-pkebab" aria-hidden="true"><IconKebab /></span>
      </div>
      <div className="hud-hero-prows">
        <div className="hud-hero-prow">
          <span className="hud-hero-pava hud-hero-pava--purple"><Av initials="YO" tone="a4" img={FACE.maya} /></span>
          <span className="hud-hero-pname">You</span>
          <span className="hud-hero-pctrls">
            <span className="hud-hero-pctrl hud-hero-pctrl--off" aria-label="Mic off"><IconMicOff /></span>
            <span className="hud-hero-pctrl hud-hero-pctrl--off" aria-label="Camera off"><IconCamOff /></span>
            <span className="hud-hero-pctrl hud-hero-pctrl--off" aria-label="Screen off"><IconScreenOff /></span>
          </span>
        </div>
        <div className="hud-hero-prow">
          <span className="hud-hero-pava hud-hero-pava--gold"><Av initials="LI" tone="a2" img={FACE.sarah} /></span>
          <span className="hud-hero-pname">Linda</span>
          <span className="hud-wave hud-wave--gold" aria-hidden="true"><i /><i /><i /><i /><i /></span>
        </div>
        <div className="hud-hero-prow">
          <span className="hud-hero-pava hud-hero-pava--green"><Av initials="M" tone="a3" /></span>
          <span className="hud-hero-pname">mihir@velt.dev</span>
          <span className="hud-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
        </div>
      </div>
      <div className="hud-hero-pfoot">
        <span className="hud-hero-leave"><IconPhone />LEAVE</span>
        <span className="hud-hero-follow" aria-label="Follow"><IconPointer /></span>
      </div>
    </div>
  );
}

/**
 * A single contact row inside the invite popup.
 * @param {{ img: string; name: string; invited?: boolean }} props Headshot, name, and invited state.
 * @returns {JSX.Element} The invite row.
 */
function InviteRow({ img, name, invited }: { img: string; name: string; invited?: boolean }) {
  return (
    <div className="hud-hero-irow">
      <span className="av-c av-photo hud-hero-iava" style={{ backgroundImage: `url(${img})` }} role="img" aria-label={name} />
      <span className="hud-hero-iname">{name}</span>
      {invited ? (
        <span className="hud-hero-iinvited">Invited</span>
      ) : (
        <span className="hud-hero-iplus" aria-label={`Add ${name}`}><IconPlus /></span>
      )}
    </div>
  );
}

/**
 * The invite popup (dark theme): pull existing contacts into the huddle, or
 * share a huddle link — the start-of-huddle "bring people in" surface.
 * @returns {JSX.Element} The invite popup.
 */
function InvitePanel() {
  return (
    <div className="hud-hero-invite">
      <div className="hud-hero-ihead">
        <span className="hud-hero-iphones"><IconHeadphones /></span>
        <span className="hud-hero-ititle">2 people in Huddle</span>
        <span className="hud-hero-iadd" aria-label="Add people"><IconUserPlus /></span>
        <span className="hud-hero-ikebab" aria-hidden="true"><IconKebab /></span>
      </div>
      <div className="hud-hero-isearch">
        <span className="hud-hero-icaret" aria-hidden="true" />
        Select a contact or invite
      </div>
      <div className="hud-hero-ilist">
        <InviteRow img={FACE.ethan} name="Ben" />
        <InviteRow img={FACES.roman} name="Vivek" invited />
        <InviteRow img={FACES.hope} name="Emma" />
        <InviteRow img={FACES.jeff} name="Rakesh" />
      </div>
      <div className="hud-hero-ifoot">
        <span className="hud-hero-ilink"><IconLink />Huddle Link</span>
        <span className="hud-hero-iinvite">Invite</span>
      </div>
    </div>
  );
}

export const HUDDLE_DEMOS: Record<string, ReactNode> = {
  "huddle/hero/start": (
    <Frame
      app="HD"
      crumb={<><b>Contract</b></>}
      right={<HeroBarRight count={2} />}
    >
      <DocStage cursor={<SeanCursor />} minHeight={414}>
        <InvitePanel />
      </DocStage>
      <p className="code-microcopy">one click starts it — pull teammates in or share a link</p>
    </Frame>
  ),

  "huddle/hero/join": (
    <Frame
      app="HD"
      crumb={<><b>Contract</b></>}
      right={<HeroBarRight count={3} />}
    >
      <DocStage cursor={<SeanCursor />}>
        <HuddleRosterPanel />
      </DocStage>
      <p className="code-microcopy">teammates in the doc see the live huddle and join in place</p>
    </Frame>
  ),

  "huddle/hero/share": (
    <Frame
      app="HD"
      crumb={<><b>Contract</b> <span className="sep">/</span> screen sharing</>}
      right={<HeroBarRight count={3} />}
    >
      <div className="hud-hero-share">
        <div className="hud-hero-screen">
          <div className="hud-hero-screen-top">
            <span className="hud-hero-screen-dot" />
            <span className="hud-hero-screen-dot" />
            <span className="hud-hero-screen-dot" />
            <span className="hud-hero-screen-title">contract.md</span>
            <span className="hud-hero-screen-live"><i />SHARING</span>
          </div>
          <div className="hud-hero-screen-body">
            <p className="cmh-doc" style={{ margin: 0 }}>
              7.2 The vendor rate shall not exceed <span className="cmh-mark">12% of base contract value</span> per annum.
            </p>
            <span className="hud-hero-sk" style={{ width: "72%" }} />
            <span className="hud-hero-sk" style={{ width: "54%" }} />
          </div>
        </div>

        <div className="hud-hero-share-strip">
          <span className="hud-hero-share-by">
            <span className="hud-hero-pava hud-hero-pava--green"><Av initials="LI" tone="a3" img={FACE.sarah} /></span>
            Linda is sharing
          </span>
          <span className="hud-hero-share-ctrls">
            <span className="hud-hero-pctrl" aria-label="Mic"><IconMic /></span>
            <span className="hud-hero-pctrl" aria-label="Camera"><IconCam /></span>
            <span className="hud-hero-pctrl hud-hero-pctrl--on" aria-label="Sharing screen"><IconScreen /></span>
          </span>
        </div>
      </div>

      <p className="code-microcopy">any participant shares their screen, right in the doc</p>
    </Frame>
  ),

  "huddle/hero/decide": (
    <Frame
      app="HD"
      crumb={<><b>Contract</b> <span className="sep">/</span> decision captured</>}
      right={<HeroBarRight />}
    >
      {/* AI-generated summary card */}
      <div
        style={{
          border: LINE,
          borderRadius: 12,
          background: "var(--vlp-bg-section-alt)",
          padding: "12px 14px",
          display: "grid",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Av initials="NA" agent />
          <span style={{ fontSize: 12, fontWeight: 700, color: INK }}>Notetaker</span>
          <span className="chip chip-agent" style={{ fontSize: 10 }}>agent</span>
          <span className="cmh-when">just now</span>
        </div>
        <p style={{ margin: 0, fontSize: 12.5, fontWeight: 600, color: INK }}>Huddle summary: Clause 7 review</p>
        <div style={{ display: "grid", gap: 5 }}>
          {[
            "Agreed: vendor rate corrected to 9%, not 12%",
            "Maya to update contract and re-send",
            "Sarah to confirm counterparty acceptance",
          ].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12, color: "var(--vlp-color-ink-soft)" }}>
              <span style={{ color: "var(--vlp-color-green-approval)", marginTop: 1 }}><IconCheck /></span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Human confirming */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Av initials="MA" tone="a2" img={FACE.maya} />
        <span style={{ fontSize: 12.5, color: INK, flex: 1 }}>Looks right: marking clause 7 approved.</span>
        <span className="chip chip-approved">resolved</span>
      </div>

      <Composer placeholder="Add a follow-up…" you={FACE.sarah} />
    </Frame>
  ),

  "huddle/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <AvatarStack users={REVIEW_TEAM} />
      <DocSurface>
        <NotifItem
          avatar={{ initials: "CC", kind: "agent", name: "Clause Checker" }}
          title={<><strong>Clause 7</strong>: vendor rate is 12% over the contracted schedule</>}
          chip={{ label: "agent", kind: "agent" }}
          actions
        />
        <div style={{ marginTop: 12 }}>
          <HuddleBar users={CALL_TEAM} channel="screen on clause 7" />
        </div>
      </DocSurface>
      <p className="code-microcopy">agent flags · humans huddle and talk it out · Approve closes it (agents never join the call)</p>
    </div>
  ),

  "huddle/showcase/audio": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconMic />
          Voice huddle
          <span className="cmh-cc-pill">live · audio</span>
        </div>
        <div className="cmh-cc-body">
          <div className="hud-voice">
            <div className="hud-voice-tile">
              <span className="hud-voice-ring hud-voice-ring--live">
                <Av initials="MA" tone="a2" img={FACE.maya} />
                <span className="hud-voice-mic hud-voice-mic--on"><IconMic /></span>
              </span>
              <span className="hud-voice-meta">
                <span className="hud-voice-name">Maya</span>
                <span className="hud-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
              </span>
            </div>
            <div className="hud-voice-tile">
              <span className="hud-voice-ring">
                <Av initials="SR" tone="a3" img={FACE.sarah} />
                <span className="hud-voice-mic hud-voice-mic--off"><IconMicOff /></span>
              </span>
              <span className="hud-voice-meta">
                <span className="hud-voice-name">Sarah</span>
                <span className="hud-voice-sub">listening</span>
              </span>
            </div>
            <div className="hud-voice-tile">
              <span className="hud-voice-ring">
                <Av initials="NA" agent />
              </span>
              <span className="hud-voice-meta">
                <span className="hud-voice-name">Notetaker</span>
                <span className="hud-voice-sub">capturing</span>
              </span>
            </div>
          </div>
          <p className="code-microcopy">one click opens a live voice channel on the document</p>
        </div>
      </div>
    </div>
  ),

  "huddle/showcase/video": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--plum">
          <IconCam />
          Video huddle
          <span className="cmh-cc-pill">2 on</span>
        </div>
        <div className="cmh-cc-body">
          <div className="hud-grid">
            <div className="hud-tile hud-tile--live" style={{ backgroundImage: `url(${FACE.maya})` }}>
              <span className="hud-tile-cam"><IconCam /></span>
              <span className="hud-tile-tag">Maya</span>
            </div>
            <div className="hud-tile" style={{ backgroundImage: `url(${FACE.sarah})` }}>
              <span className="hud-tile-cam"><IconCam /></span>
              <span className="hud-tile-tag">Sarah</span>
            </div>
          </div>
          <p className="code-microcopy">faces on, still inside the document</p>
        </div>
      </div>
    </div>
  ),

  "huddle/showcase/screen-share": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--teal">
          <IconScreen />
          Screen share
          <span className="cmh-cc-pill">live</span>
        </div>
        <div className="cmh-cc-body">
          <div className="hud-screen">
            <div className="hud-screen-top">
              <span className="hud-screen-dot" />
              <span className="hud-screen-dot" />
              <span className="hud-screen-dot" />
              <span className="hud-screen-title">contract.md</span>
              <span className="hud-screen-share"><i />SHARING</span>
            </div>
            <div className="hud-screen-doc">
              <p className="cmh-doc">
                7.2 The vendor rate shall not exceed <span className="cmh-mark">12% of base contract value</span>.
              </p>
              <div className="sk" style={{ width: "72%" }} />
              <div className="sk" style={{ width: "54%" }} />
            </div>
          </div>
          <span className="hud-screen-by">
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            Sarah is sharing
          </span>
        </div>
      </div>
    </div>
  ),

  "huddle/showcase/no-link": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--ink">
          <IconBolt />
          No link, no invite
          <span className="cmh-cc-pill">one click</span>
        </div>
        <div className="cmh-cc-body">
          <div className="hud-instant">
            <span className="hud-instant-btn"><i />Start huddle</span>
            <span className="hud-instant-arrow"><IconArrowRight /></span>
            <span className="hud-instant-live">
              <span className="hud-stack">
                <Av initials="MA" tone="a2" img={FACE.maya} />
                <Av initials="SR" tone="a3" img={FACE.sarah} />
              </span>
              everyone in the doc is in
            </span>
          </div>
          <div className="hud-nope">
            <span className="hud-nope-pill"><IconX /><span>meeting link</span></span>
            <span className="hud-nope-pill"><IconX /><span>calendar invite</span></span>
            <span className="hud-nope-pill"><IconX /><span>join URL</span></span>
          </div>
        </div>
      </div>
    </div>
  ),

  "huddle/showcase/scoped": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--slate">
          <IconDocPin />
          Scoped to the doc
          <span className="cmh-cc-pill">every event</span>
        </div>
        <div className="cmh-cc-body apf-gov-body">
          <div className="apf-gov-row">
            <span className="apf-gov-key">notificationSource</span>
            <span className="chip chip-agent">huddle</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">documentId</span>
            <span className="apf-gov-val">contract-114</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">pageInfo.page</span>
            <span className="apf-gov-val">clause-7</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">participants</span>
            <span className="apf-gov-stack">
              <Av initials="MA" tone="a2" img={FACE.maya} />
              <Av initials="SR" tone="a3" img={FACE.sarah} />
              <span className="apf-gov-count">2</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  "huddle/showcase/presence": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--purple">
          <IconRoom />
          In the room
          <span className="cmh-cc-pill">3 here</span>
        </div>
        <div className="cmh-cc-body">
          <div className="hud-roster">
            <div className="hud-person hud-person--live">
              <Av initials="MA" tone="a2" img={FACE.maya} />
              <span className="hud-person-main">
                <span className="hud-person-name">Maya</span>
                <span className="hud-person-sub">speaking</span>
              </span>
              <span className="hud-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
            </div>
            <div className="hud-person hud-person--live">
              <Av initials="SR" tone="a3" img={FACE.sarah} />
              <span className="hud-person-main">
                <span className="hud-person-name">Sarah</span>
                <span className="hud-person-sub">speaking</span>
              </span>
              <span className="hud-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
            </div>
            <div className="hud-person">
              <Av initials="JD" tone="a4" img={FACE.jordan} />
              <span className="hud-person-main">
                <span className="hud-person-name">Jordan</span>
                <span className="hud-person-sub">listening</span>
              </span>
              <span className="hud-mute"><IconMicOff /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  "huddle/showcase/chat": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--navy">
          <IconBubble />
          Huddle chat
          <span className="cmh-cc-pill">ephemeral</span>
        </div>
        <div className="cmh-cc-body">
          <div className="hud-chat">
            <div className="cmh-cmt cmh-cmt--plain">
              <Av initials="MA" tone="a2" img={FACE.maya} />
              <div className="cmh-cmt-main">
                <div className="cmh-cmt-head">
                  <span className="cmh-cmt-name">Maya</span>
                  <span className="cmh-cmt-time">now</span>
                </div>
                <p className="cmh-cmt-body">Corrected rate: 9% - see footnote 4</p>
              </div>
            </div>
            <div className="cmh-cmt cmh-cmt--plain">
              <Av initials="SR" tone="a3" img={FACE.sarah} />
              <div className="cmh-cmt-main">
                <div className="cmh-cmt-head">
                  <span className="cmh-cmt-name">Sarah</span>
                  <span className="cmh-cmt-time">now</span>
                </div>
                <p className="cmh-cmt-body">Dropping the doc link without talking over you</p>
              </div>
            </div>
            <p className="hud-chat-note"><IconClock />clears when the huddle ends · toggle by prop or API</p>
          </div>
        </div>
      </div>
    </div>
  ),

  "huddle/showcase/webhooks": (
    <div className="pv">
      <DarkPanel footer="fires on huddle created and joined">{"POST /your-endpoint\n{ \"actionType\": \"joined\",\n  \"notificationSource\": \"huddle\",\n  \"actionUser\": { \"email\": \"maya@acme.com\" },\n  \"metadata\": { \"documentId\": \"contract-114\" } }"}</DarkPanel>
    </div>
  ),

  "huddle/make-it-yours/look": (
    <div className="pv hud-look">
      <div className="hud-look-room">
        <div className="hud-look-stage">
          <div className="hud-look-tile">
            <span className="hud-look-ring hud-look-ring--live">
              <Av initials="MA" tone="a2" img={FACE.maya} />
              <span className="hud-look-badge hud-look-badge--on"><IconMic /></span>
            </span>
            <span className="hud-look-name">Maya</span>
            <span className="hud-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          </div>
          <div className="hud-look-tile">
            <span className="hud-look-ring">
              <Av initials="SR" tone="a3" img={FACE.sarah} />
              <span className="hud-look-badge hud-look-badge--off"><IconMicOff /></span>
            </span>
            <span className="hud-look-name">Sarah</span>
            <span className="hud-look-sub">muted</span>
          </div>
          <div className="hud-look-tile">
            <span className="hud-look-ring">
              <Av initials="NA" agent />
            </span>
            <span className="hud-look-name">Notetaker</span>
            <span className="hud-look-sub">agent</span>
          </div>
        </div>
        <div className="hud-look-bar">
          <span className="hud-look-ctrl hud-look-ctrl--on" aria-label="Microphone"><IconMic /></span>
          <span className="hud-look-ctrl hud-look-ctrl--on" aria-label="Camera"><IconCam /></span>
          <span className="hud-look-ctrl" aria-label="Screen share"><IconScreen /></span>
          <span className="hud-look-bar-sp" aria-hidden="true" />
          <span className="hud-look-live"><i aria-hidden="true" />Live</span>
        </div>
      </div>
    </div>
  ),

  "huddle/make-it-yours/behavior": (
    <div className="pv">
      <div className="hud-cfg">
        <div className="apf-gov-body">
          <div className="apf-gov-row">
            <span className="apf-gov-key">type</span>
            <span className="hud-cfg-seg" aria-hidden="true">
              <span className="hud-cfg-opt hud-cfg-opt--on">audio</span>
              <span className="hud-cfg-opt hud-cfg-opt--on">video</span>
              <span className="hud-cfg-opt">screen</span>
            </span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">joinRule</span>
            <span className="chip chip-agent">request to join</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">scope</span>
            <span className="apf-gov-val">documentId</span>
          </div>
          <div className="apf-gov-row">
            <span className="apf-gov-key">serverFallback</span>
            <span className="chip chip-approved">on</span>
          </div>
        </div>
        <div className="apf-note">
          <span className="chip chip-agent">webhooks</span>
          <span>huddle.created · huddle.joined → your pipeline</span>
        </div>
      </div>
    </div>
  ),

  "huddle/in-production/sales": <DigitalSalesRoom />,

  "huddle/in-production/fintech": <FintechBoard />,

  "huddle/in-production/ops": <OperationsBoard />,

  "huddle/in-production/compliance": <ComplianceBoard />,

  "huddle/in-production/legal": <LegalBoard />,

  "huddle/in-production/ai": <AiNativeBoard />,

  "huddle/related/comments": (
    <div className="pv">
      <div className="hud-rel">
        <div className="hud-rel-cmt">
          <Av initials="MA" tone="a2" img={FACE.maya} />
          <div className="hud-rel-cmt-main">
            <span className="hud-rel-top">
              <span className="hud-rel-name">Maya</span>
              <span className="hud-rel-time">now</span>
            </span>
            <p className="hud-rel-line">Thread stalled: huddled to settle it</p>
            <span className="hud-rel-resolved"><IconCheck />decision back in the thread</span>
          </div>
        </div>
        <p className="hud-rel-cap">the thread stalls <IconArrowRight /> the huddle resolves it</p>
      </div>
    </div>
  ),

  "huddle/related/recording": (
    <div className="pv">
      <div className="hud-rel">
        <div className="hud-rel-rec">
          <span className="hud-rel-rec-play"><IconPlay /></span>
          <div className="hud-rel-rec-main">
            <span className="hud-rel-name">Recorded instead</span>
            <span className="hud-rel-rec-chips">
              <span className="hud-rel-chip">voice</span>
              <span className="hud-rel-chip">video</span>
              <span className="hud-rel-chip">screen</span>
            </span>
          </div>
          <span className="hud-rel-rec-dur">0:42</span>
        </div>
        <p className="hud-rel-cap">schedules don&apos;t line up <IconArrowRight /> record, pinned to the work</p>
      </div>
    </div>
  ),

  "huddle/related/presence": (
    <div className="pv">
      <div className="hud-rel">
        <div className="hud-rel-presence">
          <span className="hud-rel-stack">
            <Av initials="MA" tone="a2" img={FACE.maya} />
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            <Av initials="JD" tone="a4" img={FACE.jordan} />
          </span>
          <span className="hud-rel-talking">
            <span className="hud-wave" aria-hidden="true"><i /><i /><i /><i /><i /></span>
            2 talking
          </span>
        </div>
        <p className="hud-rel-cap">who is in the document <IconArrowRight /> who is already talking</p>
      </div>
    </div>
  ),
};
