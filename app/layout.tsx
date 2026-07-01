import type { Metadata } from "next";
import { Urbanist, Poppins, Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { JsonLd } from "./_seo/JsonLd";
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "./_seo/schema";
import { Analytics } from "@/components/analytics/Analytics";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-poppins",
});

// Inter Tight is used for the new homepage body copy via --vlp-font-body.
// Self-hosted via next/font to avoid a runtime CDN request to fonts.googleapis.com.
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter-tight",
});

const DEFAULT_TITLE = "The Collaboration Stack for B2B | Velt";
const DEFAULT_DESCRIPTION =
  "Add powerful real-time and multiplayer features to your product with Velt's easy-to-use collaboration SDK. Integrate comments, live cursors, and more in minutes.";

export const metadata: Metadata = {
  metadataBase: new URL("https://velt.dev"),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Velt",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    url: "https://velt.dev",
    siteName: "Velt",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${interTight.variable}`}
    >
      <body className={urbanist.className} style={{ overflowX: "hidden" }}>
        {children}
        {/* Site-wide structured data. Renders Organization (publisher
            entity) + WebSite (canonical web entity) on every page so
            Google can attribute reviews, ratings, and sitelinks to a
            single Velt entity. */}
        <JsonLd id="ld-organization" data={buildOrganizationSchema()} />
        <JsonLd id="ld-website" data={buildWebSiteSchema()} />
      </body>
      <Script
        id="superflowToolbarScript"
        data-sf-platform="other-manual"
        src="https://cdn.velt.dev/lib/superflow.js?apiKey=aU1MxKP0rca2UXwKi8bl&projectId=4748301242587831"
        strategy="afterInteractive"
      />
      {/* Site-wide third-party analytics ported from the legacy
          Framer site's End-of-<head> custom code block. See
          components/analytics/Analytics.tsx for the inventory. */}
      <Analytics />
    </html>
  );
}
