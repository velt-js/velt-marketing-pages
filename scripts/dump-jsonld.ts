import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildBreadcrumbList,
  buildWebPageSchema,
  buildFaqPageSchema,
  SITE_URL,
  ORG_ID,
  ORG_NAME,
  ORG_LOGO_URL,
} from "../app/_seo/schema";

type SampleBlogPost = {
  title: string;
  slug: string;
  publishedAt: string;
  _updatedAt?: string;
  excerpt?: string;
  ogImage?: string;
  author?: { name?: string };
};

function buildBlogPostingSchema({ post, slug }: { post: SampleBlogPost; slug: string }) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${slug}#blogposting`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.excerpt,
    image: post.ogImage,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : { "@id": ORG_ID, "@type": "Organization", name: ORG_NAME },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: ORG_NAME,
      logo: { "@type": "ImageObject", url: ORG_LOGO_URL },
    },
  };
  if (post._updatedAt) node.dateModified = post._updatedAt;
  return node;
}

const samples = {
  organization: buildOrganizationSchema(),
  website: buildWebSiteSchema(),
  enterpriseWebPage: buildWebPageSchema({
    url: `${SITE_URL}/enterprise`,
    name: "Velt for Enterprise — Self-hosting, custom SLAs, and more",
    description: "Access self-hosting, custom SLAs, dedicated support, and security controls built for enterprise teams.",
  }),
  enterpriseBreadcrumb: buildBreadcrumbList([
    { name: "Home", url: SITE_URL },
    { name: "Enterprise", url: `${SITE_URL}/enterprise` },
  ]),
  pricingFaq: buildFaqPageSchema([
    { question: "Do you offer a free trial?", answer: "Yes, all plans include a 14-day free trial with full access." },
    { question: "Do you offer any volume discounts?", answer: "Yes, we offer volume discounts. Contact us to discuss." },
  ]),
  blogPosting: buildBlogPostingSchema({
    post: {
      title: "Sample post about realtime collaboration",
      slug: "sample-post",
      publishedAt: "2026-04-21T10:00:00.000Z",
      _updatedAt: "2026-05-08T14:30:00.000Z",
      excerpt: "How to add multiplayer features to a B2B app in one afternoon.",
      ogImage: "https://cdn.sanity.io/images/abc/production/sample.png",
      author: { name: "Velt Team" },
    },
    slug: "sample-post",
  }),
};

for (const [name, payload] of Object.entries(samples)) {
  console.log(`===== ${name} =====`);
  console.log(JSON.stringify(payload, null, 2));
  console.log("");
}
