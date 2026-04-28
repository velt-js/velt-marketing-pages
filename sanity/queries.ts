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

// Library page queries
export async function getAllLibraryPages() {
  return client.fetch(`
    *[_type == "libraryPage"] | order(category asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      category,
      tagline,
      "logo": logo.asset->url
    }
  `);
}

export async function getAllLibrarySlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "libraryPage" && defined(slug.current)].slug.current`
  );
}

export async function getLibraryPageBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "libraryPage" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      category,
      tagline,
      "logo": logo.asset->url,
      hero {
        heading,
        subheading,
        decorated,
        primaryCta,
        secondaryCta
      },
      demoStage {
        label,
        demoUrl,
        githubUrl,
        "previewSrc": previewImage.asset->url
      },
      bento {
        eyebrow,
        heading,
        subheading,
        viewDocsCta,
        primaryCta,
        cards[] {
          title,
          description,
          illustrationKey
        }
      },
      inlineTestimonial {
        name,
        role,
        quote,
        accentFragment,
        accentColor,
        "avatarSrc": avatar.asset->url
      },
      getStartedCallout {
        heading,
        body,
        viewDocsHref,
        getApiKeyHref,
        codeImageAlt,
        "codeImage": codeImage.asset->{
          url,
          "width": metadata.dimensions.width,
          "height": metadata.dimensions.height
        },
        codeSnippet { code, language }
      },
      getStartedSteps {
        step1PackageName
      },
      faq {
        items[] {
          question,
          answer
        }
      },
      pageMeta {
        metaTitle,
        metaDescription,
        "ogImage": ogImage.asset->url
      }
    }
  `,
    { slug }
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
