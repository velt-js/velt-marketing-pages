// Per-page WebPage JSON-LD payloads ported verbatim from the Framer
// site's "Start of <head>" custom-code slots. These are richer than
// the generic `buildWebPageSchema(...)` output (full customer mention
// lists, reviews with ratings, SoftwareApplication featureLists) so
// we emit them alongside the standard schema rather than replacing it.
//
// Used by:
//   - app/customers/page.tsx          → CUSTOMERS_WEBPAGE_SCHEMA
//   - app/comparison/page.tsx         → COMPARISON_WEBPAGE_SCHEMA
//   - components/feature/FeaturePageBody.tsx (slug === "recording")
//                                     → RECORDING_WEBPAGE_SCHEMA
//
// Note on the framerusercontent.com asset URLs — the Framer CDN
// remains accessible even post-cutover, so we leave those alone for
// now. Swap to Velt-hosted URLs in a follow-up once we move the
// assets.

export const CUSTOMERS_WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://velt.dev/customers",
  name: "Velt Customers - Collaboration SDK",
  description:
    "Products that use Velt to boost engagement and growth. See how customers use Velt's collaboration SDK.",
  mainEntity: {
    "@type": "SoftwareApplication",
    "@id": "#velt-collaboration-sdk",
    name: "Velt Collaboration SDK",
    applicationCategory: "DeveloperApplication",
    description: "Collaboration SDK for adding powerful collaborative features",
    url: "https://velt.dev",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      description: "Collaboration SDK with free trial",
    },
  },
  about: {
    "@type": "Organization",
    "@id": "#velt-organization",
    name: "Velt",
    url: "https://velt.dev",
    description: "Collaboration SDK platform for developers",
  },
  mentions: [
    { "@type": "Organization", name: "Google" },
    { "@type": "Organization", name: "Pendo" },
    { "@type": "Organization", name: "Varonis" },
    { "@type": "Organization", name: "HeyGen" },
    { "@type": "Organization", name: "FLYR" },
    { "@type": "Organization", name: "Bigtincan" },
    { "@type": "Organization", name: "Runway" },
    { "@type": "Organization", name: "LambdaTest" },
    { "@type": "Organization", name: "Datarails" },
    { "@type": "Organization", name: "Leadpages" },
    { "@type": "Organization", name: "Aloo" },
    { "@type": "Organization", name: "MetaImpact" },
    { "@type": "Organization", name: "CloudFactory" },
    { "@type": "Organization", name: "Trumpet" },
    { "@type": "Organization", name: "Vareto" },
    { "@type": "Organization", name: "SafetyKit" },
    { "@type": "Organization", name: "Colossyan" },
    { "@type": "Organization", name: "ClassWallet" },
    { "@type": "Organization", name: "Vellum" },
    { "@type": "Organization", name: "INTELAS" },
    { "@type": "Organization", name: "Eqtble" },
    { "@type": "Organization", name: "Flagship" },
    { "@type": "Organization", name: "Toolio" },
    { "@type": "Organization", name: "Bloomfilter" },
    { "@type": "Organization", name: "Booma" },
    { "@type": "Organization", name: "Zamp" },
    { "@type": "Organization", name: "Okayd" },
    { "@type": "Organization", name: "Eyva" },
    { "@type": "Organization", name: "MEDDICC" },
    { "@type": "Organization", name: "Marco" },
    { "@type": "Organization", name: "Awesomic" },
    { "@type": "Organization", name: "Zoomforth" },
    { "@type": "Organization", name: "Parc" },
    { "@type": "Organization", name: "That's The One" },
    { "@type": "Organization", name: "MagicStory" },
    { "@type": "Organization", name: "Prequel" },
    { "@type": "Organization", name: "TubeScience" },
    { "@type": "Organization", name: "Alayna AI" },
  ],
  hasPart: [
    {
      "@type": "WebPageElement",
      "@id": "#customer-showcase",
      name: "Customer Showcase",
      description: "How customers use Velt collaboration features",
    },
    {
      "@type": "WebPageElement",
      "@id": "#customer-testimonials",
      name: "Customer Testimonials",
      description: "Our customers trust us - testimonials and reviews",
      hasPart: [
        {
          "@type": "Review",
          itemReviewed: { "@id": "#velt-collaboration-sdk" },
          reviewBody:
            "Increased engagement by 10% and helped ship 5x faster.",
          author: {
            "@type": "Person",
            name: "William Angel",
            jobTitle: "Lead Product Manager at Trumpet",
          },
          reviewRating: { "@type": "Rating", ratingValue: 5 },
        },
        {
          "@type": "Review",
          itemReviewed: { "@id": "#velt-collaboration-sdk" },
          reviewBody:
            "We were able to launch 5x times faster than building from scratch.",
          author: {
            "@type": "Person",
            name: "Roman Sevast",
            worksFor: { "@type": "Organization", name: "Awesomic" },
          },
          reviewRating: { "@type": "Rating", ratingValue: 5 },
        },
        {
          "@type": "Review",
          itemReviewed: { "@id": "#velt-collaboration-sdk" },
          reviewBody:
            "With Velt, a single engineer could build comments feature in a few minutes.",
          author: {
            "@type": "Person",
            name: "Walter Morondo",
            jobTitle: "Senior Frontend Software Engineer",
            worksFor: { "@type": "Organization", name: "Marco" },
          },
          reviewRating: { "@type": "Rating", ratingValue: 5 },
        },
        {
          "@type": "Review",
          itemReviewed: { "@id": "#velt-collaboration-sdk" },
          reviewBody: "Saved so much time! Boosted customer happiness.",
          author: {
            "@type": "Person",
            name: "Ethan Veres",
            jobTitle: "Software Developer",
            worksFor: { "@type": "Organization", name: "Eqtble" },
          },
          reviewRating: { "@type": "Rating", ratingValue: 5 },
        },
        {
          "@type": "Review",
          itemReviewed: { "@id": "#velt-collaboration-sdk" },
          reviewBody: "Boosted engagement in our product!",
          author: {
            "@type": "Person",
            name: "Tayte Nagy",
            jobTitle: "Staff Engineer",
          },
          reviewRating: { "@type": "Rating", ratingValue: 5 },
        },
      ],
    },
    {
      "@type": "WebPageElement",
      "@id": "#collaborative-features",
      name: "Collaborative Features",
      description: "Add powerful collaborative features ridiculously fast",
    },
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://velt.dev" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Customers",
        item: "https://velt.dev/customers",
      },
    ],
  },
} as const;

