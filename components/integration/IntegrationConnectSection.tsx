// The 3-step "connect with Velt Console" body block used on every
// /integrations/{slug} detail page. Row titles are fixed across all 17
// integrations on the live velt.dev — only the brand name in row 1 and
// the per-row body copy / image change. Rows alternate text/image columns.
//
// Step 1 renders an HTML mock of the Velt Console "New Endpoint" form
// instead of a screenshot — the brand name appears live in the dropdown
// label ("Connect to {name}"), mirroring the live velt.dev behaviour.

import Image from "next/image";

type Step = {
  title: string;
  body?: string;
  imageSrc?: string | null;
};

const CONSOLE_URL = "https://console.velt.dev/";

export function IntegrationConnectSection({
  name,
  connectBody,
  payloadBody,
  payloadImage,
  unifiedBody,
  unifiedImage,
}: {
  name: string;
  connectBody?: string;
  // connectImage is intentionally unused — step 1 renders a live HTML mock.
  connectImage?: string | null;
  payloadBody?: string;
  payloadImage?: string | null;
  unifiedBody?: string;
  unifiedImage?: string | null;
}) {
  const steps: Step[] = [
    {
      title: `Connect ${name} with Velt Console`,
      body: connectBody,
    },
    {
      title: "In-built payload transformation",
      body: payloadBody,
      imageSrc: payloadImage,
    },
    {
      title: "Provide a unified customer experience",
      body: unifiedBody,
      imageSrc: unifiedImage,
    },
  ];

  return (
    <section className="bg-white full-bleed-bg w-full py-20 lg:py-[120px] px-6 lg:px-20">
      <div className="mx-auto w-full max-w-[1200px] flex flex-col gap-16 lg:gap-[120px]">
        {steps.map((step, idx) => (
          <IntegrationRow
            key={idx}
            step={step}
            reverse={idx % 2 === 1}
            visual={
              idx === 0 ? <EndpointMock name={name} /> : <ScreenshotVisual step={step} />
            }
          />
        ))}
      </div>
    </section>
  );
}

function IntegrationRow({
  step,
  reverse,
  visual,
}: {
  step: Step;
  reverse: boolean;
  visual: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-10 lg:gap-16`}
    >
      <div className="flex flex-col w-full lg:flex-1 gap-6">
        <h2
          className="font-urbanist font-bold"
          style={{
            color: "#111",
            fontSize: "clamp(28px, 3.4vw, 40px)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {step.title}
        </h2>
        {step.body ? (
          <p
            className="font-urbanist"
            style={{
              color: "#8E8E8E",
              fontSize: 18,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {step.body}
          </p>
        ) : null}
        <a
          href={CONSOLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg self-start"
          style={{
            height: 44,
            padding: "8px 20px 8px 16px",
            background: "transparent",
            border: "1px solid #000",
            textDecoration: "none",
          }}
        >
          <PlayIcon color="#000" />
          <span
            className="font-urbanist font-semibold whitespace-nowrap"
            style={{
              color: "#000",
              fontSize: 16,
              letterSpacing: "-0.03em",
            }}
          >
            Open Console
          </span>
        </a>
      </div>

      <div className="w-full lg:flex-1">{visual}</div>
    </div>
  );
}

function ScreenshotVisual({ step }: { step: Step }) {
  if (step.imageSrc) {
    return (
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: "16/10",
          background: "#F7F7F7",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Image
          src={step.imageSrc}
          alt={step.title}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }
  return (
    <div
      className="w-full rounded-2xl"
      style={{
        aspectRatio: "16/10",
        background: "#F7F7F7",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    />
  );
}

// HTML mock of the Velt Console "New Endpoint" screen. Brand name swaps in
// the dropdown label so the same component serves all 17 integrations.
function EndpointMock({ name }: { name: string }) {
  return (
    <div
      className="relative w-full rounded-2xl flex flex-col gap-8 lg:gap-10"
      style={{
        background: "#0a0a0a",
        padding: "clamp(28px, 3vw, 40px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Breadcrumb */}
      <div
        className="flex items-center gap-2 font-urbanist"
        style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}
      >
        <span>Endpoints</span>
        <ChevronRight />
        <span style={{ color: "#fff" }}>New Endpoint</span>
      </div>

      {/* Endpoint URL form */}
      <div className="flex flex-col gap-3">
        <span
          className="font-urbanist"
          style={{ color: "#fff", fontSize: 18, lineHeight: 1.2 }}
        >
          Endpoint URL
        </span>
        <div
          className="flex items-center justify-between rounded-xl"
          style={{
            border: "1px solid rgba(255,255,255,0.18)",
            padding: "14px 18px",
          }}
        >
          <span
            className="font-urbanist"
            style={{ color: "#fff", fontSize: 18, lineHeight: 1.2 }}
          >
            Connect to {name}
          </span>
          <ChevronDown />
        </div>
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function PlayIcon({ color = "#fff" }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill={color} stroke="none" />
    </svg>
  );
}
