import type { CSSProperties, ReactElement, ReactNode } from "react";

import { Chip, DarkPanel } from "../demos";
import {
  AgentFindingCard,
  Av,
  Composer,
  IconArrowRight,
} from "./hero-surface";
import {
  accentVar,
  BRAND,
  Captioned,
  FACE,
  HeroFrame,
  HumanComment,
  Slot,
  YOUR_CARD,
  YOUR_TAG,
} from "./customization-shared";
import { VeltDefaultCommentDialog } from "./customization-default";

import "./customization-hero.css";

// Simulated-UI demo nodes for the HERO tabs + the "What it is" scene of the
// static /customization page. Consumed by app/customization/content.tsx via
// CUSTOMIZATION_HERO_DEMOS + WhatItIsScene. Every node is a believable, static
// in-product surface (no live SDK). The four hero tabs restyle the SAME review
// thread (agent finding "pricing claim needs a source" + Maya reply + composer)
// to show how far customization goes across the four layers: CSS variables,
// wireframes, primitives, and headless. Visuals reuse the shared toolkit
// (hero-surface.tsx + customization-shared.tsx) so they match the comments +
// home pages; anything bespoke is prefixed .czh- in customization-hero.css.
//
// These are pure, static server components: no "use client", no hooks, no
// state, and no event handlers. JSX is intentionally NOT wrapped in try/catch
// because React does not render synchronously, so a try/catch cannot catch a
// child's render error (enforced by the react-hooks/error-boundaries lint); the
// only try/catch here guards the non-JSX brandSurface() style computation.

// The finding + reply copy, reused across tabs so the thread stays identical
// while only its presentation changes.
const FINDING_BODY = "This pricing claim needs a source before it ships.";
const MAYA_REPLY = "Source added to the doc.";
const REPLY_PLACEHOLDER = "Reply to Maya…";

// The single comment shown, identically, on both sides of the What It Is
// before/after so the only difference the eye catches is the theming.
const SCENE_COMMENT = "Source added to the deck. Ready for your review before slide 4 ships.";

/**
 * The :root CSS-variable strip shown at the top of the CSS-theming hero tab, so
 * the surface reads as "these --velt-* variables were applied" rather than a
 * flat recolor.
 * @returns {ReactElement} A row of --velt-* token pills.
 */
