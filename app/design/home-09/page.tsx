import type { Metadata } from "next";
import "./styles.css";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Problem from "./components/Problem";
import WhyNow from "./components/WhyNow";
import Primitives from "./components/Primitives";
import Collaboration from "./components/Collaboration";
import HowItWorks from "./components/HowItWorks";
import Integrations from "./components/Integrations";
import Enterprise from "./components/Enterprise";
import Verticals from "./components/Verticals";
import Faq from "./components/Faq";
import Proof from "./components/Proof";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Velt — Add a pull request to your product",
  description:
    "Embeddable review and approval for AI-native apps. Add governance to the work that can't ship unapproved.",
};

export default function Home09() {
  return (
    <div
      className="vlp"
      style={{
        background: "#ffffff",
        color: "#26251e",
        fontFamily: "'Inter Tight',ui-sans-serif,system-ui,sans-serif",
        WebkitFontSmoothing: "antialiased",
        fontFeatureSettings: "'tnum'",
        overflowX: "hidden",
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <Nav />
      <a id="top" />
      <Hero />
      <TrustStrip />
      <Problem />
      <WhyNow />
      <Primitives />
      <Collaboration />
      <HowItWorks />
      <Integrations />
      <Enterprise />
      <Verticals />
      <Faq />
      <Proof />
      <FinalCta />
      <Footer />
    </div>
  );
}
