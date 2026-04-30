// Bento card UI — email notification mention preview, slightly clipped on the right
// so it reads as "an email arriving from off-canvas".

export function EmailNotificationCardUi() {
  return (
    <div
      className="absolute"
      style={{
        top: 90,
        left: 100,
        right: -120,
      }}
      aria-hidden
    >
      {/* Stacked card behind */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          right: 0,
          height: 110,
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0px 6px 14px rgba(17,17,17,0.06)",
          opacity: 0.5,
        }}
      />
      {/* Foreground email card */}
      <div
        className="flex items-center"
        style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0px 12px 28px rgba(17,17,17,0.12)",
          padding: 22,
          gap: 18,
          height: 130,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: "rgba(98,93,245,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-velt-purple)",
            fontSize: 26,
            position: "relative",
            flexShrink: 0,
          }}
        >
          ✉️
          <span
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 10,
              height: 10,
              background: "#FF7162",
              borderRadius: "50%",
              border: "2px solid #fff",
            }}
          />
        </div>
        <div className="flex flex-col" style={{ gap: 6, flex: 1, minWidth: 0 }}>
          <span
            className="font-urbanist font-bold"
            style={{ color: "#111", fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.1 }}
          >
            <span style={{ color: "var(--color-velt-purple)" }}>Emma</span> mentioned you on{" "}
            <span style={{ opacity: 0.4 }}>…</span>
          </span>
        </div>
      </div>
    </div>
  );
}
