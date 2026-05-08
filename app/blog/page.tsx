import Image from "next/image";
import Link from "next/link";

import { ScaleWrapper } from "@/components/home/ScaleWrapper";
import { Footer } from "@/components/home/Footer";
import { PageHero } from "@/components/library/PageHero";
import { getAllBlogPosts } from "@/sanity/queries";

export const revalidate = 60;

export const metadata = {
  title: "Blog | Velt",
  description:
    "Guides, comparisons, and insights on collaboration SDKs, real-time features, and building better products.",
};

type BlogPost = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  featuredImage?: string;
};

export default async function BlogListingPage() {
  const posts = (await getAllBlogPosts()) as BlogPost[];

  return (
    <ScaleWrapper>
      <div
        className="relative bg-black text-white font-urbanist"
        style={{ width: 1440 }}
      >
        <PageHero
          decorated
          heading="Blog"
          subheading="Guides, comparisons, and insights on collaboration SDKs"
        />

        <BlogGrid posts={posts} />

        <Footer />
      </div>
    </ScaleWrapper>
  );
}

function BlogGrid({ posts }: { posts: BlogPost[] }) {
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
      {posts.length === 0 ? (
        <p
          className="font-urbanist"
          style={{ fontSize: 16, color: "rgb(0, 0, 0)", opacity: 0.6 }}
        >
          No blog posts yet. Add one in{" "}
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
            gap: "48px 32px",
            width: "100%",
            maxWidth: 1280,
          }}
        >
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col"
              style={{
                gap: 16,
                textDecoration: "none",
              }}
            >
              {post.featuredImage && (
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: 12,
                    background: "rgb(247, 247, 247)",
                  }}
                >
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 400px, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-col" style={{ gap: 6 }}>
                <h2
                  className="font-urbanist font-semibold"
                  style={{
                    fontSize: 20,
                    lineHeight: 1.3,
                    color: "#111",
                    margin: 0,
                  }}
                >
                  {post.title}
                </h2>
                {post.publishedAt && (
                  <time
                    className="font-urbanist"
                    style={{
                      fontSize: 14,
                      color: "rgba(0,0,0,0.45)",
                    }}
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
