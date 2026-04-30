// Bento card UI — comments sidebar: search bar, location row, single comment.

export function CommentsSidebarUi() {
  return (
    <div
      className="absolute"
      style={{
        top: 30,
        left: 50,
        right: 60,
      }}
      aria-hidden
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(17,17,17,0.06)",
          borderRadius: 16,
          boxShadow: "0px 12px 28px rgba(17,17,17,0.08)",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Search row */}
        <div
          className="flex items-center"
          style={{
            background: "#F7F7F7",
            borderRadius: 12,
            padding: "8px 12px",
            gap: 8,
          }}
        >
          <span style={{ color: "#8E8E8E", fontSize: 14 }}>🔍</span>
          <span className="font-urbanist" style={{ color: "#8E8E8E", fontSize: 14 }}>
            Search Comments
          </span>
          <span
            className="ml-auto flex items-center justify-center"
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "rgba(98,93,245,0.12)",
              color: "var(--color-velt-purple)",
              fontSize: 12,
            }}
          >
            2
          </span>
        </div>

        {/* Location pill */}
        <div className="flex items-center" style={{ gap: 8 }}>
          <span
            className="flex items-center justify-center"
            style={{ width: 24, height: 24, color: "var(--color-velt-purple)" }}
          >
            🌐
          </span>
          <span className="font-urbanist font-semibold" style={{ color: "#111", fontSize: 14 }}>
            / Home
          </span>
          <span
            className="font-urbanist font-semibold"
            style={{
              background: "rgba(98,93,245,0.1)",
              color: "var(--color-velt-purple)",
              fontSize: 12,
              padding: "2px 8px",
              borderRadius: 999,
            }}
          >
            6
          </span>
          <span style={{ marginLeft: "auto", color: "#8E8E8E" }}>⌃</span>
        </div>

        {/* Comment row */}
        <div className="flex items-start" style={{ gap: 10, padding: "10px 0 0" }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#10B981",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            E
          </div>
          <div className="flex flex-col" style={{ gap: 4, flex: 1, minWidth: 0 }}>
            <div className="flex items-center" style={{ gap: 6 }}>
              <span className="font-urbanist font-semibold" style={{ fontSize: 13, color: "#111" }}>
                Vivek
              </span>
              <span style={{ fontSize: 11, color: "#8E8E8E" }}>3h</span>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#FF7162",
                  marginLeft: 2,
                }}
              />
              <span style={{ marginLeft: "auto", color: "#8E8E8E", fontSize: 12 }}>🖥️</span>
            </div>
            <p className="font-urbanist" style={{ fontSize: 12, color: "#8E8E8E", lineHeight: 1.3 }}>
              Assigned to <span style={{ color: "var(--color-velt-purple)", fontWeight: 600 }}>@You</span>
            </p>
            <p
              className="font-urbanist"
              style={{
                fontSize: 12,
                color: "#111",
                lineHeight: 1.4,
                fontStyle: "italic",
              }}
            >
              This needs to be clear, sharing my thoughts in the voice note…
            </p>
            {/* Mini audio bar */}
            <div
              className="flex items-center"
              style={{
                background: "#F7F7F7",
                borderRadius: 8,
                padding: "6px 10px",
                gap: 8,
                marginTop: 4,
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "var(--color-velt-purple)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                }}
              >
                ▶
              </span>
              <span
                className="font-urbanist font-semibold"
                style={{ fontSize: 11, color: "#111", fontVariantNumeric: "tabular-nums" }}
              >
                00:16
              </span>
              <MiniWaveform />
              <span style={{ marginLeft: "auto", color: "#FF7162", fontSize: 11 }}>🗑</span>
            </div>
            <span style={{ fontSize: 11, color: "#8E8E8E" }}>2 Replies</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniWaveform() {
  const heights = [5, 9, 4, 11, 6, 10, 5, 8, 7, 12, 5, 9, 6, 10, 4, 11, 7, 9];
  return (
    <div className="flex items-center" style={{ gap: 1.5, height: 14 }}>
      {heights.map((h, i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: 1.5,
            height: h,
            borderRadius: 1,
            background: i % 5 === 1 ? "#625DF5" : "#9CA3AF",
          }}
        />
      ))}
    </div>
  );
}
