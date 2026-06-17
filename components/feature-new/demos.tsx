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
 * Highlighted "precedent / statusHistory" card.
 * @param {{ heading: string; body: ReactNode; meta?: string; style?: CSSProperties }} props Precedent content.
 * @returns {JSX.Element} Precedent card.
 */
export function Precedent({
  heading,
  body,
  meta,
  style,
}: {
  heading: string;
  body: ReactNode;
  meta?: string;
  style?: CSSProperties;
}) {
  return (
    <div className="precedent" style={style}>
      <p className="ph">{heading}</p>
      <p className="pb">{body}</p>
      {meta ? <p className="pm">{meta}</p> : null}
    </div>
  );
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
