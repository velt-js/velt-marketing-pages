import Link from "next/link";
import { getAllBlogPosts } from "@/sanity/queries";

export const revalidate = 60;

export const metadata = {
  title: "Blog | Velt",
  description:
    "Guides, comparisons, and insights on collaboration SDKs, real-time features, and building better products.",
};

export default async function BlogListingPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-white/60">
          Guides, comparisons, and insights on collaboration SDKs
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(
          (post: {
            _id: string;
            slug: string;
            title: string;
            description: string;
            publishedAt: string;
            category: string;
          }) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors block"
            >
              {post.category && (
                <span className="text-xs text-purple-400 font-medium mb-2 block">
                  {post.category}
                </span>
              )}
              <h2 className="font-semibold text-lg mb-2 group-hover:text-purple-400 transition-colors">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-sm text-white/50 line-clamp-2 mb-3">
                  {post.description}
                </p>
              )}
              {post.publishedAt && (
                <time className="text-xs text-white/30">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </Link>
          )
        )}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-24 text-white/40">
          <p className="text-xl mb-2">No blog posts yet</p>
          <p className="text-sm">
            Add posts in{" "}
            <Link href="/studio" className="text-purple-400 hover:underline">
              Sanity Studio
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
