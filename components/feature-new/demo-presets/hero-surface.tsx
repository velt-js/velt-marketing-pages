import type { CSSProperties, ReactNode } from "react";

// Shared "product-surface" hero primitives for feature-page hero demos.
// Each feature page's hero tabs compose these into a believable in-product
// surface (frame + live presence + anchored threads + composer) rather than a
// flat wireframe. Styling lives in the global `.cmh-*` / `.av-*` rules in
// components/feature-new/styles.css. Visuals are simulated, not live SDK.

// Real headshots (shared with the homepage trust strip). Give human actors a
// face; agents keep the blue initials avatar, reinforcing "humans + agents".
// Rough guide: fenne/hope = women, the rest read as men.
export const FACE_DIR = "/images/features/comments/trust-us";
export const FACES = {
  fenne: `${FACE_DIR}/avatar-fenne.png`,
  hope: `${FACE_DIR}/avatar-hope.png`,
  ethan: `${FACE_DIR}/avatar-ethan.png`,
  jeff: `${FACE_DIR}/avatar-jeff.png`,
  chris: `${FACE_DIR}/avatar-chris-bakke.png`,
  roman: `${FACE_DIR}/avatar-roman.png`,
  gavin: `${FACE_DIR}/avatar-gavin.png`,
  yuri: `${FACE_DIR}/avatar-yuri.png`,
  william: `${FACE_DIR}/avatar-william.png`,
  imre: `${FACE_DIR}/avatar-imre.png`,
  weller: `${FACE_DIR}/avatar-weller.png`,
} as const;

// Inline diff styles for "suggested edit" rows (del → ins).
export const DEL_STYLE: CSSProperties = { background: "var(--vlp-color-reject-soft)", color: "#99291c", textDecoration: "line-through", borderRadius: 3, padding: "0 3px" };
export const INS_STYLE: CSSProperties = { background: "var(--vlp-color-approve-soft)", color: "#0c6a41", borderRadius: 3, padding: "0 3px" };

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

/** @returns {JSX.Element} Comment-bubble glyph used on anchor pins. */
export function IconBubble() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M3 2.5h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H7.2L4 13.5V10.5H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1z" />
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
  return (
    <span className={`av-c ${agent ? "av-agent" : tone}`} aria-hidden="true">
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
