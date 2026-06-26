import type { CSSProperties, ReactNode } from "react";

import { AvatarStack, CursorTag } from "../demos";
import { AiNativeBoard } from "./ai-board";
import { CrmPipelineBoard } from "./crm-board";
import { FintechBoard } from "./fintech-board";
import { OperationsBoard } from "./ops-board";
import { Av, Composer, FACES, Frame, IconAgentMark, IconArrowRight } from "./hero-surface";

import "./presence-showcase.css";

// Simulated-UI demo nodes for the /new-features/presence page. Keys match
// components/feature-new/demo-keys.ts; resolved by demo-registry.tsx.

// Presence-page personas mapped to shared headshots.
const FACE = {
  maya: FACES.hope,
  dev: FACES.ethan,
  you: FACES.jeff,
} as const;

// Tone tokens per persona (reused across all four hero tabs).
const TONE = {
  maya: "a2" as const,
  dev: "a1" as const,
  you: "a3" as const,
};

// Used by non-hero entries (what-it-is, showcase, etc.) that rely on AvatarStack's `kind` API.
const DEAL_TEAM = [
  { initials: "MA", kind: "human" as const, name: "Maya" },
  { initials: "SR", kind: "human" as const, name: "Sarah" },
  { initials: "DV", kind: "away" as const, name: "Dev (away)" },
  { initials: "CC", kind: "agent" as const, name: "Clause Checker" },
];

/**
 * A framed "document" surface used by non-hero showcase entries.
 * @param {{ children: ReactNode }} props Surface content.
 * @returns {JSX.Element} Document surface.
 */
function DocSurface({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--line, #e7e2d9)",
        borderRadius: 12,
        background: "var(--bg, #fff)",
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
 * A small cursor pointer SVG using a vlp color token.
 * @param {{ color: string }} props CSS color value (use --vlp-* var strings).
 * @returns {JSX.Element} Cursor arrow SVG.
 */
function CursorSvg({ color }: { color: string }) {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d="M1 1.5l11 5.5-5.5 1.5L5 15 1 1.5z"
        fill={color}
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A labeled live cursor: pointer SVG + colored name pill.
 * Built locally so we never pull in the teal CursorTag from ../demos.
 * @param {{ name: string; color: string; label?: string; style?: CSSProperties }} props Cursor name, --vlp-* color token, optional override label, optional wrapper style.
 * @returns {JSX.Element} Cursor tag.
 */
function PsCursor({
  name,
  color,
  label,
  style,
}: {
  name: string;
  color: string;
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: 3,
        ...style,
      }}
    >
      <CursorSvg color={color} />
      <span
        style={{
          display: "inline-block",
          background: color,
          color: "#fff",
          fontSize: 10.5,
          fontWeight: 600,
          lineHeight: 1,
          padding: "3px 7px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          marginTop: 2,
        }}
      >
        {label ?? name}
      </span>
    </div>
  );
}

/**
 * A roster row showing a person's avatar, name, and online/away badge.
 * @param {{ initials: string; tone: "a1" | "a2" | "a3" | "a4"; img?: string; name: string; away?: boolean }} props Row content.
 * @returns {JSX.Element} Presence roster row.
 */
function RosterRow({
  initials,
  tone,
  img,
  name,
  away,
}: {
  initials: string;
  tone: "a1" | "a2" | "a3" | "a4";
  img?: string;
  name: string;
  away?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <Av initials={initials} tone={tone} img={img} />
        <span
          style={{
            position: "absolute",
            bottom: -1,
            right: -1,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: away ? "var(--vlp-color-text-subtle)" : "var(--vlp-color-green-approval)",
            border: "1.5px solid var(--vlp-bg-page)",
          }}
        />
      </div>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--vlp-color-ink)", flex: 1 }}>{name}</span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: away ? "var(--vlp-color-text-subtle)" : "var(--vlp-color-green-approval)",
          fontFamily: "var(--vlp-font-mono)",
          letterSpacing: "0.04em",
        }}
      >
        {away ? "away" : "live"}
      </span>
    </div>
  );
}

/**
 * An inline colored text selection span with an author name tag above it.
 * @param {{ children: ReactNode; color: string; name: string }} props Selected text, background CSS color (--vlp-* token), author label.
 * @returns {JSX.Element} Selection highlight with floating name tag.
 */
