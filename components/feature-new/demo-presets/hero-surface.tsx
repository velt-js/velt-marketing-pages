import type { CSSProperties, ReactNode } from "react";

// Shared "product-surface" hero primitives for feature-page hero demos.
// Each feature page's hero tabs compose these into a believable in-product
// surface (frame + live presence + anchored threads + composer) rather than a
// flat wireframe. Styling lives in the global `.cmh-*` / `.av-*` rules in
// components/feature-new/styles.css. Visuals are simulated, not live SDK.

// Stock portrait avatars (Unsplash) for the simulated human actors — generic
// professional headshots rather than real customers. Agents keep the blue
// flower avatar, reinforcing "humans + agents". Co-occurring personas (e.g. the
// quorum members, a presence stack) are mapped to distinct faces; fenne/hope
// read as women, the rest as men.
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=160&h=160&fit=crop&crop=faces&auto=format&q=80`;
export const FACES = {
  fenne: UNSPLASH("1494790108377-be9c29b29330"),
  hope: UNSPLASH("1573496359142-b8d87734a5a2"),
  ethan: UNSPLASH("1500648767791-00dcc994a43e"),
  jeff: UNSPLASH("1507003211169-0a1dd7228f2d"),
  chris: UNSPLASH("1560250097-0b93528c311a"),
  roman: UNSPLASH("1519085360753-af0119f7cbe7"),
  gavin: UNSPLASH("1519085360753-af0119f7cbe7"),
  yuri: UNSPLASH("1500648767791-00dcc994a43e"),
  william: UNSPLASH("1507003211169-0a1dd7228f2d"),
  imre: UNSPLASH("1560250097-0b93528c311a"),
  weller: UNSPLASH("1519085360753-af0119f7cbe7"),
} as const;

// Inline diff styles for "suggested edit" rows (del → ins) — solid pill chips
// matching the Figma agent-finding component.
export const DEL_STYLE: CSSProperties = { background: "#ffe2e2", color: "#e62e2e", textDecoration: "line-through", borderRadius: 8, padding: "4px 8px", fontSize: 14, fontWeight: 500, letterSpacing: "-0.28px" };
export const INS_STYLE: CSSProperties = { background: "#f0ffdd", color: "#0f7014", textDecoration: "none", borderRadius: 8, padding: "4px 8px", fontSize: 14, fontWeight: 500, letterSpacing: "-0.28px" };

/** @returns {JSX.Element} Checkmark glyph (inherits currentColor). */
export function IconCheck() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Close (reject) glyph (inherits currentColor). */
export function IconX() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

/** @returns {JSX.Element} Upward send arrow (inherits currentColor). */
export function IconSend() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 13V3.5M4 7.5l4-4 4 4" />
    </svg>
  );
}

/** @returns {JSX.Element} Reply arrow (inherits currentColor). */
export function IconReply() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 4 3 8l4 4M3 8h5.5a4 4 0 0 1 4 4" />
    </svg>
  );
}

/** @returns {JSX.Element} Chunky filled comment-bubble glyph (bottom-left tail) for anchor pins. */
export function IconBubble() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="2.6" y="2.4" width="10.8" height="8.6" rx="3.2" />
      <path d="M4.8 9 L2.4 14 L8.2 10.2 Z" />
    </svg>
  );
}

/** @returns {JSX.Element} Search glyph (inherits currentColor). */
export function IconSearch() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="7" cy="7" r="4.2" />
      <path d="M10.2 10.2 14 14" />
    </svg>
  );
}

/** @returns {JSX.Element} The Tabler flower glyph (white stroke), the AI-agent avatar mark per Figma. */
export function IconAgentMark() {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M11.7718 13.9999C11.7718 14.5906 12.0065 15.1571 12.4242 15.5748C12.8419 15.9925 13.4084 16.2272 13.9991 16.2272C14.5898 16.2272 15.1563 15.9925 15.574 15.5748C15.9917 15.1571 16.2264 14.5906 16.2264 13.9999M11.7718 13.9999C11.7718 13.4092 12.0065 12.8427 12.4242 12.425C12.8419 12.0073 13.4084 11.7726 13.9991 11.7726C14.5898 11.7726 15.1563 12.0073 15.574 12.425C15.9917 12.8427 16.2264 13.4092 16.2264 13.9999M11.7718 13.9999L9.79429 14.2716C9.15877 14.3755 8.70144 14.5077 8.42377 14.6695C7.91488 14.9674 7.5443 15.4543 7.39273 16.0242C7.24116 16.594 7.32088 17.2007 7.61453 17.712C7.75849 17.9649 7.95111 18.1867 8.18127 18.3647C8.41143 18.5428 8.67457 18.6734 8.9555 18.7492C9.23643 18.825 9.52959 18.8444 9.81805 18.8063C10.1065 18.7682 10.3846 18.6733 10.6362 18.5272C10.8946 18.375 11.2086 18.0788 11.5791 17.6326L12.8857 16.2272L12.3482 17.2369C11.9644 18.1263 11.7721 18.7796 11.7721 19.1969C11.7721 19.7876 12.0068 20.3541 12.4245 20.7718C12.8422 21.1895 13.4087 21.4241 13.9994 21.4241C14.5901 21.4241 15.1566 21.1895 15.5743 20.7718C15.992 20.3541 16.2266 19.7876 16.2266 19.1969C16.2266 18.7804 16.0336 18.127 15.6505 17.2369L15.113 16.2272L16.4197 17.6326C16.7901 18.0788 17.1042 18.3772 17.3626 18.5272C17.6142 18.6733 17.8922 18.7682 18.1807 18.8063C18.4692 18.8444 18.7623 18.825 19.0433 18.7492C19.3242 18.6734 19.5873 18.5428 19.8175 18.3647C20.0476 18.1867 20.2403 17.9649 20.3842 17.712C20.6779 17.2007 20.7576 16.594 20.606 16.0242C20.4545 15.4543 20.0839 14.9674 19.575 14.6695C19.2691 14.4921 18.7509 14.3496 18.0085 14.2419L16.2264 13.9999M11.7718 13.9999L9.99029 13.7586C9.24786 13.6509 8.72965 13.5084 8.42377 13.331C7.91468 13.0331 7.54396 12.5461 7.39238 11.976C7.2408 11.406 7.32065 10.7992 7.61453 10.2878C7.75843 10.0348 7.951 9.81292 8.18113 9.63482C8.41126 9.45672 8.67439 9.32596 8.95533 9.2501C9.23626 9.17424 9.52944 9.15478 9.81794 9.19284C10.1064 9.2309 10.3845 9.32572 10.6362 9.47184C10.8946 9.62255 11.2086 9.92026 11.5791 10.3665L12.8857 11.7726C12.1433 10.071 11.7721 9.08132 11.7721 8.80291C11.7721 8.2122 12.0068 7.64569 12.4245 7.22799C12.8422 6.8103 13.4087 6.57564 13.9994 6.57564C14.5901 6.57564 15.1566 6.8103 15.5743 7.22799C15.992 7.64569 16.2266 8.2122 16.2266 8.80291C16.2266 9.22015 16.0344 9.87349 15.6505 10.7629L15.113 11.7726L16.4197 10.3672C16.7901 9.92174 17.1042 9.62478 17.3626 9.47258C17.6142 9.32646 17.8923 9.23164 18.1808 9.19358C18.4693 9.15552 18.7625 9.17499 19.0434 9.25085C19.3244 9.3267 19.5875 9.45746 19.8176 9.63556C20.0477 9.81366 20.2403 10.0356 20.3842 10.2885C20.6779 10.7998 20.7576 11.4065 20.606 11.9763C20.4545 12.5462 20.0839 13.0331 19.575 13.331C19.2973 13.4921 18.84 13.625 18.2045 13.7282L16.2264 13.9999"
        stroke="currentColor"
        strokeWidth="1.48485"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** @returns {JSX.Element} Thin right arrow (Tabler) used between diff pills. */
export function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * On-brand round avatar: a real headshot for human actors (when `img` is set),
 * otherwise the shared .av-c palette; agents get the blue agent treatment.
 * @param {{ initials: string; tone?: string; agent?: boolean; img?: string }} props Initials, palette tone (a1–a4), agent flag, optional headshot URL.
 * @returns {JSX.Element} Avatar chip.
 */
export function Av({ initials, tone = "a1", agent, img }: { initials: string; tone?: string; agent?: boolean; img?: string }) {
  if (img && !agent) {
    return <span className="av-c av-photo" style={{ backgroundImage: `url(${img})` }} role="img" aria-label={initials} />;
  }
  if (agent) {
    return (
      <span className="av-c av-agent" role="img" aria-label={initials}>
        <IconAgentMark />
      </span>
    );
  }
  return (
    <span className={`av-c ${tone}`} aria-hidden="true">
      {initials}
    </span>
  );
}

export type PresenceUser = { initials: string; tone?: string; agent?: boolean; img?: string };

/**
 * Overlapping presence avatars with a pulsing "live" tag, shown top-right of a
 * surface frame to signal an active, multiplayer session.
 * @param {{ users: PresenceUser[] }} props Avatars currently on the surface.
 * @returns {JSX.Element} Presence cluster.
 */
export function Presence({ users }: { users: PresenceUser[] }) {
  return (
    <div className="cmh-present">
      <div className="stack">
        {users.map((user, index) => (
          <Av key={`${user.initials}-${index}`} initials={user.initials} tone={user.tone} agent={user.agent} img={user.img} />
        ))}
      </div>
      <span className="cmh-live">
        <i />
        live
      </span>
    </div>
  );
}

/**
 * "Embedded in your product" surface frame: an app glyph + breadcrumb on the
 * left and live presence (or a custom node) on the right, over a padded body.
 * @param {{ app: string; crumb: ReactNode; users?: PresenceUser[]; right?: ReactNode; children: ReactNode }} props Frame content.
 * @returns {JSX.Element} Framed surface.
 */
export function Frame({
  app,
  crumb,
  users,
  right,
  children,
}: {
  app: string;
  crumb: ReactNode;
  users?: PresenceUser[];
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="cmh">
      <div className="cmh-bar">
        <div className="cmh-crumb">
          <span className="app">{app}</span>
          <span className="file">{crumb}</span>
        </div>
        {right ?? (users ? <Presence users={users} /> : null)}
      </div>
      <div className="cmh-body">{children}</div>
    </div>
  );
}

/**
 * Always-present composer row (avatar, placeholder, @ affordance, send) that
 * signals the surface is live rather than a static mock.
 * @param {{ placeholder?: string; you?: string }} props Composer placeholder copy and the current-user headshot.
 * @returns {JSX.Element} Composer row.
 */
export function Composer({ placeholder = "Reply…", you = FACES.jeff }: { placeholder?: string; you?: string }) {
  return (
    <div className="cmh-composer">
      <span className="av-c av-photo" style={{ width: 24, height: 24, backgroundImage: `url(${you})` }} role="img" aria-label="You" />
      <span className="ph">{placeholder}</span>
      <span className="at">@</span>
      <button type="button" className="cmh-send" aria-label="Send">
        <IconSend />
      </button>
    </div>
  );
}

/**
 * Agent finding card — the canonical AI-agent comment component, matching the
 * Figma spec exactly: flower avatar, name + relative time, body, a suggested
 * edit as red→green pills, Accept (solid) / Reject (outline) pill actions, and
 * a replies count. Reused across feature + solutions hero demos.
 * @param {{ name: string; time: string; body: ReactNode; delText?: string; insText?: string; replies?: number }} props Finding content.
 * @returns {JSX.Element} The agent finding card.
 */
export function AgentFindingCard({
  name,
  time,
  body,
  delText,
  insText,
  replies,
}: {
  name: string;
  time: string;
  body: ReactNode;
  delText?: string;
  insText?: string;
  replies?: number;
}) {
  return (
    <div className="afc">
      <Av initials={name} agent />
      <div className="afc-main">
        <div className="afc-text">
          <div className="afc-head">
            <span className="afc-name">{name}</span>
            <span className="afc-time">{time}</span>
          </div>
          <p className="afc-body">{body}</p>
        </div>
        {delText && insText ? (
          <div className="afc-diff">
            <del style={DEL_STYLE}>{delText}</del>
            <span className="afc-arrow"><IconArrowRight /></span>
            <ins style={INS_STYLE}>{insText}</ins>
          </div>
        ) : null}
        <div className="afc-actions">
          <button type="button" className="cmh-btn approve">Accept</button>
          <button type="button" className="cmh-btn reject">Reject</button>
          {typeof replies === "number" ? (
            <span className="afc-replies"><IconReply />{replies} {replies === 1 ? "Reply" : "Replies"}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
