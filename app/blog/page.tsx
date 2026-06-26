// /blog — recreated on the editorial home-new theme (scoped under `.vlp`,
// canonical `--vlp-*` tokens; see design-guides/DESIGN.md). Light hero +
// featured lead post + card grid, with the shared home-new Nav and Footer.
// Post data still comes from Sanity via getAllBlogPosts.

import Nav from "@/components/home-new/Nav";
import Footer from "@/components/home-new/Footer";
import BlogList, { type BlogListPost } from "@/components/blog-new/BlogList";
import { getAllBlogPosts } from "@/sanity/queries";
import { JsonLd } from "@/app/_seo/JsonLd";
import {
  SITE_URL,
  buildBlogListingSchema,
  buildBreadcrumbList,
  buildWebPageSchema,
} from "@/app/_seo/schema";
import { buildPageMetadata } from "@/app/_seo/page-metadata";
import "@/components/home-new/styles.css";

const BLOG_BREADCRUMB = buildBreadcrumbList([
  { name: "Home", url: SITE_URL },
  { name: "Blog", url: `${SITE_URL}/blog` },
]);

const BLOG_WEBPAGE = buildWebPageSchema({
  name: "Blog | Velt",
  description:
    "Guides, comparisons, and insights on collaboration SDKs, real-time features, and building better products.",
  url: `${SITE_URL}/blog`,
  breadcrumb: BLOG_BREADCRUMB,
});

export const revalidate = 60;

export const metadata = buildPageMetadata({
  title: "Blog: Collaboration SDK Guides & Product Insights",
  description:
    "Guides, comparisons, and insights on collaboration SDKs, real-time features, and building better products.",
  path: "/blog",
  ogImage: "/og/blog.png",
});

export default async function BlogListingPage() {
  const posts = (await getAllBlogPosts()) as BlogListPost[];

  const blogSchema = buildBlogListingSchema({
    url: `${SITE_URL}/blog`,
    posts,
  });

  return (
    <div className="vlp">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <JsonLd id="ld-blog-webpage" data={BLOG_WEBPAGE} />
      <JsonLd id="ld-blog-listing" data={blogSchema} />
      <JsonLd id="ld-blog-breadcrumb" data={BLOG_BREADCRUMB} />

      <Nav />
      <div className="vlp-page">
        <a id="top" />
        <BlogList posts={posts} />
        <Footer />
      </div>
    </div>
  );
}
