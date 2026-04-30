// Bento card UI — Figma 93:10527 → Recordings cell (bottom-left).
// Big circular avatar on the left with a Mic+Video pill underneath; an
// audio recording bar floats to the right and overflows the card's right
// edge with a white-to-transparent gradient mask suggesting "more off-canvas."

const PURPLE = "#625df5";

export function RecordingsBlock() {
  return (
    <>
      {/* Large circular avatar (left) */}
      <div
        className="absolute"
        style={{
          left: 60,
          top: 40,
          width: 145,
          height: 145,
        }}
        aria-hidden
      >
        {/* Decorative ring behind */}
        <div
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            background:
              "conic-gradient(from 90deg, #625df5, #8bf2e1, #ff7a59, #ffcd2e, #625df5)",
            opacity: 0.16,
            filter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #555, #1a1a1a)",
            border: "3px solid #fff",
            overflow: "hidden",
            boxShadow: "0px 8px 24px rgba(17,17,17,0.16)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/features/comments/avatar-recordings.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        {/* Mic + Video pill anchored bottom-center */}
        <div
          className="flex items-center justify-center"
          style={{
            position: "absolute",
            bottom: -16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 36,
            background: "#fff",
            border: "1.5px solid rgba(17,17,17,0.12)",
            borderRadius: 28,
            gap: 8,
            color: "#1f1f1f",
            boxShadow: "0px 4px 10px rgba(17,17,17,0.08)",
          }}
        >
          <MicrophoneIcon />
          <VideoIcon />
        </div>
      </div>

      {/* Audio recording bar — floats to the right, overflows card edge */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: 250,
          top: 50,
          width: 460,
          background: "#fff",
          border: "1.5px solid #f5f5f5",
          borderRadius: 30,
          boxShadow: "0px 8px 28px rgba(17,17,17,0.06)",
          padding: 6,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
        aria-hidden
      >
        {/* Top: audio timeline */}
        <div
          className="flex items-center"
          style={{
            background: "#f5f5f5",
            height: 60,
            borderRadius: 48,
            padding: 12,
            gap: 14,
          }}
        >
          <div className="flex items-center" style={{ gap: 12, flexShrink: 0 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: `1.5px solid ${PURPLE}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <span style={{ width: 4, height: 14, background: PURPLE, borderRadius: 2 }} />
              <span style={{ width: 4, height: 14, background: PURPLE, borderRadius: 2 }} />
            </div>
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 18,
                color: "#1f1f1f",
                fontVariantNumeric: "tabular-nums",
                width: 50,
                textAlign: "right",
              }}
            >
              00:16
            </span>
          </div>
          <div className="flex items-center" style={{ gap: 3, flex: 1, minWidth: 0 }}>
            <Waveform />
          </div>
          <div style={{ flexShrink: 0, color: "#8f8f8f" }}>
            <VolumeIcon />
          </div>
        </div>

        {/* Bottom: status row with comment pin + filename + actions */}
        <div
          className="flex items-center justify-between"
          style={{
            paddingLeft: 16,
            paddingRight: 14,
            paddingTop: 12,
            paddingBottom: 14,
            gap: 12,
          }}
        >
          <div className="flex items-center" style={{ gap: 10, flex: 1, minWidth: 0 }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "#18ad4b",
                color: "#fff",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              S
            </div>
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 15,
                color: "#1f1f1f",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flex: 1,
              }}
            >
              Shrey&apos;s Recording-24Apr2024-Mihir
            </span>
          </div>
          <div className="flex items-center" style={{ gap: 10, color: "#8f8f8f", flexShrink: 0 }}>
            <ClosedCaptionIcon />
            <FileTextIcon />
            <DotsVerticalIcon />
          </div>
        </div>
      </div>

      {/* White-to-transparent gradient overlay masking the right edge */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: 0,
          top: 0,
          bottom: 0,
          width: 140,
          background: "linear-gradient(to left, #fff, rgba(255,255,255,0))",
        }}
        aria-hidden
      />
    </>
  );
}

function Waveform() {
  // 48 bars; the first 10 are "played" (purple), rest unplayed (gray).
  const heights = [
    5, 9, 5, 6, 9, 3, 5, 6, 1, 4,
    5, 1, 4, 4, 3, 6, 4, 5, 1, 4,
    5, 9, 3, 6, 4, 5, 1, 4, 5, 9,
    5, 6, 9, 1, 4, 5, 3, 6, 4, 5,
    1, 4, 5, 9, 5, 6, 9, 3,
  ];
  return (
    <>
      {heights.map((h, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 3,
            height: h * 3,
            borderRadius: 1.5,
            background: i < 10 ? PURPLE : "#8f8f8f",
            flexShrink: 0,
          }}
        />
      ))}
    </>
  );
}

// Inlined Tabler-style icons (24px viewBox)
function MicrophoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}
function VideoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3z" />
    </svg>
  );
}
function VolumeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
      <path d="M19 5a8 8 0 0 1 0 14" />
      <path d="M16 8a4 4 0 0 1 0 8" />
    </svg>
  );
}
function ClosedCaptionIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 10a2 2 0 0 1 4 0" />
      <path d="M7 14a2 2 0 0 0 4 0" />
      <path d="M13 10a2 2 0 0 1 4 0" />
      <path d="M13 14a2 2 0 0 0 4 0" />
    </svg>
  );
}
function FileTextIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}
function DotsVerticalIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
