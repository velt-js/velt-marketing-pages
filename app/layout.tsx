import type { Metadata } from "next";
import { Urbanist, Fira_Mono, Fira_Code, Poppins, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { JsonLd } from "./_seo/JsonLd";
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "./_seo/schema";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const firaMono = Fira_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-fira-mono",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-fira-code",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-poppins",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-geist-mono",
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
      className={`${firaMono.variable} ${firaCode.variable} ${poppins.variable} ${geistMono.variable}`}
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
        src="https://cdn.velt.dev/lib/superflow.js?apiKey=aU1MxKP0rca2UXwKi8bl&projectId=620866069199868"
        strategy="afterInteractive"
      />
    </html>
  );
}
