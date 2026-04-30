// "Extend the Capabilities" → Custom Dropdown column UI.
// 420×213 white Comments card with an "Add Tag" pill at top + skeleton
// content + a separate floating dropdown menu (NSFW / Quality Control /
// Human Intervention) overlaid on top of the lower portion of the card.
//
// Figma 174:27249 (card) + 174:27266 (dropdown menu).

import { ChevronDownIcon, FrameDotsIcon } from "./icons";

export function CustomDropdownDemoUi() {
  return (
    <div
      className="absolute"
      style={{
        left: 46,
        top: 129,
        width: 420,
        height: 213,
      }}
      aria-hidden
    >
      {/* The Comments card itself */}
      <div
        className="absolute overflow-hidden"
        style={{
          inset: 0,
          background: "#fff",
          border: "1.62px solid rgba(30,30,30,0.06)",
          borderRadius: 14,
        }}
      >
        {/* "Add Tag" pill — purple-bordered closed select */}
        <div
          className="absolute flex items-center"
          style={{
            left: 18,
            top: 14,
            width: 156,
            height: 37,
            border: "1.215px solid #625df5",
            borderRadius: 116,
            background: "#fff",
            paddingLeft: 16,
            paddingRight: 8,
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: 14.58,
              color: "rgba(17,17,17,0.5)",
              letterSpacing: "-0.29px",
              lineHeight: 1.92,
              whiteSpace: "nowrap",
            }}
          >
            Add Tag
          </span>
          <span style={{ color: "#111", display: "inline-flex" }}>
            <ChevronDownIcon size={20} stroke="#111" strokeWidth={2.2} />
          </span>
        </div>

        {/* Frame dots top-right */}
        <div className="absolute" style={{ right: 20, top: 27 }}>
          <FrameDotsIcon size={24} stroke="#c4c4c4" />
        </div>

        {/* Empty avatar circle */}
        <div
          className="absolute"
          style={{
            left: 17,
            top: 80,
            width: 37,
            height: 37,
            borderRadius: 25.92,
            background: "#fff",
            border: "1.215px solid #f1f1f1",
          }}
        />

        {/* Hidden "Me" placeholder + small skeleton pill */}
        <div className="absolute flex items-center" style={{ left: 64, top: 84, gap: 6 }}>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: 22.68,
              color: "transparent",
              letterSpacing: 1.81,
              width: 39,
            }}
          >
            Me
          </span>
          <div
            style={{
              background: "#f7f7f7",
              height: 20,
              width: 100,
              borderRadius: 26,
            }}
          />
        </div>

        {/* Long skeleton bar + trailing circle */}
        <div
          className="absolute"
          style={{
            left: 64,
            top: 147,
            width: 294,
            height: 40.5,
            background: "#f7f7f7",
            borderRadius: 9.72,
          }}
        />
        <div
          className="absolute"
          style={{
            left: 366,
            top: 147,
            width: 40.5,
            height: 40.5,
            background: "#f9f9f9",
            borderRadius: 25.92,
          }}
        />
      </div>

      {/* Floating dropdown menu — overlays the lower portion of the card.
          Positioned within the same parent container so it can render outside
          the comments card's overflow:hidden if needed. */}
      <div
        className="absolute flex flex-col"
        style={{
          left: 18,
          top: 70,
          width: 208,
          background: "#fff",
          border: "2px solid rgba(0,0,0,0.06)",
          borderRadius: 12,
          padding: "8px 4px",
          boxShadow: "0px 4px 16px rgba(0,0,0,0.08)",
          zIndex: 1,
        }}
      >
        <DropdownItem label="NSFW" />
        <DropdownItem label="Quality Control" />
        <DropdownItem label="Human Intervention" />
      </div>
    </div>
  );
}

function DropdownItem({ label }: { label: string }) {
  return (
    <div
      className="flex items-center"
      style={{
        padding: "10px 12px",
        gap: 0,
      }}
    >
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 500,
          fontSize: 13,
          color: "#111",
          letterSpacing: "-0.26px",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "rgba(17,17,17,0.32)" }}>#</span>
        {" "}
        {label}
      </span>
    </div>
  );
}
