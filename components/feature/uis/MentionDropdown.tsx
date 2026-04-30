// Bento card UI — @mentions dropdown for comment composer.
// Renders inside a 640×493 card; the bottom ~120px is reserved for the
// LibraryBento title+description overlay.

export function MentionDropdownUi() {
  return (
    <div
      className="absolute"
      style={{
        top: 60,
        left: 60,
        right: 60,
      }}
      aria-hidden
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0px 8px 24px rgba(17,17,17,0.08)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Avatar + name + email */}
        <div className="flex items-center" style={{ gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FFB098, #FF6F61)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: "Urbanist, sans-serif",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            E
          </div>
          <div className="flex flex-col">
            <span
              className="font-urbanist font-semibold"
              style={{ fontSize: 18, color: "#111", lineHeight: 1.2 }}
            >
              Emma
            </span>
            <span
              className="font-urbanist"
              style={{ fontSize: 14, color: "#8E8E8E", lineHeight: 1.2 }}
            >
              emma@velt.dev
            </span>
          </div>
        </div>

        {/* Composer text input row */}
        <div
          className="flex items-center"
          style={{
            background: "#F7F7F7",
            borderRadius: 8,
            padding: "10px 14px",
            color: "#111",
            fontSize: 14,
            fontFamily: "Urbanist, sans-serif",
            gap: 4,
          }}
        >
          <span style={{ color: "var(--color-velt-purple)", fontWeight: 600 }}>@</span>
          <span
            style={{
              width: 1,
              height: 14,
              background: "#111",
              animation: "blink 1s steps(2) infinite",
              display: "inline-block",
            }}
          />
        </div>

        {/* Toolbar row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: 12 }}>
            <ToolIcon>🙂</ToolIcon>
            <ToolIcon>📎</ToolIcon>
            <ToolIcon>🎤</ToolIcon>
            <ToolIcon>🎥</ToolIcon>
            <ToolIcon>🖥️</ToolIcon>
          </div>
          <div
            className="flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--color-velt-purple)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            ➤
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolIcon({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        width: 24,
        height: 24,
        fontSize: 14,
        opacity: 0.7,
      }}
    >
      {children}
    </span>
  );
}
