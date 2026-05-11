// /features landing page — lists every Velt feature from Sanity.
// Composition mirrors /libraries: dark hero → trusted logos → light grid →
// security → FAQ → get started → footer. The grid here is inlined because
// the feature card data shape differs from libraries and we don't want to
// generalize AllLibraries until a second consumer needs it.

import Link from "next/link";

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { Security } from "@/components/home/Security";
import { GetStartedSteps } from "@/components/home/GetStartedSteps";
import { TrustedLogos } from "@/components/home/TrustedLogos";
import { PageHero } from "@/components/library/PageHero";
import { LibraryFAQ } from "@/components/library/LibraryFAQ";
import { sharedFAQ } from "@/components/library/shared-content";
import { FeatureCustomerCarousel } from "@/components/feature/FeatureCustomerCarousel";
import { getAllFeaturePages } from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";

const FEATURES_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Features", url: `${SITE_URL}/features` },
]);

const FEATURES_WEBPAGE = buildWebPageSchema({
  name: "Features | Velt",
  description:
    "Velt's collaboration features — Commenting, Notifications, Presence, Cursors, Huddle, and more.",
  url: `${SITE_URL}/features`,
  breadcrumb: FEATURES_BREADCRUMB,
});

export const revalidate = 60;

export const metadata = {
  title: "Features | Velt",
  description:
    "Velt's collaboration features — Commenting, Notifications, Presence, Cursors, Huddle, and more.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    url: "https://velt.dev/features",
    title: "Features | Velt",
    description:
      "Velt's collaboration features — Commenting, Notifications, Presence, Cursors, Huddle, and more.",
  },
};

type FeatureListItem = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  tagline?: string;
  logo?: string;
};

export default async function FeaturesLandingPage() {
  const items = ((await getAllFeaturePages()) ?? []) as FeatureListItem[];

  return (
    <ScaleWrapper>
      <JsonLd id="ld-features-webpage" data={FEATURES_WEBPAGE} />
      <JsonLd id="ld-features-breadcrumb" data={FEATURES_BREADCRUMB} />
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated
          heading="Built for Modern Collaboration"
          subheading="Drop-in collaboration primitives — comments, presence, cursors, huddles, and more."
          primaryCta={{
            label: "Get Free API Key",
            href: "https://console.velt.dev/",
            newTab: true,
          }}
          secondaryCta={{ label: "Book Demo", href: "/book-demo" }}
        />

        <TrustedLogos />

        <FeaturesGrid items={items} />

        <Security />

        <FeatureCustomerCarousel />

        <LibraryFAQ items={sharedFAQ} />

        <GetStartedSteps />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}

function FeaturesGrid({ items }: { items: FeatureListItem[] }) {
  return (
    <section
      data-outcomes
      className="flex flex-col items-center bg-white full-bleed-bg"
      style={{
        padding: "100px 80px",
        gap: 52,
        marginTop: 80,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
      }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 16, maxWidth: 820 }}
      >
        <h2
          className="font-urbanist font-bold"
          style={{
            fontSize: 52,
            lineHeight: "120%",
            letterSpacing: "-0.03em",
            color: "rgb(0, 0, 0)",
            margin: 0,
          }}
        >
          Explore Velt Features
        </h2>
        <p
          className="font-urbanist"
          style={{
            fontSize: 18,
            lineHeight: 1.4,
            color: "rgb(0, 0, 0)",
            opacity: 0.6,
            margin: 0,
          }}
        >
          Pick a building block and ship in days, not months.
        </p>
      </div>

      {items.length === 0 ? (
        <p
          className="font-urbanist"
          style={{ fontSize: 16, color: "rgb(0, 0, 0)", opacity: 0.6 }}
        >
          No feature pages yet. Add one in{" "}
          <Link
            href="/studio"
            className="text-velt-purple hover:underline"
          >
            Sanity Studio
          </Link>
          .
        </p>
      ) : (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            width: "100%",
            maxWidth: 1280,
          }}
        >
          {items.map((item) => (
            <Link
              key={item._id}
              href={`/features/${item.slug}`}
              className="group flex flex-col"
              style={{
                background: "rgb(247, 247, 247)",
                border: "1px solid rgba(0,0,0,0.04)",
                borderRadius: 16,
                padding: 32,
                gap: 16,
                minHeight: 200,
                textDecoration: "none",
                transition: "background 200ms ease, box-shadow 200ms ease",
              }}
            >
              {item.logo ? (
                <div style={{ height: 32 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt={item.title}
                    style={{
                      height: 32,
                      maxWidth: "60%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              ) : null}
              <h3
                className="font-urbanist font-semibold"
                style={{
                  fontSize: 24,
                  lineHeight: 1.2,
                  color: "rgb(0, 0, 0)",
                  margin: 0,
                }}
              >
                {item.title}
              </h3>
              {item.tagline ? (
                <p
                  className="font-urbanist"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.4,
                    color: "rgb(0, 0, 0)",
                    opacity: 0.6,
                    margin: 0,
                  }}
                >
                  {item.tagline}
                </p>
              ) : null}
              {item.category ? (
                <span
                  className="font-urbanist font-semibold"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--color-velt-purple)",
                    marginTop: "auto",
                  }}
                >
                  {item.category}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
