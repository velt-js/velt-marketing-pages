// Bento card UI — Figma 93:10527 → Reactions cell (bottom-right).
// Robert Morales pill at the top, 3 reaction buttons below it
// (smile-add 70x70, heart 110x70 ACTIVE w/ 3.33px purple border, fire 110x70),
// and a cursor pointer SVG overlay centered below.

const PURPLE = "#625df5";

export function ReactionsCluster() {
  return (
    <div
      className="absolute"
      style={{
        // Centered horizontally inside the ~640-wide cell
        left: "50%",
        top: 80,
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
      aria-hidden
    >
      {/* Robert Morales pill */}
      <div
        className="flex items-center"
        style={{
          width: 290,
          height: 78,
          background: "#f4f5f7",
          border: "1.5px solid rgba(0,0,0,0.04)",
          borderRadius: 50,
          padding: "0 24px",
          gap: 14,
          boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 26,
            flexShrink: 0,
            overflow: "hidden",
            background: "#d9d9d9",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/features/comments/avatar-robert.jpg"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <span
          className="font-urbanist"
          style={{
            color: "#111",
            fontSize: 24,
            lineHeight: 1.1,
            whiteSpace: "nowrap",
          }}
        >
          Robert Morales
        </span>
      </div>

      {/* 3 reaction buttons + cursor overlay */}
      <div className="relative flex items-center" style={{ gap: 10 }}>
        {/* Smile-add icon-only button */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 64,
            height: 64,
            background: "#fff",
            border: "2.5px solid rgba(98,93,245,0.12)",
            borderRadius: 40,
          }}
        >
          <SmileAddIcon />
        </div>

        {/* Heart — ACTIVE */}
        <div
          className="flex items-center"
          style={{
            width: 100,
            height: 64,
            background: "rgba(98,93,245,0.08)",
            border: `3px solid ${PURPLE}`,
            borderRadius: 60,
            padding: "0 18px",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 28, lineHeight: 1 }}>❤️</span>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              color: PURPLE,
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            2
          </span>
        </div>

        {/* Fire */}
        <div
          className="flex items-center"
          style={{
            width: 100,
            height: 64,
            background: "rgba(98,93,245,0.08)",
            border: "3px solid rgba(255,255,255,0.6)",
            borderRadius: 60,
            padding: "0 18px",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 28, lineHeight: 1 }}>🔥</span>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#051775",
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            1
          </span>
        </div>

        {/* Cursor pointer overlay — centered horizontally below the row */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: 38,
            transform: "translateX(-50%)",
            width: 30,
            height: 30,
            pointerEvents: "none",
          }}
          aria-hidden
        >
          <CursorPointer />
        </div>
      </div>
    </div>
  );
}

function SmileAddIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="12" r="9" />
      <path d="M8 14a4 4 0 0 0 6 0" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="13" y1="10" x2="13" y2="10.01" />
      <line x1="19" y1="6" x2="22" y2="6" />
      <line x1="20.5" y1="4.5" x2="20.5" y2="7.5" />
    </svg>
  );
}
function CursorPointer() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
      <path d="M5 3l14 9-7 1-3 7z" />
    </svg>
  );
}
