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
