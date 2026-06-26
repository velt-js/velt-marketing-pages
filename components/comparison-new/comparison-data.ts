// Content source of truth for the editorial /comparison page. Copy is ported
// from the legacy components/comparison/reasons/* cards (Figma 180:79110+),
// reframed for the warm `.vlp` light theme. Each reason holds one or more
// head-to-head pairs: the Velt side (positive) and the "Others" side (muted).

/** Media shown in a card's top slot. `video` autoplays muted+looped;
 *  `image` is contained on a cream wash; `marquee` scrolls a wide strip
 *  horizontally; `react` renders the inline React-atom glyph. */
export type CardMedia =
  | { kind: "video"; src: string }
  | { kind: "image"; src: string }
  | { kind: "marquee"; src: string }
  | { kind: "react" };

/** One side (Velt or Others) of a comparison pair. */
export type ComparisonSide = {
  title: string;
  subtitle: string;
  media: CardMedia;
};

/** A single Velt-vs-Others comparison point within a reason. */
export type ComparisonPair = {
  velt: ComparisonSide;
  other: ComparisonSide;
};

const MEDIA_BASE = "/images/comparison/sections";
const VIDEO_BASE = "/videos/comparison";

/** One of the six reasons, with its index-card label and comparison pairs. */
export type ComparisonReason = {
  num: number;
  heading: string;
  subheading: string;
  pairs: ComparisonPair[];
};