function ThemeTokens(): ReactElement {
  const tokens: Array<{ key: string; value: string; swatch?: boolean }> = [
    { key: "--velt-light-mode-accent", value: "#4f46e5", swatch: true },
    { key: "--velt-border-radius-md", value: "12px" },
    { key: "--velt-default-font-family", value: "Inter" },
  ];
  return (
    <div className="czh-tokens">
      <span className="czh-tokens-label">:root</span>
      {tokens.map((token) => (
        <span className="czh-token" key={token.key}>
          {token?.swatch ? (
            <span className="czh-swatch" style={{ background: BRAND }} />
          ) : null}
          <span className="czh-token-key">{token.key}</span>
          <span className="czh-token-val">{token.value}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * The CSS-theming hero tab: a :root token strip above Velt's real default
 * comment dialog, brand-accented via the customer indigo (--velt-light-mode-accent), so
 * the tab reads as "this is the stock Velt dialog, themed with your brand".
 * @returns {ReactElement} The captioned, framed CSS-theming surface.
 */
function CssHeroDemo(): ReactElement {
  return (
    <Captioned note="--velt-light-mode-accent: #4f46e5 applied, no Shadow DOM change needed">
      <HeroFrame>
        <ThemeTokens />
        <div className="czh-css-stage">
          <VeltDefaultCommentDialog
            accent={BRAND}
            name="Maya"
            initial="M"
            time="2m"
            body="Source added to the deck, ready for your review before slide 4 ships."
          />
        </div>
      </HeroFrame>
    </Captioned>
  );
}

/**
 * The Wireframes hero tab: your own HTML structure expressed as labeled dashed
 * slots (header, thread, composer) while Velt keeps the behavior and the data
 * wiring inside each slot (the header slot binds a live {annotation.comments.length}).
 * @returns {ReactElement} The captioned, framed wireframe surface.
 */
function WireframesHeroDemo(): ReactElement {
  return (
    <Captioned note="<VeltCommentDialogWireframe> · your slots, Velt's behavior">
      <HeroFrame>
        <div className="czh-wire">
          <div className="czh-wire-bar">
            <span className="czh-wire-reg">
              <i />
              {"<VeltWireframe>"}
            </span>
            <span className="czh-wire-hint">cloned markup, Velt wires each slot</span>
          </div>
          <Slot label="<header slot>">
            <div className="czh-wire-hdr">
              <span className="czh-tmpl">{"{annotation.comments.length}"}</span>
              <span className="czh-wire-hdr-label">comments</span>
              <Chip kind="approved">synced</Chip>
            </div>
          </Slot>
          <Slot label="<thread slot>">
            <div className="czh-wire-stack">
              <AgentFindingCard
                name="Brand Agent"
                time="2m"
                body={FINDING_BODY}
                replies={2}
                actions={false}
              />
              <HumanComment
                name="Maya"
                initials="MA"
                time="1m"
                img={FACE.maya}
                body={MAYA_REPLY}
                end
              />
            </div>
          </Slot>
          <Slot label="<composer slot>">
            <Composer placeholder={REPLY_PLACEHOLDER} you={FACE.you} />
          </Slot>
        </div>
      </HeroFrame>
    </Captioned>
  );
}

// Full-width variant of the shared YOUR_TAG label: in the Primitives tab each
// library-chrome label (<Card>, <TextField>) reads as a header strip spanning
// the full card width, not a content-hugging chip. Scoped here so the other
// YOUR_TAG consumers (showcase, related) keep their existing look.
const PRIM_TAG: CSSProperties = {
  ...YOUR_TAG,
  display: "flex",
  width: "100%",
  boxSizing: "border-box",
};

/**
 * The Primitives hero tab: Velt primitive components composed inside your own
 * component library chrome, a shadcn Card wrapping the finding and a MUI
 * TextField wrapping the composer.
 * @returns {ReactElement} The captioned, framed primitives surface.
 */
function PrimitivesHeroDemo(): ReactElement {
  return (
    <Captioned note="<VeltCommentDialog> composed inside your own components">
      <HeroFrame>
        <div className="czh-prims">
          <div style={YOUR_CARD}>
            <span style={PRIM_TAG}>
              <span className="czh-fw-dot" style={{ background: "#111111" }} />
              {"<Card> · shadcn"}
            </span>
            <div className="czh-prim-body">
              <AgentFindingCard name="Brand Agent" time="2m" body={FINDING_BODY} replies={2} />
              <p className="czh-prim-code">{"<VeltCommentDialog annotationId={a.annotationId} />"}</p>
            </div>
          </div>
          <div style={YOUR_CARD}>
            <span style={PRIM_TAG}>
              <span className="czh-fw-dot" style={{ background: "#0a7ea4" }} />
              {"<TextField> · MUI"}
            </span>
            <div className="czh-mui">
              <span className="czh-mui-label">Reply</span>
              <Composer placeholder={REPLY_PLACEHOLDER} you={FACE.you} />
            </div>
          </div>
        </div>
      </HeroFrame>
    </Captioned>
  );
}

/**
 * The Headless hero tab: Velt's data arrives through useGetCommentAnnotations()
 * and you render your own pins on your own surface. The artboard is wrapped in
 * the customer accent so the bespoke teardrop pins pick up "your brand".
 * @returns {ReactElement} The captioned, framed headless surface.
 */
function HeadlessHeroDemo(): ReactElement {
  const hookSource =
    "const { data } = useGetCommentAnnotations();\n// data: CommentAnnotation[] (null while loading)";
  return (
    <Captioned note="useGetCommentAnnotations() · Velt's data, your render">
      <HeroFrame>
        <div className="czh-headless">
          <DarkPanel>{hookSource}</DarkPanel>
          <div className="czh-artboard" style={accentVar(BRAND)}>
            <div className="czh-art-head">
              <span>slide 4 · pricing</span>
              <span>your render</span>
            </div>
            <div className="czh-art-bars" aria-hidden="true">
              <span className="czh-art-bar" style={{ height: "46%" }} />
              <span className="czh-art-bar" style={{ height: "34%" }} />
              <span className="czh-art-bar is-hot" style={{ height: "82%" }} />
              <span className="czh-art-bar" style={{ height: "40%" }} />
            </div>
            <div className="czh-art-lines" aria-hidden="true">
              <span className="czh-art-line" />
              <span className="czh-art-line is-short" />
            </div>
            <span className="czh-pin czh-pin--a">
              <Av initials="BA" agent />
              <span className="czh-pin-count">2</span>
            </span>
            <span className="czh-pin czh-pin--b">
              <Av initials="MA" tone="a2" img={FACE.maya} />
              <span className="czh-pin-count">1</span>
            </span>
          </div>
          <span className="czh-render-note">
            <b>data.map()</b> your own pin component, on any surface
          </span>
        </div>
      </HeroFrame>
    </Captioned>
  );
}

/**
 * The "What it is" before/after scene: Velt's real default comment dialog on
 * the left and the SAME component restyled into a flat, Notion-like minimal look
 * on the right (variant="minimal"), illustrating "Velt owns the behavior, you
 * own the look." The identical comment content on both sides makes the restyle
 * the only visible change.
 * @returns {ReactElement} The before/after scene.
 */
export function WhatItIsScene(): ReactElement {
  return (
    <div className="czh-scene">
      <div className="czh-scene-head">
        <span className="czh-scene-tag">Sales deck · slide 4 · pricing</span>
        <span className="czh-scene-avs">
          <Av initials="BA" agent />
          <Av initials="MA" tone="a2" img={FACE.maya} />
          <Av initials="SR" tone="a3" img={FACE.sarah} />
        </span>
      </div>

      <div className="czh-scene-split">
        <div className="czh-col">
          <span className="czh-col-label czh-col-label--default">
            <i />
            Velt default
          </span>
          <VeltDefaultCommentDialog
            name="Maya"
            initial="M"
            time="1w"
            body={SCENE_COMMENT}
          />
        </div>

        <div className="czh-scene-mid" aria-hidden="true">
          <span className="czh-scene-arrow">
            <IconArrowRight />
          </span>
        </div>

        <div className="czh-col">
          <span className="czh-col-label czh-col-label--brand">
            <i />
            Your design system
          </span>
          <VeltDefaultCommentDialog
            variant="minimal"
            name="Maya"
            initial="M"
            time="1w"
            body={SCENE_COMMENT}
          />
        </div>
      </div>

      <p className="czh-scene-foot">
        <span className="czh-scene-pulse" />
        same behavior, data, and real-time sync · only the look changes
      </p>
    </div>
  );
}

// Keyed lookup the content module reads from for the hero tabs + the What It Is
// scene. Keys are local to the /customization page.
export const CUSTOMIZATION_HERO_DEMOS: Record<string, ReactNode> = {
  "hero/css": <CssHeroDemo />,
  "hero/wireframes": <WireframesHeroDemo />,
  "hero/primitives": <PrimitivesHeroDemo />,
  "hero/headless": <HeadlessHeroDemo />,
  "what-it-is/scene": <WhatItIsScene />,
};
