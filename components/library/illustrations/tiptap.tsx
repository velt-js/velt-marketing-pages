// Illustrations for the "Built for Tiptap" bento (Figma 1:5594).
// Each component is a self-contained 640×(424-493) scene rendered inside
// a LibraryBento card. Geometry comes from the Figma node IDs noted in
// each component's header. Illustrations are simplified relative to the
// Figma source — they capture the silhouette and brand language without
// reproducing every nested chrome detail.

import type { CSSProperties } from "react";

const greyBar = (w: number): CSSProperties => ({
  height: 21,
  width: w,
  backgroundImage:
    "linear-gradient(90deg, rgb(237,237,237) 0%, rgb(247,247,247) 100%)",
  borderRadius: 38,
});

// 1. Multiplayer Editing — Figma 1:5637/1:5644. Document bars with two
//    user name-tag cursors (miri blue, yoen purple) parked on different
//    lines.
export function MultiplayerEditingIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute flex flex-col"
        style={{ left: -49, top: 47, gap: 12 }}
      >
        <div style={greyBar(553)} />
        <div style={greyBar(466)} />
        <div style={greyBar(524)} />
        <div style={greyBar(429)} />
        <div style={greyBar(466)} />
        <div style={greyBar(408)} />
        <div style={greyBar(429)} />
      </div>

      {/* miri (blue) — top section */}
      <div className="absolute" style={{ left: 307, top: 47 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 24,
            width: 131,
            height: 21,
            background: "rgba(78,174,253,0.24)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 2,
            height: 45,
            background: "#4eaefd",
          }}
        />
        <div
          className="font-urbanist font-bold flex items-center justify-center"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 29,
            width: 62,
            background: "#4eaefd",
            color: "#fff",
            fontSize: 20,
            letterSpacing: "-0.03em",
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          miri
        </div>
      </div>

      {/* yoen (purple) — middle section */}
      <div className="absolute" style={{ left: 158, top: 179 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 24,
            width: 131,
            height: 21,
            background: "rgba(98,93,245,0.24)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 2,
            height: 45,
            background: "#625df5",
          }}
        />
        <div
          className="font-urbanist font-bold flex items-center justify-center"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 29,
            width: 62,
            background: "#625df5",
            color: "#fff",
            fontSize: 20,
            letterSpacing: "-0.03em",
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
          }}
        >
          yoen
        </div>
      </div>

      {/* Bottom-fade so bars trail off into the card. */}
      <div
        className="absolute"
        style={{
          left: 0,
          right: 0,
          top: 320,
          height: 95,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)",
        }}
      />
    </div>
  );
}

