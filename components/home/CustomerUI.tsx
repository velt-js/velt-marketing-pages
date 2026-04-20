// CustomerUI — Figma node 8506:97659 (1280×1092). Headline "How [HeyGen] Integrates Velt"
// with HeyGen logo inline as a purple pill, CTA row, then a dark product-shot
// card with a browser chrome (partner logos) on top and a testimonial strip
// at the bottom.

export function CustomerUI() {
  return (
    <section
      className="flex flex-col items-center bg-white"
      style={{ padding: "52px 80px 0", gap: 52 }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32 }}>
        <div className="flex flex-col items-center" style={{ gap: 16, width: 721 }}>
          <div className="flex items-center justify-center w-full" style={{ gap: 12 }}>
            <span
              className="font-urbanist font-bold whitespace-nowrap"
              style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              How
            </span>
            <div
              className="relative flex items-center justify-center overflow-hidden shrink-0"
              style={{
                width: 171.6,
                height: 57.2,
                background: "rgba(98,93,245,0.08)",
                borderRadius: 16.3,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/heygen-purple-pill.svg"
                alt="HeyGen"
                style={{ width: 145, height: 33.8, objectFit: "contain" }}
              />
            </div>
            <span
              className="font-urbanist font-bold whitespace-nowrap"
              style={{ color: "#111", fontSize: 52, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              Integrates Velt
            </span>
          </div>
          <p className="font-urbanist text-center w-full" style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}>
            Pendo uses comments to enable collaboration on dashboards and sessions replays
          </p>
        </div>
        <div className="flex items-start justify-center" style={{ gap: 12 }}>
          <button
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              border: "2px solid #625df5",
            }}
          >
            <span
              className="font-urbanist font-semibold text-white"
              style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
            >
              Book Demo
            </span>
          </button>
          <button
            className="flex items-center justify-center rounded-lg"
            style={{
              padding: "8px 16px",
              background: "#625df5",
              height: 44,
            }}
          >
            <span
              className="font-urbanist font-bold text-white"
              style={{ fontSize: 16, letterSpacing: "-0.03em" }}
            >
              View Customer Stories
            </span>
          </button>
        </div>
      </div>

      {/* Dark rounded container with browser chrome + screenshot + testimonial */}
      <div
        className="flex flex-col overflow-hidden"
        style={{
          width: 1280,
          background: "#111",
          borderRadius: 24,
        }}
      >
        {/* Browser chrome row */}
        <div
          className="flex items-center justify-between w-full"
          style={{ height: 44, padding: "0 16px", background: "#111" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/icon-chevron-right.svg" alt="" width={24} height={24} style={{ transform: "rotate(180deg)" }} />
          <div className="flex items-center" style={{ gap: 52 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/heygen-purple-pill.svg" alt="HeyGen" style={{ height: 28, objectFit: "contain" }} />
            <div style={{ opacity: 0.32 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/partner-pendo-small.svg" alt="Pendo" style={{ height: 15, objectFit: "contain" }} />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/partner-logo-3.svg" alt="Partner" style={{ height: 13, objectFit: "contain" }} />
            <div style={{ opacity: 0.3 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/home/partner-logo-4.svg" alt="Partner" style={{ height: 24, objectFit: "contain" }} />
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/icon-chevron-right.svg" alt="" width={24} height={24} />
        </div>

        {/* Product shot */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            aspectRatio: "1920/1021",
            background: "#111",
            border: "2px solid rgba(255,255,255,0.12)",
            borderRadius: 24,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/customer-ui-product.png"
            alt="HeyGen integrated with Velt"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ borderRadius: 24 }}
          />
        </div>

        {/* Testimonial footer */}
        <div
          className="flex items-center justify-between w-full"
          style={{ padding: 40, background: "#111" }}
        >
          <div className="flex items-center" style={{ gap: 16 }}>
            <div
              className="relative overflow-hidden shrink-0"
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#b387f7",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/home/linda-customerui.png"
                alt="Linda Belcher"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
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
            style={{ fontSize: 24, width: 421, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Velt got us the{" "}
            <span style={{ color: "#b387f7" }}>50% more engagement</span> at
            HeyGen that we needed!!!!!!!
          </p>
        </div>
      </div>
    </section>
  );
}
