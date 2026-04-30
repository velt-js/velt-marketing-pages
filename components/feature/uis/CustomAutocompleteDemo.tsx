// "Extend the Capabilities" → Custom Autocomplete column UI.
// TWO stacked cards:
//   • Lower (composer) at left:52 top:235 — 317×114 white, with `>` cursor +
//     divider line + 5 toolbar SVGs + 30%-opacity purple send button.
//   • Upper (autocomplete dropdown) at left:69 top:185 — 283×~169 white,
//     "Attach File" highlighted on top, "Embed URL" below, divider, then a
//     "#|" cursor row.
// The dropdown overlaps the composer's top edge slightly, matching Figma
// 174:27284 + 174:27266.

import { FileIcon, LinkIcon } from "./icons";

const PURPLE = "#625df5";
const BLUE = "#3772ff";

export function CustomAutocompleteDemoUi() {
  return (
    <>
      {/* Lower: composer card */}
      <div
        className="absolute"
        style={{
          left: 52,
          top: 235,
          width: 317,
          background: "#fff",
          border: "1.036px solid #f4f5f6",
          borderRadius: 12.4,
          boxShadow: "0px 8.29px 16.58px rgba(15,15,15,0.10)",
          padding: 16.5,
          display: "flex",
          flexDirection: "column",
          gap: 12.4,
        }}
        aria-hidden
      >
        <div className="flex items-center" style={{ gap: 2 }}>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 14.5,
              color: "#23262f",
              lineHeight: 1,
            }}
          >
            {">"}
          </span>
          <span
            style={{
              display: "inline-block",
              width: 1.5,
              height: 16.5,
              background: PURPLE,
              animation: "blink 1s steps(2) infinite",
            }}
          />
        </div>

        <div style={{ height: 1, background: "#e6e8ec", width: "100%" }} />

        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: 4 }}>
            <ToolBtn><StarIconLocal /></ToolBtn>
            <ToolBtn><PaperclipIconLocal /></ToolBtn>
            <ToolBtn><MicIconLocal /></ToolBtn>
            <ToolBtn><VideoIconLocal /></ToolBtn>
            <ToolBtn><ScreenIconLocal /></ToolBtn>
          </div>
          <div
            className="flex items-center justify-center"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: PURPLE,
              opacity: 0.3,
              color: "#fff",
            }}
          >
            <ArrowUpIconLocal />
          </div>
        </div>
      </div>

      {/* Upper: autocomplete dropdown */}
      <div
        className="absolute overflow-hidden flex flex-col"
        style={{
          left: 69,
          top: 185,
          width: 283,
          background: "#fff",
          border: "1.036px solid #e6e8ec",
          borderRadius: 8.3,
          boxShadow: "0px 2.07px 12.43px rgba(0,28,59,0.12)",
          paddingTop: 4,
          paddingBottom: 4,
        }}
        aria-hidden
      >
        {/* Attach File — HIGHLIGHTED */}
        <DropdownRow icon={<FileIcon size={14} stroke="#fff" />} title="Attach File" subtitle="File name" highlighted />
        {/* Embed URL */}
        <DropdownRow icon={<LinkIcon size={14} stroke="#fff" />} title="Embed URL" subtitle="URL Title" />

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(26,28,30,0.10)", width: "100%" }} />

        {/* # cursor row */}
        <div className="flex items-center" style={{ padding: "12px 20px", height: 36, gap: 4 }}>
          <div
            className="flex items-center justify-center"
            style={{
              width: 22,
              height: 22,
              background: "rgba(55,114,255,0.12)",
              borderRadius: 4,
              fontFamily: "Poppins, sans-serif",
              fontSize: 14.5,
              color: BLUE,
            }}
          >
            #
          </div>
          <span
            style={{
              display: "inline-block",
              width: 1.5,
              height: 20,
              background: PURPLE,
              animation: "blink 1s steps(2) infinite",
            }}
          />
        </div>
      </div>
    </>
  );
}

function DropdownRow({
  icon,
  title,
  subtitle,
  highlighted = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className="flex items-center"
      style={{
        padding: "4px 12px",
        gap: 8,
        background: highlighted ? "#eaecf0" : "transparent",
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 33,
          height: 33,
          borderRadius: "50%",
          background: BLUE,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div className="flex flex-col" style={{ gap: 2 }}>
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 14.5,
            color: "#23262f",
            lineHeight: 1.1,
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: 12.4,
            color: "#777e90",
            lineHeight: 1.1,
          }}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}

function ToolBtn({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        width: 22,
        height: 22,
        color: "#1f1f1f",
      }}
    >
      {children}
    </span>
  );
}

// Compact toolbar icons (smaller version of MentionsComposerStack's set).
function StarIconLocal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
    </svg>
  );
}
function PaperclipIconLocal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 7v8a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10a1 1 0 0 1-2 0V6" />
    </svg>
  );
}
function MicIconLocal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}
function VideoIconLocal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3z" />
    </svg>
  );
}
function ScreenIconLocal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
function ArrowUpIconLocal() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="20" x2="12" y2="4" />
      <polyline points="5 11 12 4 19 11" />
    </svg>
  );
}
