// Bento card UI — audio recording with avatar and inline player.

export function AudioRecordingCardUi() {
  return (
    <div
      className="absolute flex items-center"
      style={{
        top: 70,
        left: 50,
        right: 50,
        gap: 16,
      }}
      aria-hidden
    >
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2A2A2A, #555)",
          backgroundImage:
            "linear-gradient(135deg, #6B6B6B 0%, #2C2C2C 50%, #1A1A1A 100%)",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
          border: "3px solid #fff",
          boxShadow: "0px 4px 12px rgba(17,17,17,0.12)",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            color: "#fff",
            opacity: 0.6,
          }}
        >
          🎙️
        </span>
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#111",
            color: "#fff",
            padding: "2px 8px",
            borderRadius: 999,
            fontSize: 10,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          🎤 🎥
        </div>
      </div>

      <div
        className="flex items-center flex-1"
        style={{
          background: "#F7F7F7",
          borderRadius: 12,
          padding: "10px 14px",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#fff",
            color: "#111",
            border: "1px solid rgba(17,17,17,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          ⏸
        </div>
        <span
          className="font-urbanist font-semibold"
          style={{ color: "#111", fontSize: 14, fontVariantNumeric: "tabular-nums" }}
        >
          00:16
        </span>
        <Waveform />
        <span
          className="font-urbanist"
          style={{
            color: "#8E8E8E",
            fontSize: 13,
            marginLeft: "auto",
            whiteSpace: "nowrap",
          }}
        >
          Shrey&apos;s Recordi…
        </span>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: "#fff",
            border: "1px solid rgba(17,17,17,0.06)",
            color: "#7A7A7A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
          }}
        >
          S
        </div>
      </div>
    </div>
  );
}

function Waveform() {
  // Generate a deterministic series of bar heights so SSR + client match.
  const heights = [9, 13, 7, 16, 11, 18, 8, 14, 10, 17, 12, 6, 15, 11, 13, 8, 16, 9, 14, 12, 10, 17, 8];
  return (
    <div className="flex items-center" style={{ gap: 2, height: 22 }}>
      {heights.map((h, i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: 2,
            height: h,
            borderRadius: 1,
            background: i % 4 === 1 ? "#625DF5" : "#9CA3AF",
          }}
        />
      ))}
    </div>
  );
}
