import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/react";

import { BlogPortableText } from "./BlogPortableText";
import "./BlogArticle.css";

export type BlogArticlePost = {
  title: string;
  description?: string;
  publishedAt?: string;
  category?: string;
  author?: { name?: string; role?: string; avatar?: string };
  featuredImage?: string;
  body?: PortableTextBlock[];
};

/**
 * Formats an ISO date string as a long, human-readable date.
 * @param value The ISO date string.
 * @returns The formatted date, or an empty string when unparseable.
 */
function formatDate(value?: string): string {
  try {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/**
 * Returns up to two uppercase initials for an author name.
 * @param name The author's name.
 * @returns The initials, or "V" as a fallback.
 */
function initialsFor(name?: string): string {
  try {
    if (!name) return "V";
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "V";
  } catch {
    return "V";
  }
}

/**
 * Editorial blog article: a centered prose column with a back link,
 * category chip, title, deck, author/date byline, optional hero image, and
 * the Portable Text body rendered in the light theme.
 * @param params Component props.
 * @param params.post The blog post to render.
 * @returns The article element.
 */
export default function BlogArticle({ post }: { post: BlogArticlePost }) {
  const date = formatDate(post?.publishedAt);
  const authorName = post?.author?.name;

  return (
    <article className="blog-article">
      <div className="blog-article-inner">
        <Link href="/blog" className="blog-back hl">
          <span aria-hidden="true">&larr;</span> All posts
        </Link>

        <header className="blog-article-head">
          {post.category ? (
            <span className="blog-article-chip">{post.category}</span>
          ) : null}
          <h1 className="blog-article-title">{post.title}</h1>
          {post.description ? (
            <p className="blog-article-deck">{post.description}</p>
          ) : null}

          <div className="blog-byline">
            {authorName ? (
              <span className="blog-byline-avatar" aria-hidden="true">
                {initialsFor(authorName)}
              </span>
            ) : null}
            <div className="blog-byline-meta">
              {authorName ? (
                <span className="blog-byline-name">{authorName}</span>
              ) : null}
              <span className="blog-byline-sub">
                {post.author?.role ? `${post.author.role} · ` : ""}
                {date}
              </span>
            </div>
          </div>
        </header>

        {post.featuredImage ? (
          <div className="blog-article-hero">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 820px, 100vw"
              priority
              className="blog-article-hero-img"
            />
          </div>
        ) : null}

        {post.body ? (
          <div className="blog-prose">
            <BlogPortableText value={post.body} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
