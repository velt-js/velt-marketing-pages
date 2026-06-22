import type { ReactNode } from "react";

import { AvatarStack, ProvRow, ProvArrow, DarkPanel, NotifItem } from "../demos";
import type { AvatarUser } from "../demos";
import { Av, Composer, FACES, Frame, IconCheck } from "./hero-surface";
import type { PresenceUser } from "./hero-surface";

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
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <HuddleBar users={CALL_TEAM} channel="audio" />
        <p className="code-microcopy">one click opens a live voice channel on the document</p>
      </div>
    </div>
  ),

  "huddle/showcase/video": (
    <div className="pv">
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <HuddleBar users={CALL_TEAM} channel="video" />
        <p className="code-microcopy">faces on, still inside the document</p>
      </div>
    </div>
  ),

  "huddle/showcase/screen-share": (
    <div className="pv">
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <ShareTile label="walking the reviewer through the clause" />
      </div>
    </div>
  ),

  "huddle/showcase/no-link": (
    <div className="pv">
      <ProvRow>
        click the huddle tool <ProvArrow /> the call starts on the spot
      </ProvRow>
      <ProvRow>
        teammates in the document <ProvArrow /> join in place · no URL, no invite
      </ProvRow>
    </div>
  ),

  "huddle/showcase/scoped": (
    <div className="pv">
      <DarkPanel>{"// every huddle event carries the document\n{ \"event\": \"huddle.created\",\n  \"documentId\": \"contract-114\",\n  \"location\": { \"page\": \"clause-7\" } }"}</DarkPanel>
    </div>
  ),

  "huddle/showcase/presence": (
    <div className="pv">
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <AvatarStack users={[{ initials: "MA", kind: "human", name: "Maya (talking)" }, { initials: "SR", kind: "human", name: "Sarah (talking)" }, { initials: "JD", kind: "human", name: "Jordan" }]} overflow={2} />
        <p className="code-microcopy">huddle users render in the same presence row — see who is already talking</p>
      </div>
    </div>
  ),

  "huddle/showcase/chat": (
    <div className="pv">
      <DocSurface>
        <NotifItem title={<>Corrected rate: 9% — see footnote 4</>} meta="huddle chat · on by default" />
        <NotifItem title={<>Dropping the doc link without talking over you</>} meta="ephemeral · toggle by prop or API" />
      </DocSurface>
    </div>
  ),

  "huddle/showcase/webhooks": (
    <div className="pv">
      <DarkPanel footer="fires on huddle created and joined">{"POST /your-endpoint\n{ \"event\": \"huddle.joined\",\n  \"actionUser\": \"maya@acme.com\",\n  \"documentId\": \"contract-114\" }"}</DarkPanel>
    </div>
  ),

  "huddle/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>wireframe Parts · Slots · Template Variables</ProvRow>
      <ProvRow>global styles · dark mode</ProvRow>
      <ProvRow>the in-call bar and chat, your markup</ProvRow>
    </div>
  ),

  "huddle/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>type config: audio · video · screen · all</ProvRow>
      <ProvRow>chat toggle · Follow Me on avatar click</ProvRow>
      <ProvRow>server fallback · webhooks into your pipeline</ProvRow>
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
      <ProvRow>
        the thread stalls <ProvArrow /> the huddle resolves it
      </ProvRow>
      <ProvRow>
        decision <ProvArrow /> lands back in the thread
      </ProvRow>
    </div>
  ),

  "huddle/related/recording": (
    <div className="pv">
      <ProvRow>
        schedules don&apos;t line up <ProvArrow /> record instead
      </ProvRow>
      <ProvRow>voice · video · screen, pinned to the work</ProvRow>
    </div>
  ),

  "huddle/related/presence": (
    <div className="pv">
      <ProvRow>
        who is in the document <ProvArrow /> who is already talking
      </ProvRow>
    </div>
  ),
};
