// Content for the /integrations landing page. Mirrors the structure of
// `components/library/shared-content.ts`. Logo images are hot-linked from
// the Sanity CDN (project fk9mezqa, dataset production) — they were uploaded
// there by `scripts/sync-integrations-from-framer-to-sanity.mjs` and there's
// no need to duplicate them in /public.
//
// Each card's "View Docs" button links to https://docs.velt.dev/. The
// "Learn More" button links to /integrations/{slug} — the Sanity-backed
// detail page rendered by `app/integrations/[slug]/page.tsx`.

import type { LibraryTab } from "../library/LibraryTabs";
import type { LibraryCardData } from "../library/AllLibraries";

const DOCS_URL = "https://docs.velt.dev/";
const integrationHref = (slug: string) => `/integrations/${slug}`;

// Tabs match the categories shown on production velt.dev/integrations:
// ALL · MESSAGING · STORAGE · CRM · ANALYTICS · WORKFLOWS · EMAILS.
export const integrationTabs: LibraryTab[] = [
  { label: "All" },
  { label: "Messaging" },
  { label: "Storage" },
  { label: "CRM" },
  { label: "Analytics" },
  { label: "Workflows" },
  { label: "Emails" },
];

export const allIntegrationCards: LibraryCardData[] = [
  // ---- Messaging ----
  {
    name: "Slack",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/0a711e8c173b2316b1ed42bd8b99fec518a49a86-600x216.png",
    logoAlt: "Slack",
    logoWidth: 600,
    logoHeight: 216,
    category: "Messaging",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("slack"),
  },
  {
    name: "Discord",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/9eeea30b4f413c5b1eafe6ff453245fb2bfab19e-301x84.png",
    logoAlt: "Discord",
    logoWidth: 301,
    logoHeight: 84,
    category: "Messaging",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("discord"),
  },
  {
    name: "Microsoft Teams",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/67a0d833257cf0649f6cd15713ee036f43cfb129-860x206.png",
    logoAlt: "Microsoft Teams",
    logoWidth: 860,
    logoHeight: 206,
    category: "Messaging",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("microsoft-teams"),
  },

  // ---- Storage ----
  {
    name: "AWS S3",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/8b56ea8b61803c017848224aa3fdd692d7a19ab9-268x122.png",
    logoAlt: "AWS S3",
    logoWidth: 268,
    logoHeight: 122,
    category: "Storage",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("aws-s3"),
  },
  {
    name: "Google Cloud Storage",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/c651a0a8a2884e71edb814825ee637996363d3cb-366x82.png",
    logoAlt: "Google Cloud Storage",
    logoWidth: 366,
    logoHeight: 82,
    category: "Storage",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("google-cloud-storage"),
  },
  {
    name: "Microsoft Azure",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/5c196264980ebee844591b3f45ebdeecca14fc4e-342x100.png",
    logoAlt: "Microsoft Azure",
    logoWidth: 342,
    logoHeight: 100,
    category: "Storage",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("microsoft-azure"),
  },

  // ---- CRM ----
  {
    name: "HubSpot",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/4ab38652e7c4c107029746fd3124769831b4e5ab-264x76.png",
    logoAlt: "HubSpot",
    logoWidth: 264,
    logoHeight: 76,
    category: "CRM",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("hubspot"),
  },
  {
    name: "Close CRM",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/fa282b5c353b6596c83879dd1d1d3198d26d9aba-267x73.png",
    logoAlt: "Close CRM",
    logoWidth: 267,
    logoHeight: 73,
    category: "CRM",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("close-crm"),
  },

  // ---- Analytics ----
  {
    name: "Segment",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/46a134a59c7b1b6db65c2f71aa7fd9219f53cf36-105x108.png",
    logoAlt: "Segment",
    logoWidth: 105,
    logoHeight: 108,
    category: "Analytics",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("segment"),
  },
  {
    name: "OpenTelemetry",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/efaf0039197a4ecd90f99687d26e34b441137874-290x110.png",
    logoAlt: "OpenTelemetry",
    logoWidth: 290,
    logoHeight: 110,
    category: "Analytics",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("opentelemetry"),
  },

  // ---- Workflows ----
  {
    name: "Zapier",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/3f2d402b9a830e580c13fbfdd470daf3d3d3dee3-280x76.png",
    logoAlt: "Zapier",
    logoWidth: 280,
    logoHeight: 76,
    category: "Workflows",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("zapier"),
  },
  {
    name: "Inngest",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/067a89a77c2a18ab1463b3463831e053e0cc69c4-121x120.png",
    logoAlt: "Inngest",
    logoWidth: 121,
    logoHeight: 120,
    category: "Workflows",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("inngest"),
  },
  {
    name: "Windmill",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/9a5ccfd5741ac7b42980ed19b2679603097bfc6f-132x130.png",
    logoAlt: "Windmill",
    logoWidth: 132,
    logoHeight: 130,
    category: "Workflows",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("windmill"),
  },

  // ---- Emails ----
  {
    name: "Sendgrid",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/d204845370a87c369934f9ebd74bf125e688114a-301x76.png",
    logoAlt: "Twilio Sendgrid",
    logoWidth: 301,
    logoHeight: 76,
    category: "Emails",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("sendgrid"),
  },
  {
    name: "Loops",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/e54a233fa2380e456c8ffd1484b92c7447c80251-200x45.png",
    logoAlt: "Loops",
    logoWidth: 200,
    logoHeight: 45,
    category: "Emails",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("loops"),
  },
  {
    name: "Customer.io",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/3822ef5406b2846fa829bd29a7073051b8a00943-284x40.png",
    logoAlt: "Customer.io",
    logoWidth: 284,
    logoHeight: 40,
    category: "Emails",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("customer-io"),
  },
  {
    name: "Resend",
    logoSrc:
      "https://cdn.sanity.io/images/fk9mezqa/production/39456c32167fa98f88c31f63f0e6930ecfd67c90-186x40.png",
    logoAlt: "Resend",
    logoWidth: 186,
    logoHeight: 40,
    category: "Emails",
    docsHref: DOCS_URL,
    learnMoreHref: integrationHref("resend"),
  },
];