export const COMPARISON_WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://velt.dev/comparison",
  name: "Velt: Alternative to Liveblocks, Cord and building it in-house",
  description:
    "100x better Experience with 90% less Code. Velt is the #1 alternative to Liveblocks, Cord and building it in-house. Compare 7 reasons why Velt outperforms competitors with better features, easier implementation, and superior developer experience.",
  keywords: [
    "Velt vs Liveblocks",
    "Velt vs Cord",
    "collaboration SDK comparison",
    "alternative to Liveblocks",
    "alternative to Cord",
    "better than building in-house",
    "SDK comparison",
    "developer experience",
    "collaboration features",
  ],
  isPartOf: {
    "@type": "WebSite",
    url: "https://velt.dev",
    name: "Velt Collaboration SDK",
  },
  publisher: { "@type": "Organization", name: "Velt", url: "https://velt.dev" },
  about: [
    {
      "@type": "SoftwareApplication",
      name: "Velt SDK",
      applicationCategory: "DeveloperApplication",
      description:
        "Superior collaboration SDK alternative to Liveblocks and Cord with 100x better experience using 90% less code",
      softwareRequirements: "JavaScript, React, Angular, Vue, or Svelte",
      offers: {
        "@type": "Offer",
        name: "14-day Free Trial",
        description: "Free trial to compare Velt with alternatives",
      },
      featureList: [
        "100x better experience",
        "90% less code required",
        "7 key advantages over competitors",
        "Superior developer experience",
        "Better implementation speed",
        "More comprehensive features",
        "Enterprise-ready solution",
        "Easier integration",
        "Better performance",
        "Superior customization options",
      ],
    },
  ],
  mentions: [
    { "@type": "Organization", name: "Google" },
    { "@type": "Organization", name: "Pendo" },
    { "@type": "Organization", name: "HeyGen" },
    { "@type": "Organization", name: "FLYR" },
    { "@type": "Organization", name: "Runway" },
    { "@type": "Organization", name: "LambdaTest" },
    { "@type": "Organization", name: "Leadpages" },
    { "@type": "Organization", name: "MetaCX" },
    { "@type": "Organization", name: "Cloudfactory" },
    { "@type": "Organization", name: "Trumpet" },
    { "@type": "Organization", name: "Colossyan" },
    { "@type": "Organization", name: "X" },
  ],
} as const;

