import { Footer } from "@/components/home/Footer";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const PRIVACY_DESCRIPTION =
  "Learn how Velt collects, uses, and protects your personal information when you use our collaboration SDK and marketing website.";

const PRIVACY_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
]);

const PRIVACY_WEBPAGE = buildWebPageSchema({
  name: "Privacy Policy — Velt",
  description: PRIVACY_DESCRIPTION,
  url: `${SITE_URL}/privacy`,
  breadcrumb: PRIVACY_BREADCRUMB,
});

export const metadata = {
  title: "Privacy Policy",
  description: PRIVACY_DESCRIPTION,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    url: "https://velt.dev/privacy",
    title: "Privacy Policy — Velt",
    description: PRIVACY_DESCRIPTION,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd id="ld-privacy-webpage" data={PRIVACY_WEBPAGE} />
      <JsonLd id="ld-privacy-breadcrumb" data={PRIVACY_BREADCRUMB} />
      <div
        className="relative bg-black text-white font-urbanist w-full overflow-x-hidden"
      >
        {/* Hero — dark background, mirrors PageHero without the animated grid */}
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
              Privacy policy
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
              src="https://app.termly.io/document/privacy-policy/09251705-1e42-4568-ac53-c21a494c19ac"
              title="Privacy Policy"
              style={{ width: "100%", height: "1600px", border: "none", display: "block" }}
            />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

