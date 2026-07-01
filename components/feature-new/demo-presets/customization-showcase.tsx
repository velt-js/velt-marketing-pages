import type { ReactNode } from "react";

import { AuditLog, Chip, DarkPanel } from "../demos";
import {
  AgentFindingCard,
  Av,
  Composer,
  Frame,
  IconArrowRight,
  IconBubble,
  IconCheck,
} from "./hero-surface";
import {
  accentVar,
  BRAND,
  FACE,
  Slot,
  YOUR_CARD,
  YOUR_TAG,
} from "./customization-shared";
import { VeltDefaultCommentDialog } from "./customization-default";

import "./customization-showcase.css";

// Simulated-UI demo nodes for the SHOWCASE section of the static /customization
// page. This module owns the 10 Showcase card previews (keys "showcase/*"); the
// page's other artifacts live in the sibling customization section modules. Each
// tile is a DISTINCT, believable in-product surface that communicates exactly one
// customization idea, all staying on the shared "Sales deck / slide 4 · pricing"
// narrative (actors: Brand Agent, Maya, Sarah, Jordan, You). Every bespoke class
// is prefixed czs- (see customization-showcase.css); shared atoms come from
// hero-surface.tsx / demos.tsx / customization-shared.tsx. Visuals are simulated,
// not live SDK instances. Server component: no hooks, state, or handlers.

/** @returns {JSX.Element} Padlock glyph used for the read-only (viewer) state. */
function IconLock(): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/**
 * A compact plain comment row (headshot or agent avatar, name, optional time,
 * body) used inside several showcase tiles. Mirrors the shared .cmh-cmt voice
 * with tighter chrome so it fits a bento card. Kept try/catch-free because the
 * repo's react-hooks/error-boundaries rule forbids constructing JSX inside a
 * try/catch; a render error surfaces to the nearest error boundary instead.
 * @param {{ name: string; initials: string; body: ReactNode; time?: string; img?: string; agent?: boolean }} props Comment content.
 * @returns {ReactNode} The comment row.
 */
function PlainComment({
  name,
  initials,
  body,
  time,
  img,
  agent,
}: {
  name: string;
  initials: string;
  body: ReactNode;
  time?: string;
  img?: string;
  agent?: boolean;
}): ReactNode {
  return (
    <div className="czs-cmt">
      <Av initials={initials} tone="a2" agent={agent} img={img} />
      <div className="czs-cmt-main">
        <div className="czs-cmt-head">
          <span className="czs-cmt-name">{name}</span>
          {time ? <span className="czs-cmt-time">{time}</span> : null}
        </div>
        <p className="czs-cmt-body">{body}</p>
      </div>
    </div>
  );
}

/**
 * A single key/value record row for the custom-data tile: a mono field key on
 * the left and the app's value (optionally accent-colored) on the right. Kept
 * try/catch-free for the same react-hooks/error-boundaries reason as
 * PlainComment above.
 * @param {{ recordKey: string; children: ReactNode; accent?: boolean }} props Row content.
 * @returns {ReactNode} The record row.
 */
function KeyValueRow({
  recordKey,
  children,
  accent,
}: {
  recordKey: string;
  children: ReactNode;
  accent?: boolean;
}): ReactNode {
  return (
    <div className="czs-kv">
      <span className="czs-kv-key">{recordKey}</span>
      <span className={accent ? "czs-kv-val czs-kv-accent" : "czs-kv-val"}>{children}</span>
    </div>
  );
}

