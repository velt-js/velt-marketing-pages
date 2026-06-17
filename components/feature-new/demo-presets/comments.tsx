import type { ReactNode } from "react";

import { AvatarStack, Chip, CursorTag, DarkPanel, NotifItem, ProvRow, ProvArrow } from "../demos";

// Simulated-UI demo nodes for the /new-features/comments page. Keys match
// components/feature-new/demo-presets/comments.keys.ts; resolved by
// demo-registry.tsx. Visuals are simulated, not live SDK instances.

/**
 * A framed "document" surface that hosts comment threads.
 * @param {{ label?: string; children: ReactNode }} props Optional caption and surface content.
 * @returns {JSX.Element} Document surface.
 */
function Surface({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--line, #e7e2d9)",
        borderRadius: 12,
        background: "var(--bg, #fff)",
        padding: 14,
        display: "grid",
        gap: 10,
      }}
    >
      {label ? <p style={{ margin: 0, fontSize: 12, opacity: 0.6 }}>{label}</p> : null}
      {children}
    </div>
  );
}

/**
 * A single comment bubble: avatar, author, body, and optional Approve/Reject
 * actions for agent findings.
 * @param {{ initials: string; author: string; agent?: boolean; body: ReactNode; actions?: boolean }} props Comment content.
 * @returns {JSX.Element} Comment bubble.
 */
function Comment({
  initials,
  author,
  agent,
  body,
  actions,
}: {
  initials: string;
  author: string;
  agent?: boolean;
  body: ReactNode;
  actions?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <AvatarStack users={[{ initials, kind: agent ? "agent" : "human", name: author }]} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: "var(--ink, #0b353b)" }}>{author}</p>
        <p style={{ margin: "2px 0 0", fontSize: 12.5, lineHeight: 1.45, color: "var(--ink, #0b353b)" }}>{body}</p>
        {actions ? (
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <span className="chip chip-approved">Approve</span>
            <span className="chip chip-rejected">Reject</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Compact bar chart used to anchor a freestyle comment to a datapoint.
 * @returns {JSX.Element} Mini chart with a pinned comment marker.
 */
function MiniChart() {
  const bars = [44, 70, 54, 86, 62];
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 8, height: 84 }}>
      {bars.map((height, index) => (
        <div
          key={`bar-${index}`}
          style={{
            flex: 1,
            height: `${height}%`,
            borderRadius: "4px 4px 0 0",
            background: index === 3 ? "var(--brand, #ff4f00)" : "var(--line, #e7e2d9)",
          }}
        />
      ))}
      <span
        style={{
          position: "absolute",
          top: -6,
          left: "62%",
          fontSize: 11,
          fontWeight: 700,
          color: "#fff",
          background: "var(--brand, #ff4f00)",
          padding: "2px 7px",
          borderRadius: 999,
        }}
      >
        Q3 · 💬
      </span>
    </div>
  );
}