// 2. Contextual Comments — Figma 1:5620. Doc bars with a yellow highlight
//    and a floating Comment card showing an Open ticket + @mention.
export function ContextualCommentsIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute flex flex-col"
        style={{ left: -168, top: 76, gap: 11 }}
      >
        <div style={greyBar(373)} />
        <div style={greyBar(432)} />
        <div className="relative">
          <div style={greyBar(463)} />
          <div
            style={{
              position: "absolute",
              left: 267,
              top: 0,
              width: 196,
              height: 29,
              background: "rgba(255,208,39,0.24)",
              borderTopRightRadius: 27,
              borderBottomRightRadius: 27,
            }}
          />
        </div>
        <div style={greyBar(373)} />
      </div>

      {/* Floating Comment card */}
      <div
        className="absolute bg-white overflow-hidden flex flex-col"
        style={{
          left: 160,
          top: 122,
          width: 411,
          borderRadius: 14,
          boxShadow: "0px 0px 14px 0px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header row: Open status + Priority */}
        <div
          className="flex items-center"
          style={{ padding: "18px 18px 10px", gap: 9 }}
        >
          <div
            className="flex items-center"
            style={{
              gap: 4,
              height: 36,
              padding: "4px 4px 4px 9px",
              background: "#f2f2fe",
              borderRadius: 91,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#625df5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span
              className="font-poppins"
              style={{ color: "#625df5", fontSize: 14, fontWeight: 600 }}
            >
              Open
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#625df5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Thread row */}
        <div className="flex flex-col" style={{ padding: 18, gap: 10 }}>
          <div className="flex items-center" style={{ gap: 14 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 24,
                background: "#b1b5c3",
              }}
            />
            <div className="flex items-center" style={{ gap: 9 }}>
              <span className="font-urbanist" style={{ fontSize: 18, fontWeight: 600, color: "#0a0a0a" }}>Chris</span>
              <span className="font-poppins" style={{ fontSize: 13, color: "#999" }}>2w</span>
            </div>
          </div>
          <p
            className="font-poppins"
            style={{
              paddingLeft: 46,
              fontSize: 16,
              color: "#525252",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Can we tone this down{" "}
            <span style={{ color: "#625df5", background: "rgba(98,93,245,0.08)", borderRadius: 4, padding: "0 2px" }}>@Mark</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// 3. Customizable Cursors — Figma 1:5599. Pink "jack" cursor with two
//    side badges (blue 16px, red Primary/6).
export function CustomizableCursorsIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 16px blue badge */}
      <div
        className="absolute flex items-center"
        style={{
          left: 60,
          top: 92,
          gap: 6,
          padding: 5,
          border: "1.6px solid #0085ff",
          borderRadius: 10,
          background: "#fff",
          boxShadow: "0px 3px 21px rgba(0,133,255,0.12)",
        }}
      >
        <div
          style={{
            width: 25,
            height: 25,
            background: "#0085ff",
            borderRadius: 6,
          }}
        />
        <span className="font-urbanist font-bold" style={{ color: "#4b4b4b", fontSize: 18 }}>16px</span>
      </div>

      {/* "jack" name tag with vertical stem */}
      <div className="absolute" style={{ left: 252, top: 116 }}>
        <div
          className="font-urbanist font-bold flex items-center justify-center"
          style={{
            position: "absolute",
            left: 7,
            top: 4,
            width: 141,
            height: 67,
            background: "#f55d67",
            color: "#fff",
            fontSize: 47,
            letterSpacing: "-1.4px",
            borderTopLeftRadius: 33,
            borderTopRightRadius: 33,
            borderBottomRightRadius: 33,
          }}
        >
          jack
        </div>
        {/* Cursor pointer triangle */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            borderLeft: "20px solid #f55d67",
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
          }}
        />
        {/* Vertical line below */}
        <div
          style={{
            position: "absolute",
            left: 7,
            top: 75,
            width: 2,
            height: 77,
            background: "#f55d67",
          }}
        />
      </div>

      {/* Primary/6 red badge */}
      <div
        className="absolute flex items-center"
        style={{
          left: 350,
          top: 200,
          gap: 6,
          padding: "5px 13px 5px 5px",
          border: "1.6px solid #f55d67",
          borderRadius: 10,
          background: "#fff",
          boxShadow: "0px 3px 21px rgba(245,93,103,0.12)",
        }}
      >
        <div style={{ width: 26, height: 26, background: "#f55d67", borderRadius: 6 }} />
        <span className="font-urbanist font-bold" style={{ color: "#4b4b4b", fontSize: 14.5 }}>Primary / 6</span>
      </div>
    </div>
  );
}

// 4. User Mentions — Figma 162:18723. Comment editor input UI + mention
//    dropdown above showing Emma profile suggestion.
export function UserMentionsIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Mention dropdown card */}
      <div
        className="absolute flex flex-col bg-white overflow-hidden"
        style={{
          left: 126,
          top: 56,
          width: 386,
          borderRadius: 14,
          boxShadow: "0px 3px 17px 0px rgba(0,28,59,0.12)",
        }}
      >
        <div className="flex items-center" style={{ padding: 16, gap: 11 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: "#b1b5c3",
              borderRadius: 22,
            }}
          />
          <div className="flex flex-col" style={{ gap: 2 }}>
            <span className="font-poppins" style={{ color: "#111", fontSize: 19 }}>Emma</span>
            <span className="font-poppins" style={{ color: "rgba(17,17,17,0.75)", fontSize: 17 }}>emma@velt.dev</span>
          </div>
        </div>
        <div
          className="flex items-center"
          style={{ padding: "8px 28px 16px", gap: 6 }}
        >
          <div
            className="font-poppins flex items-center justify-center"
            style={{
              padding: "0 6px",
              height: 26,
              background: "rgba(98,93,245,0.06)",
              color: "#625df5",
              fontSize: 19,
              borderRadius: 5,
            }}
          >
            @E
          </div>
          <div style={{ width: 1, height: 17, background: "#625df5" }} />
        </div>
      </div>

      {/* Comment input with action icons */}
      <div
        className="absolute flex flex-col bg-white"
        style={{
          left: 107,
          top: 188,
          width: 426,
          padding: 22,
          borderRadius: 17,
          boxShadow: "0px 11px 22px 0px rgba(15,15,15,0.1)",
          gap: 17,
        }}
      >
        <div className="flex items-center" style={{ gap: 3, color: "#23262f", fontSize: 19 }}>
          <span>{">"}</span>
          <div style={{ width: 1, height: 22, background: "#625df5" }} />
        </div>
        <div style={{ height: 1, background: "#111", opacity: 0.06 }} />
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: 6, color: "#999" }}>
            {/* simplified action icons */}
            {["☺", "📎", "🎤", "🎥", "🖥"].map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{ width: 28, height: 28, fontSize: 16, opacity: 0.6 }}
              >
                {c}
              </div>
            ))}
          </div>
          <div
            className="flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: "#625df5",
              opacity: 0.3,
              color: "#fff",
              fontSize: 18,
            }}
          >
            ▶
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Notification — Figma 162:18931. Bell icon + 3-tile notifications
//    popover that fades into the card bottom.
export function NotificationIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Bell hover button */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: 149,
          top: 40,
          width: 52,
          height: 52,
          background: "#f5f5f5",
          borderRadius: 35,
        }}
      >
        <svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
      </div>

      {/* Notifications popover */}
      <div
        className="absolute flex flex-col bg-white"
        style={{
          right: 42,
          top: 40,
          width: 380,
          height: 360,
          padding: 4,
          borderRadius: 16,
          border: "1px solid #fafafa",
          boxShadow: "0px 0px 32px 0px rgba(0,0,0,0.08)",
          gap: 2,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ padding: "8px 12px 2px" }}>
          <span className="font-poppins" style={{ fontSize: 14, color: "#0a0a0a", fontWeight: 500 }}>Notifications</span>
          <div className="flex items-center" style={{ gap: 4 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-checks.svg" alt="" width={18} height={18} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-settings.svg" alt="" width={18} height={18} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex" style={{ padding: 8 }}>
          <div
            className="flex flex-1 items-center"
            style={{ background: "#f0f0f0", padding: 4, borderRadius: 24, gap: 4 }}
          >
            <div
              className="flex-1 flex items-center justify-center font-poppins"
              style={{
                padding: "8px 12px",
                background: "#625df5",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 15,
              }}
            >
              For You
            </div>
            <div
              className="flex-1 flex items-center justify-center font-poppins"
              style={{ padding: "8px 12px", color: "#999", fontSize: 12, fontWeight: 500 }}
            >
              Documents
            </div>
            <div
              className="flex-1 flex items-center justify-center font-poppins"
              style={{ padding: "8px 12px", color: "#999", fontSize: 12, fontWeight: 500 }}
            >
              All
            </div>
          </div>
        </div>

        {/* Tiles */}
        <div className="flex flex-col" style={{ padding: 8, gap: 2 }}>
          {[
            { name: "Mihir Sodawalla", verb: "mentioned you on", file: "Velt-x-Pendo.png", highlighted: false },
            { name: "Rakesh Goyal", verb: "replied to you on", file: "Velt-x-Pendo.png", highlighted: true },
            { name: "Vivek", verb: "Approved", file: "Velt-x-Pendo.png", highlighted: false },
          ].map((n, i) => (
            <div
              key={i}
              className="flex"
              style={{
                gap: 10,
                padding: "16px 16px 16px 12px",
                borderRadius: 12,
                background: n.highlighted ? "#fafafa" : "transparent",
              }}
            >
              <div className="relative shrink-0">
                <div style={{ width: 24, height: 24, borderRadius: 24, background: "#b1b5c3" }} />
                <div
                  style={{
                    position: "absolute",
                    right: -2,
                    top: -2,
                    width: 8,
                    height: 8,
                    background: "#ff7162",
                    borderRadius: 4,
                    border: "1px solid #fff",
                  }}
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0" style={{ gap: 8 }}>
                <p
                  className="font-poppins"
                  style={{ fontSize: 13, color: "#0a0a0a", margin: 0, lineHeight: 1.3 }}
                >
                  <span style={{ color: "#666" }}>{n.name} {n.verb} </span>
                  {n.file}
                </p>
                <div className="flex items-center justify-between" style={{ color: "#8f8f8f", fontSize: 11 }}>
                  <span className="font-poppins">📄 Slides</span>
                  <span className="font-poppins">2 mins ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute"
        style={{
          left: 34,
          right: 34,
          bottom: -5,
          height: 173,
          background:
            "linear-gradient(to top, #fff 56%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
}

// 6. Version History — Figma 1:5666. Three stacked version rows with the
//    top one active (purple) and the rest greyed out.
export function VersionHistoryIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute flex flex-col items-center"
        style={{ left: 167, top: 80, width: 321, gap: 12 }}
      >
        {/* Active Version 3 */}
        <div
          className="flex items-center justify-between"
          style={{
            width: 353,
            padding: 13,
            background: "#625df5",
            borderRadius: 13,
          }}
        >
          <div className="flex items-center" style={{ gap: 11, color: "#fff" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 8v4l3 3" />
              <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
            </svg>
            <span className="font-poppins" style={{ fontSize: 17.5, fontWeight: 500 }}>Version 3</span>
          </div>
          <span
            className="font-firamono uppercase"
            style={{ color: "#fff", fontSize: 15 }}
          >
            Saving...
          </span>
        </div>
        {/* Version 2 */}
        <div
          className="flex items-center justify-between"
          style={{ width: 337, padding: 12.5, background: "#f7f7f7", borderRadius: 12.5 }}
        >
          <div className="flex items-center" style={{ gap: 10 }}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 8v4l3 3" />
              <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
            </svg>
            <span className="font-poppins" style={{ fontSize: 17, color: "#000" }}>Version 2</span>
          </div>
          <span className="font-poppins" style={{ fontSize: 17, color: "#000", opacity: 0.42 }}>15 min. ago</span>
        </div>
        {/* Version 1 */}
        <div
          className="flex items-center justify-between"
          style={{ width: 321, padding: 12, background: "#f7f7f7", borderRadius: 12 }}
        >
          <div className="flex items-center" style={{ gap: 10 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 8v4l3 3" />
              <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
            </svg>
            <span className="font-poppins" style={{ fontSize: 16, color: "#000" }}>Version 1</span>
          </div>
          <span className="font-poppins" style={{ fontSize: 16, color: "#000", opacity: 0.42 }}>25 min. ago</span>
        </div>
      </div>

      {/* Bottom fade so the list trails into the card */}
      <div
        className="absolute"
        style={{
          left: 151,
          right: 0,
          bottom: 110,
          height: 108,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)",
        }}
      />
    </div>
  );
}

// 7. Single Editor Mode — Figma 162:19126. "JOEL IS EDITING" pill stuck
//    on top of an active "Shiloh Dyna" input field.
export function SingleEditorModeIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top hover pill */}
      <div
        className="absolute"
        style={{
          left: 87,
          top: 87,
          width: 251,
          height: 96,
          background: "#e4eafb",
          borderTopLeftRadius: 13,
          borderTopRightRadius: 13,
        }}
      />
      <div
        className="absolute flex items-center"
        style={{ left: 95, top: 94, gap: 13, height: 26 }}
      >
        {/* tabler-icon-lego (simplified) */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1b53e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9.5 11l.5 -1h4l.5 1" />
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <path d="M7 11v-2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v2" />
        </svg>
        <span
          className="font-firamono uppercase"
          style={{ color: "#1b53e0", fontSize: 22, lineHeight: 1.2, letterSpacing: "0.02em", fontWeight: 600 }}
        >
          JOEL IS EDITING
        </span>
      </div>

      {/* Active input field */}
      <div
        className="absolute"
        style={{
          left: 91,
          top: 127,
          width: 462,
          height: 70,
          background: "#fff",
          border: "2px solid #1b53e0",
          borderRadius: 13,
          boxShadow: "0px 0px 0px 4px #e4eafb",
        }}
      />
      <span
        className="absolute font-urbanist font-semibold"
        style={{ left: 116, top: 146, fontSize: 26, color: "#000", lineHeight: 1.2 }}
      >
        Shiloh Dyna
      </span>
      <div
        className="absolute"
        style={{ left: 256, top: 148, width: 2, height: 30, background: "#1b53e0" }}
      />
    </div>
  );
}

// 8. Offline Storage — Figma 162:19120. Chrome dino "No Internet
//    Connection" placeholder.
export function OfflineStorageIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute"
        style={{ left: 0, top: 80, width: 640, height: 146, background: "#fff" }}
      >
        {/* Dino on left */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 64 64"
          style={{ position: "absolute", left: 32, top: 36 }}
          fill="#535353"
          aria-hidden
        >
          <path d="M44 0h12v8h4v12h-4v8h-4v4h-4v4H32v-4h-4v4h-4v-4h-4v-8h-4v-4H8v-4h4v-4H8v-4h4v-4h12V8h4V4h12z" />
          <path d="M52 12h2v2h-2z" fill="#fff" />
        </svg>
        {/* Cactus on right */}
        <svg
          width="40"
          height="80"
          viewBox="0 0 24 48"
          style={{ position: "absolute", right: 60, top: 36 }}
          fill="#535353"
          aria-hidden
        >
          <path d="M10 0h4v48h-4z" />
          <path d="M2 12h4v18H2z" />
          <path d="M18 18h4v14h-4z" />
        </svg>
        {/* Ground line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 116,
            height: 1,
            background: "#535353",
          }}
        />
        {/* "NO INTERNET CONNECTION" label */}
        <span
          className="absolute font-firamono uppercase"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: 56,
            color: "#cc3d2a",
            fontSize: 20,
            fontWeight: 600,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          No Internet Connection
        </span>
      </div>
    </div>
  );
}
