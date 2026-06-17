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
      _updatedAt,
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
      securityTestimonial {
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
        // featureImageCardSection
        "imageSrc": image.asset->url,
        imageAlt,
        imageWidth,
        imageHeight,
        imageBottomOffset,
        marquee,
        marqueeSvgSrc,
        videoSrc,
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

// Feature page v2 (v10 template) queries — rendered at /new-features/<slug>.
export async function getAllFeatureV2Slugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "featurePageV2" && defined(slug.current)].slug.current`
  );
}

export async function getFeaturePageV2BySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "featurePageV2" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      beta,
      breadcrumbLabel,
      hero {
        kicker, title, secondary, accent, microcopy,
        primaryCta, secondaryCta, buildChip,
        demoTabs[] { id, label, demoPreset }
      },
      logoStrip {
        label,
        migration { label, links[] }
      },
      whatItIs {
        kicker, heading, body, docLinks[], scene
      },
      howItWorks {
        kicker, heading, support,
        steps[] { kicker, title, filename, code, copyText },
        mechanics { heading, body, microcopy },
        buildVsBuy { heading, items, close },
        mcp { heading, sub, tabs[] { id, label, command } },
        integrations[] { label, chips[] { label, href, newTab, icon } },
        ctaBanner { title, microcopy, cta, variant }
      },
      showcase {
        kicker, heading, support,
        cards[] { num, name, codeKicker, headline, preview, code, copyText, comingSoon },
        docLinks[],
        interstitial { quote, who }
      },
      details {
        kicker, heading, support, visibleCount,
        items[] { label, soon }
      },
      makeItYours {
        kicker, heading, support,
        cards[] { iconKey, title, body, preview, code, copyText },
        interstitial { quote, who }
      },
      inProduction {
        kicker, heading, support,
        tabs[] {
          id, label, demoPreset, caption, link,
          "screenshotUrl": screenshot.asset->url
        },
        whereItFits { label, links[] },
        ctaBanner { title, microcopy, cta, variant }
      },
      related {
        kicker, heading, support,
        cards[] { iconKey, title, body, visual, link }
      },
      enterprise { badges, line, links[], cta },
      testimonials {
        kicker, heading, support,
        cards[] { metric, quote, who }
      },
      faq {
        kicker, heading,
        items[] { question, answer }
      },
      finalCta { title, primaryCta, secondaryCta, microcopies },
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  `,
    { slug }
  );
}

// ---- Solution page (vertical, v1) queries --------------------------------

export async function getAllSolutionSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "solutionPageV1" && defined(slug.current)].slug.current`
  );
}

export async function getSolutionPageBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "solutionPageV1" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      breadcrumbLabel,
      hero {
        kicker, title, secondary, microcopy,
        primaryCta, secondaryCta, buildChip, visual
      },
      logoStrip {
        label,
        migration { label, links[] }
      },
      reviewReality {
        kicker, heading, items, close
      },
      theLoop {
        kicker, heading, body,
        beats[] { num, title, body, links[] },
        visual
      },
      featureMap {
        kicker, heading, support,
        cards[] { num, name, oneLiner, link, code, preview, beta }
      },
      agentLayer {
        kicker, heading, body, visual
      },
      inProduction {
        kicker, heading, body, metric, quote, who,
        "screenshotUrl": screenshot.asset->url,
        visual,
        ctaBanner { title, microcopy, cta, variant }
      },
      compliance {
        kicker, heading, lead,
        items[] { title, body, link },
        note
      },
      faq {
        kicker, heading,
        items[] { question, answer }
      },
      finalCta { title, primaryCta, secondaryCta, microcopies },
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  `,
    { slug }
  );
}

// Demo page queries
export async function getAllDemoPages() {
  return client.fetch(`
    *[_type == "demoPage" && hide != true] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      appName,
      "appLogo": appLogo.asset->url,
      category,
      "image": image.asset->url
    }
  `);
}

export async function getAllDemoSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "demoPage" && defined(slug.current)].slug.current`
  );
}

export async function getDemoPageBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "demoPage" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      appName,
      "appLogo": appLogo.asset->url,
      appLink,
      demoLink,
      category,
      title1,
      title2,
      content,
      feature1Name,
      "feature1Image": feature1Image.asset->url,
      feature2Name,
      "feature2Image": feature2Image.asset->url,
      feature3Name,
      "feature3Image": feature3Image.asset->url,
      "image": image.asset->url
    }
  `,
    { slug }
  );
}

