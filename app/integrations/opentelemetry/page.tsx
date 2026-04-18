"use client";

import Script from "next/script";
import "../../framer.css";
import IntegrationTemplate from "../../../components/IntegrationTemplate";
import { FRAMER_HANDOVER_JSON, FRAMER_RUNTIME_SRC } from "./framer-handover";

// Temporary test route. Pairs opentelemetry's hand-translated JSX template with
// the page-specific Framer handover JSON (extracted from the exported HTML) so
// the Framer runtime hydrates correctly, animates sections, and reveals
// opacity:0.001 elements. Without the matching handover, the runtime fatal-
// errors (see MIGRATION.md "Bug: black page on /integrations/opentelemetry").
// Will be replaced in step 3 by `app/integrations/[slug]/page.tsx` that
// fetches from Sanity and loads per-slug handover.
export default function OpentelemetryPage() {
  return (
    <>
      <script
        type="framer/handover"
        id="__framer__handoverData"
        dangerouslySetInnerHTML={{ __html: FRAMER_HANDOVER_JSON }}
      />
      <IntegrationTemplate />
      <Script
        type="module"
        src={FRAMER_RUNTIME_SRC}
        strategy="afterInteractive"
      />
    </>
  );
}
