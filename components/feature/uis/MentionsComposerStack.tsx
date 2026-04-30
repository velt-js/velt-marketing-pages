// Bento card UI — Figma 93:10527 → @mentions cell (top-left).
// Two stacked white cards: a "single-comment-active" composer (lower)
// and an Emma autocomplete dropdown (upper) that floats above and right.
// Together they look like one continuous comment thread; the seam is
// hidden by the dropdown's drop shadow.

const PURPLE = "#625df5";

export function MentionsComposerStack() {
  return (
    <>
      {/* Lower: composer card with `>` cursor + divider + 5 toolbar icons + send button.
          Figma left:135 top:147 w:535 h:192 — extends past the cell's 642 right edge.
          Cell's overflow:hidden clips the rightmost portion. */}
      <div
        className="absolute"
        style={{
          left: 135,
          top: 147,
          width: 535,
          background: "#fff",
          border: "1.748px solid rgba(255,255,255,0.12)",
          boxShadow:
            "0px 13.987px 27.974px 0px rgba(15,15,15,0.10), 0px 1px 2px rgba(15,15,15,0.06)",
          borderRadius: 21,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 21,
        }}
        aria-hidden
      >
        <div className="flex items-center" style={{ gap: 4 }}>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: 24,
              color: "#23262f",
              lineHeight: 1,
            }}
          >
            {">"}
          </span>
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 22,
              background: PURPLE,
              animation: "blink 1s steps(2) infinite",
            }}
          />
        </div>

        <div style={{ height: 1.748, background: "#111", width: "100%" }} />

        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: 7 }}>
            <ToolIconButton><StarIcon /></ToolIconButton>
            <ToolIconButton><PaperclipIcon /></ToolIconButton>
            <ToolIconButton><MicrophoneIcon /></ToolIconButton>
            <ToolIconButton><VideoIcon /></ToolIconButton>
            <ToolIconButton><ScreenIcon /></ToolIconButton>
          </div>
          <div
            className="flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: PURPLE,
              opacity: 0.3,
              color: "#fff",
              fontSize: 18,
            }}
            aria-hidden
          >
            <ArrowUpIcon />
          </div>
        </div>
      </div>

      {/* Upper: Emma autocomplete dropdown — floats above + right of composer.
          Figma left:159 top:50 w:485 h:189. Extends past cell right edge. */}
      <div
        className="absolute"
        style={{
          left: 159,
          top: 50,
          width: 485,
          background: "#fff",
          border: "1.748px solid rgba(255,255,255,0.12)",
          boxShadow: "0px 3.497px 20.98px 0px rgba(0,28,59,0.12)",
          borderRadius: 17.5,
          overflow: "hidden",
        }}
        aria-hidden
      >
        {/* Emma row */}
        <div
          className="flex items-center"
          style={{
            padding: "14px 20px",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              flexShrink: 0,
              overflow: "hidden",
              background: "#b1b5c3",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/features/comments/avatar-emma.png"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col" style={{ gap: 2 }}>
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 22,
                color: "#111",
                lineHeight: 1.1,
              }}
            >
              Emma
            </span>
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 18,
                color: "rgba(17,17,17,0.75)",
                lineHeight: 1.1,
              }}
            >
              emma@velt.dev
            </span>
          </div>
        </div>

        {/* @ button + cursor */}
        <div
          className="flex items-center"
          style={{
            padding: "10px 32px 14px",
            gap: 6,
          }}
        >
          <span
            className="flex items-center justify-center"
            style={{
              width: 38,
              height: 32,
              borderRadius: 6,
              background: "rgba(98,93,245,0.06)",
              color: PURPLE,
              fontFamily: "Poppins, sans-serif",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            @
          </span>
          <span
            style={{
              display: "inline-block",
              width: 2,
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

function ToolIconButton({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        color: "#1f1f1f",
      }}
    >
      {children}
    </span>
  );
}

// Tabler-style stroke icons (24px viewBox), inlined to avoid asset deps.
function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
    </svg>
  );
}
function PaperclipIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 7v8a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10a1 1 0 0 1-2 0V6" />
    </svg>
  );
}
function MicrophoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}
function VideoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3z" />
    </svg>
  );
}
function ScreenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
function ArrowUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="20" x2="12" y2="4" />
      <polyline points="5 11 12 4 19 11" />
    </svg>
  );
}
