import type { CSSProperties, ReactElement } from "react";

import "./customization-default.css";

// A faithful, reusable static reproduction of Velt's REAL default comment
// dialog (the navy "Visible to Everyone" header, an Open/flag toolbar, a single
// comment with a device badge, a composer, and an "All comments" footer). It
// stands in for "Velt's default" / stock Velt comment UI wherever the static
// /customization page needs to depict it, replacing the older generic
// agent-finding card which did not match the shipped product.
//
// The single `accent` prop recolors the themeable parts (Open pill, footer,
// avatar, send button) so the SAME component can render as Velt's default or as
// a brand-themed instance, which is the whole point of the customization
// narrative ("same component, your colors"). The `variant` prop goes further:
// variant="minimal" swaps the whole look for a flat, Notion-like monochrome
// treatment (white header, hairline borders, neutral pills) via the
// .czd--minimal modifier, WITHOUT touching the default appearance every other
// usage relies on. Styling lives in customization-default.css; every class is
// prefixed .czd- and scoped under .vfp. The palette is Velt's own fixed default
// hexes (not --vlp-* tokens), the same convention the customization-hero module
// uses for the #4f46e5 demo brand.
//
// This is a pure, static server component: no "use client", no hooks, no state,
// and no event handlers (buttons are type="button" with no onClick). JSX is
// intentionally NOT wrapped in try/catch, because React does not render
// synchronously so a try/catch cannot catch a child's render error (enforced by
// the repo's react-hooks/error-boundaries lint rule); render failures surface to
// the nearest error boundary instead. The only try/catch guards the non-JSX
// accent-style computation.

// Velt's default palette. Kept as fixed hexes (not --vlp-* tokens) because this
// artifact depicts Velt's stock look rather than the marketing page's brand.
const ACCENT_DEFAULT = "#5b5bf5";
const AVATAR_DEFAULT = "#6c5ce7";

// Copy that is part of Velt's default chrome, hoisted so a single edit stays
// consistent and the strings are not duplicated across the markup.
const VISIBILITY_LABEL = "Visible to";
const VISIBILITY_VALUE = "Everyone";
const STATUS_LABEL = "Open";
const FOOTER_LABEL = "All comments";
const COMPOSER_PLACEHOLDER = "Reply or add others with @";
const DEVICE_DEFAULT = "Desktop";

// Sensible default comment content (reuses the page's "Sales deck / slide 4"
// narrator, Maya) so the standalone component renders a believable thread.
const NAME_DEFAULT = "Maya";
const INITIAL_DEFAULT = "M";
const TIME_DEFAULT = "1w";
const BODY_DEFAULT = "Source added to the deck, ready for your review before slide 4 ships.";

/** Props for {@link VeltDefaultCommentDialog}. */
export type VeltDefaultCommentDialogProps = {
  /** Accent for the Open pill and footer (and the avatar/send button unless `avatarColor` is set). Default = Velt indigo #5b5bf5. */
  accent?: string;
  /** Explicit color for the avatar and send button. Defaults to Velt purple for the stock look, or to `accent` when a brand accent is supplied. */
  avatarColor?: string;
  /** Comment author name. */
  name?: string;
  /** Single letter shown in the avatar. */
  initial?: string;
  /** Relative timestamp, for example "1w". */
  time?: string;
  /** Comment body text. */
  body?: string;
  /** Device badge label under the author. Default "Desktop". */
  device?: string;
  /** Visual treatment. "default" = Velt's stock navy/indigo look; "minimal" = a flat, Notion-like monochrome restyle (white header, hairline borders, neutral pills). */
  variant?: "default" | "minimal";
  /** Drop the navy header and footer chrome for tight tiles. */
  compact?: boolean;
  /** Optional anchored comment pin, for example "#57", rendered overhanging the top-left. */
  pin?: string;
};

/**
 * Resolve the two themeable colors into an inline style object exposing the
 * --czd-accent and --czd-avatar custom properties the stylesheet reads. When a
 * brand accent is supplied (and no explicit avatar color), the avatar and send
 * button follow the accent so the whole dialog reads as brand-themed; the stock
 * default keeps Velt's distinct avatar purple.
 * @param {string} accent The resolved accent color.
 * @param {string | undefined} avatarColor An explicit avatar/send color, if any.
 * @returns {CSSProperties} A style object with the --czd-* custom properties.
 */
function dialogAccentStyle(accent: string, avatarColor?: string): CSSProperties {
  try {
    const resolvedAvatar = avatarColor ?? (accent === ACCENT_DEFAULT ? AVATAR_DEFAULT : accent);
    return {
      ["--czd-accent"]: accent,
      ["--czd-avatar"]: resolvedAvatar,
    } as CSSProperties;
  } catch (error) {
    console.error("dialogAccentStyle failed", error);
    return {} as CSSProperties;
  }
}

/** @returns {ReactElement} Open padlock glyph (white) for the header. */
function IconLockOpen(): ReactElement {
  return (
    <svg className="czd-head-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="14" height="9" rx="2.2" />
      <path d="M8 11V7a4 4 0 0 1 7.6-1.7" />
    </svg>
  );
}

