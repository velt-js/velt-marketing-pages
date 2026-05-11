import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";

export const metadata = {
  title: "Terms of Service — Velt",
  description:
    "Read the Terms of Service governing your use of Velt's collaboration SDK, APIs, and marketing website.",
};

export default function TermsPage() {
  return (
    <ScaleWrapper>
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        {/* Hero — dark background, mirrors privacy page hero */}
        <section
          className="relative w-full bg-black overflow-hidden full-bleed-bg"
          style={{ paddingTop: 140, paddingBottom: 100 }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 900px 420px at 50% 0%, rgba(98,93,245,0.22) 0%, transparent 70%)",
            }}
          />
          <div
            className="relative flex flex-col items-center"
            style={{ gap: 20, width: 851, margin: "0 auto" }}
          >
            <span
              className="inline-flex items-center font-urbanist font-semibold text-white"
              style={{
                gap: 8,
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid rgba(98,93,245,0.4)",
                background: "rgba(98,93,245,0.12)",
                fontSize: 14,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              <span
                aria-hidden
                className="inline-block"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#86efac",
                }}
              />
              Legal
            </span>
            <h1
              className="font-urbanist font-bold text-white text-center"
              style={{ fontSize: 72, lineHeight: 1.2, letterSpacing: "-0.03em" }}
            >
              Terms of service
            </h1>
          </div>
        </section>

        {/* Body — white background, max-width reading column */}
        <div
          className="full-bleed-bg"
          style={{
            background: "#FFFFFF",
            borderTopLeftRadius: 52,
            borderTopRightRadius: 52,
          }}
        >
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              padding: "80px 40px 120px",
            }}
          >
            <iframe
              src="https://app.termly.io/document/terms-of-service/12eba4c6-ddd6-47bf-8244-d0e34fa06ffa"
              title="Terms of Service"
              style={{ width: "100%", height: "1600px", border: "none", display: "block" }}
            />
          </div>

          <Footer />
        </div>
      </div>
    </ScaleWrapper>
  );
}
