import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/sanity/queries";
import { PortableTextRenderer } from "@/components/PortableText";
import { Footer } from "@/components/home/Footer";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  ORG_ID,
  ORG_NAME,
  ORG_OG_IMAGE,
  SITE_URL,
  buildBreadcrumbList,
} from "@/app/_seo/schema";

/**
 * Build a BlogPosting JSON-LD payload from a Sanity blog document.
 * Returns null when the document is missing required fields so the
 * caller can omit the script tag entirely.
 *
 * @param params - Inputs.
 * @param params.post - Sanity blog post (shape from getBlogPostBySlug).
 * @param params.slug - URL slug for the canonical page URL.
 * @returns A schema.org BlogPosting node, or null on missing data.
 */
function buildBlogPostingSchema({
  post,
  slug,
}: {
  post: {
    title?: string;
    description?: string;
    publishedAt?: string;
    _updatedAt?: string;
    author?: { name?: string };
    featuredImage?: string;
    ogImage?: string;
    metaDescription?: string;
  };
  slug: string;
}): Record<string, unknown> | null {
  try {
    if (!post?.title) return null;
    const pageUrl = `${SITE_URL}/blog/${slug}`;
    const node: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      publisher: { "@id": ORG_ID },
    };
    const description = post.metaDescription ?? post.description;
    if (description) node.description = description;
    if (post.publishedAt) node.datePublished = post.publishedAt;
    if (post._updatedAt) node.dateModified = post._updatedAt;
    if (post.author?.name) {
      node.author = { "@type": "Person", name: post.author.name };
    } else {
      node.author = { "@type": "Organization", name: ORG_NAME };
    }
    const image = post.ogImage ?? post.featuredImage ?? ORG_OG_IMAGE;
    node.image = image;
    return node;
  } catch {
    return null;
  }
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  const rawTitle = post.metaTitle || `${post.title} | Velt Blog`;
  const description = post.metaDescription || post.description;
  return {
    title: { absolute: rawTitle },
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      url: `https://velt.dev/blog/${slug}`,
      title: rawTitle,
      description,
      ...(post.ogImage ? { images: [{ url: post.ogImage }] } : {}),
    },
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

  const blogPostingSchema = buildBlogPostingSchema({ post, slug });
  const blogBreadcrumb = buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title ?? slug, url: `${SITE_URL}/blog/${slug}` },
  ]);

  return (
    <div data-getstarted className="min-h-screen bg-black text-white font-urbanist" style={{ paddingTop: 80 }}>
      {blogPostingSchema ? (
        <JsonLd id="ld-blog-post" data={blogPostingSchema} />
      ) : null}
      <JsonLd id="ld-blog-post-breadcrumb" data={blogBreadcrumb} />
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
