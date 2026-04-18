"use client";

// Experimental test route: does the Framer runtime rewrite DOM content from
// the slug-specific handover JSON, or does it only handle animations?
// If the former: pairing the opentelemetry template JSX with slack's handover
// should produce a slack page, and we avoid parameterizing the 1.25 MB JSX.
// If the latter: the page shows opentelemetry content with slack animations —
// we'd need to parameterize the template per slug.

import Script from "next/script";
import "../../framer.css";
import IntegrationTemplate from "../../../components/IntegrationTemplate";
import { FRAMER_HANDOVER_JSON, FRAMER_RUNTIME_SRC } from "./framer-handover";

export default function SlackTestPage() {
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
