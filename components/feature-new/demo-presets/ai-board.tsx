import type { ReactNode } from "react";

// Shared AI-native board ("In production · AI-native") — a dark AI app-builder in
// the same visual language as the other in-production boards: a left icon rail, a
// build-chat pane (prompt → generated edit) on the left, and a device preview of
// the generated app on the right carrying a comment pin + an anchored review
// thread, plus Comment / Share in the corner. Reviewing AI-generated UI inside
// the product is the story ("add a pull request to your product"). Simulated, not
// a live SDK. Defined once here and reused across every feature page's AI-native
// tab. Loosely based on Figma "AI native" (940:3220).
const AI_COMMENT_AUTHOR = "Maya";
const AI_COMMENT_TIME = "2m";
const AI_EDIT_FILE = "hero.tsx";

type AiMessage = {
  role: "user" | "assistant";
  body: ReactNode;
};

// The build conversation: prompts and the agent's generated changes.
const AI_MESSAGES: AiMessage[] = [
  { role: "user", body: "Make the hero headline punchier and add a primary CTA." },
  {
    role: "assistant",
    body: (
      <>
        Done — rewrote the headline, tightened the subtext, and added a primary CTA in <code className="ai-code">hero.tsx</code>.
      </>
    ),
  },
  { role: "user", body: "Add a logo strip with social proof under the CTA." },
  {
    role: "assistant",
    body: (
      <>
        Added a five-logo trust strip below the CTA and wired it into <code className="ai-code">hero.tsx</code>.
      </>
    ),
  },
];

// Left-rail navigation glyphs for the AI app-builder (Tabler-style, decorative
// chrome): projects, build (active), code, components, preview.
const AI_RAIL_ICONS: { key: string; node: ReactNode }[] = [
  {
    key: "projects",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></svg>
    ),
  },
  {
    key: "build",
    node: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 2.5l1.5 4L16.5 8l-4 1.5L11 13.5 9.5 9.5 5.5 8l4-1.5z" /><path d="M18 13l.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9z" /></svg>
    ),
  },
  {
    key: "code",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4" /></svg>
    ),
  },
  {
    key: "components",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></svg>
    ),
  },
  {
    key: "preview",
    node: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
    ),
  },
];

const AI_SETTINGS_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>
);

const AI_EDIT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17z" /><path d="M13.5 7.5l3 3" /></svg>
);

const AI_SEND_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
);

const AI_SHARE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="12" r="2.2" /><circle cx="18" cy="6" r="2.2" /><circle cx="18" cy="18" r="2.2" /><path d="M7.9 11 16 7M7.9 13l8.1 4" /></svg>
);

// Index of the active (build) rail glyph.
const AI_RAIL_ACTIVE_INDEX = 1;

/**
 * The device preview of the generated app — a phone frame rendering the current
 * hero.tsx (headline, subtext, CTA). Carries the comment pin that anchors the
 * review thread.
 * @returns {JSX.Element} The generated-app preview.
 */
function AiPreviewDevice() {
  return (
    <div className="ai-device">
      <span className="ai-device-notch" aria-hidden="true" />
      <div className="ai-screen">
        <div className="ai-screen-bar" aria-hidden="true">
          <span className="ai-screen-logo" />
          <span className="ai-screen-nav" />
        </div>
        <div className="ai-screen-hero">
          <p className="ai-screen-title">Ship your app in a weekend</p>
          <p className="ai-screen-sub" aria-hidden="true" />
          <p className="ai-screen-sub is-short" aria-hidden="true" />
          <span className="ai-screen-cta">Get started</span>
        </div>
      </div>
    </div>
  );
}

/**
 * The anchored comment thread reviewing the generated UI — avatar, author + time,
 * and a body that requests concrete changes to the preview.
 * @returns {JSX.Element} The anchored review comment.
 */
function AiCommentPopover() {
  return (
    <div className="ai-pop">
      <span className="ai-pin" aria-hidden="true" />
      <span className="ai-pop-av" aria-hidden="true">M</span>
      <div className="ai-pop-main">
        <div className="ai-pop-head">
          <span className="ai-pop-name">{AI_COMMENT_AUTHOR}</span>
          <span className="ai-pop-time">{AI_COMMENT_TIME}</span>
        </div>
        <p className="ai-pop-body">Use our brand orange on the CTA and cut the headline to one line. <span className="ai-pop-mention">@Sean</span></p>
      </div>
    </div>
  );
}

/**
 * The shared AI-native app-builder board surface. Rendered for the
 * "<feature>/in-production/ai" preset on every feature page (dark, default), and
 * for the "/for/ai-native-saas" solutions hero in its light-mode, edge-bleeding
 * variant (pass `light`). Visuals are simulated, not a live SDK instance.
 * @param {{ light?: boolean }} [props] Pass `light` for the inverted hero variant.
 * @returns {JSX.Element} The AI-native app-builder board.
 */
export function AiNativeBoard({ light = false }: { light?: boolean } = {}) {
  return (
    <div className={`ai-board${light ? " ai-board--light" : ""}`}>
      <nav className="ai-rail" aria-hidden="true">
        <span className="ai-rail-group">
          {AI_RAIL_ICONS.map((icon, index) => (
            <span key={icon.key} className={`ai-rail-btn${index === AI_RAIL_ACTIVE_INDEX ? " on" : ""}`}>{icon.node}</span>
          ))}
        </span>
        <span className="ai-rail-btn">{AI_SETTINGS_ICON}</span>
      </nav>

      <div className="ai-main">
        <div className="ai-top">
          <span className="ai-comment-btn"><span className="ai-comment-dot" aria-hidden="true" />Comment</span>
          <span className="ai-share-btn">{AI_SHARE_ICON}Share</span>
        </div>

        <div className="ai-split">
          <div className="ai-build">
            <div className="ai-chat">
              {AI_MESSAGES.map((message, index) => (
                <p key={index} className={`ai-msg ai-msg-${message.role}`}>{message.body}</p>
              ))}
              <span className="ai-build-step">{AI_EDIT_ICON}Edit {AI_EDIT_FILE}</span>
            </div>
            <div className="ai-composer">
              <span className="ai-composer-ph">Type your prompt</span>
              <span className="ai-composer-send" aria-hidden="true">{AI_SEND_ICON}</span>
            </div>
          </div>

          <div className="ai-preview">
            <AiPreviewDevice />
            <AiCommentPopover />
          </div>
        </div>
      </div>
    </div>
  );
}