export const RECORDING_WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://velt.dev/recording",
  name: "Velt SDK: Loom-Style Recording in your product",
  description:
    "Integrate native Loom-style recording into your app with Velt SDK in just minutes! Let users record videos, voice notes, and screen captures—complete with AI transcriptions and summaries—keeping them in-app and driving engagement.",
  keywords: [
    "Loom recording",
    "screen recording SDK",
    "video recording",
    "audio recording",
    "collaboration SDK",
    "JavaScript SDK",
    "React SDK",
    "AI transcription",
    "AI summaries",
  ],
  isPartOf: {
    "@type": "WebSite",
    url: "https://velt.dev",
    name: "Velt Collaboration SDK",
  },
  publisher: { "@type": "Organization", name: "Velt", url: "https://velt.dev" },
  about: [
    {
      "@type": "SoftwareApplication",
      name: "Velt Recording SDK",
      applicationCategory: "DeveloperApplication",
      description:
        "JavaScript SDK for adding Loom-style recording features to web applications with AI-powered transcriptions and summaries",
      softwareRequirements: "JavaScript, React, Angular, Vue, or Svelte",
      offers: {
        "@type": "Offer",
        name: "14-day Free Trial",
        description: "Free trial of Velt Recording SDK",
      },
      featureList: [
        "Audio Recording",
        "Video Recording",
        "Screen Recording",
        "All-in-one Recording",
        "AI-powered transcriptions",
        "AI-generated summaries",
        "Floating controls",
        "Customizable player",
        "In-app recording",
        "Real-time collaboration",
        "Fully customizable UI",
        "Integration in minutes",
        "Enterprise-grade security",
        "Scalable to millions of users",
      ],
      screenshot:
        "https://framerusercontent.com/images/f55C63LXVIgdqdkE8glp0IYzW0.png",
    },
  ],
  mentions: [
    { "@type": "Organization", name: "Google" },
    { "@type": "Organization", name: "Pendo" },
    { "@type": "Organization", name: "HeyGen" },
    { "@type": "Organization", name: "FLYR" },
    { "@type": "Organization", name: "Runway" },
    { "@type": "Organization", name: "LambdaTest" },
    { "@type": "Organization", name: "Leadpages" },
    { "@type": "Organization", name: "MetaCX" },
    { "@type": "Organization", name: "Cloudfactory" },
    { "@type": "Organization", name: "Trumpet" },
    { "@type": "Organization", name: "Colossyan" },
    { "@type": "Organization", name: "X" },
  ],
} as const;

