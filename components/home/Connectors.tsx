// Connectors — matches live velt.dev "Connect Velt with 3rd Party Apps".
// Logo positioning ripped from the Framer export CSS
// (`/Users/yoenzhang/Downloads/79f9d44e-aee0-4640-93c0-37f7eddaf158/page.html`):
// cell height 365px, text block absolute at bottom:30/left:30/right:30,
// each logo placed with Framer's own calc(XX% − Ypx) coordinates.

import { InlineTestimonialCard } from "./InlineTestimonialCard";

type Logo = {
  src: string;
  alt: string;
  left: string;
  top: string;
  w: number;
  h: number;
};

type Category = {
  title: string;
  description: string;
  logos: Logo[];
  emailComposite?: boolean; // Email uses inset-based layout, not per-logo position
};

// Row 1
const messaging: Category = {
  title: "Messaging",
  description: "Push messages to Discord, Slack and Microsoft Teams",
  // framer-dghwby: 269×94 centered — top calc(40% - 47px), left calc(50% - 134.5px)
  logos: [
    {
      src: "/images/home/connector-messaging.png",
      alt: "Discord, Slack, Microsoft Teams",
      left: "calc(50% - 134.5px)",
      top: "calc(40% - 47px)",
      w: 269,
      h: 94,
    },
  ],
};

const storage: Category = {
  title: "Storage",
  description: "Store data on platforms like GCP, AWS S3, or Microsoft Azure",
  logos: [
    // framer-5m3usk: Google Cloud Storage 114×79
    {
      src: "/images/home/connector-storage-gcp.png",
      alt: "Google Cloud Storage",
      left: "calc(25.6219% - 57.1889px)",
      top: "calc(23.5616% - 39.4298px)",
      w: 114,
      h: 79,
    },
    // framer-91cetd: AWS|S3 105×48
    {
      src: "/images/home/connector-storage-aws.png",
      alt: "AWS S3",
      left: "calc(52.9851% - 52.6501px)",
      top: "calc(48.4932% - 24.0205px)",
      w: 105,
      h: 48,
    },
    // framer-9wfuxs: Microsoft Azure Blob Storage 164×49
    {
      src: "/images/home/connector-storage-azure.png",
      alt: "Microsoft Azure Blob Storage",
      left: "calc(68.1592% - 82.1523px)",
      top: "calc(23.5616% - 24.4737px)",
      w: 164,
      h: 49,
    },
  ],
};

// Row 2
const crm: Category = {
  title: "CRM",
  description: "Link collaboration data to your customer lists",
  logos: [
    // framer-a4ur7u: HubSpot 105×31
    {
      src: "/images/home/connector-crm-hubspot.png",
      alt: "HubSpot",
      left: "calc(27.6119% - 52.5px)",
      top: "calc(40% - 15.5px)",
      w: 105,
      h: 31,
    },
    // framer-1o92qac: Close 107×30
    {
      src: "/images/home/connector-crm-close.png",
      alt: "Close",
      left: "calc(67.1642% - 53.5px)",
      top: "calc(40% - 14.75px)",
      w: 107,
      h: 30,
    },
  ],
};

const analytics: Category = {
  title: "Analytics",
  description: "Collect telemetry for analytics platforms",
  logos: [
    // framer-1x10v9a: OpenTelemetry 128×48
    {
      src: "/images/home/connector-analytics-otel.png",
      alt: "OpenTelemetry",
      left: "calc(37.3134% - 63.75px)",
      top: "calc(41.0959% - 24px)",
      w: 128,
      h: 48,
    },
    // framer-yfd9na: Segment 47×48
    {
      src: "/images/home/connector-analytics-segment.png",
      alt: "Segment",
      left: "calc(72.6368% - 23.25px)",
      top: "calc(41.0959% - 23.75px)",
      w: 47,
      h: 48,
    },
  ],
};

