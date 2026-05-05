// "Your Data, Your Choice" — Figma node 219:15793 in HqWIZdR6ISJmaG2n4o3gr8.
// Narrower (816 wide) layout than the standard 1280 feature sections —
// centered header (heading + subheading + single Book Demo CTA), a body
// image showing the two hosting options ("Custom Data Encryption" with
// Your Server / Your DB illustrations), and a free-standing testimonial
// card (Ethan Veres) at the bottom — rendered via the shared
// InlineTestimonialCard so it matches the Security/standalone-card spec.
//
// Slug-conditional in app/features/[slug]/page.tsx — only rendered for
// slug === "multiplayer", slotted between the CustomerUI carousel and
// the remaining image cards.

import { InlineTestimonialCard } from "@/components/home/InlineTestimonialCard";

const ethanTestimonial = {
  name: "Ethan Veres",
  role: "CTO @eqtble",
  quote: "Commenting is something we wanted in our app, Velt made it possible",
  avatarSrc: "/images/features/comments/trust-us/avatar-ethan.png",
};

export function MultiplayerYourDataSection() {
  return (
    <section
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{ padding: "100px 80px" }}
    >
      <div
        className="flex flex-col items-center"
        style={{ width: 816 }}
      >
        {/* Header — heading + subheading, centered, max 579 wide */}
        <div
          className="flex flex-col items-center text-center"
          style={{ gap: 12, maxWidth: 579 }}
        >
          <h2
            className="font-urbanist font-bold"
            style={{
              color: "#111",
              fontSize: 52,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Your Data, Your Choice
          </h2>
          <p
            className="font-urbanist"
            style={{
              color: "#111",
              fontSize: 20,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            You have full flexibility to host data with us or on your own
            servers
          </p>
        </div>

        {/* Book Demo CTA — single primary purple pill */}
        <a
          href="/book-demo"
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 156,
            height: 44,
            padding: "8px 16px",
            background: "#625df5",
            marginTop: 32,
            textDecoration: "none",
          }}
        >
          <span
            className="font-urbanist font-semibold whitespace-nowrap"
            style={{
              color: "#fff",
              fontSize: 16,
              letterSpacing: "-0.03em",
            }}
          >
            Book Demo
          </span>
        </a>

        {/* Body — two 400×493 cards (Figma 219:18681). Rendered inline as
            React/CSS so the binary row, Your DB box, cylinder icon, and
            8GB strikethrough all stay vector-sharp at any DPR. */}
        <div
          className="flex items-center"
          style={{ gap: 16, marginTop: 40 }}
        >
          <CustomEncryptionCard />
          <EightGbCard />
        </div>

        {/* Free-standing Ethan testimonial — same shared component as Security */}
        <div style={{ marginTop: 40, width: "100%" }}>
          <InlineTestimonialCard
            name={ethanTestimonial.name}
            role={ethanTestimonial.role}
            quote={ethanTestimonial.quote}
            avatarSrc={ethanTestimonial.avatarSrc}
          />
        </div>
      </div>
    </section>
  );
}

// ----- Body card 1: binary stream → Your DB -----------------------------------
//
// Mirrors Figma 219:18682. All positions are inline pixel values pulled from
// the Figma MCP design context for 219:18681. Rendered as React/CSS so the
// binary digits + decorators + cylinder icon stay vector-sharp at any DPR.

const ENCRYPT_BORDER = "#212eeb";

type BinaryItem =
  | { type: "decorator"; color: string }
  | { type: "digit"; value: "0" | "1"; faded?: boolean };

const BINARY_ROW: BinaryItem[] = [
  { type: "decorator", color: "#ff5ba0" },
  { type: "digit", value: "1" },
  { type: "digit", value: "0", faded: true },
  { type: "digit", value: "1" },
  { type: "digit", value: "1" },
  { type: "decorator", color: "#b34842" },
  { type: "digit", value: "0", faded: true },
  { type: "decorator", color: "#ec40ff" },
  { type: "digit", value: "0", faded: true },
  { type: "decorator", color: "#ffca8a" },
  { type: "digit", value: "1" },
  { type: "decorator", color: "#c090ff" },
  { type: "digit", value: "0", faded: true },
  { type: "digit", value: "0", faded: true },
  { type: "decorator", color: "#4edcff" },
];

function Decorator({ color }: { color: string }) {
  // 4-dot diamond decorator — 4 small 5.208px squares positioned in a + pattern
  // around a 15.626×15.626 box (matches Figma 219:18688 cluster geometry).
  const dot = (left: number, top: number): React.CSSProperties => ({
    position: "absolute",
    left,
    top,
    width: 5.208,
    height: 5.208,
    background: color,
  });
  return (
    <div
      style={{
        position: "relative",
        width: 15.626,
        height: 15.626,
        flexShrink: 0,
      }}
    >
      <div style={dot(5.21, 0)} />
      <div style={dot(0, 5.21)} />
      <div style={dot(10.42, 5.21)} />
      <div style={dot(5.21, 10.42)} />
    </div>
  );
}

function BinaryRow() {
  return (
    <div
      style={{
        position: "absolute",
        top: 69.03,
        left: "50%",
        transform: "translateX(-50%)",
        border: `2px solid ${ENCRYPT_BORDER}`,
        padding: 8,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {BINARY_ROW.map((item, i) =>
        item.type === "decorator" ? (
          <Decorator key={i} color={item.color} />
        ) : (
          <span
            key={i}
            style={{
              fontFamily: "'Fira Code', monospace",
              fontWeight: 400,
              fontSize: 25,
              lineHeight: 1.2,
              letterSpacing: "3.75px",
              color: "#111",
              opacity: item.faded ? 0.52 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {item.value}
          </span>
        ),
      )}
    </div>
  );
}

// 33 bars composing the stacked database cylinder icon. Each bar is a 2px-tall
// (or 2px-wide for verticals) `#212eeb` rectangle. Coordinates are relative to
// the 119×144 "Your DB" outer box (the (x,y,w,h) tuple maps directly to MCP
// data-node-id="219:18729"… layers).
const CYLINDER_BARS: Array<[number, number, number, number]> = [
  // Ring 1 — top lid
  [46, 26, 28, 2],
  [74, 28, 10, 2],
  [36, 28, 10, 2],
  [84, 30, 4, 2],
  [32, 30, 4, 2],
  [88, 32, 2, 2],
  [30, 32, 2, 2],
  [84, 34, 4, 2],
  [32, 34, 4, 2],
  [74, 36, 10, 2],
  [36, 36, 10, 2],
  [46, 38, 28, 2],
  // Ring 1 → Ring 2 expansion (side walls + ring-2 bottom)
  [74, 52, 10, 2],
  [36, 52, 10, 2],
  [84, 50, 4, 2],
  [86, 36, 2, 14],
  [32, 50, 4, 2],
  [32, 36, 2, 14],
  [46, 54, 28, 2],
  // Ring 2 → Ring 3 expansion
  [74, 68, 10, 2],
  [36, 68, 10, 2],
  [84, 66, 4, 2],
  [86, 52, 2, 14],
  [32, 66, 4, 2],
  [32, 52, 2, 14],
  [46, 70, 28, 2],
  // Ring 3 → Ring 4 expansion
  [74, 84, 10, 2],
  [36, 84, 10, 2],
  [84, 82, 4, 2],
  [86, 68, 2, 14],
  [32, 82, 4, 2],
  [32, 68, 2, 14],
  [46, 86, 28, 2],
];

function YourDbBox() {
  return (
    <div
      style={{
        position: "absolute",
        top: 186,
        left: 137,
        width: 119,
        height: 144,
        border: `2px solid ${ENCRYPT_BORDER}`,
      }}
    >
      {CYLINDER_BARS.map(([left, top, w, h], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left,
            top,
            width: w,
            height: h,
            background: ENCRYPT_BORDER,
          }}
        />
      ))}
      <p
        className="font-urbanist font-bold uppercase whitespace-nowrap"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 113,
          color: ENCRYPT_BORDER,
          fontSize: 16,
          lineHeight: 1.2,
          letterSpacing: "0.8px",
          margin: 0,
          textAlign: "center",
        }}
      >
        Your DB
      </p>
    </div>
  );
}

function CardTitleBlock() {
  return (
    <div
      className="flex flex-col items-start"
      style={{
        position: "absolute",
        bottom: 28,
        left: 28,
        width: 305,
        gap: 8,
      }}
    >
      <p
        className="font-urbanist font-bold"
        style={{
          color: "#111",
          fontSize: 28,
          lineHeight: 1.2,
          letterSpacing: "-0.84px",
          margin: 0,
        }}
      >
        Custom Data Encryption
      </p>
      <p
        className="font-urbanist"
        style={{
          color: "#111",
          opacity: 0.52,
          fontSize: 18,
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        Host your data where you need it
      </p>
    </div>
  );
}

function CustomEncryptionCard() {
  return (
    <div
      style={{
        position: "relative",
        width: 400,
        height: 493,
        background: "#f7f7f7",
        border: "2px solid #f7f7f7",
        borderRadius: 24,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <BinaryRow />
      {/* Vertical connecting line between binary row and Your DB box */}
      <div
        style={{
          position: "absolute",
          top: 115,
          left: "50%",
          transform: "translateX(-50%)",
          width: 2,
          height: 73,
          background: ENCRYPT_BORDER,
        }}
      />
      <YourDbBox />
      <CardTitleBlock />
    </div>
  );
}

// ----- Body card 2: 8GB with diagonal strikethrough ---------------------------
//
// Mirrors Figma 219:18768. The "8" + "Gb" lockup is centered as one composite,
// then a 5px-tall #111 bar rotated ~34.76° draws the slash on top.

function EightGbCard() {
  return (
    <div
      style={{
        position: "relative",
        width: 400,
        height: 493,
        background: "#f7f7f7",
        border: "2px solid #f7f7f7",
        borderRadius: 24,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* "8" — Figma 219:18774. Center-anchored at x=144 (calc(50% − 56)),
          top=62 (calc(50% − 184.5)) of the 400×493 card. translateX(-50%)
          horizontally centers the glyph on left=144. line-height 1.2
          matches the parent contents wrapper's `leading-[1.2]` and is
          what aligns the "8" baseline with the "GB" baseline (with
          line-height 1 the "8" sits ~22px lower in its own box and
          descends past the GB base). */}
      <p
        className="font-urbanist"
        style={{
          position: "absolute",
          top: 62,
          left: 144,
          transform: "translateX(-50%)",
          fontWeight: 400,
          fontSize: 212.748,
          lineHeight: 1.2,
          color: "#ff420e",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        8
      </p>
      {/* "Gb" — Figma 219:18775. Center-anchored at x=256 (calc(50% + 56)),
          top=185 (calc(50% − 61.5)). Same leading-[1.2] as the "8". */}
      <p
        className="font-urbanist font-bold uppercase"
        style={{
          position: "absolute",
          top: 185,
          left: 256,
          transform: "translateX(-50%)",
          fontWeight: 700,
          fontSize: 82.944,
          lineHeight: 1.2,
          color: "#ff420e",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        Gb
      </p>
      {/* Diagonal strikethrough — Figma 219:18776. 329.563×5 #111 bar
          rotated 34.76°, centered at (200.44, 197.91) of the card
          (calc(50% + 0.44), calc(50% − 48.59)). */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 197.91,
          left: "calc(50% + 0.44px)",
          width: 329.563,
          height: 5,
          background: "#111",
          transform: "translate(-50%, -50%) rotate(34.76deg)",
          transformOrigin: "center center",
        }}
      />
      <CardTitleBlock />
    </div>
  );
}
