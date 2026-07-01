import type { ReactNode } from "react";

import { Chip, CursorTag } from "../demos";
import { Av, IconBubble } from "./hero-surface";
import { FACE } from "./customization-shared";

import "./customization-gallery.css";

// Static demo nodes for the /customization "In production" examples gallery
// (rendered by components/feature-new/ExamplesGallery.tsx). Each value is a
// compact, believable mini-representation of a familiar product pattern, showing
// Velt styled to look like a tool users already know. These are simulated
// surfaces, not live SDK instances. The keys here (gallery/*) are consumed by
// the customization content module. Styling lives in the sibling
// customization-gallery.css; personas + avatars come from the shared toolkit.

/**
 * Play triangle glyph for the video scrubber preview (inherits currentColor).
 * @returns {JSX.Element} A filled play icon.
 */
function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/**
 * Headphones glyph for the Slack-style huddle tile (inherits currentColor).
 * @returns {JSX.Element} A headphones icon.
 */
function IconHeadset() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13a8 8 0 0 1 16 0" />
      <rect x="2.5" y="13" width="4" height="7" rx="1.6" />
      <rect x="17.5" y="13" width="4" height="7" rx="1.6" />
    </svg>
  );
}

/**
 * Bell glyph for the Knock-style notification inbox header (inherits currentColor).
 * @returns {JSX.Element} A bell icon.
 */
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

// Bar heights (percent) for the huddle waveform; kept module-level so the
// component body only constructs JSX (the lint rule forbids JSX in try/catch).
const WAVEFORM_BAR_HEIGHTS = [40, 72, 100, 55, 84, 45, 64];

/**
 * A small static audio waveform used to signal a live huddle.
 * @returns {JSX.Element} A row of accent bars of varying heights.
 */
function Waveform() {
  return (
    <span className="czg-wave" aria-hidden="true">
      {WAVEFORM_BAR_HEIGHTS.map((barHeight, barIndex) => (
        <span key={`wave-${barIndex}`} className="czg-wave-bar" style={{ height: `${barHeight}%` }} />
      ))}
    </span>
  );
}