export const COMMENTS_DEMOS: Record<string, ReactNode> = {
  "comments/hero/freestyle": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <Surface label="Sales deck · slide 4 — pricing chart">
        <MiniChart />
        <Comment
          initials="BA"
          author="Brand Agent"
          agent
          body="This pricing claim conflicts with the rate table in slide 4. Suggested fix attached."
          actions
        />
        <Comment initials="MA" author="Maya" body="@Sarah can you confirm the Q3 number?" />
        <p className="code-microcopy">freestyle · pinned to a chart datapoint · one comment, both actors</p>
      </Surface>
    </div>
  ),

  "comments/hero/popover": (
    <div style={{ padding: 18 }}>
      <Surface label="Landing page · hero headline">
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--ink, #0b353b)" }}>
          The fastest way to{" "}
          <mark style={{ background: "color-mix(in srgb, var(--brand) 22%, transparent)", padding: "1px 2px" }}>
            ship collaboration
          </mark>{" "}
          in your product.
        </p>
        <div style={{ marginTop: 4 }}>
          <Comment initials="SR" author="Sarah" body="Popover thread, anchored to the highlighted phrase." />
        </div>
      </Surface>
    </div>
  ),

  "comments/hero/text": (
    <div style={{ padding: 18 }}>
      <Surface label="Tiptap editor · contract.md">
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--ink, #0b353b)" }}>
          The Provider shall{" "}
          <mark style={{ background: "color-mix(in srgb, var(--brand) 22%, transparent)", padding: "1px 2px" }}>
            indemnify and hold harmless
          </mark>{" "}
          the Client.
        </p>
        <Comment initials="MA" author="Maya" body="Inline comment on the selected clause." />
      </Surface>
    </div>
  ),

  "comments/hero/inbox": (
    <div style={{ padding: 18 }}>
      <Surface label="Comments inbox · filters: all · unresolved">
        <NotifItem
          avatar={{ initials: "BA", kind: "agent" }}
          title={<><strong>Brand Agent</strong> flagged a pricing claim</>}
          meta="slide 4 · 2m ago"
          chip={{ label: "agent", kind: "agent" }}
        />
        <NotifItem
          avatar={{ initials: "MA", kind: "human" }}
          title={<><strong>Maya</strong> mentioned you on Clause 7</>}
          meta="contract.md · 14m ago"
          chip={{ label: "mention", kind: "pending" }}
        />
        <NotifItem
          avatar={{ initials: "SR", kind: "human" }}
          title={<><strong>Sarah</strong> resolved the Q3 thread</>}
          meta="forecast.xlsx · 1h ago"
          chip={{ label: "resolved", kind: "approved" }}
        />
      </Surface>
    </div>
  ),

  "comments/what-it-is/scene": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <Surface label="Sales deck · one thread, both actors">
        <Comment
          initials="BA"
          author="Brand Agent"
          agent
          body="This pricing claim conflicts with the rate table in slide 4. Suggested fix attached."
          actions
        />
        <Comment initials="DV" author="Dev" body="@Maya can you confirm the Q3 number?" />
        <Comment initials="MA" author="Maya" body="Confirmed, accepting." />
        <p className="code-microcopy">accepted · webhook review.approved fired · consent visible</p>
      </Surface>
    </div>
  ),

  "comments/showcase/anything": (
    <div className="pv">
      <ProvRow>doc · PDF · cell <ProvArrow /> anchored thread</ProvRow>
      <ProvRow>chart datapoint · video frame · canvas <ProvArrow /> anchored thread</ProvRow>
      <ProvRow>your custom component <ProvArrow /> anchored thread</ProvRow>
    </div>
  ),

  "comments/showcase/agents": (
    <div className="pv">
      <div style={{ padding: 12 }}>
        <Comment
          initials="RA"
          author="Review Agent"
          agent
          body="Clause 7 omits a liability cap. Suggested fix attached."
          actions
        />
      </div>
    </div>
  ),

  "comments/showcase/private": (
    <div className="pv">
      <div style={{ padding: 12, display: "grid", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Chip kind="pending">team only</Chip>
          <span style={{ fontSize: 12, opacity: 0.7 }}>the client never sees this</span>
        </div>
        <Comment initials="SR" author="Sarah" body="Hold the discount — let's counter at 12%." />
      </div>
    </div>
  ),

  "comments/showcase/mentions": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "MA", kind: "human" }}
        title={<><strong>@Maya</strong> pulled into the thread · <strong>assigned to Sarah</strong></>}
        meta="reviews move when ownership is explicit"
        chip={{ label: "assigned", kind: "pending" }}
      />
    </div>
  ),

  "comments/showcase/status": (
    <div className="pv">
      <div style={{ padding: 12, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <Chip kind="pending">open</Chip>
          <Chip kind="pending">in progress</Chip>
          <Chip kind="approved">resolved</Chip>
        </div>
        <p className="code-microcopy">seen by 3 · “did legal look at this?” answers itself</p>
      </div>
    </div>
  ),

  "comments/showcase/attachments": (
    <div className="pv">
      <ProvRow>source file · field photo · reference deck <ProvArrow /> in the thread</ProvRow>
      <ProvRow>👍 ✅ 🎉 <ProvArrow /> reactions clear the +1 noise</ProvRow>
    </div>
  ),

  "comments/showcase/recordings": (
    <div className="pv">
      <ProvRow>voice note on a cell <ProvArrow /> pinned where the work is</ProvRow>
      <ProvRow>screen recording on a draft <ProvArrow /> pinned where the work is</ProvRow>
    </div>
  ),

  "comments/showcase/webhooks": (
    <div className="pv">
      <DarkPanel footer="comment · reply · resolve · approval — full payload">
        {"POST /your-webhook\n{\n  \"event\": \"comment.added\",\n  \"documentId\": \"deck-q3\"\n}"}
      </DarkPanel>
    </div>
  ),

  "comments/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>Sidebar · Pin · Bubble · Composer · Standalone Thread</ProvRow>
      <ProvRow>wireframes + primitives for fully custom UIs</ProvRow>
      <ProvRow>themes · template variables · dark mode</ProvRow>
    </div>
  ),

  "comments/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>custom comment types · custom data on threads</ProvRow>
      <ProvRow>full CRUD REST API (v1 and v2)</ProvRow>
      <ProvRow>webhooks into your pipeline</ProvRow>
    </div>
  ),

  "comments/in-production/sales": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <Surface label="Proposal deck · Acme Corp">
        <Comment initials="LE" author="Legal" body="Tighten the SLA wording on slide 6." />
        <p className="code-microcopy">feedback lands on the asset, not in an email chain about it</p>
      </Surface>
    </div>
  ),

  "comments/in-production/fintech": (
    <div style={{ padding: 18 }}>
      <Surface label="forecast.xlsx · close week">
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink, #0b353b)" }}>
          <mark style={{ background: "color-mix(in srgb, var(--brand) 22%, transparent)", padding: "1px 2px" }}>cell B12 · Q3</mark>
        </p>
        <Comment initials="MA" author="Maya" body="Is this the revised Q3 number?" />
        <p className="code-microcopy">attributed, resolved, and on the record</p>
      </Surface>
    </div>
  ),

  "comments/in-production/ops": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <Surface label="Work order · WO-2271">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Chip kind="pending">internal</Chip>
          <span style={{ fontSize: 12, opacity: 0.7 }}>counterparty sees only what is meant for them</span>
        </div>
        <Comment initials="DS" author="Dispatch" body="Hold the shipment until the field record is signed." />
      </Surface>
    </div>
  ),

  "comments/in-production/ai": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <Surface label="Generated draft · run #8842">
        <Comment
          initials="RA"
          author="Review Agent"
          agent
          body="Refund exceeds policy by $40. Recommend partial approval."
          actions
        />
        <p className="code-microcopy">every finding is a comment with Approve and Reject attached</p>
      </Surface>
    </div>
  ),

  "comments/related/suggestions": (
    <div className="pv">
      <ProvRow>
        comment <ProvArrow /> a suggestion with a proposed change
      </ProvRow>
    </div>
  ),

  "comments/related/review-agents": (
    <div className="pv">
      <div style={{ padding: 12 }}>
        <Comment initials="RA" author="Review Agent" agent body="Finding lands as a comment, anchored to the work." />
      </div>
    </div>
  ),

  "comments/related/notifications": (
    <div className="pv">
      <NotifItem
        avatar={{ initials: "MA", kind: "human" }}
        title={<><strong>Maya</strong> replied to your thread</>}
        meta="the pipeline that keeps threads alive"
        chip={{ label: "inbox", kind: "approved" }}
      />
    </div>
  ),
};
