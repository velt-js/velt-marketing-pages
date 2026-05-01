import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllExampleSlugs,
  getExamplePageBySlug,
} from "@/sanity/queries";

export const revalidate = 60;

type ExampleDoc = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  heroImage?: string;
  similarApp?: string;
  similarAppIcon?: string;
  feature?: string;
  framework?: string;
  features?: string;
  githubLink?: string;
  previewLink?: string;
  codesandboxLink?: string;
  vercelLink?: string;
  metaDescription?: string;
};

export async function generateStaticParams() {
  const slugs = await getAllExampleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getExamplePageBySlug(slug)) as ExampleDoc | null;
  if (!doc) return {};
  return {
    title: `${doc.title} | Velt Examples`,
    description: doc.metaDescription || doc.description,
  };
}

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = (await getExamplePageBySlug(slug)) as ExampleDoc | null;
  if (!doc) notFound();

  const links = [
    { href: doc.githubLink, label: "GitHub" },
    { href: doc.previewLink, label: "Live Preview" },
    { href: doc.codesandboxLink, label: "CodeSandbox" },
    { href: doc.vercelLink, label: "Vercel" },
  ].filter((l) => l.href);

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <Link
        href="/examples"
        className="text-sm text-velt-purple hover:underline mb-6 inline-block"
      >
        ← Back to Examples
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{doc.title}</h1>
        {doc.description && (
          <p className="text-lg text-white/70 mb-6">{doc.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {doc.framework && (
            <span className="text-sm px-3 py-1 rounded-full bg-white/10 text-white/80">
              {doc.framework}
            </span>
          )}
          {doc.features && (
            <span className="text-sm px-3 py-1 rounded-full bg-velt-purple/20 text-velt-purple">
              {doc.features}
            </span>
          )}
          {doc.feature && (
            <span className="text-sm px-3 py-1 rounded-full bg-velt-purple/20 text-velt-purple">
              {doc.feature}
            </span>
          )}
        </div>

        {links.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="border border-white/20 hover:border-white/40 text-white px-5 py-2.5 rounded-lg"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      {doc.heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={doc.heroImage}
          alt={doc.title}
          className="w-full rounded-xl mb-12"
        />
      )}

      {doc.similarApp && (
        <section className="border-t border-white/10 pt-8">
          <h2 className="text-sm uppercase tracking-wide text-white/50 mb-3">
            Similar to
          </h2>
          <div className="flex items-center gap-3">
            {doc.similarAppIcon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={doc.similarAppIcon}
                alt={doc.similarApp}
                className="w-8 h-8 rounded"
              />
            )}
            <span className="text-base">{doc.similarApp}</span>
          </div>
        </section>
      )}
    </article>
  );
}
