// Connectors — Figma node 8506:101917. Header at top, then a 2×3 grid of
// integration categories (Messaging, Storage, CRM, Analytics, Email,
// Workflow Automation). Each cell is 640×313 with a 2px border.

type Category = {
  title: string;
  description: string;
  logos: { src: string; w: number; h: number; alt: string }[];
};

const messaging: Category = {
  title: "Messaging",
  description: "Push messages to Discord, Slack and Microsoft Teams",
  logos: [
    { src: "/images/home/logo-discord.svg", w: 55, h: 42, alt: "Discord" },
    { src: "/images/home/logo-slack-1.svg", w: 37, h: 42, alt: "Slack" },
    { src: "/images/home/logo-ms-teams.png", w: 65, h: 66, alt: "Microsoft Teams" },
  ],
};
const storage: Category = {
  title: "Storage",
  description: "Store data in your preferred storage  S3, Azure or GCP",
  logos: [
    { src: "/images/home/logo-aws-s3-1.png", w: 146, h: 68, alt: "AWS S3" },
    { src: "/images/home/logo-azure.png", w: 134, h: 61, alt: "Microsoft Azure" },
    { src: "/images/home/logo-gcp-1.png", w: 128, h: 75, alt: "Google Cloud" },
  ],
};
const crm: Category = {
  title: "CRM",
  description: "Trigger notification or messages",
  logos: [
    { src: "/images/home/logo-hubspot.svg", w: 132, h: 38, alt: "HubSpot" },
    { src: "/images/home/logo-close-raw.svg", w: 133, h: 36, alt: "Close" },
  ],
};
const analytics: Category = {
  title: "Analytics",
  description: "Trigger notification or messages",
  logos: [
    { src: "/images/home/logo-opentelemetry.svg", w: 145, h: 55, alt: "OpenTelemetry" },
    { src: "/images/home/logo-segment.svg", w: 52, h: 53, alt: "Segment" },
  ],
};
const email: Category = {
  title: "Email",
  description: "Trigger notification or messages",
  logos: [
    { src: "/images/home/logo-resend.svg", w: 93, h: 20, alt: "Resend" },
    { src: "/images/home/logo-customerio.svg", w: 142, h: 20, alt: "Customer.io" },
    { src: "/images/home/logo-loops.svg", w: 100, h: 22, alt: "Loops" },
    { src: "/images/home/logo-sendgrid.svg", w: 32, h: 32, alt: "Sendgrid" },
  ],
};
const workflow: Category = {
  title: "Workflow Automation",
  description: "Trigger notification or messages",
  logos: [
    { src: "/images/home/logo-zapier.svg", w: 139, h: 38, alt: "Zapier" },
    { src: "/images/home/logo-inngest.png", w: 60, h: 60, alt: "Inngest" },
    { src: "/images/home/logo-windmill.svg", w: 65, h: 64, alt: "Windmill" },
  ],
};

const categories: Category[] = [messaging, storage, crm, analytics, email, workflow];

function CategoryCell({
  cat,
  borderRight,
  borderBottom,
}: {
  cat: Category;
  borderRight: boolean;
  borderBottom: boolean;
}) {
  return (
    <div
      className="relative shrink-0 bg-white"
      style={{
        width: 640,
        height: 313,
        borderRight: borderRight ? "2px solid #111" : undefined,
        borderBottom: borderBottom ? "2px solid #111" : undefined,
      }}
    >
      {/* Logos row — centered at top */}
      <div
        className="absolute flex items-center justify-center"
        style={{ top: 60, left: 0, right: 0, gap: 60, height: 100 }}
      >
        {cat.logos.map((logo) => (
          <div
            key={logo.alt}
            className="flex items-center justify-center shrink-0"
            style={{ width: logo.w, height: logo.h }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ maxWidth: logo.w, maxHeight: logo.h, objectFit: "contain" }}
            />
          </div>
        ))}
      </div>

      {/* Title + description bottom-left */}
      <div
        className="absolute flex flex-col items-start"
        style={{ top: 218, left: 29, width: 305, gap: 8 }}
      >
        <h3
          className="font-urbanist font-bold"
          style={{ color: "#111", fontSize: 28, lineHeight: 1.2, letterSpacing: "-0.03em" }}
        >
          {cat.title}
        </h3>
        <p
          className="font-urbanist"
          style={{ color: "#111", fontSize: 18, lineHeight: 1.2, opacity: 0.52 }}
        >
          {cat.description}
        </p>
      </div>
    </div>
  );
}

export function Connectors() {
  return (
    <section
      className="flex flex-col items-center bg-white relative"
      style={{ padding: "52px 80px 0", gap: 32 }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 32 }}>
        <div className="flex flex-col items-center text-center" style={{ gap: 12 }}>
          <h2
            className="font-urbanist font-bold whitespace-nowrap"
            style={{ color: "#111", fontSize: 48, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Connect Velt with your Apps
          </h2>
          <p className="font-urbanist" style={{ color: "#111", fontSize: 20, lineHeight: 1.2 }}>
            Velt provides support across libraries
          </p>
        </div>
        <div className="flex items-start" style={{ gap: 12 }}>
          <button
            className="flex items-center justify-center gap-1 rounded-lg"
            style={{ width: 156, height: 44, padding: "8px 16px", border: "2px solid #3152f5" }}
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
            style={{ width: 156, height: 44, padding: "8px 16px", background: "#625cf4" }}
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

      {/* 2×3 grid */}
      <div
        className="grid grid-cols-2 grid-rows-3 overflow-hidden bg-white"
        style={{ width: 1280, border: "2px solid #111", borderRadius: 24 }}
      >
        {categories.map((cat, i) => (
          <CategoryCell
            key={cat.title}
            cat={cat}
            borderRight={i % 2 === 0}
            borderBottom={i < 4}
          />
        ))}
      </div>
    </section>
  );
}