export const CUSTOMIZATION_WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://velt.dev/customization",
  name: "Velt SDK: Fully Customizable Collaboration Experience",
  description:
    "Velt components can look and function the way you want. Fully customizable collaboration experiences with layout customization, CSS styling, template variables, conditional rendering, and custom behavior for your product.",
  keywords: [
    "customizable SDK",
    "UI customization",
    "CSS styling",
    "component customization",
    "collaboration SDK",
    "JavaScript SDK",
    "React SDK",
    "design system",
    "white-label collaboration",
  ],
  isPartOf: {
    "@type": "WebSite",
    url: "https://velt.dev",
    name: "Velt Collaboration SDK",
  },
  publisher: { "@type": "Organization", name: "Velt", url: "https://velt.dev" },
  about: [
    {
      "@type": "SoftwareApplication",
      name: "Velt Customization SDK",
      applicationCategory: "DeveloperApplication",
      description:
        "Fully customizable collaboration SDK that allows complete control over layout, styling, behavior, and component structure",
      softwareRequirements: "JavaScript, React, Angular, Vue, or Svelte",
      offers: {
        "@type": "Offer",
        name: "14-day Free Trial",
        description: "Free trial of Velt SDK with full customization features",
      },
      featureList: [
        "6 ways to customize components",
        "Component layout and structure",
        "CSS styling with custom properties",
        "Template variables and custom data integration",
        "Conditional UI rendering",
        "Custom behavior and functionality",
        "UI component variants",
        "Wireframe builder",
        "Add/remove/reorder components",
        "Design system integration",
        "API-powered custom UI building",
        "Build your own UI with APIs",
      ],
    },
  ],
  mentions: [
    { "@type": "Organization", name: "Google" },
    { "@type": "Organization", name: "Pendo" },
    { "@type": "Organization", name: "HeyGen" },
    { "@type": "Organization", name: "FLYR" },
    { "@type": "Organization", name: "Runway" },
    { "@type": "Organization", name: "LambdaTest" },
    { "@type": "Organization", name: "Leadpages" },
    { "@type": "Organization", name: "MetaCX" },
    { "@type": "Organization", name: "Cloudfactory" },
    { "@type": "Organization", name: "Trumpet" },
    { "@type": "Organization", name: "Colossyan" },
    { "@type": "Organization", name: "X" },
  ],
} as const;