// Keyed lookup consumed by the customization content module (galleryContent).
// Exactly the seven "In production" gallery visuals, in gallery order.
export const CUSTOMIZATION_GALLERY_DEMOS: Record<string, ReactNode> = {
  // 1. Canvas comments, like Figma: a design frame on a dotted canvas with live
  // cursors (a human and an agent) and a pinned comment bubble.
  "gallery/canvas": (
    <div className="czg czg-canvas">
      <div className="czg-canvas-frame">
        <span className="czg-canvas-frame-tag">Slide 4 · pricing</span>
        <span className="czg-canvas-bar" style={{ width: "72%" }} />
        <div className="czg-canvas-chart">
          <span style={{ height: "42%" }} />
          <span style={{ height: "78%" }} />
          <span style={{ height: "56%" }} />
        </div>
      </div>
      <span className="czg-canvas-pin cmh-pin"><IconBubble />2</span>
      <CursorTag name="Maya" kind="approved" style={{ position: "absolute", top: 14, right: 16 }} />
      <CursorTag name="Brand Agent" kind="agent" style={{ position: "absolute", bottom: 12, left: 18 }} />
    </div>
  ),

  // 2. Cell comments, like Google Sheets: a pricing grid with one commented cell
  // (accent outline + unread dot).
  "gallery/cell": (
    <div className="czg czg-sheet-wrap">
      <div className="czg-sheet-head">
        <span className="czg-sheet-ic" aria-hidden="true" />
        forecast.xlsx
        <span className="czg-sheet-sub">Q3 pricing</span>
      </div>
      <div className="czg-sheet">
        <span className="czg-ch" />
        <span className="czg-ch">Plan</span>
        <span className="czg-ch">Q2</span>
        <span className="czg-ch">Q3</span>

        <span className="czg-ch">1</span>
        <span className="czg-cd czg-cd-strong">Starter</span>
        <span className="czg-cd">$29</span>
        <span className="czg-cd">$35</span>

        <span className="czg-ch">2</span>
        <span className="czg-cd czg-cd-strong">Pro</span>
        <span className="czg-cd">$79</span>
        <span className="czg-cd czg-cd-hl">$85<span className="czg-cd-dot" /></span>
      </div>
    </div>
  ),

  // 3. Video comments, like Frame.io: a dark player with a scrubber and a
  // frame-accurate comment pin at 0:42.
  "gallery/video": (
    <div className="czg czg-video">
      <div className="czg-video-screen">
        <span className="czg-play"><IconPlay /></span>
      </div>
      <div className="czg-video-track">
        <span className="czg-video-pin cmh-pin"><IconBubble />0:42</span>
        <span className="czg-scrub">
          <span className="czg-scrub-fill" />
          <span className="czg-scrub-head" />
        </span>
        <span className="czg-video-times">
          <span>0:00</span>
          <span>1:20</span>
        </span>
      </div>
    </div>
  ),

  // 4. Co-editing, like Google Docs: a document with three editors and an agent
  // present, plus a live collaborator text selection.
  "gallery/coediting": (
    <div className="czg czg-doc-wrap">
      <div className="czg-doc">
        <div className="czg-doc-top">
          <span className="czg-doc-title">Q3 pricing</span>
          <span className="czg-stack">
            <Av initials="MA" tone="a2" img={FACE.maya} />
            <Av initials="SR" tone="a3" img={FACE.sarah} />
            <Av initials="JD" tone="a1" img={FACE.jordan} />
            <Av initials="BA" agent />
          </span>
        </div>
        <div className="czg-doc-body">
          <span className="czg-line" style={{ width: "100%" }} />
          <span className="czg-doc-sel"><span className="czg-doc-tag">Sarah</span></span>
          <span className="czg-line" style={{ width: "64%" }} />
        </div>
      </div>
      <p className="code-microcopy czg-cap">three editors and an agent, one doc</p>
    </div>
  ),

  // 5. Huddles, like Slack: a channel with a "started a huddle" tile, a live
  // indicator, an audio waveform, and participants.
  "gallery/huddles": (
    <div className="czg czg-huddle">
      <div className="czg-huddle-head">
        <span className="czg-hash">#</span>sales-deck
      </div>
      <div className="czg-huddle-tile">
        <span className="czg-huddle-ic"><IconHeadset /></span>
        <div className="czg-huddle-main">
          <p className="czg-huddle-t"><strong>Jordan</strong> started a huddle</p>
          <div className="czg-huddle-meta">
            <span className="czg-live"><i />live</span>
            <Waveform />
          </div>
        </div>
        <span className="czg-stack">
          <Av initials="JD" tone="a1" img={FACE.jordan} />
          <Av initials="MA" tone="a2" img={FACE.maya} />
        </span>
      </div>
    </div>
  ),

  // 6. Presence and cursors, like Miro: a dotted board with a live presence
  // cluster, a selection marquee, and labeled human + agent cursors.
  "gallery/presence": (
    <div className="czg czg-board">
      <span className="czg-board-cluster">
        <span className="czg-stack">
          <Av initials="MA" tone="a2" img={FACE.maya} />
          <Av initials="JD" tone="a1" img={FACE.jordan} />
          <Av initials="SR" tone="a3" img={FACE.sarah} />
          <Av initials="BA" agent />
        </span>
        <span className="czg-live"><i />live</span>
      </span>
      <span className="czg-board-sel" />
      <CursorTag name="Jordan" kind="approved" style={{ position: "absolute", top: 40, left: 22 }} />
      <CursorTag name="Brand Agent" kind="agent" style={{ position: "absolute", bottom: 16, right: 22 }} />
    </div>
  ),

  // 7. Notifications, like Knock: an inbox with an agent-flagged row and a
  // human-approved row, each with a status chip.
  "gallery/notifications": (
    <div className="czg czg-inbox">
      <div className="czg-inbox-head">
        <span className="czg-inbox-title"><IconBell />Inbox</span>
        <span className="czg-inbox-badge">2</span>
      </div>
      <div className="czg-inbox-row">
        <span className="czg-inbox-dot" />
        <Av initials="BA" agent />
        <div className="czg-inbox-main">
          <p className="czg-inbox-t"><strong>Brand Agent</strong> flagged pricing</p>
          <span className="czg-inbox-time">2m</span>
        </div>
        <Chip kind="agent">agent</Chip>
      </div>
      <div className="czg-inbox-row">
        <span className="czg-inbox-dot czg-inbox-dot--read" />
        <Av initials="SR" tone="a3" img={FACE.sarah} />
        <div className="czg-inbox-main">
          <p className="czg-inbox-t"><strong>Sarah</strong> approved the change</p>
          <span className="czg-inbox-time">14m</span>
        </div>
        <Chip kind="approved">approved</Chip>
      </div>
    </div>
  ),
};