export const REASONS: ComparisonReason[] = [
  {
    num: 1,
    heading: "Product maturity",
    subheading: "How refined, robust, and complete is the SDK?",
    pairs: [
      {
        velt: {
          title: "25+ functional features",
          subtitle:
            "Enhanced by 1000+ small refinements innovated over three years of development.",
          media: { kind: "marquee", src: `${MEDIA_BASE}/features-velt.svg` },
        },
        other: {
          title: "3 basic features + API",
          subtitle:
            "Bare-bones functionality assembled over the past six months.",
          media: {
            kind: "marquee",
            src: `${MEDIA_BASE}/features-competitor.svg`,
          },
        },
      },
      {
        velt: {
          title: "All frameworks",
          subtitle: "React, Angular, Vue, Next.js, and vanilla JS supported.",
          media: { kind: "marquee", src: `${MEDIA_BASE}/frameworks.svg` },
        },
        other: {
          title: "Just React",
          subtitle: "Locked to a single framework with no path out.",
          media: { kind: "react" },
        },
      },
    ],
  },
  {
    num: 2,
    heading: "Implementation cost",
    subheading: "Everything actually involved in shipping the integration.",
    pairs: [
      {
        velt: {
          title: "Complete architecture",
          subtitle: "Every layer you need: UX, logic, API, and backend.",
          media: { kind: "image", src: `${MEDIA_BASE}/complete-architecture.png` },
        },
        other: {
          title: "Partial solution",
          subtitle: "Mainly backend; you build the rest yourself.",
          media: { kind: "image", src: `${MEDIA_BASE}/partial-architecture.png` },
        },
      },
      {
        velt: {
          title: "Ships in a day",
          subtitle:
            "A fully functional experience out of the box, customizable to your needs.",
          media: { kind: "video", src: `${VIDEO_BASE}/lines-of-code-velt.mp4` },
        },
        other: {
          title: "Takes weeks",
          subtitle:
            "Requires an excessive amount of code just to get the feature working.",
          media: {
            kind: "video",
            src: `${VIDEO_BASE}/lines-of-code-competitor.mp4`,
          },
        },
      },
      {
        velt: {
          title: "Simple integration",
          subtitle: "So easy an intern can do it.",
          media: { kind: "image", src: `${MEDIA_BASE}/simple-integration.png` },
        },
        other: {
          title: "Complex integration",
          subtitle: "Requires senior engineers to wire up.",
          media: { kind: "image", src: `${MEDIA_BASE}/complex-integration.png` },
        },
      },
    ],
  },
  {
    num: 3,
    heading: "Scalability",
    subheading: "How the SDK handles growth in real-world usage.",
    pairs: [
      {
        velt: {
          title: "2,000 GB base plan",
          subtitle: "Never worry about hitting the upper limit.",
          media: { kind: "video", src: `${VIDEO_BASE}/scalability-velt.mp4` },
        },
        other: {
          title: "8 GB base plan",
          subtitle: "Exhaust the usage limit quickly as you grow.",
          media: {
            kind: "video",
            src: `${VIDEO_BASE}/scalability-competitor.mp4`,
          },
        },
      },
    ],
  },
  {
    num: 4,
    heading: "User experience",
    subheading: "How polished every interaction feels for your users.",
    pairs: [
      {
        velt: {
          title: "Magical delight in every pixel",
          subtitle: "A smooth experience through and through.",
          media: { kind: "video", src: `${VIDEO_BASE}/experience-velt.mp4` },
        },
        other: {
          title: "Primitive experience",
          subtitle: "Rough edges and buggy interactions out of the box.",
          media: {
            kind: "video",
            src: `${VIDEO_BASE}/experience-competitor.mp4`,
          },
        },
      },
    ],
  },
  {
    num: 5,
    heading: "Security",
    subheading: "Enterprise-grade protection, on by default.",
    pairs: [
      {
        velt: {
          title: "Option to self-host data",
          subtitle: "Keep full control of your sensitive data.",
          media: { kind: "video", src: `${VIDEO_BASE}/storage-velt.mp4` },
        },
        other: {
          title: "No self-hosting option",
          subtitle: "Sensitive data must reside in their system.",
          media: { kind: "video", src: `${VIDEO_BASE}/storage-competitor.mp4` },
        },
      },
      {
        velt: {
          title: "GDPR APIs",
          subtitle: "Built-in compliance APIs for GDPR.",
          media: { kind: "video", src: `${VIDEO_BASE}/gdpr-velt.mp4` },
        },
        other: {
          title: "No GDPR APIs",
          subtitle: "Simple UI templates with no compliance logic.",
          media: { kind: "video", src: `${VIDEO_BASE}/gdpr-competitor.mp4` },
        },
      },
      {
        velt: {
          title: "SOC 2 & HIPAA + pen testing",
          subtitle: "Fully compliant, plus annual penetration testing.",
          media: { kind: "image", src: `${MEDIA_BASE}/security-velt.png` },
        },
        other: {
          title: "SOC 2 & HIPAA",
          subtitle: "Meets base compliance requirements only.",
          media: { kind: "image", src: `${MEDIA_BASE}/security-competitors.png` },
        },
      },
    ],
  },
  {
    num: 6,
    heading: "Support",
    subheading: "How you get help when you actually need it.",
    pairs: [
      {
        velt: {
          title: "Dedicated Slack channels",
          subtitle: "Connect directly with our team for smooth onboarding.",
          media: { kind: "image", src: `${MEDIA_BASE}/support-slack.png` },
        },
        other: {
          title: "Email support",
          subtitle: "Email-only support with no certainty on timing.",
          media: { kind: "image", src: `${MEDIA_BASE}/support-email.png` },
        },
      },
    ],
  },
];

/** A single line item inside a pricing-compare card. */
export type PriceRow = { positive: boolean; label: string };

/** A pricing-compare card (Velt vs Others). */
export type PriceCardData = {
  brand: string;
  model: string;
  amount: string;
  suffix: string;
  rows: PriceRow[];
};

export const PRICE_VELT: PriceCardData = {
  brand: "Velt",
  model: "Document-activity-based pricing",
  amount: "$1,299",
  suffix: "/mo",
  rows: [
    { positive: true, label: "Active documents only" },
    { positive: true, label: "Charged only for real collaboration" },
  ],
};

export const PRICE_OTHER: PriceCardData = {
  brand: "Others",
  model: "Document-initiation-based pricing",
  amount: "~$1,150",
  suffix: "/mo",
  rows: [
    { positive: false, label: "All documents counted" },
    { positive: false, label: "Charged for initiation, not value" },
  ],
};