/** @returns {ReactElement} Circle-outline glyph for the "Open" status pill. */
function IconStatusRing(): ReactElement {
  return (
    <svg className="czd-status-dot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}

/** @returns {ReactElement} Downward chevron used beside the pills. */
function IconChevronDown({ className }: { className?: string }): ReactElement {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 9l7 7 7-7" />
    </svg>
  );
}

/** @returns {ReactElement} Flag-outline glyph for the priority pill. */
function IconFlag(): ReactElement {
  return (
    <svg className="czd-flag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 21V4" />
      <path d="M6 4h11l-2 4 2 4H6" />
    </svg>
  );
}

/** @returns {ReactElement} Horizontal three-dot kebab glyph. */
function IconKebab(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}

/** @returns {ReactElement} Link / copy (chain) glyph. */
function IconLink(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 14.5l5-5" />
      <path d="M8 12l-1.7 1.7a3.3 3.3 0 0 0 4.7 4.7L12.8 17" />
      <path d="M16 12l1.7-1.7a3.3 3.3 0 0 0-4.7-4.7L11.2 7" />
    </svg>
  );
}

/** @returns {ReactElement} Checkmark (resolve) glyph. */
function IconResolveCheck(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 6.5" />
    </svg>
  );
}

/** @returns {ReactElement} Double-tick read-receipt glyph. */
function IconReadReceipt(): ReactElement {
  return (
    <svg className="czd-read" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 13.5l4 4L14.5 8" />
      <path d="M9.5 15.5l1 1L19 7.5" />
    </svg>
  );
}

/** @returns {ReactElement} Laptop / device badge glyph. */
function IconDeviceDesktop(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="16" height="10" rx="1.6" />
      <path d="M2.5 19h19" />
    </svg>
  );
}

/** @returns {ReactElement} Paper-plane send arrow (white) for the send button. */
function IconSendPlane(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 4L3.5 11.2a0.6 0.6 0 0 0 .05 1.12L10 14.5l2.3 6.4a0.6 0.6 0 0 0 1.12.06L20 4z" />
      <path d="M20 4l-10 10.5" />
    </svg>
  );
}

/** @returns {ReactElement} Speech-bubble glyph for the footer. */
function IconAllComments(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9.5L5.8 19.2A0.8 0.8 0 0 1 4.5 18.6V16a2 2 0 0 1-1.5-1.9V6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

/**
 * A faithful, reusable static reproduction of Velt's default comment dialog.
 * The `accent` prop rethemes the Open pill, footer, avatar, and send button so
 * the same component can render Velt's stock look or a brand-themed variant,
 * while `variant="minimal"` restyles the whole card into a flat, Notion-like
 * monochrome look (used for the "your design system" side of the What It Is
 * scene). The default look is unchanged so other usages are unaffected.
 * @param {VeltDefaultCommentDialogProps} props The dialog content and theming.
 * @returns {ReactElement} The default comment dialog.
 */
export function VeltDefaultCommentDialog({
  accent = ACCENT_DEFAULT,
  avatarColor,
  name = NAME_DEFAULT,
  initial = INITIAL_DEFAULT,
  time = TIME_DEFAULT,
  body = BODY_DEFAULT,
  device = DEVICE_DEFAULT,
  variant = "default",
  compact = false,
  pin,
}: VeltDefaultCommentDialogProps): ReactElement {
  const themeStyle = dialogAccentStyle(accent, avatarColor);
  const rootClassName = [
    "czd",
    compact ? "czd--compact" : null,
    variant === "minimal" ? "czd--minimal" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const dialog = (
    <div className={rootClassName} style={themeStyle}>
      {compact ? null : (
        <div className="czd-head">
          <IconLockOpen />
          <span className="czd-head-label">{VISIBILITY_LABEL}</span>
          <span className="czd-head-pill">{VISIBILITY_VALUE}</span>
        </div>
      )}

      <div className="czd-toolbar">
        <div className="czd-tools-left">
          <button type="button" className="czd-status">
            <IconStatusRing />
            {STATUS_LABEL}
            <IconChevronDown className="czd-status-caret" />
          </button>
          <button type="button" className="czd-flag" aria-label="Set priority">
            <IconFlag />
            <IconChevronDown className="czd-flag-caret" />
          </button>
        </div>
        <div className="czd-tools-right">
          <button type="button" className="czd-tool" aria-label="More options">
            <IconKebab />
          </button>
          <button type="button" className="czd-tool" aria-label="Copy link">
            <IconLink />
          </button>
          <button type="button" className="czd-tool czd-tool--resolve" aria-label="Resolve">
            <IconResolveCheck />
          </button>
        </div>
      </div>

      <div className="czd-comment">
        <span className="czd-avatar" role="img" aria-label={name}>
          {initial}
        </span>
        <div className="czd-comment-main">
          <div className="czd-comment-head">
            <span className="czd-name">{name}</span>
            <span className="czd-time">{time}</span>
            <IconReadReceipt />
          </div>
          <span className="czd-device">
            <IconDeviceDesktop />
            {device}
          </span>
          <p className="czd-body">{body}</p>
        </div>
      </div>

      <div className="czd-composer">
        <span className="czd-composer-ph">{COMPOSER_PLACEHOLDER}</span>
        <button type="button" className="czd-send" aria-label="Send">
          <IconSendPlane />
        </button>
      </div>

      {compact ? null : (
        <div className="czd-footer">
          <IconAllComments />
          {FOOTER_LABEL}
        </div>
      )}
    </div>
  );

  if (pin) {
    return (
      <div className="czd-wrap" style={themeStyle}>
        <span className="czd-pin">
          <span className="czd-pin-av">{initial}</span>
          <span className="czd-pin-tag">{pin}</span>
        </span>
        {dialog}
      </div>
    );
  }

  return dialog;
}
