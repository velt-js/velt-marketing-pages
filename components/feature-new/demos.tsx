import type { CSSProperties, ReactNode } from "react";

// Reusable simulated-UI atoms for feature-page demos (Preview panes, hero
// demo, mixed scenes). These mirror the reference markup; visuals are
// simulated, not live SDK instances.

export type ChipKind = "agent" | "pending" | "approved" | "rejected";

/**
 * Pill-style status chip.
 * @param {{ kind: ChipKind; children: ReactNode }} props Chip kind and label.
 * @returns {JSX.Element} Chip element.
 */
export function Chip({ kind, children }: { kind: ChipKind; children: ReactNode }) {
  return <span className={`chip chip-${kind}`}>{children}</span>;
}

export type AuditRowData = {
  ts: string;
  ev: ReactNode;
  chip: { label: string; kind: ChipKind };
};

/**
 * Filterable audit timeline (head + attributed rows).
 * @param {{ head?: { left: ReactNode; right?: ReactNode }; rows: AuditRowData[]; style?: CSSProperties }} props Audit log data.
 * @returns {JSX.Element} Audit log element.
 */
export function AuditLog({
  head,
  rows,
  style,
}: {
  head?: { left: ReactNode; right?: ReactNode };
  rows: AuditRowData[];
  style?: CSSProperties;
}) {
  return (
    <div className="audit" style={style}>
      {head ? (
        <div className="audit-head">
          <span>{head.left}</span>
          {head.right ? <span className="exp">{head.right}</span> : null}
        </div>
      ) : null}
      {rows.map((row, index) => (
        <div className="audit-row" key={`${row.ts}-${index}`}>
          <span className="ts">{row.ts}</span>
          <span className="ev">{row.ev}</span>
          <Chip kind={row.chip.kind}>{row.chip.label}</Chip>
        </div>
      ))}
    </div>
  );
}

/**
 * Highlighted "precedent / statusHistory" card. When `lead` is provided it is
 * rendered inside the card (e.g. an avatar) to the left of the text content.
 * @param {{ heading: string; body: ReactNode; meta?: string; style?: CSSProperties; lead?: ReactNode }} props Precedent content.
 * @returns {JSX.Element} Precedent card.
 */
export function Precedent({
  heading,
  body,
  meta,
  style,
  lead,
}: {
  heading: string;
  body: ReactNode;
  meta?: string;
  style?: CSSProperties;
  lead?: ReactNode;
}) {
  try {
    const content = (
      <>
        <p className="ph">{heading}</p>
        <p className="pb">{body}</p>
        {meta ? <p className="pm">{meta}</p> : null}
      </>
    );
    if (lead) {
      return (
        <div className="precedent precedent--lead" style={style}>
          <span className="precedent-lead">{lead}</span>
          <div className="precedent-content">{content}</div>
        </div>
      );
    }
    return (
      <div className="precedent" style={style}>
        {content}
      </div>
    );
  } catch {
    return <div className="precedent" style={style} />;
  }
}

/**
 * Provenance row ("source -> destination").
 * @param {{ children: ReactNode }} props Row content (use ProvArrow for the arrow).
 * @returns {JSX.Element} Provenance row.
 */
export function ProvRow({ children }: { children: ReactNode }) {
  return <span className="prov-row">{children}</span>;
}

/**
 * Arrow glyph used inside provenance rows.
 * @returns {JSX.Element} Arrow span.
 */
export function ProvArrow() {
  return <span className="arr">→</span>;
}

export type AvatarUser = {
  initials: string;
  kind?: "human" | "agent" | "away";
  name?: string;
};

/**
 * Overlapping avatar stack with agent marking, away (faded) state, and an
 * optional +N overflow chip. Used by presence demos.
 * @param {{ users: AvatarUser[]; overflow?: number; style?: CSSProperties }} props Avatar data.
 * @returns {JSX.Element} Avatar stack.
 */