// Keyed lookup the customization content module reads from. Keys are local to
// the Showcase section of the /customization page.
export const CUSTOMIZATION_SHOWCASE_DEMOS: Record<string, ReactNode> = {
  // 01 · CSS theming: a --velt-* token card visibly recoloring a live comment +
  // composer. The brand accent is set locally with accentVar(BRAND), so the
  // swatch, the @mention, and the composer send button all switch to the brand.
  "showcase/css-theming": (
    <div className="pv">
      <div className="czs-css" style={accentVar(BRAND)}>
        <div className="czs-tokens">
          <span className="czs-tokens-tab">your-theme.css</span>
          <span className="czs-token"><i className="czs-swatch" />--velt-light-mode-accent<b>#4f46e5</b></span>
          <span className="czs-token">--velt-border-radius-md<b>14px</b></span>
          <span className="czs-token">--velt-default-font-family<b>Inter Tight</b></span>
        </div>
        <div className="czs-css-stage">
          <VeltDefaultCommentDialog
            accent={BRAND}
            compact
            name="Maya"
            initial="M"
            time="2m"
            body="Source added to the deck, ready for review before slide 4 ships."
          />
        </div>
        <span className="czs-sd"><IconCheck /> the same default dialog, recolored by your variables</span>
      </div>
    </div>
  ),

  // 02 · Wireframes: your own HTML layout per slot (header, thread, composer)
  // with Velt keeping behavior + data. Labeled dashed slots make the structure
  // explicit; add / remove / reorder is the story.
  "showcase/wireframes": (
    <div className="pv">
      <div className="czs-wf">
        <Slot label="<header slot>">
          <div className="czs-wf-header">
            <span className="czs-wf-count">3 comments</span>
            <span className="czs-wf-resolve">Resolve all</span>
          </div>
        </Slot>
        <Slot label="<thread slot>">
          <PlainComment name="Maya" initials="MA" img={FACE.maya} time="1m" body="Source added to the deck." />
        </Slot>
        <Slot label="<composer slot>">
          <Composer placeholder="Reply to Maya…" you={FACE.you} />
        </Slot>
      </div>
    </div>
  ),

  // 03 · Primitives: a real Velt component (the agent finding card, tagged as
  // <VeltCommentDialog>) composed inside your own UI-library chrome (shadcn Card
  // + MUI Button), reusing the shared YOUR_CARD / YOUR_TAG helpers.
  "showcase/primitives": (
    <div className="pv">
      <div style={YOUR_CARD}>
        <span
          style={{
            ...YOUR_TAG,
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
          }}
        >
          {"<Card> · shadcn/ui"}
        </span>
        <div className="czs-prim-body">
          <span className="czs-prim-badge"><i />{"Velt primitive · <VeltCommentDialog>"}</span>
          <AgentFindingCard
            name="Brand Agent"
            time="2m"
            body="This pricing claim needs a source before it ships."
            replies={2}
            actions={false}
          />
          <div className="czs-prim-actions">
            <button type="button" className="cmh-btn approve">Accept</button>
            <button type="button" className="cmh-btn reject">Reject</button>
            <span className="czs-prim-lib">{"<Button> · MUI"}</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // 04 · Headless: useGetCommentAnnotations() returns the data, you render 100% of
  // the UI, even on a surface Velt can't draw. Hook payload up top, your own
  // custom pins placed on a bare canvas / PDF / video-timeline surface below.
  "showcase/headless": (
    <div className="pv">
      <div className="czs-hl">
        <DarkPanel>{"const { data } = useGetCommentAnnotations();\n// CommentAnnotation[] -> your own pins"}</DarkPanel>
        <div className="czs-canvas">
          <span className="czs-canvas-tag">{"your <canvas> · PDF · video timeline"}</span>
          <span className="cmh-pin czs-pin-a"><IconBubble />2</span>
          <span className="cmh-pin ghost czs-pin-b"><IconBubble />1</span>
        </div>
      </div>
    </div>
  ),

  // 05 · Mix per surface: the dialog wireframed and the sidebar used as a
  // primitive, side by side, unified under one VeltWireframe registry (footer).
  "showcase/mix": (
    <div className="pv">
      <div className="czs-mix">
        <div className="czs-mix-col">
          <p className="czs-cap">dialog · wireframe</p>
          <Slot label="<slot>">
            <PlainComment name="Maya" initials="MA" img={FACE.maya} body="Source added." />
          </Slot>
        </div>
        <div className="czs-mix-col">
          <p className="czs-cap">sidebar · primitive</p>
          <div className="czs-mix-prim">
            <span className="czs-mix-prim-tag">{"<Sidebar>"}</span>
            <div className="czs-mix-prim-body">
              <PlainComment name="Brand Agent" initials="BA" agent body="Flagged pricing." />
            </div>
          </div>
        </div>
        <span className="czs-mix-reg"><i />{"one <VeltWireframe> registry · CSS themes both"}</span>
      </div>
    </div>
  ),

  // 06 · Your own data in the UI: your app's fields rendered inside a Velt thread
  // with template variables + VeltData, and read back out (the status pill in the
  // frame bar reads comment.status). Custom fields shown as record rows.
  "showcase/custom-data": (
    <div className="pv">
      <div className="czs-cd">
        <Frame
          app="SD"
          crumb={<><b>Thread</b> <span className="sep">/</span> your fields</>}
          right={<Chip kind="pending">in review</Chip>}
        >
          <div className="czs-cd-body">
            <PlainComment name="Brand Agent" initials="BA" agent time="2m" body="This pricing claim needs a source." />
            <div className="czs-cd-fields">
              <KeyValueRow recordKey="custom.channel" accent>#brand-review</KeyValueRow>
              <KeyValueRow recordKey="deal.stage">Proposal sent</KeyValueRow>
              <KeyValueRow recordKey={"{priority}"}><Chip kind="rejected">P1</Chip></KeyValueRow>
            </div>
          </div>
        </Frame>
      </div>
    </div>
  ),

  // 07 · Conditional UI + hidden features: velt-if renders differently by role.
  // Reviewer sees the full surface with parts switched on (reply avatars,
  // priority); viewer is read-only with those same parts off by default.
  "showcase/conditional": (
    <div className="pv">
      <div className="czs-cond">
        <div className="czs-cond-col czs-cond-col--on">
          <span className="czs-cond-tag">{"velt-if · reviewer"}</span>
          <div className="czs-cond-avs">
            <Av initials="MA" tone="a2" img={FACE.maya} />
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            <Av initials="BA" agent />
          </div>
          <p className="czs-cond-body">Pricing claim needs a source.</p>
          <div className="czs-cond-btns">
            <button type="button" className="cmh-btn approve">Accept</button>
            <button type="button" className="cmh-btn reject">Reject</button>
          </div>
          <div className="czs-flags">
            <span className="czs-flag czs-flag--on"><i />reply avatars</span>
            <span className="czs-flag czs-flag--on"><i />priority</span>
          </div>
        </div>
        <div className="czs-cond-col">
          <span className="czs-cond-tag czs-cond-tag--muted">viewer</span>
          <p className="czs-cond-body">Pricing claim needs a source.</p>
          <span className="czs-cond-ro"><IconLock />read only</span>
          <div className="czs-flags">
            <span className="czs-flag czs-flag--off"><i />reply avatars</span>
            <span className="czs-flag czs-flag--off"><i />priority</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // 08 · UI variants: a reusable named variant chosen once (compact) and applied
  // consistently across every surface (comments, sidebar, inbox).
  "showcase/variants": (
    <div className="pv">
      <div className="czs-var">
        <div className="czs-var-list">
          <p className="czs-cap">variants</p>
          <span className="czs-var-opt czs-var-opt--on">compact<IconCheck /></span>
          <span className="czs-var-opt">full</span>
          <span className="czs-var-opt">inline</span>
        </div>
        <div className="czs-var-apply">
          <p className="czs-cap">applied everywhere</p>
          <span className="czs-var-row"><i className="czs-var-dot" />Comments<Chip kind="approved">compact</Chip></span>
          <span className="czs-var-row"><i className="czs-var-dot" />Sidebar<Chip kind="approved">compact</Chip></span>
          <span className="czs-var-row"><i className="czs-var-dot" />Inbox<Chip kind="approved">compact</Chip></span>
        </div>
      </div>
    </div>
  ),

  // 09 · Extend behavior: subscribe to events (.on), mutate through hooks, and
  // call the REST APIs. An activity log ties a fired event to a hook mutation to
  // a 200 from POST /v2/commentannotations/comments/add.
  "showcase/extend-behavior": (
    <div className="pv">
      <div className="czs-log">
        <AuditLog
          head={{ left: <>commentElement<span className="czs-log-on">{".on('commentPinClicked')"}</span></>, right: "live" }}
          rows={[
            { ts: "now", ev: <><strong>commentPinClicked</strong> fired · pinned to slide 4</>, chip: { label: "event", kind: "approved" } },
            { ts: "now", ev: <><strong>useAddComment()</strong> mutate via hook</>, chip: { label: "hook", kind: "pending" } },
            { ts: "now", ev: <><strong>POST</strong> /v2/commentannotations/comments/add</>, chip: { label: "200", kind: "approved" } },
          ]}
        />
      </div>
    </div>
  ),

  // 10 · Design to code, agent-ready: a deterministic, documented model turns a
  // Figma frame into a working Velt UI (a wireframe slot + a themed comment).
  "showcase/design-to-code": (
    <div className="pv">
      <div className="czs-d2c">
        <div className="czs-panel">
          <span className="czs-panel-tab"><i />Figma · frame</span>
          <div className="czs-fig-art">
            <span className="czs-fig-bar" />
            <span className="czs-fig-line" />
            <span className="czs-fig-line czs-fig-line--sm" />
          </div>
        </div>
        <span className="czs-d2c-arrow"><IconArrowRight /></span>
        <div className="czs-panel">
          <span className="czs-panel-tab"><i />Velt · generated</span>
          <div className="czs-gen-body">
            <div className="czs-gen-slot">
              <span className="czs-gen-slot-label">{"<wireframe>"}</span>
              <PlainComment name="Maya" initials="MA" img={FACE.maya} body="Looks good." />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
