import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/sanity/queries";
import { PortableTextRenderer } from "@/components/PortableText";
import { Footer } from "@/components/home/Footer";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle || `${post.title} | Velt Blog`,
    description: post.metaDescription || post.description,
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div data-getstarted className="min-h-screen bg-black text-white font-urbanist" style={{ paddingTop: 80 }}>
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
          {post.description && (
            <p className="text-lg text-white/60 mb-6">{post.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-white/40">
            {post.author && <span>{post.author.name}</span>}
            {post.publishedAt && (
              <>
                <span>&middot;</span>
                <time>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            )}
          </div>
        </div>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="relative aspect-[16/9] mb-12 overflow-hidden rounded-xl bg-white/5">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Body */}
        {post.body && (
          <div className="prose-invert max-w-none">
            <PortableTextRenderer value={post.body} />
          </div>
        )}

        {/* JSON-LD structured data */}
        {post.blogPostingSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: post.blogPostingSchema }}
          />
        )}
        {post.faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: post.faqSchema }}
          />
        )}

      </article>
      <Footer />
    </div>
  );
}