function SelectionSpan({
  children,
  color,
  name,
}: {
  children: ReactNode;
  color: string;
  name: string;
}) {
  return (
    <span style={{ position: "relative", display: "inline" }}>
      <span
        style={{
          background: color,
          borderRadius: 3,
          padding: "1px 2px",
        }}
      >
        {children}
      </span>
      <span
        style={{
          position: "absolute",
          top: -18,
          left: 0,
          background: color,
          color: "#fff",
          fontSize: 9.5,
          fontWeight: 700,
          padding: "2px 6px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          lineHeight: 1.2,
          filter: "brightness(0.88)",
        }}
      >
        {name}
      </span>
    </span>
  );
}

/** @returns {JSX.Element} Group / people glyph for the avatars card header. */
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5M17 14.2A6 6 0 0 1 21 20" />
    </svg>
  );
}

/** @returns {JSX.Element} Heartbeat / activity glyph for the presence-states header. */
function IconPulse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  );
}

/** @returns {JSX.Element} Pointer glyph for the live-cursors header. */
function IconCursor() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3l6 18 2.5-7.5L21 11 5 3z" />
    </svg>
  );
}

/** @returns {JSX.Element} Highlight / text-selection glyph for the selection header. */
function IconSelection() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7V5h16v2M9 5v14M7 19h4" />
      <rect x="14" y="13" width="7" height="6" rx="1.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Eye glyph for the follow-mode header. */
function IconFollow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** @returns {JSX.Element} Map-pin glyph for the presence-by-location header. */
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Stacked-data glyph for the presence-data header. */
function IconData() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
}

/** @returns {JSX.Element} Microphone glyph for the huddle participant tiles. */
function IconMic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

/** @returns {JSX.Element} Bolt glyph for the state-change escalation event. */
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
    </svg>
  );
}

/**
 * One presence row: an avatar with an optional online/away/offline status dot, a
 * name, an optional sub line, and an optional right-aligned tag. Reused across
 * the avatars roster, the states list, and the agent room.
 * @param {{ name: ReactNode; sub?: ReactNode; subMono?: boolean; initials: string; tone?: string; img?: string; agent?: boolean; state?: "on" | "away" | "off"; right?: ReactNode }} props Row content.
 * @returns {JSX.Element} Presence person row.
 */
function PersonRow({
  name,
  sub,
  subMono,
  initials,
  tone = "a1",
  img,
  agent,
  state,
  right,
}: {
  name: ReactNode;
  sub?: ReactNode;
  subMono?: boolean;
  initials: string;
  tone?: string;
  img?: string;
  agent?: boolean;
  state?: "on" | "away" | "off";
  right?: ReactNode;
}) {
  return (
    <div className="prs-person">
      <span className="prs-ava">
        <Av initials={initials} tone={tone} img={img} agent={agent} />
        {state ? <span className={`prs-dot prs-dot--${state}`} /> : null}
      </span>
      <span className="prs-person-main">
        <span className="prs-person-name">{name}</span>
        {sub ? <span className={`prs-person-sub${subMono ? " prs-person-sub--mono" : ""}`}>{sub}</span> : null}
      </span>
      {right ?? null}
    </div>
  );
}

/**
 * Compact "related feature" teaser tile: a mini echo of the linked primitive
 * over a connector caption naming how presence hands off to it.
 * @param {{ children: ReactNode; from: string; to: string }} props Echo visual plus the from/to connector phrases.
 * @returns {JSX.Element} Related teaser tile.
 */
function RelTile({ children, from, to }: { children: ReactNode; from: string; to: string }) {
  return (
    <div className="pv">
      <div className="prs-rel">
        {children}
        <p className="prs-rel-cap">
          <span>{from}</span>
          <span className="prs-rel-arrow"><IconArrowRight /></span>
          <strong>{to}</strong>
        </p>
      </div>
    </div>
  );
}