export function AvatarStack({
  users,
  overflow,
  style,
}: {
  users: AvatarUser[];
  overflow?: number;
  style?: CSSProperties;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", ...style }}>
      {users.map((user, index) => (
        <span
          key={`${user.initials}-${index}`}
          title={user.name}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            marginLeft: index ? -9 : 0,
            display: "grid",
            placeItems: "center",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.2,
            color: "#fff",
            border: "2px solid var(--bg, #fff)",
            background: user.kind === "agent" ? "var(--brand, #ff4f00)" : "var(--ink, #0b353b)",
            opacity: user.kind === "away" ? 0.38 : 1,
            position: "relative",
            zIndex: users.length - index,
          }}
        >
          {user.initials}
          {user.kind === "agent" ? (
            <span
              style={{
                position: "absolute",
                bottom: -7,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 7.5,
                fontWeight: 800,
                letterSpacing: 0.5,
                lineHeight: 1,
                padding: "2px 4px",
                borderRadius: 4,
                color: "#fff",
                background: "var(--brand, #ff4f00)",
                border: "1.5px solid var(--bg, #fff)",
              }}
            >
              AI
            </span>
          ) : null}
        </span>
      ))}
      {overflow ? (
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            marginLeft: -9,
            display: "grid",
            placeItems: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--ink, #0b353b)",
            border: "2px solid var(--bg, #fff)",
            background: "var(--line, #e7e2d9)",
          }}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Single inbox/notification row: optional avatar, title, meta, status chip.
 * Used by notification demos.
 * @param {{ avatar?: AvatarUser; title: ReactNode; meta?: ReactNode; chip?: { label: string; kind: ChipKind }; actions?: boolean }} props Row content.
 * @returns {JSX.Element} Notification row.
 */
export function NotifItem({
  avatar,
  title,
  meta,
  chip,
  actions,
}: {
  avatar?: AvatarUser;
  title: ReactNode;
  meta?: ReactNode;
  chip?: { label: string; kind: ChipKind };
  actions?: boolean;
}) {
  return (
    <div className="notif-row" style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", borderBottom: "1px solid var(--line, #e7e2d9)" }}>
      {avatar ? <AvatarStack users={[avatar]} /> : null}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.4, color: "var(--ink, #0b353b)" }}>{title}</p>
        {meta ? <p style={{ margin: "3px 0 0", fontSize: 11.5, opacity: 0.6 }}>{meta}</p> : null}
        {actions ? (
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <span className="chip chip-approved">Approve</span>
            <span className="chip chip-rejected">Reject</span>
          </div>
        ) : null}
      </div>
      {chip ? <Chip kind={chip.kind}>{chip.label}</Chip> : null}
    </div>
  );
}

/**
 * Labeled cursor pointer used by presence cursor/selection demos.
 * @param {{ name: string; kind?: ChipKind; style?: CSSProperties }} props Cursor data.
 * @returns {JSX.Element} Cursor tag.
 */
export function CursorTag({
  name,
  kind = "approved",
  style,
}: {
  name: string;
  kind?: ChipKind;
  style?: CSSProperties;
}) {
  const tone = kind === "agent" ? "var(--brand, #ff4f00)" : "var(--ink, #0b353b)";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, ...style }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill={tone} aria-hidden="true">
        <path d="M2 1 L12 6.2 L7.4 7.4 L6.2 12 Z" />
      </svg>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: tone, padding: "2px 7px", borderRadius: 5 }}>{name}</span>
    </span>
  );
}

/**
 * Dark JSON/REST panel used in hero and showcase demos.
 * @param {{ children: ReactNode; footer?: ReactNode; style?: CSSProperties }} props Panel content.
 * @returns {JSX.Element} Dark panel.
 */
export function DarkPanel({
  children,
  footer,
  style,
}: {
  children: ReactNode;
  footer?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="sol-panel-body dark" style={style}>
      <pre>{children}</pre>
      {footer ? (
        <p className="sol-audit-line">
          <span className="pulse" />
          {footer}
        </p>
      ) : null}
    </div>
  );
}
