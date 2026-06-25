import type { ReactNode } from "react";

import { AvatarStack, DarkPanel, NotifItem } from "../demos";
import type { AvatarUser } from "../demos";
import { Av, Composer, FACES, Frame, IconArrowRight, IconBubble, IconCheck, IconX } from "./hero-surface";
import type { PresenceUser } from "./hero-surface";

import "./huddle-showcase.css";

// Simulated-UI demo nodes for the /new-features/huddle page. Keys match
// components/feature-new/demo-presets/huddle.keys.ts; the matching record is
// merged into the registry in demo-registry.tsx. Visuals are simulated, not
// live SDK instances: huddle never opens a real audio/video/screen channel
// here, and agents are shown in presence only (they do not join the call).

const LINE = "1px solid var(--line, #e7e2d9)";
const SURFACE_BG = "var(--bg, #fff)";
const BRAND = "var(--brand, #ff4f00)";
const INK = "var(--ink, #0b353b)";

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

// Presence users for Frame headers — real faces + AI notetaker.
const HUDDLE_PRESENCE: PresenceUser[] = [
  { initials: "MA", tone: "a2", img: FACE.maya },
  { initials: "SR", tone: "a3", img: FACE.sarah },
  { initials: "NA", agent: true },
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

/**
 * A simulated screen-share tile inside a huddle.
 * @param {{ label: string }} props Tile label.
 * @returns {JSX.Element} Screen-share tile.
 */
function ShareTile({ label }: { label: string }) {
  return (
    <div
      style={{
        border: `1.5px dashed ${BRAND}`,
        borderRadius: 10,
        background: "color-mix(in srgb, var(--vlp-color-accent) 6%, transparent)",
        padding: "12px 14px",
        fontSize: 12,
        fontWeight: 600,
        color: INK,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.5, color: BRAND }}>SCREEN</span>
      {label}
    </div>
  );
}

/**
 * A single participant video tile with real face, name, and optional
 * speaking indicator ring.
 * @param {{ initials: string; name: string; img?: string; tone?: string; speaking?: boolean; agent?: boolean }} props Tile props.
 * @returns {JSX.Element} Participant tile.
 */
function ParticipantTile({
  initials,
  name,
  img,
  tone,
  speaking,
  agent,
}: {
  initials: string;
  name: string;
  img?: string;
  tone?: string;
  speaking?: boolean;
  agent?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
    >
      <div
        style={{
          padding: 3,
          borderRadius: "50%",
          border: speaking ? `2px solid var(--vlp-color-green-approval)` : "2px solid transparent",
          background: speaking ? "color-mix(in srgb, var(--vlp-color-green-approval) 12%, transparent)" : "transparent",
        }}
      >
        <Av initials={initials} tone={tone} img={img} agent={agent} />
      </div>
      <span style={{ fontSize: 10, fontWeight: 600, color: "var(--vlp-color-text-muted)" }}>{name}</span>
    </div>
  );
}

/**
 * Mic/cam toggle call-control button with icon glyph and active state.
 * @param {{ label: string; icon: ReactNode; active?: boolean }} props Control props.
 * @returns {JSX.Element} Call-control button.
 */
function CallCtrl({ label, icon, active = true }: { label: string; icon: ReactNode; active?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <span
        aria-label={label}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: active ? "var(--vlp-bg-wash)" : "var(--vlp-color-reject-soft)",
          border: `1px solid ${active ? "var(--vlp-border-default)" : "var(--vlp-color-reject)"}`,
          color: active ? "var(--vlp-color-ink)" : "var(--vlp-color-reject)",
        }}
      >
        {icon}
      </span>
      <span style={{ fontSize: 9.5, fontWeight: 600, color: "var(--vlp-color-text-subtle)" }}>{label}</span>
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

export const HUDDLE_DEMOS: Record<string, ReactNode> = {
  "huddle/hero/start": (
    <Frame
      app="HD"
      crumb={<><b>contract.md</b> <span className="sep">/</span> Clause 7 · vendor rate</>}
      users={[{ initials: "MA", tone: "a2", img: FACE.maya }, { initials: "SR", tone: "a3", img: FACE.sarah }]}
    >
      {/* Document excerpt */}
      <p className="cmh-doc">
        7.2 The vendor rate shall not exceed <span className="cmh-mark">12% of base contract value</span> per annum.
      </p>

      {/* Call-control bar */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          padding: "12px 14px",
          borderRadius: 14,
          background: "var(--vlp-bg-section-alt)",
          border: "1px solid var(--vlp-border-subtle)",
        }}
      >
        <CallCtrl label="Mic" icon={<IconMic />} active />
        <CallCtrl label="Cam" icon={<IconCam />} active />
        <CallCtrl label="Share" icon={<IconScreen />} active />
        <div style={{ flex: 1 }} />
        <button
          type="button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 12.5,
            fontWeight: 700,
            padding: "8px 16px",
            borderRadius: 999,
            border: "none",
            color: "#fff",
            background: "var(--vlp-color-accent)",
            cursor: "default",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
          Start huddle
        </button>
      </div>

      <p className="code-microcopy">one click — no link, no invite, no calendar</p>
    </Frame>
  ),

  "huddle/hero/join": (
    <Frame
      app="HD"
      crumb={<><b>contract.md</b> <span className="sep">/</span> huddle active</>}
      users={HUDDLE_PRESENCE}
    >
      {/* Participant tiles */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-end" }}>
        <ParticipantTile initials="MA" name="Maya" img={FACE.maya} tone="a2" speaking />
        <ParticipantTile initials="SR" name="Sarah" img={FACE.sarah} tone="a3" />
        <ParticipantTile initials="NA" name="Notetaker" agent />
      </div>

      {/* Live indicator pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <HuddleBar users={CALL_TEAM} channel="audio + video" />
        <span className="chip chip-agent" style={{ fontSize: 10 }}>AI notetaker</span>
      </div>

      <p className="code-microcopy">teammates in the doc see the live huddle and join in place</p>
    </Frame>
  ),

  "huddle/hero/share": (
    <Frame
      app="HD"
      crumb={<><b>contract.md</b> <span className="sep">/</span> screen sharing</>}
      users={HUDDLE_PRESENCE}
    >
      {/* Shared screen rectangle */}
      <div
        style={{
          border: `2px solid var(--vlp-color-accent)`,
          borderRadius: 10,
          background: "color-mix(in srgb, var(--vlp-color-accent) 5%, transparent)",
          padding: "14px 16px",
          display: "grid",
          gap: 6,
          position: "relative",
        }}
      >
        <span
          className="chip chip-agent"
          style={{
            position: "absolute",
            top: -11,
            left: 12,
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 0.5,
            background: "var(--vlp-color-accent)",
            color: "#fff",
          }}
        >
          ● SHARING
        </span>
        <p className="cmh-doc" style={{ margin: 0 }}>
          7.2 The vendor rate shall not exceed <span className="cmh-mark">12% of base contract value</span> per annum.
        </p>
        <div className="sk" style={{ width: "70%" }} />
        <div className="sk" style={{ width: "50%" }} />
      </div>

      {/* Overlaid participant strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <ParticipantTile initials="SR" name="Sarah (sharing)" img={FACE.sarah} tone="a3" speaking />
          <ParticipantTile initials="MA" name="Maya" img={FACE.maya} tone="a2" />
        </div>
        <HuddleBar users={CALL_TEAM} channel="screen" />
      </div>
    </Frame>
  ),

  "huddle/hero/decide": (
    <Frame
      app="HD"
      crumb={<><b>contract.md</b> <span className="sep">/</span> decision captured</>}
      users={[{ initials: "MA", tone: "a2", img: FACE.maya }, { initials: "SR", tone: "a3", img: FACE.sarah }, { initials: "NA", agent: true }]}
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
        <p style={{ margin: 0, fontSize: 12.5, fontWeight: 600, color: INK }}>Huddle summary — Clause 7 review</p>
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
        <span style={{ fontSize: 12.5, color: INK, flex: 1 }}>Looks right — marking clause 7 approved.</span>
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
          title={<><strong>Clause 7</strong> — vendor rate is 12% over the contracted schedule</>}
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
                <p className="cmh-cmt-body">Corrected rate: 9% — see footnote 4</p>
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

  "huddle/in-production/sales": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <DocSurface>
        <p style={{ margin: "0 0 10px", fontSize: 13, opacity: 0.7 }}>Pitch deck — claims slide</p>
        <HuddleBar users={[{ initials: "BR", kind: "human", name: "Brand" }, { initials: "LE", kind: "human", name: "Legal" }, { initials: "WR", kind: "human", name: "Writer" }]} channel="on the slide" />
      </DocSurface>
      <p className="code-microcopy">brand, legal, and the writer settle it on the asset itself</p>
    </div>
  ),

  "huddle/in-production/fintech": (
    <div style={{ padding: 18 }}>
      <DocSurface>
        <p style={{ margin: "0 0 10px", fontSize: 13 }}>
          Forecast model —{" "}
          <mark style={{ background: "color-mix(in srgb, var(--vlp-color-accent) 22%, transparent)", padding: "1px 2px" }}>variance on row 18</mark>
        </p>
        <HuddleBar users={[{ initials: "AN", kind: "human", name: "Analyst" }, { initials: "CT", kind: "human", name: "Controller" }]} channel="screen on the model" />
      </DocSurface>
    </div>
  ),

  "huddle/in-production/ops": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <DocSurface>
        <p style={{ margin: "0 0 10px", fontSize: 13, opacity: 0.7 }}>Order record — shipment exception</p>
        <ShareTile label="screen share on the discrepancy" />
        <div style={{ marginTop: 12 }}>
          <HuddleBar users={[{ initials: "PL", kind: "human", name: "Planner" }, { initials: "FL", kind: "human", name: "Field lead" }]} channel="audio" />
        </div>
      </DocSurface>
    </div>
  ),

  "huddle/in-production/ai": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <DocSurface>
        <NotifItem
          avatar={{ initials: "CC", kind: "agent", name: "Clause Checker" }}
          title={<><strong>Clause 7</strong> flagged — two reviewers disagree on the fix</>}
          chip={{ label: "agent", kind: "agent" }}
        />
        <div style={{ marginTop: 12 }}>
          <HuddleBar users={CALL_TEAM} channel="huddle on the document" />
        </div>
      </DocSurface>
      <p className="code-microcopy">they decide together and the decision lands back on the finding</p>
    </div>
  ),

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
            <p className="hud-rel-line">Thread stalled — huddled to settle it</p>
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
