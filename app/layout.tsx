import Script from "next/script";
import "./globals.css";
import { FRAMER_HANDOVER_JSON, FRAMER_RUNTIME_SRC } from "./framer-handover";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Must register before Next.js's dev error-overlay hook mounts.
            Framer's runtime tries to dynamically import CMS collection/snippet
            chunks that aren't shipped with the static export; the rejection is
            benign but Next.js's dev overlay surfaces it on every page nav. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){window.addEventListener("unhandledrejection",function(e){var r=e&&e.reason;var m=(r&&r.message)||String(r||"");if(m.indexOf("Failed to fetch dynamically imported module")>=0||m.indexOf("Failed to import collection module")>=0||m.indexOf("/framer-runtime/")>=0){e.preventDefault();e.stopImmediatePropagation();}},true);})();`,
          }}
        />
      </head>
      <body style={{ margin: 0 }}>
        {/* Handover payload must be present in the DOM before the Framer runtime
            module executes. The runtime fetches it via
            document.getElementById("__framer__handoverData"). */}
        <script
          type="framer/handover"
          id="__framer__handoverData"
          dangerouslySetInnerHTML={{ __html: FRAMER_HANDOVER_JSON }}
        />
        {children}
        <Script
          type="module"
          src={FRAMER_RUNTIME_SRC}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
