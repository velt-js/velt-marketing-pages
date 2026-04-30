// "Extend the Capabilities" → Custom Data column UI.
// Renders a 420×213 white "Comments" card with a `{{ timestamp }}` tinted
// pill at top-left, an empty avatar circle, a `{{ fileName }}` blue chip,
// two skeleton bars, and a small frame-dots ornament top-right.
//
// Card is positioned absolutely inside its column at left:36 top:129; its
// right edge intentionally extends past the column's right border so the
// parent column's right-side gradient mask fades it out. (Figma 174:27218.)

import { FileFilledIcon, FrameDotsIcon } from "./icons";

export function CustomDataChipUi() {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: 36,
        top: 129,
        width: 420,
        height: 213,
        background: "#fff",
        border: "1.62px solid rgba(30,30,30,0.06)",
        borderRadius: 14,
      }}
      aria-hidden
    >
      {/* {{ timestamp }} pill */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: 19,
          top: 14,
          padding: "4px 16px",
          background: "rgba(171,115,255,0.08)",
          borderRadius: 116,
        }}
      >
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: 14.58,
            color: "#ab73ff",
            letterSpacing: "-0.29px",
            lineHeight: 1.92,
            whiteSpace: "nowrap",
          }}
        >
          {"{{ timestamp }}"}
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
          top: 75,
          width: 37,
          height: 37,
          borderRadius: 25.92,
          background: "#fff",
          border: "1.215px solid #f1f1f1",
        }}
      />

      {/* "Me" placeholder + {{ fileName }} chip */}
      <div
        className="absolute flex items-center"
        style={{
          left: 64,
          top: 79,
          gap: 6,
        }}
      >
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
          className="flex items-center justify-center"
          style={{
            background: "rgba(76,171,244,0.08)",
            borderRadius: 32,
            padding: "4px 12px 4px 6px",
            gap: 4,
          }}
        >
          <span style={{ color: "#4cabf4", display: "inline-flex" }}>
            <FileFilledIcon size={16} stroke="#4cabf4" />
          </span>
          <span
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              color: "#4cabf4",
              whiteSpace: "nowrap",
            }}
          >
            {"{{ fileName }}"}
          </span>
        </div>
      </div>

      {/* Short skeleton bar */}
      <div
        className="absolute"
        style={{
          left: 64,
          top: 117,
          width: 147,
          height: 21,
          background: "#f7f7f7",
          borderRadius: 9.72,
        }}
      />

      {/* Long skeleton bar */}
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

      {/* Trailing circle */}
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
  );
}
