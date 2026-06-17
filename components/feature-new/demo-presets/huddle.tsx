import type { ReactNode } from "react";

import { AvatarStack, ProvRow, ProvArrow, DarkPanel, NotifItem } from "../demos";
import type { AvatarUser } from "../demos";

// Simulated-UI demo nodes for the /new-features/huddle page. Keys match
// components/feature-new/demo-presets/huddle.keys.ts; the matching record is
// merged into the registry in demo-registry.tsx. Visuals are simulated, not
// live SDK instances: huddle never opens a real audio/video/screen channel
// here, and agents are shown in presence only (they do not join the call).

const LINE = "1px solid var(--line, #e7e2d9)";
const SURFACE_BG = "var(--bg, #fff)";
const BRAND = "var(--brand, #ff4f00)";
const INK = "var(--ink, #0b353b)";

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
 * A faux toolbar button. The "Start huddle" instance is the huddle tool.
 * @param {{ children: ReactNode; primary?: boolean }} props Button content.
 * @returns {JSX.Element} Toolbar button.
 */
function ToolBtn({ children, primary }: { children: ReactNode; primary?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        fontWeight: 700,
        padding: "6px 12px",
        borderRadius: 8,
        border: LINE,
        color: primary ? "#fff" : INK,
        background: primary ? BRAND : SURFACE_BG,
      }}
    >
      {primary ? <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "inline-block" }} /> : null}
      {children}
    </span>
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
        background: "color-mix(in srgb, var(--brand) 6%, transparent)",
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

export const HUDDLE_DEMOS: Record<string, ReactNode> = {
  "huddle/hero/start": (
    <div style={{ display: "grid", gap: 14, padding: 22 }}>
      <p className="code-microcopy">Contract under review · toolbar</p>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <ToolBtn primary>Start huddle</ToolBtn>
        <ToolBtn>Comment</ToolBtn>
        <ToolBtn>Share</ToolBtn>
      </div>
      <p className="code-microcopy">one click in the toolbar — no link, no invite, no calendar</p>
    </div>
  ),

  "huddle/hero/join": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <HuddleBar users={CALL_TEAM} channel="audio + video" />
      <ProvRow>
        teammate in the document <ProvArrow /> joins in place
      </ProvRow>
      <p className="code-microcopy">users already on the document see the active huddle and join from where they are</p>
    </div>
  ),

  "huddle/hero/share": (
    <div style={{ padding: 18 }}>
      <DocSurface>
        <p style={{ margin: "0 0 10px", fontSize: 13, opacity: 0.7 }}>Clause 7 — Vendor rate</p>
        <ShareTile label="Sarah is sharing clause 7" />
        <div style={{ marginTop: 12 }}>
          <HuddleBar users={CALL_TEAM} channel="screen" />
        </div>
      </DocSurface>
    </div>
  ),

  "huddle/hero/decide": (
    <div style={{ display: "grid", gap: 10, padding: 18 }}>
      <DocSurface>
        <NotifItem
          avatar={{ initials: "SR", kind: "human", name: "Sarah" }}
          title={<>Corrected rate is 9%, not 12% — sending the line now</>}
          meta="huddle chat · ephemeral"
        />
        <NotifItem
          avatar={{ initials: "MA", kind: "human", name: "Maya" }}
          title={<>Agreed. Marking clause 7 approved.</>}
          chip={{ label: "resolved", kind: "approved" }}
        />
      </DocSurface>
      <p className="code-microcopy">the conversation attached to the work resolves what the thread could not</p>
    </div>
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
          <mark style={{ background: "color-mix(in srgb, var(--brand) 22%, transparent)", padding: "1px 2px" }}>variance on row 18</mark>
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
