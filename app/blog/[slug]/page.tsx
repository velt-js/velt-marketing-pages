import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/sanity/queries";
import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import BlogArticle from "@/components/blog-new/BlogArticle";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  ORG_ID,
  ORG_NAME,
  ORG_OG_IMAGE,
  SITE_URL,
  buildBreadcrumbList,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import "@/components/home-new/styles.css";

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
  const description = post.metaDescription || post.description || "";
  const metadata = buildPageMetadata({
    title: rawTitle,
    description,
    path: `/blog/${slug}`,
    ogImage: post.ogImage ?? undefined,
    socialTitle: rawTitle,
  });
  // Blog posts always use an absolute title (bypasses the layout title template)
  // and override openGraph.type to "article".
  metadata.title = { absolute: rawTitle };
  if (metadata.openGraph) {
    // Next.js OpenGraph is a discriminated union; cast to set article-shape
    // fields. These emit <meta property="article:published_time">,
    // <meta property="article:modified_time">, and <meta
    // property="article:author"> — the standard OG article tags Framer
    // was already shipping per-post.
    const og = metadata.openGraph as Record<string, unknown>;
    og.type = "article";
    if (post.publishedAt) og.publishedTime = post.publishedAt;
    if (post._updatedAt) og.modifiedTime = post._updatedAt;
    if (post.author?.name) og.authors = [post.author.name];
  }
  // Framer also emitted a non-standard <meta property="article:author_name">
  // alongside the standard article:author. Preserve it via metadata.other
  // so anything that was reading that specific tag keeps working.
  if (post.author?.name) {
    metadata.other = {
      ...(metadata.other ?? {}),
      "article:author_name": post.author.name,
    };
  }
  return metadata;
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
    <div className="vlp">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {blogPostingSchema ? (
        <JsonLd id="ld-blog-post" data={blogPostingSchema} />
      ) : null}
      <JsonLd id="ld-blog-post-breadcrumb" data={blogBreadcrumb} />

      {/* Per-post structured data authored in Sanity (raw JSON-LD strings). */}
      {post.blogPostingSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.blogPostingSchema }}
        />
      ) : null}
      {post.faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.faqSchema }}
        />
      ) : null}

      <Nav />
      <div className="vlp-page">
        <a id="top" />
        <BlogArticle post={post} />
        <Footer />
      </div>
    </div>
  );
}