export const COMMENTS_WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://velt.dev/comments",
  name: "Velt Comments: Build collaborative commenting into your product",
  description:
    "Build Figma or Google Docs style commenting features into your product with Velt's collaboration SDK. Add text comments, area comments, video comments, and more with just a few lines of code.",
  headline: "Build Commenting into your product",
  keywords: [
    "commenting SDK",
    "collaboration SDK",
    "Figma comments",
    "Google Docs comments",
    "real-time commenting",
    "collaborative features",
    "JavaScript SDK",
    "React SDK",
    "real-time collaboration SDK",
  ],
  mainEntity: [
    {
      "@type": "ImageObject",
      url: "https://framerusercontent.com/images/vCF2hcxqRxsOmGcdO72Zk3CMbU.svg",
      caption: "Velt Logo",
    },
  ],
  isPartOf: {
    "@type": "WebSite",
    url: "https://velt.dev",
    name: "Velt Collaboration SDK",
  },
  publisher: {
    "@type": "Organization",
    name: "Velt",
    url: "https://velt.dev",
    logo: {
      "@type": "ImageObject",
      url: "https://framerusercontent.com/images/vCF2hcxqRxsOmGcdO72Zk3CMbU.svg",
    },
  },
  about: [
    {
      "@type": "SoftwareApplication",
      name: "Velt Comments SDK",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web Browsers",
      description:
        "JavaScript SDK for adding collaborative commenting features to web applications",
      offers: {
        "@type": "Offer",
        name: "14-day Free Trial",
        description: "Free trial of Velt Comments SDK",
      },
      featureList: [
        "Text Comments like Google Docs",
        "Area Comments like Figma or FigJam",
        "Cell Comments like Google Sheets",
        "Video Comments like Frame.io",
        "Chart Comments for Analytics",
        "Inline Comments like Disqus",
        "@mentions and assignments",
        "Audio, video, and screen recordings",
        "Task management and priority",
        "Reactions and emoji responses",
        "Real-time notifications",
        "Comment sidebar and minimap",
        "REST APIs and webhooks",
        "Fully customizable UI",
      ],
      softwareRequirements: "JavaScript, React, Angular, Vue, or Svelte",
      screenshot:
        "https://framerusercontent.com/images/NHn70YIP3sugbPa42aZm28MU.png",
    },
  ],
  mentions: [
    { "@type": "Organization", name: "Google" },
    { "@type": "Organization", name: "MetaCX" },
    { "@type": "Organization", name: "Trumpet" },
    { "@type": "Organization", name: "Leadpages" },
    { "@type": "Organization", name: "Cloudfactory" },
    { "@type": "Organization", name: "Eqtble" },
    { "@type": "Organization", name: "Awesomic" },
    { "@type": "Organization", name: "Marco" },
    { "@type": "Organization", name: "Colossyan" },
  ],
  hasPart: [
    {
      "@type": "WebPageElement",
      name: "Comment Types Section",
      description:
        "Showcase of different commenting types available in Velt SDK",
    },
    {
      "@type": "WebPageElement",
      name: "Features Section",
      description:
        "Detailed features including @mentions, recordings, task management, and reactions",
    },
    {
      "@type": "WebPageElement",
      name: "Little Big Details",
      description:
        "Comprehensive overview of all the small nuances and technical features built into the commenting SDK, including permission controls, authentication, notifications, cross-browser compatibility, offline support, and dozens of other implementation details",
    },
    {
      "@type": "WebPageElement",
      name: "Customer Testimonials",
      description:
        "Reviews and success stories from Velt customers including Google, MetaCX, and Trumpet",
    },
    {
      "@type": "WebPageElement",
      name: "Integration Guide",
      description: "Three-step setup process for implementing Velt Comments SDK",
    },
  ],
  audience: {
    "@type": "Audience",
    audienceType: "Developers, Product Managers, SaaS Companies",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://velt.dev" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Comments",
        item: "https://velt.dev/comments",
      },
    ],
  },
} as const;

export const ADD_NOTIFICATIONS_QUICK_WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://velt.dev/add-notifications-quick",
  name: "Add Notifications Quick - Velt Collaboration SDK",
  description:
    "Get started with Velt notifications in 3 steps. Add notification components, customize notifications, and explore notification features for your app.",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "Velt Notifications SDK",
    applicationCategory: "DeveloperApplication",
    description: "Quick notification system integration for web applications",
    url: "https://velt.dev/add-notifications-quick",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      description: "Notification SDK with free trial and demo booking",
    },
    featureList: [
      "Frontend Inbox",
      "Group Notifications",
      "Rich Reactions",
      "Customizable Components",
      "3-Step Integration",
      "Demo Booking",
    ],
  },
  about: {
    "@type": "Organization",
    name: "Velt",
    url: "https://velt.dev",
    description: "Collaboration SDK platform for developers",
  },
  hasPart: [
    {
      "@type": "WebPageElement",
      "@id": "#why-use-velt",
      name: "Why use Velt for Notifications",
      description:
        "Benefits of using Velt notification system with frontend inbox and group notifications",
    },
    {
      "@type": "WebPageElement",
      "@id": "#get-started-3-steps",
      name: "Get started in 3 steps",
      description:
        "Setup SDK, Add Notification Component, Customize Component - quick integration guide",
    },
    {
      "@type": "WebPageElement",
      "@id": "#customer-testimonial",
      name: "Customer Testimonial",
      description: "What our customers are saying about Velt notifications",
      hasPart: [
        {
          "@type": "Review",
          reviewBody:
            "Our weekly active users increased by 26% thanks to collaborative features built with Velt",
          author: {
            "@type": "Person",
            name: "Jeff Cunning",
            jobTitle: "Chief Product Officer",
            worksFor: { "@type": "Organization", name: "MetaImpact" },
          },
          reviewRating: { "@type": "Rating", ratingValue: 5 },
        },
      ],
    },
    {
      "@type": "WebPageElement",
      "@id": "#explore-notifications",
      name: "Explore Notifications",
      description: "Try our live Notifications Component demo",
    },
    {
      "@type": "WebPageElement",
      "@id": "#book-demo",
      name: "Book Demo",
      description: "Schedule a demo to see Velt notifications in action",
    },
  ],
  potentialAction: [
    {
      "@type": "ViewAction",
      name: "Request Demo",
      target: "https://velt.dev/add-notifications-quick#book-demo",
    },
    {
      "@type": "ViewAction",
      name: "Get Started",
      target: "https://velt.dev/add-notifications-quick#get-started-3-steps",
    },
  ],
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://velt.dev" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Add Notifications Quick",
        item: "https://velt.dev/add-notifications-quick",
      },
    ],
  },
  publisher: { "@type": "Organization", name: "Velt", url: "https://velt.dev" },
} as const;

