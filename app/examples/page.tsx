import Link from "next/link";
import { getAllExamplePages } from "@/sanity/queries";

export const revalidate = 60;

export const metadata = {
  title: "Examples | Velt",
  description: "Open-source example apps using Velt.",
};

type ExampleCard = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  framework?: string;
  feature?: string;
};

export default async function ExamplesListingPage() {
  const examples = (await getAllExamplePages()) as ExampleCard[];

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Examples</h1>
      <p className="text-lg text-white/60 mb-12 max-w-2xl">
        Open-source example apps demonstrating Velt collaboration features
        across frameworks and use cases.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((ex) => (
          <Link
            key={ex._id}
            href={`/examples/${ex.slug}`}
            className="group rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors overflow-hidden"
          >
            {ex.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ex.thumbnail}
                alt={ex.title}
                className="w-full aspect-video object-cover"
              />
            )}
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-velt-purple transition-colors">
                {ex.title}
              </h2>
              {ex.description && (
                <p className="text-sm text-white/60 mb-3 line-clamp-2">
                  {ex.description}
                </p>
              )}
              <div className="flex gap-2 flex-wrap">
                {ex.framework && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                    {ex.framework}
                  </span>
                )}
                {ex.feature && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-velt-purple/20 text-velt-purple">
                    {ex.feature}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
