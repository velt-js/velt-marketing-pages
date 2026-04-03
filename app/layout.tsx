import type { Metadata } from "next";
import { Urbanist, Fira_Code, Fira_Mono, Poppins } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Velt — The Complete Collaboration Toolkit",
  description:
    "Add features like contextual comments, notifications, recordings, multiplayer editing & huddles to your product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${firaCode.variable} ${firaMono.variable} ${poppins.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
