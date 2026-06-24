import type { CSSProperties, ReactNode } from "react";

import { AvatarStack, CursorTag, ProvRow, ProvArrow, DarkPanel } from "../demos";
import { Av, Composer, FACES, Frame } from "./hero-surface";

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
          Clause 7 —{" "}
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

  "presence/showcase/avatars": (
    <div className="pv">
      <div style={{ padding: 14 }}>
        <AvatarStack users={DEAL_TEAM} overflow={5} />
      </div>
    </div>
  ),

  "presence/showcase/states": (
    <div className="pv">
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <AvatarStack
          users={[
            { initials: "MA", kind: "human", name: "online" },
            { initials: "SR", kind: "away", name: "away" },
            { initials: "DV", kind: "away", name: "offline" },
          ]}
        />
        <p className="code-microcopy">online · away (5m / tab switch) · offline (10m / disconnect)</p>
      </div>
    </div>
  ),

  "presence/showcase/agent": (
    <div className="pv">
      <div style={{ padding: 14, display: "grid", gap: 10 }}>
        <AvatarStack users={[{ initials: "MA", kind: "human" }, { initials: "RA", kind: "agent", name: "Review Agent" }]} />
        <p className="code-microcopy">addUser() or Presence REST API puts an agent in the row</p>
      </div>
    </div>
  ),

  "presence/showcase/cursors": (
    <div className="pv">
      <DocSurface>
        <CursorTag name="Maya" />
        <div style={{ position: "absolute", top: 18, right: 18 }}>
          <CursorTag name="Agent" kind="agent" />
        </div>
      </DocSurface>
    </div>
  ),

  "presence/showcase/selection": (
    <div className="pv">
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13 }}>
          <mark style={{ background: "color-mix(in srgb, var(--vlp-color-accent) 22%, transparent)", padding: "1px 2px" }}>cell B12</mark>{" "}
          selected by Sarah
        </p>
      </DocSurface>
    </div>
  ),

  "presence/showcase/follow": (
    <div className="pv">
      <ProvRow>
        click teammate <ProvArrow /> ride their viewport
      </ProvRow>
      <ProvRow>
        click agent <ProvArrow /> watch it work, live
      </ProvRow>
    </div>
  ),

  "presence/showcase/location": (
    <div className="pv">
      <ProvRow>
        locationId: slide-4 <ProvArrow /> who&rsquo;s on this slide
      </ProvRow>
      <ProvRow>
        not just somewhere in the deck
      </ProvRow>
    </div>
  ),

  "presence/showcase/data": (
    <div className="pv">
      <DarkPanel>{"usePresenceData({ statuses: [\"away\"] })\nonUserStateChange((u) => escalate(u))"}</DarkPanel>
    </div>
  ),

  "presence/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>prebuilt components</ProvRow>
      <ProvRow>wireframes + template variables</ProvRow>
      <ProvRow>dark mode · CSS customization</ProvRow>
    </div>
  ),

  "presence/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>inactivity · maxUsers · locations</ProvRow>
      <ProvRow>hooks · events · data API</ProvRow>
      <ProvRow>addUser / removeUser · REST</ProvRow>
    </div>
  ),

  "presence/in-production/sales": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <AvatarStack users={[{ initials: "BR", kind: "human" }, { initials: "LE", kind: "human" }, { initials: "CL", kind: "human" }]} overflow={2} />
      <p className="code-microcopy">Brand, legal, and the client in the deck&rsquo;s avatar row</p>
    </div>
  ),

  "presence/in-production/fintech": (
    <div style={{ padding: 18 }}>
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13 }}>
          <mark style={{ background: "color-mix(in srgb, var(--vlp-color-accent) 22%, transparent)", padding: "1px 2px" }}>cell B12</mark> — analyst editing
        </p>
        <p className="code-microcopy" style={{ marginTop: 8 }}>close week runs without two people in one column</p>
      </DocSurface>
    </div>
  ),

  "presence/in-production/ops": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <AvatarStack users={[{ initials: "DS", kind: "human", name: "Dispatch" }, { initials: "FC", kind: "away", name: "Field crew (offline)" }]} />
      <p className="code-microcopy">dispatch sees who has the work order open before reassigning</p>
    </div>
  ),

  "presence/in-production/ai": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <AvatarStack users={[{ initials: "MA", kind: "human" }, { initials: "DR", kind: "agent", name: "Drafting agent" }]} />
      <p className="code-microcopy">follow mode lets the user ride along as the agent works</p>
    </div>
  ),

  "presence/related/comments": (
    <div className="pv">
      <ProvRow>
        watching <ProvArrow /> threads anchor feedback to the element
      </ProvRow>
    </div>
  ),

  "presence/related/multiplayer-editing": (
    <div className="pv">
      <ProvRow>
        presence shows who&rsquo;s in <ProvArrow /> co-editing lets them change it
      </ProvRow>
    </div>
  ),

  "presence/related/huddle": (
    <div className="pv">
      <ProvRow>
        presence finds the person <ProvArrow /> the conversation starts in the doc
      </ProvRow>
    </div>
  ),
};
