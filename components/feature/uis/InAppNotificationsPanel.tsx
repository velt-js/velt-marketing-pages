// Bento card UI — in-app notifications panel.

export function InAppNotificationsPanelUi() {
  return (
    <div className="absolute" style={{ top: 24, left: 30, right: 30 }} aria-hidden>
      {/* Bell icon */}
      <div
        className="absolute"
        style={{
          top: 24,
          left: 24,
          width: 38,
          height: 38,
          background: "#fff",
          border: "1px solid rgba(17,17,17,0.08)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          boxShadow: "0px 4px 10px rgba(17,17,17,0.05)",
        }}
      >
        🔔
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FF7162",
          }}
        />
      </div>

      {/* Panel */}
      <div
        style={{
          marginLeft: 76,
          marginTop: 8,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0px 8px 24px rgba(17,17,17,0.10)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-urbanist font-bold"
            style={{ color: "#111", fontSize: 16 }}
          >
            Notifications
          </span>
          <div className="flex items-center" style={{ gap: 8, color: "#8E8E8E", fontSize: 14 }}>
            <span>✓✓</span>
            <span>⚙</span>
          </div>
        </div>

        <div className="flex items-center" style={{ gap: 4 }}>
          <Tab active>For You</Tab>
          <Tab>Documents</Tab>
          <Tab>All</Tab>
        </div>

        <NotificationRow
          color="#625DF5"
          who="Mihir Sodawalla"
          verb="mentioned you on"
          file="Velt-x-Pendo.png"
          timeAgo="2 mins ago"
        />
        <NotificationRow
          color="#FF7162"
          who="Rakesh Goyal"
          verb="replied to you on"
          file="Velt-x-Pendo.png"
          timeAgo="2 mins ago"
        />
      </div>
    </div>
  );
}

function Tab({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className="font-urbanist font-semibold"
      style={{
        height: 28,
        padding: "0 12px",
        display: "inline-flex",
        alignItems: "center",
        background: active ? "var(--color-velt-purple)" : "transparent",
        color: active ? "#fff" : "#8E8E8E",
        borderRadius: 8,
        fontSize: 13,
      }}
    >
      {children}
    </span>
  );
}

function NotificationRow({
  color,
  who,
  verb,
  file,
  timeAgo,
}: {
  color: string;
  who: string;
  verb: string;
  file: string;
  timeAgo: string;
}) {
  return (
    <div className="flex items-start" style={{ gap: 10, padding: "8px 0" }}>
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
          marginTop: 2,
        }}
      />
      <div className="flex flex-col" style={{ gap: 4, flex: 1, minWidth: 0 }}>
        <p
          className="font-urbanist"
          style={{ color: "#111", fontSize: 13, lineHeight: 1.35 }}
        >
          <span className="font-semibold">{who}</span> {verb}{" "}
          <span style={{ color: "var(--color-velt-purple)", fontWeight: 600 }}>{file}</span>
        </p>
        <div
          className="flex items-center"
          style={{ gap: 6, color: "#8E8E8E", fontSize: 11 }}
        >
          <span>📄 Slides</span>
          <span>·</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}
