import type { CSSProperties, ReactElement, ReactNode } from "react";

import { Chip, CursorTag, DarkPanel } from "../demos";
import { BRAND, FACE, accentVar, YOUR_CARD, YOUR_TAG } from "./customization-shared";
import { Av, IconBubble } from "./hero-surface";
import { VeltDefaultCommentDialog } from "./customization-default";

import "./customization-related.css";

// Simulated-UI demo nodes for the /customization page "Make it yours" card
// previews and the "Related" card visuals. Authored as a standalone section
// module (see customization-shared.tsx) so it can be assembled alongside the
// hero, showcase, and gallery modules. Every artifact reuses the shared
// product-surface toolkit (hero-surface.tsx + demos.tsx) and the global
// .cmh-* / .cmh-cc* / .afc / .chip / .av-c atoms, with only the genuinely new
// chrome living in ./customization-related.css (all .czr- prefixed). Visuals
// are static, not live SDK instances. Copy avoids em/en dashes per the page
// content spec. Components return JSX directly (no try/catch) so they satisfy
// the repo's react-hooks/error-boundaries lint rule; render failures surface
// through a page-level error boundary instead.

// Repeated persona / copy strings, hoisted so a single edit stays consistent
// across the comments thread and the notification inbox.
const AGENT_NAME = "Brand Agent";

// Editable CSS variables shown in the Themes Playground panel. `swatch` is the
// rendered color chip (omitted for non-color tokens).
const THEME_VARIABLES: ReadonlyArray<{ name: string; value: string; swatch?: string }> = [
  { name: "--velt-light-mode-accent", value: "#4f46e5", swatch: BRAND },
  { name: "--velt-light-mode-background-0", value: "#ffffff", swatch: "#ffffff" },
  { name: "--velt-border-radius-md", value: "12px" },
  { name: "--velt-default-font-family", value: "Inter" },
];

// The customization spectrum, top (fastest) to bottom (fullest control), plus
// the behavior axis and dark mode. Rendered as a structured, tagged stack.
const SYSTEM_LAYERS: ReadonlyArray<{ name: string; sub: string; tag: string }> = [
  { name: "CSS variables", sub: "recolor, respace, retype", tag: "themeable" },
  { name: "Wireframes", sub: "your HTML per slot", tag: "layout" },
  { name: "Primitives", sub: "wrap in MUI, shadcn, Radix", tag: "your UI" },
  { name: "Headless hooks", sub: "Velt's data, your render", tag: "headless" },
  { name: "Events + APIs", sub: ".on(), hooks, REST", tag: "behavior" },
  { name: "Dark mode", sub: "theme presets included", tag: "built in" },
];

/**
 * Bell glyph for the notification inbox header (inherits currentColor).
 * @returns {ReactElement} The bell icon.
 */
function NotifBellIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

/**
 * A single notification inbox row: an unread dot, an avatar, a title with an
 * optional inline chip, a meta line, and a timestamp. Reuses the global
 * .cmh-inrow atoms.
 * @param {{ unread: boolean; avatar: ReactNode; title: ReactNode; meta?: ReactNode; time: string }} props Row content.
 * @returns {ReactElement} The inbox row.
 */
function InboxRow({
  unread,
  avatar,
  title,
  meta,
  time,
}: {
  unread: boolean;
  avatar: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
  time: string;
}): ReactElement {
  return (
    <div className="cmh-inrow">
      <span className={unread ? "cmh-unread" : "cmh-unread read"} />
      {avatar}
      <div className="cmh-inmain">
        <p className="t">{title}</p>
        {meta ? <p className="m">{meta}</p> : null}
      </div>
      <span className="cmh-when">{time}</span>
    </div>
  );
}

// Full-width variant of the shared YOUR_TAG label for the Themes Playground
// chrome: the playground.velt.dev header reads as a bar spanning the full card
// width (top corners rounded to match YOUR_CARD, keeping the shared bottom
// hairline, background, padding, and mono font weight) rather than a
// content-hugging chip. Kept as flex so the czr-live-dot stays a rendered flex
// item pinned to the left with the existing gap. Scoped here so other YOUR_TAG
// consumers keep their compact look; mirrors the Primitives header strip.
const PG_TAG: CSSProperties = {
  ...YOUR_TAG,
  display: "flex",
  width: "100%",
  boxSizing: "border-box",
  borderTopLeftRadius: 14,
  borderTopRightRadius: 14,
};

/**
 * Make-it-yours preview: the Themes Playground. A YOUR_CARD labeled
 * playground.velt.dev with a live component preview (an accent-themed pin and
 * button) above the editable --velt-* CSS variable list with color swatches.
 * @returns {ReactElement} The design-tools preview.
 */