// Example page queries
export async function getAllExamplePages() {
  return client.fetch(`
    *[_type == "examplePage"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "thumbnail": thumbnail.asset->url,
      framework,
      feature
    }
  `);
}

export async function getAllExampleSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "examplePage" && defined(slug.current)].slug.current`
  );
}

export async function getExamplePageBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "examplePage" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      "thumbnail": thumbnail.asset->url,
      "heroImage": heroImage.asset->url,
      similarApp,
      "similarAppIcon": similarAppIcon.asset->url,
      feature,
      framework,
      features,
      githubLink,
      previewLink,
      codesandboxLink,
      vercelLink,
      metaDescription
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

// ---- Use Case page queries ------------------------------------------------

export async function getAllUseCasePages() {
  return client.fetch(`
    *[_type == "useCasePage"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      tagline,
      "thumbnail": thumbnail.asset->url,
      "icon": icon.asset->url
    }
  `);
}

export async function getAllUseCaseSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "useCasePage" && defined(slug.current)].slug.current`,
  );
}

export async function getUseCasePageBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "useCasePage" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      tagline,
      "thumbnail": thumbnail.asset->url,
      "icon": icon.asset->url,
      hero {
        eyebrow,
        heading,
        subheading,
        decorated,
        primaryCta,
        secondaryCta
      },
      previewBanner { title1, title2 },
      sections[] {
        _key,
        eyebrow,
        heading,
        description,
        imagePosition,
        "image": image.asset->url,
        features[] {
          _key,
          label,
          href
        }
      },
      problemSection {
        title1,
        title2,
        items[] {
          _key,
          "imageSrc": image.asset->url,
          text
        }
      },
      exampleSection {
        "videoSrc": video.asset->url,
        "imageSrc": image.asset->url,
        exampleUrl,
        sandboxLink,
        docsLink,
        featureCountText,
        features
      },
      testimonial {
        quote,
        name,
        roleAndCompany,
        "logoSrc": logo.asset->url
      },
      benefits[] {
        _key,
        tag,
        title,
        description,
        "imageSrc": image.asset->url,
        useCases[] {
          _key,
          "imageSrc": image.asset->url,
          name,
          link
        }
      },
      codeSnippet { code, language },
      actionCallout { text1, text2, text3 },
      showLibrarySection,
      showCustomerUI,
      showSecurity,
      showCustomerCarousel,
      getStartedSteps,
      faq {
        items[] {
          _key,
          question,
          answer
        }
      },
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  `,
    { slug },
  );
}

// Migration queries

export async function getAllMigrationSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "migrationPage" && defined(slug.current)].slug.current`,
  );
}

export async function getMigrationPageBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "migrationPage" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      tagline,
      "competitorLogo": competitorLogo.asset->url,
      "thumbnail": thumbnail.asset->url,
      hero {
        eyebrow,
        heading,
        subheading,
        decorated,
        primaryCta,
        secondaryCta
      },
      migrationSteps {
        headingPrefix,
        headingHighlight,
        subtitle,
        primaryCta,
        secondaryCta,
        step1 { title, description },
        step2 { title, description },
        step3 { title, description },
        testimonial {
          name,
          role,
          "avatar": avatar.asset->url,
          quotePrefix,
          quoteHighlight,
          quoteSuffix
        }
      },
      featureRows[] {
        _key,
        eyebrow,
        heading,
        description,
        imagePosition,
        "image": image.asset->url,
        features[] {
          _key,
          label,
          href
        }
      },
      carousel {
        heading,
        subheading
      },
      showTrustedLogos,
      showCustomerCarousel,
      showFaq,
      faq {
        items[] {
          _key,
          question,
          answer
        }
      },
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  `,
    { slug },
  );
}

export async function getAllIntegrationSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "integrationPage" && defined(slug.current)].slug.current`,
  );
}

export async function getIntegrationPageBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "integrationPage" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      category,
      heroTitle,
      tagline,
      description,
      "logo": logo.asset->url,
      demoUrl,
      githubUrl,
      docsUrl,
      codeSnippet,
      connectBody,
      "connectImage": connectImage.asset->url,
      payloadBody,
      "payloadImage": payloadImage.asset->url,
      unifiedBody,
      "unifiedImage": unifiedImage.asset->url
    }
  `,
    { slug },
  );
}