// Site-wide Product entity Framer was emitting alongside the
// SoftwareApplication schema. NB: all three offers carry price="0" in
// the Framer source — that's a copy-paste artifact (Growth and
// Enterprise are contract-based), not a real price advertisement.
// Preserved verbatim so SERP signals stay continuous through the
// cutover; revisit pricing values in a follow-up if Google starts
// surfacing $0 in a snippet.
export const HOMEPAGE_PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Velt Collaboration SDK",
  brand: { "@type": "Brand", name: "Velt" },
  image: "https://framerusercontent.com/images/ggzDLIZr1irsrwuMtGEEm59iI.png",
  category: "Developer Tools",
  description:
    "Add powerful collaborative features to your app with Velt SDK. Includes comments, notifications, real-time editing, presence, cursors, and 15+ collaboration features with pre-built components and full customization.",
  offers: [
    {
      "@type": "Offer",
      name: "Hacker Plan",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Velt" },
    },
    {
      "@type": "Offer",
      name: "Growth Plan",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Velt" },
    },
    {
      "@type": "Offer",
      name: "Enterprise Plan",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Velt" },
    },
  ],
  additionalProperty: [
    { "@type": "PropertyValue", name: "Features", value: "15+ collaboration features" },
    { "@type": "PropertyValue", name: "Uptime SLA", value: "99.999%" },
    {
      "@type": "PropertyValue",
      name: "Security",
      value: "SOC 2 Type 2, HIPAA with BAA",
    },
  ],
} as const;

export const ACTIVITY_LOGS_WEBPAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Velt Activity Logs",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "SDK to add activity logs, audit trails, and AI agent tracking to SaaS applications. Captures comments, reactions, recordings, CRDT edits, and custom events with full user and agent attribution. Immutable by default.",
  url: "https://velt.dev/activity-logs",
  provider: {
    "@type": "Organization",
    name: "Velt",
    url: "https://velt.dev",
  },
  featureList: [
    "Automatic activity capture for comments, reactions, recordings, CRDT edits",
    "Custom event logging via createActivity() API",
    "AI agent action tracking with same schema as human actions",
    "Immutable records by default for tamper-proof audit trails",
    "Real-time subscriptions via getAllActivities()",
    "Org-wide and per-document filtering",
    "REST API for backend access and data warehouse streaming",
    "SOC 2 Type II and HIPAA compliant",
    "Self-hosting and custom encryption support",
  ],
} as const;

