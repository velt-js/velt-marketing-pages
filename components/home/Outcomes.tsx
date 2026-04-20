// Outcomes — Figma node 8506:97016. Purple rounded-top band with a 5-tab
// rail, a big gradient-word headline, and a side-by-side visual + testimonial.

type Tab = { label: string; icon: string; active: boolean };

const tabs: Tab[] = [
  { label: "Boost Engagement", icon: "/images/home/icon-broadcast.svg", active: true },
  { label: "Boost Growth",     icon: "/images/home/icon-chart-line.svg", active: false },
  { label: "Differentiate",    icon: "/images/home/icon-versions.svg", active: false },
  { label: "Save Cost",        icon: "/images/home/icon-dollar.svg", active: false },
  { label: "Ship Fast",        icon: "/images/home/icon-clock.svg", active: false },
];

export function Outcomes() {
  return (
    <section
      className="flex flex-col items-start w-full relative"
      style={{
        background: "#625df5",
        padding: "48px 80px 220px",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
    >
      <div className="flex flex-col w-full" style={{ gap: 45 }}>
        {/* Tab rail */}
        <div
          className="flex items-center w-full"
          style={{ gap: 2, borderBottom: "2px solid rgba(255,255,255,0.12)" }}
        >
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className="flex-1 flex items-center justify-center gap-3 relative"
              style={{
                padding: "16px 20px",
                borderBottom: tab.active ? "2px solid #fff" : "none",
                marginBottom: tab.active ? -2 : 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tab.icon} alt="" width={20} height={20} style={{ opacity: tab.active ? 1 : 0.52 }} />
              <span
                className={`font-urbanist ${tab.active ? "font-bold" : "font-medium"} whitespace-nowrap`}
                style={{
                  fontSize: 18,
                  lineHeight: 1.2,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  opacity: tab.active ? 1 : 0.52,
                }}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>

        {/* Headline + sub */}
        <div className="flex flex-col items-start w-full" style={{ gap: 16 }}>
          <h2
            className="font-urbanist font-bold text-white"
            style={{
              fontSize: 52,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              width: 1280,
            }}
          >
            Drive double-digit{" "}
            <span
              style={{
                background: "linear-gradient(to right, #5cffce, #dadaff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              engagement
            </span>{" "}
            in your product
          </h2>
          <p
            className="font-urbanist font-semibold text-white"
            style={{
              fontSize: 24,
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              opacity: 0.75,
              width: 1280,
            }}
          >
            Users spend 10+ hours a week communicating on other platforms. Bring
            those conversations into your product!
          </p>
        </div>

        {/* Visual + testimonial card */}
        <div className="flex items-center w-full" style={{ gap: 12 }}>
          <div className="flex-1 relative" style={{ height: 513 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/outcomes-visual.png"
              alt="With Velt vs Without Velt comparison"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ borderRadius: 32 }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: 32,
                boxShadow:
                  "inset -8px -8px 32px 0px rgba(99,132,235,0.32), inset 0px 0px 32px 0px rgba(99,132,235,0.52)",
              }}
            />
          </div>

          <div
            className="flex flex-col justify-between shrink-0"
            style={{
              width: 400,
              height: 513,
              background: "rgba(0,0,0,0.6)",
              borderRadius: 32,
              padding: "36px 36px 43px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/home/trumpet-logo.svg"
              alt="Trumpet"
              width={133}
              height={23}
              style={{ width: 133, height: 23 }}
            />

            <div className="flex flex-col w-full" style={{ gap: 32 }}>
              <p
                className="font-urbanist font-bold text-white"
                style={{ fontSize: 32, lineHeight: 1.2 }}
              >
                Engagement at Trumpet grew by 10%&rdquo; after adding
                collaborative features from Velt
              </p>
              <div className="flex items-center w-full" style={{ gap: 16 }}>
                <div
                  className="shrink-0 relative overflow-hidden"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    border: "1.887px solid #fcca44",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/home/william-angle.png"
                    alt="William Angle"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col text-white" style={{ gap: 4 }}>
                  <p className="font-urbanist font-bold" style={{ fontSize: 16, lineHeight: 1.2 }}>
                    William Angle
                  </p>
                  <p className="font-urbanist" style={{ fontSize: 16, lineHeight: 1.2 }}>
                    Lead PM, Trumpet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
