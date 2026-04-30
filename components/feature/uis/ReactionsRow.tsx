// Bento card UI — reactions row with name pill above and a row of reaction buttons.

export function ReactionsRowUi() {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        top: 60,
        left: 0,
        right: 0,
        gap: 18,
      }}
      aria-hidden
    >
      <div
        className="flex items-center"
        style={{
          height: 44,
          padding: "4px 18px 4px 6px",
          gap: 10,
          background: "#fff",
          borderRadius: 999,
          boxShadow: "0px 6px 18px rgba(17,17,17,0.08)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2C2C2C, #1A1A1A)",
          }}
        />
        <span
          className="font-urbanist font-semibold"
          style={{ color: "#111", fontSize: 16, letterSpacing: "-0.01em" }}
        >
          Robert Morales
        </span>
      </div>

      <div className="flex items-center" style={{ gap: 12 }}>
        <ReactionButton>
          <span style={{ fontSize: 14, color: "#8E8E8E" }}>🙂+</span>
        </ReactionButton>
        <ReactionButton highlight>
          <span style={{ fontSize: 18 }}>❤️</span>
          <span
            className="font-urbanist font-semibold"
            style={{ color: "var(--color-velt-purple)", fontSize: 14 }}
          >
            2
          </span>
        </ReactionButton>
        <ReactionButton>
          <span style={{ fontSize: 18 }}>🔥</span>
          <span className="font-urbanist font-semibold" style={{ color: "#111", fontSize: 14 }}>
            1
          </span>
        </ReactionButton>
      </div>
    </div>
  );
}

function ReactionButton({
  children,
  highlight = false,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className="flex items-center"
      style={{
        height: 36,
        padding: "0 12px",
        gap: 6,
        background: "#fff",
        border: highlight ? "1.5px solid var(--color-velt-purple)" : "1px solid rgba(17,17,17,0.08)",
        borderRadius: 999,
        boxShadow: "0px 2px 6px rgba(17,17,17,0.04)",
      }}
    >
      {children}
    </div>
  );
}
