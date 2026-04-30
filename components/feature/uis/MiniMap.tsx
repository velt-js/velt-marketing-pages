// Bento card UI — vertical mini-map with comment markers and bubbles.

export function MiniMapUi() {
  return (
    <div
      className="absolute"
      style={{
        top: 60,
        left: 50,
        right: 50,
        bottom: 140, // leave the bento title overlay area clear
      }}
      aria-hidden
    >
      <div
        className="relative"
        style={{
          height: "100%",
          background: "#fff",
          borderRadius: 16,
          border: "1px solid rgba(17,17,17,0.04)",
          padding: "20px 32px",
          display: "flex",
        }}
      >
        {/* Vertical track on the right */}
        <div
          style={{
            position: "absolute",
            top: 24,
            bottom: 24,
            right: 32,
            width: 2,
            background: "rgba(17,17,17,0.08)",
            borderRadius: 999,
          }}
        />

        {/* Bubbles + markers */}
        <Marker top={26} bubbleColor="#FF7162" bubbleWidth={70} bubbleHeight={28} markerColor="#FF7162" />
        <Marker top={70} bubbleColor="#625DF5" bubbleWidth={50} bubbleHeight={28} markerColor="#FFCD2E" />
        <Marker top={130} bubbleColor="#0D9A5D" bubbleWidth={70} bubbleHeight={28} markerColor="#625DF5" />
        <Marker top={190} bubbleColor="#FF7162" bubbleWidth={56} bubbleHeight={28} markerColor="#FF7162" />
      </div>
    </div>
  );
}

function Marker({
  top,
  bubbleColor,
  bubbleWidth,
  bubbleHeight,
  markerColor,
}: {
  top: number;
  bubbleColor: string;
  bubbleWidth: number;
  bubbleHeight: number;
  markerColor: string;
}) {
  return (
    <>
      {/* The "comment bubble" pill */}
      <div
        style={{
          position: "absolute",
          top,
          right: 60,
          width: bubbleWidth,
          height: bubbleHeight,
          background: "#fff",
          border: `1.5px solid ${bubbleColor}`,
          borderRadius: 999,
        }}
      />
      {/* Marker dot on the rail */}
      <div
        style={{
          position: "absolute",
          top: top + bubbleHeight / 2 - 5,
          right: 28,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: markerColor,
        }}
      />
    </>
  );
}
