import Link from "next/link";
import { getAllDemoPages } from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

const DEMOS_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Demos", url: `${SITE_URL}/demos` },
]);

const DEMOS_WEBPAGE = buildWebPageSchema({
  name: "Demos | Velt",
  description: "Live product demos showcasing Velt collaboration features.",
  url: `${SITE_URL}/demos`,
  breadcrumb: DEMOS_BREADCRUMB,
});

export const revalidate = 60;

export const metadata = buildPageMetadata({
  title: "Demos",
  description: "Live product demos showcasing Velt collaboration features.",
  path: "/demos",
  ogImage: "/og/demos.png",
});

type DemoCard = {
  _id: string;
  title: string;
  slug: string;
  appName?: string;
  appLogo?: string;
  category?: string;
  image?: string;
};

export default async function DemosListingPage() {
  const demos = (await getAllDemoPages()) as DemoCard[];

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <JsonLd id="ld-demos-webpage" data={DEMOS_WEBPAGE} />
      <JsonLd id="ld-demos-breadcrumb" data={DEMOS_BREADCRUMB} />
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Demos</h1>
      <p className="text-lg text-white/60 mb-12 max-w-2xl">
        Live product demos showcasing Velt collaboration features in real apps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demos.map((demo) => (
          <Link
            key={demo._id}
            href={`/demos/${demo.slug}`}
            className="group rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors overflow-hidden"
          >
            {demo.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={demo.image}
                alt={demo.title}
                className="w-full aspect-video object-cover"
              />
            )}
            <div className="p-5">
              <div className="flex items-center gap-3 mb-2">
                {demo.appLogo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={demo.appLogo}
                    alt={demo.appName ?? ""}
                    className="w-6 h-6 rounded"
                  />
                )}
                {demo.appName && (
                  <span className="text-sm text-white/60">{demo.appName}</span>
                )}
              </div>
              <h2 className="text-lg font-semibold group-hover:text-velt-purple transition-colors">
                {demo.title}
              </h2>
              {demo.category && (
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-velt-purple/20 text-velt-purple">
                  {demo.category}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