export const PRESENCE_DEMOS: Record<string, ReactNode> = {
  // ── AVATARS ────────────────────────────────────────────────────────────────
  // Who's here: a presence stack in the chrome + a roster list with real faces
  // and live/away indicators embedded inside the document surface.
  "presence/hero/avatars": (
    <Frame
      app="BD"
      crumb={<><b>budget-q3.xlsx</b> <span className="sep">/</span> Sheet 1</>}
      users={[
        { initials: "MA", tone: TONE.maya, img: FACE.maya },
        { initials: "DV", tone: TONE.dev, img: FACE.dev },
        { initials: "YO", tone: TONE.you, img: FACE.you },
      ]}
    >
      <p className="cmh-doc" style={{ marginBottom: 4 }}>
        Who&rsquo;s in this document right now:
      </p>
      <div
        style={{
          border: "1px solid var(--vlp-border-default)",
          borderRadius: 10,
          background: "var(--vlp-bg-section-alt)",
          padding: "10px 14px",
          display: "grid",
          gap: 10,
        }}
      >
        <RosterRow initials="MA" tone={TONE.maya} img={FACE.maya} name="Maya" />
        <RosterRow initials="DV" tone={TONE.dev} img={FACE.dev} name="Dev" />
        <RosterRow initials="YO" tone={TONE.you} img={FACE.you} name="You" away />
      </div>
      <p className="cmh-doc" style={{ opacity: 0.55, fontSize: 11 }}>
        2 active · 1 away · avatars update in real time
      </p>
    </Frame>
  ),

  // ── CURSORS ────────────────────────────────────────────────────────────────
  // Live labeled cursors moving on a doc surface. Local PsCursor helper
  // (pointer SVG + name pill) uses --vlp-* colors; never imports teal CursorTag.
  "presence/hero/cursors": (
    <Frame
      app="DC"
      crumb={<><b>contract.md</b> <span className="sep">/</span> Clause 7</>}
      users={[
        { initials: "MA", tone: TONE.maya, img: FACE.maya },
        { initials: "DV", tone: TONE.dev, img: FACE.dev },
      ]}
    >
      <div
        style={{
          border: "1px solid var(--vlp-border-default)",
          borderRadius: 10,
          background: "var(--vlp-bg-page)",
          padding: 14,
          position: "relative",
          minHeight: 110,
        }}
      >
        <p className="cmh-doc">
          7.2 The Provider shall indemnify and hold harmless the Client against all
          claims arising from the Services provided under this agreement.
        </p>
        <div className="sk" style={{ width: "75%", marginTop: 8 }} />
        <div className="sk" style={{ width: "55%", marginTop: 6 }} />
        {/* Maya's cursor — upper-left area */}
        <PsCursor
          name="Maya"
          color="oklch(0.60 0.13 35)"
          style={{ position: "absolute", top: 28, left: 22 }}
        />
        {/* Dev's cursor — lower-right area */}
        <PsCursor
          name="Dev"
          color="#5b7fb8"
          style={{ position: "absolute", bottom: 22, right: 28 }}
        />
      </div>
    </Frame>
  ),

  // ── SELECTION ──────────────────────────────────────────────────────────────
  // Colored text selections by different users on a doc, each with a name tag.
  "presence/hero/selection": (
    <Frame
      app="DC"
      crumb={<><b>contract.md</b> <span className="sep">/</span> Clause 7</>}
      users={[
        { initials: "MA", tone: TONE.maya, img: FACE.maya },
        { initials: "DV", tone: TONE.dev, img: FACE.dev },
      ]}
    >
      <div
        style={{
          border: "1px solid var(--vlp-border-default)",
          borderRadius: 10,
          background: "var(--vlp-bg-page)",
          padding: "20px 14px 14px",
          position: "relative",
        }}
      >
        <p className="cmh-doc" style={{ lineHeight: 1.9 }}>
          7.2 The Provider shall{" "}
          <SelectionSpan color="oklch(0.88 0.08 35)" name="Maya">
            indemnify and hold harmless
          </SelectionSpan>{" "}
          the Client against{" "}
          <SelectionSpan color="oklch(0.86 0.08 250)" name="Dev">
            all claims arising
          </SelectionSpan>{" "}
          from the Services.
        </p>
      </div>
      <p className="cmh-doc" style={{ opacity: 0.55, fontSize: 11 }}>
        each selection is attributed in real time · no conflicts
      </p>
    </Frame>
  ),

  // ── FOLLOW ─────────────────────────────────────────────────────────────────
  // "Following Maya" viewport-follow state: a banner + Maya's cursor/face.
  "presence/hero/follow": (
    <Frame
      app="DC"
      crumb={<><b>contract.md</b> <span className="sep">/</span> following Maya</>}
      users={[{ initials: "MA", tone: TONE.maya, img: FACE.maya }]}
    >
      {/* Follow banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "oklch(0.88 0.08 35 / 0.25)",
          border: "1px solid oklch(0.80 0.10 35 / 0.4)",
          borderRadius: 10,
          padding: "8px 12px",
        }}
      >
        <Av initials="MA" tone={TONE.maya} img={FACE.maya} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: "var(--vlp-color-ink)" }}>
            Following Maya
          </p>
          <p style={{ margin: 0, fontSize: 11, color: "var(--vlp-color-text-muted)" }}>
            Your viewport mirrors hers · click anywhere to break free
          </p>
        </div>
        <button
          type="button"
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--vlp-color-text-muted)",
            background: "var(--vlp-bg-page)",
            border: "1px solid var(--vlp-border-default)",
            borderRadius: 7,
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          Stop
        </button>
      </div>

      {/* Simulated viewport: Maya's cursor on doc text */}
      <div
        style={{
          border: "1px solid var(--vlp-border-default)",
          borderRadius: 10,
          background: "var(--vlp-bg-page)",
          padding: "14px 14px 14px",
          position: "relative",
          minHeight: 88,
        }}
      >
        <p className="cmh-doc">
          7.3 Liability shall not exceed the fees paid in the preceding{" "}
          <span className="cmh-mark">twelve (12) months</span> of service.
        </p>
        <PsCursor
          name="Maya"
          color="oklch(0.60 0.13 35)"
          style={{ position: "absolute", bottom: 16, right: 22 }}
        />
      </div>

      <Composer placeholder="Type to break follow mode…" you={FACE.you} />
    </Frame>
  ),

  "presence/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <AvatarStack users={DEAL_TEAM} overflow={3} />
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13 }}>
          Clause 7:{" "}
          <mark style={{ background: "color-mix(in srgb, var(--vlp-color-accent) 22%, transparent)", padding: "1px 2px" }}>
            selection by Clause Checker
          </mark>
        </p>
        <div style={{ marginTop: 10 }}>
          <CursorTag name="Maya" />
        </div>
      </DocSurface>
      <p className="code-microcopy">both actor types in one primitive; supervision visible, no dashboard</p>
    </div>
  ),

  // Live avatars + overflow (wide tile): a presence cluster that collapses
  // extras into +N over a two-column roster of who's currently here.
  "presence/showcase/avatars": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconUsers />
          On this document
          <span className="cmh-cc-pill">6 here</span>
        </div>
        <div className="cmh-cc-body">
          <div className="prs-cluster">
            <span className="prs-stack" aria-hidden="true">
              <Av initials="MA" tone="a2" img={FACE.maya} />
              <Av initials="SR" tone="a3" img={FACES.hope} />
              <Av initials="DV" tone="a1" img={FACE.dev} />
              <Av initials="RA" agent />
              <span className="prs-more">+2</span>
            </span>
            <span className="prs-cluster-meta">
              <span className="prs-cluster-count">5 people · 1 agent</span>
              <span className="prs-cluster-sub">maxUsers collapses the rest</span>
            </span>
          </div>
          <div className="prs-roster">
            <PersonRow initials="MA" tone="a2" img={FACE.maya} name="Maya" sub="editing slide 4" state="on" />
            <PersonRow initials="DV" tone="a1" img={FACE.dev} name="Dev" sub="viewing" state="on" />
            <PersonRow initials="SR" tone="a3" img={FACES.hope} name="Sarah" sub="viewing" state="on" />
            <PersonRow initials="RA" agent name="Review Agent" sub="reviewing clause 7" state="on" />
            <PersonRow initials="CR" tone="a4" img={FACES.chris} name="Chris" sub="idle 5m" state="away" />
            <PersonRow initials="YO" tone="a1" img={FACE.you} name="You" sub="editing" state="on" />
          </div>
        </div>
      </div>
    </div>
  ),

  // Online / away / offline (narrow tile): heartbeats move a user through the
  // three presence states, each with the rule that triggered it.
  "presence/showcase/states": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--purple">
          <IconPulse />
          Presence states
          <span className="cmh-cc-pill">auto</span>
        </div>
        <div className="cmh-cc-body">
          <div className="prs-list">
            <PersonRow
              initials="MA"
              tone="a2"
              img={FACE.maya}
              name="Maya"
              sub="active now"
              subMono
              state="on"
              right={<span className="chip chip-approved">online</span>}
            />
            <PersonRow
              initials="SR"
              tone="a3"
              img={FACES.hope}
              name="Sarah"
              sub="idle 5m · tab switch"
              subMono
              state="away"
              right={<span className="chip chip-pending">away</span>}
            />
            <PersonRow
              initials="DV"
              tone="a1"
              img={FACE.dev}
              name="Dev"
              sub="disconnected 10m"
              subMono
              state="off"
              right={<span className="prs-tag">offline</span>}
            />
          </div>
        </div>
      </div>
    </div>
  ),

  // Agents in the avatar row (narrow tile): addUser drops an agent into presence
  // beside the humans, tagged so users see the reviewer is in before it acts.
  "presence/showcase/agent": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--slate">
          <span className="cmh-cc-mark"><IconAgentMark /></span>
          In the room
          <span className="cmh-cc-pill">human + agent</span>
        </div>
        <div className="cmh-cc-body">
          <div className="prs-list">
            <PersonRow
              initials="MA"
              tone="a2"
              img={FACE.maya}
              name="Maya"
              sub="editing"
              state="on"
              right={<span className="apf-tag apf-tag--human">human</span>}
            />
            <PersonRow
              initials="RA"
              agent
              name="Review Agent"
              sub="reviewing clause 7"
              state="on"
              right={<span className="apf-tag apf-tag--agent"><IconAgentMark />agent</span>}
            />
          </div>
          <div className="apf-note">
            <span className="chip chip-agent">addUser()</span>
            <span>Or the Presence REST API</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Live cursors (wide tile): labeled pointers from humans and an agent moving
  // across a shared document canvas.
  "presence/showcase/cursors": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--plum">
          <IconCursor />
          Live cursors
          <span className="cmh-cc-pill">humans + agents</span>
        </div>
        <div className="cmh-cc-body">
          <div className="prs-canvas">
            <p className="cmh-doc">
              7.2 The Provider shall indemnify and hold harmless the Client against
              all claims arising from the Services provided under this agreement.
            </p>
            <div className="sk" style={{ width: "82%" }} />
            <div className="sk" style={{ width: "60%" }} />
            <PsCursor
              name="Maya"
              color="oklch(0.60 0.13 35)"
              style={{ position: "absolute", top: 30, left: 26 }}
            />
            <PsCursor
              name="Dev"
              color="#5b7fb8"
              style={{ position: "absolute", top: 70, right: 90 }}
            />
            <PsCursor
              name="Review Agent"
              color="#2b66e9"
              style={{ position: "absolute", bottom: 18, right: 24 }}
            />
          </div>
        </div>
      </div>
    </div>
  ),

  // Live selection (wide tile): colored, attributed text selections on a doc and
  // a field that broadcasts its selection in real time.
  "presence/showcase/selection": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--teal">
          <IconSelection />
          Live selection
          <span className="cmh-cc-pill">attributed</span>
        </div>
        <div className="cmh-cc-body">
          <div className="prs-canvas">
            <p className="cmh-doc" style={{ lineHeight: 1.95 }}>
              7.2 The Provider shall{" "}
              <SelectionSpan color="oklch(0.88 0.08 35)" name="Maya">
                indemnify and hold harmless
              </SelectionSpan>{" "}
              the Client against{" "}
              <SelectionSpan color="oklch(0.86 0.08 250)" name="Dev">
                all claims arising
              </SelectionSpan>{" "}
              from the Services.
            </p>
          </div>
          <div className="prs-field">
            <span className="prs-field-label">B12</span>
            <span className="prs-field-val">
              <SelectionSpan color="oklch(0.86 0.09 155)" name="Sarah">
                $85,400
              </SelectionSpan>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Follow mode (narrow tile): a "following" banner mirroring a teammate's
  // viewport, plus the same affordance for riding along with an agent.
  "presence/showcase/follow": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <IconFollow />
          Follow mode
          <span className="cmh-cc-pill">live</span>
        </div>
        <div className="cmh-cc-body">
          <div className="prs-follow">
            <div className="prs-follow-banner">
              <Av initials="MA" tone="a2" img={FACE.maya} />
              <span className="prs-follow-main">
                <span className="prs-follow-title">Following Maya</span>
                <span className="prs-follow-sub">your viewport mirrors hers</span>
              </span>
              <button type="button" className="prs-follow-stop">Stop</button>
            </div>
            <div className="prs-follow-hint">
              <Av initials="RA" agent />
              <span className="prs-follow-hint-text">
                Click the agent to ride along as it works, live
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Presence by location (narrow tile): locationId scopes the avatar row to a
  // single slide, so you see who is on slide 4 — not just somewhere in the deck.
  "presence/showcase/location": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--navy">
          <IconPin />
          By location
          <span className="cmh-cc-pill">slide-4</span>
        </div>
        <div className="cmh-cc-body">
          <div className="prs-loc">
            <div className="prs-loc-row">
              <span className="prs-loc-id">slide-3</span>
              <span className="prs-loc-main">Pricing</span>
              <span className="prs-loc-empty">no one here</span>
            </div>
            <div className="prs-loc-row prs-loc-row--on">
              <span className="prs-loc-id">slide-4</span>
              <span className="prs-loc-main">Forecast</span>
              <span className="prs-mini" aria-hidden="true">
                <Av initials="MA" tone="a2" img={FACE.maya} />
                <Av initials="DV" tone="a1" img={FACE.dev} />
                <Av initials="RA" agent />
              </span>
            </div>
            <div className="prs-loc-row">
              <span className="prs-loc-id">slide-5</span>
              <span className="prs-loc-main">Roadmap</span>
              <span className="prs-loc-empty">no one here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Presence data + events (wide tile): a status-filtered presence read on one
  // side, a state-change event firing an escalation on the other.
  "presence/showcase/data": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--slate">
          <IconData />
          Presence data
          <span className="cmh-cc-pill">queryable</span>
        </div>
        <div className="cmh-cc-body">
          <div className="prs-data">
            <div className="prs-data-panel">
              <span className="prs-data-cap"><IconData />usePresenceData</span>
              <span className="prs-query">
                statuses: [<b>&quot;away&quot;</b>]
              </span>
              <div className="prs-list">
                <PersonRow initials="SR" tone="a3" img={FACES.hope} name="Sarah" sub="idle 5m" subMono state="away" />
                <PersonRow initials="DV" tone="a1" img={FACE.dev} name="Dev" sub="idle 8m" subMono state="away" />
              </div>
            </div>
            <div className="prs-data-panel">
              <span className="prs-data-cap"><IconBolt />onUserStateChange</span>
              <div className="prs-event">
                <span className="prs-event-ic"><IconBolt /></span>
                <span className="prs-event-text">
                  Reviewer went idle &rarr; <code>escalate(user)</code>
                </span>
              </div>
              <span className="prs-query">
                drive your own indicators
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // LOOK — a themed presence stage (custom avatar shapes/colors + a labeled
  // live cursor) over the theming knobs that drive it.
  "presence/make-it-yours/look": (
    <div className="pv prs-look">
      <div className="prs-look-stage">
        <span className="prs-look-stack" aria-hidden="true">
          <span className="prs-look-av prs-look-av--1">MA</span>
          <span className="prs-look-av prs-look-av--2">DV</span>
          <span className="prs-look-av prs-look-av--3">SR</span>
          <span className="prs-look-av prs-look-av--more">+2</span>
        </span>
        <PsCursor
          name="Maya"
          color="oklch(0.60 0.13 35)"
          style={{ position: "absolute", bottom: 14, right: 16 }}
        />
      </div>
      <div className="prs-look-knobs">
        <span className="prs-look-sw prs-look-sw--1" aria-hidden="true" />
        <span className="prs-look-sw prs-look-sw--2" aria-hidden="true" />
        <span className="prs-look-sw prs-look-sw--3" aria-hidden="true" />
        <span className="prs-look-knob">squircle</span>
        <span className="prs-look-knob">labels</span>
        <span className="prs-look-knob prs-look-knob--dark">dark</span>
      </div>
    </div>
  ),

  // BEHAVIOR — the presence-data config: a queryable read, location scoping, a
  // state rule, and the event/REST surface, as labeled config rows.
  "presence/make-it-yours/behavior": (
    <div className="pv prs-cfg">
      <div className="prs-cfg-row">
        <span className="prs-cfg-ic"><IconData /></span>
        <span className="prs-cfg-main">
          <span className="prs-cfg-key">usePresenceData()</span>
          <span className="prs-cfg-sub">statuses · location · self</span>
        </span>
        <span className="prs-cfg-val">queryable</span>
      </div>
      <div className="prs-cfg-row">
        <span className="prs-cfg-ic"><IconPin /></span>
        <span className="prs-cfg-main">
          <span className="prs-cfg-key">locationId</span>
          <span className="prs-cfg-sub">scope to a slide or room</span>
        </span>
        <span className="prs-cfg-val prs-cfg-val--mono">slide-4</span>
      </div>
      <div className="prs-cfg-row">
        <span className="prs-cfg-ic"><IconPulse /></span>
        <span className="prs-cfg-main">
          <span className="prs-cfg-key">inactivity</span>
          <span className="prs-cfg-sub">idle 5m &rarr; away</span>
        </span>
        <span className="chip chip-pending">rule</span>
      </div>
      <div className="prs-cfg-row">
        <span className="prs-cfg-ic prs-cfg-ic--evt"><IconBolt /></span>
        <span className="prs-cfg-main">
          <span className="prs-cfg-key">onUserStateChange</span>
          <span className="prs-cfg-sub">addUser · removeUser · REST</span>
        </span>
        <span className="cmh-live"><i />event</span>
      </div>
    </div>
  ),

  "presence/in-production/sales": <CrmPipelineBoard />,

  "presence/in-production/fintech": <FintechBoard />,

  "presence/in-production/ops": <OperationsBoard />,

  "presence/in-production/ai": <AiNativeBoard />,

  "presence/related/comments": (
    <RelTile from="watching" to="threads anchor feedback to the element">
      <div className="cmh-cmt cmh-cmt--plain">
        <Av initials="MA" tone="a2" img={FACE.maya} />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">Maya</span>
            <span className="cmh-cmt-time">now</span>
          </div>
          <p className="cmh-cmt-body">This clause needs a liability cap before we send</p>
        </div>
      </div>
    </RelTile>
  ),

  "presence/related/multiplayer-editing": (
    <RelTile from="presence shows who's in" to="co-editing lets them change it">
      <div className="prs-rel-doc">
        <p className="cmh-doc" style={{ margin: 0 }}>
          7.2 The Provider shall indemnify and hold harmless
          <span className="prs-rel-caret" style={{ background: "oklch(0.60 0.13 35)" }}>
            <span className="prs-rel-clabel" style={{ background: "oklch(0.60 0.13 35)" }}>Maya</span>
          </span>{" "}
          the Client against all claims.
        </p>
      </div>
    </RelTile>
  ),

  "presence/related/huddle": (
    <RelTile from="presence finds the person" to="the conversation starts in the doc">
      <div className="prs-rel-tiles">
        <span className="prs-rel-tile">
          <Av initials="MA" tone="a2" img={FACE.maya} />
          <span className="prs-rel-tile-name">Maya</span>
          <span className="prs-rel-mic"><IconMic /></span>
        </span>
        <span className="prs-rel-tile">
          <Av initials="DV" tone="a1" img={FACE.dev} />
          <span className="prs-rel-tile-name">Dev</span>
          <span className="prs-rel-mic"><IconMic /></span>
        </span>
        <span className="prs-rel-tile">
          <Av initials="RA" agent />
          <span className="prs-rel-tile-name">Agent</span>
          <span className="prs-rel-mic"><IconMic /></span>
        </span>
      </div>
    </RelTile>
  ),
};
