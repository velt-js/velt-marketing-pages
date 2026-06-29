// New-theme /webhooks-and-api (Webhooks & API) page.
//
// Rendered fully locally from app/webhooks-and-api/content.tsx — no Sanity
// document is read or written, so nothing here touches the live CMS. This
// static route shadows the dynamic app/(features)/[slug] route for
// /webhooks-and-api (Next.js prioritises static routes), so locally
// /webhooks-and-api serves this new-theme page while the legacy v1
// `webhooks-and-api` CMS doc is left untouched.

import type { Metadata } from "next";

import StaticFeaturePage from "@/app/_seo/StaticFeaturePage";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

import { webhooksContent } from "./content";

export const metadata: Metadata = buildPageMetadata({
  title: "Webhooks & API",
  description:
    "Integrate seamlessly with your systems. Velt's REST API and webhooks let you perform CRUD on every feature, receive signed events with retries, transform and encrypt payloads, and sync to Slack.",
  path: "/webhooks-and-api",
  ogImage: "/og/webhooks-and-api.png",
});

/**
 * The Webhooks & API marketing page.
 * @returns {JSX.Element} The rendered page.
 */
export default function WebhooksAndApiPage() {
  return (
    <StaticFeaturePage
      content={webhooksContent}
      pageTitle="Webhooks & API"
      description={webhooksContent.hero.secondary}
    />
  );
}