// Row 3
const workflow: Category = {
  title: "Workflow Automation",
  description: "Make Velt features a part of existing workflows",
  logos: [
    // framer-oaoild: Inngest 44×45 (left)
    {
      src: "/images/home/connector-workflow-inngest.png",
      alt: "Inngest",
      left: "calc(16.6667% - 21.75px)",
      top: "calc(35.0685% - 22.25px)",
      w: 44,
      h: 45,
    },
    // framer-wmfe5k: Zapier 113×31 (middle)
    {
      src: "/images/home/connector-workflow-zapier.png",
      alt: "Zapier",
      left: "calc(48.5075% - 56.25px)",
      top: "calc(35.0685% - 15.5px)",
      w: 113,
      h: 31,
    },
    // framer-35fgua: Windmill 41×41 (right)
    {
      src: "/images/home/connector-workflow-windmill.png",
      alt: "Windmill",
      left: "calc(78.1095% - 20.5px)",
      top: "calc(34.5206% - 20.5px)",
      w: 41,
      h: 41,
    },
  ],
};

const email: Category = {
  title: "Email",
  description: "Send email notifications or updates on popular platforms",
  emailComposite: true,
  // framer-s6d80r: inset 81px 56px 185px 57px — fills upper portion of cell
  logos: [
    {
      src: "/images/home/connector-email.png",
      alt: "Resend, Customer.io, Loops, Sendgrid",
      left: "57px",
      top: "81px",
      w: 0, // ignored for composite
      h: 0,
    },
  ],
};

const categories: Category[] = [messaging, storage, crm, analytics, workflow, email];

function CategoryCell({ cat }: { cat: Category }) {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        height: 365,
        background: "#f4f4f5",
        borderRadius: 24,
      }}
    >
      {cat.emailComposite ? (
        <div
          style={{
            position: "absolute",
            top: 81,
            right: 56,
            bottom: 185,
            left: 57,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cat.logos[0].src}
            alt={cat.logos[0].alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>
      ) : (
        cat.logos.map((logo) => (
          <div
            key={logo.alt}
            style={{
              position: "absolute",
              left: logo.left,
              top: logo.top,
              width: logo.w,
              height: logo.h,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        ))
      )}

      <div
        className="flex flex-col items-start"
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          right: 30,
          gap: 8,
        }}
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
      className="flex flex-col items-center bg-white relative px-6 lg:px-20 pt-20 lg:pt-[150px] gap-10 lg:gap-13"
    >
      {/* Header — max-width 820 per Framer */}
      <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-[820px] w-full">
        <div className="flex flex-col items-center text-center gap-3 w-full">
          <h2
            className="font-urbanist font-bold"
            style={{
              color: "#111",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
            }}
          >
            Connect Velt with 3rd Party Apps
          </h2>
          <p
            className="font-urbanist"
            style={{
              color: "#111",
              fontSize: "clamp(16px, 1.5vw, 20px)",
              lineHeight: 1.3,
            }}
          >
            Velt connects with other services in your product workflow
          </p>
        </div>
        <div className="flex items-start gap-3">
          <a
            href="https://docs.velt.dev/integrations"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-1 rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              border: "2px solid #625df5",
              textDecoration: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/icon-book-2.svg" alt="" width={18} height={18} />
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em", mixBlendMode: "exclusion" }}
            >
              View Docs
            </span>
          </a>
          <a
            href="/book-demo"
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 156,
              height: 44,
              padding: "8px 16px",
              background: "#625df5",
              textDecoration: "none",
            }}
          >
            <span
              className="font-urbanist font-semibold text-white whitespace-nowrap"
              style={{ fontSize: 16, letterSpacing: "-0.03em" }}
            >
              Book Demo
            </span>
          </a>
        </div>
      </div>

      {/* Category grid — 1 col below lg, 2 cols at lg+. Each cell holds
          logos positioned via calc(X% − Ypx) so they re-center inside
          whatever the cell width ends up being on each breakpoint. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-[824px]">
        {categories.map((cat) => (
          <CategoryCell key={cat.title} cat={cat} />
        ))}
      </div>

      <div className="w-full max-w-[824px]">
        <InlineTestimonialCard
          name="Hope Callaway"
          role="Senior PM @Leadpages"
          quote="With Velt, implementation took weeks instead of the quarters it would have taken, even with 3 FTEs"
          avatarSrc="/images/home/avatar-leadpages.png"
        />
      </div>
    </section>
  );
}
