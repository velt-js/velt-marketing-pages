import { client } from "./client";

// Blog queries
export async function getAllBlogPosts() {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      description,
      publishedAt,
      category,
      tags,
      "author": author->{ name, role },
      "featuredImage": featuredImage.asset->url
    }
  `);
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      publishedAt,
      category,
      tags,
      "author": author->{ name, role, "avatar": avatar.asset->url },
      "featuredImage": featuredImage.asset->url,
      body,
      seo
    }
  `,
    { slug }
  );
}

// Marketing page queries
export async function getMarketingPageBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "marketingPage" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      pageType,
      hero,
      features,
      testimonials,
      pricingTiers,
      body,
      seo
    }
  `,
    { slug }
  );
}

export async function getMarketingPagesByType(pageType: string) {
  return client.fetch(
    `
    *[_type == "marketingPage" && pageType == $pageType] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      pageType,
      "description": hero.description
    }
  `,
    { pageType }
  );
}

// Customer queries
export async function getFeaturedCustomers() {
  return client.fetch(`
    *[_type == "customer" && featured == true] {
      _id,
      name,
      description,
      "logo": logo.asset->url
    }
  `);
}
