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
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url,
      faqSchema,
      blogPostingSchema
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
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
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
        rowHeights,
        cards[] {
          title,
          description,
          illustrationKey,
          "imageSrc": image.asset->url
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
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  `,
    { slug }
  );
}

// Feature page queries
export async function getAllFeaturePages() {
  return client.fetch(`
    *[_type == "featurePage"] | order(category asc, title asc) {
      _id,
      title,
      "slug": slug.current,
      category,
      tagline,
      "logo": logo.asset->url
    }
  `);
}

export async function getAllFeatureSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "featurePage" && defined(slug.current)].slug.current`
  );
}

export async function getFeaturePageBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "featurePage" && slug.current == $slug][0] {
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
      sections[] {
        _type,
        _key,
        // Shared header fields
        eyebrow,
        heading,
        subheading,
        viewDocsCta,
        primaryCta,
        secondaryCta,
        rowHeights,
        inlineTestimonial {
          name,
          role,
          quote,
          accentFragment,
          accentColor,
          "avatarSrc": avatar.asset->url
        },
        // featureIntegrationsSection
        logos[] {
          name,
          href,
          "logoSrc": logo.asset->url
        },
        // featurePowerfulBentoSection — 4 fixed-slot cards
        mentionsCard { title, description },
        tasksCard { title, description },
        recordingsCard { title, description },
        reactionsCard { title, description },
        // featureSidebarShowcaseSection
        "eyebrowIconSrc": eyebrowIcon.asset->url,
        "defaultScreenshotSrc": defaultScreenshot.asset->url,
        items[] {
          label,
          "screenshotSrc": screenshot.asset->url
        },
        // featureFlowDiagramSection
        stages[] {
          label,
          color,
          labelColor,
          isCarousel,
          "logoSrc": logoImage.asset->url,
          carouselLogos[] {
            "src": logo.asset->url,
            alt
          }
        },
        // featureCustomizerSection
        playground {
          label,
          "iconImageSrc": iconImage.asset->url,
          "previewImageSrc": previewImage.asset->url
        },
        examples[] {
          label,
          "iconImageSrc": iconImage.asset->url,
          "previewImageSrc": previewImage.asset->url
        },
        controls {
          colors,
          onTheEdgeValue,
          loggedInToggleLabel,
          parentDefaultLabel
        },
        // Shared cards array covers featureBentoSection + featureCardRowSection +
        // featureCustomerCarouselSection. Each consumer ignores unrelated fields by _type.
        cards[] {
          // featureBentoSection (uses featureBentoCard)
          title,
          description,
          uiComponentKey,
          illustrationKey,
          "imageSrc": image.asset->url,
          // featureCardRowSection
          "iconImageSrc": iconImage.asset->url,
          viewDocsHref,
          // featureCustomerCarouselSection
          "customerLogoSrc": customerLogo.asset->url,
          pullQuote,
          body,
          authorName,
          authorRole,
          "authorAvatarSrc": authorAvatar.asset->url
        }
      },
      showSecurity,
      showTrustedLogos,
      showCustomerStories,
      getStartedSteps {
        step1PackageName
      },
      faq {
        items[] {
          question,
          answer
        }
      },
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
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
