// Content source of truth for the editorial /comparison page. Copy is ported
// from the legacy components/comparison/reasons/* cards (Figma 180:79110+),
// reframed for the warm `.vlp` light theme. Each reason holds one or more
// head-to-head pairs: the Velt side (positive) and the "Others" side (muted).

/** A single Velt-vs-Others comparison point within a reason. */
export type ComparisonPair = {
  velt: { title: string; subtitle: string };
  other: { title: string; subtitle: string };
};

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
        },
        other: {
          title: "3 basic features + API",
          subtitle:
            "Bare-bones functionality assembled over the past six months.",
        },
      },
      {
        velt: {
          title: "All frameworks",
          subtitle: "React, Angular, Vue, Next.js, and vanilla JS supported.",
        },
        other: {
          title: "Just React",
          subtitle: "Locked to a single framework with no path out.",
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
          subtitle: "Every layer you need — UX, logic, API, and backend.",
        },
        other: {
          title: "Partial solution",
          subtitle: "Mainly backend; you build the rest yourself.",
        },
      },
      {
        velt: {
          title: "Ships in a day",
          subtitle:
            "A fully functional experience out of the box, customizable to your needs.",
        },
        other: {
          title: "Takes weeks",
          subtitle:
            "Requires an excessive amount of code just to get the feature working.",
        },
      },
      {
        velt: {
          title: "Simple integration",
          subtitle: "So easy an intern can do it.",
        },
        other: {
          title: "Complex integration",
          subtitle: "Requires senior engineers to wire up.",
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
        },
        other: {
          title: "8 GB base plan",
          subtitle: "Exhaust the usage limit quickly as you grow.",
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
        },
        other: {
          title: "Primitive experience",
          subtitle: "Rough edges and buggy interactions out of the box.",
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
        },
        other: {
          title: "No self-hosting option",
          subtitle: "Sensitive data must reside in their system.",
        },
      },
      {
        velt: {
          title: "GDPR APIs",
          subtitle: "Built-in compliance APIs for GDPR.",
        },
        other: {
          title: "No GDPR APIs",
          subtitle: "Simple UI templates with no compliance logic.",
        },
      },
      {
        velt: {
          title: "SOC 2 & HIPAA + pen testing",
          subtitle: "Fully compliant, plus annual penetration testing.",
        },
        other: {
          title: "SOC 2 & HIPAA",
          subtitle: "Meets base compliance requirements only.",
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
        },
        other: {
          title: "Email support",
          subtitle: "Email-only support with no certainty on timing.",
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
  model: "Document-activity based pricing",
  amount: "$1,299",
  suffix: "/mo",
  rows: [
    { positive: true, label: "Active documents only" },
    { positive: true, label: "Charged only for real collaboration" },
  ],
};

export const PRICE_OTHER: PriceCardData = {
  brand: "Others",
  model: "Document-initiation based pricing",
  amount: "~$1,150",
  suffix: "/mo",
  rows: [
    { positive: false, label: "All documents counted" },
    { positive: false, label: "Charged for initiation, not value" },
  ],
};