function DesignToolsPreview(): ReactElement {
  return (
    <div className="pv">
      <div style={YOUR_CARD}>
        <span style={PG_TAG}>
          <i className="czr-live-dot" />
          playground.velt.dev
        </span>
        <div className="czr-pg" style={accentVar(BRAND)}>
          <div className="czr-pg-live">
            <span className="czr-pg-live-label">live preview</span>
            <div className="czr-pg-stage">
              <span className="cmh-pin">
                <IconBubble />2
              </span>
              <button type="button" className="czr-btn">Comment</button>
              <Av initials="MA" tone="a2" img={FACE.maya} />
            </div>
          </div>
          <div className="czr-vars">
            <span className="czr-vars-label">theme.css</span>
            {THEME_VARIABLES.map((variable) => (
              <div className="czr-var" key={variable.name}>
                <span className="czr-var-name">{variable.name}</span>
                <span className="czr-var-val">
                  {variable.swatch ? (
                    <span className="czr-swatch" style={{ background: variable.swatch }} />
                  ) : null}
                  {variable.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Make-it-yours preview: the component system as a structured spectrum. A
 * labeled card whose body is a vertical run of layers (CSS to headless, then
 * behavior and dark mode), each with an accent dot, a sub-descriptor, and a
 * capability tag.
 * @returns {ReactElement} The component-system preview.
 */
function ComponentSystemPreview(): ReactElement {
  return (
    <div className="pv">
      <div className="czr-sys">
        <div className="czr-sys-head">
          <span className="czr-sys-imp">@veltdev/react</span>
          <span className="czr-sys-pill">one system</span>
        </div>
        <ol className="czr-sys-list">
          {SYSTEM_LAYERS.map((layer) => (
            <li className="czr-sys-row" key={layer.name}>
              <span className="czr-sys-dot" />
              <span className="czr-sys-main">
                <span className="czr-sys-name">{layer.name}</span>
                <span className="czr-sys-sub">{layer.sub}</span>
              </span>
              <span className="czr-sys-tag">{layer.tag}</span>
            </li>
          ))}
        </ol>
        <div className="czr-sys-foot">
          all themeable
          <span className="czr-sys-foot-pill">stays live</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Related visual: Velt's real default comment dialog, brand-themed. An anchored
 * pin and the surface breadcrumb sit above a compact VeltDefaultCommentDialog
 * carrying the customer accent, so the "Comments" card previews the exact
 * surface teams customize most.
 * @returns {ReactElement} The comments visual.
 */
function CommentsVisual(): ReactElement {
  return (
    <div className="pv">
      <div className="czr-cmts" style={accentVar(BRAND)}>
        <div className="czr-cmts-top">
          <span className="cmh-pin">
            <IconBubble />2
          </span>
          <span className="czr-cmts-file">Sales deck · slide 4 · pricing</span>
        </div>
        <VeltDefaultCommentDialog
          accent={BRAND}
          compact
          name="Maya"
          initial="M"
          time="1w"
          body="Source added to the deck, ready for review before slide 4 ships."
        />
      </div>
    </div>
  );
}

/**
 * Related visual: a customizable notification inbox. A labeled feed header over
 * three rows, led by the agent flagging a pricing claim, then a human reply and
 * an approval.
 * @returns {ReactElement} The notifications visual.
 */
function NotificationsVisual(): ReactElement {
  return (
    <div className="pv">
      <div className="czr-inbox">
        <div className="czr-inbox-head">
          <NotifBellIcon />
          Notifications
          <span className="czr-inbox-count">3 new</span>
        </div>
        <div className="czr-inbox-rows">
          <InboxRow
            unread
            avatar={<Av initials="BA" agent />}
            title={<><b>{AGENT_NAME}</b> flagged pricing <Chip kind="agent">agent</Chip></>}
            meta={<span className="quote">“conflicts with the rate table on slide 4”</span>}
            time="2m"
          />
          <InboxRow
            unread
            avatar={<Av initials="MA" tone="a2" img={FACE.maya} />}
            title={<><b>Maya</b> replied to your thread</>}
            meta="Sales deck · slide 4"
            time="14m"
          />
          <InboxRow
            unread={false}
            avatar={<Av initials="SR" tone="a3" img={FACE.sarah} />}
            title={<><b>Sarah</b> approved the change <Chip kind="approved">approved</Chip></>}
            meta="filing-q3 · signed off"
            time="1h"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Related visual: themeable presence. A live tag over an overlapping avatar
 * cluster (humans plus the agent, with a +N overflow) and two labeled cursors
 * for a human and an agent.
 * @returns {ReactElement} The presence visual.
 */
function PresenceVisual(): ReactElement {
  return (
    <div className="pv">
      <div className="czr-presence">
        <div className="czr-presence-head">
          <span className="cmh-live">
            <i />
            live
          </span>
          <span className="czr-presence-label">7 active</span>
        </div>
        <div className="czr-cluster">
          <Av initials="MA" tone="a2" img={FACE.maya} />
          <Av initials="SR" tone="a3" img={FACE.sarah} />
          <Av initials="JD" tone="a1" img={FACE.jordan} />
          <Av initials="YO" tone="a1" img={FACE.you} />
          <Av initials="BA" agent />
          <span className="czr-more">+2</span>
        </div>
        <div className="czr-cursors">
          <CursorTag name="Maya" />
          <CursorTag name="AI" kind="agent" />
        </div>
      </div>
    </div>
  );
}

/**
 * Related visual: the events, hooks, and REST surface. Three mono tabs over a
 * dark panel showing an event, a headless hook, and a REST call with its 200
 * response.
 * @returns {ReactElement} The webhooks visual.
 */
function WebhooksVisual(): ReactElement {
  return (
    <div className="pv czr-hooks">
      <div className="czr-hooks-tabs">
        <span className="czr-tab czr-tab--on">Events</span>
        <span className="czr-tab">Hooks</span>
        <span className="czr-tab">REST</span>
      </div>
      <DarkPanel footer="events · hooks · REST, one surface">
        {"event: addCommentAnnotation\nuseAddComment()\nPOST /v2/commentannotations/comments/add → 200 OK"}
      </DarkPanel>
    </div>
  );
}

// Keyed lookup the assembler merges into CUSTOMIZATION_DEMOS. Keys are local to
// the /customization page's Make-it-yours + Related sections.
export const CUSTOMIZATION_RELATED_DEMOS: Record<string, ReactNode> = {
  "make-it-yours/design-tools": <DesignToolsPreview />,
  "make-it-yours/component-system": <ComponentSystemPreview />,
  "related/comments": <CommentsVisual />,
  "related/notifications": <NotificationsVisual />,
  "related/presence": <PresenceVisual />,
  "related/webhooks": <WebhooksVisual />,
};
