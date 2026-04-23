// Dark video/demo player — sits directly under PageHero. Figma nodes
// 1:1118 and 1:5488 both show a 1280-wide black rounded container with a
// subtle player chrome. Sized at design-width (scales down via the
// enclosing ScaleWrapper). When videoSrc is provided it auto-plays muted
// in loop; otherwise a labeled dark skeleton is shown.

type DemoPlayerProps = {
  videoSrc?: string;
  poster?: string;
  label?: string;
};

export function DemoPlayer({ videoSrc, poster, label }: DemoPlayerProps) {
  return (
    <section
      className="flex justify-center w-full bg-black"
      style={{ padding: "0 80px 100px" }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: 1280,
          height: 648,
          background: "#0d0d0d",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <>
            {/* Top chrome — traffic lights */}
            <div
              className="absolute flex items-center"
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: 36,
                padding: "0 16px",
                gap: 8,
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff4e54" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e7bc00" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00c500" }} />
            </div>

            {label && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-firacode"
                  style={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.32)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {label}
                </span>
              </div>
            )}

            {/* Bottom chrome — playback + settings */}
            <div
              className="absolute flex items-center justify-between"
              style={{
                bottom: 0,
                left: 0,
                right: 0,
                height: 44,
                padding: "0 20px",
                borderTop: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="flex items-center font-urbanist"
                style={{ gap: 14, color: "rgba(255,255,255,0.4)", fontSize: 13 }}
              >
                <span>▶</span>
                <span>0:00 / 1:32</span>
              </div>
              <div
                className="flex items-center font-urbanist"
                style={{ gap: 10, color: "rgba(255,255,255,0.4)", fontSize: 13 }}
              >
                <span>⚙</span>
                <span>⛶</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
