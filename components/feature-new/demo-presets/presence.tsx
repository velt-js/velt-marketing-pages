import type { ReactNode } from "react";

import { AvatarStack, CursorTag, ProvRow, ProvArrow, DarkPanel } from "../demos";

// Simulated-UI demo nodes for the /new-features/presence page. Keys match
// components/feature-new/demo-keys.ts; resolved by demo-registry.tsx.

const DEAL_TEAM = [
  { initials: "MA", kind: "human" as const, name: "Maya" },
  { initials: "SR", kind: "human" as const, name: "Sarah" },
  { initials: "DV", kind: "away" as const, name: "Dev (away)" },
  { initials: "CC", kind: "agent" as const, name: "Clause Checker" },
];

/**
 * A framed "document" surface used to host cursors/selection demos.
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

export const PRESENCE_DEMOS: Record<string, ReactNode> = {
  "presence/hero/avatars": (
    <div style={{ display: "grid", gap: 14, padding: 22 }}>
      <p className="code-microcopy">Budget document · who's viewing and editing</p>
      <AvatarStack users={DEAL_TEAM} overflow={2} />
    </div>
  ),

  "presence/hero/cursors": (
    <div style={{ padding: 18 }}>
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>Clause 7 — Indemnification</p>
        <div style={{ position: "absolute", top: 38, left: 36 }}>
          <CursorTag name="Maya" />
        </div>
        <div style={{ position: "absolute", bottom: 16, right: 24 }}>
          <CursorTag name="Clause Checker" kind="agent" />
        </div>
      </DocSurface>
    </div>
  ),

  "presence/hero/selection": (
    <div style={{ padding: 18 }}>
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13 }}>
          The Provider shall{" "}
          <mark style={{ background: "color-mix(in srgb, var(--brand) 22%, transparent)", padding: "1px 2px" }}>
            indemnify and hold harmless
          </mark>{" "}
          the Client.
        </p>
        <div style={{ marginTop: 10 }}>
          <CursorTag name="Sarah is selecting" />
        </div>
      </DocSurface>
    </div>
  ),

  "presence/hero/follow": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <AvatarStack users={[{ initials: "CC", kind: "agent", name: "Clause Checker" }, { initials: "MA", kind: "human" }]} />
      <ProvRow>
        click avatar <ProvArrow /> ride along with the leader's viewport
      </ProvRow>
      <p className="code-microcopy">flockMode · clicks, scrolls, and navigation replay on followers</p>
    </div>
  ),

  "presence/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <AvatarStack users={DEAL_TEAM} overflow={3} />
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13 }}>
          Clause 7 —{" "}
          <mark style={{ background: "color-mix(in srgb, var(--brand) 22%, transparent)", padding: "1px 2px" }}>
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
          <mark style={{ background: "color-mix(in srgb, var(--brand) 22%, transparent)", padding: "1px 2px" }}>cell B12</mark>{" "}
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
        locationId: slide-4 <ProvArrow /> who's on this slide
      </ProvRow>
      <ProvRow>
        not just somewhere in the deck
      </ProvRow>
    </div>
  ),

  "presence/showcase/data": (
    <div className="pv">
      <DarkPanel>{"usePresenceData({ status: \"idle\" })\nonUserStateChange((u) => escalate(u))"}</DarkPanel>
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
      <p className="code-microcopy">Brand, legal, and the client in the deck's avatar row</p>
    </div>
  ),

  "presence/in-production/fintech": (
    <div style={{ padding: 18 }}>
      <DocSurface>
        <p style={{ margin: 0, fontSize: 13 }}>
          <mark style={{ background: "color-mix(in srgb, var(--brand) 22%, transparent)", padding: "1px 2px" }}>cell B12</mark> — analyst editing
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
        presence shows who's in <ProvArrow /> co-editing lets them change it
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
