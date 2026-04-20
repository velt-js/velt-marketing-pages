// FeaturesGrid — Figma node 8506:97311 (1280×1284). Black tab rail at the
// top (Async active), 2×2 feature-card grid (Comments top-left, Recording
// top-right, View Analytics bottom-left, Notifications bottom-right), and a
// dark testimonial strip at the bottom.

const tabs = [
  { label: "Async", active: true },
  { label: "Realtime", active: false },
  { label: "AI", active: false },
];

function TabRail() {
  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        top: -2,
        left: -2,
        width: 1280,
        height: 47,
        background: "#1c1d21",
        padding: "6px 16px 4px",
        zIndex: 1,
      }}
    >
      <div className="flex items-start gap-2">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className="flex items-center rounded-lg px-3 py-2 font-firamono font-medium uppercase whitespace-nowrap"
            style={{
              background: tab.active ? "#625df5" : "transparent",
              color: tab.active ? "#fff" : "rgba(255,255,255,0.52)",
              fontSize: 14,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function CommentsCard() {
  // top-left, 640×493 (actually 540 after 47px tab rail)
  return (
    <div
      className="relative overflow-hidden flex flex-col justify-between"
      style={{
        width: 640,
        minHeight: 540,
        borderRight: "2px solid #111",
        borderBottom: "2px solid #111",
      }}
    >
      {/* Visual demo area */}
      <div className="relative flex-1 flex items-start" style={{ paddingTop: 100, paddingLeft: 60 }}>
        <div className="relative flex items-start" style={{ gap: 0 }}>
          {/* Comment pin */}
          <div
            className="relative flex items-center justify-center shrink-0"
            style={{
              width: 53,
              height: 53,
              background: "#625df5",
              border: "3.5px solid #fff",
              borderTopLeftRadius: 172,
              borderTopRightRadius: 172,
              borderBottomRightRadius: 172,
              borderBottomLeftRadius: 3,
              marginTop: 36,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/avatar-chris.png"
              alt=""
              className="rounded-full object-cover"
              style={{ width: 32, height: 32 }}
            />
          </div>

          {/* Comment card */}
          <div
            className="flex flex-col bg-white shrink-0"
            style={{
              width: 411,
              marginLeft: 10,
              borderRadius: 14,
              boxShadow: "0px 0px 27px 0px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            {/* Header: Open + P0 pills + actions */}
            <div
              className="flex items-center justify-between"
              style={{ padding: "18px 18px 10px", gap: 8 }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-1 rounded-full"
                  style={{
                    background: "#f2f2fe",
                    padding: "4px 4px 4px 9px",
                    height: 36,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/home/icon-clock.svg" alt="" width={18} height={18} />
                  <span className="font-poppins font-semibold text-[13.7px]" style={{ color: "#625df5" }}>Open</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#625df5" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                <div
                  className="flex items-center gap-1 rounded-full"
                  style={{
                    background: "#f5f5f5",
                    padding: "4px 4px 4px 9px",
                    height: 36,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/home/icon-flag.svg" alt="" width={18} height={18} />
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#999]">
                <span style={{ letterSpacing: "0.2em", fontSize: 18, lineHeight: 1 }}>⋯</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l2 2 4-4" /><path d="M20 6L9 17l-5-5" /></svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            </div>

            {/* Thread */}
            <div className="flex flex-col items-start" style={{ padding: 18, gap: 10 }}>
              <div className="flex items-start w-full" style={{ gap: 14 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/home/avatar-chris.png"
                  alt=""
                  className="rounded-full object-cover shrink-0"
                  style={{ width: 32, height: 32 }}
                />
                <div className="flex-1 flex flex-col" style={{ gap: 2 }}>
                  <div className="flex items-center" style={{ gap: 9 }}>
                    <span className="font-urbanist font-semibold" style={{ fontSize: 18, color: "#0a0a0a" }}>Chris</span>
                    <span className="font-poppins" style={{ fontSize: 14, color: "#999" }}>2w</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/home/icon-checks.svg" alt="" width={18} height={18} />
                  </div>
                  <p className="font-poppins" style={{ fontSize: 16, color: "#525252", lineHeight: 1.8 }}>
                    Can we tone this down <span style={{ color: "#625df5", background: "rgba(98,93,245,0.08)", padding: "0 4px", borderRadius: 4 }}>@Mark</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center" style={{ padding: "9px 18px 22px", gap: 9 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#292929" strokeWidth="2"><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 004 4h12" /></svg>
              <span className="font-poppins" style={{ fontSize: 16, color: "#292929" }}>1 Reply</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title + description bottom-left */}
      <div className="flex flex-col items-start" style={{ padding: "0 30px 29px", gap: 8 }}>
        <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
          Comments
        </h3>
        <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52, maxWidth: 395 }}>
          Your users can comment on specific elements, sections, or documents.
        </p>
      </div>
    </div>
  );
}

function RecordingCard() {
  return (
    <div
      className="relative overflow-hidden flex flex-col justify-between"
      style={{
        width: 640,
        minHeight: 347,
        borderBottom: "2px solid #111",
      }}
    >
      <div className="relative flex-1 flex items-center justify-center">
        {/* Concentric rings + headshot */}
        <div
          className="relative shrink-0"
          style={{
            width: 182,
            height: 182,
            marginLeft: 280,
            marginTop: -40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/recording-ring.svg" alt="" className="absolute inset-0 w-full h-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/recording-headshot.png"
            alt=""
            className="absolute rounded-full object-cover"
            style={{ width: 162.7, height: 162.7, top: 9.65, left: 9.65 }}
          />
          {/* Mic + video actions pill */}
          <div
            className="absolute flex items-center justify-center rounded-full bg-white"
            style={{
              left: 44,
              bottom: -8,
              width: 94,
              height: 51,
              border: "2.14px solid #f5f5f5",
              padding: "8.5px",
            }}
          >
            <div className="flex items-center" style={{ gap: 8.5 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/icon-mic.svg" alt="" width={25.7} height={25.7} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/icon-video.svg" alt="" width={25.7} height={25.7} />
            </div>
          </div>
        </div>

        {/* Recording bar pill */}
        <div
          className="absolute flex items-center bg-white"
          style={{
            left: 50,
            bottom: 128,
            gap: 5,
            padding: "5px 5px 5px 5px",
            borderRadius: 40,
            border: "1.25px solid #f0f0f0",
            boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.04)",
          }}
        >
          <div
            className="flex items-center rounded-full"
            style={{ background: "#625df5", padding: 5 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-screen-share.svg" alt="" width={30} height={30} />
          </div>
          <div
            className="flex items-center rounded-full"
            style={{ padding: "7.5px 10px", gap: 10 }}
          >
            <span className="font-poppins" style={{ fontSize: 16.25, color: "#3d3d3d" }}>00:42</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#1f1f1f"><rect x="2" y="1" width="4" height="12" rx="1" /><rect x="8" y="1" width="4" height="12" rx="1" /></svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-stop-circle.svg" alt="" width={25} height={25} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-x.svg" alt="" width={25} height={25} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start" style={{ padding: "0 30px 30px", gap: 8 }}>
        <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
          Recording
        </h3>
        <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52, maxWidth: 395 }}>
          Enable Loom-style recording. Your users can record their screen, camera or audio
        </p>
      </div>
    </div>
  );
}

function AnalyticsCard() {
  const users: Array<{ bg: string; initial: string; name: string; when: string }> = [
    { bg: "#ff7162", initial: "M", name: "Miri", when: "2 Days ago" },
    { bg: "#0dcf82", initial: "S", name: "Sinclair", when: "5 Days ago" },
    { bg: "#3772ff", initial: "Y", name: "Yoen", when: "1 Week ago" },
  ];
  return (
    <div
      className="relative overflow-hidden flex flex-col justify-between"
      style={{
        width: 640,
        minHeight: 326,
        borderRight: "2px solid #111",
      }}
    >
      <div className="relative flex-1 flex items-start" style={{ paddingTop: 30, paddingLeft: 194 }}>
        {/* Analytics card */}
        <div
          className="relative flex bg-white"
          style={{
            width: 425,
            height: 197.5,
            borderRadius: 15,
            border: "1.25px solid rgba(0,0,0,0.08)",
            boxShadow: "0px 0px 40px 0px rgba(0,0,0,0.08)",
          }}
        >
          {/* Left: 32 TOTAL VIEWS */}
          <div className="flex flex-col items-start" style={{ padding: 30, gap: 5 }}>
            <div
              className="flex flex-col items-center justify-center rounded-[10px]"
              style={{
                background: "#f4f3ff",
                width: 175,
                height: 137.5,
                padding: "31px 25px",
                gap: 12.5,
              }}
            >
              <span className="font-poppins font-semibold" style={{ fontSize: 40, color: "#111", lineHeight: 1 }}>
                32
              </span>
              <div className="flex items-center" style={{ gap: 5 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/home/icon-eye.svg" alt="" width={22.5} height={22.5} />
                <span className="font-poppins font-medium uppercase" style={{ fontSize: 15, color: "#625df5", letterSpacing: "0.02em" }}>
                  Total views
                </span>
              </div>
            </div>
            <div
              className="flex items-center justify-center rounded-[10px]"
              style={{ background: "#f4f3ff", width: 175, height: 30 }}
            >
              <span className="font-poppins font-medium uppercase" style={{ fontSize: 15, color: "#848297" }}>
                0 Views Today
              </span>
            </div>
          </div>

          {/* Right: user list */}
          <div className="flex flex-col items-start" style={{ paddingTop: 25, paddingLeft: 5, gap: 20 }}>
            {users.map((u) => (
              <div key={u.name} className="flex items-center" style={{ gap: 15 }}>
                <div
                  className="flex items-center justify-center rounded-full text-white font-poppins font-bold"
                  style={{ background: u.bg, width: 40, height: 40, fontSize: 15 }}
                >
                  {u.initial}
                </div>
                <div className="flex flex-col" style={{ gap: 8 }}>
                  <span className="font-poppins font-medium" style={{ fontSize: 15, color: "#4c5366", lineHeight: 1 }}>
                    {u.name}
                  </span>
                  <span className="font-poppins font-medium uppercase" style={{ fontSize: 12.5, color: "#959595", lineHeight: 1, letterSpacing: "0.02em" }}>
                    {u.when}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: 195,
            bottom: 0,
            width: 456,
            height: 153,
            background: "linear-gradient(to top, #fff, rgba(255,255,255,0) 56%)",
          }}
        />
      </div>

      <div className="flex flex-col items-start" style={{ padding: "0 29px 29px", gap: 8 }}>
        <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
          View Analytics
        </h3>
        <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52, maxWidth: 395 }}>
          Track users view activity
        </p>
      </div>
    </div>
  );
}

function NotificationsCard() {
  const notifs: Array<{ avatar: string; prefix: string; action: string; doc: string; file: string; when: string; active: boolean }> = [
    { avatar: "/images/home/avatar-notif-1.png", prefix: "Mihir Sodawalla", action: "mentioned you on", doc: "Velt-x-Pendo.png", file: "Slides", when: "2 mins ago", active: true },
    { avatar: "/images/home/avatar-notif-2.png", prefix: "Rakesh Goyal", action: "replied to you on",     doc: "Velt-x-Pendo.png", file: "Slides", when: "2 mins ago", active: true },
    { avatar: "/images/home/avatar-notif-3.png", prefix: "Vivek", action: "Approved",                      doc: "Velt-x-Pendo.png", file: "Slides", when: "2 mins ago", active: false },
  ];
  return (
    <div
      className="relative overflow-hidden flex flex-col justify-between"
      style={{ width: 640, minHeight: 347 }}
    >
      <div className="relative flex-1">
        {/* Bell hover pill */}
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{ left: 103, top: 120, width: 52, height: 52, background: "#f5f5f5", padding: 12 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/icon-bell.svg" alt="" width={26} height={26} />
          <div className="absolute rounded-full" style={{ top: 10, right: 14, width: 8, height: 8, background: "#ff7162", border: "2px solid #fff" }} />
        </div>

        {/* Notifications popover */}
        <div
          className="absolute flex flex-col bg-white overflow-hidden"
          style={{
            left: 151,
            top: 120,
            width: 380,
            height: 330,
            borderRadius: 16,
            border: "1px solid #fafafa",
            boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.08)",
            padding: 4,
            gap: 2,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between w-full" style={{ padding: "8px 12px 2px" }}>
            <span className="flex-1 font-poppins font-medium" style={{ fontSize: 14, color: "#0a0a0a" }}>
              Notifications
            </span>
            <div className="flex items-center rounded-lg p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/icon-checks-blue.svg" alt="" width={18} height={18} />
            </div>
            <div className="flex items-center rounded-lg p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/icon-settings.svg" alt="" width={18} height={18} />
            </div>
          </div>
          {/* Tab rail */}
          <div className="flex items-center p-2 w-full">
            <div className="flex flex-1 items-start gap-1 p-1 rounded-full" style={{ background: "#f0f0f0" }}>
              {[
                { label: "For You", active: true },
                { label: "Documents", active: false },
                { label: "All", active: false },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex flex-1 items-center justify-center font-poppins font-medium"
                  style={{
                    background: t.active ? "#625df5" : "transparent",
                    color: t.active ? "#fff" : "#999",
                    padding: "8px 12px",
                    borderRadius: 15,
                    fontSize: 12,
                  }}
                >
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          {/* Tiles */}
          <div className="flex flex-col items-start w-full" style={{ padding: 8, gap: 2 }}>
            {notifs.map((n, i) => (
              <div
                key={i}
                className="flex items-start w-full rounded-xl"
                style={{
                  padding: "16px 16px 16px 12px",
                  gap: 10,
                  background: i === 1 ? "#fafafa" : "transparent",
                }}
              >
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={n.avatar}
                    alt=""
                    className="rounded-full object-cover"
                    style={{ width: 24, height: 24 }}
                  />
                  {n.active && (
                    <div
                      className="absolute rounded-full"
                      style={{
                        top: -2,
                        right: -2,
                        width: 8,
                        height: 8,
                        background: "#ff7162",
                        border: "2px solid #fff",
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <p className="font-poppins" style={{ fontSize: 14, lineHeight: 1.2 }}>
                    <span style={{ color: "#666" }}>{n.prefix}&nbsp;{n.action}</span>
                    <br />
                    <span style={{ color: "#0a0a0a", fontWeight: 500 }}>{n.doc}</span>
                  </p>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-0.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/home/icon-file.svg" alt="" width={12} height={12} />
                      <span className="font-poppins" style={{ fontSize: 12, color: "#8f8f8f" }}>{n.file}</span>
                    </div>
                    <span className="font-poppins" style={{ fontSize: 12, color: "#8f8f8f" }}>{n.when}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start" style={{ padding: "0 30px 30px", gap: 8 }}>
        <h3 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
          Notifications
        </h3>
        <p className="font-urbanist" style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52, maxWidth: 395 }}>
          Get collaboration notifications or push your own
        </p>
      </div>
    </div>
  );
}

function TestimonialStrip() {
  return (
    <div
      className="relative flex items-center justify-between"
      style={{
        width: 1280,
        height: 224,
        background: "#111",
        borderRadius: 24,
        padding: 40,
      }}
    >
      <div className="flex items-center" style={{ gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/home/linda-belcher.png"
          alt="Linda Belcher"
          className="rounded-full object-cover"
          style={{ width: 52, height: 52 }}
        />
        <div className="flex flex-col" style={{ gap: 4 }}>
          <span className="font-urbanist font-semibold text-white" style={{ fontSize: 18, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
            Linda Belcher
          </span>
          <span className="font-urbanist text-white" style={{ fontSize: 16, lineHeight: 1.2, opacity: 0.52, letterSpacing: "-0.03em" }}>
            Product Manager @HeyGen
          </span>
        </div>
      </div>
      <p
        className="font-urbanist font-semibold text-white"
        style={{ fontSize: 24, maxWidth: 520, lineHeight: 1.2, letterSpacing: "-0.03em" }}
      >
        Velt hosts all collaboration functionalities needed to{" "}
        <span style={{ color: "#b4b1fa" }}>boost engagement</span> at HeyGen
      </p>
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section
      className="flex flex-col items-center bg-white"
      style={{ padding: "52px 80px 0", gap: 52 }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32, maxWidth: 800 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
          <h2 className="font-urbanist font-bold" style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}>
            Collaborative Features
            <br />
            for Any Scenario
          </h2>
          <p className="font-urbanist" style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}>
            A full suite of features that let your users collaborate and drive engagement
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          <button
            className="flex items-center justify-center gap-1 rounded-lg"
            style={{ width: 156, height: 44, padding: "8px 16px", border: "2px solid #625df5" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-book-2.svg" alt="" width={18} height={18} />
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
            >
              View Docs
            </span>
          </button>
          <button
            className="flex items-center justify-center rounded-lg"
            style={{ width: 156, height: 44, padding: "8px 16px", background: "#625df5" }}
          >
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em" }}
            >
              View All Examples
            </span>
          </button>
        </div>
      </div>

      {/* Feature grid with absolute tab rail */}
      <div
        className="relative bg-white overflow-hidden"
        style={{ width: 1280, height: 866, border: "2px solid #111", borderRadius: 24 }}
      >
        <TabRail />
        {/* 2×2 grid with explicit tracks — flex-wrap broke because card
            borders pushed each card past 640 px. */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "640px 640px",
            paddingTop: 47,
          }}
        >
          <CommentsCard />
          <RecordingCard />
          <AnalyticsCard />
          <NotificationsCard />
        </div>
      </div>

      <TestimonialStrip />
    </section>
  );
}
