// Shared schema.org constants + builders for JSON-LD blocks across the
// site. Centralising here keeps Organization, WebSite, breadcrumb, and
// FAQ shapes in sync — important because Google ties duplicates back
// to a single entity only when the `@id` and `url` match exactly.

export const SITE_URL = "https://velt.dev";
export const ORG_NAME = "Velt";
// PNG wordmark served from /public — Google's Knowledge Graph and
// structured-data guidelines prefer raster (PNG/JPG) over SVG for the
// Organization logo, even though both validate. SVG variant is still
// served as the favicon via app/icon.svg.
export const ORG_LOGO_URL = `${SITE_URL}/logo.png`;
export const ORG_LOGO_WIDTH = 1200;
export const ORG_LOGO_HEIGHT = 512;
export const ORG_OG_IMAGE = `${SITE_URL}/opengraph-image.png`;
export const ORG_DESCRIPTION =
  "Velt is embeddable review and approval for AI-native apps: comments, approval flows, review agents, suggestions, audit trails, memory, and notifications in one SDK.";

// Stable `@id` URIs. Schema.org recommends a hash fragment so the
// identifier is namespaced under the canonical URL.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const ORG_SAME_AS: string[] = [
  "https://github.com/velt-js",
  "https://www.ycombinator.com/companies/velt",
  "https://x.com/velt_dev",
  "https://www.linkedin.com/company/velt-dev",
];

/**
 * Build the site-wide Organization schema. Referenced by `publisher`
 * fields on Article / BlogPosting and `provider` on SoftwareApplication.
 *
 * @returns A schema.org Organization node ready to inline.
 */
export function buildOrganizationSchema(): Record<string, unknown> {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: ORG_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: ORG_LOGO_URL,
        width: ORG_LOGO_WIDTH,
        height: ORG_LOGO_HEIGHT,
      },
      description: ORG_DESCRIPTION,
      sameAs: ORG_SAME_AS,
    };
  } catch {
    return {};
  }
}

/**
 * Build the site-wide WebSite schema. No SearchAction — the marketing
 * site does not expose a search endpoint, so including one would be
 * misleading per Google's Sitelinks Search Box guidelines.
 *
 * @returns A schema.org WebSite node ready to inline.
 */
export function buildWebSiteSchema(): Record<string, unknown> {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: ORG_NAME,
      url: SITE_URL,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
      // mainEntity ImageObject mirrors the per-page WebSite JSON-LD
      // Framer was emitting site-wide (Scripts 9 + 10) so the logo
      // stays attached to the WebSite entity in addition to the
      // Organization.logo field. SEO crawlers that key off either
      // location keep getting the same asset.
      mainEntity: [
        {
          "@type": "ImageObject",
          url: "https://framerusercontent.com/images/vCF2hcxqRxsOmGcdO72Zk3CMbU.svg",
          caption: "Velt Logo",
        },
      ],
    };
  } catch {
    return {};
  }
}

/**
 * Build a BreadcrumbList schema for a single descent path. Caller passes
 * an ordered list of {name, url} pairs starting at the site root.
 *
 * @param items - Ordered breadcrumb trail; the first item is typically
 *                Home, the last is the current page.
 * @returns A schema.org BreadcrumbList node.
 */
export function buildBreadcrumbList(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  } catch {
    return {};
  }
}

/**
 * Build a minimal WebPage schema for a static informational page.
 *
 * @param params - Page metadata.
 * @param params.name - Page title.
 * @param params.description - Meta description.
 * @param params.url - Absolute canonical URL.
 * @param params.breadcrumb - Optional BreadcrumbList graph node ID to
 *                            link the WebPage to its breadcrumb trail.
 * @returns A schema.org WebPage node.
 */
export function buildWebPageSchema({
  name,
  description,
  url,
  breadcrumb,
}: {
  name: string;
  description?: string;
  url: string;
  breadcrumb?: Record<string, unknown>;
}): Record<string, unknown> {
  try {
    const node: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name,
      url,
      isPartOf: { "@id": WEBSITE_ID },
      inLanguage: "en-US",
    };
    if (description) node.description = description;
    if (breadcrumb) node.breadcrumb = breadcrumb;
    return node;
  } catch {
    return {};
  }
}