// Rich SoftwareApplication payload for the homepage. Emitted alongside
// the existing HOME_SOFTWARE_APPLICATION (which is minimal); the
// Framer-ported version carries 3 offer tiers, aggregateRating (5/5,
// 5 reviews), 3 named reviews with author affiliations, and the
// social `sameAs` links — the rating + reviews are what light up the
// rich snippet in SERPs.
export const HOMEPAGE_SOFTWARE_APPLICATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Velt SDK",
  url: "https://velt.dev/",
  description:
    "Velt is a JavaScript SDK that allows developers to add collaborative experiences such as contextual comments, notifications, recordings, multiplayer editing, and huddles to their products quickly and efficiently. It provides a complete collaboration toolkit to boost engagement, drive growth, differentiate products, save costs, and ship features fast. With over 25 features including AI enhancements, it's ideal for teams seeking plug-and-play solutions for real-time collaboration.",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Collaboration Software",
  operatingSystem: "Web",
  image:
    "https://framerusercontent.com/images/dIC08gnx4q6ah14XC0m5I9e1KJ0.svg?scale-down-to=512&width=675&height=288",
  sameAs: [
    "https://x.com/veltjs",
    "https://www.linkedin.com/company/veltjs",
    "https://github.com/velt-js",
  ],
  featureList: [
    "Contextual Comments (10+ Types: Text, Image, Video, etc.)",
    "Notifications (In-app, Email, Slack Integrations)",
    "Multiplayer Editing (Real-time Sync)",
    "Presence Indicators",
    "Adaptive Cursors for Multi-User",
    "Follow Mode for Collaboration",
    "Live Selection and Highlighting",
    "Live State Sync with CRDTs",
    "Huddles (Audio/Video Multiplayer Sessions)",
    "Reactions on Comments",
    "AI Enhancements for Comments (Add-on)",
    "Customizable UI for Comments and Notifications",
    "Enterprise Security for Multiplayer (SOC2, HIPAA)",
  ],
  offers: [
    {
      "@type": "Offer",
      name: "Hacker Plan",
      description: "Free for hackathons or side projects, limited usage.",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Growth Plan",
      description: "Custom pricing for growing teams, unlimited members.",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "Contact for pricing",
      },
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Enterprise Plan",
      description: "Custom for enterprises, dedicated support.",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: "Contact for pricing",
      },
      availability: "https://schema.org/InStock",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    reviewCount: "5",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: {
        "@type": "Person",
        name: "Yuri Kleban",
        jobTitle: "Senior Product Manager",
        worksFor: { "@type": "Organization", name: "Google" },
      },
      reviewBody:
        "Velt's commenting & notification features are bundled with a lot of magic. Quick to add new features we needed. Highly customizable components. Recommended.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: {
        "@type": "Person",
        name: "Jeff Cunning",
        jobTitle: "Chief Product Officer",
        worksFor: { "@type": "Organization", name: "MetaCX" },
      },
      reviewBody:
        "Boosted weekly active users by 26% and saved 6 months of development. Super responsive and collaborative team!",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: {
        "@type": "Person",
        name: "William Angel",
        jobTitle: "Lead Product Manager",
        worksFor: { "@type": "Organization", name: "Trumpet" },
      },
      reviewBody:
        "Increased engagement by 10% and shipped 5x faster. Implementation in a week. Incredible iteration speed and supportive team.",
    },
  ],
  publisher: {
    "@type": "Organization",
    name: "Velt",
    url: "https://velt.dev/",
    logo: "https://velt.dev/images/velt-logo.svg",
    sameAs: [
      "https://x.com/veltjs",
      "https://www.linkedin.com/company/veltjs",
      "https://github.com/velt-js",
    ],
  },
} as const;

// Slug-keyed lookup used by FeaturePageBody — when the rendered
// feature page is one of these, we additionally emit the bespoke
// payload alongside the generic schema.
export const BESPOKE_FEATURE_SCHEMAS_BY_SLUG: Record<
  string,
  Record<string, unknown>
> = {
  recording: RECORDING_WEBPAGE_SCHEMA,
  comments: COMMENTS_WEBPAGE_SCHEMA,
  "add-notifications-quick": ADD_NOTIFICATIONS_QUICK_WEBPAGE_SCHEMA,
  "activity-logs": ACTIVITY_LOGS_WEBPAGE_SCHEMA,
};
