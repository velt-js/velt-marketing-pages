import type { ReactNode } from "react";

import { AvatarStack, Chip, DarkPanel, NotifItem, ProvRow, ProvArrow } from "../demos";
import {
  Av,
  Composer,
  DEL_STYLE,
  FACES,
  Frame,
  IconBubble,
  IconCheck,
  IconReply,
  IconSearch,
  IconX,
  INS_STYLE,
} from "./hero-surface";

// Comments-page personas mapped to shared headshots.
const FACE = {
  maya: FACES.fenne,
  sarah: FACES.hope,
  dev: FACES.ethan,
  you: FACES.jeff,
} as const;

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

export const COMMENTS_DEMOS: Record<string, ReactNode> = {
  "comments/hero/freestyle": (
    <Frame
      app="SD"
      crumb={<><b>Sales deck</b> <span className="sep">/</span> slide 4 · pricing</>}
      users={[{ initials: "SR", tone: "a3", img: FACE.sarah }, { initials: "MA", tone: "a2", img: FACE.maya }, { initials: "BA", agent: true }]}
    >
      <div className="cmh-chart">
        <div className="cmh-bars">
          <div className="bar" style={{ height: "46%" }} />
          <div className="bar" style={{ height: "64%" }} />
          <div className="bar hot" style={{ height: "90%" }}>
            <span className="cmh-pin"><IconBubble />2</span>
          </div>
          <div className="bar" style={{ height: "72%" }} />
        </div>
        <div className="cmh-xrow">
          <span>Q1</span>
          <span>Q2</span>
          <span className="hot">Q3</span>
          <span>Q4</span>
        </div>
      </div>

      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="BA" agent />
          Brand Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">2m</span>
        </div>
        <p className="fb">This pricing claim conflicts with the rate table on slide 4.</p>
        <p className="cmh-suggest">
          <span className="lbl">Suggested fix</span>
          <span className="body">
            <del style={DEL_STYLE}>$18 / seat</del> <span style={{ color: "var(--vlp-color-text-subtle)" }}>→</span>{" "}
            <ins style={INS_STYLE}>$24 / seat</ins>
          </span>
        </p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Approve</button>
          <button type="button" className="cmh-btn reject"><IconX />Reject</button>
        </div>
      </div>

      <div className="cmh-foot">
        <span className="cmh-rx on">👍 2</span>
        <span className="cmh-rx">✅ 1</span>
        <span className="cmh-reply"><IconReply />Maya replied</span>
      </div>

      <Composer placeholder="Reply or @mention…" />
    </Frame>
  ),

  "comments/hero/popover": (
    <Frame
      app="LP"
      crumb={<><b>velt.dev</b> <span className="sep">/</span> hero headline</>}
      users={[{ initials: "SR", tone: "a3", img: FACE.sarah }, { initials: "DV", tone: "a1", img: FACE.dev }]}
    >
      <p className="cmh-doc" style={{ fontFamily: "var(--vlp-font-heading)", fontSize: 19, lineHeight: 1.35, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--vlp-color-ink)" }}>
        The fastest way to <span className="cmh-mark">ship collaboration</span> in your product.
      </p>

      <div className="thread cmh-pop">
        <div className="thread-head">
          <Av initials="SR" tone="a3" img={FACE.sarah} />
          <span className="who">Sarah</span>
          <span className="cmh-role">· Design</span>
          <span className="cmh-when">just now</span>
        </div>
        <p className="thread-body">Can we A/B this against “add collaboration in an afternoon”? @Dev</p>
        <div className="cmh-foot">
          <span className="cmh-rx on">👍 3</span>
          <span className="cmh-reply"><IconReply />1 reply</span>
        </div>
      </div>

      <Composer placeholder="Reply to Sarah…" />
    </Frame>
  ),

  "comments/hero/text": (
    <Frame
      app="TT"
      crumb={<><b>contract.md</b> <span className="sep">/</span> Tiptap</>}
      users={[{ initials: "MA", tone: "a2", img: FACE.maya }, { initials: "SR", tone: "a3", img: FACE.sarah }]}
    >
      <div className="cmh-toolbar">
        <span className="tb" style={{ fontWeight: 800 }}>B</span>
        <span className="tb" style={{ fontStyle: "italic" }}>I</span>
        <span className="tb" style={{ textDecoration: "underline" }}>U</span>
        <span className="vbar" />
        <span className="tb">H1</span>
        <span className="tb">❝</span>
        <span className="vbar" />
        <span className="tb" style={{ fontFamily: "var(--vlp-font-mono)", fontSize: 10.5 }}>&lt;/&gt;</span>
      </div>

      <p className="cmh-doc">
        7.2 The Provider shall <span className="cmh-mark">indemnify and hold harmless</span> the Client against all claims arising from the Services.
      </p>

      <div className="thread cmh-pop">
        <div className="thread-head">
          <Av initials="MA" tone="a2" img={FACE.maya} />
          <span className="who">Maya</span>
          <span className="cmh-role">· Legal</span>
          <span className="cmh-when">14m</span>
        </div>
        <p className="thread-body">This clause needs a liability cap before we send. @Sarah can you confirm scope?</p>
        <div className="cmh-foot">
          <span className="cmh-rx">✅ 1</span>
          <span className="cmh-reply"><IconReply />2 replies</span>
        </div>
      </div>

      <Composer placeholder="Comment on the selection…" />
    </Frame>
  ),

  "comments/hero/inbox": (
    <Frame
      app="VC"
      crumb={<><b>Comments</b> <span className="sep">/</span> inbox</>}
      right={<span className="cmh-search"><IconSearch />Search threads</span>}
    >
      <div className="cmh-filters">
        <span className="cmh-ft on">All</span>
        <span className="cmh-ft">Unresolved</span>
        <span className="cmh-ft">Mentions</span>
        <span className="cmh-ft">Agents</span>
      </div>

      <div className="cmh-group">Today</div>
      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="BA" agent />
        <div className="cmh-inmain">
          <p className="t"><b>Brand Agent</b> flagged a pricing claim <span className="chip chip-agent" style={{ marginLeft: 4 }}>agent</span></p>
          <p className="m"><span className="quote">“conflicts with the rate table on slide 4”</span></p>
        </div>
        <span className="cmh-when">2m</span>
      </div>
      <div className="cmh-inrow">
        <span className="cmh-unread" />
        <Av initials="MA" tone="a2" img={FACE.maya} />
        <div className="cmh-inmain">
          <p className="t"><b>Maya</b> mentioned you on Clause 7 <span className="chip chip-pending" style={{ marginLeft: 4 }}>mention</span></p>
          <p className="m"><span className="quote">“needs a liability cap before we send”</span></p>
        </div>
        <span className="cmh-when">14m</span>
      </div>

      <div className="cmh-group">Earlier</div>
      <div className="cmh-inrow">
        <span className="cmh-unread read" />
        <Av initials="SR" tone="a3" img={FACE.sarah} />
        <div className="cmh-inmain">
          <p className="t"><b>Sarah</b> resolved the Q3 forecast thread <span className="chip chip-approved" style={{ marginLeft: 4 }}>resolved</span></p>
          <p className="m">forecast.xlsx · cell B12</p>
        </div>
        <span className="cmh-when">1h</span>
      </div>
    </Frame>
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
          <mark style={{ background: "color-mix(in srgb, var(--vlp-color-accent) 22%, transparent)", padding: "1px 2px" }}>cell B12 · Q3</mark>
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