/**
 * Build a FAQPage schema from a list of {question, answer} entries.
 * Strips HTML so answers that contain inline links serialise to clean
 * text in the JSON-LD payload.
 *
 * @param entries - FAQ entries. Each entry's `answer` must be plain
 *                  text — callers with rich-text answers should pre-
 *                  flatten before calling.
 * @returns A schema.org FAQPage node.
 */
export function buildFaqPageSchema(
  entries: Array<{ question: string; answer: string }>
): Record<string, unknown> {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: entries.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.answer,
        },
      })),
    };
  } catch {
    return {};
  }
}

/**
 * Convenience wrapper over `buildFaqPageSchema` for callers that pass the
 * runtime `FaqEntry` shape (where `answer` is optional because some
 * entries use a `paragraphs` ReactNode array instead). Entries without a
 * plain-text answer are dropped — those should pre-flatten via the
 * caller (see `/pricing`'s `PRICING_FAQ_FOR_SCHEMA`).
 *
 * @param entries - FAQ entries with optional plain-text answers.
 * @returns A schema.org FAQPage node (or empty if no entries qualify).
 */
export function buildFaqPageSchemaFromEntries(
  entries: Array<{ question: string; answer?: string }>,
): Record<string, unknown> {
  const pairs = entries
    .filter((e): e is { question: string; answer: string } =>
      typeof e.answer === "string" && e.answer.length > 0,
    )
    .map(({ question, answer }) => ({ question, answer }));
  if (pairs.length === 0) return {};
  return buildFaqPageSchema(pairs);
}

/**
 * Build an ItemList schema. Used by the integrations hub so the published
 * spoke roster is a crawlable index of items.
 *
 * @param params - List metadata.
 * @param params.name - The list name.
 * @param params.items - Ordered list of {name, url} entries.
 * @returns A schema.org ItemList node.
 */
export function buildItemListSchema({
  name,
  items,
}: {
  name: string;
  items: Array<{ name: string; url: string }>;
}): Record<string, unknown> {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    };
  } catch {
    return {};
  }
}

/**
 * Build a Blog listing schema for the /blog index. Emits a `Blog` node whose
 * `blogPost` array holds a lightweight `BlogPosting` per published post so
 * crawlers can index the listing as a blog and discover each entry. The
 * publisher is linked to the site-wide Organization via its `@id`.
 *
 * @param params - Listing metadata.
 * @param params.url - Absolute canonical URL of the blog index.
 * @param params.posts - Published posts (most-recent first). Each maps to a
 *                       BlogPosting node; entries without a title are skipped.
 * @returns A schema.org Blog node.
 */
export function buildBlogListingSchema({
  url,
  posts,
}: {
  url: string;
  posts: Array<{
    slug: string;
    title: string;
    description?: string;
    publishedAt?: string;
    featuredImage?: string;
  }>;
}): Record<string, unknown> {
  try {
    const blogPost = posts
      .filter((post) => Boolean(post?.title))
      .map((post) => {
        const postUrl = `${SITE_URL}/blog/${post.slug}`;
        const node: Record<string, unknown> = {
          "@type": "BlogPosting",
          headline: post.title,
          url: postUrl,
          mainEntityOfPage: postUrl,
        };
        if (post.description) node.description = post.description;
        if (post.publishedAt) node.datePublished = post.publishedAt;
        if (post.featuredImage) node.image = post.featuredImage;
        return node;
      });
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${ORG_NAME} Blog`,
      url,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
      blogPost,
    };
  } catch {
    return {};
  }
}

/**
 * Build a HowTo schema from an ordered list of step strings. Used by each
 * integration spoke's setup section ("Add Velt to {Name}").
 *
 * @param params - HowTo metadata.
 * @param params.name - The HowTo name, e.g. "Add Velt to Tiptap".
 * @param params.steps - Ordered step descriptions.
 * @returns A schema.org HowTo node.
 */
export function buildHowToSchema({
  name,
  steps,
}: {
  name: string;
  steps: string[];
}): Record<string, unknown> {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      step: steps.map((text, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text,
      })),
    };
  } catch {
    return {};
  }
}
