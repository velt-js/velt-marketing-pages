import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllDemoSlugs,
  getDemoPageBySlug,
} from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

export const revalidate = 60;

type DemoDoc = {
  _id: string;
  title: string;
  slug: string;
  appName?: string;
  appLogo?: string;
  appLink?: string;
  demoLink?: string;
  category?: string;
  title1?: string;
  title2?: string;
  content?: string;
  feature1Name?: string;
  feature1Image?: string;
  feature2Name?: string;
  feature2Image?: string;
  feature3Name?: string;
  feature3Image?: string;
  image?: string;
};

export async function generateStaticParams() {
  const slugs = await getAllDemoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getDemoPageBySlug(slug)) as DemoDoc | null;
  if (!doc) return {};
  const title = `${doc.title} | Velt Demos`;
  const description = doc.content ?? "";
  return buildPageMetadata({
    title,
    description,
    path: `/demos/${slug}`,
    socialTitle: title,
  });
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getDemoPageBySlug(slug)) as DemoDoc | null;
  if (!doc) notFound();

  const features = [
    { name: doc.feature1Name, image: doc.feature1Image },
    { name: doc.feature2Name, image: doc.feature2Image },
    { name: doc.feature3Name, image: doc.feature3Image },
  ].filter((f) => f.name || f.image);

  const pageUrl = `${SITE_URL}/demos/${slug}`;
  const breadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Demos", url: `${SITE_URL}/demos` },
    { name: doc.title ?? slug, url: pageUrl },
  ]);
  const webpage = buildWebPageSchema({
    name: `${doc.title} | Velt Demos`,
    description: doc.content,
    url: pageUrl,
    breadcrumb,
  });

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <JsonLd id="ld-demo-webpage" data={webpage} />
      <JsonLd id="ld-demo-breadcrumb" data={breadcrumb} />
      <Link
        href="/demos"
        className="text-sm text-velt-purple hover:underline mb-6 inline-block"
      >
        ← Back to Demos
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          {doc.appLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={doc.appLogo}
              alt={doc.appName ?? ""}
              className="w-10 h-10 rounded"
            />
          )}
          {doc.appName && (
            <span className="text-white/70">{doc.appName}</span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{doc.title}</h1>
        {doc.title1 && (
          <p className="text-xl text-white/80 mb-2">{doc.title1}</p>
        )}
        {doc.title2 && (
          <p className="text-lg text-white/60 mb-6">{doc.title2}</p>
        )}
        {doc.content && (
          <p className="text-base text-white/60 max-w-2xl">{doc.content}</p>
        )}

        <div className="flex gap-3 mt-6">
          {doc.demoLink && (
            <a
              href={doc.demoLink}
              target="_blank"
              rel="noreferrer"
              className="bg-velt-purple hover:bg-velt-purple/90 text-white font-medium px-5 py-2.5 rounded-lg"
            >
              Open Demo
            </a>
          )}
          {doc.appLink && (
            <a
              href={doc.appLink}
              target="_blank"
              rel="noreferrer"
              className="border border-white/20 hover:border-white/40 text-white px-5 py-2.5 rounded-lg"
            >
              Visit App
            </a>
          )}
        </div>
      </header>

      {doc.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={doc.image}
          alt={doc.title}
          className="w-full rounded-xl mb-12"
        />
      )}

      {features.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
            >
              {f.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={f.image}
                  alt={f.name ?? ""}
                  className="w-full aspect-video object-cover"
                />
              )}
              {f.name && (
                <div className="p-4">
                  <h3 className="font-semibold">{f.name}</h3>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
